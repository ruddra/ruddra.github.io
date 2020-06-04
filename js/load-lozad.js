"use strict";
if (!('IntersectionObserver' in window)) {
  var script = document.createElement("script");
  script.src = "/js/intersection-observer.js";
  document.getElementsByTagName('head')[0].appendChild(script);
}
var observer = lozad();
observer.observe();