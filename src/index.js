import path from 'path';
import { Minimatch } from 'minimatch';

/**
 * @desc 只转换目录下的文件名。
 * @param {array} options options,pattern: 使用 minimatch 去匹配filename
 * @return {(function(*=, *, *): void)|*}
 */
function metalsmithRename(options = []) {
  return (files, _, done) => {
    // 转换名字
    options.forEach((opt) => {
      const { pattern, rename } = opt;
      const matcher = Minimatch(pattern);

      Object.keys(files).forEach((filename) => {
        if (!matcher.match(filename)) {
          return;
        }

        // 返回目录名
        let newFilename = path.dirname(filename);

        // 防止是根目录
        if (newFilename === '.') {
          newFilename = '';
        }

        if (typeof rename === 'function') {
          // 先返回目录最后一部分，在和新目录组合在一起
          newFilename = path.join(newFilename, rename(path.basename(filename)));
        } else {
          newFilename = path.join(newFilename, rename);
        }

        if (newFilename !== filename) {
          files[newFilename] = files[filename];
          delete files[filename];
        }
      });
    });

    done();
  };
}

export default metalsmithRename;
