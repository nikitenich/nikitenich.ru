// ==UserScript==
// @name           htmltagbuttons
// @namespace      *
// @include        *yastalker*
// ==/UserScript==

// made by Edgar "Orion" Obolensky
// styles coded by Andrey "Stranger-Stalker" Jhuk
// edited by Dimitri "Merit" Topsecret (new smiles, adapted under Mozilla FF)

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
background-color:#bbbbbb;\
border:#000000 double 2px;\
font-family:Tahoma;\
font-size:11px;\
width:32px;\
color:#000000;\
}\
#buttonteg_smilesRow {\
display:none;\
}\
.closesmiles {\
float:left;\
}\
.buttonteg_smileTable {\
width:92px;\
border: 2px solid #000000;\
background: url(http://office-chair-fabric.com/ru/productpic/pb_2wm11293946650.jpg);\
position:relative;\
z-index:2;\
}\
.smilesRow a {\
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
<tr><th colspan="12" style="text-align:center;"><a href="javascript:switchLayer(\'buttonteg_smilesRow\',\'block\');" class="closesmiles">x</a>Смайлы</th></tr>\
<tbody style="background:#444444;">\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/smile3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/smile3.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/sad.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/sad.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/wink3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/wink3.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/dntknw.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/dntknw.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://onpic.ru/uploads/g383618yt.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://onpic.ru/uploads/g383618yt.png" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/dirol.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/dirol.gif " border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/facepalm.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/facepalm.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/blush2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/blush2.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/personal/patsak.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/personal/patsak.gif" border="0" /></" + "a></" + "td>\
		<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/cray.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/cray.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/secret.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/secret.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/clapping.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/clapping.gif" border="0" /></" + "a></" + "td>\
</tr>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/no2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/no2.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/swoon.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/swoon.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/crazy.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/crazy.gif" border="0" /></" + "a></" + "td>\
		<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/slow.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/slow.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://savepic.org/2194754.png&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://savepic.org/2194754.png" border="0" /></" + "a></" + "td>\
		<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/prankster.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/prankster.gif " border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/gamer3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/gamer3.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/wacko2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/wacko2.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/drinks.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/drinks.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/thank_you.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/thank_you.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/yes2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/yes2.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/meeting.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/meeting.gif" border="0" /></" + "a></" + "td>\
</tr>\
<tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/rofl.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/rofl.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/pardon.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/pardon.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/yahoo.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/yahoo.gif" border="0" /></" + "a></" + "td>\
		<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/scratch_one-s_head.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/scratch_one-s_head.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/blum3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/blum3.gif" border="0" /></" + "a></" + "td>\
		<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/good.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/good.gif " border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/boredom.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/boredom.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/fool.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/fool.gif" border="0" /></" + "a></" + "td>\
	<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/good2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/good2.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/hi.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/hi.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/negative.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/negative.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/ireful3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/ireful3.gif" border="0" /></" + "a></" + "td>\
</tr>\
      <tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://s001.radikal.ru/i196/1001/37/98c58c7f6226.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://s001.radikal.ru/i196/1001/37/98c58c7f6226.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/russian_roulette.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/russian_roulette.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/popcorm1.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/popcorm1.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/dash3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/dash3.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/rtfm.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/rtfm.gif" border="0" /></" + "a></" + "td>\
            <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/lazy2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/lazy2.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/to_pick_ones_nose3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/to_pick_ones_nose3.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/snooks.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/snooks.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/comando.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/comando.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/acute.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/acute.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/nea.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/nea.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/read.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/read.gif" border="0" /></" + "a></" + "td>\
</tr>\
      <tr><td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/russian.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/russian.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/stop.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/stop.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/dance3.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/dance3.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/punish2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/punish2.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/declare.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/declare.gif" border="0" /></" + "a></" + "td>\
            <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/mosking.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/mosking.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/crazy_pilot.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/crazy_pilot.gif" border="0" /></" + "a></" + "td>\
      <td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/laugh2.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/laugh2.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/preved.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/preved.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/standart/yes4.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/standart/yes4.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://www.kolobok.us/smiles/madhouse/sarcastic_hand.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://www.kolobok.us/smiles/madhouse/sarcastic_hand.gif" border="0" /></" + "a></" + "td>\
<td class="smilesRow"><a href="javascript:__addSmile(\'<img src=&quot;http://i.smiles2k.net/aiwan_smiles/flood.gif&quot; border=&quot;0&quot; />\',\''+getareaid+'\');"><img src="http://i.smiles2k.net/aiwan_smiles/flood.gif" border="0" /></" + "a></" + "td>\
</tr>\
</tbody></table></div>'
			tagbuttons = smiles+'<div style="margin-top:5px;"><tr> \
<td> \
<input type=button class="buttonteg" value=":D" title="Открывает внутри страницы окно с выбором смайлов" id="s_link" onclick="switchLayer(\'buttonteg_smilesRow\',\'block\');"> \
<input type=button class="buttonteg" value="B" title="Устанавливает жирное начертание шрифта." onclick="__addTag(\'<b>\',\'</b>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="I" title="Устанавливает курсивное начертание шрифта."onclick="__addTag(\'<i>\',\'</i>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="U" title="Устанавливает подчеркнутый шрифт." onclick="__addTag(\'<u>\',\'</u>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="A" title="Устанавливает подсвечивание строки при наведении" onclick="__addTag(\'<A>\',\'</A>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="BR" title="Устанавливает перевод строки в том месте, где этот тег находится." onclick="__addTag(\'<br />\',\'\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Url" title="Создаёт гиппер-ссылку,при нажатии переводящую на другой адрес." onclick="__addTag(\'<a target=&quot;_blank&quot; href=&quot;\',\'&quot;>ссылка</a>\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="Img" title="Предназначен для отображения на веб-странице изображений в графическом формате." onclick="__addTag(\'<img src=&quot;\',\'&quot; border=&quot;0&quot; />\', \''+getareaid+'\')"> \
<input type=button class="buttonteg" value="code" title="Предназначен для отображения одной или нескольких строк текста, который представляет собой программный код." onclick="__addTag(\'<code>\',\'</code>\', \''+getareaid+'\')"> \
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
<input type=button class="buttonteg" value="quote" title="Создает выделеную цитату чужого сообщения" style="width:40px;" onclick="'+quote+'"> \
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
