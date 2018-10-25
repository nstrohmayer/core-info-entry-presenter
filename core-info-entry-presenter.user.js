// ==UserScript==
// @name         Core Info Entry Presenter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a presentation mode for CORE info entries.
// @author       Manuel Geier
// @match        https://core.catalysts.cc/communication/info/info-board/show/*
// ==/UserScript==

function GM_addStyle(cssStr) {
  let D = document;
  let newNode = D.createElement('style');
  newNode.textContent = cssStr;

  let targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
  targ.appendChild(newNode);
}

GM_addStyle(`

.core {
  background-color: white;
}


/*
 Header
*/
.header h2 {
  font-weight: bold;
  font-size: 200%;
}

.header {
  text-align: center;
}

.header * {
  float: none !important;
}


/*
 Content
*/
.content {
  margin-top: 1em;
}


/*
 Gallery
*/
.thumbnails li {
  display: inline-block;
  float: left;
  width: 200px;
  height: 200px;
}
.thumbnail {
  margin: 2px;
  width: unset;
  border: unset;
  box-shadow: unset;
}


/*
 Slideshow
*/

.modal-gallery {
  position: fixed;
  top: 0 !important;
  bottom: 0;
  left: 0;
  right: 0;
  width: auto;
  margin: 0 !important;
  border: 0;
}
.modal-gallery-content {
  width: 100%;
  height: 100%;
  padding: 0;
  box-shadow: none;
  border: 0;
  border-radius: 0;
  background-color: black;
}
.modal-image {
  width: 100% !important;
  height: 100% !important;
}
.modal-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
}
.modal-download {
  display: none;
}
.modal- {
  position: absolute;
  display: block;
  max-height: 100px;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 10px;
  color: white;
  background: rgba(0,0,0,0.6);
  text-align: center;
  max-width: unset !important;
}
.modal-gallery-header {
  position: absolute;
  display: block;
  color: white;
  right: 0;
  z-index: 1000;
}
.modal-gallery-header .close {
  margin: 5px;
}

.modal-title:not(:empty) {
  padding: 0.5em;
}
`);

(function () {
  'use strict';

  function removeNode(node) {
    if (node !== undefined && node.parentNode !== undefined) {
      node.parentNode.removeChild(node);
    }
  }

  // get rid of distractions
  removeNode(document.getElementsByClassName('navbar')[0]);
  removeNode(document.getElementsByClassName('breadcrumb')[0]);
  removeNode(document.getElementsByClassName('header-buttons')[0]);
  removeNode(document.getElementsByClassName('social-container')[0]);
  removeNode(document.getElementsByClassName('right-box')[0].parentNode);
  removeNode(document.getElementsByTagName('footer')[0].previousElementSibling); // <hr>
  removeNode(document.getElementsByTagName('footer')[0]);

  // ///
  // adjust styling
  // ///

  // header styling
  let headerNode = document.getElementsByClassName('header')[0];
  headerNode.children[0].className = '';
  for (let i = headerNode.children.length - 1; i >= 0; i--) {
    let childNode = headerNode.children[i];
    if (childNode.className !== undefined && childNode.className.includes('badge')) {
      removeNode(childNode);
    }
  }

  // full width content
  document.getElementsByClassName('span8')[0].className = '';

  // adjust container
  let containerNode = document.getElementsByClassName('container')[0];
  containerNode.className = ''; // remove 'container' class for custom styling
  containerNode.style.padding = '2em'; // some padding

})();
