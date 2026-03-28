const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/components');
const files = [
    'CareerDevelopment.jsx','CulturalArchives.jsx','HigherEducation.jsx',
    'JudicialResources.jsx','NewspaperArchives.jsx','PatentsAndStandards.jsx',
    'ResearchResources.jsx','SchoolEducation.jsx'
];

files.forEach(f => {
    const fp = path.join(dir, f);
    let c = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // 1. Card background: more opaque & rich dark
    if (c.includes('bg-gray-900/40 backdrop-blur-2xl')) {
        c = c.replaceAll('bg-gray-900/40 backdrop-blur-2xl', 'bg-gray-800/95 backdrop-blur-2xl');
        changed = true;
    }

    // 2. Card header bg
    if (c.includes('bg-gray-900/30 flex')) {
        c = c.replaceAll('bg-gray-900/30 flex', 'bg-gray-900/80 flex');
        changed = true;
    }

    // 3. Item text: too dark -> bright white-ish
    if (c.includes('text-gray-400 font-bold')) {
        c = c.replaceAll('text-gray-400 font-bold', 'text-gray-100 font-semibold');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(fp, c);
        console.log('Updated:', f);
    } else {
        console.log('No change needed:', f);
    }
});
