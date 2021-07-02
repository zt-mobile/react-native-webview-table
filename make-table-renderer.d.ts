import { ComponentType } from 'react';
import { RendererDeclaration } from 'react-native-render-html';
import { TableConfig, HTMLTablePropsWithStats } from './HTMLTable';
export declare function makeTableRenderer(tableConfig: TableConfig): RendererDeclaration;
/**
 *
 * @param TableComponent A component which will receive `HTMLTablePropsWithStats` props.
 * @see HTMLTablePropsWithStats
 */
export declare function makeCustomTableRenderer(TableComponent: ComponentType<HTMLTablePropsWithStats>): RendererDeclaration;
