document.addEventListener('DOMContentLoaded', function() {
    
    var checkPageButton = document.getElementById('addVideo');
    var listName = document.getElementById('listName'); 

    checkPageButton.addEventListener('click', function() {
  
      chrome.tabs.getSelected(null, function(tab) {
        if (tab.url.indexOf('youtube') > 0 ){
            d = document;
    
            var f = d.createElement('form');
            f.action = 'http://youpod.radged.com:3000';
            f.method = 'post';
            var i = d.createElement('input');
            var j = d.createElement('input');   
            i.type = 'hidden';
            i.name = 'url';
            i.value = tab.url;
            f.appendChild(i);
            j.type = 'hidden';
            j.name = 'listname';
            j.value = listName.value;
            f.appendChild(j);
            d.body.appendChild(f);
            f.submit();
        }
        else {
            alert('must be a youtube link')
        }
      });
    }, false);
  }, false);
  