// Updated api.js with additional logging and improved project data extraction

export async function getFollowsData() {
  try {
    // Get current user's followers and following data
    const followersResponse = await fetch('/api/v1/user/followers');
    const followersData = await followersResponse.json();

    const followingResponse = await fetch('/api/v1/user/following'); 
    const followingData = await followingResponse.json();

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
    // Select one random user from the provided list
    const randomUser = users[Math.floor(Math.random() * users.length)];
    console.log("Selected random user:", randomUser);

    // Fetch recent projects for the selected user; get up to 10 latest projects
    const projectsResponse = await fetch(`/api/v1/users/${randomUser.username}/projects`);
    const projectsData = await projectsResponse.json();
    console.log("Fetched projectsData for user", randomUser.username, projectsData);

    let recentProjects = [];
    if (projectsData && projectsData.projects) {
      if (Array.isArray(projectsData.projects)) {
        recentProjects = projectsData.projects.slice(0, 10);
      } else if (projectsData.projects.data && Array.isArray(projectsData.projects.data)) {
        recentProjects = projectsData.projects.data.slice(0, 10);
      } else if (typeof projectsData.projects === 'object') {
        const values = Object.values(projectsData.projects);
        recentProjects = Array.isArray(values) ? values.slice(0, 10) : [];
      } else {
        console.error("Unexpected format for projectsData.projects:", projectsData.projects);
      }
    } else {
      console.warn("No projects found for user", randomUser.username, projectsData);
    }

    // Log details for each project to help debug missing title/description
    recentProjects.forEach(project => {
      console.log(`Project Debug - ID: ${project.id}, Title: ${project.title}, Description: ${project.description}`);
      if (!project.title && project.site) {
        console.warn(`Project ${project.id} is missing title. Attempting to fetch from site: `, project.site);
      }
      if (!project.description && project.site) {
        console.warn(`Project ${project.id} is missing description. Attempting to fetch from site: `, project.site);
      }
    });

    // Construct the projects context string using available metadata (up to 10 projects)
    const projectsContext = recentProjects.length > 0 
      ? recentProjects.map(project => {
          // Try alternative sources: project.site and project.project_revision if main title/description is null
          const title = project.title || 
                        (project.site && project.site.title) || 
                        (project.project_revision && project.project_revision.title) || 
                        'Untitled';
          const description = project.description || 
                              (project.site && project.site.description) || 
                              'No description available';
          return `Title: ${title}, Description: ${description}`;
        }).join('\n')
      : "No recent projects available.";
    console.log("Constructed projectsContext:", projectsContext);

    // Compose the user context using the random user's profile and their recent projects context
    const userContext = `
User Profile:
Username: ${randomUser.username}
Description: ${randomUser.description || 'N/A'}
Twitter: ${randomUser.twitter || 'None'}
Discord: ${randomUser.discord_username || 'None'}

Recent Projects:
${projectsContext}
    `.trim();
    console.log("User Context for LLM:", userContext);

    // Prepare the prompt to send dynamic context to the LLM
    const promptText = `Based on these user profiles, generate a creative card description. Include a meaningful name derived from user characteristics, a type, height, weight, and a rich description of imagined abilities and traits inspired by the users' activities and recent projects.
    ${userContext}

interface Response {
  name: string;
  description: string;
  type: string;
  height: string;
  weight: string;
}

Example response (generate something completely different):
{
  "name": "",
  "description": "",
  "type": "Augmented/TTS",
  "height": "1.7m",
  "weight": "42kg"
}

Types, Description, and Name for example comes from user context
User Context:
${userContext}
    `;
    console.log("Sending prompt to LLM:", promptText);

    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptText,
        data: JSON.stringify(users)
      }),
    });

    const data = await response.json();
    console.log("LLM returned data:", data);
    return data;  // Expected to match the Response interface
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