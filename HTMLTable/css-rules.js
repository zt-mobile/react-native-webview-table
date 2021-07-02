"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTableStylesSpecs = {
    selectableText: false,
    fitContainer: false,
    linkColor: '#3498DB',
    fontFamily: 'sans-serif',
    thBorderColor: '#3f5c7a',
    tdBorderColor: '#b5b5b5',
    thBackground: '#253546',
    thColor: '#FFFFFF',
    trOddBackground: '#e2e2e2',
    trOddColor: '#333333',
    trEvenBackground: '#FFFFFF',
    trEvenColor: '#333333'
};
function cssRulesFromSpecs(specs = exports.defaultTableStylesSpecs) {
    const { selectableText, fitContainer, linkColor, fontFamily, tdBorderColor, thBorderColor, thBackground, thColor, trOddBackground, trOddColor, trEvenBackground, trEvenColor } = specs;
    const selectTextRule = selectableText ? '' : `
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  `;
    const spanToContainerRule = fitContainer ? `
    min-height: 100vh;
    min-width: 100vw;
  ` : '';
    return `
    :root {
      font-family: ${fontFamily};
      background-color: transparent;
    }
    body, html {
      margin: 0;
      background-color: transparent;
      ${selectTextRule}
    }
    a:link, a:visited {
      color: ${linkColor};
    }
    table {
      ${spanToContainerRule}
      margin: 0;
      padding: 0;
    }
    th, td {
      padding: 0.25em;
      text-align: center;
    }
    table, th, td {
      margin: 0;
    },
    table {
      margin: 'auto';
    }
    th {
      border-bottom: 0.25px solid ${thBorderColor};
      border-right: 0.25px solid ${thBorderColor};
      background-color: ${thBackground};
      color: ${thColor};
    }
    td {
      border-bottom: 0.25px solid ${tdBorderColor};
      border-right: 0.25px solid ${tdBorderColor};
    }
    thead {
      background-color: ${thBackground};
    }
    tr:nth-child(odd) {
      background-color: ${trOddBackground};
      color: ${trOddColor}
    }
    tr:nth-child(even), tr:nth-child(1) {
      background-color: ${trEvenBackground};
      color: ${trEvenColor};
    }
    `;
}
exports.default = cssRulesFromSpecs;
