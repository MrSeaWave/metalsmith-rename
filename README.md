# metalsmith-rename

重命名文件的 metalsmith 插件

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

## CHANGELOG

[CHANGELOG.md](https://github.com/MrSeaWave/metalsmith-rename/blob/main/CHANGELOG.md)

## TODOLIST

--

## Contributing

如何贡献代码查看 [CONTRIBUTING](https://github.com/MrSeaWave/metalsmith-rename/blob/main/CONTRIBUTING.md)
