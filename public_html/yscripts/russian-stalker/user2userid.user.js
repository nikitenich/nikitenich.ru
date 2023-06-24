// ==UserScript==
// @name           user2userid
// @namespace      *
// @include        *yastalker.com*
// ==/UserScript==

if (window.location.href.match(/yastalker\.com/))
{
	var s = document.createElement("script");
	s.innerHTML = 
	"\
	if (window.history && history.replaceState && window.SocialEngine && SocialEngine.Owner && SocialEngine.Owner.user_info.user_id)\
	{\
		history.replaceState({}, document.title, location.href.replace(/user=[^&]*/gi, function () { return 'user_id='+SocialEngine.Owner.user_info.user_id; }));\
	}\
	";
	document.body.appendChild(s);
}
