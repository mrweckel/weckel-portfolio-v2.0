# gulp-s3-deploy 

> An Amazon AWS S3 deployment plugin for [gulp](https://github.com/wearefractal/gulp)

## Install

Add `gulp-s3-deploy` as a development dependency:

```shell
npm install --save-dev gulp-s3-deploy
```

## Usage

Configure your credentials and bucket: 

```javascript
var s3Credentials = {
  "key":    "AKIAI3Z7CUAFHG53DMJA",
  "secret": "acYxWRu5RRa6CwzQuhdXEfTpbQA+1XQJ7Z1bGTCx",
  "bucket": "dev.example.com",
  "region": "eu-west-1"
};
```

In your gulp task, deploy your files:

```javascript
var s3 = require( "gulp-s3" );
gulp.src( './public/**' )
    .pipe( s3( s3Credentials ) );
```

## API

#### options.headers

Type: `Array`          
Default: `[]`

Headers to set to each file uploaded to S3

```javascript
var options = { headers: {'Cache-Control': 'max-age=315360000, no-transform, public'} }
gulp.src('./dist/**', {read: false})
    .pipe(s3(aws, options));
```

#### options.gzStrip

Type: `Boolean`
Default: `false`

If set the gz extension of files will be removed.

#### options.gzOnly

Type: `Boolean`          
Default: `false`

If set, only files with a gz extension will be uploaded.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
[npm-url]: https://npmjs.org/package/gulp-s3-deploy

