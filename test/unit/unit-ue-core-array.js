describe( 'Unit: Core-Array', function()
{
    var remove = function()
    {
        var numbers = [1, 2, 3];
        equal(_.indexOf(numbers, 2), 1, 'can compute indexOf');
        var result = (function(){ return _.indexOf(arguments, 2); }(1, 2, 3));
        equal(result, 1, 'works on an arguments object');

        _.each([null, void 0, [], false], function(val) {
          var msg = 'Handles: ' + (_.isArray(val) ? '[]' : val);
          equal(_.indexOf(val, 2), -1, msg);
          equal(_.indexOf(val, 2, -1), -1, msg);
          equal(_.indexOf(val, 2, -20), -1, msg);
          equal(_.indexOf(val, 2, 15), -1, msg);
        });

        var num = 35;
        numbers = [10, 20, 30, 40, 50];
        var index = _.indexOf(numbers, num, true);
        equal(index, -1, '35 is not in the list');

        numbers = [10, 20, 30, 40, 50]; num = 40;
        index = _.indexOf(numbers, num, true);
        equal(index, 3, '40 is in the list');

        numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70]; num = 40;
        equal(_.indexOf(numbers, num, true), 1, '40 is in the list');
        equal(_.indexOf(numbers, 6, true), -1, '6 isnt in the list');
        equal(_.indexOf([1, 2, 5, 4, 6, 7], 5, true), -1, 'sorted indexOf doesn\'t uses binary search');
        ok(_.every(['1', [], {}, null], function() {
          return _.indexOf(numbers, num, {}) === 1;
        }), 'non-nums as fromIndex make indexOf assume sorted');

        numbers = [1, 2, 3, 1, 2, 3, 1, 2, 3];
        index = _.indexOf(numbers, 2, 5);
        equal(index, 7, 'supports the fromIndex argument');

        index = _.indexOf([,,,], undefined);
        equal(index, 0, 'treats sparse arrays as if they were dense');

        var array = [1, 2, 3, 1, 2, 3];
        strictEqual(_.indexOf(array, 1, -3), 3, 'neg `fromIndex` starts at the right index');
        strictEqual(_.indexOf(array, 1, -2), -1, 'neg `fromIndex` starts at the right index');
        strictEqual(_.indexOf(array, 2, -3), 4);
        _.each([-6, -8, -Infinity], function(fromIndex) {
          strictEqual(_.indexOf(array, 1, fromIndex), 0);
        });
        strictEqual(_.indexOf([1, 2, 3], 1, true), 0);
        
        index = _.indexOf([], undefined, true);
        equal(index, -1, 'empty array with truthy `isSorted` returns -1');


        // Sorted Index

        var numbers = [10, 20, 30, 40, 50], num = 35;
        var indexForNum = _.sortedIndex(numbers, num);
        equal(indexForNum, 3, '35 should be inserted at index 3');

        var indexFor30 = _.sortedIndex(numbers, 30);
        equal(indexFor30, 2, '30 should be inserted at index 2');

        var objects = [{x: 10}, {x: 20}, {x: 30}, {x: 40}];
        var iterator = function(obj){ return obj.x; };
        strictEqual(_.sortedIndex(objects, {x: 25}, iterator), 2);
        strictEqual(_.sortedIndex(objects, {x: 35}, 'x'), 3);

        var context = {1: 2, 2: 3, 3: 4};
        iterator = function(obj){ return this[obj]; };
        strictEqual(_.sortedIndex([1, 3], 2, iterator, context), 1);

        /*var numbers = [1, 2, 3];
    equal(_.indexOf(numbers, 2), 1, 'can compute indexOf');
    var result = (function(){ return _.indexOf(arguments, 2); }(1, 2, 3));
    equal(result, 1, 'works on an arguments object');

    _.each([null, void 0, [], false], function(val) {
      var msg = 'Handles: ' + (_.isArray(val) ? '[]' : val);
      equal(_.indexOf(val, 2), -1, msg);
      equal(_.indexOf(val, 2, -1), -1, msg);
      equal(_.indexOf(val, 2, -20), -1, msg);
      equal(_.indexOf(val, 2, 15), -1, msg);*/
    }

    it( 'ue.sortedIndex', function()
    {
        var numbers = [ 10, 20, 30, 40, 50 ],

            objects = [{x: 10}, {x: 20}, {x: 30}, {x: 40}],

            context = {1: 2, 2: 3, 3: 4};

        expect( ue.sortedIndex( numbers, 35 ) ).toBe( 3 );

        expect( ue.sortedIndex( numbers, 30 ) ).toBe( 2 );

        expect( ue.sortedIndex( objects, { x: 25 }, function( obj )
        {
            return obj.x;
        })).toBe( 2 );

        expect( ue.sortedIndex( objects, { x: 35 }, 'x' ) ).toBe( 3 );

        expect( ue.sortedIndex( [ 1, 3 ], 2, function( obj ){ return this[ obj ]; }, context ) ).toBe( 1 );

    });


    it( 'ue.indexOf', function()
    {
        var numbers = [ 1, 2, 3 ],

            empty   = [ null, undefined, 0, false];

            large   = ( function( arr ){ for( var i = 0; i < 1000; ++i)arr[i]=i;return arr} )([]);

        expect( ue.indexOf( numbers, 2 ) ).toBe( 1 );

        expect( ue.indexOf( numbers, 4 ) ).toBe( -1 );

        expect( ue.indexOf( empty, null ) ).toBe( 0 );

        expect( ue.indexOf( empty, undefined ) ).toBe( 1 );

        expect( ue.indexOf( empty, 0 ) ).toBe( 2 );

        expect( ue.indexOf( empty, false ) ).toBe( 3 );

        expect( ue.indexOf( large, 50, 40 ) ).toBe( 50 );

        expect( ue.indexOf( large, 50, 70 ) ).toBe( -1 );

        expect( ue.indexOf( large, 50, true ) ).toBe( ue.indexOf( large, 50, false ) );

        expect( (function(){ return ue.indexOf( arguments, 2 ) }).apply( null, numbers ) ).toBe( 1 );
    });
});