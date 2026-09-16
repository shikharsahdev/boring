#!/usr/bin/env node
// Dependency-free exports from the canonical DTCG source. Run with --check in CI.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = new URL('./', import.meta.url);
const source = JSON.parse(readFileSync(new URL('boring.tokens.json', directory), 'utf8'));
const tokens = new Map();
const supported = new Set(['color', 'dimension', 'fontFamily', 'fontWeight', 'number', 'duration', 'cubicBezier', 'typography', 'shadow']);
const reference = value => typeof value === 'string' && /^\{[^{}]+\}$/.test(value) ? value.slice(1, -1) : null;
const variable = path => '--boring-' + path.replaceAll('.', '-');
const kebab = value => value.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
const assert = (condition, message) => { if (!condition) throw new Error(message); };

function collect(group, prefix = '') {
  for (const [key, node] of Object.entries(group)) {
    if (key.startsWith('$')) continue;
    assert(!/[.{}]/.test(key), `Invalid token/group name: ${key}`);
    assert(node && typeof node === 'object' && !Array.isArray(node), `Invalid group: ${prefix}${key}`);
    const path = prefix + key;
    if ('$value' in node) {
      assert(supported.has(node.$type), `Unsupported type for ${path}: ${node.$type}`);
      tokens.set(path, node);
    } else collect(node, path + '.');
  }
}
collect(source);

function resolve(value, stack = []) {
  const name = reference(value);
  if (name) {
    assert(tokens.has(name), `Missing reference: ${name}`);
    assert(!stack.includes(name), `Circular reference: ${[...stack, name].join(' -> ')}`);
    return resolve(tokens.get(name).$value, [...stack, name]);
  }
  if (Array.isArray(value)) return value.map(item => resolve(item, stack));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolve(item, stack)]));
  return value;
}
const dimension = value => value && Number.isFinite(value.value) && ['px', 'rem'].includes(value.unit);
function valid(type, value) {
  switch (type) {
    case 'color': return value?.colorSpace === 'srgb' && value.components?.length === 3 && value.components.every(n => Number.isFinite(n) && n >= 0 && n <= 1) && Number.isFinite(value.alpha) && value.alpha >= 0 && value.alpha <= 1 && /^#[\da-f]{6}$/i.test(value.hex) && value.components.every((n, index) => Math.round(n * 255) === parseInt(value.hex.slice(1 + index * 2, 3 + index * 2), 16));
    case 'dimension': return dimension(value);
    case 'fontFamily': return typeof value === 'string' || Array.isArray(value) && value.every(x => typeof x === 'string');
    case 'fontWeight': return Number.isFinite(value) && value >= 1 && value <= 1000;
    case 'number': return Number.isFinite(value);
    case 'duration': return value && Number.isFinite(value.value) && value.value >= 0 && ['ms', 's'].includes(value.unit);
    case 'cubicBezier': return Array.isArray(value) && value.length === 4 && value.every(Number.isFinite) && value[0] >= 0 && value[0] <= 1 && value[2] >= 0 && value[2] <= 1;
    case 'typography': return valid('fontFamily', value.fontFamily) && valid('fontWeight', value.fontWeight) && dimension(value.fontSize) && dimension(value.letterSpacing) && value.lineHeight > 0;
    case 'shadow': return (Array.isArray(value) ? value : [value]).every(item => valid('color', item.color) && ['offsetX', 'offsetY', 'blur', 'spread'].every(key => dimension(item[key])) && item.blur.value >= 0);
    default: return false;
  }
}
for (const [path, token] of tokens) {
  const target = reference(token.$value);
  if (target) assert(tokens.get(target)?.$type === token.$type, `Alias type mismatch: ${path} -> ${target}`);
  assert(valid(token.$type, resolve(token.$value, [path])), `Invalid ${token.$type}: ${path}`);
}
assert(new Set([...tokens.keys()].map(variable)).size === tokens.size, 'CSS variable name collision');

function css(value, type) {
  const target = reference(value);
  if (target) return `var(${variable(target)})`;
  switch (type) {
    case 'color': return value.alpha === 1 ? value.hex : `rgb(${value.components.map(n => Math.round(n * 255)).join(' ')} / ${value.alpha})`;
    case 'dimension': case 'duration': return `${value.value}${value.unit}`;
    case 'fontFamily': return (Array.isArray(value) ? value : [value]).map(family => JSON.stringify(family)).join(', ');
    case 'number': case 'fontWeight': return String(value);
    case 'cubicBezier': return `cubic-bezier(${value.join(', ')})`;
    case 'shadow': return (Array.isArray(value) ? value : [value]).map(item => ['offsetX', 'offsetY', 'blur', 'spread'].map(key => css(item[key], 'dimension')).join(' ') + ' ' + css(item.color, 'color')).join(', ');
    default: throw new Error(`Unsupported CSS conversion: ${type}`);
  }
}
const typeFields = {fontFamily:'fontFamily',fontWeight:'fontWeight',fontSize:'dimension',letterSpacing:'dimension',lineHeight:'number'};
const declarations = [];
for (const [path, token] of tokens) {
  if (token.$type === 'typography') {
    const target = reference(token.$value);
    for (const [field, type] of Object.entries(typeFields)) declarations.push(`  ${variable(path)}-${kebab(field)}: ${target ? `var(${variable(target)}-${kebab(field)})` : css(token.$value[field], type)};`);
    declarations.push(`  ${variable(path)}: var(${variable(path)}-font-weight) var(${variable(path)}-font-size)/var(${variable(path)}-line-height) var(${variable(path)}-font-family);`);
  } else declarations.push(`  ${variable(path)}: ${css(token.$value, token.$type)};`);
}
const cssOutput = `/* Generated by build.mjs from boring.tokens.json. Do not edit.\n * Boring Happy Longevity ${source.$extensions['com.boring.design'].version} — butter & blue.\n * Namespaced tokens only: load fonts and apply component styles separately. */\n:root {\n${declarations.join('\n')}\n}\n`;

// Legacy Tokens Studio format is a deliberate adapter: colour objects become hex,
// typography uses percentage line heights, and shadow fields use x/y.
function studioType(path, type) {
  if (path.startsWith('font.size.')) return 'fontSizes';
  if (path.startsWith('font.tracking.')) return 'letterSpacing';
  if (path.startsWith('font.line-height.')) return 'lineHeights';
  return ({fontFamily:'fontFamilies',fontWeight:'fontWeights',shadow:'boxShadow',duration:'other',cubicBezier:'other'})[type] || type;
}
function studioValue(path, token) {
  const value = token.$value;
  if (reference(value)) return value;
  if (path.startsWith('font.line-height.')) return `${Math.round(value * 10000) / 100}%`;
  if (token.$type === 'typography') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, reference(item) ? item : key === 'lineHeight' ? `${item * 100}%` : ['fontSize','letterSpacing'].includes(key) ? css(item, 'dimension') : item]));
  if (token.$type === 'shadow') return (Array.isArray(value) ? value : [value]).map(item => ({x:css(item.offsetX, 'dimension'),y:css(item.offsetY, 'dimension'),blur:css(item.blur, 'dimension'),spread:css(item.spread, 'dimension'),color:reference(item.color) ? item.color : css(item.color, 'color'),type:'dropShadow'}));
  if (token.$type === 'color') return value.alpha === 1 ? value.hex : `rgba(${value.components.map(n => Math.round(n * 255)).join(', ')}, ${value.alpha})`;
  if (['dimension','duration','cubicBezier'].includes(token.$type)) return css(value, token.$type);
  return value;
}
const studio = {};
for (const [path, token] of tokens) {
  const parts = path.split('.');
  let node = studio;
  for (const part of parts.slice(0, -1)) node = node[part] ||= {};
  node[parts.at(-1)] = {type:studioType(path, token.$type),value:studioValue(path, token)};
  if (token.$description) node[parts.at(-1)].description = token.$description;
}

// Protect meaningful pairings rather than assuming every colour works everywhere.
function luminance(color) {
  return color.components.map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [.2126,.7152,.0722][i], 0);
}
const contrastPairs = [
  ['color.text.primary','color.surface.page',4.5], ['color.text.secondary','color.surface.page',4.5],
  ['color.text.secondary','color.surface.card',4.5], ['color.text.primary','color.surface.welcome',4.5],
  ['color.action.on-primary','color.action.primary',4.5], ['color.action.on-primary','color.action.hover',4.5],
  ['color.action.on-primary','color.action.pressed',4.5], ['color.brand.face','color.brand.character',4.5],
  ['color.border.control','color.surface.card',3], ['color.border.focus','color.surface.page',3],
  ...['success','attention','error','info'].map(status => [`color.status.${status}.foreground`,`color.status.${status}.background`,4.5])
];
const contrasts = contrastPairs.map(([fg,bg,minimum]) => {
  const [a,b] = [fg,bg].map(path => luminance(resolve(tokens.get(path).$value))).sort((x,y) => y-x);
  const ratio = (a+.05)/(b+.05);
  assert(ratio >= minimum, `Insufficient contrast: ${fg} / ${bg}: ${ratio.toFixed(2)}`);
  return {foreground:fg,background:bg,ratio:Number(ratio.toFixed(2)),minimum};
});
const report = {tokenCount:tokens.size,checks:['Resolved every alias; checked missing references, cycles, value types and CSS name collisions.','Validated required text and control contrast pairings.','Tokens Studio export converts typography line-height multipliers to percentages.'],contrasts,limitations:['This is a targeted validation of the token types used here, not a universal DTCG validator.','Figma import and native library publication have not been performed.','Token-level checks do not certify complete product accessibility.']};
const outputs = {'boring.css':cssOutput,'boring.tokens-studio.json':JSON.stringify(studio,null,2)+'\n','validation.json':JSON.stringify(report,null,2)+'\n','../../library/tokens-data.js':'// Generated by tokens/happy-longevity/build.mjs. Do not edit.\nwindow.BoringLibraryData = '+JSON.stringify({source,validation:report})+';\n'};
const check = process.argv.includes('--check');
for (const [name, content] of Object.entries(outputs)) {
  const url = new URL(name, directory);
  if (check) assert(readFileSync(url,'utf8') === content, `Stale generated file: ${fileURLToPath(url)}. Run node tokens/happy-longevity/build.mjs`);
  else writeFileSync(url, content);
}
console.log(`${check ? 'Checked' : 'Generated'} ${tokens.size} tokens, ${contrasts.length} contrast pairs and ${Object.keys(outputs).length} exports.`);
