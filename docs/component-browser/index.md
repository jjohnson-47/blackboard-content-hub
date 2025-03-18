---
layout: page
title: Component Browser
permalink: /component-browser/
---

# Component Browser

Browse and interact with all available components in the Blackboard Content Hub. This page provides a live demonstration of each component along with documentation and embedding instructions.

<div class="filter-controls">
  <div class="filter-row">
    <label for="category-filter">Category:</label>
    <select id="category-filter">
      <option value="all">All Categories</option>
      <option value="general">General</option>
      <option value="research">Research</option>
      <option value="courses">Courses</option>
    </select>
    
    <label for="course-filter" class="course-filter-label">Course:</label>
    <select id="course-filter">
      <option value="all">All Courses</option>
      <!-- Course options will be populated dynamically -->
    </select>
    
    <label for="type-filter">Type:</label>
    <select id="type-filter">
      <option value="all">All Types</option>
      <option value="shared">Shared Components</option>
      <option value="course-specific">Course-Specific Components</option>
    </select>
  </div>
  
  <div class="filter-row">
    <label for="search-components">Search:</label>
    <input type="text" id="search-components" placeholder="Search components...">
    
    <label for="tag-filter">Tags:</label>
    <select id="tag-filter">
      <option value="all">All Tags</option>
      <!-- Tag options will be populated dynamically -->
    </select>
  </div>
</div>

<div id="component-list" class="component-grid">
  <!-- Components will be loaded dynamically -->
  <div class="loading">Loading components...</div>
</div>

<template id="component-template">
  <div class="component-card">
    <h3 class="component-title"></h3>
    <div class="component-meta">
      <span class="component-category"></span>
      <span class="component-type"></span>
      <span class="component-course"></span>
    </div>
    <div class="component-tags"></div>
    <div class="component-description"></div>
    
    <div class="component-preview">
      <div class="preview-container">
        <iframe class="component-iframe" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="preview-controls">
        <button class="resize-btn" data-size="small">Small</button>
        <button class="resize-btn" data-size="medium">Medium</button>
        <button class="resize-btn" data-size="large">Large</button>
        <a href="#" class="open-new-tab" target="_blank">Open in new tab</a>
      </div>
    </div>
    
    <div class="component-docs">
      <h4>Documentation</h4>
      <div class="docs-content"></div>
      <a href="#" class="view-full-docs">View full documentation</a>
    </div>
    
    <div class="embed-code-section">
      <h4>Embed Code</h4>
      <pre class="embed-code"></pre>
      <button class="copy-btn">Copy to clipboard</button>
    </div>
  </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Load component data
  fetch('/blackboard-content-hub/component-data.json')
    .then(response => response.json())
    .then(data => {
      renderComponents(data);
      setupFiltering(data);
    })
    .catch(error => {
      document.querySelector('#component-list').innerHTML = 
        `<div class="error">Error loading components: ${error.message}</div>`;
    });
    
  function renderComponents(components) {
    const container = document.querySelector('#component-list');
    const template = document.querySelector('#component-template');
    
    // Clear loading message
    container.innerHTML = '';
    
    if (components.length === 0) {
      container.innerHTML = '<div class="no-results">No components match your current filters.</div>';
      return;
    }
    
    components.forEach(component => {
      const card = template.content.cloneNode(true);
      
      // Fill in component details
      card.querySelector('.component-title').textContent = component.title;
      card.querySelector('.component-category').textContent = component.category;
      card.querySelector('.component-type').textContent = component.type;
      card.querySelector('.component-description').textContent = component.description;
      
      // Add course info if available
      if (component.courseId) {
        card.querySelector('.component-course').textContent = component.courseId;
      } else {
        card.querySelector('.component-course').style.display = 'none';
      }
      
      // Add tags
      const tagsContainer = card.querySelector('.component-tags');
      if (component.tags && component.tags.length > 0) {
        component.tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.className = 'component-tag';
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
      } else {
        tagsContainer.style.display = 'none';
      }
      
      // Setup iframe
      const iframe = card.querySelector('.component-iframe');
      iframe.src = component.url;
      iframe.height = '300px';
      
      // Setup links
      card.querySelector('.open-new-tab').href = component.url;
      
      if (component.documentationUrl) {
        card.querySelector('.view-full-docs').href = component.documentationUrl;
        
        // Load documentation preview if available
        fetch(component.documentationUrl)
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('main') || doc.querySelector('.content');
            
            if (content) {
              // Extract a preview of the documentation
              const preview = content.textContent.substring(0, 200) + '...';
              card.querySelector('.docs-content').textContent = preview;
            } else {
              card.querySelector('.docs-content').textContent = 'Documentation available at link below.';
            }
          })
          .catch(() => {
            card.querySelector('.docs-content').textContent = 'Documentation available at link below.';
          });
      } else {
        card.querySelector('.docs-content').textContent = 'No documentation available for this component.';
        card.querySelector('.view-full-docs').style.display = 'none';
      }
      
      // Setup embed code
      const embedCode = `<iframe src="${component.url}" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`;
      card.querySelector('.embed-code').textContent = embedCode;
      
      // Setup copy button
      card.querySelector('.copy-btn').addEventListener('click', function() {
        navigator.clipboard.writeText(embedCode).then(() => {
          this.textContent = 'Copied!';
          setTimeout(() => {
            this.textContent = 'Copy to clipboard';
          }, 2000);
        });
      });
      
      // Setup resize buttons
      card.querySelectorAll('.resize-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const size = this.dataset.size;
          const iframe = this.closest('.component-card').querySelector('.component-iframe');
          
          switch(size) {
            case 'small':
              iframe.style.height = '200px';
              break;
            case 'medium':
              iframe.style.height = '300px';
              break;
            case 'large':
              iframe.style.height = '500px';
              break;
          }
        });
      });
      
      container.appendChild(card);
    });
  }
  
  function setupFiltering(components) {
    const categoryFilter = document.querySelector('#category-filter');
    const courseFilter = document.querySelector('#course-filter');
    const typeFilter = document.querySelector('#type-filter');
    const tagFilter = document.querySelector('#tag-filter');
    const search = document.querySelector('#search-components');
    
    // Populate course filter options
    const courses = [...new Set(components
      .filter(c => c.courseId)
      .map(c => c.courseId))].sort();
      
    courses.forEach(course => {
      const option = document.createElement('option');
      option.value = course;
      option.textContent = course;
      courseFilter.appendChild(option);
    });
    
    // Populate tag filter options
    const allTags = new Set();
    components.forEach(component => {
      if (component.tags) {
        component.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    [...allTags].sort().forEach(tag => {
      const option = document.createElement('option');
      option.value = tag;
      option.textContent = tag;
      tagFilter.appendChild(option);
    });
    
    // Show/hide course filter based on category selection
    categoryFilter.addEventListener('change', function() {
      const courseFilterLabel = document.querySelector('.course-filter-label');
      if (this.value === 'courses') {
        courseFilter.style.display = '';
        courseFilterLabel.style.display = '';
      } else {
        courseFilter.style.display = 'none';
        courseFilterLabel.style.display = 'none';
      }
      applyFilters();
    });
    
    // Trigger initial state
    if (categoryFilter.value !== 'courses') {
      courseFilter.style.display = 'none';
      document.querySelector('.course-filter-label').style.display = 'none';
    }
    
    function applyFilters() {
      const categoryValue = categoryFilter.value;
      const courseValue = courseFilter.value;
      const typeValue = typeFilter.value;
      const tagValue = tagFilter.value;
      const searchValue = search.value.toLowerCase();
      
      const filtered = components.filter(component => {
        // Apply category filter
        if (categoryValue !== 'all' && component.category !== categoryValue) {
          return false;
        }
        
        // Apply course filter (only if category is courses)
        if (categoryValue === 'courses' && courseValue !== 'all' && component.courseId !== courseValue) {
          return false;
        }
        
        // Apply type filter
        if (typeValue !== 'all' && component.type !== typeValue) {
          return false;
        }
        
        // Apply tag filter
        if (tagValue !== 'all' && (!component.tags || !component.tags.includes(tagValue))) {
          return false;
        }
        
        // Apply search filter
        if (searchValue && !component.title.toLowerCase().includes(searchValue) && 
            !component.description.toLowerCase().includes(searchValue)) {
          return false;
        }
        
        return true;
      });
      
      renderComponents(filtered);
    }
    
    // Set up event listeners for all filters
    categoryFilter.addEventListener('change', applyFilters);
    courseFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    tagFilter.addEventListener('change', applyFilters);
    search.addEventListener('input', applyFilters);
  }
});
</script>

<style>
.filter-controls {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
}

.filter-row {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 10px;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-controls label {
  font-weight: bold;
  min-width: 70px;
}

.filter-controls select,
.filter-controls input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.filter-controls input {
  flex-grow: 1;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.component-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.component-title {
  margin-top: 0;
  color: #2a5885;
}

.component-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.component-category,
.component-type,
.component-course {
  background: #f0f0f0;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.component-category {
  background: #e3f2fd;
  color: #0d47a1;
}

.component-type {
  background: #e8f5e9;
  color: #1b5e20;
}

.component-course {
  background: #fff3e0;
  color: #e65100;
}

.component-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.component-tag {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #616161;
}

.preview-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin: 15px 0;
}

.component-iframe {
  width: 100%;
  border: none;
}

.preview-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.resize-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.resize-btn:hover {
  background: #e0e0e0;
}

.component-docs {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.embed-code-section {
  margin-top: 15px;
}

.embed-code {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
}

.copy-btn {
  background: #2a5885;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}

.copy-btn:hover {
  background: #1e3f66;
}

.loading, .error, .no-results {
  grid-column: 1 / -1;
  padding: 20px;
  text-align: center;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  border-radius: 4px;
}

.no-results {
  color: #555;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>