window.onload = function (){
  console.log('nice to see you, old friend :)');
}

function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1, str.length);
}

function changeColor(color) {
  setAccentColor(color);
  setLinkColor(color);
  setTimeout(function() {
    setFaviconColor(color);
  }, 500);
}

function setAccentColor(color) {
  var styles = document.createElement('style');
  document.querySelector('head').appendChild(styles);
  styles.sheet.addRule('body::before', 'background-color: ' + color);
  styles.sheet.addRule('footer .link-color', 'color: ' + color);
  styles.sheet.addRule('footer .link-color:after', 'content: "' + titleCase(color) + '"');
}

function setLinkColor(color) {
  var linkElements = document.querySelectorAll('a, a:hover, a:visited'),
      links = [].slice.call(linkElements);

  links.forEach(function(link) {
    link.style.setProperty('color', color);
    link.style.setProperty('border-bottom-color', color);
  });
}

function setFaviconColor(color) {
  var icon = document.querySelector('[rel=icon]');
  favicolor(icon, color);
}

var hashedColor = window.location.hash.split('#/');

if (hashedColor.length != 1) {
  changeColor(hashedColor[1]);
}

window.addEventListener('hashchange', function(e) {
  var color = e.newURL.split('/#/')[1];
  changeColor(color);
});

document.addEventListener('click', function(e) {
  if (e.clientY < 15) { /* if inside body::before */
    var body = document.querySelector('body');
    body.classList.add('new'); 
    setTimeout(function() {
      setFaviconColor('RebeccaPurple');
    }, 500);
  }
});
