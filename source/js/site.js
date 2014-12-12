(function (){

  console.log('nice to see you, old friend :)');

  var jobTitles = ['a front end developer','a developer advocate','an open data evangelist','a hacker', 'a 2014 code for america fellow'],
      currentJobIndex = 0,
      homeZip = 94118;

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

  function loadWeather(zipCode) {
    console.log('finding the weather for zip:', zipCode);
    console.log('well... that will be implemented soon');
    var weatherElement = document.getElementsByClassName('weather')[0];

    setTimeout(function() {
      weatherElement.textContent = 'rainy';
    }, 3000);
  }

  changeJobTitle();
  setInterval(changeJobTitle, 1700);
  //loadWeather(homeZip);
})();
