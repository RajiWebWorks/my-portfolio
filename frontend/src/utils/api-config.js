// api-config.js - FOR FRONTEND
// This should be placed in your frontend project in the utils folder

// Use environment variable if available, otherwise fallback to hardcoded URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://my-portfolio-vqy5.onrender.com';

// Helper function to make API requests
export const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    // If using Next.js rewrites, you can use relative URLs in production
    const url = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_USE_REWRITES === 'true'
      ? `/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
      : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Function to fix image URLs in project data
export const fixImageUrls = (projects) => {
  return projects.map(project => ({
    ...project,
    imageUrl: project.imageUrl.startsWith('http') 
      ? project.imageUrl 
      : `${API_BASE_URL}${project.imageUrl.startsWith('/') ? project.imageUrl : `/${project.imageUrl}`}`
  }));
};

export { API_BASE_URL };