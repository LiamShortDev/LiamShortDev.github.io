// create html for each project in the project json
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
  })
  .catch(err => console.error("Failed to load projects:", err));


  // click to view description for mobile accessibility 
document.addEventListener('DOMContentLoaded', () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', e => {
        if (!card.classList.contains('tapped')) {
          e.preventDefault(); // stop the link from opening
          // remove 'tapped' from other cards
          document.querySelectorAll('.project-card.tapped').forEach(c => c.classList.remove('tapped'));
          // add it to this one
          card.classList.add('tapped');
        } else {
          // second tap = follow link
          window.location = card.href;
        }
      });
    });

    // Optional: remove 'tapped' if you tap outside a card
    document.addEventListener('click', e => {
      if (!e.target.closest('.project-card')) {
        document.querySelectorAll('.project-card.tapped').forEach(c => c.classList.remove('tapped'));
      }
    });
  }
});