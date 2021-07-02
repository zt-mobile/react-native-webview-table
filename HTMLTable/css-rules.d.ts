export interface TableStyleSpecs {
    selectableText: boolean;
    fitContainer: boolean;
    linkColor: string;
    fontFamily: string;
    tdBorderColor: string;
    thBorderColor: string;
    thBackground: string;
    thColor: string;
    trOddBackground: string;
    trOddColor: string;
    trEvenBackground: string;
    trEvenColor: string;
}
export declare const defaultTableStylesSpecs: TableStyleSpecs;
export default function cssRulesFromSpecs(specs?: TableStyleSpecs): string;
