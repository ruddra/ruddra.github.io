"use strict";
function browserSupportsAllFeatures() {
  return window.IntersectionObserver && window.URLSearchParams;
}

function loadScript() {
  var js = document.createElement('script');
  js.src = "https://polyfill.io/v3/polyfill.min.js?flags=gated&features=Object.assign%2CIntersectionObserver%2CURLSearchParams";
  js.onload = function () {
    loadLozad();
  };
  js.onerror = function () {
    console.log("Error")
  };
  document.head.appendChild(js);
}

function loadLozad() {
  var observer = lozad();
  observer.observe();
}

if (!browserSupportsAllFeatures) {
  loadScript()
} else {
  loadLozad();
}


function showPrivacy() {
  setTimeout(function () {
    if (localStorage.getItem("cookieSeen") != "shown") {
      localStorage.setItem("cookieSeen", "shown");
      var x = document.getElementById("snackbar");
      x.className = "show";
    }
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-58095062-1', 'auto');
    ga('send', 'pageview');
    function closePrivacy() {
      var x = document.getElementById("snackbar");
      x.className = "hide";
    }

    document.getElementById("close-privacy").addEventListener('click', closePrivacy);
  }, 5000)
}
showPrivacy();