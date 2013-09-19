var Dijkstra = function() {
  this.nodes = {};
  this.startNode = {};
  this.endNode = {};
  this.currentNode = {};
  this.order = 1;
  this.shortest = {};
  this.path = [];
  this.source = null;

  this.plot = function(source, start, end) {
    // debugger;
    // Define the source
    this.source = source;
    // Set preliminary nodes
    this.startNode = start;
    this.endNode = end;
    this.currentNode = start;
    // Set up the start node as a permanent node, 0 distance away from itself
    this.addNode(start.city, this.order, 0);
    this.findPath();
    this.finished = false;
  };

  this.addNode = function(city, order, distance, working) {
    typeof(order) !== 'undefined' ? order = order : order = null;
    typeof(distance) !== 'undefined' ? distance = distance : distance = null;
    typeof(working) !== 'undefined' ? working = working : working = null;
    this.nodes[city] = {
      order: order,
      distance: distance,
      working: working
    };
  };

  this.traceBack = function() {
    var roads = this.currentNode.roads;
    // Base case:
    if (this.currentNode === this.startNode) {
      this.path = this.path.reverse();
      this.finished = true;
    } else {
      // 7. Loop through all the roads connected to the end point
      for (var i = 0; i < roads.length; i += 1) {
        if (!this.finished) {
          // 8. Find the road we took to get here: 
          // Is the total distance at the current node less the distance of the target city equal to the working distance of that city. If this is true, we came this way
          var targetCityWorkingValue = (this.nodes[roads[i][0]].working) ? parseFloat(this.nodes[roads[i][0]].working.toFixed(8)) : 0;
          var distanceToTargetCity = this.nodes[this.currentNode.city].distance - roads[i][1];
          if (distanceToTargetCity !== 0) {
            distanceToTargetCity = parseFloat(distanceToTargetCity.toFixed(8));
          }
          if (targetCityWorkingValue === distanceToTargetCity) {
            // Found the right path back. Save it to the storage
            this.path.push(roads[i][0]);
            // 9. Move to this city
            for (var j = 0; j < this.source.length; j += 1) {
              if (parseInt(roads[i][0]) === this.source[j].city) {
                this.currentNode = this.source[j];
                break;
              }
            }
            // 10. Recurse
            this.traceBack();
          }
        }
      }
    }
  };

  this.findPath = function() {
    var city, distance, check;
    var roads = this.currentNode.roads;
    // Base case:
    if (this.currentNode === this.endNode) {
      // 6. Trace your path back to the start node by subtracting distances
      this.path.push(this.currentNode.city);
      this.traceBack();
    } else {
      // 1. Create nodes for each road connecting to a city and assign temporary, working values. Only consider roads that haven't been given permanent labels.
      for (var i = 0; i < roads.length; i += 1) {
        city = roads[i][0];
        distance = roads[i][1];
        // Only assess this city if it doesn't have a permanent label
        check = this.nodes[city] && this.nodes[city].order;
        if (!check) {
          // Assign working labels to each dijkstra city node
          if (this.nodes[city]) {
            // If the cumulative distance on the current node + the distance down this road is less than the working value stored there, set it. If not do nothing
            if ((this.nodes[this.currentNode.city].working + distance) < this.nodes[city].working) {
              this.nodes[city].working += distance;
            }
          } else {
            // There was no node for this city so we create it and assign it the distance
            this.addNode(city, null, null, this.nodes[this.currentNode.city].distance + distance);
          }
        }
      }
      
      // 2. Loop all the dijkstra nodes that don't have permanent labels to find the one with the shortest distance
      for (var key in this.nodes) {
        // Only check nodes that don't have an order property (aka temporary labels)
        if (!this.nodes[key].order) {
          if (this.shortest.distance) {
            if (this.nodes[key].working < this.shortest.distance) {
              this.shortest.distance = this.nodes[key].working;
              this.shortest.city = key;
            }
          } else {
            this.shortest.distance = this.nodes[key].working;
            this.shortest.city = key;
          }
        }
      }

      // 3. Assign a permanent label of distance to the node with the shortest distance
      this.nodes[this.shortest.city].order = this.order += 1;
      // Also assign the permanent distance
      this.nodes[this.shortest.city].distance += this.shortest.distance;

      // 4. Move to the new node (assign it to the current) and wipe away the values in shortest
      // TODO: Unfortunately this requires a loop through the this.source array (again) because the data it's saved in is an array. A hash table might serve better
      for (var i = 0; i < this.source.length; i += 1) {
        if (parseInt(this.shortest.city) === this.source[i].city) {
          this.currentNode = this.source[i];
          break;
        }
      }
      // Wipe shortest object
      this.shortest = {};

      // 5. Call findPath again. The new parameters have all been set -- see base case above for how the function should end
      this.findPath();
    }
  };

};

// Node.js compatability
if (typeof module !== 'undefined') {
  module.exports = Dijkstra;
}