/**
 * Banner Animation System
 * Creates a dynamic banner with animated ember particles
 * Also adds subtle ember particles throughout the page for a cohesive theme
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Find all banner containers on the page
    const bannerContainers = document.querySelectorAll('.banner-container');
    
    // Initialize each banner found
    bannerContainers.forEach(container => {
        // Initialize the banner animation
        const bannerAnimator = new BannerAnimator({
            container: container,
            imageContainer: container.querySelector('.image-container'),
            svgOverlay: container.querySelector('.svg-overlay'),
            // Use the renamed image files
            images: [
                '/blackboard-content-hub/assets/images/banner/wireframe-surface-1.png',
                '/blackboard-content-hub/assets/images/banner/wireframe-surface-2.png',
                '/blackboard-content-hub/assets/images/banner/wireframe-surface-3.png',
                '/blackboard-content-hub/assets/images/banner/wireframe-surface-4.png',
                '/blackboard-content-hub/assets/images/banner/wireframe-surface-5.png',
                '/blackboard-content-hub/assets/images/banner/wireframe-surface-6.png'
            ],
            transitionTime: 3000, // 3 seconds between transitions
            particleCount: 150    // Number of ember particles
        });
        
        // Add title and subtitle if provided in data attributes
        const title = container.getAttribute('data-title');
        const subtitle = container.getAttribute('data-subtitle');
        
        if (title || subtitle) {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'banner-content';
            
            if (title) {
                const titleElement = document.createElement('h1');
                titleElement.className = 'banner-title';
                titleElement.textContent = title;
                contentDiv.appendChild(titleElement);
            }
            
            if (subtitle) {
                const subtitleElement = document.createElement('p');
                subtitleElement.className = 'banner-subtitle';
                subtitleElement.textContent = subtitle;
                contentDiv.appendChild(subtitleElement);
            }
            
            container.appendChild(contentDiv);
        }
    });
    
    // Add subtle ember particles to the entire page
    addPageEmbers();
});

/**
 * Add subtle ember particles to the entire page for a cohesive theme
 */
function addPageEmbers() {
    // Create a container for the page embers
    const emberContainer = document.createElement('div');
    emberContainer.className = 'page-ember-container';
    emberContainer.style.position = 'fixed';
    emberContainer.style.top = '0';
    emberContainer.style.left = '0';
    emberContainer.style.width = '100%';
    emberContainer.style.height = '100%';
    emberContainer.style.pointerEvents = 'none';
    emberContainer.style.zIndex = '1000';
    emberContainer.style.overflow = 'hidden';
    emberContainer.style.opacity = '0.4'; // More subtle than the banner
    
    // Create SVG for the embers
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 1200 800");
    
    // Add defs section with filter
    const defs = document.createElementNS(svgNS, "defs");
    
    // Create glow filter
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "page-glow");
    
    const blur = document.createElementNS(svgNS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "2.5");
    blur.setAttribute("result", "coloredBlur");
    
    const merge = document.createElementNS(svgNS, "feMerge");
    
    const mergeNode1 = document.createElementNS(svgNS, "feMergeNode");
    mergeNode1.setAttribute("in", "coloredBlur");
    
    const mergeNode2 = document.createElementNS(svgNS, "feMergeNode");
    mergeNode2.setAttribute("in", "SourceGraphic");
    
    merge.appendChild(mergeNode1);
    merge.appendChild(mergeNode2);
    
    filter.appendChild(blur);
    filter.appendChild(merge);
    
    defs.appendChild(filter);
    svg.appendChild(defs);
    
    // Create particle groups
    const groups = [
        document.createElementNS(svgNS, "g"),
        document.createElementNS(svgNS, "g"),
        document.createElementNS(svgNS, "g")
    ];
    
    groups[0].setAttribute("class", "ember-group-1");
    groups[1].setAttribute("class", "ember-group-2");
    groups[2].setAttribute("class", "ember-group-3");
    
    // Determine number of particles based on screen size
    let particleCount = 30; // Base count for page embers (much fewer than banner)
    
    if (window.innerWidth < 768) {
        particleCount = 15; // Even fewer on mobile
    }
    
    // Create particles and distribute them among groups
    for (let i = 0; i < particleCount; i++) {
        // Create a particle
        const particle = document.createElementNS(svgNS, "circle");
        
        // Set base class with page-specific styles
        particle.setAttribute("class", "ember");
        particle.style.filter = "url(#page-glow)";
        particle.style.opacity = "0.6";
        
        // Random positioning throughout the page
        const x = Math.random() * 1200;
        const y = Math.random() * 800;
        
        // Smaller particles for page effect
        const radius = 1 + Math.random() * 2; // 1-3px
        
        particle.setAttribute("cx", x);
        particle.setAttribute("cy", y);
        particle.setAttribute("r", radius);
        
        // Color variation
        const hue = 320 + (Math.random() * 40 - 20); // Magenta variation
        const saturation = 85 + (Math.random() * 15);
        const lightness = 45 + (Math.random() * 30);
        
        particle.style.fill = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Apply random animation delay
        const delay = Math.random() * 10; // Longer random delay for more varied effect
        particle.style.animationDelay = `-${delay}s`;
        
        // Add to a random group
        const groupIndex = Math.floor(Math.random() * groups.length);
        groups[groupIndex].appendChild(particle);
    }
    
    // Add groups to SVG
    groups.forEach(group => {
        svg.appendChild(group);
    });
    
    // Add SVG to container
    emberContainer.appendChild(svg);
    
    // Add container to body
    document.body.appendChild(emberContainer);
}

/**
 * BannerAnimator Class
 * Manages the banner animation including image transitions and particle effects
 */
class BannerAnimator {
    /**
     * @param {Object} options - Configuration options
     * @param {Element} options.container - The main banner container element
     * @param {Element} options.imageContainer - Container for the background images
     * @param {Element} options.svgOverlay - Container for the SVG particle overlay
     * @param {Array<string>} options.images - Array of image paths
     * @param {number} options.transitionTime - Time in ms between image transitions
     * @param {number} options.particleCount - Number of ember particles to create
     */
    constructor(options) {
        // Store configuration options
        this.container = options.container;
        this.imageContainer = options.imageContainer;
        this.svgOverlay = options.svgOverlay;
        this.images = options.images;
        this.transitionTime = options.transitionTime || 3000;
        this.particleCount = options.particleCount || 100;
        
        // Adjust particle count based on screen size
        if (window.innerWidth < 768) {
            this.particleCount = Math.floor(this.particleCount * 0.6); // 60% of particles on mobile
        } else if (window.innerWidth < 1200) {
            this.particleCount = Math.floor(this.particleCount * 0.8); // 80% of particles on tablet
        }
        
        // Internal state
        this.currentIndex = 0;
        this.imageElements = [];
        
        // Initialize the banner
        this.init();
    }
    
    /**
     * Initialize the banner animation
     */
    init() {
        // Preload images and set up the image container
        this.preloadImages();
        
        // Create SVG overlay with animated particles
        this.createParticleOverlay();
        
        // Start the image transition loop
        this.startImageTransition();
    }
    
    /**
     * Preload all images and add them to the DOM
     */
    preloadImages() {
        this.images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'banner-image';
            img.alt = `Wireframe surface ${index + 1}`;
            
            // Make the first image active
            if (index === 0) {
                img.classList.add('active');
            }
            
            this.imageContainer.appendChild(img);
            this.imageElements.push(img);
        });
    }
    
    /**
     * Start the image transition loop
     */
    startImageTransition() {
        setInterval(() => {
            // Hide current image
            this.imageElements[this.currentIndex].classList.remove('active');
            
            // Move to next image (loop back to start if needed)
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            
            // Show new current image
            this.imageElements[this.currentIndex].classList.add('active');
        }, this.transitionTime);
    }
    
    /**
     * Create the SVG overlay with animated particles
     */
    createParticleOverlay() {
        // Create SVG element
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 1200 400");
        
        // Add defs section with filter and styles
        const defs = document.createElementNS(svgNS, "defs");
        
        // Create glow filter
        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "glow");
        
        const blur = document.createElementNS(svgNS, "feGaussianBlur");
        blur.setAttribute("stdDeviation", "3.5");  // Increased blur for better glow
        blur.setAttribute("result", "coloredBlur");
        
        const merge = document.createElementNS(svgNS, "feMerge");
        
        const mergeNode1 = document.createElementNS(svgNS, "feMergeNode");
        mergeNode1.setAttribute("in", "coloredBlur");
        
        const mergeNode2 = document.createElementNS(svgNS, "feMergeNode");
        mergeNode2.setAttribute("in", "SourceGraphic");
        
        merge.appendChild(mergeNode1);
        merge.appendChild(mergeNode2);
        
        filter.appendChild(blur);
        filter.appendChild(merge);
        
        defs.appendChild(filter);
        svg.appendChild(defs);
        
        // Create particle groups
        const groups = [
            document.createElementNS(svgNS, "g"),
            document.createElementNS(svgNS, "g"),
            document.createElementNS(svgNS, "g")
        ];
        
        groups[0].setAttribute("class", "ember-group-1");
        groups[1].setAttribute("class", "ember-group-2");
        groups[2].setAttribute("class", "ember-group-3");
        
        // Create particles and distribute them among groups
        for (let i = 0; i < this.particleCount; i++) {
            // Create a particle
            const particle = document.createElementNS(svgNS, "circle");
            
            // Set base class
            particle.setAttribute("class", "ember");
            
            // Strategic particle positioning to match the wireframe landscape
            // More particles in the middle and lower sections, fewer at the top
            let x, y;
            
            // Create a wave-like distribution to match the wireframe landscape
            if (Math.random() < 0.7) {
                // 70% of particles follow the wave pattern
                x = Math.random() * 1200;
                
                // Create a wave-like pattern for y-coordinates
                // Higher concentration in the middle section (200-350px)
                const baseY = 250 + Math.sin(x / 100) * 50;
                y = baseY + (Math.random() - 0.5) * 150;
            } else {
                // 30% of particles are randomly distributed
                x = Math.random() * 1200;
                y = Math.random() * 400;
            }
            
            // More variation in particle sizes
            // Some particles are larger to create more prominent embers
            let radius;
            if (Math.random() < 0.1) { // 10% chance for larger particles
                radius = 4 + Math.random() * 4; // 4-8px
            } else if (Math.random() < 0.3) { // 30% chance for medium particles
                radius = 2.5 + Math.random() * 2.5; // 2.5-5px
            } else { // 60% chance for smaller particles
                radius = 1.5 + Math.random() * 2; // 1.5-3.5px
            }
            
            particle.setAttribute("cx", x);
            particle.setAttribute("cy", y);
            particle.setAttribute("r", radius);
            
            // More color variation for a more dynamic look
            const hue = 320 + (Math.random() * 40 - 20); // Wider magenta variation
            const saturation = 85 + (Math.random() * 15);
            const lightness = 45 + (Math.random() * 30);
            
            if (Math.random() < 0.6) { // 60% of particles get custom color
                particle.style.fill = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            }
            
            // Apply random animation delay
            const delay = Math.random() * 5; // Random delay up to 5 seconds
            particle.style.animationDelay = `-${delay}s`;
            
            // Add to a random group
            const groupIndex = Math.floor(Math.random() * groups.length);
            groups[groupIndex].appendChild(particle);
        }
        
        // Add groups to SVG
        groups.forEach(group => {
            svg.appendChild(group);
        });
        
        // Add SVG to overlay container
        this.svgOverlay.appendChild(svg);
    }
}