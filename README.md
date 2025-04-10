# NonoGram
数织扫雷游戏

这是一个使用 React + TypeScript + Vite 构建的数织（Nonogram）逻辑游戏。玩家通过观察每行每列的提示数字，在网格中填色或打叉，最终还原出一幅隐藏图案。

---

## 🧩 项目结构

```
nono/
├── public/
│   └── images/           # 可选图片资源
├── src/
│   ├── components/       # UI 组件，如 Tile、GameBoard
│   ├── hooks/            # 自定义 Hook：useGame.ts
│   ├── models/           # 数据类型接口，如 Tile.ts
│   ├── utils/            # 工具函数，如 gameLogic.ts
│   ├── views/            # 页面组件：GamePage.tsx
│   ├── data/             # 关卡 JSON 文件（level01.json ~ level10.json）
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts        # Vite 配置
└── README.md             # 项目说明文件
```

---

## 🚀 快速开始

```bash
npm install
npm run dev
```

打开浏览器访问：`http://localhost:5173`

---

## 🔢 游戏规则

- 根据每一行/列的提示数字，在网格中填黑或打叉；
- 提示数字代表连续的黑格数；多个数字表示之间有空格隔开；
- 鼠标左键：涂黑 / 取消涂黑；
- 鼠标右键：打叉 / 取消打叉；
- 每个关卡最多可犯错 3 次（共 6 点生命值，每 2 点显示为 1 颗 ❤️）；
- 如果格子误填/误叉，生命扣 1 点并锁定该格子为正确状态；
- 全部格子正确即通关；生命耗尽则失败。

---

## 🎮 功能特性

- ✅ 10 个内置关卡（level01 ~ level10），支持自动加载；
- ✅ 使用 import.meta.glob 自动读取 JSON 文件，无需手动导入；
- ✅ 支持关卡选择、通关与失败提示；
- ✅ 响应式布局，页面居中显示；
- ✅ 错误操作自动锁定格子，防止重复扣血；

---

## 🧠 TODO / 可扩展方向

- 关卡编辑器（自定义关卡）
- 存档系统
- 动画/音效增强体验
- 移动端适配
- 关卡解谜引擎 / AI 自动解

---

## 📁 添加关卡

将形如 `level01.json`、`level02.json` 的 JSON 文件放入 `src/data/` 目录即可被自动识别。

示例 JSON：
```json
{
    "rows": 3,
    "cols": 3,
    "rowHints": [
        [1],
        [3],
        [1]
    ],
    "colHints": [
        [1],
        [3],
        [1]
    ],
    "solution": [
        [false, true, false],
        [true, true, true],
        [false, true, false]
    ]
}
```

---

## 🛠 技术栈

- React + TypeScript
- Vite + import.meta.glob
- CSS Flex/Grid 布局

---

## 🧑‍💻 作者

数织开发团队 | FusionGameHub

Enjoy the puzzle!

