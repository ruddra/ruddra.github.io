if (window.location.hash == "#comment-submitted") {
  var $comTarget = document.getElementById('comment-submitted-box');
  $comTarget.style.display = 'block';
} else if (window.location.hash == "#comment-error") {
  var $comTarget = document.getElementById('comment-error');
  $comTarget.style.display = 'block';
}

window.onscroll = function () {
  scrollProgressFunc()
};

function scrollProgressFunc() {
  var elmnt = document.getElementById("blog-post");
  if (!elmnt) {
    return
  }
  var winScroll = elmnt.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

function storeForm() {
  var commentParentField = document.getElementById('comment-parent')
  var commentField = document.getElementById('commento-textarea-root')
  var checkboxField = document.getElementById('commento-anonymous-checkbox-root')
  var commentParent = commentParentField.value;
  var comment = commentField.value;
  var getEmail = checkboxField.value;
  localStorage.setItem('comment-parent', commentParent)
  localStorage.setItem('comment', comment)
  localStorage.setItem('getemail', getEmail)
}

function updateForm() {
  var commentParentField = document.getElementById('comment-parent');
  var commentField = document.getElementById('commento-textarea-root');
  var checkboxField = document.getElementById('commento-anonymous-checkbox-root');
  var commentParentValue = localStorage.getItem('comment-parent');
  var commentValue = localStorage.getItem('comment');
  var emailValue = localStorage.getItem('getemail');
  var success
  if (commentValue) {
    commentParentField.value = commentParentValue
    commentField.value = commentValue
    checkboxField.value = emailValue
    success = true
  } else {
    success = false
  }
  localStorage.removeItem('comment-parent')
  localStorage.removeItem('comment')
  localStorage.removeItem('getemail')
  return success
}

function getCode() {
  var code;
  if (!URLSearchParams) {
    function getUrlParams() {
      var result = {};
      var params = (window.location.search.split('?')[1] || '').split('&');
      for (var param in params) {
        if (params.hasOwnProperty(param)) {
          var paramParts = params[param].split('=');
          result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
        }
      }
      return result;
    }
    code = getUrlParams().code;
  } else {
    var urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get('code');
  }
  return code
}


function submitComment(event) {
  var code = getCode()
  var inputField = document.getElementById('commento-textarea-root');
  var inputButton = document.getElementById('commento-submit-button-root');
  inputField.style.disabled = true;
  inputButton.style.disabled = true;
  if (!code) {
    event.preventDefault();
    storeForm()
    var redirect_uri = window.location.href;
    window.location.href =
      "https://github.com/login/oauth/authorize?scope=user:email&client_id=bc27cd2859301269f316&redirect_uri=" +
      redirect_uri;
  } else {
    event.currentTarget.submit();
  }
}

function submitFormWithCode() {
  var code = getCode()
  var finalUrl =
    "https://ruddra-comments.netlify.app/.netlify/functions/server/v2/custom/ruddra/ruddra.comments/master/comments/"
  if (code) {
    var loader = document.getElementById('cover-spin');
    loader.style.display = 'block';
    var updated = updateForm();
    if (!updated) {
      window.location.href = "#comment-error";
      return null;
    }
    var form = document.getElementById('comment-form');
    form.action = finalUrl + code
    form.submit()
  }
}
submitFormWithCode()

function toggleMarkDownTable() {
  var x = document.getElementById("commento-markdown-help-root");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showPrivacy() {
  if (localStorage.getItem("cookieSeen") != "shown") {
    var x = document.getElementById("snackbar");
    x.className = "show";
    localStorage.setItem("cookieSeen", "shown")
  }
}

showPrivacy();

function closePrivacy() {
  var fadeTarget = document.getElementById("snackbar");
  var fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 50);
}
document.getElementById("close-privacy").addEventListener('click', closePrivacy);

function increaseLikeCounter() {
  var counters = document.querySelectorAll("#loved-count")
  for (var i = 0; i < counters.length; i++) {
    var counter = counters[i]
    var value = parseInt(counter.innerText, 10)
    value = isNaN(value) ? 0 : value
    value++
    counter.innerText = 'x' + value
    counter.style.color = "#2c4fff"
    counter.style.fontWeight = "bold"
  }

}

function loveArticle() {
  if (alreadyLiked() == true) {
    return
  }
  increaseLikeCounter()
  makeRed()
  storeLiked()
  submitLike()
}

function alreadyLiked() {
  return isNaN(localStorage.getItem("liked-" + getSlug()))
}

function getSlug() {
  return window.location.pathname.split('/').reverse()[1];
}
function submitLike() {
  var slug = getSlug()
  var dictionary = {
    "options[parent]": slug,
    "options[slug]": slug,
    "options[origin]": "https://ruddra.com/likes",
    "fields[email]": window.location.href,
  }
  var params = []
  Object.keys(dictionary).forEach(function (key) {
    var param = key + "=" + dictionary[key]
    params.push(param)
  });
  var http = new XMLHttpRequest();
  http.open("POST", "https://ruddra-comments.netlify.app/.netlify/functions/server/v3/entry/github/ruddra/ruddra.likes/master/comments/", true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Access-Control-Allow-Origin", "*");
  http.send(params.join('&'));
  storeLiked()
}

function storeLiked() {
  localStorage.setItem("liked-" + getSlug(), "liked")
}

function makeRed() {
  var target_share = document.querySelectorAll("#love-share-sign");
  for (var i = 0; i < target_share.length; i++) {
    target_share[i].style.fill = "red"
  }
}

function showLiked() {
  if (alreadyLiked() == true) {
    makeRed()
    increaseLikeCounter()
  }
}
showLiked()
var listener_ = document.getElementById("love-share")
var listener_mb = document.getElementById("love-share-mb")
listener_.addEventListener('click', submitLike)
listener_mb.addEventListener('click', submitLike)