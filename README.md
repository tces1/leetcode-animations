# 🎬 LeetCode 算法动画演示集

用可交互的网页动画，把经典算法题的执行过程一步步可视化。纯静态 HTML，**无需任何依赖**，双击对应文件即可在浏览器打开。

🔗 **在线访问**：<https://tces1.github.io/leetcode-animations/>

## 快速开始

- **在线**：直接打开 <https://tces1.github.io/leetcode-animations/>，题目卡片会**自动从 `problems/` 目录生成**（点卡片进入动画）。
- **本地**：直接进入 `problems/` 目录，双击任意 `题号-题名.html` 即可打开对应动画。
  （本地 `file://` 方式打开首页时无法自动列目录，请直接进 `problems/`；首页的自动发现依赖线上部署。）

每个动画页面通用能力：

- ✏️ **自定义输入** —— 换成自己的用例
- ⏯️ **单步 / 回退 / 自动播放** —— 逐帧看清算法状态变化
- 🔍 **高亮当前处理元素**，实时展示核心数据结构（栈、指针、DP 表等）
- 📄 **内置参考代码**（Java / Python）

## 目录结构

```
leetcode-animations/
├── index.html                    # 首页：读取 problems.json 渲染题目卡片
├── .nojekyll                     # 让 GitHub Pages 原样托管静态文件
├── scripts/
│   └── gen-manifest.js           # 扫描 problems/ 生成 problems.json
├── .github/workflows/
│   └── static.yml                # 部署前生成 problems.json，再发布到 Pages
├── README.md                     # 本文件
└── problems/                     # 所有动画，一题一个文件
    ├── 84-largest-rectangle-in-histogram.html  # 84. 柱状图中最大的矩形
    ├── 394-decode-string.html    # 394. 字符串解码
    └── 739-daily-temperatures.html  # 739. 每日温度

# problems.json 是构建产物：部署时由 CI 现生成并打包，不纳入版本库
```

## 文件命名规范

统一使用 **`题号-英文题名.html`**（题名用小写、连字符分隔），文件名自带题号，靠命名即可排序、检索，无需额外索引页：

| 题号 | 文件名 | 示例 |
|------|--------|------|
| 394 | `394-decode-string.html` | ✅ |
| 20  | `20-valid-parentheses.html` | ✅ |
| 3   | `3-longest-substring-without-repeating-characters.html` | ✅ |

## 如何新增一道题

在 `problems/` 下新建 `题号-英文题名.html`（复制现有文件当模板最快，保留顶部导航栏即可）。**无需改动 `index.html` 或本文件** —— push 后，GitHub Actions 会在部署前自动扫描目录、从每个题目文件的 `<title>` 和难度标签生成 `problems.json` 并一起发布，首页随即多出一张卡片。

> 首页优先读取同源的 `problems.json`（秒开、无访问限额）；只有在清单尚未生成时，才会临时回退到 GitHub API 列目录（每小时 60 次限额）。
>
> 本地想手动重建清单：`node scripts/gen-manifest.js`（生成的 `problems.json` 已被 `.gitignore` 忽略）。

## 题目清单

| # | 题目 | 难度 | 考点 |
|---|------|------|------|
| 5 | [最长回文子串](problems/5-longest-palindromic-substring.html) | 中等 | 动态规划 · 二维 DP · 区间 · 字符串 |
| 32 | [最长有效括号](problems/32-longest-valid-parentheses.html) | 困难 | 栈 · 下标哨兵 · 字符串 |
| 45 | [跳跃游戏 II](problems/45-jump-game-ii.html) | 中等 | 贪心 · 分层(隐式BFS) · 数组 |
| 70 | [爬楼梯](problems/70-climbing-stairs.html) | 简单 | 递归 · 记忆化 · 滚动 DP |
| 55 | [跳跃游戏](problems/55-jump-game.html) | 中等 | 贪心 · 最远可达 · 数组 |
| 62 | [不同路径](problems/62-unique-paths.html) | 中等 | 动态规划 · 二维 DP · 网格 |
| 64 | [最小路径和](problems/64-minimum-path-sum.html) | 中等 | 动态规划 · 二维 DP · 网格 |
| 84 | [柱状图中最大的矩形](problems/84-largest-rectangle-in-histogram.html) | 困难 | 单调栈 · 数组 |
| 118 | [杨辉三角](problems/118-pascals-triangle.html) | 简单 | 递推 · 动态规划 · 数组 |
| 121 | [买卖股票的最佳时机](problems/121-best-time-to-buy-and-sell-stock.html) | 简单 | 一次遍历 · 贪心 · 数组 |
| 152 | [乘积最大子数组](problems/152-maximum-product-subarray.html) | 中等 | 动态规划 · 同时维护最大/最小 · 数组 |
| 200 | [岛屿数量](problems/200-number-of-islands.html) | 中等 | DFS · 洪水填充 · 网格 |
| 215 | [数组中的第 K 个最大元素](problems/215-kth-largest-element-in-an-array.html) | 中等 | 快速选择 · 三路划分 · 数组 |
| 279 | [完全平方数](problems/279-perfect-squares.html) | 中等 | 动态规划 · 完全背包 · 填表 |
| 295 | [数据流的中位数](problems/295-find-median-from-data-stream.html) | 困难 | 对顶堆 · 优先队列 · 设计 |
| 300 | [最长递增子序列](problems/300-longest-increasing-subsequence.html) | 中等 | 动态规划 · 填表 + 记忆化递归树双视角 |
| 322 | [零钱兑换](problems/322-coin-change.html) | 中等 | 动态规划 · 完全背包 · 填表 |
| 322 | [零钱兑换（记忆化递归树）](problems/322-coin-change-tree.html) | 中等 | 记忆化搜索 · 递归树 · 重复子问题 |
| 394 | [字符串解码](problems/394-decode-string.html) | 中等 | 栈 · 字符串 · 递归 |
| 718 | [最长重复子数组](problems/718-maximum-length-of-repeated-subarray.html) | 中等 | 动态规划 · 二维 DP · 数组 |
| 739 | [每日温度](problems/739-daily-temperatures.html) | 中等 | 单调栈 · 数组 |
| 763 | [划分字母区间](problems/763-partition-labels.html) | 中等 | 贪心 · 双指针 · 哈希 |
| 994 | [腐烂的橘子](problems/994-rotting-oranges.html) | 中等 | BFS · 多源 · 分层扩散 · 网格 |
| 1143 | [最长公共子序列](problems/1143-longest-common-subsequence.html) | 中等 | 动态规划 · 二维 DP · 字符串 |

---

持续更新中 · 欢迎按上面的规范继续往里加题 🚀
