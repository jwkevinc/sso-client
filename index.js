
const SSO_URL = 'https://jwkevinc.github.io/sso-main/'

const btn = document.querySelector('button');

// Limit to only 1 iframe
function loadIframe() {
  return new Promise((resolve, ) => {
    let iframe = document.getElementById('iframe')
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'iframe');
      iframe.setAttribute('src', SSO_URL);
      iframe.setAttribute('style', 'display: none');
      document.body.appendChild(iframe);
    } else {
      iframe.setAttribute('src', SSO_URL);
    }
    document.getElementById('iframe').onload = function() {
      resolve(true);
    }
  });
}

function getToken() {
  loadIframe().then(() => {
    var info = {type: 'getToken'};
    var iframeWindow = document.getElementById("iframe").contentWindow;
    iframeWindow.postMessage(info, SSO_URL);
  })
}

function setMessageListener() {
  window.addEventListener("message", (e) => {
    console.log(e.data);
  });
}

document.onload = function() {
  setMessageListener();

  btn.addEventListener('click', function() {
    getToken();
  });
}();
