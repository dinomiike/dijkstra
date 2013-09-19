if (typeof require !== 'undefined') {
  var expect = require('chai').expect;
  var Dijkstra = require('../dijkstra.js');
}

var dijkstra;
var nodes; // Container for the nodes plotted from the graph
var start, end; // Variables to hold the start and end nodes
var simpleCityGraph = '[{"city":1,"x":200,"y":100,"fromOrigin":223.60679774997897,"roads":[[0,265.75364531836624,25,300],[3,297.3213749463701,400,320],[5,350,550,100]]},{"city":0,"x":25,"y":300,"fromOrigin":301.0398644698074,"roads":[[1,265.75364531836624,200,100],[3,375.53295461250804,400,320],[2,305,80,600]]},{"city":3,"x":400,"y":320,"fromOrigin":512.2499389946279,"roads":[[1,297.3213749463701,200,100],[0,375.53295461250804,25,300],[5,266.27053911388697,550,100],[2,425.20583250938597,80,600],[4,300.66592756745814,420,620],[6,359.02646142032484,750,400]]},{"city":5,"x":550,"y":100,"fromOrigin":559.0169943749474,"roads":[[1,350,200,100],[3,266.27053911388697,400,320],[6,360.5551275463989,750,400]]},{"city":2,"x":80,"y":600,"fromOrigin":605.3098380168623,"roads":[[0,305,25,300],[3,425.20583250938597,400,320],[4,340.58772731852804,420,620]]},{"city":4,"x":420,"y":620,"fromOrigin":748.8658090739622,"roads":[[3,300.66592756745814,400,320],[2,340.58772731852804,80,600],[6,396.6106403010388,750,400]]},{"city":6,"x":750,"y":400,"fromOrigin":960.4686356149273,"roads":[[3,359.02646142032484,400,320],[5,360.5551275463989,550,100],[4,396.6106403010388,420,620]]}]';

describe('Instantiation and basic checks', function() {
  dijkstra = new Dijkstra();

  it('should contain basic properties with initial values', function() {
    expect(dijkstra.nodes).to.be.an('object');
    expect(dijkstra.startNode).to.be.an('object');
    expect(dijkstra.endNode).to.be.an('object');
    expect(dijkstra.currentNode).to.be.an('object');
    expect(dijkstra.order).to.equal(1);
    expect(dijkstra.shortest).to.be.an('object');
    expect(dijkstra.path).to.be.an('array');
  });

  it('should have all the required methods', function() {
    expect(dijkstra.plot).to.be.a('function');
    expect(dijkstra.addNode).to.be.a('function');
    expect(dijkstra.traceBack).to.be.a('function');
    expect(dijkstra.findPath).to.be.a('function');
  });
});

describe('A simple graph', function() {
  // Set up a sample data set
  nodes = JSON.parse(simpleCityGraph);

  it('should set start to 0 and end to 6', function() {
    start = nodes[1];
    end = nodes[6];

    expect(start.city).to.equal(0);
    expect(end.city).to.equal(6);
  });

  it('should find the shortest path from point 0 to point 6', function() {
    dijkstra = new Dijkstra();
    dijkstra.plot(nodes, start, end);
    expect(dijkstra.path).to.eql([0, 3, 6]);
  });

  it('should set start to 0 and end to 5', function() {
    start = nodes[1];
    end = nodes[3];
    expect(start.city).to.equal(0);
    expect(end.city).to.equal(5);
  });

  it('should find the shortest path from point 0 to point 5', function() {
    dijkstra = new Dijkstra();
    dijkstra.plot(nodes, start, end);
    expect(dijkstra.path).to.eql([0, 1, 5]);
  });

  it('should set start to 2 and end to 1', function() {
    start = nodes[4];
    end = nodes[0];
    expect(start.city).to.equal(2);
    expect(end.city).to.equal(1);
  });

  it('should find the shortest path from point 2 to point 1', function() {
    dijkstra = new Dijkstra();
    dijkstra.plot(nodes, start, end);
    expect(dijkstra.path).to.eql([2, 0, 1]);
  });
});