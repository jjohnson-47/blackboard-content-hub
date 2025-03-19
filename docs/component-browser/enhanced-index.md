---
layout: page
title: Enhanced Component Browser
permalink: /component-browser/enhanced/
---

# Enhanced Component Browser

Browse and interact with all available components in the Blackboard Content Hub. This enhanced browser provides advanced filtering, sorting, and visualization capabilities.

<div class="browser-header">
  <div class="search-container">
    <input type="text" id="search-components" placeholder="Search components...">
    <button id="clear-filters" class="btn btn-outline btn-sm">
      <span class="material-icons">clear</span>
      Clear Filters
    </button>
  </div>
  
  <div class="view-controls">
    <button id="view-toggle" class="btn btn-outline btn-sm">
      <span class="material-icons">view_list</span>
      List View
    </button>
    <button id="filter-toggle" class="btn btn-outline btn-sm">
      <span class="material-icons">filter_list</span>
      Show Advanced Filters
    </button>
  </div>
</div>

<div class="filter-controls">
  <div class="filter-row">
    <label for="type-filter">Type:</label>
    <select id="type-filter">
      <option value="all">All Types</option>
      <option value="shared">Shared</option>
      <option value="course-specific">Course-Specific</option>
      <option value="development">Development</option>
    </select>
    
    <label for="category-filter">Category:</label>
    <select id="category-filter">
      <option value="all">All Categories</option>
      <!-- Categories will be populated dynamically -->
    </select>
    
    <label for="tag-filter">Tag:</label>
    <select id="tag-filter">
      <option value="all">All Tags</option>
      <!-- Tags will be populated dynamically -->
    </select>
    
    <label for="sort-select">Sort By:</label>
    <select id="sort-select">
      <option value="title-asc">Title (A-Z)</option>
      <option value="title-desc">Title (Z-A)</option>
      <option value="date-asc">Release Date (Oldest)</option>
      <option value="date-desc">Release Date (Newest)</option>
      <option value="version-asc">Version (Lowest)</option>
      <option value="version-desc">Version (Highest)</option>
    </select>
  </div>
  
  <div id="advanced-filters" class="advanced-filters">
    <div class="filter-row">
      <label for="subcategory-filter">Subcategory:</label>
      <select id="subcategory-filter">
        <option value="all">All Subcategories</option>
        <!-- Subcategories will be populated dynamically -->
      </select>
      
      <label for="course-filter">Course:</label>
      <select id="course-filter">
        <option value="all">All Courses</option>
        <!-- Courses will be populated dynamically -->
      </select>
      
      <label for="educational-level-filter">Educational Level:</label>
      <select id="educational-level-filter">
        <option value="all">All Levels</option>
        <!-- Educational levels will be populated dynamically -->
      </select>
      
      <label for="subject-area-filter">Subject Area:</label>
      <select id="subject-area-filter">
        <option value="all">All Subject Areas</option>
        <!-- Subject areas will be populated dynamically -->
      </select>
    </div>
  </div>
</div>

<div class="results-info">
  <span id="component-count">Loading components...</span>
</div>

<div id="component-list" class="component-grid">
  <!-- Components will be loaded dynamically -->
  <div class="loading">Loading components...</div>
</div>

<script src="/blackboard-content-hub/component-browser/enhanced-browser.js"></script>

<style>
/* Enhanced Component Browser Styles */
.browser-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  gap: 10px;
  flex: 1;
}

#search-components {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.view-controls {
  display: flex;
  gap: 10px;
}

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
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-controls label {
  font-weight: bold;
  min-width: 70px;
}

.filter-controls select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.advanced-filters {
  display: none;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
}

.advanced-filters.active {
  display: block;
}

.results-info {
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #666;
}

/* Component Grid */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

/* Component List View */
.component-list-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.component-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.component-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.component-title {
  margin-top: 0;
  margin-bottom: 5px;
  color: #2a5885;
  flex: 1;
}

.component-badges {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.version-badge,
.type-badge,
.category-badge,
.course-badge,
.wcag-badge,
.browser-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  white-space: nowrap;
}

.version-badge {
  background: #e3f2fd;
  color: #0d47a1;
}

.type-badge {
  background: #e8f5e9;
  color: #1b5e20;
}

.type-shared {
  background: #e8f5e9;
  color: #1b5e20;
}

.type-course-specific {
  background: #fff3e0;
  color: #e65100;
}

.type-development {
  background: #f3e5f5;
  color: #4a148c;
}

.category-badge {
  background: #f3e5f5;
  color: #4a148c;
}

.course-badge {
  background: #fff3e0;
  color: #e65100;
}

.wcag-badge {
  background: #e8eaf6;
  color: #1a237e;
}

.browser-badge {
  background: #f5f5f5;
  color: #616161;
  font-family: monospace;
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

.component-description {
  margin-bottom: 15px;
  line-height: 1.5;
}

.educational-context,
.accessibility-info,
.browser-support,
.component-meta {
  margin-bottom: 15px;
  font-size: 0.85rem;
  color: #555;
}

.educational-levels,
.subject-areas {
  margin-bottom: 5px;
}

.label {
  font-weight: bold;
  color: #333;
}

.component-authors,
.release-date {
  display: inline-block;
  margin-right: 15px;
}

.preview-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin: 15px 0;
}

.component-iframe {
  width: 100%;
  height: 300px;
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

.component-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  gap: 5px;
}

.btn-primary {
  background: #2a5885;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #1e3f66;
}

.btn-outline {
  background: transparent;
  color: #2a5885;
  border: 1px solid #2a5885;
}

.btn-outline:hover {
  background: rgba(42, 88, 133, 0.1);
}

.btn-sm {
  padding: 4px 8px;
  font-size: 0.8rem;
}

.btn .material-icons {
  font-size: 1rem;
}

.embed-code-section,
.version-history-section {
  display: none;
  margin-top: 15px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.embed-code-section.active,
.version-history-section.active {
  display: block;
}

.embed-code-section h4,
.version-history-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.embed-code {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.copy-btn {
  background: #2a5885;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.copy-btn:hover {
  background: #1e3f66;
}

.version-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.version-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.version-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.version-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.version-number {
  font-weight: bold;
  color: #2a5885;
}

.version-date {
  color: #666;
  font-size: 0.85rem;
}

.version-changes {
  padding-left: 20px;
  margin: 5px 0 0 0;
}

.no-history {
  color: #666;
  font-style: italic;
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

/* Responsive styles */
@media (max-width: 768px) {
  .browser-header {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-row label {
    margin-bottom: 5px;
  }
  
  .component-grid {
    grid-template-columns: 1fr;
  }
  
  .component-header {
    flex-direction: column;
  }
  
  .component-badges {
    margin-top: 10px;
  }
  
  .component-actions {
    flex-direction: column;
  }
}
</style>