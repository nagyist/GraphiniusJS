import * as $N from "./Nodes";

export interface IConnectedNodes {
	a: $N.IBaseNode;
	b: $N.IBaseNode;
}

/**
 * Edges are the most basic components in graphinius.
 * They control no other elements below them, but hold
 * references to the nodes they are connecting...
 * @param _id internal id, public
 * @param _label edge label, public
 */
export interface IBaseEdge {
	getID() : string;
	getLabel() : string;
	setLabel(label : string) : void;

	isDirected()						: boolean;

	isWeighted()						: boolean;
	getWeight()							: number; // Exception if not weighted
	setWeight(w:number) 		: void; // Exception if not weighted

	getNodes()	: IConnectedNodes;

	clone(node_a : $N.BaseNode, node_b : $N.BaseNode) : BaseEdge;

	/**
	 * An edge should either be directed or not, weighted or not.
	 * Changing those properties on live edges is not allowed,
	 * rather delete the edge and construct a new one altogether
	 */
	// setDirected(d:boolean)	: void;
	// setWeighted(w:boolean)	: void;
}

export interface EdgeConstructorOptions {
	directed?		: boolean;
	weighted?		: boolean;
	weight?			: number;
	label?			: string;
}

class BaseEdge implements IBaseEdge {
	protected _directed		: boolean;
	protected _weighted 	: boolean;
	protected _weight			: number;
	protected _label			: string;

	constructor (protected _id,
							protected _node_a: $N.IBaseNode,
							protected _node_b: $N.IBaseNode,
							options?: EdgeConstructorOptions)
	{
		if( !( _node_a instanceof $N.BaseNode ) || !( _node_b instanceof $N.BaseNode ) ) {
			throw new Error("cannot instantiate edge without two valid node objects");
		}

		options = options || {};
		this._directed = options.directed || false;
		this._weighted = options.weighted || false;
    // @NOTE isNaN and Number.isNaN confusion...
		this._weight = this._weighted ? ( isNaN(options.weight) ? 1 : options.weight ) : undefined;
		this._label = options.label || this._id;
	}

	getID() : string {
		return this._id;
	}

	getLabel() : string {
		return this._label;
	}

	setLabel(label : string) : void {
		this._label = label;
	}

	isDirected () : boolean {
		return this._directed;
	}

	isWeighted () : boolean {
		return this._weighted;
	}

	getWeight() : number {
		return this._weight;
	}

	setWeight(w:number) : void {
		if ( !this._weighted ) {
			throw new Error("Cannot set weight on unweighted edge.");
		}
		this._weight = w;
	}

	getNodes() : IConnectedNodes {
		return {a: this._node_a, b: this._node_b};
	}

	clone(new_node_a : $N.BaseNode, new_node_b : $N.BaseNode) : BaseEdge {
		if( !( new_node_a instanceof $N.BaseNode ) || !( new_node_b instanceof $N.BaseNode ) ) {
			throw new Error("refusing to clone edge if any new node is invalid");
		}

		return new BaseEdge( this._id,
												 new_node_a,
												 new_node_b,
												 {
													 directed		: this._directed,
													 weighted		: this._weighted,
													 weight			: this._weight,
													 label			: this._label
												 }													 
		);
	}
}

export { BaseEdge };
