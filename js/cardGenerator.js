import { getFollowsData, generateUserBasedCard, generateCardImage } from './api.js';
import { saveCard } from './db.js';
import { handleHover, resetHover } from './components/card.js';
import { getTypeIcon, getTypeColor } from './utils.js';

export async function generateCard() {
  // Remove existing card and submenu if any
  const existingCard = document.querySelector('.card');
  const existingSubmenu = document.querySelector('.submenu');
  if (existingCard) {
    existingCard.remove();
  }
  if (existingSubmenu) {
    existingSubmenu.remove();
  }

  // Create new card with front and back
  const cardContainer = document.getElementById('cardContainer');
  const card = document.createElement('div');
  card.className = 'card';
  
  // Create card inner structure with initial flipped state
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner flipped';
  
  cardInner.innerHTML = `
    <div class="card-front">
      <h2 class="pokemon-name"></h2>
      <div class="card-image-container"></div>
      <div class="stats-container">
        <div class="type-wrapper"></div>
        <p class="pokemon-stats"></p>
      </div>
      <div class="card-description">
        <p class="pokemon-description"></p>
      </div>
    </div>
    <div class="card-back">
      <div class="card-back-design">
        <svg class="card-back-logo" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" stroke-width="2"/>
        </svg>
        <div class="card-back-pattern"></div>
      </div>
    </div>
  `;
  
  card.appendChild(cardInner);
  
  // Create submenu with placeholder data
  const submenu = document.createElement('div');
  submenu.className = 'submenu hidden';
  
  submenu.innerHTML = `
    <div class="submenu-grid">
      <div class="stat-box">
        <div class="stat-label">Name</div>
        <div class="stat-value">???</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Type</div>
        <div class="stat-value">???</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Height</div>
        <div class="stat-value">???</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Weight</div>
        <div class="stat-value">???</div>
      </div>
    </div>
    <div class="description-box">
      <div class="description-title">Description</div>
      <div class="full-description">Loading community card...</div>
    </div>
  `;
  
  cardContainer.appendChild(submenu);

  // Get user data and generate card description based on recent project context
  const users = await getFollowsData();
  const cardData = await generateUserBasedCard(users);

  // Update submenu content
  const statValues = submenu.querySelectorAll('.stat-value');
  statValues[0].textContent = cardData.name;
  statValues[1].textContent = cardData.type;
  statValues[2].textContent = cardData.height;
  statValues[3].textContent = cardData.weight;
  
  submenu.querySelector('.full-description').textContent = cardData.description;

  // Generate image based on description
  const imageUrl = await generateCardImage(`${cardData.description} - ${cardData.name} community card`);

  // Create new card data object
  const newCardData = {
    name: cardData.name,
    description: cardData.description,
    type: cardData.type,
    height: cardData.height,
    weight: cardData.weight,
    imageUrl: imageUrl
  };

  // Handle image creation and loading
  if (imageUrl) {
    const cardImage = document.createElement('img');
    cardImage.id = `card-${Date.now()}`;
    cardImage.className = 'pokemon-image hidden';
    cardImage.src = imageUrl;
    cardImage.alt = `${cardData.name} - ${cardData.description}`;
    
    cardImage.addEventListener('load', async function() {
      const actualSrc = this.currentSrc || this.src;
      if (!actualSrc.includes('cartoon')) {
        this.classList.remove('hidden');
        
        try {
          const response = await fetch(actualSrc);
          const blob = await response.blob();
          const file = new File([blob], `${cardData.name}.png`, { type: 'image/png' });
          const backupImageUrl = await websim.upload(file);
          
          newCardData.imageUrl = actualSrc;
          newCardData.backupImageUrl = backupImageUrl;
          
          await saveCard(newCardData);
        } catch (error) {
          console.error('Error creating backup image:', error);
          newCardData.imageUrl = actualSrc;
          await saveCard(newCardData);
        }
      }
    });
    
    cardImage.addEventListener('error', function() {
      this.classList.add('hidden');
    });
    
    const imageContainer = card.querySelector('.card-image-container');
    imageContainer.appendChild(cardImage);
  }
  
  // Update card UI elements
  const nameElement = card.querySelector('.pokemon-name');
  nameElement.textContent = cardData.name;
  
  const statsContainer = card.querySelector('.stats-container');
  
  const types = cardData.type.split('/');
  const typeIcons = types.map(type => {
    const typeDiv = document.createElement('div');
    typeDiv.className = `type-icon ${type.toLowerCase().trim()}`;
    typeDiv.innerHTML = getTypeIcon(type.trim());
    typeDiv.title = type.trim();
    return typeDiv;
  });
  
  const typeWrapper = statsContainer.querySelector('.type-wrapper');
  typeIcons.forEach(icon => typeWrapper.appendChild(icon));

  const statsElement = statsContainer.querySelector('.pokemon-stats');
  statsElement.textContent = `${cardData.height} | ${cardData.weight}`;
  
  const descElement = card.querySelector('.pokemon-description');
  descElement.textContent = cardData.description;
  
  cardContainer.appendChild(card);

  // Override card front background with provided image icon
  const cardFront = card.querySelector('.card-front');
  cardFront.style.background = "url('/VariantDark1.png') no-repeat center center / cover";
  
  // Add click handler with submenu toggle
  card.addEventListener('click', (e) => {
    const cardInner = card.querySelector('.card-inner');
    cardInner.classList.toggle('flipped');
    
    if (!cardInner.classList.contains('flipped')) {
      setTimeout(() => {
        submenu.classList.remove('hidden');
      }, 400);
    } else {
      submenu.classList.add('hidden');
    }
  });

  // Add hover effect
  card.addEventListener('mousemove', handleHover);
  card.addEventListener('mouseleave', resetHover);

  // Show card with initial animation
  requestAnimationFrame(() => {
    card.classList.add('show');
  });
}