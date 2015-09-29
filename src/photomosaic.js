  (function(window) {

      'use-strict';

      function PhotoMosaic(options) {
          if (!options.image) {
              throw new Error('image options is not passed');
          }
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
      PhotoMosaic.defaults = {
          'tileWidth': 16,
          'tileHeight': 16,
          'progressive': true
      };

      /**
       * Converts RGB into hex colour code
       * @param rgb
       * @returns {string}
       */
      PhotoMosaic.prototype.rgbToHex = function(rgb) {
          var red = rgb.r,
              green = rgb.g,
              blue = rgb.b;

          return ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
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

          return PhotoMosaic.rgbToHex(rgb);
      };

      window.PhotoMosaic = PhotoMosaic;
  }(window));
