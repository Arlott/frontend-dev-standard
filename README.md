# frontend-dev-standard

前端开发规范工具集 Monorepo，提供统一的 ESLint、Prettier、Stylelint、Commitlint、TypeScript 配置，以及快速初始化项目的 CLI 工具。

## 包列表

| 包名 | 版本 | 说明 |
|------|------|------|
| [`@fds/cli`](./packages/cli) | 0.1.0 | CLI 工具，快速初始化项目规范 |
| [`@fds/eslint-config-base`](./packages/eslint-config-base) | 0.1.0 | 基础 ESLint 配置（TypeScript）|
| [`@fds/eslint-config-react`](./packages/eslint-config-react) | 0.1.0 | React ESLint 配置 |
| [`@fds/eslint-config-vue`](./packages/eslint-config-vue) | 0.1.0 | Vue 3 ESLint 配置 |
| [`@fds/prettier-config`](./packages/prettier-config) | 0.1.0 | Prettier 配置 |
| [`@fds/stylelint-config`](./packages/stylelint-config) | 0.1.0 | Stylelint 配置 |
| [`@fds/commitlint-config`](./packages/commitlint-config) | 0.1.0 | Commitlint 配置 |
| [`@fds/tsconfig`](./packages/tsconfig) | 0.1.0 | TypeScript 配置（base / browser / node / react / vue）|

## 快速开始

### 使用 CLI 初始化项目

```bash
# 安装 CLI
npm install -g @fds/cli

# 交互式初始化（React 项目）
fds init -t react

# 交互式初始化（Vue 项目）
fds init -t vue

# 初始化 Svelte 项目，跳过确认提示
fds init -t svelte -y

# 初始化 Node 项目，跳过确认提示
fds init -t node -y

# 初始化通用浏览器/前端项目（vanilla、angular 等）
fds init -t vanilla -y

# 未指定模板时，交互式选择
fds init
```

### 手动安装各配置包

#### ESLint

**基础配置（TypeScript 通用）**

```bash
npm install -D @fds/eslint-config-base eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

`.eslintrc.js`：

```js
module.exports = {
  extends: ['@fds/eslint-config-base'],
};
```

**React 项目**

```bash
npm install -D @fds/eslint-config-react eslint eslint-plugin-react eslint-plugin-react-hooks
```

`.eslintrc.js`：

```js
module.exports = {
  extends: ['@fds/eslint-config-react'],
};
```

**Vue 3 项目**

```bash
npm install -D @fds/eslint-config-vue eslint eslint-plugin-vue vue-eslint-parser
```

`.eslintrc.js`：

```js
module.exports = {
  extends: ['@fds/eslint-config-vue'],
};
```

#### Prettier

```bash
npm install -D @fds/prettier-config prettier
```

`package.json`：

```json
{
  "prettier": "@fds/prettier-config"
}
```

主要规则：单引号、2 空格缩进、行尾逗号、行宽 100、LF 换行。

#### Stylelint

```bash
npm install -D @fds/stylelint-config stylelint stylelint-config-standard
```

`.stylelintrc.js`：

```js
module.exports = {
  extends: ['@fds/stylelint-config'],
};
```

#### Commitlint

```bash
npm install -D @fds/commitlint-config @commitlint/cli
```

`commitlint.config.js`：

```js
module.exports = {
  extends: ['@fds/commitlint-config'],
};
```

支持的 commit 类型：`feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `build` / `ci` / `chore` / `revert`，subject 最大长度 100。

#### TypeScript 配置

```bash
npm install -D @fds/tsconfig typescript
```

根据项目类型在 `tsconfig.json` 中继承：

```json
// Node 项目
{ "extends": "@fds/tsconfig/node.json" }

// React 项目
{ "extends": "@fds/tsconfig/react.json" }

// Vue 项目
{ "extends": "@fds/tsconfig/vue.json" }

// 通用浏览器/前端项目（Svelte、Angular、Vanilla 等）
{ "extends": "@fds/tsconfig/browser.json" }

// 纯 TypeScript / 其他
{ "extends": "@fds/tsconfig/base.json" }
```

## 示例项目

[`examples/`](./examples) 目录下提供了三个示例，展示了各配置的完整用法：

- [`examples/node-app`](./examples/node-app) — Node.js 应用示例
- [`examples/react-app`](./examples/react-app) — React 应用示例
- [`examples/vue-app`](./examples/vue-app) — Vue 3 应用示例

## 本地开发

本项目使用 [pnpm workspace](https://pnpm.io/workspaces) 管理 Monorepo。

**环境要求：** Node.js >= 18，pnpm >= 8

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 代码检查
pnpm lint

# 运行测试
pnpm test

# 清理构建产物
pnpm clean
```

## License

[MIT](./LICENSE)
