const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const pagePath = path.join(__dirname, '..', 'problems', '70-climbing-stairs.html');

function loadPage() {
  const html = fs.readFileSync(pagePath, 'utf8');
  const match = html.match(
    /<script\s+data-climbing-stairs-app(?:="")?\s*>([\s\S]*?)<\/script>/
  );

  assert.ok(match, '应存在 data-climbing-stairs-app 脚本');

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(match[1], context);

  return { html, app: context.window.ClimbingStairsApp };
}

test('页面包含准确的标题和简单难度元数据', () => {
  const { html } = loadPage();

  assert.match(html, /<title>70\. 爬楼梯 — 动画演示<\/title>/);
  assert.match(html, /class="difftag">简单</);
});

test('parseInput 仅接受 1 到 10 的整数字符串', () => {
  const { app } = loadPage();

  for (let n = 1; n <= 10; n += 1) {
    assert.equal(app.parseInput(String(n)), n);
  }

  for (const value of ['', '0', '11', '2.5', 'abc']) {
    assert.equal(app.parseInput(value), null);
  }
});

test('三种算法对代表性输入返回相同正确答案', () => {
  const { app } = loadPage();
  const cases = [
    [1, 1],
    [2, 2],
    [5, 8],
    [10, 89],
  ];

  for (const solver of [
    app.solveRecursive,
    app.solveMemo,
    app.solveRolling,
  ]) {
    for (const [n, expected] of cases) {
      assert.equal(solver(n), expected);
    }
  }
});

test('buildSteps 按章节顺序构建并以正确答案结束', () => {
  const { app } = loadPage();
  const steps = app.buildSteps(5);
  const chapterOrder = [];

  for (const step of steps) {
    if (!chapterOrder.includes(step.chapter)) {
      chapterOrder.push(step.chapter);
    }
    assert.equal(typeof step.phase, 'string');
    assert.equal(typeof step.message, 'string');
  }

  assert.deepEqual(chapterOrder, ['recursive', 'memo', 'dp']);
  assert.equal(steps.at(-1).phase, 'done');
  assert.equal(steps.at(-1).answer, 8);
});
