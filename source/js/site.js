(function(){
  function initPrintButton() {
    const btn = document.querySelector('#print')
    if (!btn) return

    btn.addEventListener('click', function(e) {
      e.preventDefault()
      window.print()
    })
  }

  window.onload = function (){
    const emoji = '🍕'
    const edge = emoji.repeat(5)
    console.log(emoji.repeat(30))
    console.log(edge + ' '.repeat(33) + edge)
    console.log(edge + ' nice to see you, old friend  :) ' + edge)
    console.log(edge + ' '.repeat(33) + edge)
    console.log(emoji.repeat(30))

    initPrintButton()
  }
})()
