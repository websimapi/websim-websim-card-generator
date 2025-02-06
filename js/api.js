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
    // Select one random user from the followers/following list
    const randomUser = users[Math.floor(Math.random() * users.length)];

    // Fetch recent projects for the selected user
    const projectsResponse = await fetch(`/api/v1/users/${randomUser.username}/projects`);
    const projectsData = await projectsResponse.json();
    // Assume the response contains a "projects" array
    const recentProjects = projectsData.projects ? projectsData.projects.slice(0, 2) : [];

    // Construct a context string that includes user profile and recent project info
    const userContext = `
Username: ${randomUser.username}
Description: ${randomUser.description || 'N/A'}
Twitter: ${randomUser.twitter || 'None'}
Discord: ${randomUser.discord_username || 'None'}
Recent Projects:
${recentProjects.map(project => `Title: ${project.title || 'Untitled'}, Description: ${project.description || 'No description available'}`).join('\n')}
    `.trim();

    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Based on the following user profile and their recent projects details, generate a creative card description that captures the community's essence. Provide a meaningful name derived from the user's characteristics and recent contributions, a type (representing personality or elemental traits), height, weight, and a rich description that highlights their creative impact and project influence.

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
  "description": "An innovative personality inspired by breakthroughs in digital art and collaborative tech projects like 'Digital Dawn'. This card reflects a blend of creativity, resilience, and community contribution.",
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