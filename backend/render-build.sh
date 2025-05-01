#!/bin/bash
set -e  # Exit immediately if any command fails

echo "👉 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "✅ Verifying build..."
if [ ! -f "dist/server.js" ]; then
  echo "❌ Error: Build failed - dist/server.js not found!"
  exit 1
fi

echo "🎉 Build completed successfully!"
