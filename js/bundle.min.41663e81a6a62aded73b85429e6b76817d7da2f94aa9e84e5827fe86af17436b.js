if(window.location.hash=="#comment-submitted"){var $comTarget=document.getElementById('comment-submitted-box');$comTarget.style.display='block';}else if(window.location.hash=="#comment-error"){var $comTarget=document.getElementById('comment-error');$comTarget.style.display='block';}
window.onscroll=function(){scrollProgressFunc()};function scrollProgressFunc(){var elmnt=document.getElementById("blog-post");if(!elmnt){return}
var winScroll=elmnt.scrollTop||document.documentElement.scrollTop;var height=document.documentElement.scrollHeight-document.documentElement.clientHeight;var scrolled=(winScroll/height)*100;document.getElementById("myBar").style.width=scrolled+"%";}
function storeForm(){var commentParentField=document.getElementById('comment-parent')
var commentField=document.getElementById('commento-textarea-root')
var checkboxField=document.getElementById('commento-anonymous-checkbox-root')
var commentParent=commentParentField.value;var comment=commentField.value;var getEmail=checkboxField.value;localStorage.setItem('comment-parent',commentParent)
localStorage.setItem('comment',comment)
localStorage.setItem('getemail',getEmail)}
function updateForm(){var commentParentField=document.getElementById('comment-parent');var commentField=document.getElementById('commento-textarea-root');var checkboxField=document.getElementById('commento-anonymous-checkbox-root');var commentParentValue=localStorage.getItem('comment-parent');var commentValue=localStorage.getItem('comment');var emailValue=localStorage.getItem('getemail');var success
if(commentValue){commentParentField.value=commentParentValue
commentField.value=commentValue
checkboxField.value=emailValue
success=true}else{success=false}
localStorage.removeItem('comment-parent')
localStorage.removeItem('comment')
localStorage.removeItem('getemail')
return success}
function getCode(){var code;if(!URLSearchParams){function getUrlParams(){var result={};var params=(window.location.search.split('?')[1]||'').split('&');for(var param in params){if(params.hasOwnProperty(param)){var paramParts=params[param].split('=');result[paramParts[0]]=decodeURIComponent(paramParts[1]||"");}}
return result;}
code=getUrlParams().code;}else{var urlParams=new URLSearchParams(window.location.search);code=urlParams.get('code');}
return code}
function submitComment(event){var code=getCode()
var inputField=document.getElementById('commento-textarea-root');var inputButton=document.getElementById('commento-submit-button-root');inputField.style.disabled=true;inputButton.style.disabled=true;if(!code){event.preventDefault();storeForm()
var redirect_uri=window.location.href;window.location.href="https://github.com/login/oauth/authorize?scope=user:email&client_id=bc27cd2859301269f316&redirect_uri="+
redirect_uri;}else{event.currentTarget.submit();}}
function submitFormWithCode(){var code=getCode()
var finalUrl="https://ruddra-comments.netlify.app/.netlify/functions/server/v2/custom/ruddra/ruddra.comments/master/comments/"
if(code){var loader=document.getElementById('cover-spin');loader.style.display='block';var updated=updateForm();if(!updated){window.location.href="#comment-error";return null;}
var form=document.getElementById('comment-form');form.action=finalUrl+code
form.submit()}}
submitFormWithCode()
function toggleMarkDownTable(){var x=document.getElementById("commento-markdown-help-root");if(x.style.display==="none"){x.style.display="block";}else{x.style.display="none";}}
function showPrivacy(){if(localStorage.getItem("cookieSeen")!="shown"){var x=document.getElementById("snackbar");x.className="show";localStorage.setItem("cookieSeen","shown")}}
showPrivacy();function closePrivacy(){var fadeTarget=document.getElementById("snackbar");var fadeEffect=setInterval(function(){if(!fadeTarget.style.opacity){fadeTarget.style.opacity=1;}
if(fadeTarget.style.opacity>0){fadeTarget.style.opacity-=0.1;}else{clearInterval(fadeEffect);}},50);}
document.getElementById("close-privacy").addEventListener('click',closePrivacy);;if(window.location.hash=="#newsletter-submitted"){var $comTarget=document.getElementById('newsletter-submitted-box');$comTarget.style.display='block';var $comTarget=document.getElementById('newsletter-body');$comTarget.style.display='none';}else if(window.location.hash=="#newsletter-error"){var $comTarget=document.getElementById('newsletter-error');$comTarget.style.display='block';}
function loadLoader(){var loader=document.getElementById('cover-spin');loader.style.display='block';}
var elm=document.getElementById("commento-submit-button-root")
if(elm){elm.addEventListener("click",loadLoader)};(function(){if(!document.queryCommandSupported("copy")){return}function d(e,f){e.textContent=f;setTimeout(function(){e.textContent="Copy"},1000)}function c(g){var f=window.getSelection();var e=document.createRange();e.selectNodeContents(g);f.removeAllRanges();f.addRange(e);return f}function b(g){var f=document.createElement("button");f.className="highlight-copy-btn";f.textContent="Copy";var e=g.firstElementChild;f.addEventListener("click",function(){try{var h=c(e);document.execCommand("copy");h.removeAllRanges();d(f,"Copied!")}catch(i){console&&console.log(i);d(f,"Failed :'(")}});g.appendChild(f)}var a=document.getElementsByClassName("highlight");Array.prototype.forEach.call(a,b)})();