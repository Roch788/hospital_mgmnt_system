const fs = require('fs');
const files = [
  'hospital/src/components/FeaturesGrid.jsx',
  'hospital/src/components/ProblemsSection.jsx',
  'hospital/src/components/WorkflowSection.jsx',
  'hospital/src/components/StatsSection.jsx',
];
for (const f of files) {
  let src = fs.readFileSync(f, 'utf8');
  if (!src.includes('useInView')) continue;
  if (src.includes('../utils/useInView')) continue;
  // Add import after first import line
  const firstImport = src.indexOf('import ');
  const lineEnd = src.indexOf('\n', firstImport);
  const importLine = "import { useInView } from '../utils/useInView';\n";
  src = src.slice(0, lineEnd + 1) + importLine + src.slice(lineEnd + 1);
  fs.writeFileSync(f, src);
  console.log('Added useInView import to', f);
}
