export async function getPokemonDescription() {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate a creative description for a completely new, unique Pogemon. The name should be original and meaningful, derived from a combination of Latin, Greek, or English root words that relate to the Pogemon's characteristics. For example:
        - "Sylphoon" (from sylph: air spirit + typhoon)
        - "Luminox" (from lumino: light + nox: night)
        - "Dendrovern" (from dendro: tree + vernal: spring)
        
        Be imaginative and original - do not reuse existing Pogemons. Include its type, height, weight, and a brief poetic description of its appearance and behavior. The description should capture the whimsical and magical nature of the Pogemon world. Each response should be different from previous ones.

        interface Response {
          name: string;
          description: string;
          type: string;
          height: string;
          weight: string;
        }

        Example response (generate something completely different):
        {
          "name": "Pyroxian",
          "description": "A mystical fire-psychic Pogemon whose crystalline body channels volcanic energies into mesmerizing displays of mental prowess. Its presence warms the mind as much as the air around it.",
          "type": "Fire/Psychic",
          "height": "1.8m",
          "weight": "45kg"
        }`,
        data: ""
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pogemon description:', error);
    return {
      name: 'Error',
      description: 'Failed to generate Pogemon description',
      type: 'Unknown',
      height: 'Unknown',
      weight: 'Unknown'
    };
  }
}

export async function generatePokemonImage(description) {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate a unique image URL for a cartoon Pogemon based on this description: "cartoon Pogemon ${description}". Each response should be different and creative. Return a URL to an image that matches the description.

        interface Response {
          imageUrl: string;
        }

        Example response (generate something different):
        {
          "imageUrl": "https://example.com/pogemon-image.jpg"
        }`,
        data: description
      }),
    });
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error generating Pogemon image:', error);
    return null;
  }
}