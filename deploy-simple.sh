#!/bin/bash

# Simple Deployment Script for Blackboard Content Hub
# This script builds and deploys the site to GitHub Pages

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Check if we're on the main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  You are not on the main branch. Please switch to main before deploying."
  exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Build failed. The dist directory was not created."
  exit 1
fi

# Save the current commit hash for reference
COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_MESSAGE=$(git log -1 --pretty=%B)

# Create a temporary directory for the gh-pages content
echo "📁 Creating temporary directory..."
TEMP_DIR=$(mktemp -d)

# Copy the dist contents to the temporary directory
echo "📋 Copying build files..."
cp -r dist/* $TEMP_DIR/

# Add a .nojekyll file to bypass Jekyll processing
touch $TEMP_DIR/.nojekyll

# Add deployment info file
cat > $TEMP_DIR/deployment-info.txt << EOF
Deployed from: main branch
Commit: $COMMIT_HASH
Date: $(date)
Message: $COMMIT_MESSAGE
EOF

# Switch to gh-pages branch or create it if it doesn't exist
echo "🌿 Switching to gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git checkout gh-pages
else
  git checkout --orphan gh-pages
  git rm -rf .
fi

# Remove all files except .git
find . -maxdepth 1 -not -path "./.git" -not -path "." -exec rm -rf {} \;

# Copy the contents from the temporary directory
echo "📋 Copying files from temporary directory..."
cp -r $TEMP_DIR/* .
cp -r $TEMP_DIR/.nojekyll .

# Clean up the temporary directory
rm -rf $TEMP_DIR

# Add all files to git
git add -A

# Commit changes
git commit -m "Deploy: $COMMIT_MESSAGE (from $COMMIT_HASH)"

# Force push to GitHub
echo "📤 Pushing to GitHub..."
git push -f origin gh-pages

# Switch back to main branch
git checkout main

echo "✅ Deployment complete! Your site is now being built by GitHub Pages."
echo "📝 Visit https://jjohnson-47.github.io/blackboard-content-hub/ to see your site."
echo ""
echo "Note: It may take a few minutes for GitHub Pages to build and deploy your site."