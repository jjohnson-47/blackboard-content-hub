---
layout: default
title: Nascent Digital Dawn Style Guide
use_banner: true
banner_size: medium
banner_title: Nascent Digital Dawn Style Guide
banner_subtitle: Comprehensive guide to our design theme
---

# Nascent Digital Dawn Style Guide

This style guide provides comprehensive documentation for the "Nascent Digital Dawn" design theme used throughout the Blackboard Content Hub. The theme features a soothing, nascent landscape aesthetic with deep indigo backgrounds, flowing magenta particles, and a clean, modern interface.

## Color Palette

The theme uses a carefully selected color palette that evokes a sense of tranquility, emergence, and digital innovation:

### Primary Colors

- **Deep Indigo** (`#08131b`): The primary background color, representing the deep, pre-dawn sky or the underlying digital space.
- **Twilight Blue** (`#2c3899`): A slightly lighter, more purple-toned blue used for cards, panels, and secondary backgrounds.
- **Electric Magenta** (`#FF007F`): The accent color used for interactive elements, ember particles, and highlights.

### Secondary Colors

- **Soft Green** (`#4CAF50`): Used very subtly, perhaps as a secondary glow color around some magenta points, suggesting nascent growth.
- **White** (`#FFFFFF`): Used for text and clear lines.
- **Semi-transparent White**: Various opacity levels (90%, 80%, 60%, 40%, 20%, 10%) used for overlays, subtle highlights, and to soften elements.

### Color Variables

All colors are defined as CSS variables in `theme-variables.css`:

```css
:root {
    /* Color Palette */
    --color-deep-indigo: #1A237E;
    --color-twilight-blue: #2c3899;
    --color-electric-magenta: #FF007F;
    --color-soft-green: #4CAF50;
    --color-white: #FFFFFF;
    --color-white-90: rgba(255, 255, 255, 0.9);
    --color-white-80: rgba(255, 255, 255, 0.8);
    --color-white-60: rgba(255, 255, 255, 0.6);
    --color-white-40: rgba(255, 255, 255, 0.4);
    --color-white-20: rgba(255, 255, 255, 0.2);
    --color-white-10: rgba(255, 255, 255, 0.1);
}
```

## Typography

The theme uses a combination of modern, clean fonts that complement the digital aesthetic:

- **Headline Font**: `Rajdhani` - A geometric sans-serif font with a slightly futuristic feel, perfect for headings and titles.
- **Body Font**: `Open Sans` - A clean, readable sans-serif font for body text and UI elements.
- **Equation Font**: `Latin Modern Math` or `STIX Two Math` - Used for mathematical elements and equations.

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

## Animated Banner

The animated banner is a key visual element of the theme, featuring glowing wireframe surfaces with animated "ember" particles that appear to pop like fire.

### Banner Components

1. **Background Images**: A series of wireframe surface images that transition with smooth crossfades.
2. **SVG Particle Overlay**: Dynamically generated SVG particles positioned to match the wireframe landscape.
3. **CSS Animations**: Multiple animation types (floating, pulsing, flickering) applied to particles with randomized delays and durations.

### Banner Sizes

The banner comes in multiple size variations to suit different contexts:

```css
.banner-size-hero {
    height: 500px; /* Taller for hero sections */
}

.banner-size-medium {
    height: 300px; /* Medium for section headers */
}

.banner-size-small {
    height: 200px; /* Smaller for minor sections */
}
```

### Using the Banner

To add the banner to a page, include the following frontmatter in your Markdown file:

```yaml
---
layout: default
use_banner: true
banner_size: hero  # Options: hero, medium, small
banner_title: Your Banner Title
banner_subtitle: Your banner subtitle or description
---
```

## Animation System

The theme includes a comprehensive animation system defined in `theme-animations.css`:

### Global Ember Particles

One of the key visual elements of the theme is the subtle ember particles that appear throughout the entire site, not just in the banner. These particles create a cohesive visual experience and reinforce the "Nascent Digital Dawn" aesthetic.

The ember particles are automatically added to every page via JavaScript in `banner-animation.js`, which creates a fixed-position container with SVG particles:

```css
.page-ember-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}
```

The container is positioned behind the main content but above the background, creating a subtle layer of animated particles that doesn't interfere with user interactions.

### Basic Animations

- **Fade In**: Simple opacity transition for elements appearing on the page.
- **Fade In Up**: Elements fade in while moving upward.
- **Staggered Fade In**: For lists where items appear one after another.
- **Pulse**: Elements subtly grow and shrink with opacity changes.
- **Glow**: Elements emit a pulsing magenta glow.
- **Float**: Elements gently move up and down.

### Ember Particle Animations

Specialized animations for the ember particles in the banner:

- **Ember Float**: Three variations of floating movement patterns.
- **Ember Pulse**: Three variations of pulsing opacity and size changes.

### Page Transitions

Smooth transitions between pages:

- **Page Enter**: Elements fade in and move up when entering.
- **Page Exit**: Elements fade out and move up when exiting.

### Loading Animations

- **Loading Dots**: Three dots that pulse in sequence.
- **Shimmer Loading**: A subtle shimmer effect for loading states.

### Accessibility

All animations respect the user's reduced motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .fade-in,
  .fade-in-up,
  /* other animation classes */
  {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
```

## UI Components

### Buttons

Buttons use rounded rectangles with the Twilight Blue color and white text:

```css
.btn {
  background-color: var(--color-twilight-blue);
  color: var(--color-white);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  font-family: var(--font-body);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.btn:hover {
  background-color: var(--color-deep-indigo);
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.3);
}

.btn-accent {
  background-color: var(--color-electric-magenta);
}
```

### Cards

Cards use rounded corners, subtle borders, and the Twilight Blue background:

```css
.card {
  background-color: var(--color-twilight-blue);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-white-20);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
}

.card-title {
  font-family: var(--font-headline);
  margin-top: 0;
  margin-bottom: 1rem;
}

.card-content {
  margin-bottom: 1.5rem;
}

.card-footer {
  border-top: 1px solid var(--color-white-20);
  padding-top: 1rem;
}
```

### Forms

Forms use clean, minimalist styling with rounded corners and subtle borders:

```css
input[type="text"],
input[type="email"],
textarea,
select {
  background-color: transparent;
  border: 1px solid var(--color-white-40);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  color: var(--color-white);
  font-family: var(--font-body);
  width: 100%;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-electric-magenta);
  box-shadow: 0 0 0 2px rgba(255, 0, 127, 0.2);
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

### Container Widths

```css
:root {
    --container-sm: 640px;
    --container-md: 768px;
    --container-lg: 1024px;
    --container-xl: 1280px;
}
```

### Grid System

The theme includes several grid layouts:

```css
.grid-2-cols {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.grid-3-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.grid-4-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}
```

## Responsive Design

The theme is fully responsive with breakpoints for different device sizes:

```css
/* Tablet */
@media (max-width: 992px) {
  /* Tablet-specific styles */
}

/* Mobile */
@media (max-width: 768px) {
  /* Mobile-specific styles */
}

/* Small Mobile */
@media (max-width: 480px) {
  /* Small mobile-specific styles */
}
```

## Implementation Examples

### Banner with Content

```html
<div class="banner-container banner-size-hero" data-title="Welcome to Blackboard Content Hub" data-subtitle="Interactive Educational Content for Blackboard LMS">
  <div class="image-container"></div>
  <div class="svg-overlay"></div>
</div>
```

### Card Grid

```html
<div class="grid-3-cols">
  <div class="card">
    <h3 class="card-title">Card Title</h3>
    <div class="card-content">
      <p>Card content goes here.</p>
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-accent">Learn More</a>
    </div>
  </div>
  <!-- More cards... -->
</div>
```

## Best Practices

1. **Use CSS Variables**: Always use the defined CSS variables for colors, spacing, etc., rather than hardcoding values.
2. **Responsive Design**: Test all components on different screen sizes.
3. **Animation Performance**: Use hardware-accelerated properties for animations (transform, opacity) and avoid animating layout properties.
4. **Accessibility**: Ensure all interactive elements have appropriate focus states and that text has sufficient contrast.
5. **Consistent Spacing**: Maintain consistent spacing using the defined spacing variables.

## File Structure

The theme is organized into multiple CSS files:

- `theme-variables.css`: Core variables (colors, typography, spacing)
- `theme-base.css`: Base styles and resets
- `theme-components.css`: UI component styles
- `theme-animations.css`: Animation definitions
- `theme-responsive.css`: Responsive breakpoints and adjustments
- `theme-homepage.css`: Homepage-specific styles
- `theme-footer.css`: Footer styles
- `banner-animation.css`: Banner-specific styles

## JavaScript Components

The banner animation is powered by JavaScript in `banner-animation.js`, which:

1. Initializes banners on the page
2. Handles image transitions
3. Creates and animates SVG particles
4. Adds subtle ember particles throughout the page

## Conclusion

The "Nascent Digital Dawn" theme creates a cohesive, visually appealing experience that emphasizes the educational and technological nature of the Blackboard Content Hub. By following this style guide, you can ensure that new components and pages maintain the established design language.