// ==UserScript==
// @name           NamesToLinks
// @namespace      *
// @include        *yastalker*
// ==/UserScript==

// made by Edgar "Orion" Obolensky

if (window.location.hostname.match(/yastalker\.com/))
{

//////////////////////////////////////////////////////////////////////
///// __abstract
//////////////////////////////////////////////////////////////////////

	function getElementsByClass(searchClass,node,tag)
	{
		var classElements = new Array();
		if (node==null) node=document;
		if (tag==null) tag='*';
		var els=node.getElementsByTagName(tag);
		var elsLen=els.length;

		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for (i=0,j=0;i<elsLen; i++){
			if (pattern.test(els[i].className)){
				classElements[j]=els[i];
				j++;
			}
		}
		return classElements;
	}

	function getElementIdByRegExp(p_regexp,p_element,p_tagName){
		p_element=p_element===null ? document : p_element;
		p_tagName=p_tagName===null ? '*' : p_tagName;
		var v_return=[];
		var v_inc=0;
		var p=p_element.getElementsByTagName(p_tagName)
		for(var v_i=0,v_il=p.length;v_i<v_il;v_i++){
			if(p.item(v_i).id && p.item(v_i).id.match(p_regexp)){
				v_return[v_inc]=p.item(v_i).id;
				v_inc++;
			}
		}
		return v_return;
	}

//////////////////////////////////////////////////////////////////////
///// __body
//////////////////////////////////////////////////////////////////////

	var trig

	function ParseChatNames(){
		var nameclass = getElementsByClass('seIM_conversation_trayMenu_messageUserName',null,'span')
		if (nameclass && (getElementIdByRegExp(/seIM_conversation_trayMenu_[0-9]+_message_[0-9]+/gi,null,'li').length>0) && trig){
			for (i=0;i<nameclass.length;i++){
				if (nameclass[i].innerHTML!='' && !nameclass[i].innerHTML.match(/__seIM_SETNAME/gi)){
					var name = nameclass[i].innerHTML.replace(':','')
					nameclass[i].innerHTML='<a class="__seIM_SETNAME" href="/profile.php?user='+name+'" target="_self" title="Перейти в профиль">'+name+'</a>:'
				}
			}
			trig = false
		}
	}

	function update(){
		if (document.getElementById('seIM_options_trayItem')){
			var check = getElementsByClass('__seIM_SETNAME',null,'a')
			var tochk = getElementIdByRegExp(/seIM_conversation_trayMenu_[0-9]+_message_[0-9]+/gi,null,'li').length
			if (check && check.length!=tochk){
				trig = true
				ParseChatNames()
			}
		}
	}

	window.setTimeout(function(){window.setInterval(update,500);},100)

	function stc(){
		var div = document.createElement('div')
		div.setAttribute('style','display:none;')
		div.setAttribute('class','__stc;')
		div.setAttribute('id','__modchatparserActive')
		document.body.appendChild(div)
	}
	stc()
}
