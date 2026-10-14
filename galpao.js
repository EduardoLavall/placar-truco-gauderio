/* Identidade Fogo de Chão · ambientação opcional e persistente */
(()=>{"use strict";
  const button=document.getElementById("galpaoFxToggle");
  if(!button)return;
  const key="placar-truco-gauderio-fx-ambient-v1";
  const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let previous=null;
  try{previous=localStorage.getItem(key)}catch(error){}
  let enabled=previous==="on"?true:previous==="off"?false:!reduced;
  function update(){
    document.documentElement.classList.toggle("galpao-fx-off",!enabled);
    button.setAttribute("aria-pressed",String(enabled));
    button.textContent=enabled?"🔥 BRASAS ACESAS":"◇ BRASAS APAGADAS";
    button.setAttribute("aria-label",enabled?"Desativar efeitos animados de fogo":"Ativar efeitos animados de fogo");
  }
  button.addEventListener("click",()=>{
    enabled=!enabled;
    try{localStorage.setItem(key,enabled?"on":"off")}catch(error){}
    update();
  });
  const visibility=()=>document.documentElement.classList.toggle("galpao-tab-hidden",document.hidden);
  document.addEventListener("visibilitychange",visibility);
  visibility();
  update();
})();