export async function getFollowsData() {
  try {
    // Get current user's followers and following
    const followersResponse = await fetch('/api/v1/user/followers');
    const followersData = await followersResponse.json();

    const followingResponse = await fetch('/api/v1/user/following'); 
    const followingData = await followingResponse.json();

    // Combine and deduplicate users (assuming unique user IDs)
    const followers = (followersData.followers && Array.isArray(followersData.followers.data))
      ? followersData.followers.data.map(f => f.follow.user)
      : [];
    const following = (followingData.following && Array.isArray(followingData.following.data))
      ? followingData.following.data.map(f => f.follow.user)
      : [];

    const userMap = new Map();
    [...followers, ...following].forEach(user => {
      if (user && user.username && !userMap.has(user.username)) {
        userMap.set(user.username, user);
      }
    });
    return Array.from(userMap.values());
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
    // Select one random user from the provided users list
    const randomUser = users[Math.floor(Math.random() * users.length)];

    // Fetch recent projects for the selected user
    const projectsResponse = await fetch(`/api/v1/users/${randomUser.username}/projects`);
    const projectsData = await projectsResponse.json();

    // Try to extract projects array from various possible structures
    let recentProjects = [];
    if (projectsData.projects) {
      if (Array.isArray(projectsData.projects)) {
        recentProjects = projectsData.projects.slice(0, 2);
      } else if (projectsData.projects.data && Array.isArray(projectsData.projects.data)) {
        recentProjects = projectsData.projects.data.slice(0, 2);
      } else {
        // If projects is an object with keys, take its values
        recentProjects = Object.values(projectsData.projects).slice(0, 2);
      }
    }

    // Build the recent projects context string including project title and description
    const projectsContext = recentProjects.length > 0 
      ? recentProjects.map(project => {
          // Check metadata: if project has site data then also include project title and description from its metadata
          const title = project.title || (project.site && project.site.title) || 'Untitled';
          const description = project.description || (project.site && project.site.description) || 'No description available';
          return `Title: ${title}, Description: ${description}`;
        }).join('\n')
      : "No recent projects available.";

    // Compose the prompt context using dynamic data from the selected user and their projects
    const userContext = `
User Profile:
Username: ${randomUser.username}
Description: ${randomUser.description || 'N/A'}
Twitter: ${randomUser.twitter || 'None'}
Discord: ${randomUser.discord_username || 'None'}

Recent Projects:
${projectsContext}
    `.trim();

    // Send dynamic user data to LLM to generate a card description
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Based on these user profiles, generate a creative card description that captures the essence of the community. Include a meaningful name derived from user characteristics, a type that is a combination of elemental and personality traits, height, weight, and a rich description of imagined abilities and traits inspired by the selected user's activities and recent projects.

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
        prompt: `Generate a unique image URL for an abstract representation based on this description: "${description}". The image should symbolize community spirit and the dynamic essence of digital creators rather than traditional characters. Return a URL to an image that matches the description.

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