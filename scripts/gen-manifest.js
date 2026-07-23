#!/usr/bin/env node
/**
 * 扫描 problems/ 目录，生成 problems.json 清单。
 * 题名与难度直接从每个题目 html 的 <title> 和 .difftag 中提取，
 * 因此新增题目只需把 html 放进 problems/，无需手动维护任何清单。
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'problems');

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
  .sort((a, b) => a.num - b.num);

const out = path.join(root, 'problems.json');
fs.writeFileSync(out, JSON.stringify(items, null, 2) + '\n');
console.log(`wrote ${items.length} problems -> problems.json`);
