import gulp from "gulp";

//Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

import gulpif from "gulp-if";

//Плагины
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

// Обработка Image
export default () => {
  return gulp
    .src(path.img.src)
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "Image",
          message: error.message,
        })),
      })
    )
    .pipe(gp.newer(path.img.dest))
    .pipe(gp.webp())
    .pipe(gulp.dest(path.img.dest))
    .pipe(gulp.src(path.img.src))
    .pipe(gp.newer(path.img.dest))
    .pipe(gulpif(app.isProd, gp.imagemin(app.imagemin)))
    .pipe(gulp.dest(path.img.dest));
};
