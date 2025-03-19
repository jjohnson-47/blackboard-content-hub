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

## Main Purposes

<div class="purpose-container">
  <div class="purpose-item">
    <h3><a href="{{ site.baseurl }}/iframe-hosting/">Iframe Hosting</a></h3>
    <p>Host your interactive components on GitHub Pages with proper structure and organization.</p>
    <ul>
      <li>Standardized component structure</li>
      <li>Secure hosting on GitHub Pages</li>
      <li>Version-controlled components</li>
    </ul>
    <a href="{{ site.baseurl }}/iframe-hosting/" class="purpose-button">Learn About Hosting</a>
  </div>
  
  <div class="purpose-item">
    <h3><a href="{{ site.baseurl }}/component-documentation/">Component Documentation</a></h3>
    <p>Create and maintain comprehensive documentation for each iframe component.</p>
    <ul>
      <li>Documentation templates</li>
      <li>Usage instructions</li>
      <li>API references</li>
    </ul>
    <a href="{{ site.baseurl }}/component-documentation/" class="purpose-button">Explore Documentation</a>
  </div>
  
  <div class="purpose-item">
    <h3><a href="{{ site.baseurl }}/development-environment/">Development Environment</a></h3>
    <p>Use our live editor to create, test, and preview iframe components in real-time.</p>
    <ul>
      <li>Split-screen editor</li>
      <li>Live preview</li>
      <li>Device testing</li>
    </ul>
    <a href="{{ site.baseurl }}/development-environment/" class="purpose-button">Start Developing</a>
  </div>
</div>

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

## Improvement Plan

We're continuously improving the Blackboard Content Hub. Check out our [Improvement Plan]({{ site.baseurl }}/developer-guide/improvement-plan/) to see what's coming next.

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
.purpose-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px 0;
}
.purpose-item {
  background: #ffffff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-top: 5px solid #4a148c;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.purpose-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}
.purpose-item h3 {
  color: #4a148c;
  margin-top: 0;
}
.purpose-item ul {
  margin: 15px 0;
  padding-left: 20px;
}
.purpose-item li {
  margin-bottom: 8px;
}
.purpose-button {
  display: inline-block;
  background: #4a148c;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
  transition: background 0.3s ease;
}
.purpose-button:hover {
  background: #7c43bd;
  text-decoration: none;
}
</style>