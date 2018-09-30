import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import cp from 'child_process';
import gutil from 'gulp-util';
import postcss from 'gulp-postcss';
import cssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import BrowserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from './webpack.conf';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import inject from 'gulp-inject';
import cssnano from 'cssnano';

const $ = gulpLoadPlugins();
const browserSync = BrowserSync.create();
const hugoBin = `./bin/hugo.${process.platform === 'win32' ? 'exe' : process.platform}`;
const defaultArgs = ['-d', '../dist', '-s', 'site'];

if (process.env.DEBUG) {
  defaultArgs.unshift('--debug')
}

gulp.task('hugo', (cb) => buildSite(cb));
gulp.task('hugo-preview', (cb) => buildSite(cb, ['--buildDrafts', '--buildFuture']));
gulp.task('build', ['copy', 'css', 'js', 'hugo']);
gulp.task('build-preview', ['copy', 'css', 'js', 'hugo-preview']);

gulp.task('stylus', () => {
  const autoload = ['rupture', 'vars'];

  return gulp.src(`./src/stylus/**/!(${autoload.join('|')}).styl`)
    .pipe($.plumber())
    .pipe($.changedInPlace({
      firstPass: true,
    }))
    .pipe($.stylus({
      import: autoload.map(filename => `${__dirname}/src/stylus/${filename}.styl`),
    }))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 5 versions', 'Android >= 3', 'Firefox ESR', 'Opera 12.1']
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => (
  gulp.src('./src/css/*.css')
    .pipe(postcss([
      cssImport({from: './src/css/main.css'}),
      cssnext(),
      cssnano(),
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
));

gulp.task('js', (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task('sprite', () => {
  const svgs = gulp
    .src('site/static/img/icons/*.svg')
    .pipe($.plumber())
    .pipe($.rename(path => {
      path.basename = `ico_${path.basename}`;
    }))
    .pipe($.svgmin())
    .pipe($.svgstore())
    .pipe($.cheerio({
      run: $ => {
        const needlessEls = ['title', 'style'];
        const needlessAttrs = ['fill', 'style', 'class', 'stroke', 'opacity'];

        for (let el of needlessEls) {
          $(el).remove();
        }
        for (let attr of needlessAttrs) {
          $(`[${attr}]`).removeAttr(attr);
        }
      },
      parserOptions: {
        xmlMode: true,
      },
    }));

  return gulp
    .src('site/layouts/partials/sprite.html')
    .pipe(inject(svgs, {
      transform: (filePath, file) => file.contents.toString().replace(/^.*<svg/, '<svg'),
    }))
    .pipe(gulp.dest('site/layouts/partials/'));
});

gulp.task('copy', () => {
  return del([
    `${__dirname}/dist/fonts`,
  ]).then(() => {
    gulp.src('./src/fonts/**/*.*').pipe(gulp.dest('./dist/fonts'));
  });
});

gulp.task('server', ['hugo', 'stylus', 'css', 'js', 'sprite', 'copy'], () => {
  browserSync.init({
    port: 9003,
    reloadDebounce: 200,
    notify: false,
    open: false,
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/stylus/**/*.styl', ['stylus']);
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./site/static/img/icons/*.svg', ['sprite']);
  gulp.watch('./site/**/*', ['hugo']);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: 'inherit'}).on('close', (code) => {
    if (code === 0) {
      browserSync.reload('notify:false');
      cb();
    } else {
      browserSync.notify('Hugo build failed :(');
      cb('Hugo build failed');
    }
  });
}
