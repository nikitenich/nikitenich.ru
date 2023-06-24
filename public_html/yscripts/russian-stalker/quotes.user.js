// ==UserScript==
// @name           quotes
// @namespace      *
// @include        *yastalker.com*
// ==/UserScript==

/*
Copyleft (ↄ) 2010 russian-stalker
All Wrongs Reserved
*/

//Создаем скрипт
var sc=document.createElement("SCRIPT");
//Добавляем в него код, который будет виден извне
//Это функции добавления текста в textArea, добавление цитаты и добавления ника для групп и остальных разделов
sc.innerHTML='function addText(comment_body, text){\
var txtarea = document.getElementById(\'comment_body\');\
txtarea.focus();\
txtarea.value = txtarea.value.substring(0,txtarea.selectionStart)+text+txtarea.value.substring(txtarea.selectionEnd,txtarea.value.length);\
}\
function addQuoteComment(author, text){\
addText("comment_body","<code src=\\"quote\\">"+author+" писал(а): \\n\\n"+text+"\\n</code>\\n");\
}\
function addNickComment(author){\
addText("comment_body","<b>"+author+"</b>");\
}\
function addNickGroupComment(author){\
addText("group_discussion_reply","<b>"+author+"</b>");\
}';
//Прикрепляем в самый верх, чтобы не потерять.
document.getElementsByTagName("HEAD")[0].appendChild(sc);

//Эта ф-ия будет постоянно обновлятся
function update(){
var authors=document.getElementsByClassName("profile_comment_author");//Получаем всех авторов
var bodyes=document.getElementsByClassName("profile_comment_body");//сообщения
var links=document.getElementsByClassName("profile_comment_links");//ссылки
var tc=document.getElementsByClassName("tc")[0]; //Получаем общее количество сообщений
if ((tc) && (authors.length==bodyes.length) && (bodyes.length==links.length) && (document.getElementsByClassName("quote_linker").length!=links.length)){//Тут все понятно
for (i=0;i<authors.length;i++)
 {
  authors[i].innerHTML.match(/<b>(.*)<\/b>/gi);//Ищем слово между тегов b, это и есть наш ник
  var author=RegExp.$1;//Записываем его в переменную
  var body=bodyes[i].innerHTML;
  var codes = bodyes[i].getElementsByTagName("CODE");

  for (j=0;j<codes.length;j++)
  {
    if (codes[j].src == "quote")
    {
      codes[j].style.margin = "10px";
      codes[j].style.border = "1px dashed #333";
      codes[j].style.background = "black";
      codes[j].style.padding = "10px";
      codes[j].style.display = "block";
    };
  }
  var mdiv=sc=document.createElement("DIV");//Создаем DIV для цитирования
  mdiv.style.textAlign="right";
  mdiv.style.paddingRight="7px";

  mdiv.innerHTML='<a class="quote_linker" href="javascript:addQuoteComment(\''+encodeURI(author)+'\',\''+encodeURI(body)+'\')">цитировать</a>';
  links[i].parentNode.insertBefore(mdiv,links[i]);
  if (authors[i].getElementsByTagName('A').length==0)
   continue;
  var h=authors[i].getElementsByTagName('A')[0];//Ищем автора
  h.href="javascript:addNickComment('"+author+"')"; //И переназначаем его нажатие на ссылку
 }
} else if (document.getElementsByClassName("group_discussion_item1").length!=0){//тоже самое, но для групп
 items=document.getElementsByClassName("group_discussion_item1");
 for (i=0;i<items.length;i++) 
 {
  if (items[i].getElementsByTagName('A').length==0)
   continue;
  var h=items[i].getElementsByTagName('A')[0];
  h.innerHTML.match(/^\s*(.*)\s*$/gi);//Выделяем ник из незначущихся пробелов
  var author=RegExp.$1;//Записываем его
  h.href="javascript:addNickGroupComment('"+author+"')";
 }
}
 setTimeout(update,500);//Обновляем нашу ф-ию раз в 500 мс. Если скрипт тормозит - увеличьте время.
}

update();//запускаем
