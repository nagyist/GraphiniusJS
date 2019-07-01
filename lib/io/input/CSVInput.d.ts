import * as $G from '../../core/Graph';
import * as $R from '../../utils/remoteUtils';
export interface ICSVConfig {
    separator?: string;
    explicit_direction?: boolean;
    direction_mode?: boolean;
    weighted?: boolean;
}
export interface ICSVInput {
    _config: ICSVConfig;
    readFromAdjacencyListFile(filepath: string): $G.IGraph;
    readFromAdjacencyList(input: Array<string>, graph_name: string): $G.IGraph;
    readFromAdjacencyListURL(config: $R.RequestConfig, cb: Function): any;
    readFromEdgeListFile(filepath: string): $G.IGraph;
    readFromEdgeList(input: Array<string>, graph_name: string): $G.IGraph;
    readFromEdgeListURL(config: $R.RequestConfig, cb: Function): any;
}
declare class CSVInput implements ICSVInput {
    _config: ICSVConfig;
    constructor(config?: ICSVConfig);
    readFromAdjacencyListURL(config: $R.RequestConfig, cb: Function): void;
    readFromEdgeListURL(config: $R.RequestConfig, cb: Function): void;
    private readGraphFromURL;
    readFromAdjacencyListFile(filepath: string): $G.IGraph;
    readFromEdgeListFile(filepath: string): $G.IGraph;
    private readFileAndReturn;
    readFromAdjacencyList(input: Array<string>, graph_name: string): $G.IGraph;
    readFromEdgeList(input: Array<string>, graph_name: string, weighted?: boolean): $G.IGraph;
}
export { CSVInput };
