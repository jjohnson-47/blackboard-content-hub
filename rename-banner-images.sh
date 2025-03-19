#!/bin/bash

# Create directory if it doesn't exist
mkdir -p assets/images/banner

# Copy images from banner-animation project if they haven't been copied yet
cp -n /home/verlyn13/projects/banner-animation/*.png assets/images/banner/

# Navigate to the banner images directory
cd assets/images/banner

# Rename the files to match the names in banner-animation.js
counter=1

# Rename all PNG files
for file in u5342236882*.png; do
  if [ -f "$file" ]; then
    # Skip Zone.Identifier files
    if [[ "$file" == *"Zone.Identifier"* ]]; then
      continue
    fi
    
    # Rename the file
    mv "$file" "wireframe-surface-$counter.png"
    echo "Renamed $file to wireframe-surface-$counter.png"
    
    # Increment counter
    ((counter++))
  fi
done

# List the renamed files
echo "Renamed files:"
ls -la