# metalsmith-rename

重命名文件的 metalsmith 插件

[![npm (scoped)](https://img.shields.io/npm/v/@swjs/metalsmith-rename)](https://www.npmjs.com/package/@swjs/metalsmith-rename)
[![npm](https://img.shields.io/npm/dw/@swjs/metalsmith-rename)](https://www.npmjs.com/package/@swjs/metalsmith-rename)
[![TESTS CI](https://github.com/MrSeaWave/metalsmith-rename/actions/workflows/tests.yml/badge.svg?branch=main&event=push)](https://github.com/MrSeaWave/metalsmith-rename/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/MrSeaWave/metalsmith-rename/branch/main/graph/badge.svg?token=u4OCGK2Cuw)](https://codecov.io/gh/MrSeaWave/metalsmith-rename)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

## 安装

```bash
$ npm i @swjs/metalsmith-rename
```

## 基本用法

```js
const { Minimatch } = require('minimatch');
const metalsmithRename = require('@swjs/metalsmith-rename');

Metalsmith(__dirname)
  .use(
    metalsmithRename([
      {
        pattern: 'docs/*.md',
        rename: (name) => {
          const newName = name.replace('doc', 'projectName');
          return newName;
        },
      },
      {
        pattern: 'docs/api.js',
        rename: 'test.js',
      },
    ])
  )
  .build();
```

## 参数

| 参数    | 说明                                                                                                 | 类型                                   | 默认值 |
| :------ | :--------------------------------------------------------------------------------------------------- | :------------------------------------- | :----- |
| pattern | 匹配模式（遵循 [minimatch] 规则）                                                                    | `string`                               | -      |
| rename  | pattern 被匹配后，rename 如果是`string`:那么直接替换文件名，如果是`function`，则执行函数返回新的名字 | `string` \| `function(string)=>string` | -      |

```js
const options = [
  {
    pattern: 'docs/**/*.md',
    rename: function (name) {
      return 'renamed' + name;
    },
  }, // ====> docs/**/renamed+*.md
  {
    pattern: 'public/about.html',
    rename: 'index.html',
  }, // ====> public/index.html
];
```

## CHANGELOG

[CHANGELOG.md](https://github.com/MrSeaWave/metalsmith-rename/blob/main/CHANGELOG.md)

## TODOLIST

--

## Contributing

如何贡献代码查看 [CONTRIBUTING](https://github.com/MrSeaWave/metalsmith-rename/blob/main/CONTRIBUTING.md)
