// js/api.js
export async function getFollowsData() {
  try {
    // Get current user's followers and following
    const followersResponse = await fetch('/api/v1/user/followers');
    const followersData = await followersResponse.json();
    
    const followingResponse = await fetch('/api/v1/user/following'); 
    const followingData = await followingResponse.json();

    // Combine and deduplicate users using their IDs
    const usersMap = new Map();
    (followersData.followers.data || []).forEach(f => {
      const user = f.follow.user;
      if (user) usersMap.set(user.id, user);
    });
    (followingData.following.data || []).forEach(f => {
      const user = f.follow.user;
      if (user) usersMap.set(user.id, user);
    });
    
    return Array.from(usersMap.values());
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
    // Pick a random user from the followers/following list
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    // Fetch recent projects for the selected user
    const projectsResponse = await fetch(`/api/v1/users/${randomUser.username}/projects`);
    const projectsData = await projectsResponse.json();

    // Normalize the fetched projects into an array
    let recentProjects = [];
    if (projectsData.projects) {
      // In case projects is an array use it directly, otherwise get values.
      if (Array.isArray(projectsData.projects)) {
        recentProjects = projectsData.projects;
      } else {
        recentProjects = Object.values(projectsData.projects);
      }
    }
    // Take up to 2 recent projects
    recentProjects = recentProjects.slice(0, 2);

    // Build the recent projects context string using title and description.
    const projectsContext = recentProjects.length > 0 
      ? recentProjects.map(project => {
          // Ensure title and description are grabbed correctly
          const title = project.title || 'Untitled Page';
          const description = project.description || 'No description available';
          return `Title: ${title}, Description: ${description}`;
        }).join('\n')
      : "No recent projects available.";
console.log(projectsContext)
    // Compose user context with dynamic details and recent projects from the random selection
    const userContext = `
User Profile:
Username: ${randomUser.username}
Description: ${randomUser.description || 'N/A'}
Twitter: ${randomUser.twitter || 'None'}
Discord: ${randomUser.discord_username || 'None'}

Recent Projects:
${projectsContext}
    `.trim();

    // Send user context data to the LLM to generate a card
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Based on these user profiles, generate a creative card description that captures the essence of the community.
Include a meaningful name derived from user characteristics, a type (elemental/personality based), height, weight, and a rich description of imagined abilities and traits inspired by the users' activities.

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
  "description": "A rare community spirit formed from the collective creativity of digital artists and makers. Its presence inspires waves of innovative energy and leaves behind a legacy of collaboration.",
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