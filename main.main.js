(()=>{"use strict";let e,t=null,n=20,l=500;const d=(t,n)=>{e[t][n]=!e[t][n];const l=document.getElementById("mainBoxId");l.innerHTML="",e.forEach(((e,t)=>{const n=document.createElement("div");n.className="grid-row",e.forEach(((e,l)=>{const a=document.createElement("div");a.className="grid-cell "+(e?"alive":"dead"),a.addEventListener("click",(()=>d(t,l))),n.appendChild(a)})),l.appendChild(n)}))},a=(t,n)=>{let l=0;return[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach((d=>{let[a,r]=d;const c=t+a,o=n+r;c>=0&&c<e.length&&o>=0&&o<e[c].length&&(l+=e[c][o]?1:0)})),l},r=()=>{const t=e.map((e=>[...e]));for(let n=0;n<e.length;n+=1)for(let l=0;l<e[n].length;l+=1){const d=a(n,l);e[n][l]?t[n][l]=2===d||3===d:t[n][l]=3===d}e=t,d(0,0)},c=t=>{e=Array.from({length:t},(()=>Array(t).fill(!1))),d(0,0)},o=()=>{null===t&&(t=setInterval(r,l))};document.getElementById("startButton")?.addEventListener("click",o),document.getElementById("stopButton")?.addEventListener("click",(()=>{null!==t&&(clearInterval(t),t=null)})),document.getElementById("gridSize")?.addEventListener("change",(e=>{n=parseInt(e.target.value,10),c(n)})),document.getElementById("speed")?.addEventListener("change",(e=>{l=parseInt(e.target.value,10),o()})),c(n)})();