function setData(name, value) {
  try {
    localStorage.setItem(name, value);
  } catch (e) {
    value = encodeURIComponent(value)
    document.cookie = name + "=" + (value || "") + ";expires=expires=Fri, 31 Dec 9999 23:59:59 UTC;path=/";
  }
}

function getData(name) {
  try {
    return localStorage.getItem(name);
  } catch (e) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
}

function eraseData(name) {
  try {
    return localStorage.removeItem(name);
  } catch (e) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}