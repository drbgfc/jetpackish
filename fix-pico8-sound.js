
(function() {
  // inject loading screen CSS
  var style = document.createElement('style')
  style.textContent = `
    /* Loading Screen Styles - 8-bit PICO-8 */
    .loading-screen {
      font-family: 'Courier New', 'Courier', monospace;
      font-weight: normal;
      line-height: 1.5;
      image-rendering: pixelated;
      -webkit-font-smoothing: none;
      -moz-osx-font-smoothing: grayscale;
    }
    .loading-title {
      font-size: 32px;
      color: #ffa300;
      letter-spacing: 8px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .loading-subtitle {
      font-size: 12px;
      color: #83769c;
      margin-bottom: 30px;
      letter-spacing: 2px;
    }
    .loading-instructions {
      font-size: 12px;
      color: #fff;
      max-width: 380px;
      margin: 0 auto 30px;
      text-align: left;
      background: #1d2b53;
      padding: 16px;
      border: 2px solid #29adff;
    }
    .loading-instructions div {
      margin: 6px 0;
      padding-left: 12px;
      position: relative;
    }
    .loading-instructions div:before {
      content: '>';
      position: absolute;
      left: 0;
      color: #ffec27;
    }
    .loading-challenge {
      color: #ff77a8;
      margin-top: 12px;
      animation: blink 1.5s step-start infinite;
    }
    .loading-click {
      font-size: 18px;
      color: #fff;
      display: inline-block;
      letter-spacing: 2px;
      font-weight: bold;
    }
    .gem-row {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-bottom: 6px;
      align-items: center;
    }
    .gem-row .gem {
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      background: #00e436;
      box-sizing: border-box;
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
  `
  document.head.appendChild(style)

  // fetch original file name
  var s = document.scripts[document.scripts.length - 1]
  var file = s.getAttribute('data-original-file')
  if (!file) throw new Error('Missing data-original-file attribute.')

  // strip vendor prefixes
  window.AudioContext = window.AudioContext
    || window.webkitAudioContext
    || window.mozAudioContext
    || window.oAudioContext
    || window.msAudioContext

  // make AudioContext a singleton so we control it
  var ctx = new window.AudioContext
  window.AudioContext = function() { return ctx }

  // create overlay
  var o = document.createElement('div')
  o.className = 'loading-screen'
  o.innerHTML = '<div class="gem-row">' +
      '<div class="gem" style="background:#00e436"></div>' +
      '<div class="gem" style="background:#008751"></div>' +
      '<div class="gem" style="background:#00e436"></div>' +
      '<div class="gem" style="background:#008751"></div>' +
      '<div class="gem" style="background:#00e436"></div>' +
    '</div>' +
    '<div class="loading-title">JETPACKISH</div>' +
    '<div class="loading-subtitle">PICO-8 GAME</div>' +
    '<div class="loading-instructions">' +
    '<div>ARROW KEYS: MOVE/JUMP/FLY</div>' +
    '<div>GET ALL GEMS TO WIN</div>' +
    '<div>SAVE YOUR FUEL</div>' +
    '<div>BE FAST. BE BRAVE.</div>' +
    '<br>' +
    '<div class="loading-challenge">I CAN GET TO LVL 5... CAN YOU?</div>' +
    '</div>' +
    '<br>' +
    '<div class="loading-click">[CLICK OR PRESS ANY KEY TO START]</div>'
  o.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
    'background: #303030',
    'color: white',
    'text-align: center',
    'padding-top: 80px',
    'z-index: 9999',
  ].map(function(p) { return p + ';' }).join('')
  document.body.appendChild(o)

  // allow any key to start the game as well as clicking
  var _keyStart = function(e) {
    try { o.onclick(); } catch (err) {}
    document.removeEventListener('keydown', _keyStart)
  }
  document.addEventListener('keydown', _keyStart, false)

  // disable scrolling
  document.body.style.overflow = 'hidden'
  o.onclick = function() {

    // ...until overlay is clicked
    document.body.style.overflow = ''

    // then unlock AudioContext on iOS
    var buffer = ctx.createBuffer(1, 1, 22050)
    var source = ctx.createBufferSource()
    source.connect(ctx.destination)
    if (source.noteOn) source.noteOn(0)
    else source.start(0)

    // dynamically load original script
    var s = document.createElement('script')
    s.setAttribute('src', file)
    document.body.appendChild(s)

    // reveal fullscreen control if present
    try {
      var fs = document.getElementById('fullscreen-btn')
      if (fs) fs.style.display = 'block'
    } catch (e) { /* ignore */ }

    // and delete overlay div
    document.body.removeChild(o)
  }
})()
