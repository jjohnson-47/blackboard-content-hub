---
layout: home
title: Blackboard Content Hub
---

# Blackboard Content Hub

Welcome to the documentation for the Blackboard Content Hub, a comprehensive solution for creating, managing, and embedding interactive educational content in Blackboard Learning Management System.

## What is the Blackboard Content Hub?

The Blackboard Content Hub is a platform that allows educators to create rich, interactive content components that can be embedded in Blackboard courses. These components are hosted as iframes and can include:

- Interactive visualizations
- Simulations and demonstrations
- Practice exercises and assessments
- Multimedia presentations
- Data visualization tools
- And much more!

## Getting Started

<div class="grid-container">
  <div class="grid-item">
    <h3><a href="{{ site.baseurl }}/user-guide/">User Guide</a></h3>
    <p>Learn how to create, manage, and embed content as an instructor or content creator.</p>
  </div>
  <div class="grid-item">
    <h3><a href="{{ site.baseurl }}/developer-guide/">Developer Guide</a></h3>
    <p>Technical documentation for developers extending or customizing the system.</p>
  </div>
  <div class="grid-item">
    <h3><a href="{{ site.baseurl }}/examples/">Examples</a></h3>
    <p>Browse example components and implementations to get inspired.</p>
  </div>
  <div class="grid-item">
    <h3><a href="{{ site.baseurl }}/troubleshooting/">Troubleshooting</a></h3>
    <p>Solutions to common issues and problems.</p>
  </div>
</div>

## Live Component Browser

<div class="component-browser">
  <p>Browse and interact with all available components in our <a href="{{ site.baseurl }}/component-browser/">Component Browser</a>.</p>
</div>

## Features

- **Course-Specific Components**: Create interactive content tailored to specific courses
- **Shared Components**: Reuse common components across multiple courses
- **Responsive Design**: Components work on desktop and mobile devices
- **Easy Embedding**: Simple iframe embedding in Blackboard
- **Version Control**: All content is version-controlled through GitHub
- **Automated Deployment**: Changes are automatically deployed through GitHub Actions

## Contributing

This project is open source. See our [Contributing Guide]({{ site.baseurl }}/contributing/) to learn how you can help improve the Blackboard Content Hub.

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}
.grid-item {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.component-browser {
  background: #e6f7ff;
  border-left: 4px solid #1890ff;
  padding: 15px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
}
</style>