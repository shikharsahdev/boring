const approvedTokens = getComputedStyle(document.documentElement);
const approvedPalette = Object.fromEntries(Object.entries({paper:'surface-page',ink:'text-primary',muted:'text-secondary',butter:'brand-character',sky:'surface-welcome',wash:'surface-warm',line:'border-subtle'}).map(([key, token]) => [key, approvedTokens.getPropertyValue('--boring-color-' + token).trim()]));
const palettes = {
  daylight: {name:'Butter & blue', ...approvedPalette},
  garden: {name:'Apricot & pine',paper:'#FBF9F1',ink:'#315449',muted:'#586B60',butter:'#EFB38D',sky:'#E2EBDF',wash:'#F5E9DC',line:'#DCE0D7'},
  soft: {name:'Lilac & plum',paper:'#FCF9F5',ink:'#554261',muted:'#746378',butter:'#CDC2E8',sky:'#EBE5F2',wash:'#F3EBE6',line:'#E1DCE1'}
};
const root = document.documentElement;
document.querySelectorAll('[data-theme]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.theme;
    const palette = palettes[key];
    Object.entries(palette).forEach(([token, value]) => { if (token !== 'name') root.style.setProperty('--' + token, value); });
    document.body.dataset.palette = key;
    document.querySelector('meta[name="theme-color"]').content = palette.paper;
    document.querySelectorAll('[data-theme]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-swatch]').forEach(swatch => { swatch.querySelector('code').textContent = palette[swatch.dataset.swatch]; });
    document.querySelector('.asset-link').href = '../assets/little-b/little-b-' + key + '.svg';
    document.getElementById('palette-status').textContent = palette.name + ' selected.';
  });
});
const motionButton = document.getElementById('motion-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function syncMotionPreference() {
  motionButton.hidden = motionPreference.matches;
  document.getElementById('motion-note').textContent = motionPreference.matches
    ? 'Reduced motion is on. Little b stays still; loading progress is communicated in text.'
    : 'A quiet 3.6-second rhythm. Reduced motion is respected automatically.';
}
syncMotionPreference();
motionPreference.addEventListener('change', syncMotionPreference);
motionButton.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.innerHTML = paused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
});
const replay = document.getElementById('replay-loader');
replay.addEventListener('click', () => {
  replay.disabled = true;
  const mark = document.getElementById('loader-character');
  const message = document.getElementById('loader-message');
  const detail = document.getElementById('loader-detail');
  mark.classList.add('waiting');
  message.textContent = 'Getting things ready for you';
  detail.textContent = 'A little moment. Then you’re on your way.';
  window.setTimeout(() => {
    mark.classList.remove('waiting');
    message.textContent = 'All ready. Let’s get on with your day.';
    detail.textContent = 'A warm finish, without the fanfare.';
    replay.disabled = false;
  }, 3600);
});
let person = 'Sarita';
document.querySelectorAll('[data-person]').forEach(button => {
  button.addEventListener('click', () => {
    person = button.dataset.person;
    document.querySelectorAll('[data-person]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('appointment-time').textContent = person === 'Sarita' ? 'Tue, 22 September · 7–9 am' : 'Thu, 24 September · 8–10 am';
    document.getElementById('visit-note').textContent = 'We’ll call ' + person + ' the evening before to confirm the visit and explain any preparation.';
  });
});
document.getElementById('visit-details').addEventListener('click', event => {
  const note = document.getElementById('visit-note');
  note.hidden = !note.hidden;
  event.currentTarget.setAttribute('aria-expanded', String(!note.hidden));
});
document.getElementById('care-demo').addEventListener('click', () => {
  const note = document.getElementById('care-note');
  note.hidden = !note.hidden;
});
