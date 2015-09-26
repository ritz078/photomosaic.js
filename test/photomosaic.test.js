var expect = chai.expect;

describe('PhotoMosaic', function() {
        it('should throw an error if image is not passed in options', function() {
            expect(PhotoMosaic).to.throw(TypeError);
        });

        it('should be present in the window object', function(){
        	expect(window.PhotoMosaic).to.exist;
        })
})
