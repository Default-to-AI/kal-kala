const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Remove unused React import
  if (content.includes("import React from 'react';")) {
    content = content.replace("import React from 'react';\n", "");
    changed = true;
  }

  // Fix HTMLAttributes type imports
  const attrsToFix = [
    'HTMLAttributes',
    'ButtonHTMLAttributes',
    'InputHTMLAttributes',
    'SelectHTMLAttributes',
    'LabelHTMLAttributes'
  ];
  
  if (file.includes('Badge.tsx')) {
    content = content.replace('key={badge.key} {...badge}', 'key={badge.key} {...badge}').replace('badges.map((badge)', 'badges.map(({ key, ...badge })');
    content = content.replace("import { HTMLAttributes } from 'react';", "import type { HTMLAttributes } from 'react';");
    changed = true;
  }
  
  if (file.includes('Button.tsx')) {
    content = content.replace("import { ButtonHTMLAttributes } from 'react';", "import type { ButtonHTMLAttributes } from 'react';");
    changed = true;
  }

  if (file.includes('Accordion.tsx') || file.includes('FormulaBlock.tsx') || file.includes('Modal.tsx') || file.includes('Tooltip.tsx')) {
    content = content.replace("import { HTMLAttributes", "import type { HTMLAttributes");
    content = content.replace("import { ReactNode, HTMLAttributes", "import type { ReactNode, HTMLAttributes");
    changed = true;
  }
  
  if (file.includes('Input.tsx')) {
    content = content.replace("import { InputHTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes } from 'react';", "import type { InputHTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes } from 'react';");
    changed = true;
  }

  if (file.includes('ExerciseStep.tsx')) {
    content = content.replace(/variant="outline"/g, 'variant="secondary"'); // Assuming secondary instead of outline
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
});

console.log("Fixes applied!");
