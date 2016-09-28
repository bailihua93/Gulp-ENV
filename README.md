# Gulp-ENV
Gulp+React+Sass+ES2015+Browserify+Babel6环境的搭建

本环境中：
  没有用到webpack；
  JS文件分为React文件、JS文件、ES2015文件、第三方库文件，最终编译后都放到一个JS文件夹下；
  React文件有多个入口时，可以在path.JSX数组中添加路径；
  ES2015有多个文件时，可以在path.ES数组中添加路径(支持async, class等新功能)；
  使用的babel版本是6，所以.babelrc是需要的；
