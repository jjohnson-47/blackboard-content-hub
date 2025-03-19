---
layout: default
title: Component Browser
use_banner: true
banner_size: medium
banner_title: Component Browser
banner_subtitle: Explore and interact with all available iframe components
permalink: /component-browser/
---

# Component Browser

Browse and interact with our collection of iframe components. Each component is designed to be embedded in Blackboard courses and includes comprehensive documentation.

## Filter Components

<div class="iframe-navigation">
  <div class="iframe-categories">
    <button class="category-button active" data-category="all">All Components</button>
    <button class="category-button" data-category="calculus">Calculus</button>
    <button class="category-button" data-category="interactive">Interactive</button>
    <button class="category-button" data-category="visualization">Visualization</button>
    <button class="category-button" data-category="design">Design</button>
  </div>
  
  <div class="iframe-search">
    <input type="text" class="search-input" placeholder="Search components..." aria-label="Search components">
  </div>
</div>

<div class="iframe-grid" id="component-grid">
  <!-- Components will be loaded dynamically -->
  <div class="loading-container">
    <div class="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p>Loading components...</p>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Component data - in a real implementation, this would be loaded from an API or JSON file
  const components = [
    {
      title: "Dr. Zee's Flatland Message",
      description: "An interactive component that presents a mathematical problem in Flatland, where Dr. Zee needs to send a message to a square's house while traveling along a parabolic path with a fixed antenna.",
      url: "/examples/flatland-message",
      iframe_url: "/shared/components/flatland-message.html",
      tags: ["calculus", "interactive", "geogebra", "visualization"]
    },
    {
      title: "Design Tool Demo",
      description: "Interactive design tool demonstrating principles of visual design with real-time feedback and adjustable parameters.",
      url: "/examples/design-tool-demo",
      iframe_url: "/shared/components/design-tool-demo.html",
      tags: ["design", "interactive", "visualization"]
    }
    // Additional components would be added here
  ];
  
  const componentGrid = document.getElementById('component-grid');
  const categoryButtons = document.querySelectorAll('.category-button');
  const searchInput = document.querySelector('.search-input');
  
  // Clear loading indicator and render components
  function renderComponents(filteredComponents) {
    // Clear the grid
    componentGrid.innerHTML = '';
    
    if (filteredComponents.length === 0) {
      componentGrid.innerHTML = '<div class="no-results"><p>No components match your search criteria.</p></div>';
      return;
    }
    
    // Render each component
    filteredComponents.forEach(component => {
      const componentCard = document.createElement('div');
      componentCard.className = 'iframe-card';
      componentCard.setAttribute('data-tags', component.tags.join(' '));
      
      componentCard.innerHTML = `
        <div class="iframe-card-header">
          <div class="iframe-preview">
            <iframe src="${component.iframe_url}" title="${component.title}"></iframe>
          </div>
        </div>
        <div class="iframe-card-content">
          <h3 class="iframe-title">
            <a href="${component.url}">${component.title}</a>
          </h3>
          <p class="iframe-description">${component.description}</p>
          <div class="iframe-tags">
            ${component.tags.map(tag => `<span class="iframe-tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="iframe-card-footer">
          <a href="${component.url}" class="btn btn-sm btn-primary">View Details</a>
        </div>
      `;
      
      componentGrid.appendChild(componentCard);
    });
  }
  
  // Filter components based on category and search term
  function filterComponents() {
    const activeCategory = document.querySelector('.category-button.active').getAttribute('data-category');
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredComponents = components;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filteredComponents = filteredComponents.filter(component => 
        component.tags.includes(activeCategory)
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      filteredComponents = filteredComponents.filter(component => 
        component.title.toLowerCase().includes(searchTerm) || 
        component.description.toLowerCase().includes(searchTerm) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    renderComponents(filteredComponents);
  }
  
  // Set up category button click handlers
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter components
      filterComponents();
    });
  });
  
  // Set up search input handler
  searchInput.addEventListener('input', filterComponents);
  
  // Initial render
  filterComponents();
});
</script>