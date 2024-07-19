// ==UserScript==
// @name         Autodarts Mobile
// @namespace    https://iforwms.com
// @version      0.2.3
// @description  Fix Autodarts board manager styling for mobile.
// @author       iforwms
// @match        http://192.168.1.2:3180/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @downloadURL  https://dl.iforwms.com/tampermonkey/autodarts-mobile.js
// @updateURL    https://dl.iforwms.com/tampermonkey/autodarts-mobile.js
// ==/UserScript==

(function () {
  "use strict";
  if (
    window.document.title !== "Autodarts Board" ||
    window.document.body.clientWidth > 800
  ) {
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

  waitForEl(".chakra-text").then(() => {
    console.log("updating styling");
    const root = document.getElementById("root");
    const menuDiv = root.childNodes[1];
    const mainDiv = root.childNodes[2];

    menuDiv.firstChild.firstChild.style.display = "none";
    menuDiv.style.overflowX = "auto";
    menuDiv.firstChild.style.padding = "4px";
    const menuItems = menuDiv.firstChild.childNodes[3];
    menuItems.childNodes.forEach(
      (item) => (item.childNodes[0].style.display = "none")
    );

    const buttonsDiv = mainDiv.firstChild.firstChild.firstChild;
    buttonsDiv.style.gridTemplateColumns = "repeat(6, 1fr)";
    buttonsDiv.childNodes[0].style.gridColumn = "span 6 / span 6";
    buttonsDiv.childNodes[1].style.gridColumn = "span 3 / span 3";
    buttonsDiv.childNodes[2].style.gridColumn = "span 3 / span 3";
    buttonsDiv.childNodes[3].style.gridColumn = "span 2 / span 2";
    buttonsDiv.childNodes[4].style.gridColumn = "span 2 / span 2";
    buttonsDiv.childNodes[5].style.gridColumn = "span 2 / span 2";

    const statsDiv = mainDiv.firstChild.firstChild.childNodes[1];
    statsDiv.style.display = "grid";
    statsDiv.style.textAlign = "center";
    statsDiv.style.gridTemplateColumns = "repeat(3, 1fr)";
    statsDiv.childNodes[0].style.display = "none";
    statsDiv.childNodes[1].style.justifyContent = "center";
    statsDiv.childNodes[2].style.justifyContent = "center";
    statsDiv.childNodes[3].style.display = "none";
    statsDiv.childNodes[2].style.gridColumn = "span 2 / span 2";
    statsDiv.childNodes[4].style.gridColumn = "span 3 / span 3";

    const statusDiv = statsDiv.childNodes[4];
    statusDiv.firstChild.style.display = "grid";
    statusDiv.firstChild.style.gridTemplateColumns = "repeat(4, 1fr)";
    statusDiv.firstChild.firstChild.style.gridColumn = "span 4 / span 4";
  });
})();
