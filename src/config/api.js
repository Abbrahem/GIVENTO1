// API Configuration
const API_CONFIG = {
  // Use environment variable or fallback to localhost for development
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  VERSION: '3.0', // Force cache refresh
  
  // API endpoints
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    
    // Product endpoints
    PRODUCTS: '/products',
    PRODUCTS_LATEST: '/products/latest',
    PRODUCT_BY_ID: (id) => `/products/${id}`,
    
    // Category endpoints
    CATEGORIES: '/categories',
    CATEGORY_PRODUCTS: (slug) => `/categories/${slug}/products`,
    
    // Order endpoints
    ORDERS: '/orders',
    ORDER_BY_ID: (id) => `/orders/${id}`,
    
    // Upload endpoints
    UPLOAD: '/upload'
  }
};

// Helper function to build full API URL
export const getApiUrl = (endpoint) => {
  // Clean base URL and endpoint to avoid duplicates
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/+$/, ''); // Remove trailing slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  const finalUrl = `${baseUrl}${cleanEndpoint}`;
  console.log('Building API URL:', { baseUrl, endpoint, cleanEndpoint, finalUrl });
  
  return finalUrl;
};

// Helper function to get image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-image.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('data:')) return imagePath; // For base64 images
  
  // For uploaded file paths, construct full URL
  if (imagePath.startsWith('/uploads/')) {
    const baseUrl = API_CONFIG.BASE_URL.replace('/api', ''); // Remove /api for file serving
    return `${baseUrl}${imagePath}`;
  }
  
  console.log('Image path received:', imagePath);
  return imagePath;
};

// Export endpoints for easy access
export const API_ENDPOINTS = API_CONFIG.ENDPOINTS;

export default API_CONFIG;
