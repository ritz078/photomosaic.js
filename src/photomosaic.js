  (function(window) {

      'use-strict';

      function PhotoMosaic(options) {
          if (!options.image) {
              throw new Error('image options is not passed');
          }
          if (!options.targetElement){
            throw new Error('targetElement is not passed in options');
          }

          this.options = this.extend(this.defaults, options);

          var _this = this;

          options.image.crossOrigin = 'Anonymous';

          this.options.image.onload = function() {
              _this.options.divX = Math.floor(_this.options.image.width / _this.options.tileWidth);
              _this.options.divY = Math.floor(_this.options.image.height / _this.options.tileHeight);
              var context = _this.renderImage();
              _this.tileCanvas(context);
          };
      }

      /**
       * Extends a Javascript Object
       * @param  {object} destination The object in which the final extended values are save
       * @param  {object} sources     The objects to be extended
       * @return {}
       */
      PhotoMosaic.prototype.extend = function(destination, sources) {
          for (var source in sources) {
              if (sources.hasOwnProperty(source)) {
                  destination[source] = sources[source];
              }
          }
          return destination;
      };

      /**
       * The defaults options object
       * @type {Object}
       */
      PhotoMosaic.prototype.defaults = {
          'image': null,
          'tileWidth': 6,
          'tileHeight': 6,
          'targetElement': null,
          'tileShape': 'circle',
          'opacity': 1
      };

      /**
       * Renders the image on a canvas before processing the pixels
       * @return {object} Context of the canvas created
       */
      PhotoMosaic.prototype.renderImage = function() {
          var options = this.options;
          var canvas = document.createElement('canvas');

          canvas.width = options.tileWidth * options.divX;
          canvas.height = options.tileHeight * options.divY;

          var context = canvas.getContext('2d');
          context.drawImage(options.image, 0, 0, canvas.width, canvas.height);
          return context;
      };

      /**
       * Returns the average color of the canvas.
       * @param  {Array} data     The data received by using the getImage() method
       * @return {Object}         The object containing the RGB value
       */
      PhotoMosaic.prototype.getAverageColor = function(data) {
          var i = -4,
              pixelInterval = 5,
              count = 0,
              rgb = {
                  r: 0,
                  g: 0,
                  b: 0
              },
              length = data.length;

          while ((i += pixelInterval * 4) < length) {
              count++;
              rgb.r += data[i];
              rgb.g += data[i + 1];
              rgb.b += data[i + 2];
          }

          // floor the average values to give correct rgb values
          rgb.r = Math.floor(rgb.r / count);
          rgb.g = Math.floor(rgb.g / count);
          rgb.b = Math.floor(rgb.b / count);

          return rgb;
      };


      /**
       * Divides the whole canvas into smaller tiles and finds the average
       * colour of each block. After calculating the average colour, it stores
       * the data into an array.
       *
       * @param context   Context of the canvas
       */
      PhotoMosaic.prototype.tileCanvas = function(context) {
          var processedCanvas = document.createElement('canvas');
          processedCanvas.width = context.canvas.width;
          processedCanvas.height = context.canvas.height;

          var processedContext = processedCanvas.getContext('2d');

          var options = this.options;

          for (var i = 0; i < options.divY; i++) {
              for (var j = 0; j < options.divX; j++) {
                  var x = j * options.tileWidth,
                      y = i * options.tileHeight;
                  var imageData = context.getImageData(x, y, options.tileWidth, options.tileHeight);
                  var averageColor = this.getAverageColor(imageData.data);
                  var color = 'rgba(' + averageColor.r + ',' + averageColor.g + ',' + averageColor.b + ',' + this.options.opacity + ')';
                  processedContext.fillStyle = color;
                  this.createMosaic(x, y, processedContext);
              }
          }
          this.options.targetElement.append(processedCanvas);
      };

      /**
       * Creates a block of the mosaic. This is called divX*divY times to create all blocks
       * of the mosaic.
       * @param  {number} x          x coordinate of the block
       * @param  {number} y          y coordinate of the block
       * @param  {object} context    Context of the result canvas
       * @return {}
       */
      PhotoMosaic.prototype.createMosaic = function(x, y, context) {

          var tileWidth = this.options.tileWidth;
          var tileHeight = this.options.tileHeight;

          if (this.options.tileShape === 'circle') {
              var centerX = x + tileWidth / 2;
              var centerY = y + tileHeight / 2;
              var radius = Math.min(tileWidth, tileHeight) / 2;
              context.beginPath();
              context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
              context.closePath();
              context.fill();
          } else if (this.options.tileShape === 'rectangle') {
              var height = tileHeight;
              var width = tileWidth;
              context.beginPath();
              context.rect(x, y, width, height);
              context.closePath();
              context.fill();
          }
      };

      window.PhotoMosaic = PhotoMosaic;
  }(window));
