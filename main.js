(()=>{"use strict";window.onload=function(){!function(){var e=document.createElement("input");e.type="text";var n=document.createElement("button");n.innerText="Отправить";var t=document.createElement("div");n.addEventListener("click",(function(){var n=e.value;t.innerText="Вы ввели: ".concat(n),e.value=""})),e.addEventListener("keypress",(function(e){"Enter"===e.key&&n.click()})),document.body.appendChild(e),document.body.appendChild(n),document.body.appendChild(t)}()}})();