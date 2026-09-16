/* Run with @babel/standalone installed, or BABEL_PATH pointing to an existing standalone runtime. */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..');process.chdir(root);
const babel=require(process.env.BABEL_PATH||'@babel/standalone');
const manifest=JSON.parse(fs.readFileSync('_ds_manifest.json','utf8'));
const sources=[...new Set(manifest.components.map(x=>x.sourcePath))];
const hashes={};const outputs=[];
for(const file of sources){let source=fs.readFileSync(file,'utf8');hashes[file]=crypto.createHash('sha256').update(source).digest('hex').slice(0,12);
 const names=[...source.matchAll(/export (?:function|const) (\w+)/g)].map(m=>m[1]);
 source=source.replace(/^import React from "react";\s*/m,'').replace(/^import \{([^}]+)\} from [^;]+;/gm,(_,names)=>`const {${names}} = ns;`).replace(/\bexport /g,'');
 outputs.push(`// ${file}\n(()=>{\n${babel.transform(source,{presets:['react'],filename:file}).code}\nObject.assign(ns,{${names.join(',')}});\n})();`);
}
// Icon must precede consumers. Remaining dependencies are functions accessed on render.
outputs.sort((a,b)=>a.startsWith('// components/core/Icon.jsx')?-1:b.startsWith('// components/core/Icon.jsx')?1:0);
const header={format:4,namespace:manifest.namespace,components:manifest.components,sourceHashes:hashes,inlinedExternals:[],unexposedExports:[]};
fs.writeFileSync('_ds_bundle.js',`/* @ds-bundle: ${JSON.stringify(header)} */\n(()=>{const ns=window.${manifest.namespace}=window.${manifest.namespace}||{};\n${outputs.join('\n')}\n})();\n`);
console.log(`Built ${sources.length} component sources.`);
