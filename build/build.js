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
const distSharedComponentsDir = path.join(distDir, 'shared', 'components');

if (fs.existsSync(sharedComponentsDir)) {
  if (!fs.existsSync(distSharedComponentsDir)) {
    fs.mkdirSync(distSharedComponentsDir, { recursive: true });
  }
  
  fs.readdirSync(sharedComponentsDir).forEach(file => {
    const srcPath = path.join(sharedComponentsDir, file);
    const destPath = path.join(distSharedComponentsDir, file);
    
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

// Copy development components (if --include-dev flag is provided)
if (process.argv.includes('--include-dev')) {
  console.log('Copying development components...');
  const devComponentsDir = path.join(rootDir, 'dev', 'components');
  const distDevDir = path.join(distDir, 'dev', 'components');
  const devPreviewDir = path.join(rootDir, 'dev', 'preview');
  const distDevPreviewDir = path.join(distDir, 'dev', 'preview');

  // Copy dev components
  if (fs.existsSync(devComponentsDir)) {
    if (!fs.existsSync(distDevDir)) {
      fs.mkdirSync(distDevDir, { recursive: true });
    }
    
    fs.readdirSync(devComponentsDir).forEach(file => {
      const srcPath = path.join(devComponentsDir, file);
      const destPath = path.join(distDevDir, file);
      
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file} to dev/components`);
      }
    });
  }

  // Copy dev preview
  if (fs.existsSync(devPreviewDir)) {
    if (!fs.existsSync(distDevPreviewDir)) {
      fs.mkdirSync(distDevPreviewDir, { recursive: true });
    }
    
    fs.readdirSync(devPreviewDir).forEach(file => {
      const srcPath = path.join(devPreviewDir, file);
      const destPath = path.join(distDevPreviewDir, file);
      
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file} to dev/preview`);
      }
    });
  }
}

// Copy assets
console.log('Copying assets...');
const assetsDir = path.join(rootDir, 'assets');
const distAssetsDir = path.join(distDir, 'assets');

if (fs.existsSync(assetsDir)) {
  if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir, { recursive: true });
  }
  
  // Updated to include css and js folders
  ['images', 'fonts', 'documents', 'css', 'js'].forEach(assetType => {
    const assetTypeDir = path.join(assetsDir, assetType);
    const distAssetTypeDir = path.join(distAssetsDir, assetType);
    
    if (fs.existsSync(assetTypeDir)) {
      if (!fs.existsSync(distAssetTypeDir)) {
        fs.mkdirSync(distAssetTypeDir, { recursive: true });
      }
      
      // Handle subdirectories (like banner folder in images)
      const copyFilesRecursively = (srcDir, destDir) => {
        fs.readdirSync(srcDir).forEach(item => {
          const srcPath = path.join(srcDir, item);
          const destPath = path.join(destDir, item);
          
          if (fs.statSync(srcPath).isDirectory()) {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyFilesRecursively(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath.replace(rootDir, '')} to ${destPath.replace(rootDir, '')}`);
          }
        });
      };
      
      copyFilesRecursively(assetTypeDir, distAssetTypeDir);
    }
  });
}

// Copy shared styles and scripts
console.log('Copying shared styles and scripts...');
const sharedDir = path.join(rootDir, 'shared');
const distSharedDir = path.join(distDir, 'shared');

if (fs.existsSync(sharedDir)) {
  if (!fs.existsSync(distSharedDir)) {
    fs.mkdirSync(distSharedDir, { recursive: true });
  }
  
  ['styles', 'scripts', 'libraries'].forEach(sharedType => {
    const sharedTypeDir = path.join(sharedDir, sharedType);
    const distSharedTypeDir = path.join(distSharedDir, sharedType);
    
    if (fs.existsSync(sharedTypeDir)) {
      if (!fs.existsSync(distSharedTypeDir)) {
        fs.mkdirSync(distSharedTypeDir, { recursive: true });
      }
      
      // Handle subdirectories
      const copyFilesRecursively = (srcDir, destDir) => {
        fs.readdirSync(srcDir).forEach(item => {
          const srcPath = path.join(srcDir, item);
          const destPath = path.join(destDir, item);
          
          if (fs.statSync(srcPath).isDirectory()) {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyFilesRecursively(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath.replace(rootDir, '')} to ${destPath.replace(rootDir, '')}`);
          }
        });
      };
      
      copyFilesRecursively(sharedTypeDir, distSharedTypeDir);
    }
  });
}

console.log('Build completed successfully!');