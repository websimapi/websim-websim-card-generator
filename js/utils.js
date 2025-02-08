export function showToast(message, options = {}) {
  const { isError = false } = options;
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : 'success'}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove after animation
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function getTypeIcon(type) {
  const icons = {
    'Earth': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 32c-123.7 0-224 100.3-224 224s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm120 80c16.8 0 32.6 3.8 46.8 10.6-16.5 14.9-36.5 28.4-59.2 39.9-2.3-7.2-4.9-14.3-7.8-21.3 7.5-9.5 14.3-19.3 20.2-29.2z"/>
    </svg>`,
    'Air': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 96l-96 96v128l96 96 96-96V192l-96-96zm0 288l-96 96 96 96 96-96L256 32zm0-256l-64 64-64 64 64 64 64-64z"/>
      <circle cx="256" cy="256" r="40" fill="currentColor"/>
    </svg>`,
    'Sound': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 96l-96 96v128l96 96 96-96V192l-96-96zm0 288l-64-64V192l64-64 64 64v128l-64 64z"/>
    </svg>`,
    'Nature': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 96l-96 96v128l96 96 96-96V192l-96-96zm0 288l-64-64V192l64-64 64 64v128l-64 64zm32-160c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/>
    </svg>`,
    'Fire': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M328.7 256c-18.7-18.7-49.1-18.7-67.9 0L256 388.7 149.1 281.9c-18.7-18.7-49.1-18.7-67.9 0-18.7 18.7-18.7 49.1 0 67.9l140.5 140.5c9.4 9.4 24.6 9.4 33.9 0l140.5-140.5c18.8 18.8 18.8 49.2 0 67.9-18.8 18.8-49.2 18.8-67.9 0l-140.5-140.5c-9.4-9.4-9.4-24.6 0-33.9L298.1 294.8c18.7 18.7 49.1 18.7 67.9 0 18.7-18.7 18.7-49.1 0-67.9L256 191.3 91.4 129.4c-9.4-9.4-9.4-24.6 0-33.9l140.5-140.5c9.4-9.4 24.6-9.4 33.9 0z"/></svg>`,
    'Ice': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M384 256c0 70.7-57.3 128-128 128s-128-57.3-128-128 57.3-128 128-128 128 57.3 128 128zm-224 0l96-96 96 96-96 96-96-96zm96-160l96 96-96 96-96-96 96-96z"/></svg>`,
    'Fighting': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 64c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 64 256 64zm80 160c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80zm-160 0c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80z"/></svg>`,
    'Poison': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 96l-96 96v128l96 96 96-96V192l-96-96zm0 288l-64-64V192l64-64 64 64v128l-64 64zm32-160c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/></svg>`,
    'Ground': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M384 256H128l128-224 128 224zm-256 0l128 224 128-224H128zm256-32l-128-224L128 224h256z"/></svg>`,
    'Flying': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 32L128 160l128 128 128-128L256 32zm0 384l-96 96 96 96 96-96L256 32zm0-256l-64 64-64 64 64 64 64-64z"/></svg>`,
    'Psychic': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm48-96c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z"/></svg>`,
    'Bug': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 64c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 64 256 64zm80 160c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80zm-160 0c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80z"/></svg>`,
    'Rock': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 96l-96 96v128l96 96 96-96V192l-96-96zm0 288l-64-64V192l64-64 64 64v128l-64 64zm32-160c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/></svg>`,
    'Ghost': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 64c-88.4 0-160 71.6-160 160v128h320V224c0-88.4-71.6-160-160-160zm0 288l-64-64V192l64-64 64 64v128l-64 64zm32-160c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/></svg>`,
    'Dragon': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 32L128 160l128 128 128-128L256 32zm0 384l-96 96 96 96 96-96L256 32zm0-256l-64 64-64 64 64 64 64-64z"/></svg>`,
    'Dark': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm48-96c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z"/></svg>`,
    'Steel': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 64c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 64 256 64zm80 160c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80zm-160 0c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80z"/></svg>`,
    'Fairy': `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 64l64 64-64 64-64-64 64-64zm0 384l64-64-64-64-64 64 64 64zm0-192l64 64-64 64-64-64 64-64zm-128-64l64 64-64 64-64-64 64-64zm256 0l64 64-64 64-64-64 64-64z"/></svg>`,
    'Plant': `<svg viewBox="0 0 512 512">
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#388E3C;stop-opacity:1" />
        </linearGradient>
      </defs>
      <g fill="currentColor">
        <path d="M256 48c-12.2 0-24 2.4-35 6.7C258.2 76.8 280 113.7 280 156c0 57.9-47.1 105-105 105-42.3 0-79.2-21.8-101.3-59C69.4 232 67 243.8 67 256c0 104.4 84.6 189 189 189s189-84.6 189-189S360.4 48 256 48z"/>
        <path d="M175 156c0-31.8 11.8-61.2 31.5-84.7C152.3 75.3 112 118.3 112 170c0 28.9 11.7 55.1 30.6 74.1 21-17.6 32.4-43.8 32.4-72.1 0-5.4-.3-10.7-1-15.9"/>
        <path d="M280 156c0 31.8-11.8 61.2-31.5 84.7C302.7 236.7 343 193.7 343 142c0-28.9-11.7-55.1-30.6-74.1-21 17.6-32.4 43.8-32.4 72.1 0 5.4.3 10.7 1 15.9"/>
      </g>
      <circle cx="256" cy="256" r="25" fill="#81C784"/>
      <path d="M256 220c-19.9 0-36 16.1-36 36s16.1 36 36 36 36-16.1 36-36-16.1-36-36-36zm0 52c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" fill="#4CAF50"/>
    </svg>`,
    'Sky': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M412 160c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm-312 0c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14 6.3-14 14-14zm156 0c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56-25.1-56-56-56zm0 84c-15.5 0-28-12.5-28-28s12.5-28 28-28 28 12.5 28 28-12.5 28-28 28z"/>
      <path fill="currentColor" d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 400c-97.9 0-176-78.1-176-176 0-97.9 78.1-176 176-176 97.9 0 176 78.1 176 176 0 97.9-78.1 176-176 176z"/>
    </svg>`,
    'Flora': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M64 96c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V96zm128 64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32zm128 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32z"/>
    </svg>`,
    'Elemental': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 32l-96 96v128l96 96 96-96V192l-96-96zm0 288l-64-64V192l64-64 64 64v128l-64 64z"/>
    </svg>`,
    'Celestial': `<svg viewBox="0 0 512 512">
      <circle cx="256" cy="256" r="200" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M256 156l24 48-24 48-24-48z" fill="currentColor"/>
    </svg>`,
    'Light': `<svg viewBox="0 0 512 512">
      <path d="M256 64a96 96 0 0 0-96 96c0 48 96 144 96 144s96-96 96-144a96 96 0 0 0-96-96z" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="256" x2="256" y2="416" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    'BEAST': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 32C150 32 64 118 64 224c0 88 64 152 192 256 128-104 192-168 192-256 0-106-86-192-192-192z"/>
      <circle cx="200" cy="200" r="24" fill="currentColor"/>
      <circle cx="312" cy="200" r="24" fill="currentColor"/>
    </svg>`,
    '101': `<svg viewBox="0 0 512 512">
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="120" fill="currentColor">101</text>
    </svg>`,
    'DEFENSE': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 16L48 128v112c0 119 76 228 208 272 132-44 208-153 208-272V128L256 16z"/>
    </svg>`,
    'GAMER': `<svg viewBox="0 0 512 512">
      <rect x="112" y="144" width="288" height="224" rx="32" fill="currentColor"/>
      <circle cx="192" cy="272" r="24" fill="#fff"/>
      <circle cx="320" cy="272" r="24" fill="#fff"/>
    </svg>`,
    'C': `<svg viewBox="0 0 512 512">
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="120" fill="currentColor">C</text>
    </svg>`,
    'STRATEGY': `<svg viewBox="0 0 512 512">
      <polygon fill="currentColor" points="256,32 384,192 256,352 128,192"/>
    </svg>`,
    'Water': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 32c-88 0-160 90-160 200 0 128 160 288 160 288s160-160 160-288c0-110-72-200-160-200z"/>
      <circle cx="256" cy="232" r="40" fill="currentColor"/>
    </svg>`
  };
  
  return icons[type] || `<svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96z"/></svg>`;
}

export function getTypeColor(type) {
  const colors = {
    'air': '#B4D4E4',
    'sound': '#9B6B9E', 
    'nature': '#5A9E54',
    'fire': '#FF4422',
    'water': '#3399FF',
    'grass': '#77CC55',
    'electric': '#FFCC33',
    'ice': '#66CCFF',
    'fighting': '#BB5544',
    'poison': '#AA5599',
    'ground': '#DDBB55',
    'flying': '#8899FF',
    'psychic': '#FF5599',
    'bug': '#AABB22',
    'rock': '#BBAA66',
    'ghost': '#6666BB',
    'dragon': '#7766EE',
    'dark': '#775544',
    'steel': '#AAAABB',
    'fairy': '#EE99EE',
    'earth': '#BC9260',
    'air': '#B4D4E4',  
    'sound': '#9B6B9E', 
    'plant': '#4CAF50',
    'sky': '#87CEEB',
    'flora': '#98FB98',
    'elemental': '#DDA0DD',
    'celestial': '#4B0082',
    'light': '#FFD700',
    'beast': '#A52A2A',       
    '101': '#FF6347',          
    'defense': '#4682B4',      
    'gamer': '#8A2BE2',        
    'c': '#DC143C',            
    'strategy': '#2E8B57',     
    'unknown': '#999999'
  };
  
  return colors[type.toLowerCase()] || '#999999';
}