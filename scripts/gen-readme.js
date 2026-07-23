#!/usr/bin/env node
/**
 * 扫描 problems/ 目录，自动生成 README 里的题目清单表格。
 * 表格内容写在 README.md 的两个标记之间：
 *   <!-- PROBLEMS:START --> ... <!-- PROBLEMS:END -->
 * 题名 / 难度 / 考点分别来自每个题目 html 的 <title>、.difftag、<meta name="tags">，
 * 因此新增题目只需把 html 放进 problems/（记得写上 meta tags），无需手动改 README。
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'problems');
const readmePath = path.join(root, 'README.md');

const START = '<!-- PROBLEMS:START -->';
const END = '<!-- PROBLEMS:END -->';

const items = fs.readdirSync(dir)
  .filter(name => /^\d+-.*\.html$/i.test(name))
  .map(name => {
    const m = name.match(/^(\d+)-(.*)\.html$/i);
    const html = fs.readFileSync(path.join(dir, name), 'utf8');
    const rawTitle = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    const title = rawTitle
      .replace(/\s*[—-]\s*动画演示\s*$/, '')
      .replace(/^\d+\.\s*/, '')
      .trim() || m[2];
    const diff = ((html.match(/class="difftag"[^>]*>([^<]*)</) || [])[1] || '').trim();
    const tags = ((html.match(/name="tags"\s+content="([^"]*)"/) || [])[1] || '').trim();
    return { num: parseInt(m[1], 10), slug: m[2], file: name, title, diff, tags };
  })
  .sort((a, b) => (a.num - b.num) || a.file.localeCompare(b.file));

const header = '| # | 题目 | 难度 | 考点 |\n|---|------|------|------|';
const rows = items.map(p =>
  `| ${p.num} | [${p.title}](problems/${p.file}) | ${p.diff || '—'} | ${p.tags || '—'} |`
);
const table = [header].concat(rows).join('\n');

const readme = fs.readFileSync(readmePath, 'utf8');
const s = readme.indexOf(START);
const e = readme.indexOf(END);
if (s === -1 || e === -1 || e < s) {
  console.error(`README.md 缺少标记 ${START} / ${END}，未做改动。`);
  process.exit(1);
}

const before = readme.slice(0, s + START.length);
const after = readme.slice(e);
const next = before + '\n' + table + '\n' + after;

if (next !== readme) {
  fs.writeFileSync(readmePath, next);
  console.log(`README 题目清单已更新：${items.length} 道题。`);
} else {
  console.log(`README 题目清单无变化：${items.length} 道题。`);
}
