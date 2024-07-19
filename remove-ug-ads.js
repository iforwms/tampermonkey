// ==UserScript==
// @name         Remove UG Ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide annoying UG ads
// @author       iforwms
// @match        https://tabs.ultimate-guitar.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ultimate-guitar.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/iforwms/tampermonkey/main/remove-ug-ads.js
// @updateURL    https://raw.githubusercontent.com/iforwms/tampermonkey/main/remove-ug-ads.js
// ==/UserScript==

(function () {
  "use strict";

  console.log("removing UG ads");

  setTimeout(function () {
    document
      .querySelectorAll("span")
      .forEach((span) =>
        span.innerHTML === "Check out the tab"
          ? span.parentNode.parentNode.parentNode.remove()
          : null
      );
    document
      .querySelectorAll("iframe")
      .forEach((iframe) =>
        iframe.title === "video" ? iframe.parentNode.parentNode.remove() : null
      );
  }, 1000);
})();
