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

        describe('extend() method', function () {
            var a = {
                x:2,
                y:3,
                z:true
            }

            var b = {
                x:5,
                z:false
            }

            var result = {
                x:5,
                y:3,
                z:false
            }

            var photomosaic = new PhotoMosaic({
                'image': image
            });


            it('should return an object', function () {
                expect(photomosaic.extend(a,b)).to.be.a('object');
            });

            it('should extend an object', function () {
                expect(photomosaic.extend(a,b)).to.eql(result);
            });
        });
    })
})
