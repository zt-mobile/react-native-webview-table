"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const HTMLTable_1 = __importDefault(require("./HTMLTable"));
function makeTableRenderer(tableConfig) {
    return (attribs, _children, _css, { key, onLinkPress }) => {
        const handleOnLinkPress = (url) => onLinkPress && onLinkPress({}, url, {});
        if (typeof attribs._rawHtml !== 'string') {
            throw new Error("You must inject `alterNode' method from react-native-render-html-table-bdridge in `HTML' component.");
        }
        return react_1.default.createElement(HTMLTable_1.default, Object.assign({ key: key }, tableConfig, { numOfColumns: attribs._numOfColumns, numOfRows: attribs._numOfRows, numOfChars: attribs._numOfChars, html: attribs._rawHtml, onLinkPress: handleOnLinkPress }));
    };
}
exports.makeTableRenderer = makeTableRenderer;
/**
 *
 * @param TableComponent A component which will receive `HTMLTablePropsWithStats` props.
 * @see HTMLTablePropsWithStats
 */
function makeCustomTableRenderer(TableComponent) {
    return (attribs, _children, _css, { key, onLinkPress }) => {
        const handleOnLinkPress = (url) => onLinkPress && onLinkPress({}, url, {});
        if (typeof attribs._rawHtml !== 'string') {
            throw new Error("You must inject `alterNode' method from react-native-render-html-table-bdridge in `HTML' component.");
        }
        return react_1.default.createElement(TableComponent, { key: key, numOfColumns: attribs._numOfColumns, numOfRows: attribs._numOfRows, numOfChars: attribs._numOfChars, html: attribs._rawHtml, onLinkPress: handleOnLinkPress });
    };
}
exports.makeCustomTableRenderer = makeCustomTableRenderer;
