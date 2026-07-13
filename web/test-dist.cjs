const fs = require('fs');
const code = fs.readFileSync('c:/Users/Tiger/Agents/Projects/kal-kala/web/dist/assets/index-D5cu_0QS.js', 'utf8');
const m = code.match(/String\.raw\`(.*?)\`/g);
console.log(m ? m.slice(0, 5) : 'not found');
