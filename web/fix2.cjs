const fs = require('fs');

function replaceFile(file, from, to) {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(from, to);
  fs.writeFileSync(file, c);
}

replaceFile('src/components/ui/Accordion.tsx', 'import { HTMLAttributes }', 'import type { HTMLAttributes }');
replaceFile('src/components/ui/Badge.tsx', 'import { HTMLAttributes }', 'import type { HTMLAttributes }');
replaceFile('src/components/ui/Button.tsx', 'import { ButtonHTMLAttributes }', 'import type { ButtonHTMLAttributes }');
replaceFile('src/components/ui/FormulaBlock.tsx', 'import { HTMLAttributes }', 'import type { HTMLAttributes }');
replaceFile('src/components/ui/FormulaBlock.tsx', 'import { Award', 'import {'); // removing Award if it's there
replaceFile('src/components/ui/Input.tsx', 'import { InputHTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes }', 'import type { InputHTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes }');
replaceFile('src/components/ui/Modal.tsx', 'import { HTMLAttributes }', 'import type { HTMLAttributes }');
replaceFile('src/components/ui/Modal.tsx', 'import { ReactNode', 'import type { ReactNode');
replaceFile('src/components/ui/Tooltip.tsx', 'import { HTMLAttributes }', 'import type { HTMLAttributes }');
replaceFile('src/components/ui/PageHeader.tsx', "import React from 'react';\n", "");

let tooltip = fs.readFileSync('src/components/ui/Tooltip.tsx', 'utf8');
tooltip = tooltip.replace("offset: typeof offset === 'number' ? offset : 8,", "offset: typeof offset === 'number' || typeof offset === 'string' ? Number(offset) : 8,");
tooltip = tooltip.replace(/placement,\s*/, '');
fs.writeFileSync('src/components/ui/Tooltip.tsx', tooltip);

let hook = fs.readFileSync('src/hooks/useNumericField.ts', 'utf8');
hook = hook.replace('const value = ', ''); 
fs.writeFileSync('src/hooks/useNumericField.ts', hook);
