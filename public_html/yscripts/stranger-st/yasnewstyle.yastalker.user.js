// ==UserScript==
// @name yasminstyle
// @namespace *
// @include *yastalker.com*
// @version 1.0
// Tested on Mozilla Firefox 3.6.+;Opera 11.+;Google Chrome 9.0.+ 
if (window.location.hostname.match(/yastalker\.com/))
{
	var style = '\
div#center_div,div.content,div.group_discussion_row1, div.group_discussion_row2{opacity: 0.85;}\
\
#centerw_header,div.header,#center_header,#centerw2_header,div.copyright{background:#222;border:1px double #7A644B;border-bottom:0px;border-radius:10px 10px 0 0;-webkit-border-radius:10px 10px 0 0;-moz-border-radius:10px 10px 0 0;}\
#centerw_body,#center_body,div.portal_content, div.portal_login,div.network_content,#centerw2_body{background: #222;border-left:1px solid #7A644B;border-right:1px solid #7A644B;}\
#centerw_footer,#center_footer,#centerw2_footer,div.portal_footer{background: #222;border:1px solid #7A644B;border-top:0px;border-radius:0 0 10px 10px;-webkit-border-radius:0 0 10px 10px;-moz-border-radius: 0 0 10px 10px;}\
div.portal_footer{width:198px;}\
div.copyright{width:885px;}\
\
#topmenu_table,#topmenu_user{background:#222;border:1px solid #7A644B;border-radius:10px 10px 0 0;-webkit-border-radius:10px 10px 0 0;-moz-border-radius: 10px 10px 0 0;opacity: 0.85;}\
#topmenu_user{border-radius:0 0 10px 10px;-webkit-border-radius:0 0 10px 10px;-moz-border-radius: 0 0 10px 10px;border-top:none;z-index:2;}\
div.menu_item, div.menu_item_l,div.top_menu_link_container,div.top_menu_link_container_end,div.portal_whatsnew,div.home_whatsnew {border:0px;}\
div.menu_item, div.menu_item_l {border:0;padding:5px 9px;}\
div.menu_item_dropdown a {background:#222;border-left:3px solid #7A644B;}\
div.menu_item_dropdown a:hover {background:#7A644B;border-left:3px solid #222;}\
.classified_pages_top,.classified_pages_bottom {background:#191919;border:1px solid #7A644B;}\
\
div.profile_comment_author,div.profile_comment_date {background:none;border-top:0px;}\
div.profile_comment_date {font-size:8pt;color:#444;}\
div.profile_comment_body {border-radius:0 20px 20px 20px;-webkit-border-radius:0 20px 20px 20px;-moz-border-radius:0 20px 20px 20px;border:1px solid #7A644B;max-width:none;}\
td.profile_tab2 a,td.profile_tab2 a:hover {background-color:#222;}\
\
.profile,.profile_photo{background:none;border:1px solid #7A644B;margin-bottom:12px;border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;}\
div.profile_postcomment {border:0px;}\
.profile_content {border-radius:0 0 10px 10px;-webkit-border-radius:0 0 10px 10px;-moz-border-radius:0 0 10px 10px;}\
.profile_menu{border:0px;}\
#fav{background:none;border:1px solid #7A644B;border-radius:10px 10px 0 0;-webkit-border-radius:10px 10px 0 0;-moz-border-radius:10px 10px 0 0;}\
.profile_menu1 a, div.nolink,.profile_menu1 a:hover {background-image:none;border:1px solid #7A644B;background-color:#222;}\
.profile_menu1 a:hover{background-color:#7A644B;}\
\
i{color:#444;font-family:comic Sans MS;}\
img.photo{border:1px solid #7A644B;}\
\
table.messages_table {border:1px solid #7A644B;}\
td.messages_header,tr.messages_read { background:#222;}\
tr.messages_unread { background:#191919;}\
\
div.polls_browse_item,div.blogs_browse_item,.seClassList2,div.music_browse_item,div.albums_browse_item,.gr_prev,div.browse_friends_result,div.profile_friend_photo,div.album_item,div.profile_blogentry,div.profile_event_main,div.profile_classified{border:1px solid #7A644B;margin-bottom:3px;border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;background:#191919;}\
\
#comment_body,#group_discussion_reply{border-radius:0 10px 10px 10px;-webkit-border-radius:0 10px 10px 10px;-moz-border-radius: 0 10px 10px 10px;}\
input.text:active,input.text:focus,input.text_small:active,input.text_small:focus,textarea:active,textarea:focus,select:active,select:focus,select.small:active,select.small:focus {background:#191919;border:1px solid #FFBE35;}\
textarea,select,select.small,input.text, input.text_small{background-color: #222;border:1px solid #7A644B;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;}\
input.button {background-color:#191919;border:1px solid #7A644B;color:#7A644B;}\
table.group_discussion_table, div.group_discussion_table {border:0px;width:875px;}\
div.group_discussion_row2,div.group_discussion_row1 {background:#191919;border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;border:1px solid #7A644B;margin:2px;}\
.group_tab2 a,td.profile_tab2 a,td.profile_tab2 a:hover {background:#222;border-bottom:1px solid #222;\
.text{height:150px;width:600px;\
}'
	var newSS;
	newSS = window.document.createElement('link');
	newSS.rel='stylesheet';
	newSS.href='data:text/css,' + escape(style);
	
var titleOfHref = "v1.0"; 

	window.document.getElementsByTagName("head")[0].appendChild(newSS);
if (window.location.href.match(/yastalker\.com/))
{
   var lastMenuItem = document.getElementsByClassName('menu_item_l')[0];
   lastMenuItem.className = "menu_item";
   var favMenuItem = document.createElement("DIV");
   favMenuItem.className = "menu_item_l";
   var topMenuUser = document.getElementById("topmenu_user");
   topMenuUser.insertBefore(favMenuItem, lastMenuItem.nextElementSibling);

   var favInnerDiv = document.createElement("DIV");
   favMenuItem.appendChild(favInnerDiv);
   favInnerDiv.style.cssFloat = "left";
   favInnerDiv.style.background = "none";

   var favMenuDropDown = document.createElement("DIV");
   favMenuDropDownEmptyDiv.appendChild(favMenuDropDown);
   favMenuDropDown.id = "menu_dropdown_favItem";
   favMenuDropDown.className = "menu_dropdown";
   favMenuDropDown.style.display = "none";
   favMenuDropDown.style.width = dropDownWidth;
   favMenuDropDown.style.whiteSpace = "normal";

   var favMenuDropDownDiv = document.createElement("DIV");
   favMenuDropDown.appendChild(favMenuDropDownDiv);
 
   redrawAll();
}
}
