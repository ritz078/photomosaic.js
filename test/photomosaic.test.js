var expect = chai.expect;

var image = new Image();

describe('PhotoMosaic', function() {
    describe('Accessibility and usage in the DOM', function() {
        it('should throw an error if image is not passed in options', function() {
            expect(PhotoMosaic).to.throw(TypeError);
        });

        it('should be present in the window object', function() {
            expect(window.PhotoMosaic).to.exist;
        })
    })

    describe('Utility functions', function() {
        describe('rgbToHex() method', function() {
            var rgb = {
            	r:55,
            	g:34,
            	b:23
            }

            var photomosaic = new PhotoMosaic({
                'image': image
            });

            it('should return a string', function() {
                expect(photomosaic.rgbToHex(rgb)).to.be.a('string')
            });

            it('should return the correct result', function() {
                expect(photomosaic.rgbToHex(rgb)).to.equal('372217')
            });
        })
    })
})
