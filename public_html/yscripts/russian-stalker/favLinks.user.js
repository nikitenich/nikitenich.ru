// ==UserScript==
// @name favLinks
// @namespace *
// @include *
// @version 1.0

/*
Copyleft (ↄ) 2010 russian-stalker
All Wrongs Reserved
*/

/*
TO-DO:
Empty
*/

var pathToFavImage = "./images/icons/settings16.gif"; //Путь до иконки в главном меню
var pathToDeleteImage = "./images/icons/action_delete2.gif"; //Путь до иконки удаления комментария
var pathToDownImage = "./images/icons/plus16.gif";//Путь до стрелочки вверх
var pathToUpImage = "./images/icons/minus16.gif";//Путь до стрелочки вниз
var titleOfFav = ""; //Заголовок в главном меню
var dropDownWidth = "300px"; //Ширина пункта меню

//Helpers
//Storage API
function addItem(title, link)//Добавить пункт в локальное хранилище
{
   localStorage["FavLinksCount"] = localStorage["FavLinksCount"]==null?1:parseInt(localStorage["FavLinksCount"])+1;
   localStorage["FavLinkTitle"+localStorage["FavLinksCount"]] = title;
   localStorage["FavLinkLink"+localStorage["FavLinksCount"]] = link;
   redrawAll();
}

function deleteItemById(id)//Удалить пункт из локального хранилища
{
   for (i=parseInt(id);i<parseInt(localStorage["FavLinksCount"]);i++)
   {
      localStorage["FavLinkTitle"+parseInt(i)] = localStorage["FavLinkTitle"+parseInt(i+1)];
      localStorage["FavLinkLink"+parseInt(i)] = localStorage["FavLinkLink"+parseInt(i+1)];
   }
   localStorage.removeItem("FavLinkTitle"+localStorage["FavLinksCount"]);
   localStorage.removeItem("FavLinkLink"+localStorage["FavLinksCount"]);
   localStorage["FavLinksCount"]--;
   redrawAll();
}

//Функции-помощники
function titleByTemplate(href) //Получить название по ссылке
{
if (href.match(/yastalker\.com\/classified\.php/))

   {
      return "Объявление: "+document.getElementsByTagName('h4')[0].innerHTML;
   }
   
if (href.match(/yastalker\.com\/poll\.php/))

   {
      return "Опрос: "+document.getElementsByTagName('h4')[0].innerHTML;
   }
   
if (href.match(/yastalker\.com\/blog\.php/))

   {
      return "Блог: "+document.getElementsByClassName('seBlogEntry')[0].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].innerHTML;
   }
   
if (href.match(/yastalker\.com\/album\.php/))

   {
      document.title.match(/\-\s(.*)/g);
      return RegExp.$1;
   }
   
if (href.match(/yastalker\.com\/album_file\.php/))

   {
      document.title.match(/\-\s(.*)/g);
      return RegExp.$1;
   }
   
if (href.match(/yastalker\.com\/profile\.php/))

   {
      return "Профиль: "+document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML;
   }
   
if (href.match(/yastalker\.com\/group\.php/))

   {
      return "Группа: "+document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML;
   }
   
if (href.match(/yastalker\.com\/group_discussion_view\.php/))

   {
      return "Обсуждение: "+document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML.replace(/<.*">|<\/.*>|\n/g,"")
   }
   
if (href.match(/yastalker\.com\/browse_groups\.php/))

   {
      return document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML.replace(/<.*">|<\/.*>|\n/g,"")
   }
   
if (href.match(/yastalker\.com\/browse_classifieds\.php/))

   {
      return document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML.replace(/<.*">|<\/.*>|\n/g,"")
   }
   
if (href.match(/yastalker\.com\/browse_polls\.php/))

   {
      return "Просмотр опросов";
   }
   
if (href.match(/yastalker\.com\/browse_blogs\.php/))

   {
      return "Просмотр блогов";
   }
   
if (href.match(/yastalker\.com\/browse_music\.php/))

   {
      return "Просмотр музыки";
   }
   
if (href.match(/yastalker\.com\/browse_albums\.php/))

   {
      return "Просмотр фотоальбомов";
   }
   
if (href.match(/yastalker\.com\/browse_events\.php/))

   {
      return document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML.replace(/<.*">|<\/.*>|\n/g,"")
   }
   
if (href.match(/yastalker\.com\/home\.php/))

   {
      return "Главная страница";
   }
   
if (href.match(/yastalker\.com\/user_home\.php/))

   {
      return "Домашняя страница";
   }
   
if (href.match(/yastalker\.com\/user_messages\.php/))

   {
      return "Входящие сообщения";
   }
   
if (href.match(/yastalker\.com\/user_messages_outbox\.php/))

   {
      return "Отправленные сообщения";
   }
   
if (href.match(/yastalker\.com\/user_messages_view\.php/))

   {
      return "Личные сообщения: "+document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML;
   }
   
if (href.match(/yastalker\.com\/event\.php/))

   {
      return "Событие: "+document.getElementById('centerw2_body').getElementsByTagName('h3')[0].innerHTML;
   }
   return document.title;
}

function addCurrentPage() //Добавить текущую страницу в избранное
{
   addItem(titleByTemplate(document.location.href), document.location.href);  
}

function generateManagerText(TBDiv)
{
   TBDiv.innerHTML = "<br>";
   TBDiv.style.height = "400px";
   TBDiv.style.width = "450px";
   TBDiv.style.overflowY = "auto";
   TBDiv.style.backgroundColor = "#241E17";
   TBDiv.style.backgroundImage = "url(../images/back1.jpg)";
   TBDiv.style.paddingLeft = "10px";
   TBDiv.style.paddingRight = "10px";
   if ((localStorage["FavLinksCount"]==null) || (parseInt(localStorage["FavLinksCount"])==0))
   {
      var elmDiv = document.createElement('DIV');
      TBDiv.appendChild(elmDiv);
      elmDiv.innerHTML = "Пусто";
      elmDiv.style.paddingBottom = "10px";
      return;
   } else {
      for (i = 1; i<=localStorage["FavLinksCount"]; i++)
      {
         var elmDiv = document.createElement('DIV');
         TBDiv.appendChild(elmDiv);
         elmDiv.innerHTML = i+'.<br>Название: <input type="text" class="text" id="FavLinkEditTitle'+i+'" size="70"><br>';
         elmDiv.innerHTML += 'Ссылка: <input type="text" class="text" id="FavLinkEditLink'+i+'" size="70"><br>';
         if (i<localStorage["FavLinksCount"])
         {
            elmDiv.innerHTML += 'Опустить пункт вниз: <img id="FavItemDownInManager'+i+'" src="'+pathToDownImage+'"><br>';
         }
         if (i>1)
         {
            elmDiv.innerHTML += 'Поднять пункт вверх: <img id="FavItemUpInManager'+i+'" src="'+pathToUpImage+'">';
         }
         elmDiv.innerHTML += '<hr>';
         elmDiv.getElementsByTagName('input')[0].value = localStorage["FavLinkTitle"+i];
         elmDiv.getElementsByTagName('input')[1].value = localStorage["FavLinkLink"+i];
      }
   }
   i = 1;
   while(i<=localStorage["FavLinksCount"])
   {
         if (i<localStorage["FavLinksCount"])
         {
            document.getElementById("FavItemDownInManager"+i).addEventListener("click",function() { 
               var i = parseInt(this.id.replace(/FavItemDownInManager/,""));
               var tempTitle = document.getElementById('FavLinkEditTitle'+i).value;
               var tempLink = document.getElementById('FavLinkEditLink'+i).value; 
               document.getElementById('FavLinkEditTitle'+i).value = document.getElementById('FavLinkEditTitle'+parseInt(i+1)).value; 
               document.getElementById('FavLinkEditLink'+i).value = document.getElementById('FavLinkEditLink'+parseInt(i+1)).value; 
               document.getElementById('FavLinkEditTitle'+parseInt(i+1)).value = tempTitle; 
               document.getElementById('FavLinkEditLink'+parseInt(i+1)).value = tempLink; 
            },false); 
         }
         if (i>1)
         {
            document.getElementById("FavItemUpInManager"+i).addEventListener("click",function() { 
               var i = parseInt(this.id.replace(/FavItemUpInManager/,""));
               var tempTitle = document.getElementById('FavLinkEditTitle'+i).value;
               var tempLink = document.getElementById('FavLinkEditLink'+i).value; 
               document.getElementById('FavLinkEditTitle'+i).value = document.getElementById('FavLinkEditTitle'+parseInt(i-1)).value; 
               document.getElementById('FavLinkEditLink'+i).value = document.getElementById('FavLinkEditLink'+parseInt(i-1)).value; 
               document.getElementById('FavLinkEditTitle'+parseInt(i-1)).value = tempTitle; 
               document.getElementById('FavLinkEditLink'+parseInt(i-1)).value = tempLink; 
            },false); 
         }
         i++;
   }
   var elmInput = document.createElement('INPUT');
   elmInput.type = "button";
   elmInput.className ="button";
   elmInput.style.marginBottom = "10px";
   elmInput.value = "Сохранить";
   elmInput.addEventListener("click",function() {
   i = 1;
   while(i<=localStorage["FavLinksCount"])
   {
      localStorage["FavLinkTitle"+i] = document.getElementById('FavLinkEditTitle'+i).value;
      localStorage["FavLinkLink"+i] = document.getElementById('FavLinkEditLink'+i).value; 
      i++;
   } 
   var s = document.createElement('SCRIPT');
   s.innerHTML = "TB_remove();";
   document.body.appendChild(s);
   redrawAll();  
   },false); 
   TBDiv.appendChild(elmInput);
}

function startManager()
{
   var s = document.createElement('SCRIPT');
   s.innerHTML = "TB_show('Менеджер закладок', 'about:blank?TB_iframe=false&height=400&width=450', '', './images/trans.gif');\
   document.getElementById('TB_window').getElementsByTagName('IFRAME')[0].destroy();\
   document.getElementById('TB_window').style.opacity = '1';";
   document.body.appendChild(s);
   var TBDiv = document.createElement('DIV');
   document.getElementById('TB_window').appendChild(TBDiv);
   generateManagerText(TBDiv);
}

function clearItems() //Отчистить пункты
{
   document.getElementById("menu_dropdown_favItem").getElementsByTagName("DIV")[0].innerHTML = "";
}

function redrawItems() //Перерисовать все пункты
{
   if ((localStorage["FavLinksCount"]==null) || (parseInt(localStorage["FavLinksCount"])==0))
   {
      drawItem("Пусто");
   } else {
      for (i = 1; i<=localStorage["FavLinksCount"]; i++)
      {
         drawItem(localStorage["FavLinkTitle"+i], localStorage["FavLinkLink"+i], i); 
      }
   }
   var hrItem = drawItem("<hr>",null,null,false);
}

function drawItem(title, link, id, isLink, onClick) //Нарисовать пункт
{
   id = id==null?0:id;
   isLink = isLink==null?true:isLink;
   onClick = onClick==null?"":onClick;
   var ddItem = document.createElement("DIV");
   ddItem.className = "menu_item_dropdown";
   var parentDiv = document.getElementById("menu_dropdown_favItem").getElementsByTagName("DIV")[0];
   parentDiv.appendChild(ddItem);
   ddItem.innerHTML = '<'+(isLink?'a'+(link==null?'':' href = '+link):'span')+' onclick="return false;" style="cursor:default;color: #888; display: block; padding-left: 0px;" onmouseover="this.getElementsByTagName(\'SPAN\')[0].style.backgroundColor = \'#3e3e3e\'; this.style.color = \'#AE9D88\'; this.style.backgroundColor = \'#3e3e3e\'" onmouseout="this.getElementsByTagName(\'SPAN\')[0].style.backgroundColor = \'#222\'; this.style.color = \'#888\'; this.style.backgroundColor = \'#222\'"><span '+(isLink?'style = "padding-left: 10px; padding-right: 10px; cursor: pointer;"':'')+' onclick = "'+onClick+(link==null?'':' window.location = \''+link+'\';')+'" class="menu_item">'+title+'</span></'+(isLink?'a':'span')+'>';
   if (id!=0)
   {
      var deleteItem = document.createElement("SPAN");
      deleteItem.className = "menu_item";
      deleteItem.innerHTML = '<img class="menu_icon2" src="'+pathToDeleteImage+'" style = "cursor: pointer;" width="10" height="16" alt = "">';
      deleteItem.addEventListener("click",function() {deleteItemById(id)},false); 
      ddItem.getElementsByTagName('a')[0].appendChild(deleteItem);
   }
   return ddItem;
}

function redrawAll() //Перерисовать все
{
   clearItems();
   redrawItems();
   var addFavItem = drawItem("Добавить в закладки текущую страницу");
   addFavItem.addEventListener("click",function() {addCurrentPage();},false);  
   var managerFavItems = drawItem("Менеджер закладок");
   managerFavItems.addEventListener("click",function() {startManager();},false);  
};

if (window.location.href.match(/yastalker\.com/) && document.getElementById("menu_dropdown_favItem") == null)
{
   //Ищем последний пункт в меню и делаем наш пункт последним
   var lastMenuItem = document.getElementsByClassName('menu_item_l')[0];
   lastMenuItem.className = "menu_item";
   var favMenuItem = document.createElement("DIV");
   favMenuItem.className = "menu_item_l";
   var topMenuUser = document.getElementById("topmenu_user");
   topMenuUser.insertBefore(favMenuItem, lastMenuItem.nextElementSibling);

   //Добавляем внутренний див
   var favInnerDiv = document.createElement("DIV");
   favMenuItem.appendChild(favInnerDiv);
   favInnerDiv.style.cssFloat = "left";
   favInnerDiv.style.background = "none";

   //Делаем ссылку-пустышку в меню
   var favMainLink = document.createElement("A");
   favInnerDiv.appendChild(favMainLink);
   favMainLink.className = "menu_item";
   favMainLink.innerHTML = "<img src='"+pathToFavImage+"' width='16' height='16' class='menu_icon' alt = ''>"+titleOfFav;

   favInnerDiv.innerHTML += '<img src="./images/icons/menu_arrow.gif" width="12" height="13" style="vertical-align: middle; cursor: pointer;" onmouseover="showMenu(\'menu_dropdown_favItem\');" alt="">';
   
   //Делаем контейнер для выпадающего вниз меню
   var favMenuDropDownEmptyDiv = document.createElement("DIV");
   favInnerDiv.appendChild(favMenuDropDownEmptyDiv);
   
   //Делаем выпадающее вниз меню
   var favMenuDropDown = document.createElement("DIV");
   favMenuDropDownEmptyDiv.appendChild(favMenuDropDown);
   favMenuDropDown.id = "menu_dropdown_favItem";
   favMenuDropDown.className = "menu_dropdown";
   favMenuDropDown.style.display = "none";
   favMenuDropDown.style.width = dropDownWidth;
   favMenuDropDown.style.whiteSpace = "normal";

   //Делаем контейнер для пунктов
   var favMenuDropDownDiv = document.createElement("DIV");
   favMenuDropDown.appendChild(favMenuDropDownDiv);

   //Рисуем
   redrawAll();
}
