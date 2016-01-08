
var Edges			= require("./dist/core/Edges.js");
var Nodes 		= require("./dist/core/Nodes.js");
var Graph 		= require("./dist/core/Graph.js");
var CsvInput 	= require("./dist/input/CSVInput");
var JsonInput = require("./dist/input/JSONInput");

// TODO:
// Encapsulate ALL functions within Graph for
// easier access and less import / new ceremony

var out = typeof window !== 'undefined' ? window : global;

out.$G = {
	Edge 				: Edges.BaseEdge,
	Node 				: Nodes.BaseNode,
	Graph 			: Graph.BaseGraph,
	CsvInput 		: CsvInput.CSVInput,
	JsonInput 	: JsonInput.JSONInput
};

module.exports = out.$G;
