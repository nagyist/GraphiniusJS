/// <reference path="../../typings/tsd.d.ts" />

import * as chai from 'chai';
import * as $N from '../../src/core/Nodes';
import * as $E from '../../src/core/Edges';
import * as $G from '../../src/core/Graph';
import * as $I from '../../src/input/JSONInput';
import * as $C from '../../test/input/common';

var expect 	= chai.expect;
var Node 		= $N.BaseNode;
var Edge 		= $E.BaseEdge;
var Graph 	= $G.BaseGraph;
var JSON_IN	= $I.JSONInput;


describe('ASYNC GRAPH JSON INPUT TESTS', () => {
	
	var json 					: $I.IJSONInput,
			remote_file		: string,
			graph					: $G.IGraph,
			stats					: $G.GraphStats,
			REMOTE_HOST = "http://berndmalle.com/graphinius-demo/test_data/";
	
	
	describe('Small test graph', () => {
				
		it('should correctly generate our small example graph from a remotely fetched JSON file with explicitly encoded edge directions', (done) => {
			json = new JSON_IN();
			remote_file = REMOTE_HOST + "small_graph.json";
			json.readFromJSONURL(remote_file, function(graph, err) {
				$C.checkSmallGraphStats(graph);
				done();
			});
		});
		
		
		it('should correctly generate our small example graph from a remotely fetched JSON file with direction mode set to undirected', (done) => {
			json = new JSON_IN();
			json._explicit_direction = false;
			json._direction_mode = false; // undirected graph
			remote_file = REMOTE_HOST + "small_graph.json";
			json.readFromJSONURL(remote_file, function(graph, err) {
				expect(graph.nrNodes()).to.equal(4);
				expect(graph.nrDirEdges()).to.equal(0);
				expect(graph.nrUndEdges()).to.equal(4);
				expect(graph.getMode()).to.equal($G.GraphMode.UNDIRECTED);
				done();
			});
		});
		
		
		it('should correctly generate our small example graph from a remotely fetched JSON file with direction mode set to undirected', (done) => {
			json = new JSON_IN();
			json._explicit_direction = false;
			json._direction_mode = true; // undirected graph
			remote_file = REMOTE_HOST + "small_graph.json";
			json.readFromJSONURL(remote_file, function(graph, err) {
				expect(graph.nrNodes()).to.equal(4);
				expect(graph.nrDirEdges()).to.equal(7);
				expect(graph.nrUndEdges()).to.equal(0);
				expect(graph.getMode()).to.equal($G.GraphMode.DIRECTED);
				done();
			});
		});
		
	});
	
	
	describe('Real graph from JSON', () => {
		
		/**
		 * Edge list, but with a REAL graph now
		 * graph should have 5937 undirected nodes.
		 */ 
		it('should construct a real sized graph from a remotely fetched edge list with edges set to undirected', (done) => {
			json = new JSON_IN();
			remote_file = REMOTE_HOST + "real_graph.json";
			json.readFromJSONURL(remote_file, function(graph, err) {
				stats = graph.getStats();
				expect(stats.nr_nodes).to.equal(5937);
				expect(stats.nr_dir_edges).to.equal(0);
				expect(stats.nr_und_edges).to.equal(17777);
				expect(stats.mode).to.equal($G.GraphMode.UNDIRECTED);
				done();
			});
		});
	
	});
			
});