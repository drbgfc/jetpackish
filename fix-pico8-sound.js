
(function() {
  // inject favicons and web manifest
  var head = document.head
  
  // Favicon (SVG)
  var faviconSvg = document.createElement('link')
  faviconSvg.rel = 'icon'
  faviconSvg.type = 'image/svg+xml'
  faviconSvg.href = 'public/icons/favicon.svg'
  head.appendChild(faviconSvg)
  
  // Favicon (PNG fallback)
  var faviconPng = document.createElement('link')
  faviconPng.rel = 'icon'
  faviconPng.type = 'image/png'
  faviconPng.sizes = '96x96'
  faviconPng.href = 'public/icons/favicon-96x96.png'
  head.appendChild(faviconPng)
  
  // Apple Touch Icon
  var appleTouchIcon = document.createElement('link')
  appleTouchIcon.rel = 'apple-touch-icon'
  appleTouchIcon.sizes = '180x180'
  appleTouchIcon.href = 'public/icons/apple-touch-icon.png'
  head.appendChild(appleTouchIcon)
  
  // Web App Manifest
  var manifest = document.createElement('link')
  manifest.rel = 'manifest'
  manifest.href = 'public/site.webmanifest'
  head.appendChild(manifest)
  
  // Theme color for mobile browsers
  var themeColor = document.createElement('meta')
  themeColor.name = 'theme-color'
  themeColor.content = '#222'
  head.appendChild(themeColor)

  // inject loading screen CSS with responsive scaling
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

    /* Responsive scaling for mobile devices */
    @media screen and (max-width: 768px) {
      .loading-screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px !important;
      }

      .gem-row {
        gap: 10px;
        margin-bottom: 15px;
      }

      .gem-row .gem {
        width: 12px;
        height: 12px;
      }

      .loading-title {
        font-size: 48px;
        letter-spacing: 10px;
        margin-bottom: 15px;
      }

      .loading-subtitle {
        font-size: 16px;
        letter-spacing: 3px;
        margin-bottom: 40px;
      }

      .loading-instructions {
        font-size: 16px;
        max-width: 90%;
        padding: 20px;
        margin-bottom: 40px;
      }

      .loading-instructions div {
        margin: 10px 0;
        padding-left: 16px;
      }

      .loading-challenge {
        margin-top: 16px;
        font-size: 16px;
      }

      .loading-click {
        font-size: 24px;
        letter-spacing: 3px;
      }
    }

    /* Extra small screens */
    @media screen and (max-width: 480px) {
      .loading-title {
        font-size: 36px;
        letter-spacing: 6px;
      }

      .loading-subtitle {
        font-size: 14px;
      }

      .loading-instructions {
        font-size: 14px;
      }

      .loading-click {
        font-size: 20px;
      }
    }

    /* Landscape orientation on mobile */
    @media screen and (max-width: 768px) and (orientation: landscape) {
      .loading-screen {
        padding: 10px !important;
      }

      .loading-title {
        font-size: 32px;
        margin-bottom: 8px;
      }

      .loading-subtitle {
        font-size: 12px;
        margin-bottom: 15px;
      }

      .loading-instructions {
        font-size: 12px;
        padding: 12px;
        margin-bottom: 15px;
      }

      .loading-instructions div {
        margin: 4px 0;
      }

      .loading-click {
        font-size: 16px;
      }

      .gem-row {
        margin-bottom: 8px;
      }

      .gem-row .gem {
        width: 8px;
        height: 8px;
      }
    }
  `
  document.head.appendChild(style)

  // strip vendor prefixes
  var WebAudioAPI = window.AudioContext
    || window.webkitAudioContext
    || window.mozAudioContext
    || window.oAudioContext
    || window.msAudioContext

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
    '<div>GET ALL GEMS TO WIN.</div>' +
    '<div>SAVE YOUR FUEL.</div>' +
    '<div>BE FAST. BE BRAVE.</div>' +
    '<br>' +
    '<div class="loading-challenge">I CAN GET TO LVL 5... CAN YOU?</div>' +
    '</div>' +
    '<br>' +
    '<div class="loading-click">[CLICK, TOUCH, OR PRESS ANY KEY TO START]</div>'
  o.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
    'background: #222',
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

    // Create and unlock audio context for jetpackish.html
    // This sets the global pico8_audio_context that jetpackish.html uses
    if (WebAudioAPI) {
      window.pico8_audio_context = new WebAudioAPI()
      
      // Wake up audio on iOS by playing a silent buffer
      try {
        var buffer = pico8_audio_context.createBuffer(1, 1, 22050)
        var source = pico8_audio_context.createBufferSource()
        source.buffer = buffer
        source.connect(pico8_audio_context.destination)
        source.start(0)
      } catch (err) {
        console.log('Audio unlock failed:', err)
      }
    }

    // delete overlay div
    document.body.removeChild(o)

    // directly start the game (p8_run_cart is defined in index.html)
    if (typeof p8_run_cart === 'function') {
      p8_run_cart()
    }
  }
})()
