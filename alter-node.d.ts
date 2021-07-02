import { HTMLNode } from 'react-native-render-html';
export interface TableStats {
    rows: number;
    columns: number;
    characters: number;
}
export declare function domToHTML(root: HTMLNode, stats: TableStats): string;
export default function alterNode(node: HTMLNode): void;
