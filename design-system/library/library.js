'use strict';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const data = window.BoringLibraryData;
if (!data) throw new Error('Token data is missing. Run node tokens/happy-longevity/build.mjs.');
const tokens = new Map();
function collect(group, prefix = '') {
  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) continue;
    const path = prefix + key;
    if ('$value' in value) tokens.set(path, {path, type:value.$type, raw:value.$value, description:value.$description || '', source:value});
    else collect(value, path + '.');
  }
}
collect(data.source);
const ref = value => typeof value === 'string' && /^\{[^{}]+\}$/.test(value) ? value.slice(1,-1) : null;
function resolve(value, seen = []) {
  const path = ref(value);
  if (path) {
    if (seen.includes(path) || !tokens.has(path)) throw new Error('Invalid token reference: ' + path);
    return resolve(tokens.get(path).raw, [...seen,path]);
  }
  if (Array.isArray(value)) return value.map(item => resolve(item, seen));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key,item]) => [key,resolve(item,seen)]));
  return value;
}
function references(value) {
  const target = ref(value);
  if (target) return [target];
  if (value && typeof value === 'object') return [...new Set(Object.values(value).flatMap(references))];
  return [];
}
for (const token of tokens.values()) token.value = resolve(token.raw);
const allTokens = [...tokens.values()];
const cssName = path => '--boring-' + path.replaceAll('.','-');
const cssVar = path => 'var(' + cssName(path) + ')';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pretty = value => value.replaceAll('-', ' ').replace(/^\w/, c => c.toUpperCase());
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const color = value => value.alpha === 1 ? value.hex : `rgba(${value.components.map(n => Math.round(n*255)).join(', ')}, ${value.alpha})`;
function format(token) {
  const value = token.value;
  switch (token.type) {
    case 'color': return value.hex + (value.alpha < 1 ? ` · ${Math.round(value.alpha*100)}%` : '');
    case 'dimension': case 'duration': return value.value + ' ' + value.unit;
    case 'fontFamily': return Array.isArray(value) ? value.join(', ') : value;
    case 'cubicBezier': return `cubic-bezier(${value.join(', ')})`;
    case 'typography': return `${value.fontSize.value} px / ${value.lineHeight} · ${value.fontWeight}`;
    case 'shadow': return (Array.isArray(value) ? value : [value]).map(v => [v.offsetX,v.offsetY,v.blur,v.spread].map(n => n.value + n.unit).join(' ')).join(', ');
    default: return String(value);
  }
}
const valueOf = path => tokens.get(path).value;
const descriptions = {
  palette:'A base colour. Prefer a semantic colour role when using it in a screen.',
  color:'A named colour role. Its reference keeps related uses connected to the same base value.',
  typography:'A complete text style. Apply the font shorthand and letter-spacing token together.',
  font:'An individual typography decision, shared by the named text styles.',
  space:'Spacing from the 4 px base scale. Use it for gaps, padding, and margins.',
  radius:'A corner radius for a specific scale of surface or control.',
  border:'A line width or focus offset. Focus visibility should remain clear against the surrounding surface.',
  size:'A shared size. Keep the interaction target at least as large as the touch-size role.',
  layout:'A layout constraint or spacing role. Keep reading comfortable as screens grow.',
  motion:'A motion setting. Respect reduced motion and stop looping motion when the task finishes.',
  opacity:'An opacity multiplier. Do not reduce the legibility of essential text.',
  layer:'A stacking level. Use consistent layers for menus, dialogs, and notifications.',
  shadow:'A shadow preset. Everyday cards stay flat; use elevation for floating surfaces.',
  component:'A component decision linked to a shared role, so changes propagate consistently.'
};

$('#token-count').textContent = tokens.size;
$('.quick-find>span').textContent = tokens.size;
$('#contrast-count').textContent = data.validation.contrasts.length;

const coreColors = [
  ['Warm paper','color.surface.page'],['Trust ink','color.text.primary'],['Little b','color.brand.character'],['A little air','color.surface.welcome'],
  ['Card white','color.surface.card'],['Warm wash','color.surface.warm'],['Quiet text','color.text.secondary'],['Soft divider','color.border.subtle']
];
$('#colour-grid').innerHTML = coreColors.map(([name,path]) => {
  const token=tokens.get(path);const isDark=['color.text.primary','color.text.secondary'].includes(path);
  return `<button class="colour-card" data-token="${path}"><div class="colour-preview" style="background:${cssVar(path)};color:${isDark?'var(--paper)':'var(--ink)'}"><span>${token.value.hex}</span><span aria-hidden="true">Aa</span></div><div class="colour-info"><strong>${name}</strong><code>${path}</code></div></button>`;
}).join('');
const statuses = [['success','Confirmed','A completed routine action'],['attention','Check the details','A clear next step is needed'],['error','Couldn’t save','Explain the problem and recovery'],['info','Good to know','Useful supporting context']];
$('#status-grid').innerHTML = statuses.map(([name,label,note]) => `<button class="status-card" data-token="color.status.${name}.foreground" style="background:${cssVar('color.status.'+name+'.background')};color:${cssVar('color.status.'+name+'.foreground')}"><strong>${label}</strong><span>${note}</span></button>`).join('');

let selectedType='typography.heading';
function renderTypeTester() {
  const token=tokens.get(selectedType);
  $('#type-preview').textContent=$('#type-text').value || 'A little room for your words.';
  $('#type-preview').style.font=cssVar(selectedType);
  $('#type-preview').style.letterSpacing=`var(${cssName(selectedType)}-letter-spacing)`;
  $('#type-meta').textContent=`${selectedType} · ${token.value.fontFamily} · ${format(token)}`;
  $('#type-meta').dataset.token=selectedType;
}
renderTypeTester();
$('#type-text').addEventListener('input',renderTypeTester);
$$('[data-type]').forEach(button => button.addEventListener('click',() => {
  selectedType=button.dataset.type;
  $$('[data-type]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  renderTypeTester();
}));
$('#type-scale').innerHTML=allTokens.filter(t=>t.path.startsWith('typography.')).map(token=>{
  const sample=token.path==='typography.wordmark'?'boring':token.path==='typography.label'?'CARE, TAKEN CARE OF':token.value.fontSize.value>40?'Hello, life.':'More of the days that matter.';
  return `<div class="type-row"><div class="meta"><button data-token="${token.path}">${pretty(token.path.split('.')[1])}</button><small>${format(token)}</small></div><p style="font:${cssVar(token.path)};letter-spacing:var(${cssName(token.path)}-letter-spacing)">${sample}</p></div>`;
}).join('');

$('#spacing-scale').innerHTML=allTokens.filter(t=>t.path.startsWith('space.')).map(t=>`<button class="space-row" data-token="${t.path}" aria-label="Inspect ${t.path}, ${format(t)}"><code>${t.value.value}</code><span class="space-bar" style="width:${t.value.value/128*100}%"></span><span>px</span></button>`).join('');
$('#padding-select').addEventListener('change',event=>{
  const path='space.'+event.target.value;
  $('#padding-demo').style.padding=cssVar(path);
  $('.padding-label').textContent=format(tokens.get(path));
  $('#padding-token').dataset.token=path;
  $('#padding-token').textContent=cssVar(path);
});
$('#radius-grid').innerHTML=allTokens.filter(t=>t.path.startsWith('radius.')).map(t=>`<button class="radius-item" data-token="${t.path}"><span class="shape" style="border-radius:${cssVar(t.path)}">${t.value.value===9999?'Pill':t.value.value}</span><span>${pretty(t.path.split('.')[1])}</span></button>`).join('');
$('#shadow-grid').innerHTML=allTokens.filter(t=>t.path.startsWith('shadow.')).map(t=>`<button class="shadow-item" data-token="${t.path}" style="box-shadow:${cssVar(t.path)}"><span>${pretty(t.path.split('.')[1])}</span><small>${t.path==='shadow.none'?'Everyday surfaces':t.path==='shadow.presentation'?'Device mockups':'Floating surfaces'}</small></button>`).join('');

const inspector=$('#token-dialog');
let currentToken=null;
function usage(token) {
  const name=cssVar(token.path);
  if(token.type==='typography')return `.text {\n  font: ${name};\n  letter-spacing: var(${cssName(token.path)}-letter-spacing);\n}`;
  let property='width';
  if(token.type==='color') property=/text|foreground|face|on-primary/.test(token.path)?'color':/border|focus/.test(token.path)?'border-color':'background-color';
  else if(token.type==='fontFamily')property='font-family';
  else if(token.type==='fontWeight')property='font-weight';
  else if(token.type==='shadow')property='box-shadow';
  else if(token.type==='cubicBezier')property='transition-timing-function';
  else if(token.type==='duration')property='animation-duration';
  else if(token.path.startsWith('opacity.'))property='opacity';
  else if(token.path.startsWith('layer.'))property='z-index';
  else if(token.path.startsWith('font.line-height'))property='line-height';
  else if(/rotate-/.test(token.path))return `.character {\n  transform: rotate(calc(${name} * 1deg));\n}`;
  else if(token.path==='motion.loader.blink-scale')return `.eyes {\n  transform: scaleY(${name});\n}`;
  else if(token.path==='motion.loader.rise')return `.character {\n  transform: translateY(${name});\n}`;
  else if(token.path.startsWith('font.tracking'))property='letter-spacing';
  else if(token.path.startsWith('font.size'))property='font-size';
  else if(/radius/.test(token.path))property='border-radius';
  else if(/padding-inline/.test(token.path))property='padding-inline';
  else if(/padding-block/.test(token.path))property='padding-block';
  else if(/padding/.test(token.path))property='padding';
  else if(token.path==='component.focus.width')property='outline-width';
  else if(token.path==='component.focus.offset')property='outline-offset';
  else if(token.path==='border.icon-stroke')property='stroke-width';
  else if(/height|touch/.test(token.path))property='min-height';
  else if(/space\.|gap|gutter/.test(token.path))property='gap';
  else if(/border\./.test(token.path))property=token.path.includes('offset')?'outline-offset':'border-width';
  if(token.path==='component.focus.color')property='outline-color';
  if(/^layout\.(content|reading)/.test(token.path))property='max-width';
  if(token.path.includes('breakpoint')) return `/* Resolve this build-time value to a media query. */\n@media (min-width: ${token.value.value}${token.value.unit}) {\n  /* Wider-screen layout */\n}`;
  return `.element {\n  ${property}: ${name};\n}`;
}
function openToken(path) {
  const token=tokens.get(path);if(!token)return;
  currentToken=token;
  $('#inspect-title').textContent=token.path;
  $('#inspect-eyebrow').textContent=token.type+' / token inspector';
  $('#inspect-description').textContent=token.description || descriptions[token.path.split('.')[0]];
  $('#inspect-copy-status').textContent='';
  const preview=$('#inspect-preview');preview.className='inspect-preview';preview.removeAttribute('style');preview.replaceChildren();
  const sample=document.createElement('p');
  if(token.type==='color'){
    preview.classList.add('color-preview');preview.style.background=color(token.value);
    const lum=luminance(token.value);preview.style.color=lum<.3?'var(--paper)':'var(--ink)';
    sample.textContent='Aa';sample.style.font='700 48px var(--display)';preview.append(sample);
    const label=document.createElement('span');label.textContent=format(token);label.className='inspect-value';preview.append(label);
  }else if(token.type==='typography'){
    sample.textContent='Good in the ordinary.';sample.style.font=cssVar(path);sample.style.letterSpacing=`var(${cssName(path)}-letter-spacing)`;preview.append(sample);
  }else if(token.type==='shadow'){
    sample.textContent=pretty(path.split('.').at(-1));Object.assign(sample.style,{background:'var(--card)',padding:'22px 40px',borderRadius:'14px',boxShadow:cssVar(path)});preview.append(sample);
  }else if(path.startsWith('radius.')){
    sample.textContent=format(token);Object.assign(sample.style,{background:'var(--blue)',padding:'25px',border:'1px solid var(--ink)',borderRadius:cssVar(path)});preview.append(sample);
  }else if(token.type==='fontFamily'){
    sample.textContent=token.value+' · Aa Bb 123';sample.style.fontFamily=cssVar(path);sample.style.fontSize='25px';preview.append(sample);
  }else if(token.type==='cubicBezier'){
    const [a,b,c,d]=token.value;
    preview.innerHTML=`<svg width="150" height="100" viewBox="0 0 150 100" aria-label="Easing curve"><path d="M20 5v75h115" fill="none" stroke="var(--line)"/><path d="M20 80 C${20+a*110} ${80-b*70} ${20+c*110} ${80-d*70} 130 10" fill="none" stroke="var(--ink)" stroke-width="3"/><circle cx="20" cy="80" r="4" fill="var(--butter)"/><circle cx="130" cy="10" r="4" fill="var(--butter)"/></svg>`;
  }else{
    sample.textContent=format(token);sample.style.font='700 30px var(--display)';preview.append(sample);
  }
  $('#inspect-details').innerHTML=`<div class="inspect-detail-row"><span>CSS variable</span><code>${cssName(path)}</code></div><div class="inspect-detail-row"><span>Resolved value</span><code>${escape(format(token))}</code></div>`;
  const refs=references(token.raw);const used=allTokens.filter(t=>references(t.raw).includes(path));
  let chain='';
  if(refs.length){chain+='<p>References</p>';let pending=[...refs],seen=new Set();while(pending.length){const next=pending.shift();if(seen.has(next))continue;seen.add(next);chain+=`<button class="chain-item" data-token="${escape(next)}">${escape(next)} → ${escape(format(tokens.get(next)))}</button>`;pending.push(...references(tokens.get(next).raw));}}
  if(used.length){chain+=`<p style="margin-top:16px">Used by ${used.length} token${used.length===1?'':'s'}</p>`;chain+=used.map(t=>`<button class="chain-item" data-token="${t.path}">${t.path}</button>`).join('');}
  $('#inspect-chain').innerHTML=chain;
  $('#inspect-code').textContent=usage(token);
  $('#inspect-json').textContent=JSON.stringify({[path]:token.source},null,2);
  if(!inspector.open)inspector.showModal();else inspector.scrollTop=0;
}
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-token]');if(button)openToken(button.dataset.token);
  const close=event.target.closest('[data-close]');if(close)document.getElementById(close.dataset.close).close();
});
$$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}));
let toastTimer;
function notify(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600);}
async function copy(text,feedback=null){
  try{
    if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(text);
    else{
      const active=document.activeElement;const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;left:-9999px;top:0';(document.querySelector('dialog[open]')||document.body).append(area);area.select();const copied=document.execCommand('copy');area.remove();active?.focus({preventScroll:true});if(!copied)throw new Error('Clipboard unavailable');
    }
    if(feedback)feedback.textContent='Copied to clipboard.';else notify('Copied to clipboard.');
  }catch{if(feedback)feedback.textContent='Clipboard unavailable. Select and copy the code below.';else notify('Clipboard unavailable. Open the token to select its code.');}
}
$('#copy-token-css').addEventListener('click',()=>copy(cssVar(currentToken.path),$('#inspect-copy-status')));
$('#copy-token-value').addEventListener('click',()=>copy(getComputedStyle(document.documentElement).getPropertyValue(cssName(currentToken.path)).trim(),$('#inspect-copy-status')));

const snippets={
button:{title:'A primary button',code:`<button class="primary-button">Book a visit</button>\n\n.primary-button {\n  min-height: var(--boring-component-button-height);\n  padding: 10px var(--boring-component-button-padding-inline);\n  border: 0;\n  border-radius: var(--boring-component-button-radius);\n  background: var(--boring-component-button-background);\n  color: var(--boring-component-button-text);\n  font: var(--boring-component-button-type);\n}\n.primary-button:hover {\n  background: var(--boring-component-button-hover);\n}\n.primary-button:active {\n  background: var(--boring-component-button-pressed);\n}\n.primary-button:focus-visible {\n  outline: var(--boring-component-focus-width) solid\n    var(--boring-component-focus-color);\n  outline-offset: var(--boring-component-focus-offset);\n}\n.primary-button:disabled {\n  background: var(--boring-color-surface-disabled);\n  color: var(--boring-color-text-disabled);\n}\n[data-audience="parent"] .primary-button {\n  min-height: var(--boring-component-button-parent-height);\n}`},
input:{title:'A labelled input',code:`<label for="preferred-name">Preferred name</label>\n<input id="preferred-name" class="text-input"\n  aria-describedby="name-help">\n<p id="name-help">Tell us how you like to be addressed.</p>\n\n.text-input {\n  min-height: var(--boring-component-input-height);\n  padding-inline: var(--boring-component-input-padding-inline);\n  border: 1px solid var(--boring-component-input-border);\n  border-radius: var(--boring-component-input-radius);\n  background: var(--boring-component-input-background);\n  color: var(--boring-component-input-text);\n  font: var(--boring-component-input-type);\n}\n.text-input:focus-visible {\n  outline: var(--boring-component-focus-width) solid\n    var(--boring-component-focus-color);\n  outline-offset: var(--boring-component-focus-offset);\n}\n.text-input[aria-invalid="true"] {\n  border-color: var(--boring-component-input-error-border);\n}\n/* On validation failure, set aria-invalid="true",\n   show a clear error, and include its id in aria-describedby. */`},
card:{title:'An everyday card',code:`<article class="care-card">\n  <span class="chip">Confirmed</span>\n  <h3>Health check, at home</h3>\n  <p>Tuesday, 22 September · 7–9 am</p>\n</article>\n\n.care-card {\n  padding: var(--boring-component-card-padding);\n  border: 1px solid var(--boring-component-card-border);\n  border-radius: var(--boring-component-card-radius);\n  background: var(--boring-component-card-background);\n  box-shadow: var(--boring-component-card-shadow);\n  color: var(--boring-color-text-primary);\n  font: var(--boring-typography-body);\n}\n.chip {\n  display: inline-flex;\n  padding: var(--boring-component-chip-padding-block)\n    var(--boring-component-chip-padding-inline);\n  border-radius: var(--boring-component-chip-radius);\n  background: var(--boring-component-chip-background);\n  color: var(--boring-component-chip-text);\n}`},
welcome:{title:'A warm welcome',code:`<header class="welcome">\n  <p>Good morning, Sarita</p>\n  <h1>A good day for the everyday.</h1>\n  <img src="/assets/little-b/little-b-daylight.svg"\n    alt="" width="64" height="68">\n</header>\n\n.welcome {\n  padding: var(--boring-component-welcome-padding);\n  border-radius: var(--boring-component-welcome-radius);\n  background: var(--boring-component-welcome-background);\n  color: var(--boring-component-welcome-text);\n}\n.welcome h1 {\n  font: var(--boring-typography-heading);\n  letter-spacing: var(--boring-typography-heading-letter-spacing);\n}`},
dialog:{title:'A focused decision',code:`<button id="open-preference">Review preference</button>\n<dialog id="preference-dialog" aria-labelledby="dialog-title">\n  <h2 id="dialog-title">Keep this preference?</h2>\n  <form method="dialog">\n    <button value="cancel">Not now</button>\n    <button value="confirm">Confirm</button>\n  </form>\n</dialog>\n\n/* JavaScript */\nconst dialog = document.querySelector('#preference-dialog');\ndocument.querySelector('#open-preference')\n  .addEventListener('click', () => dialog.showModal());\n\n/* CSS */\ndialog {\n  padding: var(--boring-component-dialog-padding);\n  border: 1px solid var(--boring-color-border-subtle);\n  border-radius: var(--boring-component-dialog-radius);\n  background: var(--boring-component-dialog-background);\n  color: var(--boring-color-text-primary);\n  box-shadow: var(--boring-component-dialog-shadow);\n}\ndialog::backdrop {\n  background: var(--boring-component-dialog-scrim);\n}\n/* Apply shared button styles and visible focus to actions. */`},
loader:{title:'Little b, while you wait',code:`<link rel="stylesheet" href="/tokens/happy-longevity/boring.css">\n<link rel="stylesheet" href="/tokens/happy-longevity/motion.css">\n\n<!-- Inline the colour SVG from assets/little-b.\n     Add class="boring-loader" to its root SVG and\n     class="boring-loader-eyes" to the group with the two eyes.\n     Keep the smile outside that eye group. -->\n<svg class="boring-loader" viewBox="0 0 128 136"\n  width="88" height="94" aria-hidden="true">\n  <path fill="var(--boring-component-loader-body)"\n    d="M35 10C25 10 19 17 19 28v57c0 25 18 42 44 42 28 0 48-19 48-46 0-26-18-44-43-44-7 0-12 1-17 4V28c0-11-6-18-16-18Z"/>\n  <g fill="none" stroke="var(--boring-component-loader-face)"\n    stroke-width="5" stroke-linecap="round">\n    <g class="boring-loader-eyes"><path d="M54 68v3M80 68v3"/></g>\n    <path d="M52 85c6 13 23 16 32-1"/>\n  </g>\n</svg>\n<p role="status" id="loading-label">Getting things ready for you</p>\n\n/* When the actual operation completes: */\ndocument.querySelector('.boring-loader')\n  .classList.remove('boring-loader');\ndocument.querySelector('#loading-label').textContent = 'All ready.';\n\n/* motion.css stops movement for prefers-reduced-motion.\n   Keep real progress available in text. */`}
};
let selectedSnippet=null;
document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-snippet]');if(trigger){selectedSnippet=snippets[trigger.dataset.snippet];$('#code-title').textContent=selectedSnippet.title;$('#component-code').textContent=selectedSnippet.code;$('#code-copy-status').textContent='';$('#code-dialog').showModal();}
  const copyBlock=event.target.closest('[data-copy-block]');if(copyBlock)copy(document.getElementById(copyBlock.dataset.copyBlock).textContent);
});
$('#copy-component-code').addEventListener('click',()=>copy(selectedSnippet.code,$('#code-copy-status')));

$('#parent-toggle').addEventListener('change',event=>{$('#component-lab').dataset.parent=String(event.target.checked);$('#button-result').textContent=event.target.checked?'Parent mode: 56 px minimum controls and larger reading text.':'Use one primary action per decision. Targets are at least 48 px tall.';});
$$('.button-states button:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{$('#button-result').textContent='Button activated. This example does not book a visit.';}));
$('#sample-form').addEventListener('submit',event=>{
  event.preventDefault();const name=$('#sample-name').value.trim();const valid=Boolean(name);
  $('#sample-name').setAttribute('aria-invalid',String(!valid));$('#name-error').hidden=valid;
  $('#name-error').textContent=valid?'':'Enter the name you would like us to use.';
  $('#name-help').textContent=valid?`Thanks, ${name}. This name stays in the preview.`:'This stays in the preview.';
  if(!valid)$('#sample-name').focus();
});
$('#open-demo-dialog').addEventListener('click',()=>$('#demo-dialog').showModal());
$('#confirm-demo').addEventListener('click',()=>{$('#demo-dialog').close();$('#dialog-result').textContent='Demo confirmed. Nothing was saved.';});

const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let motionFinished=false;
function syncMotion(){
  const reduced=motionPreference.matches||$('#reduce-motion').checked;
  $('.motion-stage').classList.toggle('reduced-preview',reduced);
  $('#pause-motion').disabled=reduced||motionFinished;
  $('#motion-preference').textContent=motionPreference.matches?'Your device requests reduced motion. Little b stays still even with preview mode off.':$('#reduce-motion').checked?'Reduced-motion preview is on. Progress remains available in text.':'Your device’s reduced-motion preference is also respected.';
}
syncMotion();motionPreference.addEventListener('change',syncMotion);$('#reduce-motion').addEventListener('change',syncMotion);
$('#pause-motion').addEventListener('click',()=>{
  const paused=$('.motion-stage').classList.toggle('motion-paused');
  $('#pause-motion').setAttribute('aria-pressed',String(paused));$('#pause-motion').textContent=paused?'Resume motion':'Pause motion';
});
$('#finish-motion').addEventListener('click',()=>{
  motionFinished=!motionFinished;$('#motion-b').classList.toggle('boring-loader',!motionFinished);
  $('#motion-status').textContent=motionFinished?'Ready when you are.':'Getting things ready for you';
  $('#finish-motion').textContent=motionFinished?'Replay demo':'Finish demo';
  $('.motion-stage').classList.remove('motion-paused');$('#pause-motion').setAttribute('aria-pressed','false');$('#pause-motion').textContent='Pause motion';syncMotion();
});

function luminance(value){return value.components.map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);}
const opaqueColors=allTokens.filter(t=>t.path.startsWith('palette.')&&t.type==='color'&&t.value.alpha===1);
for(const select of [$('#contrast-fg'),$('#contrast-bg')])select.innerHTML=opaqueColors.map(t=>`<option value="${t.path}">${pretty(t.path.split('.')[1])} · ${t.value.hex}</option>`).join('');
$('#contrast-fg').value='palette.ink';$('#contrast-bg').value='palette.paper';
function updateContrast(){
  const fg=valueOf($('#contrast-fg').value),bg=valueOf($('#contrast-bg').value);
  $('#contrast-preview').style.color=color(fg);$('#contrast-preview').style.background=color(bg);
  const [a,b]=[luminance(fg),luminance(bg)].sort((a,b)=>b-a),ratio=(a+.05)/(b+.05);
  $('#contrast-result').innerHTML=`<strong>${ratio.toFixed(2)}:1</strong><span class="${ratio>=4.5?'pass':'fail'}">${ratio>=4.5?'Passes for normal text':ratio>=3?'Large text only':'Does not pass for text'}<br>Normal ${ratio>=4.5?'✓':'×'} · Large ${ratio>=3?'✓':'×'}</span>`;
}
updateContrast();$('#contrast-fg').addEventListener('change',updateContrast);$('#contrast-bg').addEventListener('change',updateContrast);

const groups=[...new Set(allTokens.map(t=>t.path.split('.')[0]))];
const types=[...new Set(allTokens.map(t=>t.type))].sort();
$('#token-group').innerHTML+=[...groups].map(g=>`<option value="${g}">${pretty(g)}</option>`).join('');
$('#token-type').innerHTML+=types.map(t=>`<option value="${t}">${t}</option>`).join('');
let page=0;const pageSize=20;
function renderCatalogue(){
  const query=$('#token-search').value.toLowerCase().trim().replaceAll('colour','color');
  const group=$('#token-group').value,type=$('#token-type').value;
  const filtered=allTokens.filter(t=>(!group||t.path.startsWith(group+'.'))&&(!type||t.type===type)&&(!query||(t.path+' '+t.description+' '+format(t)+' '+JSON.stringify(t.raw)).toLowerCase().includes(query)));
  page=Math.min(page,Math.max(0,Math.ceil(filtered.length/pageSize)-1));
  const start=page*pageSize,end=Math.min(start+pageSize,filtered.length);
  $('#result-count').textContent=`${filtered.length} of ${tokens.size} tokens`;
  $('#page-info').textContent=filtered.length?`${start+1}–${end} of ${filtered.length}`:'0 results';
  $('#empty-state').hidden=filtered.length>0;$('.token-table').hidden=filtered.length===0;
  $('#previous-page').disabled=page===0;$('#next-page').disabled=end>=filtered.length;
  $('#token-rows').innerHTML=filtered.slice(start,end).map(t=>{
    const marker=t.type==='color'?`<span class="mini-swatch" style="background:${cssVar(t.path)}"></span>`:`<span class="mini-symbol" aria-hidden="true">${t.type==='typography'||t.type==='fontFamily'?'Aa':t.type==='duration'?'ms':t.type==='dimension'?'↔':'·'}</span>`;
    return `<tr><td><button class="token-name" data-token="${t.path}">${marker}<code>${t.path}</code></button></td><td>${ref(t.raw)?`<span class="alias-value">${escape(t.raw)}</span>`:''}<span class="resolved-value">${escape(format(t))}</span></td><td><span class="token-type">${t.type}</span></td><td><button class="copy-cell" data-copy-token="${t.path}" aria-label="Copy CSS for ${t.path}">${icon('copy')}</button></td></tr>`;
  }).join('');
}
function resetFilters(){$('#token-search').value='';$('#token-group').value='';$('#token-type').value='';page=0;renderCatalogue();}
$('#token-search').addEventListener('input',()=>{page=0;renderCatalogue();});
for(const id of ['token-group','token-type'])$('#'+id).addEventListener('change',()=>{page=0;renderCatalogue();});
$('#reset-filters').addEventListener('click',resetFilters);$('#clear-empty').addEventListener('click',resetFilters);
$('#previous-page').addEventListener('click',()=>{page--;renderCatalogue();});$('#next-page').addEventListener('click',()=>{page++;renderCatalogue();});
document.addEventListener('click',event=>{
  const copyButton=event.target.closest('[data-copy-token]');if(copyButton)copy(cssVar(copyButton.dataset.copyToken));
  const browse=event.target.closest('[data-browse]');if(browse){resetFilters();$('#token-group').value=browse.dataset.browse;renderCatalogue();location.hash='tokens';$('#token-search').focus({preventScroll:true});}
});
renderCatalogue();

function setSetup(key,focus=false){
  $$('[data-setup]').forEach(button=>{const active=button.dataset.setup===key;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;document.getElementById(button.getAttribute('aria-controls')).hidden=!active;if(active&&focus)button.focus();});
}
$$('[data-setup]').forEach((button,index)=>{
  button.addEventListener('click',()=>setSetup(button.dataset.setup));
  button.addEventListener('keydown',event=>{const tabs=$$('[data-setup]');let next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();setSetup(tabs[next].dataset.setup,true);});
});
function closeMenu(){$('#sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Open library navigation');}
$('#menu-toggle').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'Close library navigation':'Open library navigation');});
$$('.sidebar a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('#sidebar').classList.contains('open')){closeMenu();$('#menu-toggle').focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.sidebar,.mobile-header'))closeMenu();});
const sections=$$('main>.section');let scrollTick=false;
function updateNavigation(){let active=sections[0].id;for(const section of sections)if(section.getBoundingClientRect().top<=155)active=section.id;$$('.sidebar nav>a').forEach(link=>{if(link.hash==='#'+active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});scrollTick=false;}
window.addEventListener('scroll',()=>{if(!scrollTick){requestAnimationFrame(updateNavigation);scrollTick=true;}},{passive:true});updateNavigation();
