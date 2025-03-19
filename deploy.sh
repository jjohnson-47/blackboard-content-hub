#!/bin/bash

# Blackboard Content Hub Deployment Script
# This script builds and deploys both the documentation site and iframe components

# Exit on error
set -e

echo "🚀 Starting deployment process for Blackboard Content Hub..."

# Check if there are uncommitted changes
if [[ $(git status --porcelain) ]]; then
  echo "⚠️  You have uncommitted changes. Please commit or stash them before deploying."
  exit 1
fi

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  You are not on the main branch. Please switch to main before deploying."
  exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes from remote..."
git pull origin main

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Create dist directory if it doesn't exist
if [ ! -d "dist" ]; then
  mkdir dist
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Build failed. The dist directory was not created."
  exit 1
fi

# Prepare for deployment
echo "🔧 Preparing for deployment..."

# Save the current commit hash for reference
COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_MESSAGE=$(git log -1 --pretty=%B)

# Create or update the gh-pages branch
echo "🌿 Updating gh-pages branch..."

# Check if gh-pages branch exists locally
if git show-ref --verify --quiet refs/heads/gh-pages; then
  # Branch exists, switch to it
  git checkout gh-pages
  # Pull latest changes
  git pull origin gh-pages --no-edit
else
  # Branch doesn't exist, create it
  git checkout -b gh-pages
fi

# Remove all files except .git
find . -maxdepth 1 -not -path "./.git" -not -path "." -exec rm -rf {} \;

# Copy dist contents to root
cp -r dist/* .
rm -rf dist

# Add a .nojekyll file to bypass Jekyll processing on GitHub Pages
touch .nojekyll

# Add deployment info file
cat > deployment-info.txt << EOF
Deployed from: main branch
Commit: $COMMIT_HASH
Date: $(date)
Message: $COMMIT_MESSAGE
EOF

# Add all files to git
git add -A

# Commit changes
git commit -m "Deploy: $COMMIT_MESSAGE (from $COMMIT_HASH)"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin gh-pages

# Switch back to main branch
git checkout main

echo "✅ Deployment complete! Your site is now being built by GitHub Pages."
echo "📝 Visit https://jjohnson-47.github.io/blackboard-content-hub/ to see your site."
echo ""
echo "Note: It may take a few minutes for GitHub Pages to build and deploy your site."