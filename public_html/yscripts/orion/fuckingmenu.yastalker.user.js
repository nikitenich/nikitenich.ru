// ==UserScript==
// @name           menu
// @namespace      *
// @include        *yastalker*
// ==/UserScript==

// made by Edgar "Orion" Obolenskiy

//////////////////////////////////////////////////////////////////////
///// Обработка идиотского меню
//////////////////////////////////////////////////////////////////////

if (window.location.hostname.match(/yastalker\.com/))
{

	var old
	var state = true
	if (state){
		var find_menu = document.querySelectorAll('img[src$="menu_arrow.gif"]');
		for (var i=0; i<find_menu.length; i++){
			find_img = find_menu[i]
			old = find_img.getAttribute('onmouseover')
			find_img.removeAttribute('onmouseover')
			find_img.setAttribute('onmousedown',old)
		}
		state=false
	}

	function __stc(){
		var div = document.createElement('div')
		div.setAttribute('style','display:none;')
		div.setAttribute('id','__fuckingmenuActive')
		document.body.appendChild(div)
	}
	__stc()
}
