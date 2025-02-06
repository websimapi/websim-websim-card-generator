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
    if (!users || users.length === 0) {
      throw new Error("No follower or following users available");
    }
    // Select one random user from the followers/following list
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    // Fetch recent projects for the selected user
    const projectsResponse = await fetch(`/api/v1/users/${randomUser.username}/projects`);
    const projectsData = await projectsResponse.json();
    
    // projectsData might not be an array directly; check and convert accordingly.
    let recentProjects = [];
    if (projectsData && Array.isArray(projectsData.projects)) {
      recentProjects = projectsData.projects.slice(0, 2);
    } else if (projectsData && projectsData.projects && typeof projectsData.projects === 'object') {
      // In case projects is an object, take its values.
      recentProjects = Object.values(projectsData.projects).slice(0, 2);
    } else if (projectsData && Array.isArray(projectsData)) {
      // Fallback if response is an array itself.
      recentProjects = projectsData.slice(0, 2);
    }
    
    // Build the recent projects context string.
    const projectsContext = recentProjects.length > 0 
      ? recentProjects.map(project =>
          `Title: ${project.title || 'Untitled'}, Description: ${project.description || 'No description available'}`
        ).join('\n')
      : "No recent projects available.";
      
    // Compose full context for the LLM using dynamic content.
    const userContext = `
User Profile:
Username: ${randomUser.username}
Description: ${randomUser.description || 'N/A'}
Twitter: ${randomUser.twitter || 'None'}
Discord: ${randomUser.discord_username || 'None'}

Recent Projects:
${projectsContext}
    `.trim();

    // Send user data to LLM to generate card description
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Based on the following user profile context, generate a creative card description that captures the essence of the community. 
Include a meaningful name derived from the user's characteristics, a type (which may combine elemental and personality traits), height, weight, and a rich description of imagined abilities and traits inspired by the user's recent projects and activities.

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
  "description": "A rare community spirit formed from the collective creativity of digital innovators. Its presence inspires waves of collaboration with sparks of genius in every project.",
  "type": "Light/Celestial",
  "height": "1.7m",
  "weight": "42kg"
}

User Context:
${userContext}
        `,
        data: JSON.stringify(randomUser)
      }),
    });
    
    const data = await response.json();
    return data;  // Expecting an object matching the Response interface
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
        prompt: `Generate a unique image URL for an abstract representation based on this description: "${description}". The image should symbolize community spirit and user traits rather than traditional characters. Return a URL to an image that matches the description.

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