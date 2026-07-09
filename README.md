# 🎬 LeetCode 算法动画演示集

用可交互的网页动画，把经典算法题的执行过程一步步可视化。纯静态 HTML，**无需任何依赖**，双击对应文件即可在浏览器打开。

## 快速开始

- **在线**：部署到 GitHub Pages 后，打开首页 `index.html`，题目卡片会**自动从 `problems/` 目录生成**（点卡片进入动画）。
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
├── index.html                    # 首页：自动扫描 problems/ 生成题目卡片
├── .nojekyll                     # 让 GitHub Pages 原样托管静态文件
├── README.md                     # 本文件
└── problems/                     # 所有动画，一题一个文件
    ├── 84-largest-rectangle-in-histogram.html  # 84. 柱状图中最大的矩形
    ├── 394-decode-string.html    # 394. 字符串解码
    └── 739-daily-temperatures.html  # 739. 每日温度
```

## 文件命名规范

统一使用 **`题号-英文题名.html`**（题名用小写、连字符分隔），文件名自带题号，靠命名即可排序、检索，无需额外索引页：

| 题号 | 文件名 | 示例 |
|------|--------|------|
| 394 | `394-decode-string.html` | ✅ |
| 20  | `20-valid-parentheses.html` | ✅ |
| 3   | `3-longest-substring-without-repeating-characters.html` | ✅ |

## 如何新增一道题

在 `problems/` 下新建 `题号-英文题名.html`（复制现有文件当模板最快，保留顶部导航栏即可）。**无需改动 `index.html` 或本文件的任何内容** —— 首页会自动扫描目录，从题目文件自身的 `<title>` 和难度标签生成卡片。push 后刷新首页即可看到新题。

## 题目清单

| # | 题目 | 难度 | 考点 |
|---|------|------|------|
| 84 | [柱状图中最大的矩形](problems/84-largest-rectangle-in-histogram.html) | 困难 | 单调栈 · 数组 |
| 394 | [字符串解码](problems/394-decode-string.html) | 中等 | 栈 · 字符串 · 递归 |
| 739 | [每日温度](problems/739-daily-temperatures.html) | 中等 | 单调栈 · 数组 |

---

持续更新中 · 欢迎按上面的规范继续往里加题 🚀
