import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFile(path.join(root,p),'utf8');
const source=await read('marketing/index.html');
const rootPage=source.replaceAll('../','').replace('href="site.css"','href="marketing/site.css"').replace('src="site.js"','src="marketing/site.js"');
const outputs={'index.html':rootPage};
// These entry points all use the same page, avoiding a second copy of the brand.
const kitPage=source.replaceAll('../','../../').replace('href="site.css"','href="../../marketing/site.css"').replace('src="site.js"','src="../../marketing/site.js"');
outputs['ui_kits/site/index.html']='<!-- @dsCard group="Marketing site" viewport="1280x900" name="Marketing site" subtitle="Happy longevity: family care, plans, and enquiry preview" -->\n'+kitPage;
async function inlineCss(file){let css=await read(file);for(const match of [...css.matchAll(/@import url\("([^"\n]+)"\);/g)]){if(!match[1].startsWith('http'))css=css.replace(match[0],await inlineCss(path.posix.join(path.posix.dirname(file),match[1])));}return css;}
let css=await inlineCss('styles.css')+'\n'+await read('marketing/site.css');
// Remote font imports must precede every CSS rule, including the token definitions.
const imports=[...css.matchAll(/@import url\("https:[^\n]+?\);/g)].map(m=>m[0]);css=css.replace(/@import url\("https:[^\n]+?\);/g,'');css=imports.join('\n')+'\n'+css;
let standalone=rootPage.replace('<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="marketing/site.css">',`<style>${css}</style>`).replace('<script src="marketing/site.js" defer></script>','').replace('</body>',`<script>${await read('marketing/site.js')}</script></body>`);
const svg=await read('assets/little-b/little-b-daylight.svg');
standalone=standalone.replaceAll('assets/little-b/little-b-daylight.svg','data:image/svg+xml,'+encodeURIComponent(svg));
outputs['Boring Marketing Site.html']=standalone;
outputs['ui_kits/site/standalone.html']=standalone.replace('href="ui_kits/app/index.html"','href="../app/index.html"').replace('href="library/"','href="../../library/"');
for(const [file,content]of Object.entries(outputs)){if(process.argv.includes('--check')){if(await read(file)!==content)throw Error(`Stale marketing output: ${file}`);}else await writeFile(path.join(root,file),content);}
console.log(`${process.argv.includes('--check')?'Checked':'Built'} ${Object.keys(outputs).length} marketing entry points.`);
