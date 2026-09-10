import {figureDefinitions,figureMarkup} from './lesson-figures.js';
for(const section of document.querySelectorAll('[data-figure]')){
 const def=figureDefinitions.find(f=>f.id===section.dataset.figure),control=section.querySelector('input'),output=section.querySelector('output'),figure=section.querySelector('figure');
 control.disabled=false;
 control.addEventListener('input',()=>{output.value=control.value;figure.innerHTML=figureMarkup(def,Number(control.value));});
}
// Native Anker und details bleiben ohne JS funktionsfähig. Kein Zugriff auf localStorage.
