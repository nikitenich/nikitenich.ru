// ==UserScript==
// @name reverseComments
// @namespace *
// @include *yastalker.com*
// @version 1.2

if (window.location.href.match(/yastalker\.com/))
{
   var s = document.createElement("SCRIPT");
   s.innerHTML = 'for (a in SocialEngine) { if (a.match(/.*Comments/gi)){\n\
   var t = SocialEngine[a].updateComments.toString().replace(/^function.*?{/,"").replace(/}$/,"");\n\
   t = t.replace(/k.each/, function(a){return "k.each = function (c,b){var e = new Array(); for(var a in this){if(this.hasOwnProperty(a) && !isNaN(a)) {e.push(a);}} for(var i = e.length-1; i>=0; i--){a=e[i]; c.call(b,this[a],a,this)}};"+a;});\n\
   SocialEngine[a].updateComments = new Function("b", t);\n\
   SocialEngine[a].getComments();}}';
   document.body.appendChild(s);
}
