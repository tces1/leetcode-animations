# 🎬 LeetCode 算法动画演示集

用可交互的网页动画，把经典算法题的执行过程一步步可视化。纯静态 HTML，**无需任何依赖**，双击即可在浏览器打开。

## 快速开始

直接用浏览器打开 `index.html` 即为首页，点击题目卡片进入对应动画。

每个动画页面通用能力：

- ✏️ **自定义输入** —— 换成自己的用例
- ⏯️ **单步 / 回退 / 自动播放** —— 逐帧看清算法状态变化
- 🔍 **高亮当前处理元素**，实时展示核心数据结构（栈、指针、DP 表等）
- 📄 **内置参考代码**（Java / Python）

## 目录结构

```
leetcode-animations/
├── index.html                    # 首页导航（题目卡片 + 搜索 + 标签筛选）
├── README.md                     # 本文件
└── problems/
    └── 394-decode-string.html    # 394. 字符串解码
```

## 文件命名规范

统一使用 **`题号-英文题名.html`**（题名用小写、连字符分隔）：

| 题号 | 文件名 | 示例 |
|------|--------|------|
| 394 | `394-decode-string.html` | ✅ |
| 20  | `20-valid-parentheses.html` | ✅ |
| 3   | `3-longest-substring-without-repeating-characters.html` | ✅ |

## 如何新增一道题

1. 在 `problems/` 下新建 `题号-英文题名.html`（可复制现有文件做模板，保留顶部的「返回题目列表」导航栏）。
2. 打开 `index.html`，在 `PROBLEMS` 数组里追加一条记录：

   ```js
   {
     id: 20,
     title: "有效的括号",
     titleEn: "Valid Parentheses",
     file: "problems/20-valid-parentheses.html",
     difficulty: "easy",          // easy | medium | hard
     tags: ["栈", "字符串"],
     desc: "用栈匹配括号，遇右括号就检查栈顶。"
   }
   ```

3. 刷新首页即可看到新卡片，搜索与标签筛选会自动生效。

## 题目清单

| # | 题目 | 难度 | 考点 |
|---|------|------|------|
| 394 | [字符串解码](problems/394-decode-string.html) | 中等 | 栈 · 字符串 · 递归 |

---

持续更新中 · 欢迎按上面的规范继续往里加题 🚀
