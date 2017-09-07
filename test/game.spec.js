describe('Unit: GameOfLife', function () {

    // Define global references for injections.
    var ctrl, world;

    beforeEach(module('GameOfLife'));
    beforeEach(module('GameOfLife.World'));
    beforeEach(module('GameOfLife.GameOfLife'));

    beforeEach(inject(function ($controller, $rootScope, _World_) {
        world = _World_;
        scope = $rootScope.$new();

        ctrl = $controller('GameOfLifeCtrl', {$scope:scope,World:world});
    }));
    expect(ctrl.world).toBeDefined();
    describe('GameOfLifeCtrl', function () {
        // Test some basic expectations about the controller
        it('should have a world defined', function () {
            expect(ctrl.world).toBeDefined();
        });

    });
});