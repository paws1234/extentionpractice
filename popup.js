document.addEventListener('DOMContentLoaded', () => {
    const optionsBtn = document.getElementById('optionsBtn');
    const optionsDiv = document.getElementById('options');
  
    optionsBtn.addEventListener('click', () => {
      if (optionsDiv.classList.contains('hidden')) {
        optionsDiv.classList.remove('hidden');
        fetchSavedPages();
      } else {
        optionsDiv.classList.add('hidden');
      }
    });
  
    document.getElementById('savePageBtn').addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: {tabId: activeTab.id},
          func: savePage,
          args: [activeTab.url, activeTab.title]
        });
      });
    });
  });
  
  function fetchSavedPages() {
    chrome.storage.local.get(null, (items) => {
      let savedPagesDiv = document.getElementById('savedPages');
      savedPagesDiv.innerHTML = ''; 
      for (let key in items) {
        let page = items[key];
        let pageLink = document.createElement('a');
        pageLink.href = page.url;
        pageLink.textContent = page.title;
        pageLink.target = '_blank'; 
        pageLink.classList.add('block', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded', 'hover:bg-blue-600');
        savedPagesDiv.appendChild(pageLink);
      }
    });
  }
  
  function savePage(url, title) {
    let pageDetails = {
      url: url,
      title: title,
      timestamp: new Date().getTime()
    };
    chrome.runtime.sendMessage({action: 'savePage', pageDetails: pageDetails}, (response) => {
      if (response.status === 'success') {
        alert('Page saved successfully');
      }
    });
  }
  