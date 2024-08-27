function hideTweets() {
    const keywords = [
      "kamala", "donald", "tim walz", "jd vance", 
      "harris", "trump", "walz", "vance", 
      "presidential election", "2024 election", "election", 
      "campaign", "trump campaign", "harris campaign", 
      "debate", "election debate", "vote", 
      "voting", "ballot", "polling", "polls", 
      "electoral college", "swing state", "battleground state", 
      "democratic party", "republican party", "GOP", "DNC", 
      "maga", "make america great again", "build back better", 
      "tax reform", "healthcare", "immigration", 
      "foreign policy", "supreme court", "scotus", 
      "senate", "congress", "house of representatives", 
      "governor", "senator", "representative", 
      "left wing", "right wing", "liberal", "conservative", 
      "progressive", "moderate", "socialism", "capitalism", 
      "fake news", "media bias", "mainstream media", "MSM",
      "campaign finance", "super pac", "dark money"
    ];
  
    const tweets = document.querySelectorAll('article');
  
    tweets.forEach(tweet => {
      const tweetText = (tweet.innerText || tweet.textContent).toLowerCase();
      if (keywords.some(keyword => tweetText.includes(keyword))) {
        tweet.style.display = 'none';
      }
    });
  }
  
  function unhideTweets() {
    const tweets = document.querySelectorAll('article');
    tweets.forEach(tweet => {
      tweet.style.display = '';
    });
  }
  
  // Function to hide the entire sidebar
  function hideSidebar() {
    const sidebar = document.querySelector('[data-testid="sidebarColumn"]');
    if (sidebar) {
      sidebar.style.display = 'none';
    }
  }
  
  function unhideSidebar() {
    const sidebar = document.querySelector('[data-testid="sidebarColumn"]');
    if (sidebar) {
      sidebar.style.display = '';
    }
  }
  
  // Check the hiding state and distractions state from localStorage
  function applyHidingState() {
    const hidePolitical = localStorage.getItem('hidePolitical') === 'true';
    const hideDistractionsEnabled = localStorage.getItem('hideDistractionsEnabled') === 'true';
  
    if (hidePolitical) {
      hideTweets();
    } else {
      unhideTweets();
    }
  
    if (hideDistractionsEnabled) {
      hideSidebar();
    } else {
      unhideSidebar();
    }
  }
  
  // Run the function when the page is loaded
  window.addEventListener('load', applyHidingState);
  
  // Observe for new tweets and sidebar elements dynamically loaded into the page
  const observer = new MutationObserver(applyHidingState);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Ensure that the sidebar stays hidden after page navigation or reload
  window.addEventListener('popstate', applyHidingState);
  window.addEventListener('pushstate', applyHidingState);
  

