/*! lozad.js - v1.14.0 - 2019-10-19
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2019 Apoorv Saxena; Licensed MIT */!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).lozad=e()}(this,function(){"use strict";var d="undefined"!=typeof document&&document.documentMode,c={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=document.createElement("img");d&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),t.append(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var r=t.children,a=void 0,o=0;o<=r.length-1;o++)(a=r[o].getAttribute("data-src"))&&(r[o].src=a);t.load()}if(t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset")),t.getAttribute("data-background-image"))t.style.backgroundImage="url('"+t.getAttribute("data-background-image").split(",").join("'),url('")+"')";else if(t.getAttribute("data-background-image-set")){var i=t.getAttribute("data-background-image-set").split(","),n=i[0].substr(0,i[0].indexOf(" "))||i[0];n=-1===n.indexOf("url(")?"url("+n+")":n,1===i.length?t.style.backgroundImage=n:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+n+"; background-image: -webkit-image-set("+i+"); background-image: image-set("+i+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function l(t){t.setAttribute("data-loaded",!0)}var b=function(t){return"true"===t.getAttribute("data-loaded")};return function(){var r,a,o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=Object.assign({},c,t),i=e.root,n=e.rootMargin,d=e.threshold,u=e.load,s=e.loaded,g=void 0;return"undefined"!=typeof window&&window.IntersectionObserver&&(g=new IntersectionObserver((r=u,a=s,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),b(t.target)||(r(t.target),l(t.target),a(t.target)))})}),{root:i,rootMargin:n,threshold:d})),{observe:function(){for(var t=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)}(o,i),e=0;e<t.length;e++)b(t[e])||(g?g.observe(t[e]):(u(t[e]),l(t[e]),s(t[e])))},triggerLoad:function(t){b(t)||(u(t),l(t),s(t))},observer:g}}});;var observer=lozad();observer.observe();if(window.location.hash=="#comment-submitted"){var $comTarget=document.getElementById('comment-submitted-box');$comTarget.style.display='block';}else if(window.location.hash=="#comment-error"){var $comTarget=document.getElementById('comment-error');$comTarget.style.display='block';}
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
function showPrivacy(){if(localStorage.getItem("cookieSeen")!="shown"){setTimeout(()=>{showPrivacyPopup()},5000);}}
showPrivacy()
function showPrivacyPopup(){var x=document.getElementById("snackbar");x.className="show";localStorage.setItem("cookieSeen","shown")}
function closePrivacy(){var fadeTarget=document.getElementById("snackbar");var fadeEffect=setInterval(function(){if(!fadeTarget.style.opacity){fadeTarget.style.opacity=1;}
if(fadeTarget.style.opacity>0){fadeTarget.style.opacity-=0.1;}else{clearInterval(fadeEffect);}},50);}
document.getElementById("close-privacy").addEventListener('click',closePrivacy);function increaseLikeCounter(){var counters=document.querySelectorAll("#like-count")
for(var i=0;i<counters.length;i++){var counter=counters[i]
var value=parseInt(counter.innerText,10)
value=isNaN(value)?0:value
value++
counter.innerText=value}
var target_share=document.querySelectorAll("#loved-count");for(var i=0;i<target_share.length;i++){target_share[i].style.color="#2c4fff"
target_share[i].style.fontWeight="bold"}}
function loveArticle(){if(alreadyLiked()==true){return}
storeLiked()
makePink()
submitLike()}
function alreadyLiked(){return isNaN(localStorage.getItem("liked-"+getSlug()))}
function getSlug(){return window.location.pathname.split('/').reverse()[1];}
function createCORSRequest(method,url){var xhr=new XMLHttpRequest();if("withCredentials"in xhr){xhr.open(method,url,true);}else if(typeof XDomainRequest!="undefined"){xhr=new XDomainRequest();xhr.open(method,url);}else{xhr=null;}
return xhr;}
function makeHttpRequest(retryCount){var slug=getSlug()
var dictionary={"options[parent]":slug,"options[slug]":slug,"options[origin]":"https://ruddra.com/likes","fields[email]":window.location.href,}
var params=[]
Object.keys(dictionary).forEach(function(key){var param=key+"="+dictionary[key]
params.push(param)});var url="https://ruddra-comments.netlify.app/.netlify/functions/server/v2/entry/github/ruddra/ruddra.likes/master/comments/"
var http=createCORSRequest("POST",url);http.setRequestHeader("Content-type","application/x-www-form-urlencoded");http.setRequestHeader("Access-Control-Allow-Origin","*");http.onload=function(){if(this.status===200){increaseLikeCounter()
makeRed()}else if(retryCount>0){setTimeout(function(){makeHttpRequest(retryCount--)},1000);}}
http.onerror=function(){setTimeout(function(){makeHttpRequest(retryCount--)},1000);}
http.send(params.join('&'));}
function submitLike(){var retryCount=5
makeHttpRequest(retryCount)}
function storeLiked(){localStorage.setItem("liked-"+getSlug(),"liked")}
function makeRed(){var target_share=document.querySelectorAll("#love-share-sign");for(var i=0;i<target_share.length;i++){target_share[i].style.fill="red"}}
function makePink(){var target_share=document.querySelectorAll("#love-share-sign");for(var i=0;i<target_share.length;i++){target_share[i].style.fill="#ff8fc7";}}
function showLiked(){if(alreadyLiked()==true){makeRed()
increaseLikeCounter()}}
showLiked()
var listener_=document.getElementById("love-share")
var listener_mb=document.getElementById("love-share-mb")
if(listener_){listener_.addEventListener('click',loveArticle)}
if(listener_mb){listener_mb.addEventListener('click',loveArticle)};if(window.location.hash=="#newsletter-submitted"){var $comTarget=document.getElementById('newsletter-submitted-box');$comTarget.style.display='block';var $comTarget=document.getElementById('newsletter-body');$comTarget.style.display='none';}else if(window.location.hash=="#newsletter-error"){var $comTarget=document.getElementById('newsletter-error');$comTarget.style.display='block';}
function loadLoader(){var loader=document.getElementById('cover-spin');loader.style.display='block';}
var elm=document.getElementById("commento-submit-button-root-newsletter")
if(elm){elm.addEventListener("click",loadLoader)};(function(){if(!document.queryCommandSupported("copy")){return}function d(e,f){e.textContent=f;setTimeout(function(){e.textContent="Copy"},1000)}function c(g){var f=window.getSelection();var e=document.createRange();e.selectNodeContents(g);f.removeAllRanges();f.addRange(e);return f}function b(g){var f=document.createElement("button");f.className="highlight-copy-btn";f.textContent="Copy";var e=g.firstElementChild;f.addEventListener("click",function(){try{var h=c(e);document.execCommand("copy");h.removeAllRanges();d(f,"Copied!")}catch(i){console&&console.log(i);d(f,"Failed :'(")}});g.appendChild(f)}var a=document.getElementsByClassName("highlight");Array.prototype.forEach.call(a,b)})();