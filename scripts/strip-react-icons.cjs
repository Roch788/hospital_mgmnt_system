const fs = require('fs');
const path = require('path');

// Map react-icons/fa → lucide-react equivalents
const ICON_MAP = {
  // Navigation
  'FaBars': 'Menu',
  'FaTimes': 'X',
  'FaArrowLeft': 'ArrowLeft',
  'FaArrowRight': 'ArrowRight',
  'FaChevronLeft': 'ChevronLeft',
  'FaChevronRight': 'ChevronRight',
  'FaCheck': 'Check',
  
  // Medical
  'FaHospital': 'Hospital',
  'FaHospitalAlt': 'Building2',
  'FaHeartbeat': 'HeartPulse',
  'FaUserMd': 'Stethoscope',
  'FaAmbulance': 'Ambulance',
  'FaBed': 'Bed',
  'FaMicrophone': 'Mic',
  
  // Location
  'FaMapMarkerAlt': 'MapPin',
  'FaMapMarkedAlt': 'Map',
  
  // UI
  'FaSearch': 'Search',
  'FaCheckCircle': 'CheckCircle',
  'FaStar': 'Star',
  'FaCircle': 'Circle',
  'FaRocket': 'Rocket',
  'FaBrain': 'Brain',
  'FaChartLine': 'TrendingUp',
  'FaNetworkWired': 'Network',
  'FaRobot': 'Bot',
  
  // Social
  'FaFacebook': 'Facebook',
  'FaTwitter': 'Twitter',
  'FaInstagram': 'Instagram',
  'FaLinkedin': 'Linkedin',
  'FaGithub': 'Github',
  
  // Contact
  'FaEnvelope': 'Mail',
  'FaPhone': 'Phone',
};

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

  // Find all react-icons imports
  const importRe = /import\s*\{([^}]+)\}\s*from\s*['"]react-icons\/fa['"];?\s*\n?/g;
  let match;
  const lucideNeeded = new Set();
  
  while ((match = importRe.exec(src)) !== null) {
    const icons = match[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const icon of icons) {
      const mapped = ICON_MAP[icon];
      if (mapped) {
        lucideNeeded.add(mapped);
      } else {
        console.warn(`  UNMAPPED: ${icon} in ${path.relative(root, file)}`);
        // Replace with a generic icon
        lucideNeeded.add('CircleHelp');
      }
    }
  }

  if (lucideNeeded.size === 0) continue;

  // Remove react-icons import lines
  src = src.replace(/import\s*\{[^}]*\}\s*from\s*['"]react-icons\/fa['"];?\s*\n?/g, '');

  // Replace icon component names in JSX
  for (const [fa, lucide] of Object.entries(ICON_MAP)) {
    if (src.includes(fa)) {
      // Replace as JSX component: <FaIcon ... /> with <LucideIcon ... />
      src = src.replace(new RegExp('<' + fa + '(\\s|/>|>)', 'g'), '<' + lucide + '$1');
      src = src.replace(new RegExp('</' + fa + '>', 'g'), '</' + lucide + '>');
      // Also replace in expressions: {FaIcon} or condition && <FaIcon ... 
      src = src.replace(new RegExp('\\b' + fa + '\\b', 'g'), lucide);
      lucideNeeded.add(lucide);
    }
  }

  // Check if there's already a lucide-react import
  const existingLucide = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/;
  const existingMatch = src.match(existingLucide);
  
  if (existingMatch) {
    // Merge existing lucide imports with new ones
    const existing = existingMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const e of existing) lucideNeeded.add(e);
    src = src.replace(existingLucide, `import { ${[...lucideNeeded].sort().join(', ')} } from 'lucide-react'`);
  } else {
    // Add new lucide import after the first import or at top
    const importLine = `import { ${[...lucideNeeded].sort().join(', ')} } from 'lucide-react';\n`;
    const firstImport = src.indexOf('import ');
    if (firstImport >= 0) {
      const lineEnd = src.indexOf('\n', firstImport);
      src = src.slice(0, lineEnd + 1) + importLine + src.slice(lineEnd + 1);
    } else {
      src = importLine + src;
    }
  }

  if (src !== orig) {
    fs.writeFileSync(file, src);
    changed++;
    console.log('Fixed:', path.relative(root, file));
  }
}
console.log('\nTotal files changed:', changed);
