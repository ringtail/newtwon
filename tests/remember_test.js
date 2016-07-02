var Remenber = require("../lib/remenber");
var remenber = new Remenber();
var assert = require('chai').assert;

var CONST_KEY = "SAMPLE_KEY"
var CONST_VALUE = "SAMPLE_VALUE"

describe('remenber module test', function() {
    it('should set key success', function() {
        remenber.set(CONST_KEY, CONST_VALUE);
        var value = remenber.get(CONST_KEY);
        assert.equal(CONST_VALUE, value);
    })

    it('should contains all keys', function() {
        var list = remenber.list();
        var count = 0;
        for (prop in list) {
            count++
        }
        assert.equal(count, 1);
    })
});
