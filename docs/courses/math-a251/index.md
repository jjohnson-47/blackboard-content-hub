---
layout: page
title: Calculus I Components
permalink: /courses/math-a251/
---

# Calculus I Components

This page lists all interactive components available for Calculus I (MATH A251).

<div class="component-list" id="course-components">
  <!-- Components will be loaded dynamically -->
  <p class="loading">Loading components...</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Load component data
  fetch('/blackboard-content-hub/component-data.json')
    .then(response => response.json())
    .then(data => {
      // Filter components for this course
      const courseComponents = data.filter(component => 
        component.type === 'course-specific' && 
        component.courseId === 'math-a251'
      );
      
      renderComponents(courseComponents);
    })
    .catch(error => {
      document.querySelector('#course-components').innerHTML = 
        `<div class="error">Error loading components: ${error.message}</div>`;
    });
    
  function renderComponents(components) {
    const container = document.querySelector('#course-components');
    
    // Clear loading message
    container.innerHTML = '';
    
    if (components.length === 0) {
      container.innerHTML = '<div class="no-results">No components available for this course yet.</div>';
      return;
    }
    
    // Create a list of components
    const list = document.createElement('ul');
    list.className = 'component-grid';
    
    components.forEach(component => {
      const item = document.createElement('li');
      item.className = 'component-item';
      
      const link = document.createElement('a');
      link.href = component.url;
      link.className = 'component-link';
      
      const title = document.createElement('h3');
      title.textContent = component.title;
      
      const description = document.createElement('p');
      description.textContent = component.description;
      
      const docsLink = document.createElement('a');
      docsLink.href = component.documentationUrl;
      docsLink.className = 'docs-link';
      docsLink.textContent = 'View Documentation';
      
      link.appendChild(title);
      item.appendChild(link);
      item.appendChild(description);
      item.appendChild(docsLink);
      
      list.appendChild(item);
    });
    
    container.appendChild(list);
  }
});
</script>

<style>
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
}

.component-item {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.component-link {
  text-decoration: none;
  color: #4a148c;
}

.component-link h3 {
  margin-top: 0;
}

.docs-link {
  display: inline-block;
  margin-top: 10px;
  background: #4a148c;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
}

.docs-link:hover {
  background: #7c43bd;
}

.loading, .error, .no-results {
  padding: 20px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 8px;
}

.error {
  color: #d32f2f;
  background: #ffebee;
}
</style>