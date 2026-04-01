const fs = require('fs');
const path = require('path');

function walkSync(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walkSync(full, list);
    else if (full.endsWith('.jsx') || full.endsWith('.js')) list.push(full);
  }
  return list;
}

const root = path.resolve(__dirname, '..', 'hospital', 'src');
const files = walkSync(root);
let changed = 0;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const orig = src;

  // 1. Remove framer-motion import lines
  src = src.replace(/import\s*\{[^}]*\}\s*from\s*['"]framer-motion['"];?\s*\n?/g, '');

  // 2. Replace <motion.tag with <tag and </motion.tag> with </tag>
  const tags = ['div','span','button','nav','li','section','p','h1','h2','h3','h4','h5','h6','a','img','header','main','aside','ul','ol','form','input','tr','td','th','table','footer','article'];
  for (const tag of tags) {
    src = src.replace(new RegExp('<motion\\.' + tag + '(\\s)', 'g'), '<' + tag + '$1');
    src = src.replace(new RegExp('<motion\\.' + tag + '>', 'g'), '<' + tag + '>');
    src = src.replace(new RegExp('<motion\\.' + tag + '/>', 'g'), '<' + tag + '/>');
    src = src.replace(new RegExp('</motion\\.' + tag + '>', 'g'), '</' + tag + '>');
  }

  // 3. Remove motion-specific JSX props (handles nested braces up to 3 levels)
  const motionProps = ['initial', 'animate', 'exit', 'whileHover', 'whileTap', 'whileInView', 'variants', 'transition', 'layout', 'layoutId'];
  for (const prop of motionProps) {
    // Match prop={...} with up to 3 brace nesting levels
    const re = new RegExp('\\s+' + prop + '=\\{(?:[^{}]|\\{(?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})*\\})*\\}', 'g');
    src = src.replace(re, '');
  }

  // 4. Remove AnimatePresence wrappers
  src = src.replace(/<AnimatePresence[^>]*>/g, '');
  src = src.replace(/<\/AnimatePresence>/g, '');

  // 5. Remove useInView references (keep the ref)
  // Just remove the import hook call, the ref variable declaration stays
  
  if (src !== orig) {
    fs.writeFileSync(file, src);
    changed++;
    console.log('Fixed:', path.relative(root, file));
  }
}
console.log('\nTotal files changed:', changed);
