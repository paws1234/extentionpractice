document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(null, (items) => {
      let savedPagesDiv = document.getElementById('savedPages');
      for (let key in items) {
        let page = items[key];
        let pageDiv = document.createElement('div');
        let pageLink = document.createElement('a');
        pageLink.href = page.url;
        pageLink.textContent = page.title;
        pageLink.target = '_blank'; 
        pageLink.classList.add('block', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded', 'hover:bg-blue-600');
        pageDiv.appendChild(pageLink);
        savedPagesDiv.appendChild(pageDiv);
      }
    });
  });
  