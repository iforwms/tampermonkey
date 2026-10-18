// ==UserScript==
// @name         YouTube: Shorts don't loop
// @namespace    youtube-shorts-no-loop
// @version      1.0.0
// @description  Stops a YouTube Short at its end instead of replaying it. Press play to watch it again.
// @match        *://www.youtube.com/*
// @match        *://m.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // YouTube navigates without reloading the page, so check the path each time.
  const onShorts = () => location.pathname.startsWith('/shorts/');

  // The Shorts player sets video.loop = true, and sets it again every time the video seeks,
  // so switching it off once doesn't stick. Override the setter so the player can't switch it on.
  const loop = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'loop');
  Object.defineProperty(HTMLMediaElement.prototype, 'loop', {
    ...loop,
    set(value) {
      loop.set.call(this, value && !onShorts());
    },
  });

  // Backstop for looping that is already on: a player made before the page became a Shorts page,
  // or a sandboxed injection (e.g. Firefox) where the override above doesn't reach the page.
  // Media events don't bubble, so listen during capture.
  const unloop = (e) => {
    if (onShorts() && e.target.loop) e.target.loop = false;
  };
  for (const type of ['play', 'timeupdate']) {
    document.addEventListener(type, unloop, true);
  }
})();
