const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Build Jekyll site
console.log('Building Jekyll site...');
execSync('jekyll build --source docs --destination dist', { stdio: 'inherit' });

// Copy components
console.log('Copying components...');

// Copy shared components
const sharedComponentsDir = path.join(rootDir, 'shared', 'components');
const distSharedDir = path.join(distDir, 'shared', 'components');

if (fs.existsSync(sharedComponentsDir)) {
  if (!fs.existsSync(distSharedDir)) {
    fs.mkdirSync(distSharedDir, { recursive: true });
  }
  
  fs.readdirSync(sharedComponentsDir).forEach(file => {
    const srcPath = path.join(sharedComponentsDir, file);
    const destPath = path.join(distSharedDir, file);
    
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${file} to shared/components`);
    }
  });
}

// Copy course-specific components
const coursesDir = path.join(rootDir, 'courses');
const distCoursesDir = path.join(distDir, 'courses');

if (fs.existsSync(coursesDir)) {
  if (!fs.existsSync(distCoursesDir)) {
    fs.mkdirSync(distCoursesDir, { recursive: true });
  }
  
  fs.readdirSync(coursesDir).forEach(courseDir => {
    const coursePath = path.join(coursesDir, courseDir);
    const distCoursePath = path.join(distCoursesDir, courseDir);
    
    if (fs.statSync(coursePath).isDirectory()) {
      if (!fs.existsSync(distCoursePath)) {
        fs.mkdirSync(distCoursePath, { recursive: true });
      }
      
      fs.readdirSync(coursePath).forEach(file => {
        const srcPath = path.join(coursePath, file);
        const destPath = path.join(distCoursePath, file);
        
        if (fs.statSync(srcPath).isFile()) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied: ${file} to courses/${courseDir}`);
        }
      });
    }
  });
}

// Copy assets
console.log('Copying assets...');
const assetsDir = path.join(rootDir, 'assets');
const distAssetsDir = path.join(distDir, 'assets');

if (fs.existsSync(assetsDir)) {
  if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir, { recursive: true });
  }
  
  ['images', 'fonts', 'documents'].forEach(assetType => {
    const assetTypeDir = path.join(assetsDir, assetType);
    const distAssetTypeDir = path.join(distAssetsDir, assetType);
    
    if (fs.existsSync(assetTypeDir)) {
      if (!fs.existsSync(distAssetTypeDir)) {
        fs.mkdirSync(distAssetTypeDir, { recursive: true });
      }
      
      fs.readdirSync(assetTypeDir).forEach(file => {
        const srcPath = path.join(assetTypeDir, file);
        const destPath = path.join(distAssetTypeDir, file);
        
        if (fs.statSync(srcPath).isFile()) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied: ${file} to assets/${assetType}`);
        }
      });
    }
  });
}

console.log('Build completed successfully!');