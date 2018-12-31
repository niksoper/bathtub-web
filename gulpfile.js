const gulp = require('gulp');
const del = require('del');
const merge = require('merge-stream');
const args = require('yargs').argv;
const path = require('path');
const webpack = require('webpack-stream');

const rm_core = require('rocketmake');
const rm_semver = require('rocketmake-semver');
const rm_nuget = require('rocketmake-nuget');

const structure = rm_core.structure({
  packagePath: 'deployment',
  sourcePath: 'www'
});

let version = {
  semver: '0.0.0-unset',
}

const config = {

  buildType: args.env || 'local',

  nupkgs: function () {
    const apiKey = 'ctdj1COppd7iPafw0RKp';
    const url = 'https://proget.emortal.com:444/nuget/Products';

    const pkgs = [
      {
        file: path.join(structure.outputPackagePath, `emortal.WebAdmin.${version.semver}.nupkg`),
        url: url,
        apiKey: apiKey
      },
    ];

    return pkgs
  },

  nuspecs: [
    'emortal.WebAdmin.nuspec',
  ]
};

gulp.task('getVersion', function () {
  return rm_semver(config.buildType).then(function (v) {
    console.log(version = v);
  });
});

gulp.task('cleanWork', function() {
  return del([structure.workPath])
});

gulp.task('toWork', ['cleanWork'], function() {
  const sourceStream = gulp.src(path.join(structure.sourcePath, '**', '*'), {base: '.'});
  const packageStream = gulp.src(path.join(structure.packagePath, '**', '*'), {base: '.'});

  return merge(sourceStream, packageStream).pipe(gulp.dest(structure.workPath));
});

gulp.task('pack', ['toWork', 'getVersion'], function () {
  return rm_nuget.pack({
    outputDir: structure.outputPackagePath,
    packagePath: structure.workPackagePath,
    nuspecs: config.nuspecs,
    basePath: structure.workPath,
    version: version
  });
});

gulp.task('push', ['pack'], function () {
  if (!!['prod', 'test'].includes(config.buildType)) {
    return rm_nuget.push({ nupkgs: config.nupkgs() });
  }
})

gulp.task('default', ['push'])