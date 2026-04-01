const fs = require('fs');

// Fix ContactPage
let src = fs.readFileSync('hospital/src/pages/ContactPage.jsx', 'utf8');
src = src.replace(/FaUser\b/g, 'User');
src = src.replace(/FaPhoneAlt\b/g, 'PhoneCall');
src = src.replace(/FaUserTag\b/g, 'UserCheck');
src = src.replace(/FaRegCommentDots\b/g, 'MessageSquare');
src = src.replace(/FaQuestionCircle\b/g, 'HelpCircle');
fs.writeFileSync('hospital/src/pages/ContactPage.jsx', src);
console.log('ContactPage fixed');

// Fix TechnologyPage
src = fs.readFileSync('hospital/src/pages/TechnologyPage.jsx', 'utf8');
src = src.replace(/FaCloud\b/g, 'Cloud');
src = src.replace(/FaLayerGroup\b/g, 'Layers');
src = src.replace(/FaLock\b/g, 'Lock');
src = src.replace(/FaShieldAlt\b/g, 'Shield');
src = src.replace(/FaUserNurse\b/g, 'UserRound');
// Rebuild lucide import from actual usage
const lucideUsed = new Set();
const re = /<([A-Z][A-Za-z]+)[\s/>]/g;
let m;
while ((m = re.exec(src)) !== null) {
  const name = m[1];
  if (!['FloatingNavbar', 'Footer', 'React'].includes(name)) {
    lucideUsed.add(name);
  }
}
src = src.replace(
  /import \{[^}]*\} from 'lucide-react';/,
  "import { " + [...lucideUsed].sort().join(', ') + " } from 'lucide-react';"
);
fs.writeFileSync('hospital/src/pages/TechnologyPage.jsx', src);
console.log('TechnologyPage fixed');
