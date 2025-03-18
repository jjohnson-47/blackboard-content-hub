#!/usr/bin/env node

/**
 * Course Creation Tool
 * 
 * This script creates a new course directory structure
 * and sets up the necessary files.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Template for course README
const readmeTemplate = `# {{COURSE_TITLE}}

This directory contains interactive components for {{COURSE_TITLE}} ({{COURSE_ID}}).

## Components

Components in this directory:

- (No components yet)

## Usage

To add a new component to this course, use the create-component.js tool:

\`\`\`
node tools/create-component.js
\`\`\`

Then select "course-specific" as the component type and "{{COURSE_ID}}" as the course ID.
`;

// Template for course index page
const indexTemplate = `---
layout: page
title: {{COURSE_TITLE}} Components
permalink: /courses/{{COURSE_ID}}/
---

# {{COURSE_TITLE}} Components

This page lists all interactive components available for {{COURSE_TITLE}} ({{COURSE_ID}}).

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
        component.courseId === '{{COURSE_ID}}'
      );
      
      renderComponents(courseComponents);
    })
    .catch(error => {
      document.querySelector('#course-components').innerHTML = 
        \`<div class="error">Error loading components: \${error.message}</div>\`;
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
`;

// Ask questions to configure the course
rl.question('Course ID (e.g., math-a251, stat-a253): ', (courseId) => {
  rl.question('Course title: ', (courseTitle) => {
    rl.question('Course description: ', (courseDescription) => {
      createCourse(courseId, courseTitle, courseDescription);
    });
  });
});

function createCourse(courseId, courseTitle, courseDescription) {
  const rootDir = path.join(__dirname, '..');
  
  // Create course directory
  const courseDir = path.join(rootDir, 'courses', courseId);
  if (!fs.existsSync(courseDir)) {
    fs.mkdirSync(courseDir, { recursive: true });
    console.log(`Created course directory: ${courseDir}`);
  } else {
    console.log(`Course directory already exists: ${courseDir}`);
  }
  
  // Create README.md
  const readmePath = path.join(courseDir, 'README.md');
  let readme = readmeTemplate;
  readme = readme.replace(/{{COURSE_TITLE}}/g, courseTitle);
  readme = readme.replace(/{{COURSE_ID}}/g, courseId);
  
  fs.writeFileSync(readmePath, readme);
  console.log(`Created course README: ${readmePath}`);
  
  // Create course index page in docs
  const docsDir = path.join(rootDir, 'docs', 'courses', courseId);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  const indexPath = path.join(docsDir, 'index.md');
  let index = indexTemplate;
  index = index.replace(/{{COURSE_TITLE}}/g, courseTitle);
  index = index.replace(/{{COURSE_ID}}/g, courseId);
  
  fs.writeFileSync(indexPath, index);
  console.log(`Created course index page: ${indexPath}`);
  
  // Update courses list in docs
  updateCoursesList(rootDir, courseId, courseTitle, courseDescription);
  
  console.log(`\nCourse "${courseTitle}" (${courseId}) has been created successfully.`);
  console.log(`Course page will be available at: https://yourusername.github.io/blackboard-content-hub/courses/${courseId}/`);
  
  rl.close();
}

function updateCoursesList(rootDir, courseId, courseTitle, courseDescription) {
  // Check if courses index page exists
  const coursesIndexPath = path.join(rootDir, 'docs', 'courses', 'index.md');
  
  if (!fs.existsSync(path.dirname(coursesIndexPath))) {
    fs.mkdirSync(path.dirname(coursesIndexPath), { recursive: true });
  }
  
  // Create courses index if it doesn't exist
  if (!fs.existsSync(coursesIndexPath)) {
    const coursesIndexTemplate = `---
layout: page
title: Courses
permalink: /courses/
---

# Available Courses

This page lists all available courses with interactive components.

<div class="courses-list">
  <ul>
    <li>
      <a href="{{ site.baseurl }}/courses/${courseId}/">
        <strong>${courseTitle}</strong>
      </a>
      <p>${courseDescription}</p>
    </li>
  </ul>
</div>
`;
    
    fs.writeFileSync(coursesIndexPath, coursesIndexTemplate);
    console.log(`Created courses index page: ${coursesIndexPath}`);
    return;
  }
  
  // Update existing courses index
  let coursesIndex = fs.readFileSync(coursesIndexPath, 'utf8');
  
  // Check if course is already in the list
  if (coursesIndex.includes(`/courses/${courseId}/`)) {
    console.log(`Course ${courseId} is already in the courses list.`);
    return;
  }
  
  // Add course to the list
  const courseEntry = `    <li>
      <a href="{{ site.baseurl }}/courses/${courseId}/">
        <strong>${courseTitle}</strong>
      </a>
      <p>${courseDescription}</p>
    </li>`;
  
  // Find the end of the ul element
  const ulEndIndex = coursesIndex.indexOf('</ul>');
  
  if (ulEndIndex !== -1) {
    // Insert the new course entry before the end of the ul
    coursesIndex = coursesIndex.slice(0, ulEndIndex) + courseEntry + '\n' + coursesIndex.slice(ulEndIndex);
    
    fs.writeFileSync(coursesIndexPath, coursesIndex);
    console.log(`Updated courses index page with new course: ${coursesIndexPath}`);
  } else {
    console.log(`Could not find </ul> in courses index page. Manual update required.`);
  }
}