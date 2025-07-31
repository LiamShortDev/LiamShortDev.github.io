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
