/**
 * Banner Animation System - "Nascent Digital Dawn" Theme
 * 
 * Creates a dynamic banner with animated ember particles and transitioning
 * wireframe landscape images. Adapted from the original banner animation.
 */

/**
 * BannerAnimator Class
 * Manages the banner animation including image transitions and particle effects
 */
class BannerAnimator {
    /**
     * @param {Object} options - Configuration options
     * @param {Element|string} options.container - The main banner container element or selector
     * @param {Element|string} options.imageContainer - Container for background images or selector
     * @param {Element|string} options.svgOverlay - Container for SVG particle overlay or selector
     * @param {Array<string>} options.images - Array of image paths
     * @param {number} options.transitionTime - Time in ms between image transitions
     * @param {number} options.particleCount - Number of ember particles to create
     * @param {string} options.baseImagePath - Base path for images
     * @param {string} options.title - Optional title to display over the banner
     * @param {string} options.subtitle - Optional subtitle to display over the banner
     * @param {string} options.size - Banner size: 'hero', 'medium', or 'small'
     */
    constructor(options) {
        // Process selectors if strings were provided
        this.container = typeof options.container === 'string' 
            ? document.querySelector(options.container) 
            : options.container;
            
        this.imageContainer = typeof options.imageContainer === 'string' 
            ? document.querySelector(options.imageContainer) 
            : options.imageContainer;
            
        this.svgOverlay = typeof options.svgOverlay === 'string' 
            ? document.querySelector(options.svgOverlay) 
            : options.svgOverlay;
        
        // Store configuration options
        this.images = options.images;
        this.transitionTime = options.transitionTime || 3000;
        this.particleCount = options.particleCount || 100;
        this.baseImagePath = options.baseImagePath || '/assets/images/banner/';
        this.title = options.title || '';
        this.subtitle = options.subtitle || '';
        this.size = options.size || 'hero';
        
        // Internal state
        this.currentIndex = 0;
        this.imageElements = [];
        
        // Validate required elements
        if (!this.container || !this.imageContainer || !this.svgOverlay) {
            console.error('BannerAnimator: Required container elements not found');
            return;
        }
        
        // Initialize the banner
        this.init();
    }
    
    /**
     * Initialize the banner animation
     */
    init() {
        // Apply size class to container
        this.container.classList.add(`banner-size-${this.size}`);
        
        // Create title overlay if title is provided
        if (this.title) {
            this.createTitleOverlay();
        }
        
        // Preload images and set up the image container
        this.preloadImages();
        
        // Create SVG overlay with animated particles
        this.createParticleOverlay();
        
        // Start the image transition loop
        this.startImageTransition();
    }
    
    /**
     * Create title overlay with title and subtitle
     */
    createTitleOverlay() {
        const titleOverlay = document.createElement('div');
        titleOverlay.className = 'banner-title-overlay';
        
        if (this.title) {
            const titleElement = document.createElement('h1');
            titleElement.className = 'banner-title';
            titleElement.textContent = this.title;
            titleOverlay.appendChild(titleElement);
        }
        
        if (this.subtitle) {
            const subtitleElement = document.createElement('p');
            subtitleElement.className = 'banner-subtitle';
            subtitleElement.textContent = this.subtitle;
            titleOverlay.appendChild(subtitleElement);
        }
        
        this.container.appendChild(titleOverlay);
    }
    
    /**
     * Preload all images and add them to the DOM
     */
    preloadImages() {
        this.images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = this.baseImagePath + src;
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
        svg.setAttribute("aria-hidden", "true"); // Hide from screen readers
        
        // Add defs section with filter and styles
        const defs = document.createElementNS(svgNS, "defs");
        
        // Create glow filter
        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "ember-glow"); // Changed ID to avoid conflicts
        
        const blur = document.createElementNS(svgNS, "feGaussianBlur");
        blur.setAttribute("stdDeviation", "3.5");
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
        
        // Adjust particle count based on banner size
        let adjustedParticleCount = this.particleCount;
        if (this.size === 'medium') {
            adjustedParticleCount = Math.floor(this.particleCount * 0.7);
        } else if (this.size === 'small') {
            adjustedParticleCount = Math.floor(this.particleCount * 0.4);
        }
        
        // Create particles and distribute them among groups
        for (let i = 0; i < adjustedParticleCount; i++) {
            // Create a particle
            const particle = document.createElementNS(svgNS, "circle");
            
            // Set base class
            particle.setAttribute("class", "ember");
            
            // Strategic particle positioning to match the wireframe landscape
            let x, y;
            
            // Create a wave-like distribution to match the wireframe landscape
            if (Math.random() < 0.7) {
                // 70% of particles follow the wave pattern
                x = Math.random() * 1200;
                
                // Create a wave-like pattern for y-coordinates
                const baseY = 250 + Math.sin(x / 100) * 50;
                y = baseY + (Math.random() - 0.5) * 150;
            } else {
                // 30% of particles are randomly distributed
                x = Math.random() * 1200;
                y = Math.random() * 400;
            }
            
            // More variation in particle sizes
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
            
            // Color variation using our theme's electric magenta
            const hue = 320 + (Math.random() * 40 - 20); // Magenta variation
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

/**
 * Initialize banner animations on the page
 */
function initBanners() {
    // Banner image filenames
    const bannerImages = [
        'wireframe-surface-1.png',
        'wireframe-surface-2.png',
        'wireframe-surface-3.png',
        'wireframe-surface-4.png',
        'wireframe-surface-5.png',
        'wireframe-surface-6.png'
    ];
    
    // Initialize hero banner if present
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner) {
        new BannerAnimator({
            container: heroBanner,
            imageContainer: heroBanner.querySelector('.image-container'),
            svgOverlay: heroBanner.querySelector('.svg-overlay'),
            images: bannerImages,
            transitionTime: 3000,
            particleCount: 200,
            title: heroBanner.dataset.title || '',
            subtitle: heroBanner.dataset.subtitle || '',
            size: 'hero'
        });
    }
    
    // Initialize all medium banners
    document.querySelectorAll('.medium-banner').forEach(banner => {
        new BannerAnimator({
            container: banner,
            imageContainer: banner.querySelector('.image-container'),
            svgOverlay: banner.querySelector('.svg-overlay'),
            images: bannerImages,
            transitionTime: 4000,
            particleCount: 120,
            title: banner.dataset.title || '',
            subtitle: banner.dataset.subtitle || '',
            size: 'medium'
        });
    });
    
    // Initialize all small banners
    document.querySelectorAll('.small-banner').forEach(banner => {
        new BannerAnimator({
            container: banner,
            imageContainer: banner.querySelector('.image-container'),
            svgOverlay: banner.querySelector('.svg-overlay'),
            images: bannerImages,
            transitionTime: 5000,
            particleCount: 60,
            title: banner.dataset.title || '',
            subtitle: banner.dataset.subtitle || '',
            size: 'small'
        });
    });
}

// Initialize banners when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initBanners);

// Export the BannerAnimator class for direct use
window.BannerAnimator = BannerAnimator;