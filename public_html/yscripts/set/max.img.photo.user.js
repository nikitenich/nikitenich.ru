﻿// ==UserScript==
// @name max.img.photo
// @description    Resolution removes the avatar.
// @namespace *
// @include *yastalker.com*
// @version 1.0
// ==/UserScript==

// Style code by Aleksey "Dr.Set" Unknown

if (window.location.hostname.match(/yastalker\.com/))
{

	var style = 'img.photo { width: 100%;';
var newSS;
	newSS = window.document.createElement('link');
	newSS.rel='stylesheet';
	newSS.href='data:text/css,' + escape(style);
	
	window.document.getElementsByTagName("head")[0].appendChild(newSS);
}