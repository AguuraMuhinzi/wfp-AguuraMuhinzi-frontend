// src/utils/navigationGuard.js

// Initialize the navigation guard
export const initNavigationGuard = () => {
  // Use window.history instead of just history
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  // Override pushState
  window.history.pushState = function(state, title, url) {
    // Mark navigation as valid for any programmatic navigation
    sessionStorage.setItem('validNavigation', 'true');
    return originalPushState.apply(this, [state, title, url]);
  };

  // Override replaceState
  window.history.replaceState = function(state, title, url) {
    sessionStorage.setItem('validNavigation', 'true');
    return originalReplaceState.apply(this, [state, title, url]);
  };

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    // We'll consider browser back/forward as invalid navigation
    sessionStorage.removeItem('validNavigation');
  });

  // Clear on page load
  window.addEventListener('load', () => {
    // On initial page load, check if it's a direct URL access
    if (document.referrer === '' || !document.referrer.includes(window.location.origin)) {
      sessionStorage.removeItem('validNavigation');
    }
  });
};

// Check if the current navigation is valid
export const isValidNavigation = () => {
  return sessionStorage.getItem('validNavigation') === 'true';
};