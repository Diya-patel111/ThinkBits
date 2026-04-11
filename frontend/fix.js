const fs = require('fs');
let code = fs.readFileSync('src/pages/UploadResume.jsx', 'utf8');

const replacement = \
        const candidatesRes = response?.data?.candidates || [];
        const detectedSkills = candidatesRes.length > 0 ? (candidatesRes[0].skills?.length || 0) : 0;
        const candidateName = candidatesRes.length > 0 && candidatesRes[0].name ? candidatesRes[0].name : fileItem.name;
        
        let displayMsg = 'Parsed: ' + detectedSkills + ' skills mapped.';
        if (candidatesRes.length > 0 && candidatesRes[0]) {
           const c = candidatesRes[0];
           const emailStr = c.email ? c.email + ' • ' : '';
           const skillsStr = c.skills && c.skills.length > 0 ? c.skills.slice(0,5).join(', ') + (c.skills.length>5?', ...':'') : 'No standard skills mapped';
           displayMsg = emailStr + skillsStr;
        }

        setFiles(prev => prev.map(f => f.id === fileItem.id ? { 
          ...f, status: 'ready', progress: 100, name: candidateName,
          message: displayMsg 
        } : f));
\.trim();

code = code.replace(/const candidatesRes = response\?\.data\?\.candidates.*?message: \Parsed.*?\ \r?\n\s+\} : f\)\);/s, replacement);
fs.writeFileSync('src/pages/UploadResume.jsx', code);
console.log('Fixed JSX');
