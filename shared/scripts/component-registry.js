/**
 * Component Registry Service
 * 
 * Provides a unified view of components across all locations
 * (shared, course-specific, and development)
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Promisify fs functions
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);

class ComponentRegistry {
  constructor() {
    this.components = [];
    this.initialized = false;
    this.rootDir = path.join(__dirname, '../..');
    this.componentDataPath = path.join(this.rootDir, 'docs', 'component-data.json');
  }
  
  /**
   * Initialize the registry by scanning all component locations
   */
  async initialize() {
    if (this.initialized) return this.components;
    
    await this.scanAllLocations();
    this.initialized = true;
    
    return this.components;
  }
  
  /**
   * Scan all component locations and build the registry
   */
  async scanAllLocations() {
    // Clear existing registry
    this.components = [];
    
    try {
      // Scan shared components
      await this.scanDirectory('shared/components', 'shared');
      
      // Scan course-specific components
      const courses = await this.getCoursesList();
      for (const course of courses) {
        await this.scanDirectory(`courses/${course}`, 'course', course);
      }
      
      // Scan development components
      await this.scanDirectory('dev/components', 'development');
      
      // Read component-data.json for additional metadata
      await this.mergeComponentData();
      
      console.log(`Component registry initialized with ${this.components.length} components`);
      return this.components;
    } catch (error) {
      console.error('Error scanning component locations:', error);
      return [];
    }
  }
  
  /**
   * Get list of course directories
   */
  async getCoursesList() {
    try {
      const coursesDir = path.join(this.rootDir, 'courses');
      const entries = await readdir(coursesDir, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory())
        .map(dir => dir.name);
    } catch (error) {
      console.error('Error getting courses list:', error);
      return [];
    }
  }
  
  /**
   * Scan a directory for components
   * @param {string} dirPath - Relative path to directory
   * @param {string} locationType - Type of location (shared, course, development)
   * @param {string} courseId - Course ID (for course-specific components)
   */
  async scanDirectory(dirPath, locationType, courseId = null) {
    try {
      const fullPath = path.join(this.rootDir, dirPath);
      const entries = await readdir(fullPath, { withFileTypes: true });
      
      const htmlFiles = entries.filter(entry => 
        entry.isFile() && entry.name.endsWith('.html')
      );
      
      for (const file of htmlFiles) {
        const filePath = path.join(dirPath, file.name);
        const fullFilePath = path.join(this.rootDir, filePath);
        const stats = await stat(fullFilePath);
        
        // Extract component ID from filename
        const id = file.name.replace('.html', '');
        
        // Create basic component info
        const component = {
          id,
          name: file.name,
          title: this.formatTitle(id),
          path: filePath,
          fullPath: fullFilePath,
          locationType,
          lastModified: stats.mtime.toISOString()
        };
        
        // Add course ID for course-specific components
        if (courseId) {
          component.courseId = courseId;
        }
        
        // Add to registry
        this.components.push(component);
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error);
    }
  }
  
  /**
   * Format component ID as a title
   * @param {string} id - Component ID
   * @returns {string} Formatted title
   */
  formatTitle(id) {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  /**
   * Merge additional metadata from component-data.json
   */
  async mergeComponentData() {
    try {
      const data = await readFile(this.componentDataPath, 'utf8');
      const componentData = JSON.parse(data);
      
      // Update components with additional metadata
      for (const component of this.components) {
        const metadata = componentData.find(c => c.id === component.id);
        if (metadata) {
          // Merge metadata with component info
          Object.assign(component, {
            title: metadata.title || component.title,
            description: metadata.description,
            category: metadata.category,
            tags: metadata.tags,
            documentationUrl: metadata.documentationUrl
          });
        }
      }
    } catch (error) {
      console.error('Error merging component data:', error);
    }
  }
  
  /**
   * Get all components in the registry
   */
  getAllComponents() {
    return this.components;
  }
  
  /**
   * Get component by ID
   * @param {string} id - Component ID
   */
  getComponentById(id) {
    return this.components.find(c => c.id === id);
  }
  
  /**
   * Get components by location type
   * @param {string} locationType - Location type (shared, course, development)
   */
  getComponentsByLocation(locationType) {
    return this.components.filter(c => c.locationType === locationType);
  }
  
  /**
   * Add or update a component in the registry
   * @param {Object} component - Component data
   */
  registerComponent(component) {
    // Ensure component has required fields
    if (!component.id) {
      throw new Error('Component ID is required');
    }
    
    // Find existing component
    const index = this.components.findIndex(c => c.id === component.id);
    
    if (index >= 0) {
      // Update existing component
      this.components[index] = {...this.components[index], ...component};
    } else {
      // Add new component
      this.components.push(component);
    }
    
    // Update component-data.json if it's a production component
    if (component.locationType !== 'development') {
      this.updateComponentData(component);
    }
    
    return component;
  }
  
  /**
   * Update component-data.json with component info
   * @param {Object} component - Component data
   */
  async updateComponentData(component) {
    try {
      // Read existing component data
      const data = await readFile(this.componentDataPath, 'utf8');
      const componentData = JSON.parse(data);
      
      // Find existing component
      const index = componentData.findIndex(c => c.id === component.id);
      
      // Create component entry
      const componentEntry = {
        id: component.id,
        title: component.title || this.formatTitle(component.id),
        category: component.category || 'general',
        type: component.courseId ? 'course-specific' : 'shared',
        description: component.description || '',
        url: `/blackboard-content-hub/${component.path}`,
        documentationUrl: component.documentationUrl || `/blackboard-content-hub/examples/${component.id}.html`,
        tags: component.tags || []
      };
      
      // Add course ID for course-specific components
      if (component.courseId) {
        componentEntry.courseId = component.courseId;
      }
      
      if (index >= 0) {
        // Update existing entry
        componentData[index] = componentEntry;
      } else {
        // Add new entry
        componentData.push(componentEntry);
      }
      
      // Write updated data
      await writeFile(this.componentDataPath, JSON.stringify(componentData, null, 2));
      
    } catch (error) {
      console.error('Error updating component data:', error);
    }
  }
  
  /**
   * Remove a component from the registry
   * @param {string} id - Component ID
   */
  removeComponent(id) {
    const index = this.components.findIndex(c => c.id === id);
    if (index >= 0) {
      this.components.splice(index, 1);
    }
  }

  /**
   * Delete a component from the file system and registry
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
      
      // Delete file from file system
      if (component.fullPath) {
        await unlink(component.fullPath);
        console.log(`Deleted component file: ${component.fullPath}`);
      }
      
      // Remove from registry
      this.removeComponent(id);
      
      // If it's a production component, remove from component-data.json
      if (component.locationType !== 'development' && component.locationType !== 'local') {
        await this.removeFromComponentData(id);
      }
      
      // If it's a local component, remove from localStorage (handled by client)
      
      return true;
    } catch (error) {
      console.error(`Error deleting component ${id}:`, error);
      return false;
    }
  }
  
  /**
   * Remove component from component-data.json
   * @param {string} id - Component ID
   */
  async removeFromComponentData(id) {
    try {
      // Read existing component data
      const data = await readFile(this.componentDataPath, 'utf8');
      const componentData = JSON.parse(data);
      
      // Find and remove component
      const index = componentData.findIndex(c => c.id === id);
      
      if (index >= 0) {
        componentData.splice(index, 1);
        
        // Write updated data
        await writeFile(this.componentDataPath, JSON.stringify(componentData, null, 2));
        console.log(`Removed component ${id} from component-data.json`);
      }
    } catch (error) {
      console.error(`Error removing component ${id} from component-data.json:`, error);
    }
  }
}

// Export as singleton
const registry = new ComponentRegistry();
module.exports = registry;