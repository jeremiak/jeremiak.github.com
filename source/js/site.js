window.onload = function (){
  console.log('nice to see you, old friend :)');
}

document.addEventListener('click', function(e) {
  var bodyClasses = document.querySelector('body').classList,
      mouseX = e.clientX,
      mouseY = e.clientY;
  if (mouseY < 15) {
    bodyClasses.add('new');
  }
});
