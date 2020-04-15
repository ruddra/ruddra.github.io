if (window.location.hash == "#comment-submitted") {
  var $comTarget = document.getElementById('comment-submitted-box');
  $comTarget.style.display = 'block';
} else if (window.location.hash == "#comment-error") {
  var $comTarget = document.getElementById('comment-error');
  $comTarget.style.display = 'block';
}

function renderCommentInMD(inputVal) {
  var converter = new showdown.Converter();
  document.getElementById('commneto-renderer-msg').innerHTML =
    `<h2 class="commneto-renderer-msg-header" style="color:rgb(128, 9, 9); font-weight:800;font-size:20px">&nbspPreview:</h2>` +
    converter
      .makeHtml(
        inputVal);
  document.getElementById('commento-textarea-root').innerHTML = inputVal
}

window.onscroll = function () {
  scrollProgressFunc()
};

function scrollProgressFunc() {
  var elmnt = document.getElementsByClassName("post");
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
  inputField.disabled = true;
  inputButton.disabled = true;
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