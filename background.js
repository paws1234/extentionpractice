chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'savePage') {
      savePage(request.pageDetails);
      sendResponse({status: 'success'});
    }
  });
  
  function savePage(pageDetails) {
    chrome.storage.local.set({[pageDetails.url]: pageDetails}, () => {
      console.log('Page saved');
    });
  }
  