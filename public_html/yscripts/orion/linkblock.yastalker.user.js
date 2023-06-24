// ==UserScript==
// @name           yastk.linkblock
// @namespace      http://www.yastalker.com/*, http://yastalker.com/*
// @description    Adds menu with favourites links.
// ==/UserScript==

if (window.location.hostname.match(/yastalker\.com/))
{

//	tables init
	var __names = [
			'Главная страница',
			'Блоги',
			'Группы'
			]
	var __links = [
			'http://yastalker.com/',
			'http://yastalker.com/browse_blogs.php',
			'http://yastalker.com/browse_groups.php'
			]

//////////////////////////////////////////////////////////////////////
///// Новое меню быстрых ссылок
//////////////////////////////////////////////////////////////////////

	var style_ = document.createElement('style');
	style_.setAttribute('type', 'text/css');
	style_.innerHTML='div.menu_item_dropdownS a {\
background:url("http://s6.radikal.ru/i73/00/da/8fbbae0e43e.gif") repeat scroll 0 0 transparent;\
border-left:3px solid #555555;\
display:block;\
font-weight:normal;\
padding:3px 40px 5px 7px;\
}\
div.menu_item_dropdownS {\
text-align:left;\
}\
\
div.menu_item_dropdownS a:hover {\
\
background:url("http://s6.radikal.ru/i73/00/da/8fbbae0e43e.gif") repeat scroll 0 0 transparent;\
border-left:3px solid #777777;\
display:block;\
font-weight:normal;\
padding:3px 40px 5px 7px;\
text-decoration:none;\
border-top:1px solid #777777;\
border-bottom:1px solid #777777;\
}\
\
div.menu_dropdownS {\
background:url("http://s61.radikal.ru/i173/1006/8c/ab78137aa19b.jpg") no-repeat scroll right top #222222;\
border-color:-moz-use-text-color #333333 #333333;\
border-right:1px solid #333333;\
border-style:none solid solid;\
border-width:medium 1px 1px;\
margin-left:-20px;\
margin-top:6px;\
position:absolute;\
white-space:nowrap;\
width:auto;\
z-index:99;\
}\
\
div.menu_item_dropdown a {\
background:url("http://s6.radikal.ru/i73/00/da/8fbbae0e43e.gif") repeat scroll 0 0 transparent;\
border-left:3px solid #555555;\
display:block;\
font-weight:normal;\
padding:3px 40px 5px 7px;\
}'
	document.getElementsByTagName('head')[0].appendChild(style_)

	var cs = document.createElement('script');
	cs.setAttribute('type', 'text/javascript');
	cs.innerHTML = 'function switchLayer(obj_id, parent_id){\
var block_state = document.getElementById(obj_id).style.display;\
if (block_state!=\'inline\'){document.getElementById(obj_id).style.display=\'inline\';}\
else{document.getElementById(obj_id).style.display=\'none\';}}'
	document.getElementsByTagName('head')[0].appendChild(cs);

//парсим и выводим
	function parse(){
		var name
		var link
		var inside = ''

		for (i=0;i<__names.length;i++){
			if (name!=__names[i]){name=__names[i]}
			if (link!=__links[i]){link=__links[i]}
			inside += '<div class="menu_item_dropdownS" onclick="switchLayer(\'mymenu\');"><a href="'+link+'" class="menu_item">\
					<img src="./images/icons/mynetwork16.gif" width="16" height="16" class="menu_icon2" alt="">'+name+'</a></div>'
		}

		menuinsert(inside)
	}

	function menuinsert(node){
		var __ss
		var mymenu = '<div><div class="menu_dropdownS" id="mymenu" style="display:none;position:absolute;right:-1px;top:47px;"><div id="__insidemenu"></div></div></div>'
		var javalinkmain = 'switchLayer(\'mymenu\');'
		var targetdiv = document.getElementsByTagName('div')
		for (i=0;i<targetdiv.length;i++){
			if (targetdiv[i].className=='top_menu_link_container_end'){
				targetdiv[i].innerHTML = '<div class="top_menu_link"><a id="mymenulink" href="javascript:'+javalinkmain+'" class="top_menu_item" title="Отсюда можно попасть куда угодно...">Мои ссылки</a></div>'
				targetdiv[i].innerHTML += mymenu
				__ss = document.getElementById('__insidemenu')
				if (__ss){
					__ss.innerHTML = node
				}
			}
		}
	}
	parse()
}