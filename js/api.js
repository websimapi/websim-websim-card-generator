export async function getFollowsData() {
  try {
    // Get current user's followers and following
    const followersResponse = await fetch('/api/v1/user/followers');
    const followersData = await followersResponse.json();
    
    const followingResponse = await fetch('/api/v1/user/following'); 
    const followingData = await followingResponse.json();

    // Combine and deduplicate users
    const allUsers = new Set([
      ...followersData.followers.data.map(f => f.follow.user),
      ...followingData.following.data.map(f => f.follow.user)
    ]);

    // Convert to array and remove nulls
    const users = Array.from(allUsers).filter(user => user);

    return users;
  } catch (error) {
    console.error('Error fetching follows data:', error);
    return [];
  }
}

export async function generateUserBasedCard(users) {
  try {
    // Send user data to LLM to generate card description
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Based on these user profiles, generate a creative card description that captures the essence of the community. Include a meaningful name derived from user characteristics, a type (elemental/personality based), height, weight, and a rich description of imagined abilities and traits inspired by the users' activities.

        interface Response {
          name: string;
          description: string;
          type: string;
          height: string;
          weight: string;
        }

        Example response (generate something completely different):
        {
          "name": "Creativox",
          "description": "A rare community spirit formed from the collective creativity of digital artists and makers. Its presence inspires waves of innovation, leaving trails of collaborative energy in its wake.",
          "type": "Light/Celestial",
          "height": "1.7m",
          "weight": "42kg"
        }`,
        data: JSON.stringify(users)
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating user-based card:', error);
    return {
      name: 'Error',
      description: 'Failed to generate community card',
      type: 'Unknown',
      height: 'Unknown',
      weight: 'Unknown'
    };
  }
}

export async function generateCardImage(description) {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate a unique image URL for an abstract representation based on this description: "${description}". The image should symbolize community spirit and user traits rather than pokemon-style creatures. Return a URL to an image that matches the description.

        interface Response {
          imageUrl: string;
        }

        Example response (generate something different):
        {
          "imageUrl": "https://example.com/community-spirit-image.jpg"
        }`,
        data: description
      }),
    });
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error generating card image:', error);
    return null;
  }
}