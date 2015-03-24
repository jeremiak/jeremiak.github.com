var c = {yo: 'dude', foo: 'bar'};

function handleChange(changeObject) {
  console.log('changed');
  changeObject.forEach(function(change) {
    console.log('change event', change);
  });
}

Object.observe(c, handleChange);
console.log('c is being watched');

function nextJobHandler (jobSelector) {
  var currentJobIndex = 0,
      totalJobs = document.querySelectorAll(jobSelector).length, 
      moveBy = -2, moveByUnit = 'em';

  var marginTopText = function (margin) {
    return (margin * moveBy) + moveByUnit;
  }

  var nextMarginTop = function () {
    if (currentJobIndex == totalJobs -1) {
      currentJobIndex = 0;
      return marginTopText(0);
    }
    currentJobIndex += 1;
    return marginTopText(currentJobIndex);
  } 

  var nextJob = function () {
    document.querySelector(jobSelector).style.marginTop = nextMarginTop();
  }

  return nextJob; 
}

function showColophon(e) {
  var colophonElement = e.target;
  colophonElement.classList.add('hide');
}

window.onload = function (){

  console.log('nice to see you, old friend :)');

  document.getElementById('colophon').addEventListener('click', showColophon);

  var nextJob = new nextJobHandler('.job');
  if (window.location.pathname.indexOf('projects') == -1) {
    setInterval(nextJob, 2500);
  }
}
