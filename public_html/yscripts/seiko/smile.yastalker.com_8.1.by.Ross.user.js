// ==UserScript==
// @name           smile.yastalker.com_8.1.by.Ross.user
// @namespace      *
// @include        *yastalker*
// ==/UserScript==

// made by Edgar "Orion" Obolensky
// styles coded by Andey "Stranger-Stalker" Jhuk
// edited by Mikhail "Ross" Dronov 

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

	function getElementIdByRegExp(p_regexp,p_element,p_tagName)
	{
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

	// internal copy ov __overhead.js struct-func for keylistner
	function addTag(startTag, endTag, area_id){
		var TXT = document.getElementById(area_id);
		TXT.focus();
		if (document.selection) with (document.selection.createRange ())
		{
			var t = text; text = startTag + text + endTag;
			if (!t.length) moveEnd ('character', endTag.length * (-1)); select ();
		}
		else if (TXT.selectionStart >= 0) with (TXT)
		{
			var sT = scrollTop, sL = scrollLeft, t = value,
			stS = selectionStart, leS = selectionEnd - stS,
			w = (startTag + t.substr (stS, leS) + endTag).length;
			value = t.substr (0, stS) + startTag + t.substr (stS, leS) + endTag + t.substr (stS + leS);
			if (leS) selectionStart = selectionEnd = stS + w;
			else selectionStart = selectionEnd = stS + startTag.length;
			scrollTop = sT, scrollLeft = sL;
		}
		else TXT.value += startTag + endTag;
	}

	// internal copy ov __overhead.js struct-func for keylistner
	function sLayer(obj_id, parent_state){
		var n = 'none'
		var ir = 'inline'
		var block_state = document.getElementById(obj_id).style;
		if (parent_state){
			if (block_state.display!=parent_state){block_state.display=parent_state;}
			else{block_state.display=n;}
		}
		else{
			if (block_state.display!=ir){block_state.display=ir;}
			else{block_state.display=n;}
		}
	}

	// internal copy ov __overhead.js struct-func for keylistner
	function Quote(area_id){
		var toform = document.getElementById(area_id);
		txt='';
		if (document.getSelection)
		{
			txt=document.getSelection();
		}
		else if (document.selection)
		{
			txt=document.selection.createRange().text;
		}

		if (txt != "")
		{
			txt='<q><i>'+txt+'</i></q>\n';
			toform.focus();
			toform.value += txt;
		}
	}

	function __scEngine(url)
	{
		var link = url;
		var old_s = document.getElementById('__ovh');
		if (old_s)
		{
			old_s.parentNode.removeChild(old_s);
		}
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.src = link;
		s.id = '__ovh';
		document.getElementsByTagName('head')[0].appendChild(s);
	}

	__scEngine("http://www.yastalker.com/uploads_admin/js/__overhead.js")

//////////////////////////////////////////////////////////////////////
///// Панель тегов для формы ответа
//////////////////////////////////////////////////////////////////////

	var tags_state = true
	var tagstyle = '.buttonteg {\
background-color:#16120D;\
border-color:#383838 #000000 #000000 #383838;\
border-style:solid;\
border-width:1px;\
font-family:Tahoma;\
font-size:11px;\
width:32px;\
color:#b39f7e;\
}\
#buttonteg_smilesRow {\
display:none;\
}\
.closesmiles {\
float:left;\
}\
.buttonteg_smileTable {\
width:92px;\
border: 1px solid #888888;\
background:#222222;\
position:relative;\
z-index:2;\
}\
.smilesRow a {\
padding:0px;\
text-align:center;\
}\
#buttonteg_facezRow {\
display:none;\
}\
.closefacez {\
float:right;\
}\
.buttonteg_faceTable {\
width:92px;\
border: 1px solid #888888;\
background:#222222;\
position:relative;\
z-index:2;\
}\
.facezRow a {\
padding:0px;\
text-align:center;\
}\
#buttonteg_fasesRow {\
display:none;\
}\
.closefases {\
float:right;\
}\
.buttonteg_faseTable {\
width:92px;\
border: 1px solid #888888;\
background:#222222;\
position:relative;\
z-index:2;\
}\
.fasesRow a {\
padding:0px;\
text-align:center;\
}\
#buttonteg_facesRow {\
display:none;\
}\
.closefaces {\
float:right;\
}\
.buttonteg_faceTable {\
width:92px;\
border: 1px solid #888888;\
background:#222222;\
position:relative;\
z-index:2;\
}\
.facesRow a {\
padding:0px;\
text-align:center;\
}\
#buttonteg_stalkerRow {\
display:none;\
}\
.closestalker {\
float:right;\
}\
.buttonteg_stalkeTable {\
width:92px;\
border: 1px solid #888888;\
background:#222222;\
position:relative;\
z-index:2;\
}\
.stalkerRow a {\
padding:0px;\
text-align:center;\
}'
	var tagSS;
	tagSS = window.document.createElement('link');
	tagSS.rel='stylesheet';
	tagSS.href='data:text/css,' + escape(tagstyle);

	window.document.getElementsByTagName("head")[0].appendChild(tagSS);

	var getareaid
	var quote
	var tagbuttons
	var smiles
   	var faces
	var stalker
	var facez
	var fases
	var topicid = 'group_discussion_reply'
	var profid = 'comment_body'
	var pollsid = 'poll_desc'
	function generate_id(){
		if (!getareaid){
			if (document.getElementById(topicid)){getareaid=topicid; quote='copypaste(\''+getareaid+'\')'}
			else {
				if (document.getElementById(profid)){getareaid=profid}
				if (document.getElementById('settings_show')){
					getareaid=pollsid
					var topic = document.getElementsByTagName("textarea")[0]
					if (topic.name==pollsid){
						topic.id=getareaid
					}
				}
				if (getareaid!=topicid && getareaid!=profid && getareaid!=pollsid){
					var topic = document.getElementsByTagName("textarea")
					if (topic.length>0 && topic[0].name) with (topic[0].name=='topic_body'){
						getareaid = 'group_discussion_new'
					}
				}
				quote = '__quote(\''+getareaid+'\')'
			}
			smiles = '<div id="buttonteg_smilesRow"><table class="buttonteg_smileTable">\
<tr><th colspan="12" style="text-align:center;"><a href="javascript:switchLayer(\'buttonteg_smilesRow\',\'block\');" class="closesmiles">[X]</a>Смайлы</th></tr>\
<tbody style="background:#000000 url(http://savepic.net/2806216.jpg) repeat ;">\
<tr>\
	<tr><th colspan="12" style="text-align:center;">Эмоции</th></tr>\
	<br>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/smile3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/smile3.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/sad.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/sad.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/blush2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/blush2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/blink.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/blink.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/cray.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/cray.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/laugh2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/laugh2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/yahoo.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/yahoo.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/ireful2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/ireful2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/mosking.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/mosking.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/rofl.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/rofl.gif" border="0" /></a></td>\
	</tr>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/swoon.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/swoon.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/grin.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/grin.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/wacko2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/wacko2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/sorry.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/sorry.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/shok.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/shok.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/gamer3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/gamer3.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/gamer1.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/gamer1.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smile.zerk.ru/kolobok/scare2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smile.zerk.ru/kolobok/scare2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smile.zerk.ru/kolobok/scratch.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smile.zerk.ru/kolobok/scratch.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/biggrin.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/biggrin.gif" border="0" /></a></td>\
	</tr>\
	<tr><th colspan="12" style="text-align:center;">Жесты</th></tr>\
	<br>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/wink3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/wink3.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/dntknw.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/dntknw.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/blum2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/blum2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/dirol.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/dirol.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/secret.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/secret.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/clapping.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/clapping.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/pardon.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/pardon.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/bye.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/bye.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/bad.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/bad.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/good.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/good.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/crazy.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/crazy.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/fool.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/fool.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/good2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/good2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/hi.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/hi.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/negative.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/negative.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/superman.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/superman.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/suicide2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/suicide2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/popcorm1.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/popcorm1.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/dash1.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/dash1.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/rtfm.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/rtfm.gif" border="0" /></a></td>\
<tr/>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/lazy2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/lazy2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/aggressive.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/aggressive.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/snooks.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/snooks.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/comando.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/comando.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/acute.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/acute.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/nea.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/nea.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/pioneer.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/pioneer.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/russian.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/russian.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/stop.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/stop.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/dance3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/dance3.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/punish2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/punish2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/declare.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/declare.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/scratch_one-s_head.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/scratch_one-s_head.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/victory.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/victory.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/preved.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/preved.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/yes4.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/yes4.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/kiss2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/kiss2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/flood.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/flood.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/facepalm.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/facepalm.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/pooh_go.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/pooh_go.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/personal/diablo.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/personal/diablo.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/angry_smiles/mad.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/angry_smiles/mad.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smile.zerk.ru/kolobok/to_clue.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smile.zerk.ru/kolobok/to_clue.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/patsak.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/patsak.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/sarcastic_blum.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/sarcastic_blum.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/flirt.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/flirt.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/feminist.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/feminist.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/russian_roulette.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/russian_roulette.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/vinsent.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/vinsent.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smile.zerk.ru/kolobok/don-t_me.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smile.zerk.ru/kolobok/don-t_me.gif" border="0" /></a></td>\
</tr>\
<tr><th colspan="12" style="text-align:center;">Для модеров</th></tr>\
	<br>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/user/KidRock_01.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/user/KidRock_01.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/user/KidRock_02.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/user/KidRock_02.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/user/KidRock_03.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/user/KidRock_03.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/user/KidRock_04.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/user/KidRock_04.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/user/KidRock_05.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/user/KidRock_05.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/user/KidRock_06.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/user/KidRock_06.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/user/KidRock_07.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/user/KidRock_07.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.yoursmileys.ru/tsmile/forum/t1203.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.yoursmileys.ru/tsmile/forum/t1203.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.yoursmileys.ru/tsmile/forum/t1205.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.yoursmileys.ru/tsmile/forum/t1205.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.mysmiles.ru/offtopic.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.mysmiles.ru/offtopic.gif" border="0" /></a></td>\
	</tr>\
</tbody></table></div>'
			faces = '<div id="buttonteg_facesRow"><table class="buttonteg_faceTable">\
<tr><th colspan="12" style="text-align:center;"><a href="javascript:switchLayer(\'buttonteg_facesRow\',\'block\');" class="closefaces">[X]</a>Аниме</th></tr>\
<tbody style="background:#000000 url(http://savepic.net/2806216.jpg) repeat ;">\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/112.GIF&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/112.GIF" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/144.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/144.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/11.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/11.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/113.GIF&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/113.GIF" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/141.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/141.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/4.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/4.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/13.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/13.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/22.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/22.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/55.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/55.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/82.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/82.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/146.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/146.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/40.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/40.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/157.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/157.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/173.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/173.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/169.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/169.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/201.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/201.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/064.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/064.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/125.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/125.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/9.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/9.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/150.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/150.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/119.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/119.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/83.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/83.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/65.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/65.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/88.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/88.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/140.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/140.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/133.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/133.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/26.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/26.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/54.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/54.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/14.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/14.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/154.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/154.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/129.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/129.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/115.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/115.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/84.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/84.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/95.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/95.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/124.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/124.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/68.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/68.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/106.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/106.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/195.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/195.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/3.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://smayly.ru/gallery/anime/EmoAnime/158.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://smayly.ru/gallery/anime/EmoAnime/158.gif" border="0" /></a></td>\
</tr>\
</tbody></table></div>'
			facez = '<div id="buttonteg_facezRow"><table class="buttonteg_faczTable">\
<tr><th colspan="12" style="text-align:center;"><a href="javascript:switchLayer(\'buttonteg_facezRow\',\'block\');" class="closefacez">[X]</a>Нинель-фэйсы</th></tr>\
<tbody style="background:#000000 url(http://savepic.net/2806216.jpg) repeat ;">\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1214959.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1214959.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1203695.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1203695.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1180118.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1180118.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1200581.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1200581.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2332008.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2332008.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1234414.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1234414.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1210862.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1210862.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1231342.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1231342.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2298198.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2298198.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1203692.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1203692.png" border="0" height=50 /></a></td>\
</tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2316649.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2316649.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1228270.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1228270.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1184220.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1184220.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2333015.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2333015.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2308458.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2308458.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2328936.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2328936.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2347368.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2347368.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2317675.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2317675.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1209838.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1209838.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2329765m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2329765m.png" border="0" height=30 /></a></td>\
</tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2347371.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2347371.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2320747.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2320747.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1212910.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1212910.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1199582.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1199582.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1232367.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1232367.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1196484.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1196484.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1205736.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1205736.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1234375.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1234375.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1202669.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1202669.png" border="0" height=50 /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2355561.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2355561.png" border="0" height=50 /></a></td>\
</tr>\
</tbody></table></div>'
			fases = '<div id="buttonteg_fasesRow"><table class="buttonteg_faseTable">\
<tr><th colspan="12" style="text-align:center;"><a href="javascript:switchLayer(\'buttonteg_fasesRow\',\'block\');" class="closefases">[X]</a>Фэйсы</th></tr>\
<tbody style="background:#000000 url(http://savepic.net/2806216.jpg) repeat ;">\
<tr>	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1081485m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1081485m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1178647.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1178647.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1231476m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1231476m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1560367m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1560367m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1515308m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1515308m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1171479.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1171479.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1174550m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1174550m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1121303m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1121303m.png" border="0" /></a></td>\
	</tr>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1557295m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1557295m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1512236m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1512236m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1567535m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1567535m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1568559m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1568559m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1566511m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1566511m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1092761m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1092761m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2385266m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2385266m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1086605m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1086605m.png" border="0" /></a></td>\
	</tr>\
<tr><th colspan="12" style="text-align:center;">FFFUUU</th></tr>\
	<br>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1173545m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1173545m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1165353m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1165353m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1532705m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1532705m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1538849m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1538849m.png" border="0" /></a></td>\
	</tr>\
<tr><th colspan="12" style="text-align:center;">Netural</th></tr>\
	<br>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1539873m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1539873m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1062016m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1062016m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1078434m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1078434m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1057925m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1057925m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1513250m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1513250m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1566501m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1566501m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1572645m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1572645m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1627432m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1627432m.png" border="0" /></a></td>\
<tr/>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1056901m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1056901m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1517347m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1517347m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1062021m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1062021m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1060997m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1060997m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1107076m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1107076m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1109124m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1109124m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2382206m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2382206m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2374014m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2374014m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1088640m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1088640m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1053829m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1053829m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1110148m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1110148m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1095833m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1095833m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1071274m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1071274m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1158185m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1158185m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1569573m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1569573m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1565477m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1565477m.png" border="0" /></a></td>\
<tr/>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1222258m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1222258m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1213042m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1213042m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1216114m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1216114m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1562403m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1562403m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1564451m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1564451m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1085568m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1085568m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1528611m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1528611m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1518371m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1518371m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1106052m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1106052m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1108100m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1108100m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1050757m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1050757m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1511203m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1511203m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1571618m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1571618m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1570594m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1570594m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1560354m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1560354m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1525538m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1525538m.png" border="0" /></a></td>\
</tr>\
<tr><th colspan="12" style="text-align:center;">Other faces</th></tr>\
	<br>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1091737m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1091737m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1624360m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1624360m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1559372m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1559372m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1560396m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1560396m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1107097m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1107097m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1112217m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1112217m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1622312m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1622312m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1628456m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1628456m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1111193m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1111193m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1097881m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1097881m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1104025m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1104025m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1550158m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1550158m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1551182m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1551182m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1562446m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1562446m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1087641m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1087641m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1528654m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1528654m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2393252.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2393252.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1215090m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1215090m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1533761m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1533761m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1539905m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1539905m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1152045m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1152045m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1138733m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1138733m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1139757m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1139757m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1568347m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1568347m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2398372m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2398372m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1094809m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1094809m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1051821m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1051821m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2376876m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2376876m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1546055m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1546055m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1169521m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1169521m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2375038m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2375038m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1133691m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1133691m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2420081m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2420081m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1084636m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1084636m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1241716m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1241716m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1554246m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1554246m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1555270m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1555270m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1220210m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1220210m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1553222m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1553222m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1526599m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1526599m.png" border="0" /></a></td>\
</tr>\
<tr><th colspan="12" style="text-align:center;">Фейсы 2.0</th></tr>\
	<br>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1090764m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1090764m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1092812m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1092812m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1060045m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1060045m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1059021m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1059021m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1097932m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1097932m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1070285.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1070285.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1086668m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1086668m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1050828m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1050828m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1101007m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1101007m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1099980m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1099980m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1057997m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1057997m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1056973m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1056973m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1142907m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1142907m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1134715m.jpg&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1134715m.jpg" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1125499m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1125499m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2360702m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2360702m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1051852m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1051852m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1152123m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1152123m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1284491m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1284491m.png" border="0" /></a></td>\
</tr>\
	<tr><th colspan="12" style="text-align:center;">Яо Минг</th></tr>\
	<br>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i056.radikal.ru/1112/c1/e9e86d7d1c09.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i056.radikal.ru/1112/c1/e9e86d7d1c09.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://s017.radikal.ru/i420/1112/f3/4b4ff1175bbd.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://s017.radikal.ru/i420/1112/f3/4b4ff1175bbd.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://s016.radikal.ru/i337/1112/cb/365222507e1c.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://s016.radikal.ru/i337/1112/cb/365222507e1c.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://s57.radikal.ru/i156/1112/f1/8eec118b33c1.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://s57.radikal.ru/i156/1112/f1/8eec118b33c1.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2363774m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2363774m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1147948m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1147948m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1148972m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1148972m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2383020m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2383020m.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2406988m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2406988m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1248648m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1248648m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.su/1107151m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.su/1107151m.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2413132m.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2413132m.png" border="0" /></a></td>\
</tr>\
        <tr><th colspan="12" style="text-align:center;">by Ross</th></tr>\
	<br>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2785484.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2785484.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2754764.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2754764.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2752716.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2752716.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2816207.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2816207.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2812111.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2812111.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2817231.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2817231.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2803919.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2803919.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2802895.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2802895.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2806991.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2806991.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2795727.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2795727.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2794703.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2794703.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2797775.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2797775.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2788559.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2788559.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2779343.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2779343.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2783439.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2783439.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2758863.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2758863.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2757839.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2757839.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2802894.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2802894.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2808014.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2808014.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2795726.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2795726.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2793678.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2793678.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2799822.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2799822.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2797774.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2797774.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2798798.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2798798.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2787534.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2787534.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2778318.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2778318.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2784462.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2784462.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2782414.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2782414.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2793665.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2793665.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2797761.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2797761.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2798785.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2798785.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2792641.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2792641.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2779329.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2779329.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2777281.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2777281.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2783425.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2783425.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2784449.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2784449.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2771137.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2771137.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2769089.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2769089.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2755777.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2755777.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2753729.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2753729.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2758849.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2758849.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2759873.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2759873.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2787520.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2787520.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2778304.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2778304.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2784448.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2784448.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2771136.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2771136.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2770112.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2770112.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2775232.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2775232.png" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2776256.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2776256.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2773184.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2773184.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2774208.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2774208.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2763968.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2763968.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2761920.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2761920.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2764992.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2764992.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2766016.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2766016.png" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.net/2752704.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.net/2752704.png" border="0" /></a></td>\
</tr>\
</tbody></table></div>'
			stalker = '<div id="buttonteg_stalkerRow"><table class="buttonteg_stalkeTable">\
<tr><th colspan="12" style="text-align:center;"><a href="javascript:switchLayer(\'buttonteg_stalkerRow\',\'block\');" class="closestalker">[X]</a>Смайлы для девушек</th></tr>\
<tbody style="background:#111111;">\
<tr>\<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/curtsey.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/curtsey.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile214.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile214.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile176.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile176.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile166.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile166.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_pinkglassesf.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_pinkglassesf.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_prepare_fish.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_prepare_fish.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_hide.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_hide.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile269.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile269.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile289.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile289.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile329.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile329.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/personal/brunette.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/personal/brunette.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile325.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile325.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/other/heart.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/other/heart.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/personal/snegurochka.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/personal/snegurochka.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/girl_hospital.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/girl_hospital.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/feminist.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/feminist.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/kiss2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/kiss2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/flirt.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/flirt.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/tender.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/tender.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile374.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile374.gif" border="0" /></a></td>\
</tr>\
<tr>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/parting2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/parting2.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile332.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile332.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/angel.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/angel.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/girl_wacko.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/girl_wacko.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://arcanumclub.ru/smiles/smile272.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://arcanumclub.ru/smiles/smile272.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_cray3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_cray3.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_impossible.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_impossible.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_dance.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_dance.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_devil.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_devil.gif" border="0" /></a></td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/he_and_she/girl_wink.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/he_and_she/girl_wink.gif" border="0" /></a></td>\
</tr>\
</tbody></table></div>'
tagbuttons = smiles+faces+facez+fases+stalker+'<div style="margin-top:5px;"><tr> \
<input type=button class="buttonteg" value="Смайлы" title="Открывает внутри страницы окно с выбором смайлов" id="s_link" onclick="switchLayer(\'buttonteg_smilesRow\',\'block\');"> \
<input type=button class="buttonteg" value="Смайлы для девушек" title="Открывает внутри страницы окно с выбором смайлов для девушек" id="s_link" onclick="switchLayer(\'buttonteg_stalkerRow\',\'block\');"> \
<input type=button class="buttonteg" value="Аниме" title="Открывает внутри страницы окно с выбором аниме" id="s_link" onclick="switchLayer(\'buttonteg_facesRow\',\'block\');"> \
<input type=button class="buttonteg" value="Нинель-Фейсы" title="Открывает внутри страницы окно с выбором нинель-фейсов" id="s_link" onclick="switchLayer(\'buttonteg_facezRow\',\'block\');"> \
<input type=button class="buttonteg" value="Фейсы" title="Открывает внутри страницы окно с выбором Фейсов" id="s_link" onclick="switchLayer(\'buttonteg_fasesRow\',\'block\');"> \
<input type=button class="buttonteg" value="Url" title="Создаёт гиппер-ссылку,при нажатии переводящую на другой адрес." onclick="__addTag(\'<a target=&quot;_blank&quot; href=&quot;\',\'&quot;>ссылка</a>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Img" title="Предназначен для отображения на веб-странице изображений в графическом формате." onclick="__addTag(\'<img src=&quot;\',\'&quot; border=&quot;0&quot; />\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="S" title="Устанавливает тег, зачеркнутый текст" onclick="__addTag(\'<S>\',\'</S>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="B" title="Устанавливает жирное начертание шрифта." onclick="__addTag(\'<b>\',\'</b>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="I" title="Устанавливает курсивное начертание шрифта."onclick="__addTag(\'<i>\',\'</i>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="U" title="Устанавливает подчеркнутый шрифт." onclick="__addTag(\'<u>\',\'</u>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="A" title="Устанавливает стиль элемента" onclick="__addTag(\'<a style=&quot;\',\'&quot;>Текст</a>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="BR" title="Устанавливает перевод строки в том месте, где этот тег находится." onclick="__addTag(\'<br />\',\'\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="hr" title="Рисует горизонтальную линию." onclick="__addTag(\'<hr />\',\' \', \''+getareaid+'\')"><br />\
	<div id="buttonteg_row2_show" style="display:inline;font-size:10px;"><a href="javascript:switchLayer(\'buttonteg_row2\',\'inline\')" onclick="javascript:switchLayer(\'buttonteg_row2_show\',\'inline\')" title="Показать ряд дополнительных html-тегов">Дополнительные тэги</a></div>\
	<div id="buttonteg_row2" style="display:none;">\
<input type=button class="buttonteg" value="ol" title="Устанавливает нумерованный список.Каждый элемент списка должен начинаться с тега <LI>." onclick="__addTag(\'<ol>\',\'</ol>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="ul" title="Устанавливает маркированный список. Каждый элемент списка должен начинаться с тега <LI>." onclick="__addTag(\'<ul>\',\'</ul>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="li" title="Определяет отдельный элемент списка. Внешний тег <UL> или <OL>." onclick="__addTag(\'<li>\',\'</li>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="sub" title="Отображает шрифт в виде нижнего индекса." onclick="__addTag(\'<sub>\',\'</sub>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="sup" title="Отображает шрифт в виде верхнего индекса." onclick="__addTag(\'<sup>\',\'</sup>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="©" title="Ставит знак копирайта, авторского права" onclick="__addTag(\'\',\'<sup>&copy;</sup>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="®" title="Помещает знак зарегистрированной торговой марки" onclick="__addTag(\'\',\'<sup>&reg;</sup>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="™" title="Устанавливает знак торговой марки" onclick="__addTag(\'\',\'<sup>TM</sup>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="quote" title="Тег цитирования." onclick="__addTag(\'[quote=name]\',\'[/quote]\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="code" title="Устанавливает кодовое начертание шрифта." onclick="__addTag(\'<code>\',\'</code>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Style" title="Вставляет тег, изменяющий цвет выделенного текста" onclick="__addTag(\'<a style=color:>\',\'</a>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Фон страници+цвет" title="Вставляет тег,изменяющий фон странции, на любой другой цвет указанный вами" onclick="__addTag(\'<div style=&quot;background-color:;&quot;>\',\'\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Фон страници+изображение" title="Вставляет тег, изменяющий фон странции, на любое другое изображение указанное вами" onclick="__addTag(\'<div style=&quot;background:url();&quot;>\',\'\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Шрифт" title="Вставляет тег, изменяющий тип шрифта" onclick="__addTag(\'<a style=&quot;Font-family:;&quot;>\',\'\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Шрифт+Размер" title="Вставляет тег, изменяющий тип шрифта и размер текста" onclick="__addTag(\'<a style=&quot;Font-family:; Font-size:&quot;>\',\'\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Размер" title="Вставляет тег, изменяющий размер текста" onclick="__addTag(\'<a style=&quot;Font-size:;&quot;>\',\'\', \''+getareaid+'\')"> \
     </div>\
</td> \
</tr></div> '
		}
	}

	function update(){
		var s=getElementsByClass('__ql',null,'a').length
		var t=getElementsByClass('profile_comment_body',null,'div').length
		var i=getElementsByClass('group_discussion_item1',null,'div').length

		if (!getareaid){generate_id();}
		if (tags_state==true){TagsGUI();}
		if ((t>0 && s!=t) || i!=0){parse_comments();}
	}

	function TagsGUI()
	{
		if (getareaid){
			console.log('test');
			var tagspace;
			var pollset_a = '<br /><a href="javascript:void(0);" onclick="javascript:switchLayer(\'entry_settings\',\'inline\')">Показать настройки конфиденциальности</a>'
			var target = document.getElementsByTagName('div')
			var newtopic = document.getElementsByTagName('td')
			if (getareaid==pollsid){
				document.getElementById('settings_show').innerHTML=tagbuttons+pollset_a
				tags_state=false
				update()
			}
			else if (getareaid==profid || getareaid==topicid){
				console.log('test1');
				for(i=0;i<target.length;i++){
					tagspace = target[i].innerHTML
					if (tagspace.split(' ')[0].toLowerCase()=='разрешенные' || tagspace.match(/^\n*\s*Разрешённые HTML/gi)) {
						target[i].innerHTML = tagbuttons
						tags_state=false
						update()
					}
				}
			}
			else if (getareaid!=topicid && getareaid!=profid){
				console.log('test2');
				for (i=0;i<newtopic.length;i++){
					if (newtopic[i].innerHTML.match(/Разрешённые HTML/gi)){
						newtopic[i].innerHTML = '<textarea name="topic_body" id="group_discussion_new" rows="5" cols="65" style="width:400px;"></textarea><br>'+tagbuttons
						tags_state=false
						update()
					}
				}
			}
		}
	}

	var __trigger= false
	function marker(v){
		var counter = 0
		var cn = '__flink';
		var f_link = document.getElementById('centerw2_body').getElementsByTagName('a');
		var is_group = getElementsByClass('group_discussion_item1',null,'div')

		for (var r=0;r<f_link.length;r++){
			if(counter==v.length){__trigger=true;continue;}
			var find = f_link[r].innerHTML;
			if ((find.match(/Написать пользователю\s*$/gi) || find.match(/Редактировать\s*$/gi)) && (!__trigger)){
				f_link[r].parentNode.className=cn
				counter=counter+1
			}
		}
	}

	function parse_comments(){
		var set_tag
		var get_authors_link
		var save_post
		var save_links
		var set_menu
		var profile
		var get_profile_link
		var menu_style
		var end_link
		var begin
		var rnd = 0
		var varb = 0
		var get_authors_nick
		var __nls = 'float: right; padding-left: 15px;'
		var get_authors = getElementsByClass('profile_comment_author',null,'div')
		var get_posts = getElementsByClass('profile_comment_body',null,'div')
		var get_links = getElementsByClass('profile_comment_links',null,'div')
		var is_group = getElementsByClass('group_discussion_item1',null,'div')
		var date = getElementsByClass('profile_comment_date',null,'div')
		if (getareaid!='undefined' && (get_authors.length!=0 && get_posts.length!=0) && (get_authors.length==get_posts.length && get_posts.length==get_links.length)){
			if (getElementsByClass('__ql',null,'a').length!=get_links.length){
				for (i=0;i<get_authors.length;i++){
					get_authors_link=get_authors[i].innerHTML.match(/\<b\>(.*?)\<\/b\>/gi)
					get_authors_nick='<b>[Пользователь удален]</b>'
					rnd=rnd+1
					set_tag=rnd
					menu_style='display:none;margin-top:21px;background-image:url(/uploads_admin/js/background.jpg);background-repeat: no-repeat;'
					set_menu='<div id="usernick_menu_'+set_tag+'" class="menu_dropdown" style="'+menu_style+'">'
					begin='<div class="menu_item_dropdown" onclick="switchLayer(\'usernick_menu_'+set_tag+'\',\'inline\');"><a href="'
					if (get_authors_link!='<b>[Пользователь удален]</b>' && get_authors_link!='<B>[Пользователь удален]</B>'){
						var _ = get_authors[i].getElementsByTagName('a')[0]
						get_profile_link=_.href
						_.href='javascript:switchLayer(\'usernick_menu_'+set_tag+'\',\'inline\');'
						_.title='Показать меню профиля'
						get_authors_nick=_.innerHTML.replace(/<\/?b>/gi,"")
					}
					save_post=get_posts[i].innerHTML.replace(/["']/g, '&quot;').replace(/&nbsp;/g,'')
					save_links=get_authors[i].innerHTML
					get_authors[i].innerHTML='<img src="/images/icons/menu_arrow.gif" onclick="switchLayer(\'usernick_menu_'+set_tag+'\',\'inline\');"/>'
					if (get_authors_link!='<b>[Пользователь удален]</b>' && get_authors_link!='<B>[Пользователь удален]</B>'){
						set_menu+=begin+'javascript:__addTag(\''+get_authors_link+', \',\'\', \''+getareaid+'\')" title="Вставить ник собеседника в форму ответа"><img src="/images/icons/back16.gif" /> Обратиться к сталкеру</a></div>'
						set_menu+=begin+'javascript:__addNickLink(\''+get_authors_nick+'\',\''+getareaid+'\');" title="Вставить ник cобеседника в виде ссылки"><img src="/uploads_admin/js/link_na_profile.gif" /> Ссылка на профиль</a></div>'
					}
					set_menu+=begin+'javascript:__addTag(\''+get_authors_link+' <b>сказал(а):</b><br /><q><i>'+save_post+'</i></q><br />---<br />\',\'\',\''+getareaid+'\')" class="__ql" title="Цитировать это сообщение"><img src="./images/icons/group_discussion_quote16.gif" border="0" /> Цитировать сообщение</a></div>'
					if (get_authors_link!='<b>[Пользователь удален]</b>' && get_authors_link!='<B>[Пользователь удален]</B>'){
						set_menu+=begin+get_profile_link+'" title="Перейти на личную страницу сталкера"><img src="/uploads_admin/js/sam_profile.gif" border="0" /> Профиль сталкера</a></div>'
					}
					end_link='<div class="menu_item_dropdown" style="cursor:pointer;" onclick="switchLayer(\'usernick_menu_'+set_tag+'\',\'inline\');"><a title="Закрыть меню"><img src="/uploads_admin/js/close.gif" border="0" /> Закрыть</a></div>'
					get_authors[i].innerHTML+=set_menu+end_link+'</div>'+save_links
				}
			}
		}
		else if (is_group.length!=0){
			if (getElementsByClass('__nl',null,'a').length!=is_group.length){
				var clearURL = new RegExp(/^http:\/\/[A-Za-z0-9\.-]{3,}\/group_discussion_view.php\?group_id\=[0-9]+\&grouptopic_id\=[0-9]+/gi);
				var get_post_links = getElementIdByRegExp(/post\_[0-9]+/gi,null,'a');
				var counter = 0
				marker(get_post_links)
				var get_l = getElementsByClass('__flink',null,'div');
				clearURL=clearURL.exec(window.location);
				clearURL=clearURL+'&grouppost_id=';
				for (i=0;i<is_group.length;i++){
					var g_link = is_group[i].getElementsByTagName('a');
					if (g_link.length!=0){
						get_authors_link=g_link[0];
						set_tag=get_authors_link.innerHTML;
						if (set_tag.match(/^\s*(.*?)\s*$/gi)){
							set_tag=set_tag.replace(/\s*/g,'');
							get_authors_link.href='javascript:__addTag(\'<b>'+set_tag+'</b>, \',\'\', \''+getareaid+'\')';
							get_authors_link.className='__nl';
							get_authors_link.title='Обратиться по нику';
						}
					}
					else{
						varb++;
						is_group[i].innerHTML+='<a class="__nl" name="__ok"></a>';
					}
					var clear_post_links=new RegExp(/[0-9]+/g).exec(get_post_links[i]);
					if (get_l.length==is_group.length){
						var construct_link = document.createElement('div');
						construct_link.setAttribute('style',__nls);
						construct_link.innerHTML='<a class="__flink" href="#" onclick="javascript:GetPostLink(\''+clearURL+clear_post_links+'#'+get_post_links[i]+'\');return false;" title="Скопировать ссылку на пост"><img src="/uploads_admin/js/post.gif" border="0" /> Пост</a>';
						get_l[i].parentNode.insertBefore(construct_link,get_l[i]);
					}
					else if (get_l.length!=0 && get_l.length<is_group.length){
						if (get_l[i] && get_l[i].id!='__marked'){
							var construct_link = document.createElement('div');
							clear_post_links=new RegExp(/[0-9]+/g).exec(get_post_links[varb]);
							construct_link.setAttribute('style',__nls);
							construct_link.innerHTML='<a class="__flink" href="#" onclick="javascript:GetPostLink(\''+clearURL+clear_post_links+'#'+get_post_links[varb]+'\');return false;" title="Скопировать ссылку на пост"><img src="/uploads_admin/js/post.gif" border="0" /> Пост</a>';
							get_l[i].parentNode.insertBefore(construct_link,get_l[i]);
							get_l[i].id='__marked';
						}
					}
					varb++;
				}
			}
		}
	}

	// KeyBinder; calls specific internal copies of struct-funcs from __overhead.js
	document.onkeydown=function(evt){
		evt = (evt) ? evt : ((event) ? event : null);
		if (getareaid){
			if (evt.altKey){
				if(evt.keyCode==66){addTag('<b>','</b>',getareaid);evt.preventDefault();return false;}
				else if (evt.keyCode==83) {sLayer('buttonteg_smilesRow','block');evt.preventDefault();return false;}
				else if (evt.keyCode==73) {addTag('<i>','</i>',getareaid);evt.preventDefault();return false;}
				else if (evt.keyCode==85) {addTag('<u>','</u>',getareaid);evt.preventDefault();return false;}
				else if (evt.keyCode==65) {addTag('<a>','</a>',getareaid);evt.preventDefault();return false;}
				else if (evt.keyCode==67) {addTag('<code>','</code>',getareaid);evt.preventDefault();return false;}
				else if (evt.keyCode==81) {Quote(getareaid);evt.preventDefault();return false;}
				else if (evt.keyCode==80) {addTag('<img src="','" border="0"; />',getareaid);evt.preventDefault();return false;}
				else if (evt.keyCode==76) {addTag('<a target="_blank"; href="','">ссылка</a>',getareaid);evt.preventDefault();return false;}
			}
		}
	}

	window.setTimeout(function(){window.setInterval(update,500);},2000)
	function stc(){
		var div = document.createElement('div')
		div.setAttribute('style','display:none;')
		div.setAttribute('class','__stc;')
		div.setAttribute('id','__tagspanelActive')
		document.body.appendChild(div)
	}
	stc()
}
