// ==UserScript==
// @name         Autodarts Mobile
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix Autodarts board manager for mobile.
// @author       Ifor Waldo Williams
// @match        http://192.168.1.2:3180/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/iforwms/tampermonkey/main/autodarts-mobile.js
// @updateURL    https://raw.githubusercontent.com/iforwms/tampermonkey/main/autodarts-mobile.js
// ==/UserScript==

(function () {
  "use strict";
  if (window.document.title !== "Autodarts Board") {
    return;
  }

  function waitForEl(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  waitForEl(".chakra-stack").then((el) => {
    console.log("Element is ready");
    console.log(el.textContent);
  });
})();
