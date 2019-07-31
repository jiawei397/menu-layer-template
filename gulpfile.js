/**
 * 此类专门用来压缩图层面板包
 * @author jw
 * @date 2017-04-01
 */
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');
const rename = require('gulp-rename');
const dateFormat = require('dateformat');
const fs = require('fs');
const utils = require('util');
const readdir = utils.promisify(fs.readdir);
const babel = require('gulp-babel');
const path = require('path');
const chalk = require('chalk');
/**
 * @param {String} fileName 要压缩的js文件名称
 * @param {String} filePath 要压缩的js文件路径
 * @param {String} destDir 压缩后的zip包路径
 * @author jw
 * @date 2017-04-01
 */
let zipFrame = function (fileName, filePath, destDir = 'dist') {
  if (fileName.endsWith('.js')) {
    fileName = fileName.substring(0, fileName.length - 3);
  }
  let zipName = fileName + '_' + dateFormat(new Date(), 'yyyymmdd') + '.zip';
  return gulp.src(path.join(filePath, fileName + '.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename('frame.js'))
    .pipe(zip(zipName))
    .pipe(gulp.dest(destDir));
};

let getAllFiles = async (filePath, arr = []) => {
  let dirents = await readdir(filePath, {withFileTypes: true});
  let promises = [];
  dirents.forEach((dirent) => {
    if (typeof dirent === 'string') {
      throw new Error('nodejs version need update to v10.16');
    }
    if (dirent.isDirectory()) {
      promises.push(getAllFiles(path.join(filePath, dirent.name), arr));
    } else {
      // console.log(filePath, dirent.name);
      arr.push({
        fileName: dirent.name,
        filePath
      });
    }
  });
  return Promise.all(promises);
};


/**
 * 打包图层面板包
 */
gulp.task('default', async () => {
  let arr = [];
  let src = 'src';
  let destDir = 'dist';
  await getAllFiles(src, arr);
  // console.log(arr);
  return Promise.all(arr.map(({fileName, filePath}) => {
    return zipFrame(fileName, filePath, filePath.replace(src, destDir));
  })).catch((err) => {
    console.log(`${chalk.red(err)}`);
  });
});

