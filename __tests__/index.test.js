import Metalsmith from 'metalsmith';
import metalsmithRename from '../src';

const generateFunc = (opts = []) => new Promise((resolve, reject) => {
  Metalsmith(__dirname)
    .source('__templates__') // 模板文件 path
    .use(
      metalsmithRename(opts) // 转换名字
    )
    .process((err, files) => {
      if (err) reject(err);
      resolve(files);
    });
});

describe('metalsmithRename Jest', () => {
  it('Rename:string replace the specified file ', async () => {
    const res = await generateFunc([
      {
        pattern: 'docs/doc.md',
        rename: 'replace.js'
      },
      {
        pattern: 'index.html',
        rename: 'replace.html'
      }
    ]);
    // 路径.特殊 加上[]
    expect(res).toHaveProperty(['replace.html']);
    expect(res).toHaveProperty(['docs/replace.js']);
  });

  it('Rename:string replace the * files', async () => {
    const res = await generateFunc([
      {
        pattern: 'docs/*.md',
        rename: 'replace.js'
      }
    ]);
    expect(res).toHaveProperty(['docs/replace.js']);
    expect(res).not.toHaveProperty(['docs/doc.md']);
  });

  it('Rename:string replace the **', async () => {
    const res = await generateFunc([
      {
        pattern: '**/*.md',
        rename: 'new/path/replace.js'
      }
    ]);
    expect(res).toHaveProperty(['docs/new/path/replace.js']);
    expect(res).not.toHaveProperty(['docs/doc.md']);
  });

  it('Rename:function replace the files', async () => {
    const res = await generateFunc([
      {
        pattern: '**/*.md',
        rename: (name) => `${name}_new`
      }
    ]);
    expect(res).toHaveProperty(['index.html']);
    expect(res).toHaveProperty(['docs/README.md_new']);
    expect(res).toHaveProperty(['intro/intro.md_new']);
    expect(res).toHaveProperty(['docs/next/next.md_new']);
  });

  it('Rename:function use path name  replace the files', async () => {
    const res = await generateFunc([
      {
        pattern: '**/*.md',
        rename: (name) => `/use/new/path/${name}_new`
      },
      {
        pattern: '**/*.js',
        rename: (name) => `use2/new/path/${name}_new`
      },
      {
        pattern: '**/*.yml',
        rename: (name) => `../new/path/${name}_new`
      }
    ]);
    expect(res).not.toHaveProperty(['docs/next/next.md']);
    expect(res).toHaveProperty(['docs/next/use/new/path/next.md_new']);
    expect(res).not.toHaveProperty(['docs/api.js']);
    expect(res).toHaveProperty(['docs/use2/new/path/api.js_new']);
    expect(res).not.toHaveProperty(['docs/next/api.yml']);
    expect(res).toHaveProperty(['docs/new/path/api.yml_new']);
  });
});
