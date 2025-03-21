/**
 * Component Registry Client
 * 
 * Browser-compatible client for the unified component registry.
 * Provides access to components from all locations.
 */

class ComponentRegistryClient {
  constructor() {
    this.components = [];
    this.initialized = false;
    this.apiUrl = '/api/components';
  }

  /**
   * Initialize the registry client
   * @returns {Promise<Array>} Array of components
   */
  async initialize() {
    if (this.initialized) return this.components;
    
    try {
      // Try to fetch components from API
      const response = await fetch(this.apiUrl);
      
      if (response.ok) {
        this.components = await response.json();
        console.log(`Component registry client initialized with ${this.components.length} components from API`);
      } else {
        console.warn('Failed to fetch components from API, falling back to localStorage');
        this.loadFromLocalStorage();
      }
      
      this.initialized = true;
      return this.components;
    } catch (error) {
      console.error('Error initializing component registry client:', error);
      
      // Fallback to localStorage
      this.loadFromLocalStorage();
      this.initialized = true;
      return this.components;
    }
  }
  
  /**
   * Load components from localStorage
   */
  loadFromLocalStorage() {
    try {
      // Get projects list from localStorage
      const storedProjects = localStorage.getItem('projectsList');
      
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        
        // Convert projects to components
        this.components = projects.map(project => ({
          id: project.id,
          name: project.name,
          title: project.id.charAt(0).toUpperCase() + project.id.slice(1).replace(/-/g, ' '),
          locationType: 'local',
          lastModified: project.lastModified
        }));
        
        console.log(`Loaded ${this.components.length} components from localStorage`);
      } else {
        this.components = [];
        console.log('No components found in localStorage');
      }
    } catch (error) {
      console.error('Error loading components from localStorage:', error);
      this.components = [];
    }
  }
  
  /**
   * Get all components
   * @returns {Array} Array of components
   */
  getAllComponents() {
    return this.components;
  }
  
  /**
   * Get component by ID
   * @param {string} id - Component ID
   * @returns {Object|null} Component object or null if not found
   */
  getComponentById(id) {
    return this.components.find(c => c.id === id) || null;
  }
  
  /**
   * Get components by location type
   * @param {string} locationType - Location type (local, development, shared, course)
   * @returns {Array} Array of components
   */
  getComponentsByLocation(locationType) {
    return this.components.filter(c => c.locationType === locationType);
  }
  
  /**
   * Search components by query
   * @param {string} query - Search query
   * @returns {Array} Array of matching components
   */
  searchComponents(query) {
    if (!query) return this.components;
    
    const lowerQuery = query.toLowerCase();
    
    return this.components.filter(component => {
      // Search in ID, title, description, and tags
      return (
        component.id.toLowerCase().includes(lowerQuery) ||
        (component.title && component.title.toLowerCase().includes(lowerQuery)) ||
        (component.description && component.description.toLowerCase().includes(lowerQuery)) ||
        (component.tags && component.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    });
  }
  
  /**
   * Filter components by location and search query
   * @param {string} locationType - Location type (all, local, development, shared, course)
   * @param {string} searchQuery - Search query
   * @returns {Array} Array of filtered components
   */
  filterComponents(locationType = 'all', searchQuery = '') {
    let filtered = this.components;
    
    // Filter by location type
    if (locationType !== 'all') {
      filtered = filtered.filter(c => c.locationType === locationType);
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      
      filtered = filtered.filter(component => {
        // Search in ID, title, description, and tags
        return (
          component.id.toLowerCase().includes(lowerQuery) ||
          (component.title && component.title.toLowerCase().includes(lowerQuery)) ||
          (component.description && component.description.toLowerCase().includes(lowerQuery)) ||
          (component.tags && component.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
      });
    }
    
    return filtered;
  }
  
  /**
   * Register a component with the registry
   * @param {Object} component - Component data
   * @returns {Promise<Object>} Registered component
   */
  async registerComponent(component) {
    try {
      // Ensure component has required fields
      if (!component.id) {
        throw new Error('Component ID is required');
      }
      
      // Add to local registry
      const index = this.components.findIndex(c => c.id === component.id);
      
      if (index >= 0) {
        // Update existing component
        this.components[index] = {...this.components[index], ...component};
      } else {
        // Add new component
        this.components.push(component);
      }
      
      // Try to register with server
      try {
        const response = await fetch(`${this.apiUrl}/${component.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(component)
        });
        
        if (!response.ok) {
          console.warn(`Failed to register component with server: ${response.statusText}`);
        }
      } catch (error) {
        console.warn('Failed to register component with server:', error);
      }
      
      return component;
    } catch (error) {
      console.error('Error registering component:', error);
      throw error;
    }
  }

  /**
   * Delete a component
   * @param {string} id - Component ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteComponent(id) {
    try {
      // Find component in registry
      const component = this.getComponentById(id);
      
      if (!component) {
        console.error(`Component not found: ${id}`);
        return false;
      }
      
      // Handle local components (stored in localStorage)
      if (component.locationType === 'local') {
        // Remove from localStorage
        localStorage.removeItem(`component_${id}`);
        
        // Update projects list
        const storedProjects = localStorage.getItem('projectsList');
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          const updatedProjects = projects.filter(p => p.id !== id);
          localStorage.setItem('projectsList', JSON.stringify(updatedProjects));
        }
        
        // Remove from registry
        const index = this.components.findIndex(c => c.id === id);
        if (index >= 0) {
          this.components.splice(index, 1);
        }
        
        return true;
      }
      
      // For non-local components, call the server API
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Remove from registry
        const index = this.components.findIndex(c => c.id === id);
        if (index >= 0) {
          this.components.splice(index, 1);
        }
        
        return true;
      } else {
        console.error(`Failed to delete component: ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error(`Error deleting component ${id}:`, error);
      return false;
    }
  }
}

// Create global instance
window.componentRegistry = new ComponentRegistryClient();