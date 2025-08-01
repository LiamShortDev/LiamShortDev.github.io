// Load and render projects
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = project.link;

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="overlay">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;

      // Support multiple categories per project
      if (Array.isArray(project.category)) {
        project.category.forEach(category => {
          const shelf = document.querySelector(`#${category} .project-grid`);
          if (shelf) shelf.appendChild(card.cloneNode(true));
        });
      } else {
        const shelf = document.querySelector(`#${project.category} .project-grid`);
        if (shelf) shelf.appendChild(card);
      }
    });

    // After cards are added, set up mobile tap behavior
    setupMobileTapOverlay();
  })
  .catch(err => console.error("Failed to load projects:", err));


// Tap-to-hover for mobile devices
function setupMobileTapOverlay() {
  const isTouchDevice = typeof screen.orientation !== 'undefined'

  if (isTouchDevice) {
    let lastTapped = null;

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // First tap: show overlay only
        if (lastTapped !== card) {
          e.preventDefault(); // block navigation
          document.querySelectorAll('.project-card.tapped').forEach(c => c.classList.remove('tapped'));
          card.classList.add('tapped');
          lastTapped = card;
        } else {
          // Second tap: follow the link
          lastTapped = null;
        }
      });
    });

    // Tap outside to cancel tap state
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.project-card')) {
        document.querySelectorAll('.project-card.tapped').forEach(c => c.classList.remove('tapped'));
        lastTapped = null;
      }
    });
  }
}
