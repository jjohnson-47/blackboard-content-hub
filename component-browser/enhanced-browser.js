/**
 * Enhanced Component Browser
 * 
 * This script provides an improved component browser with advanced filtering,
 * sorting, and visualization capabilities for the Blackboard Content Hub.
 */

document.addEventListener('DOMContentLoaded', function() {
  // State
  let components = [];
  let filteredComponents = [];
  let categories = new Set();
  let subcategories = new Set();
  let tags = new Set();
  let courses = new Set();
  let educationalLevels = new Set();
  let subjectAreas = new Set();
  
  // DOM Elements
  const componentList = document.getElementById('component-list');
  const searchInput = document.getElementById('search-components');
  const typeFilter = document.getElementById('type-filter');
  const categoryFilter = document.getElementById('category-filter');
  const subcategoryFilter = document.getElementById('subcategory-filter');
  const tagFilter = document.getElementById('tag-filter');
  const courseFilter = document.getElementById('course-filter');
  const educationalLevelFilter = document.getElementById('educational-level-filter');
  const subjectAreaFilter = document.getElementById('subject-area-filter');
  const sortSelect = document.getElementById('sort-select');
  const filterToggle = document.getElementById('filter-toggle');
  const advancedFilters = document.getElementById('advanced-filters');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const viewToggle = document.getElementById('view-toggle');
  
  // Load component data
  fetch('/blackboard-content-hub/component-data.json')
    .then(response => response.json())
    .then(data => {
      components = data;
      filteredComponents = [...components];
      
      // Extract filter options
      extractFilterOptions();
      
      // Populate filter dropdowns
      populateFilters();
      
      // Render components
      renderComponents();
      
      // Set up event listeners
      setupEventListeners();
    })
    .catch(error => {
      componentList.innerHTML = 
        `<div class="error">Error loading components: ${error.message}</div>`;
    });
  
  /**
   * Extract filter options from components
   */
  function extractFilterOptions() {
    components.forEach(component => {
      // Categories
      if (component.category) {
        categories.add(component.category);
      }
      
      // Subcategories
      if (component.subcategory) {
        subcategories.add(component.subcategory);
      }
      
      // Tags
      if (component.tags && Array.isArray(component.tags)) {
        component.tags.forEach(tag => tags.add(tag));
      }
      
      // Courses
      if (component.courseId) {
        courses.add(component.courseId);
      }
      
      // Educational levels
      if (component.educationalContext && component.educationalContext.educationalLevel) {
        component.educationalContext.educationalLevel.forEach(level => {
          educationalLevels.add(level);
        });
      }
      
      // Subject areas
      if (component.educationalContext && component.educationalContext.subjectAreas) {
        component.educationalContext.subjectAreas.forEach(area => {
          subjectAreas.add(area);
        });
      }
    });
  }
  
  /**
   * Populate filter dropdowns
   */
  function populateFilters() {
    // Categories
    populateSelect(categoryFilter, Array.from(categories).sort());
    
    // Subcategories
    populateSelect(subcategoryFilter, Array.from(subcategories).sort());
    
    // Tags
    populateSelect(tagFilter, Array.from(tags).sort());
    
    // Courses
    populateSelect(courseFilter, Array.from(courses).sort());
    
    // Educational levels
    populateSelect(educationalLevelFilter, Array.from(educationalLevels).sort());
    
    // Subject areas
    populateSelect(subjectAreaFilter, Array.from(subjectAreas).sort());
  }
  
  /**
   * Populate a select element with options
   * @param {HTMLSelectElement} select - Select element to populate
   * @param {Array} options - Options to add
   */
  function populateSelect(select, options) {
    if (!select) return;
    
    // Keep the first option (All)
    const firstOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(firstOption);
    
    // Add options
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });
  }
  
  /**
   * Set up event listeners
   */
  function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', applyFilters);
    
    // Filters
    typeFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    subcategoryFilter.addEventListener('change', applyFilters);
    tagFilter.addEventListener('change', applyFilters);
    courseFilter.addEventListener('change', applyFilters);
    educationalLevelFilter.addEventListener('change', applyFilters);
    subjectAreaFilter.addEventListener('change', applyFilters);
    
    // Sort
    sortSelect.addEventListener('change', applyFilters);
    
    // Filter toggle
    filterToggle.addEventListener('click', () => {
      advancedFilters.classList.toggle('active');
      filterToggle.textContent = advancedFilters.classList.contains('active') 
        ? 'Hide Advanced Filters' 
        : 'Show Advanced Filters';
    });
    
    // View toggle
    viewToggle.addEventListener('click', () => {
      const isGrid = componentList.classList.contains('component-grid');
      componentList.classList.toggle('component-grid');
      componentList.classList.toggle('component-list-view');
      viewToggle.innerHTML = isGrid 
        ? '<span class="material-icons">grid_view</span> Grid View' 
        : '<span class="material-icons">view_list</span> List View';
    });
    
    // Clear filters
    clearFiltersBtn.addEventListener('click', clearFilters);
  }
  
  /**
   * Apply filters and sort
   */
  function applyFilters() {
    const searchValue = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value;
    const categoryValue = categoryFilter.value;
    const subcategoryValue = subcategoryFilter.value;
    const tagValue = tagFilter.value;
    const courseValue = courseFilter.value;
    const educationalLevelValue = educationalLevelFilter.value;
    const subjectAreaValue = subjectAreaFilter.value;
    
    // Filter components
    filteredComponents = components.filter(component => {
      // Search
      if (searchValue && !matchesSearch(component, searchValue)) {
        return false;
      }
      
      // Type
      if (typeValue !== 'all' && component.type !== typeValue) {
        return false;
      }
      
      // Category
      if (categoryValue !== 'all' && component.category !== categoryValue) {
        return false;
      }
      
      // Subcategory
      if (subcategoryValue !== 'all' && component.subcategory !== subcategoryValue) {
        return false;
      }
      
      // Tag
      if (tagValue !== 'all' && (!component.tags || !component.tags.includes(tagValue))) {
        return false;
      }
      
      // Course
      if (courseValue !== 'all' && component.courseId !== courseValue) {
        return false;
      }
      
      // Educational level
      if (educationalLevelValue !== 'all') {
        if (!component.educationalContext || 
            !component.educationalContext.educationalLevel ||
            !component.educationalContext.educationalLevel.includes(educationalLevelValue)) {
          return false;
        }
      }
      
      // Subject area
      if (subjectAreaValue !== 'all') {
        if (!component.educationalContext || 
            !component.educationalContext.subjectAreas ||
            !component.educationalContext.subjectAreas.includes(subjectAreaValue)) {
          return false;
        }
      }
      
      return true;
    });
    
    // Sort components
    sortComponents();
    
    // Render components
    renderComponents();
  }
  
  /**
   * Check if component matches search query
   * @param {Object} component - Component to check
   * @param {string} query - Search query
   * @returns {boolean} Whether component matches search query
   */
  function matchesSearch(component, query) {
    // Split query into words
    const words = query.split(' ').filter(word => word.length > 0);
    
    // Check if all words match
    return words.every(word => {
      // Check title
      if (component.title.toLowerCase().includes(word)) {
        return true;
      }
      
      // Check description
      if (component.description.toLowerCase().includes(word)) {
        return true;
      }
      
      // Check tags
      if (component.tags && component.tags.some(tag => tag.toLowerCase().includes(word))) {
        return true;
      }
      
      // Check ID
      if (component.id.toLowerCase().includes(word)) {
        return true;
      }
      
      // Check category
      if (component.category && component.category.toLowerCase().includes(word)) {
        return true;
      }
      
      // Check subcategory
      if (component.subcategory && component.subcategory.toLowerCase().includes(word)) {
        return true;
      }
      
      // Check course ID
      if (component.courseId && component.courseId.toLowerCase().includes(word)) {
        return true;
      }
      
      // Check educational context
      if (component.educationalContext) {
        // Check learning objectives
        if (component.educationalContext.learningObjectives && 
            component.educationalContext.learningObjectives.some(obj => obj.toLowerCase().includes(word))) {
          return true;
        }
        
        // Check educational levels
        if (component.educationalContext.educationalLevel && 
            component.educationalContext.educationalLevel.some(level => level.toLowerCase().includes(word))) {
          return true;
        }
        
        // Check subject areas
        if (component.educationalContext.subjectAreas && 
            component.educationalContext.subjectAreas.some(area => area.toLowerCase().includes(word))) {
          return true;
        }
      }
      
      return false;
    });
  }
  
  /**
   * Sort components based on selected sort option
   */
  function sortComponents() {
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
      case 'title-asc':
        filteredComponents.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filteredComponents.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date-asc':
        filteredComponents.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        break;
      case 'date-desc':
        filteredComponents.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'version-asc':
        filteredComponents.sort((a, b) => compareVersions(a.version, b.version));
        break;
      case 'version-desc':
        filteredComponents.sort((a, b) => compareVersions(b.version, a.version));
        break;
    }
  }
  
  /**
   * Compare semantic versions
   * @param {string} a - First version
   * @param {string} b - Second version
   * @returns {number} Comparison result
   */
  function compareVersions(a, b) {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);
    
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] || 0;
      const bPart = bParts[i] || 0;
      
      if (aPart !== bPart) {
        return aPart - bPart;
      }
    }
    
    return 0;
  }
  
  /**
   * Clear all filters
   */
  function clearFilters() {
    searchInput.value = '';
    typeFilter.value = 'all';
    categoryFilter.value = 'all';
    subcategoryFilter.value = 'all';
    tagFilter.value = 'all';
    courseFilter.value = 'all';
    educationalLevelFilter.value = 'all';
    subjectAreaFilter.value = 'all';
    sortSelect.value = 'title-asc';
    
    applyFilters();
  }
  
  /**
   * Render components
   */
  function renderComponents() {
    // Clear component list
    componentList.innerHTML = '';
    
    // Show message if no components match filters
    if (filteredComponents.length === 0) {
      componentList.innerHTML = '<div class="no-results">No components match your current filters.</div>';
      return;
    }
    
    // Render components
    filteredComponents.forEach(component => {
      const card = createComponentCard(component);
      componentList.appendChild(card);
    });
    
    // Update component count
    const countElement = document.getElementById('component-count');
    if (countElement) {
      countElement.textContent = `${filteredComponents.length} component${filteredComponents.length !== 1 ? 's' : ''} found`;
    }
  }
  
  /**
   * Create component card
   * @param {Object} component - Component data
   * @returns {HTMLElement} Component card element
   */
  function createComponentCard(component) {
    const card = document.createElement('div');
    card.className = 'component-card';
    card.setAttribute('data-id', component.id);
    card.setAttribute('data-type', component.type);
    card.setAttribute('data-category', component.category);
    
    // Version badge
    const versionBadge = `<span class="version-badge">v${component.version}</span>`;
    
    // Type badge
    const typeBadge = `<span class="type-badge type-${component.type}">${component.type}</span>`;
    
    // Category badge
    const categoryBadge = `<span class="category-badge">${component.category}</span>`;
    
    // Course badge (if applicable)
    const courseBadge = component.courseId ? `<span class="course-badge">${component.courseId}</span>` : '';
    
    // Tags
    const tagsHtml = component.tags && component.tags.length > 0
      ? `<div class="component-tags">${component.tags.map(tag => `<span class="component-tag">${tag}</span>`).join('')}</div>`
      : '';
    
    // Educational context
    let educationalContextHtml = '';
    if (component.educationalContext) {
      const levels = component.educationalContext.educationalLevel
        ? `<div class="educational-levels"><span class="label">Levels:</span> ${component.educationalContext.educationalLevel.join(', ')}</div>`
        : '';
      
      const subjects = component.educationalContext.subjectAreas
        ? `<div class="subject-areas"><span class="label">Subjects:</span> ${component.educationalContext.subjectAreas.join(', ')}</div>`
        : '';
      
      if (levels || subjects) {
        educationalContextHtml = `
          <div class="educational-context">
            ${levels}
            ${subjects}
          </div>
        `;
      }
    }
    
    // Accessibility info
    let accessibilityHtml = '';
    if (component.accessibility && component.accessibility.wcag) {
      accessibilityHtml = `
        <div class="accessibility-info">
          <span class="wcag-badge">WCAG ${component.accessibility.wcag}</span>
        </div>
      `;
    }
    
    // Browser support
    let browserSupportHtml = '';
    if (component.browserSupport) {
      const browsers = Object.entries(component.browserSupport)
        .map(([browser, version]) => `<span class="browser-badge browser-${browser}">${browser} ${version}</span>`)
        .join('');
      
      browserSupportHtml = `
        <div class="browser-support">
          ${browsers}
        </div>
      `;
    }
    
    // Authors
    let authorsHtml = '';
    if (component.authors && component.authors.length > 0) {
      const authorsList = component.authors
        .map(author => `<span class="author">${author.name}</span>`)
        .join(', ');
      
      authorsHtml = `
        <div class="component-authors">
          <span class="label">By:</span> ${authorsList}
        </div>
      `;
    }
    
    // Release date
    const releaseDateHtml = component.releaseDate
      ? `<div class="release-date">Released: ${formatDate(component.releaseDate)}</div>`
      : '';
    
    // Card content
    card.innerHTML = `
      <div class="component-header">
        <h3 class="component-title">${component.title}</h3>
        <div class="component-badges">
          ${versionBadge}
          ${typeBadge}
          ${categoryBadge}
          ${courseBadge}
        </div>
      </div>
      
      ${tagsHtml}
      
      <div class="component-description">${component.description}</div>
      
      ${educationalContextHtml}
      ${accessibilityHtml}
      ${browserSupportHtml}
      
      <div class="component-meta">
        ${authorsHtml}
        ${releaseDateHtml}
      </div>
      
      <div class="component-preview">
        <div class="preview-container">
          <iframe class="component-iframe" src="${component.url}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="preview-controls">
          <button class="resize-btn" data-size="small">Small</button>
          <button class="resize-btn" data-size="medium">Medium</button>
          <button class="resize-btn" data-size="large">Large</button>
          <a href="${component.url}" class="open-new-tab" target="_blank">Open in new tab</a>
        </div>
      </div>
      
      <div class="component-actions">
        <a href="${component.documentationUrl}" class="btn btn-primary">
          <span class="material-icons">description</span>
          Documentation
        </a>
        <button class="btn btn-outline embed-code-btn">
          <span class="material-icons">code</span>
          Embed Code
        </button>
        <button class="btn btn-outline version-history-btn">
          <span class="material-icons">history</span>
          Version History
        </button>
      </div>
      
      <div class="embed-code-section">
        <h4>Embed Code</h4>
        <pre class="embed-code">&lt;iframe src="${component.url}" width="100%" height="500" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;</pre>
        <button class="copy-btn">Copy to clipboard</button>
      </div>
      
      <div class="version-history-section">
        <h4>Version History</h4>
        <ul class="version-list">
          ${renderVersionHistory(component)}
        </ul>
      </div>
    `;
    
    // Add event listeners
    addCardEventListeners(card, component);
    
    return card;
  }
  
  /**
   * Add event listeners to component card
   * @param {HTMLElement} card - Component card element
   * @param {Object} component - Component data
   */
  function addCardEventListeners(card, component) {
    // Resize buttons
    card.querySelectorAll('.resize-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const size = this.dataset.size;
        const iframe = card.querySelector('.component-iframe');
        
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
    
    // Embed code button
    const embedCodeBtn = card.querySelector('.embed-code-btn');
    const embedCodeSection = card.querySelector('.embed-code-section');
    
    if (embedCodeBtn && embedCodeSection) {
      embedCodeBtn.addEventListener('click', function() {
        embedCodeSection.classList.toggle('active');
        this.classList.toggle('active');
        
        // Hide version history section
        const versionHistorySection = card.querySelector('.version-history-section');
        if (versionHistorySection) {
          versionHistorySection.classList.remove('active');
        }
        
        const versionHistoryBtn = card.querySelector('.version-history-btn');
        if (versionHistoryBtn) {
          versionHistoryBtn.classList.remove('active');
        }
      });
    }
    
    // Version history button
    const versionHistoryBtn = card.querySelector('.version-history-btn');
    const versionHistorySection = card.querySelector('.version-history-section');
    
    if (versionHistoryBtn && versionHistorySection) {
      versionHistoryBtn.addEventListener('click', function() {
        versionHistorySection.classList.toggle('active');
        this.classList.toggle('active');
        
        // Hide embed code section
        embedCodeSection.classList.remove('active');
        embedCodeBtn.classList.remove('active');
      });
    }
    
    // Copy button
    const copyBtn = card.querySelector('.copy-btn');
    const embedCode = card.querySelector('.embed-code');
    
    if (copyBtn && embedCode) {
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(embedCode.textContent).then(() => {
          this.textContent = 'Copied!';
          setTimeout(() => {
            this.textContent = 'Copy to clipboard';
          }, 2000);
        });
      });
    }
  }
  
  /**
   * Render version history
   * @param {Object} component - Component data
   * @returns {string} HTML for version history
   */
  function renderVersionHistory(component) {
    if (!component.versionHistory || component.versionHistory.length === 0) {
      return '<li class="no-history">No version history available</li>';
    }
    
    return component.versionHistory
      .sort((a, b) => compareVersions(b.version, a.version)) // Sort by version (newest first)
      .map(version => `
        <li class="version-item">
          <div class="version-header">
            <span class="version-number">v${version.version}</span>
            <span class="version-date">${formatDate(version.date)}</span>
          </div>
          <ul class="version-changes">
            ${version.changes.map(change => `<li>${change}</li>`).join('')}
          </ul>
        </li>
      `)
      .join('');
  }
  
  /**
   * Format date
   * @param {string} dateString - Date string
   * @returns {string} Formatted date
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
});