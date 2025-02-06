// Updated api.js with full fetching of all followers and following, verbose logging for debugging and ensuring full project metadata retrieval

// Helper function to recursively fetch paginated data for followers or following
async function fetchAllUsers(endpoint) {
  let allUsers = [];
  let after = null;
  let page = 1;
  while (true) {
    const url = new URL(endpoint, window.location.origin);
    // Ask for 100 items per page
    url.searchParams.set('first', '100');
    if (after) url.searchParams.set('after', after);
    console.log(`Fetching ${endpoint} page ${page}: ${url.toString()}`);
    const response = await fetch(url.toString());
    const data = await response.json();
    // Data structure is assumed to be { followers: { data: [...], meta: {...} } } or similar
    let users = [];
    if (data.followers && Array.isArray(data.followers.data)) {
      users = data.followers.data.map(f => f.follow.user);
    } else if (data.following && Array.isArray(data.following.data)) {
      users = data.following.data.map(f => f.follow.user);
    } else {
      console.warn(`Unexpected data structure on ${endpoint} page ${page}:`, data);
    }
    console.log(`Fetched ${users.length} users on page ${page} from ${endpoint}`);
    allUsers = allUsers.concat(users);
    // Check meta for next page; expecting meta.end_cursor to indicate continuation
    const meta = (data.followers && data.followers.meta) || (data.following && data.following.meta);
    if (meta && meta.end_cursor) {
      after = meta.end_cursor;
      page++;
    } else {
      break;
    }
  }
  return allUsers;
}

export async function getFollowsData() {
  try {
    // Fetch all followers and following concurrently
    const [followers, following] = await Promise.all([
      fetchAllUsers('/api/v1/user/followers'),
      fetchAllUsers('/api/v1/user/following')
    ]);
    
    console.log("Total followers fetched:", followers.length, followers);
    console.log("Total following fetched:", following.length, following);
    
    // Combine both arrays
    const allUsers = [...followers, ...following];
    
    // Remove duplicates by username
    const userMap = new Map();
    allUsers.forEach(user => {
      if (user && user.username && !userMap.has(user.username)) {
        userMap.set(user.username, user);
      }
    });
    const allUniqueUsers = Array.from(userMap.values());
    console.log("All unique users from followers and following:", allUniqueUsers);
    
    return allUniqueUsers;
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
      // Try different possible formats for projects data
      if (Array.isArray(projectsData.projects)) {
        recentProjects = projectsData.projects.slice(0, 10);
      } else if (projectsData.projects.data && Array.isArray(projectsData.projects.data)) {
        recentProjects = projectsData.projects.data.slice(0, 10);
      } else if (typeof projectsData.projects === 'object') {
        const possibleProjects = Object.values(projectsData.projects);
        if (Array.isArray(possibleProjects)) {
          recentProjects = possibleProjects.slice(0, 10);
        }
      } else {
        console.error("Unexpected format for projectsData.projects:", projectsData.projects);
      }
    } else {
      console.warn("No projects found for user", randomUser.username, projectsData);
    }
    
    // Verbose logging for each project to help debug missing title/description
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
                        (project.site && (project.site.title || (project.site.prompt && project.site.prompt.text))) || 
                        (project.project_revision && project.project_revision.title) || 
                        'Untitled';
          const description = project.description || 
                              (project.site && (project.site.description || (project.site.prompt && project.site.prompt.text))) || 
                              'No description available';
          return `Title: ${title}, Description: ${description}`;
        }).join('\n')
      : "No recent projects available.";
    console.log("Constructed projectsContext:", projectsContext);

    // Compose the projectsContext for user context
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

    // Prepare the promptText exactly as specified in the current context
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