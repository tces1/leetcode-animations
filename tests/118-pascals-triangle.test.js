const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const pagePath = path.join(__dirname, '..', 'problems', '118-pascals-triangle.html');

function loadPage() {
  const html = fs.readFileSync(pagePath, 'utf8');
  const match = html.match(
    /<script\s+data-pascals-triangle-app(?:="")?\s*>([\s\S]*?)<\/script>/
  );

  assert.ok(match, '应存在 data-pascals-triangle-app 脚本');

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(match[1], context);

  return { html, app: context.window.PascalsTriangleApp };
}

test('页面包含准确的标题和简单难度元数据', () => {
  const { html } = loadPage();

  assert.match(html, /<title>118\. 杨辉三角 — 动画演示<\/title>/);
  assert.match(html, /class="difftag">简单</);
});

test('parseInput 仅接受 1 到 14 的整数字符串', () => {
  const { app } = loadPage();

  for (let n = 1; n <= 14; n += 1) {
    assert.equal(app.parseInput(String(n)), n);
  }

  for (const value of ['', '0', '15', '2.5', 'abc']) {
    assert.equal(app.parseInput(value), null);
  }
});

test('generate 生成正确的杨辉三角', () => {
  const { app } = loadPage();

  assert.equal(JSON.stringify(app.generate(1)), JSON.stringify([[1]]));
  assert.equal(
    JSON.stringify(app.generate(5)),
    JSON.stringify([
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1],
    ])
  );

  // 每个内部数等于上一行相邻两数之和，两端为 1
  const tri = app.generate(10);
  for (let i = 0; i < tri.length; i += 1) {
    assert.equal(tri[i][0], 1);
    assert.equal(tri[i][i], 1);
    for (let j = 1; j < i; j += 1) {
      assert.equal(tri[i][j], tri[i - 1][j - 1] + tri[i - 1][j]);
    }
  }
});

test('buildSteps 以完整三角形和 done 结束', () => {
  const { app } = loadPage();
  const steps = app.buildSteps(5);

  for (const step of steps) {
    assert.equal(typeof step.phase, 'string');
    assert.equal(typeof step.message, 'string');
  }

  const last = steps.at(-1);
  assert.equal(last.phase, 'done');
  assert.equal(last.answer, 5);
  assert.equal(JSON.stringify(last.rows), JSON.stringify(app.generate(5)));
});
