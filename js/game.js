
angular.module('World', []).
    factory('World', function(){
        function checkWorldBoundaries(world, x, y) {
            return world[x] != null && world[y] != null;
        };
        // function to build the world
        function buildWorld(row, column) {
            var newWorld = [];
            for (var i=0; i< row; i++) {
                newWorld[i]=[];
                for(var j=0;j <column; j++) {
                    newWorld[i].push(buildCell(newWorld,i,j));
                }
            }
            return newWorld;
        };
        // function to build cells in world
        // stuff
        function duffy() {
            console.log('this is duffy');

        }
        function buildCell(world, x, y) {
             return {
                 'world': world,
                 'isAlive': false,
                 'posX': x,
                 'posY': y,
                 // toggle alive/dead
                 'toggle': function() {
                     this.isAlive ? this.isAlive = false : this.isAlive = true;
                 },
                 // kill a cell
                 'kill' : function() {
                     this.isAlive = false;
                 },
                 // birth a cell
                 'born' : function() {
                     this.isAlive = true;
                 },
                 // define neighbors 
                 'neighbors': function() {
                    var neighbors = 0;
                        for(var i=-1;i<=1; i++) {
                            for(var j=-1;j<=1; j++) {
                                // Skip current cell
                                if(i==0 && j==0) {
                                    continue;
                                }
                                var x = this.posX + i;
                                var y = this.posY + j;
                                if(checkWorldBoundaries(this.world, x, y) && this.world[x][y].isAlive) {
                                    neighbors++;
                                }
                            }
                        }
                    return neighbors;
                }
            }
        };
        

        return {
            'world': buildWorld(6,8),
            'visit': function(visitor) {
                var result=[];
                for (var x=0; x< this.world.length; x++) {
                    for(var y=0;y <this.world[x].length; y++) {
                        var rule = visitor.call(this, this.world[x][y]);
                        if(rule != null) {
                            result.push(rule);
                        }
                    }
                }
                return result;
            },
            // reset function to kill all cells
            'reset': function() {
                this.visit(function(cell) {cell.isAlive = false})
            },
        };
    });

angular.module("GameOfLife", ['World'])
.controller('GameOfLifeCtrl', function($scope, World){
    // World initialisation
    $scope.world = World.world;

    $scope.reset = function() {
        World.reset();
    };

    // These are the rules for the game
    var Rules = function (cell) {
        var neighbors = cell.neighbors();

        // Any live cell with fewer than two live neighbors dies, as if caused by under-population.
        if(neighbors<2) {
            return function() {
                cell.kill();
            }
        }
        // Any live cell with more than three live neighbors dies, as if by overcrowding.
        if(neighbors>3) {
            return function() {
                cell.kill();
            }
        }
        // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        if(neighbors == 3 && !cell.isAlive) {
            return function() {
                cell.born();
            }
        }
        return null;
    }

    // Next generation
    $scope.next = function() {
        var rules=World.visit(Rules);
        for(var i=0; i<rules.length; i++) {
               rules[i].apply(this);
        }
    };
});