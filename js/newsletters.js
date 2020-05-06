if (window.location.hash == "#newsletter-submitted") {
  var $comTarget = document.getElementById('newsletter-submitted-box');
  $comTarget.style.display = 'block';
  var $comTarget = document.getElementById('newsletter-body');
  $comTarget.style.display = 'none';
} else if (window.location.hash == "#newsletter-error") {
  var $comTarget = document.getElementById('newsletter-error');
  $comTarget.style.display = 'block';
}


function loadLoader() {
  var loader = document.getElementById('cover-spin');
  loader.style.display = 'block';
}

var elm = document.getElementById("commento-submit-button-root-newsletter")
if (elm) {
  elm.addEventListener("click", loadLoader)
}
