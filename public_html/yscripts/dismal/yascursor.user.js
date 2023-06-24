// ==UserScript==
// @name yascursor
// @namespace *
// @include *yastalker.com*
// @include *russian-stalker.co.cc*
// @version 1.0
if (window.location.hostname.match(/yastalker\.com/) || window.location.hostname.match(/russian-stalker\.co\.cc/)) 
{
	var style = '* { cursor: url('http://savepic.net/1680906.gif'), url('http://savepic.net/1686026.gif'), auto; !important}';
var newSS;
	newSS = window.document.createElement('link');
	newSS.rel='stylesheet';
	newSS.href='data:text/css,' + escape(style);
	
	window.document.getElementsByTagName("head")[0].appendChild(newSS);
}