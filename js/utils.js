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
      <path fill="currentColor" d="M256 32c-123.7 0-224 100.3-224 224s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm120 80c16.8 0 32.6 3.8 46.8 10.6-16.5 14.9-36.5 28.4-59.2 39.9-2.3-7.2-4.9-14.3-7.8-21.3 7.5-9.5 14.3-19.3 20.2-29.2zM256 432c-97 0-176-79-176-176 0-40.3 13.6-77.3 36.4-107-5.6 12.6-10.4 25.7-14.4 39.3-2.8 9.5-5.2 19.2-7.2 29-6.8 33.7-8.1 68.5-3.9 102.9 4.5 37 14.7 72.7 30.2 106 19.4 41.5 45.8 79.5 78.1 112.3 7.5 7.6 15.3 14.9 23.4 21.9 10.8 9.3 22.1 18 33.9 26-40.8-32.3-71-79.4-81.6-133.6-5.8-29.4-5.3-59.3 1.2-88.4 2.1-9.5 4.9-18.9 8.3-28 12.4-33.1 32.8-63.3 59.7-88.7 5 19.8 12.6 39 22.7 57.1-35.9 28.1-58.8 71.5-58.8 120.1 0 84.8 69.2 154 154 154s154-69.2 154-154c0-84.8-69.2-154-154-154-30.3 0-58.5 8.7-82.2 23.8-3.8-7.7-7.2-15.5-10.3-23.5 27.9-17.7 60.9-27.9 96.1-27.9 97 0 176 79 176 176s-79 176-176 176z"/>
    </svg>`,
    
    'Air': `<svg viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 96l-96 96v128l96 96 96-96V192l-96-96zm0 288l-96 96 96 96 96-96L256 32zm0-256l-64 64-64 64 64 64 64-64z"/>
      <path fill="currentColor" d="M256 160c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z"/>
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
    
    'Augmented': `<svg viewBox="0 0 512 512">
      <!-- A futuristic circuit-like design -->
      <rect x="96" y="96" width="320" height="320" fill="none" stroke="currentColor" stroke-width="32" rx="32"/>
      <line x1="96" y1="256" x2="416" y2="256" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="96" x2="256" y2="416" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Augmented Reality': `<svg viewBox="0 0 512 512">
      <!-- A design merging digital grid with reality check -->
      <defs>
        <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" stroke-width="2"/>
        </pattern>
      </defs>
      <rect x="64" y="64" width="384" height="384" fill="url(#grid)" stroke="currentColor" stroke-width="16" rx="32"/>
    </svg>`,
    
    'ADVENTURER': `<svg viewBox="0 0 512 512">
      <!-- Icon representing exploration with a compass -->
      <circle cx="256" cy="256" r="200" fill="none" stroke="currentColor" stroke-width="32"/>
      <polygon points="256,156 296,256 256,356 216,256" fill="currentColor"/>
    </svg>`,
    
    'AUDIO-VISUAL': `<svg viewBox="0 0 512 512">
      <!-- Icon combining a speaker and a film strip -->
      <rect x="64" y="192" width="80" height="128" fill="currentColor"/>
      <rect x="160" y="160" width="256" height="192" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="160" y1="224" x2="416" y2="224" stroke="currentColor" stroke-width="32"/>
      <line x1="160" y1="288" x2="416" y2="288" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Abstract': `<svg viewBox="0 0 512 512">
      <!-- Organic abstract swirls -->
      <path fill="none" stroke="currentColor" stroke-width="32" d="M256 64c-80 0-144 80-144 144s56 144 144 144 144-64 144-144-56-144-144-144z"/>
      <path fill="none" stroke="currentColor" stroke-width="32" d="M128 256a128 128 0 0 1 256 0"/>
    </svg>`,
    
    'Animator': `<svg viewBox="0 0 512 512">
      <!-- Icon resembling a film clapperboard with a pencil -->
      <rect x="96" y="128" width="320" height="256" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="96" y1="192" x2="416" y2="192" stroke="currentColor" stroke-width="32"/>
      <path d="M160 128l32-48 32 48" fill="currentColor"/>
    </svg>`,
    
    'Artisan': `<svg viewBox="0 0 512 512">
      <!-- Icon representing a handcrafted tool -->
      <path fill="none" stroke="currentColor" stroke-width="32" d="M160 352l192-192M352 352L160 160"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
    </svg>`,
    
    'CHARACTER': `<svg viewBox="0 0 512 512">
      <!-- Icon representing a stylized human silhouette -->
      <circle cx="256" cy="144" r="80" fill="currentColor"/>
      <path d="M128 464c0-96 256-96 256 0" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'CONSCIOUS_ENTITY': `<svg viewBox="0 0 512 512">
      <!-- Icon with an eye and a neural network motif -->
      <ellipse cx="256" cy="256" rx="160" ry="96" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
      <line x1="176" y1="256" x2="336" y2="256" stroke="currentColor" stroke-width="16"/>
    </svg>`,
    
    'CREATIVE': `<svg viewBox="0 0 512 512">
      <!-- Icon with a lightbulb integrated with a brush stroke -->
      <path d="M256 64a96 96 0 0 0-96 96c0 48 96 144 96 144s96-96 96-144a96 96 0 0 0-96-96z" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="256" x2="256" y2="416" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Code Architect': `<svg viewBox="0 0 512 512">
      <!-- Icon representing angled brackets and blueprint lines -->
      <polyline points="96,128 256,32 416,128" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="96,384 256,480 416,384" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="32" x2="256" y2="480" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Coding Entity': `<svg viewBox="0 0 512 512">
      <!-- Icon with curly brackets -->
      <path d="M160 128c-40 40-40 208 0 248" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M352 128c40 40 40 208 0 248" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Collaborative': `<svg viewBox="0 0 512 512">
      <!-- Icon with interconnected nodes -->
      <circle cx="156" cy="256" r="40" fill="currentColor"/>
      <circle cx="256" cy="156" r="40" fill="currentColor"/>
      <circle cx="356" cy="256" r="40" fill="currentColor"/>
      <line x1="156" y1="256" x2="256" y2="156" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="156" x2="356" y2="256" stroke="currentColor" stroke-width="32"/>
      <line x1="156" y1="256" x2="356" y2="256" stroke="currentColor" stroke-width="32" stroke-dasharray="10 10"/>
    </svg>`,
    
    'Collaborative Tech Wizards': `<svg viewBox="0 0 512 512">
      <!-- Icon with a wizard hat and binary code accents -->
      <path d="M256 32l-96 144h192L256 32z" fill="currentColor"/>
      <rect x="192" y="176" width="128" height="208" fill="none" stroke="currentColor" stroke-width="32"/>
      <text x="256" y="320" font-size="64" text-anchor="middle" fill="currentColor">101</text>
    </svg>`,
    
    'Collective Spirit': `<svg viewBox="0 0 512 512">
      <!-- Icon with multiple overlapping circles -->
      <circle cx="176" cy="256" r="48" fill="currentColor" opacity="0.8"/>
      <circle cx="256" cy="256" r="48" fill="currentColor" opacity="0.8"/>
      <circle cx="336" cy="256" r="48" fill="currentColor" opacity="0.8"/>
    </svg>`,
    
    'Community Builder': `<svg viewBox="0 0 512 512">
      <!-- Icon with interlocking hands -->
      <path d="M160 256a96 96 0 0 1 192 0" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="160" cy="256" r="32" fill="currentColor"/>
      <circle cx="352" cy="256" r="32" fill="currentColor"/>
    </svg>`,
    
    'Cosmic Programmer': `<svg viewBox="0 0 512 512">
      <!-- Icon with a galaxy swirl and code brackets -->
      <circle cx="256" cy="256" r="200" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="156,156 256,256 156,356" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="356,156 256,256 356,356" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Creative Alchemist': `<svg viewBox="0 0 512 512">
      <!-- Icon with a beaker and spark -->
      <rect x="176" y="128" width="160" height="256" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="128" r="32" fill="currentColor"/>
      <path d="M256 160v80" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Creative Coder': `<svg viewBox="0 0 512 512">
      <!-- Icon with merged design of code symbols and a lightbulb -->
      <path d="M160 128l-40 80 40 80" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M352 128l40 80-40 80" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="40" fill="currentColor"/>
    </svg>`,
    
    'Creative Entity': `<svg viewBox="0 0 512 512">
      <!-- Icon with a creative spark inside a circle -->
      <circle cx="256" cy="256" r="200" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M256 156l24 48-24 48-24-48z" fill="currentColor"/>
    </svg>`,
    
    'Debugging Entity': `<svg viewBox="0 0 512 512">
      <!-- Icon with a magnifying glass over code lines -->
      <rect x="128" y="176" width="256" height="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="352" cy="176" r="40" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="336" y1="160" x2="384" y2="112" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Digital Architect': `<svg viewBox="0 0 512 512">
      <!-- Icon with a digital grid and pyramid shape -->
      <polygon points="256,64 96,448 416,448" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="64" x2="256" y2="448" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Digital Artificer': `<svg viewBox="0 0 512 512">
      <!-- Icon with pixelated gear and circuit elements -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <rect x="240" y="96" width="32" height="64" fill="currentColor"/>
      <rect x="240" y="352" width="32" height="64" fill="currentColor"/>
    </svg>`,
    
    'Digital Artisan': `<svg viewBox="0 0 512 512">
      <!-- Icon with a stylized digital brush stroke -->
      <path d="M128 384c64-80 192-80 256 0" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
    </svg>`,
    
    'Digital Artist': `<svg viewBox="0 0 512 512">
      <!-- Icon with a palette and digital pixels -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
      <circle cx="336" cy="176" r="16" fill="currentColor"/>
      <circle cx="176" cy="336" r="16" fill="currentColor"/>
    </svg>`,
    
    'Digital Innovator': `<svg viewBox="0 0 512 512">
      <!-- Icon with a lightbulb and digital matrix -->
      <path d="M256 64a96 96 0 0 0-96 96c0 48 96 144 96 144s96-96 96-144a96 96 0 0 0-96-96z" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="208" x2="256" y2="352" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Disruptive': `<svg viewBox="0 0 512 512">
      <!-- Icon with a breaking chain motif -->
      <line x1="128" y1="128" x2="384" y2="384" stroke="currentColor" stroke-width="32"/>
      <line x1="384" y1="128" x2="128" y2="384" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Emotional': `<svg viewBox="0 0 512 512">
      <!-- Icon with a heart and waveform -->
      <path d="M256 464s-136-80-136-208a104 104 0 0 1 208 0c0 128-136 208-136 208s96-96 96-144a96 96 0 0 0-96-96z" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M208 208l40 32 40-32" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Error Detection': `<svg viewBox="0 0 512 512">
      <!-- Icon with an exclamation mark inside a warning triangle -->
      <polygon points="256,64 64,448 448,448" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="176" x2="256" y2="304" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="360" r="16" fill="currentColor"/>
    </svg>`,
    
    'Ether': `<svg viewBox="0 0 512 512">
      <!-- Icon with a flowing abstract cloud-like shape -->
      <path d="M96 256c0-88 112-128 160-64s80 112 32 144-112 0-192-80z" fill="currentColor"/>
    </svg>`,
    
    'Ethereal': `<svg viewBox="0 0 512 512">
      <!-- Icon with a translucent orb and star accents -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
      <circle cx="176" cy="176" r="16" fill="currentColor"/>
      <circle cx="336" cy="336" r="16" fill="currentColor"/>
    </svg>`,
    
    'Explorer': `<svg viewBox="0 0 512 512">
      <!-- Icon with a compass needle and map elements -->
      <circle cx="256" cy="256" r="200" fill="none" stroke="currentColor" stroke-width="32"/>
      <polygon points="256,156 296,256 256,356 216,256" fill="currentColor"/>
    </svg>`,
    
    'Game Designer': `<svg viewBox="0 0 512 512">
      <!-- Icon with a gamepad silhouette -->
      <rect x="144" y="160" width="224" height="192" rx="32" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="208" cy="256" r="16" fill="currentColor"/>
      <circle cx="304" cy="256" r="16" fill="currentColor"/>
    </svg>`,
    
    'Game Developer': `<svg viewBox="0 0 512 512">
      <!-- Icon similar to game designer but with additional coding elements -->
      <rect x="144" y="160" width="224" height="192" rx="32" fill="none" stroke="currentColor" stroke-width="32"/>
      <text x="256" y="280" font-size="64" text-anchor="middle" fill="currentColor">C</text>
    </svg>`,
    
    'Imaginary': `<svg viewBox="0 0 512 512">
      <!-- Icon with a cloud and sparkles -->
      <ellipse cx="256" cy="256" rx="160" ry="100" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="176" cy="216" r="16" fill="currentColor"/>
      <circle cx="336" cy="216" r="16" fill="currentColor"/>
    </svg>`,
    
    'Imaginative': `<svg viewBox="0 0 512 512">
      <!-- Icon with a swirling design hinting at creativity -->
      <path d="M256 64c-88 0-144 128-144 128s56 128 144 128 144-128 144-128-56-128-144-128z" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M112 320s80-64 144-64 144 64 144 64" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Innovative': `<svg viewBox="0 0 512 512">
      <!-- Icon with a gear merging into a lightbulb -->
      <path d="M256 32a96 96 0 0 0-96 96c0 48 96 144 96 144s96-96 96-144a96 96 0 0 0-96-96z" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M256 208v112" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="352" r="16" fill="currentColor"/>
    </svg>`,
    
    'Inspirational': `<svg viewBox="0 0 512 512">
      <!-- Icon with a rising sun or burst -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="96" x2="256" y2="56" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="416" x2="256" y2="456" stroke="currentColor" stroke-width="32"/>
      <line x1="96" y1="256" x2="56" y2="256" stroke="currentColor" stroke-width="32"/>
      <line x1="416" y1="256" x2="456" y2="256" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Intellect': `<svg viewBox="0 0 512 512">
      <!-- Icon with a brain-like structure simplified -->
      <path d="M256 64c-53 0-96 43-96 96v96c0 53 43 96 96 96s96-43 96-96v-96c0-53-43-96-96-96z" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M160 256h192" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Interactive': `<svg viewBox="0 0 512 512">
      <!-- Icon with two arrows in a circle -->
      <path d="M256 96v64M256 352v64M352 256h64M96 256h64" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Interactive AI': `<svg viewBox="0 0 512 512">
      <!-- Icon with an AI chip integrated into circular arrows -->
      <rect x="176" y="176" width="160" height="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="256,96 256,176" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="256,416 256,336" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="96,256 176,256" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="336,256 416,256" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Interactive Cartographer': `<svg viewBox="0 0 512 512">
      <!-- Icon with a map and location pin integrated with arrows -->
      <path d="M256 64c-88 0-160 72-160 160 0 112 160 224 160 224s160-112 160-224c0-88-72-160-160-160z" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="224" r="32" fill="currentColor"/>
      <polyline points="256,160 256,96" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Interactive Creator': `<svg viewBox="0 0 512 512">
      <!-- Icon with a pen nib and circular arrows -->
      <path d="M256 96l-64 64 64 64 64-64z" fill="currentColor"/>
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Interactive Game Designer': `<svg viewBox="0 0 512 512">
      <!-- Icon with gamepad and interactive arrows -->
      <rect x="144" y="160" width="224" height="192" rx="32" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="256,64 256,144" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="256,448 256,368" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Inventive': `<svg viewBox="0 0 512 512">
      <!-- Icon with a spark and a gear -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M256 176l24 48-24 48-24-48z" fill="currentColor"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
    </svg>`,
    
    'Inventor': `<svg viewBox="0 0 512 512">
      <!-- Icon with a classic light bulb -->
      <path d="M256 32a96 96 0 0 0-96 96c0 48 96 144 96 144s96-96 96-144a96 96 0 0 0-96-96z" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="176" x2="256" y2="352" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="352" r="16" fill="currentColor"/>
    </svg>`,
    
    'MAGICAL': `<svg viewBox="0 0 512 512">
      <!-- Icon with a magic wand and stars -->
      <line x1="128" y1="384" x2="384" y2="128" stroke="currentColor" stroke-width="32"/>
      <circle cx="384" cy="128" r="32" fill="currentColor"/>
      <circle cx="144" cy="368" r="16" fill="currentColor"/>
      <circle cx="368" cy="144" r="16" fill="currentColor"/>
    </svg>`,
    
    'Mystic': `<svg viewBox="0 0 512 512">
      <!-- Icon with a crystal ball and swirling energy -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
      <path d="M176 336a80 80 0 0 1 160 0" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Pixel Art Fighter': `<svg viewBox="0 0 512 512">
      <!-- Icon with pixelated fists -->
      <rect x="112" y="160" width="96" height="96" fill="currentColor"/>
      <rect x="304" y="160" width="96" height="96" fill="currentColor"/>
      <rect x="208" y="256" width="96" height="96" fill="currentColor"/>
    </svg>`,
    
    'SYNESTHESIA': `<svg viewBox="0 0 512 512">
      <!-- Icon with blended color waves -->
      <path d="M96 256c0-80 128-160 160-80s160 80 160 80-128 160-160 80-160 80-160-80z" fill="currentColor" opacity="0.8"/>
    </svg>`,
    
    'Simulator': `<svg viewBox="0 0 512 512">
      <!-- Icon with a joystick and simulation screen -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="40" fill="currentColor"/>
      <circle cx="176" cy="336" r="16" fill="currentColor"/>
      <circle cx="336" cy="336" r="16" fill="currentColor"/>
    </svg>`,
    
    'Software Engineer': `<svg viewBox="0 0 512 512">
      <!-- Icon with a laptop and code brackets -->
      <rect x="96" y="144" width="320" height="192" rx="16" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="160,144 160,96 352,96 352,144" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="192,240 240,200 240,280" fill="none" stroke="currentColor" stroke-width="32"/>
      <polyline points="320,240 272,200 272,280" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Spiritual': `<svg viewBox="0 0 512 512">
      <!-- Icon with a lotus and aura -->
      <ellipse cx="256" cy="256" rx="160" ry="100" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M256 156l32 64-32 64-32-64z" fill="currentColor"/>
    </svg>`,
    
    'Synergy': `<svg viewBox="0 0 512 512">
      <!-- Icon with interlocking gears -->
      <circle cx="176" cy="256" r="48" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="336" cy="256" r="48" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="224" y1="256" x2="288" y2="256" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'TECH': `<svg viewBox="0 0 512 512">
      <!-- Icon with a microchip and circuits -->
      <rect x="128" y="128" width="256" height="256" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="128" y1="256" x2="64" y2="256" stroke="currentColor" stroke-width="32"/>
      <line x1="384" y1="256" x2="448" y2="256" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="128" x2="256" y2="64" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="384" x2="256" y2="448" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'TECHNICAL': `<svg viewBox="0 0 512 512">
      <!-- Icon with a cog and digital grid -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
      <line x1="256" y1="96" x2="256" y2="64" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'TTS': `<svg viewBox="0 0 512 512">
      <!-- Icon with sound waves and text bubble -->
      <rect x="96" y="144" width="320" height="192" rx="16" fill="none" stroke="currentColor" stroke-width="32"/>
      <path d="M96 336l-32 64 64-16" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Technomancer': `<svg viewBox="0 0 512 512">
      <!-- Icon with magical circuits -->
      <rect x="128" y="128" width="256" height="256" rx="32" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="256" r="32" fill="currentColor"/>
      <path d="M256 160v96" stroke="currentColor" stroke-width="32"/>
      <path d="M256 352v32" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Temporal Manipulator': `<svg viewBox="0 0 512 512">
      <!-- Icon with a clock and warp effect -->
      <circle cx="256" cy="256" r="160" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="256" x2="256" y2="176" stroke="currentColor" stroke-width="32"/>
      <path d="M176 176l80 80-80 80" fill="none" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Unity': `<svg viewBox="0 0 512 512">
      <!-- Icon with interlocking rings -->
      <circle cx="192" cy="256" r="64" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="320" cy="256" r="64" fill="none" stroke="currentColor" stroke-width="32"/>
      <line x1="256" y1="192" x2="256" y2="320" stroke="currentColor" stroke-width="32"/>
    </svg>`,
    
    'Unknown': `<svg viewBox="0 0 512 512">
      <!-- Generic question mark icon -->
      <path d="M256 64c-106 0-192 86-192 192s86 192 192 192 192-86 192-192S362 64 256 64zm0 320c-35.3 0-64-28.7-64-64 0-16 8-31 20-40l10-8c12-10 18-25 18-40 0-30-24-54-54-54s-54 24-54 54" fill="none" stroke="currentColor" stroke-width="32"/>
      <circle cx="256" cy="360" r="16" fill="currentColor"/>
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
    'plant': '#4CAF50',
    'sky': '#87CEEB',
    'flora': '#98FB98', 
    'elemental': '#DDA0DD',
    'celestial': '#4B0082',
    'light': '#FFD700'
  };
  
  return colors[type.toLowerCase()] || '#999999';
}