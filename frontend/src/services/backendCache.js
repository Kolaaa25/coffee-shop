import api from '../utils/axios';

// Cache for menu data
let menuCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Backend wake-up status
let backendAwake = false;
let wakeUpPromise = null;

/**
 * Wake up the backend server (Render free tier sleeps after inactivity)
 * This should be called as early as possible (e.g., on app load)
 */
export const wakeUpBackend = async () => {
  if (backendAwake) return true;
  
  if (wakeUpPromise) return wakeUpPromise;
  
  wakeUpPromise = (async () => {
    try {
      console.log('🌅 [Backend] Waking up backend server...');
      const startTime = Date.now();
      
      // Simple health check or menu fetch to wake up the server
      await api.get('/menu', { timeout: 30000 });
      
      const duration = Date.now() - startTime;
      console.log(`✅ [Backend] Server is awake! (took ${duration}ms)`);
      backendAwake = true;
      return true;
    } catch (error) {
      console.warn('⚠️ [Backend] Wake-up request failed:', error.message);
      return false;
    } finally {
      wakeUpPromise = null;
    }
  })();
  
  return wakeUpPromise;
};

/**
 * Check if menu cache is valid
 */
const isCacheValid = () => {
  return menuCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION);
};

/**
 * Get menu items with caching
 */
export const getCachedMenu = async () => {
  if (isCacheValid()) {
    console.log('📦 [Cache] Returning cached menu data');
    return menuCache;
  }
  
  try {
    console.log('🔄 [Cache] Fetching fresh menu data...');
    const response = await api.get('/menu');
    menuCache = response.data;
    cacheTimestamp = Date.now();
    console.log('✅ [Cache] Menu cached successfully');
    return menuCache;
  } catch (error) {
    // If fetch fails but we have stale cache, return it
    if (menuCache) {
      console.warn('⚠️ [Cache] Fetch failed, returning stale cache');
      return menuCache;
    }
    throw error;
  }
};

/**
 * Clear the menu cache (useful after admin updates)
 */
export const clearMenuCache = () => {
  menuCache = null;
  cacheTimestamp = null;
  console.log('🗑️ [Cache] Menu cache cleared');
};

/**
 * Prefetch menu data in background
 */
export const prefetchMenu = () => {
  if (!isCacheValid()) {
    getCachedMenu().catch(() => {
      // Silently fail - this is just prefetching
    });
  }
};

export default {
  wakeUpBackend,
  getCachedMenu,
  clearMenuCache,
  prefetchMenu,
};
