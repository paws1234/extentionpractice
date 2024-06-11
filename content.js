document.addEventListener('mouseup', () => {
    let selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      chrome.runtime.sendMessage({action: 'highlightText', text: selectedText});
    }
  });
  