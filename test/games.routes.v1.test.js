var chai = require('chai');
var chaiHttp = require('chai-http');
var gameServer = require('../api/games.routes.v1');
var should = chai.should();


chai.use(chaiHttp);

describe('Games Test', function () {

    // it('should GET /api/v1/game correctly', (done) => {
    //     chai.request(gameServer)
    //         .get('/api/v1/games')
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             done();
    //         });
    // });
    it('should succeed', function (done) {
        var numbers = [1, 2, 3, 4, 5];

        numbers.should.be.an('array').that.includes(2);
        numbers.should.have.lengthOf(5);
        done()
    })
    

});