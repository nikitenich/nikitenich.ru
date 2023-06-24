// ==UserScript==
// @name nologo
// @description    Hides logo hats portal.
// @namespace *
// @include *yastalker.com*
// ==/UserScript==

// Style code by Aleksey "Dr.Set" Unknown


if (window.location.hostname.match(/yastalker\.com/))
{

	var style = 'div#header1 img { opacity: 0; height: 50px; width: 0px;';
var newSS;
	newSS = window.document.createElement('link');
	newSS.rel='stylesheet';
	newSS.href='data:text/css,' + escape(style);
	
	window.document.getElementsByTagName("head")[0].appendChild(newSS);
}