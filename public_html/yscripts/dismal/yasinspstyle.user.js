// ==UserScript==
// @name yasinspstyle
// @namespace *
// @include *yastalker.com*
// @version 1.0 
if (window.location.hostname.match(/yastalker\.com/))
{
//Сюда можно вставить ссылку на изображение, которое будет использовано в качестве фона
var background = 'http://dismal.96.lt/yas/styles/images/bg7.jpg';
//Путь к .css файлу, стиль будет автоматически обновляться при обновлении файла на сервере
var style = '@import "http://dismal.96.lt/yas/styles/inspiratum_css.css"; body {background: url("'+background+'") fixed;background-size: cover;}';
var newSS;
newSS = window.document.createElement('link');
newSS.rel='stylesheet';
newSS.href='data:text/css,'+escape(style);

window.document.getElementsByTagName("head")[0].appendChild(newSS);
}