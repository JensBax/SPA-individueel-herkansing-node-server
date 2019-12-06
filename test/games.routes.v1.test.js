var chai = require('chai');
var chaiHttp = require('chai-http');
var gameServer = require('../api/games.routes.v1');
var chould = chai.should();

chai.use(chaiHttp);

describe('Games Test', function () {

    it('should GET /api/v1/game correctly', function (done) {
        chai.request(gameServer)
            .get('/api/v1/games')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    

});