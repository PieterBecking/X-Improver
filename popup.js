document.addEventListener('DOMContentLoaded', () => {
    const togglePolitical = document.getElementById('togglePolitical');
    const toggleDistractions = document.getElementById('toggleDistractions');
  
    // Load the current state from Chrome storage
    chrome.storage.sync.get(['hidePolitical', 'hideDistractionsEnabled'], (result) => {
      togglePolitical.checked = result.hidePolitical ?? true; // Default to true if undefined
      toggleDistractions.checked = result.hideDistractionsEnabled ?? false; // Default to false if undefined
    });
  
    // Toggle political tweets hiding state on change
    togglePolitical.addEventListener('change', () => {
      const hidePolitical = togglePolitical.checked;
      chrome.storage.sync.set({ hidePolitical });
      
      // Send a message to the content script to update the hiding state
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: setHidingState,
          args: [hidePolitical]
        });
      });
    });
  
    // Toggle distractions state on change
    toggleDistractions.addEventListener('change', () => {
      const hideDistractionsEnabled = toggleDistractions.checked;
      chrome.storage.sync.set({ hideDistractionsEnabled });
      
      // Send a message to the content script to update the distractions state
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: setDistractionsState,
          args: [hideDistractionsEnabled]
        });
      });
    });
  });
  
  // Function to update the content script with the current political tweets hiding state
  function setHidingState(hidePolitical) {
    localStorage.setItem('hidePolitical', hidePolitical);
    if (hidePolitical) {
      hideTweets();
    } else {
      unhideTweets();
    }
  }
  
  // Function to update the content script with the current distractions hiding state
  function setDistractionsState(hideDistractionsEnabled) {
    localStorage.setItem('hideDistractionsEnabled', hideDistractionsEnabled);
    if (hideDistractionsEnabled) {
      hideSidebar();
    } else {
      unhideSidebar();
    }
  }
  