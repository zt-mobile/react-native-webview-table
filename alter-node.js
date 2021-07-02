"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forEachObjIndexed_1 = __importDefault(require("ramda/es/forEachObjIndexed"));
const stringify_entities_1 = __importDefault(require("stringify-entities"));
function renderOpeningTag(tag, attributes) {
    const strAttributes = [];
    forEachObjIndexed_1.default((attrVal, attrKey) => {
        strAttributes.push(`${attrKey}="${stringify_entities_1.default(`${attrVal}`)}"`);
    })(attributes);
    return `<${tag}${strAttributes.length ? ' ' : ''}${strAttributes.join(' ')}>`;
}
function domToHTML(root, stats) {
    let html = '';
    if (root.type === 'tag') {
        const strChildren = root.children.reduce((prev, curr) => {
            if (curr.type === 'tag' && curr.name === 'tr') {
                stats.rows += 1;
            }
            if (curr.type === 'tag' && (curr.name === 'td' || curr.name === 'th') && stats.rows === 1) {
                stats.columns += 1;
            }
            return `${prev}${domToHTML(curr, stats)}`;
        }, '');
        html = `${renderOpeningTag(root.name, root.attribs)}${strChildren}</${root.name}>`;
    }
    else if (root.type === 'text') {
        const text = stringify_entities_1.default(root.data);
        html = text;
        stats.characters += text.length;
    }
    return html;
}
exports.domToHTML = domToHTML;
function alterNode(node) {
    if (node.type === 'tag' && node.name === 'table') {
        const stats = {
            html: '',
            rows: 0,
            columns: 0,
            characters: 0
        };
        node.attribs.cellspacing = '0';
        const html = domToHTML(node, stats);
        const { rows, columns, characters } = stats;
        node.attribs._rawHtml = html;
        node.attribs._numOfRows = rows;
        node.attribs._numOfColumns = columns;
        node.attribs._numOfChars = characters;
    }
}
exports.default = alterNode;
