# React 知识点思维导图

├── 基础概念
│   ├── 组件（Components）
│   │   ├── 函数组件（Functional Components）
│   │   ├── 类组件（Class Components）
│   │   └── 组件复用（Component Reusability）
│   ├── 状态（State）
│   │   ├── 本地状态（Local State）
│   │   ├── 全局状态管理（Global State Management，如 Redux）
│   │   └── 状态提升（State Lifting）
│   ├── 属性（Props）
│   ├── 事件处理（Event Handling）
│   ├── JSX（JavaScript XML）
│   ├── 生命周期方法（Lifecycle Methods）（类组件中）
│   ├── 钩子（Hooks）（函数组件中）
│   ├── 虚拟 DOM（Virtual DOM）
│   └── 渲染（Rendering）
├── 组件通信
│   ├── 父组件向子组件传递数据（Props）
│   ├── 子组件向父组件通信（Callbacks）
│   ├── 兄弟组件通信（通过父组件中转）
│   └── 上下文（Context API）
├── 高级概念
│   ├── 路由（Routing，如 React Router）
│   ├── 表单处理（Form Handling）
│   ├── 性能优化（Performance Optimization）
│   │   ├── 懒加载（Lazy Loading）
│   │   ├── 代码拆分（Code Splitting）
│   │   ├── PureComponent 和 shouldComponentUpdate
│   │   └── 使用 React.memo 优化函数组件
│   ├── 动画与过渡（Animations and Transitions）
│   ├── 服务器端渲染（Server-Side Rendering，SSR）
│   ├── 静态网站生成（Static Site Generation，SSG）
│   └── TypeScript 与 React（为 React 组件添加类型）
├── 工具与库
│   ├── Create React App（CRA）
│   ├── React Developer Tools
│   ├── Redux（状态管理）
│   ├── React Router（路由管理）
│   ├── Axios（数据请求）
│   ├── MobX（另一种状态管理库）
│   └── styled-components 或 Emotion（CSS-in-JS 解决方案）
└── 最佳实践与模式
    ├── 单一职责原则（SRP）
    ├── 组件拆分（Component Splitting）
    ├── 代码复用（Code Reusability）
    ├── 清晰的组件层次结构（Clear Component Hierarchy）
    ├── 使用 PropTypes 进行类型检查（For Class Components）
    ├── TypeScript（为函数组件和类组件添加静态类型检查）
    ├── 代码格式化与 linting（如 Prettier 和 ESLint）
    └── 测试（Testing，如 Jest 和 React Testing Library）