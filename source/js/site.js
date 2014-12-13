window.onload = function (){

  console.log('nice to see you, old friend :)');

  function changeJobTitle() {
    var jobElement = document.getElementsByClassName('job')[0].children[0];

    if (currentJobIndex < jobTitles.length - 1) {
      currentJobIndex += 1;
    }
    else {
      currentJobIndex = 0;
    }

    jobElement.textContent = jobTitles[currentJobIndex];
  }

  function showColophon(e) {
    console.log('yo');
    var colophonElement = e.target;
    colophonElement.classList.add('hide');
  }

  var x = document.getElementById('colophon').addEventListener('click', showColophon);

  if (window.location.pathname.indexOf('projects') == -1) {
    var currentJobIndex = 0, jobTitles = [
      'a front end developer',
      'a developer advocate',
      'an open data evangelist',
      'a hacker',
      'a 2014 code for america fellow'
    ];

    changeJobTitle();
    setInterval(changeJobTitle, 1700);
  }
}
