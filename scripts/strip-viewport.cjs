const fs = require('fs');
const path = require('path');

function walkSync(dir, exts) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walkSync(full, exts));
    else if (exts.some(e => entry.name.endsWith(e))) results.push(full);
  }
  return results;
}

const base = path.resolve(__dirname, '..', 'hospital', 'src');
const files = walkSync(base, ['.js', '.jsx']);

let totalFixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Remove viewport={{ once: true }} and variants
  content = content.replace(/\s*viewport=\{\{[^}]*\}\}/g, '');
  // Remove initial={{ ... }} leftover framer-motion props
  content = content.replace(/\s*initial=\{\{[^}]*\}\}/g, '');
  // Remove animate={{ ... }} leftover framer-motion props  
  content = content.replace(/\s*animate=\{\{[^}]*\}\}/g, '');
  // Remove whileInView={{ ... }}
  content = content.replace(/\s*whileInView=\{\{[^}]*\}\}/g, '');
  // Remove transition={{ ... }} (framer-motion only, not CSS)
  content = content.replace(/\s*transition=\{\{[^}]*\}\}/g, '');
  // Remove whileHover={{ ... }}
  content = content.replace(/\s*whileHover=\{\{[^}]*\}\}/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content);
    totalFixed++;
    console.log('Fixed:', path.relative(base, file));
  }
}

console.log(`\nDone: ${totalFixed} files cleaned`);
