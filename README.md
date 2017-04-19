# photomosaic.js ![Travis](https://img.shields.io/travis/rust-lang/rust.svg)

A javascript plugin that creates a photomosaic of an image. Demo is available [here](http://riteshkr.com/photomosaic.js).

![Screen](demo/screen.png)

### Getting started

Install via **npm** `npm install photomosaic.js`

Install via bower `bower install photomosaic.js`

Or Load the file manually

``` html
<script src="path/to/photomosaic.js"></script>
```

### Basic Usage

The minimum set of options required to use this plugin are as follows.

``` javascript
var photomosaic = new PhotoMosaic({
  image         : document.getElementById('image'),
  targetElement : document.getElementById('target'),
  width         : 500,
  height        : 500
})
```

### Advanced Options

| Option        | Default Value | Description                              |
| ------------- | ------------- | ---------------------------------------- |
| image         | null          | [Mandatory] Image element selector   |
| targetElement | null          | [Mandatory] Target element selector  |
| tileWidth     | 5             | The tile division width for creating mosaic (in px) |
| tileHeight    | 5             | The tile division height for creating mosaic (in px) |
| tileShape     | ‘circle'      | The shape of the tiles (**circle** or **rectangle**) |
| opacity       | 1             | Opacity of the resulting image           |
| width         | null          | [Mandatory] Width of the resulting image |
| height        | null          | [Mandatory] Height of the resulting image |
| defaultBackground | 'rgba(0, 0, 0, 0' | Default background to optimize result for png or other image with opacity |

### Example
```javascript
var photomosaic = new PhotoMosaic({
  image         : document.getElementById('image'),
  targetElement : document.getElementById('target'),
  width         : 500,
  height        : 500,
  tileHeight    : 16,
  tileWidth     : 16,
  tileShape     : 'rectangle',
  opacity       : 0.5
})

```

### Contributing

1. Fork and clone the repo.
2. Run `npm install` to install all build dependencies(including Grunt).
3. Create a **new branch**, please DON'T work in your `master` branch directly.
4. Fix stuff or add new feature.
5. This repo follows [Angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit). For this we are using [commitizen](http://commitizen.github.io/cz-cli/). So instead of `git commit`, prefer using `npm run commit` and everything will be automatically done.
6. Update the documentation to reflect any changes.
7. Push to your fork and submit a pull request.

### License

MIT © [Ritesh Kumar](https://github.com/ritz078)
