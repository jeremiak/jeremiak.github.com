window.onload = function (){
  console.log('nice to see you, old friend :)');
}

function favicon(url) {
  var f = document.createElement('link');
  f.rel = 'icon';
  f.type = 'icon/x-image';
  f.href = url;

  return f;
}

document.addEventListener('click', function(e) {
  var newFaviconUrl = 'img/purple.ico',
      head = document.querySelector('head'),
      bodyClasses = document.querySelector('body').classList,
      mouseX = e.clientX, mouseY = e.clientY;
  if (mouseY < 15) { /* if inside body::before */
    var oldFavicon = document.querySelector('link[rel=icon]');
    bodyClasses.add('new');
    head.removeChild(oldFavicon);
    /* using a timer so that the favicon and css declared color
      change at the same time-ish */
    setTimeout(function() {
      head.appendChild(favicon(newFaviconUrl)); 
    }, 500);
  }
});
