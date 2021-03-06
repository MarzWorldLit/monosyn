'use strict';

var request = require('supertest');
var assert = require('assert');
var app = require('../app');
var utils = require('../lib/utils');

/* global describe, it */

describe('/', function() {
    it('responds with synth.jsx for /', function(done) {
        this.timeout(5000);
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .expect(function(res) {
                return '<title>Monosyn</title>' in res.body;
            })
            .end(done);
    });
});

describe('/r/', function() {
    it('responds with controller.jsx for /r/', function(done) {
        request(app)
            .get('/r/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .expect(function(res) {
                return '<title>Monosyn Filter Mod</title>' in res.body;
            })
            .end(done);
    });
});

describe('utils.createId', function() {
    it('should return a valid ID', function(done) {
        var id = utils.createId();
        assert.equal(true, utils.isValidId(id));
        done();
    });
});

describe('utils.isValidId', function() {
    it('should validate an ID', function(done) {
        var id1 = '3iG5at00';
        var id2 = '123d.#ff';
        var id3 = '3iG5';
        assert.equal(true, utils.isValidId(id1));
        assert.equal(false, utils.isValidId(id2));
        assert.equal(false, utils.isValidId(id3));
        done();
    });
});
