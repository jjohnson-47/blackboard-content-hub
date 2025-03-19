---
layout: default
title: Nascent Digital Dawn Style Guide
use_banner: true
banner_size: medium
banner_title: Nascent Digital Dawn
banner_subtitle: Style Guide & Implementation Reference
permalink: /developer-guide/nascent-digital-dawn-style-guide/
---

# Nascent Digital Dawn Style Guide

This comprehensive style guide documents the "Nascent Digital Dawn" design theme implemented across the Blackboard Content Hub. It serves as a reference for developers who need to maintain or extend the theme.

## Design Philosophy

The "Nascent Digital Dawn" theme evokes a sense of:

- **Tranquility and Calm**: Soft, flowing forms and muted colors create a peaceful atmosphere
- **Emergence/Nascent Growth**: Glowing points suggest something new forming, like fireflies, stars, or nascent life
- **Dreamlike/Surreal**: The lack of sharp details and the unusual color palette give it a slightly otherworldly quality
- **Digital/Artificial Nature**: A generated landscape embracing a digital aesthetic

## Color Palette

### Primary Colors

- `#1A237E` (Deep Indigo): The primary background color, representing the deep, pre-dawn sky or underlying digital space
- `#2c3899` (Twilight Blue): A slightly lighter, more purple-toned blue for larger UI areas that are not the very background
- `#FF007F` (Electric Magenta): Used sparingly as an accent color, primarily for interactive elements and animated dots

### Secondary Colors

- `#4CAF50` (Soft Green): Used very subtly, perhaps as a secondary glow color around some magenta points
- `#FFFFFF` (Pure White): Used for text and clear lines
- `rgba(255, 255, 255, 0.6)` (Semi-transparent White): Used for overlays, subtle highlights, and to soften elements

### Color Usage Guidelines

- Use Deep Indigo for main backgrounds
- Use Twilight Blue for cards, panels, and secondary backgrounds
- Use Electric Magenta sparingly for accents, interactive elements, and focus states
- Avoid bright, saturated colors (like cyan)
- Avoid reds and yellows (except in extremely small amounts as accents)

## Typography

### Fonts

- **Headline Font**: `Rajdhani` - A slightly futuristic, geometric style that fits the digital nature
- **Body Font**: `Open Sans` - Clean, readable, and unobtrusive
- **Equation Font**: `Latin Modern Math` or `STIX Two Math` - Used for mathematical elements

### Font Sizes

```css
:root {
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-md: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem;  /* 36px */
  --font-size-5xl: 3rem;     /* 48px */
}
```

### Typography Guidelines

- Use Rajdhani for headings (h1, h2, h3)
- Use Open Sans for body text and UI elements
- Use Latin Modern Math for mathematical notation
- Maintain a clear hierarchy with appropriate font sizes
- Ensure sufficient contrast between text and background

## UI Elements

### Buttons

```css
.btn {
  background-color: #2c3899; /* Twilight Blue */
  color: #FFFFFF;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px; /* Rounded corners */
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-color: #3f51b5; /* Slightly brighter blue */
  box-shadow: 0 2px 10px rgba(255, 0, 127, 0.3); /* Subtle magenta glow */
}

.btn:active {
  background-color: #1A237E; /* Darker blue */
}

.btn-accent {
  background-color: #FF007F; /* Electric Magenta */
}

.btn-accent:hover {
  background-color: #ff339a; /* Lighter magenta */
}
```

### Cards/Panels

```css
.card {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-accent {
  border-top: 5px solid #FF007F; /* Electric Magenta */
}
```

### Form Elements

```css
input[type="text"],
input[type="number"],
select,
textarea {
  font-family: 'Open Sans', sans-serif;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  background-color: transparent;
  color: #FFFFFF;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="number"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2c3899; /* Twilight Blue */
  box-shadow: 0 0 5px rgba(44, 56, 153, 0.5);
}
```

## Layout & Spacing

### Spacing Variables

```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
}
```

### Layout Guidelines

- Use plenty of whitespace to create a calm, uncluttered feel
- Use a consistent grid system to ensure elements are aligned
- Maintain clear content hierarchy with appropriate spacing
- Use responsive layouts that adapt to different screen sizes

## Animations & Transitions

### Transition Variables

```css
:root {
  --transition-fast: 0.15s ease;
  --transition-medium: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### Animation Guidelines

- Use subtle animations to enhance the sense of dynamism
- Avoid jarring or overly fast animations
- Focus on smooth transitions and subtle movements
- Respect user preferences for reduced motion

## Banner Animation

The banner animation is a key visual element of the theme, featuring:

- Animated wireframe surface with ember particles
- Responsive sizing for different contexts
- Title and subtitle overlay
- Subtle parallax effect

### Implementation

The banner animation is implemented using:

- CSS for styling and basic animations
- JavaScript for dynamic particle effects
- PNG sequence for the wireframe surface animation

## Responsive Design

The theme is designed to be fully responsive, with specific adjustments for:

- Mobile devices (< 768px)
- Tablets (768px - 992px)
- Laptops (992px - 1200px)
- Desktops (> 1200px)

### Media Queries

```css
/* Mobile */
@media (max-width: 768px) {
  /* Mobile-specific styles */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 992px) {
  /* Tablet-specific styles */
}

/* Laptop */
@media (min-width: 993px) and (max-width: 1200px) {
  /* Laptop-specific styles */
}

/* Desktop */
@media (min-width: 1201px) {
  /* Desktop-specific styles */
}
```

## Accessibility Considerations

The theme is designed with accessibility in mind:

- High contrast between text and background
- Keyboard navigation support
- Screen reader friendly markup
- Respect for user preferences (reduced motion, etc.)
- Focus states for interactive elements

## Implementation Files

The theme is implemented across several CSS files:

- `theme-variables.css`: CSS variables for colors, typography, spacing, etc.
- `theme-base.css`: Base styles, typography, and resets
- `theme-components.css`: Styles for UI components
- `theme-animations.css`: Animation and transition styles
- `theme-responsive.css`: Responsive design adjustments
- `theme-iframe-showcase.css`: Styles for iframe navigation and display
- `theme-homepage.css`: Specific styles for the homepage
- `theme-footer.css`: Styles for the site footer

## Usage Guidelines

When extending or modifying the theme:

1. Use the existing CSS variables for consistency
2. Follow the established color palette and typography
3. Maintain the calm, dreamlike aesthetic
4. Ensure responsive behavior across all devices
5. Test for accessibility compliance
6. Use subtle animations that respect user preferences

## Examples

### Example: Card Component

```html
<div class="card card-accent">
  <h3 class="card-title">Card Title</h3>
  <div class="card-content">
    <p>Card content goes here...</p>
  </div>
  <div class="card-footer">
    <a href="#" class="btn btn-accent">Action Button</a>
  </div>
</div>
```

### Example: Banner Implementation

```html
<div class="banner-container banner-size-hero" data-title="Main Title" data-subtitle="Subtitle Text">
  <div class="image-container"></div>
  <div class="svg-overlay"></div>
</div>