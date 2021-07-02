"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
const css_rules_1 = __importStar(require("./css-rules"));
exports.cssRulesFromSpecs = css_rules_1.default;
exports.defaultTableStylesSpecs = css_rules_1.defaultTableStylesSpecs;
const script_1 = __importDefault(require("./script"));
var tags_1 = require("./tags");
exports.IGNORED_TAGS = tags_1.IGNORED_TAGS;
exports.TABLE_TAGS = tags_1.TABLE_TAGS;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        // See https://github.com/react-native-community/react-native-webview/issues/101
        overflow: 'hidden'
    }
});
const defaultInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};
const DEFAULT_TRANSITION_DURATION = 120;
function animateNextFrames(duration) {
    react_native_1.LayoutAnimation.configureNext({
        duration: duration || DEFAULT_TRANSITION_DURATION,
        update: {
            type: react_native_1.LayoutAnimation.Types.easeInEaseOut
        }
    });
}
class HTMLTable extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.oldContainerHeight = 0;
        this.handleOnMessage = ({ nativeEvent }) => {
            const { type, content } = JSON.parse(nativeEvent.data);
            if (type === 'heightUpdate') {
                const containerHeight = content;
                if (typeof containerHeight === 'number' && !Number.isNaN(containerHeight)) {
                    this.setState({ containerHeight });
                }
            }
            if (type === 'navigateEvent') {
                const { onLinkPress } = this.props;
                const url = content;
                onLinkPress && onLinkPress(url);
            }
        };
        const state = {
            containerHeight: 0,
            animatedHeight: new react_native_1.Animated.Value(0)
        };
        this.state = state;
        this.oldContainerHeight = this.findHeight(this.props, this.state) || 0;
    }
    buildHTML() {
        const { autoheight, tableStyleSpecs, cssRules, html } = this.props;
        const styleSpecs = tableStyleSpecs ? tableStyleSpecs : Object.assign({}, css_rules_1.defaultTableStylesSpecs, { fitContainer: !autoheight });
        const tableCssStyle = cssRules ? cssRules : css_rules_1.default(styleSpecs);
        return `
      <!DOCTYPE html>
      <html>
      <head>
      <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=false">
      </head>
      <body>
        <style>
        ${tableCssStyle}
        </style>
        ${html}
      </body>
      </html>
      `;
    }
    computeHeightHeuristic() {
        const { numOfChars, numOfRows } = this.props;
        const width = react_native_1.Dimensions.get('window').width;
        const charsPerLine = 30 * width / 400;
        const lineHeight = 20;
        const approxNumOfLines = Math.floor(numOfChars / charsPerLine);
        return Math.max(approxNumOfLines, numOfRows) * lineHeight;
    }
    findHeight(props, state) {
        const { containerHeight } = state;
        const { autoheight, defaultHeight, maxHeight } = props;
        const computedHeight = autoheight ?
            containerHeight ? containerHeight : this.computeHeightHeuristic() :
            defaultHeight;
        if (maxHeight) {
            return Math.min(maxHeight, computedHeight);
        }
        return computedHeight + 7.5;
    }
    componentWillUpdate(_nextProps, nextState) {
        const { autoheight, useLayoutAnimations, transitionDuration } = this.props;
        const shouldAnimate = nextState.containerHeight !== this.state.containerHeight &&
            autoheight && useLayoutAnimations;
        if (shouldAnimate) {
            animateNextFrames(transitionDuration);
        }
    }
    componentDidUpdate(_oldProps, oldState) {
        const { autoheight, useLayoutAnimations, transitionDuration } = this.props;
        const shouldAnimate = oldState.containerHeight !== this.state.containerHeight &&
            autoheight && !useLayoutAnimations;
        if (shouldAnimate) {
            this.oldContainerHeight = oldState.containerHeight;
            react_native_1.Animated.timing(this.state.animatedHeight, {
                toValue: 1,
                duration: transitionDuration
            }).start();
        }
    }
    render() {
        const { autoheight, style, WebViewComponent, webViewProps, useLayoutAnimations } = this.props;
        const html = this.buildHTML();
        const source = {
            html
        };
        const containerHeight = this.findHeight(this.props, this.state);
        const WebView = WebViewComponent;
        const containerStyle = autoheight && !useLayoutAnimations ? {
            height: this.state.animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [this.oldContainerHeight, containerHeight]
            })
        } : {
            height: !containerHeight || Number.isNaN(containerHeight) ? undefined : containerHeight
        };
        return (react_1.default.createElement(react_native_1.Animated.View, { style: [containerStyle, styles.container, style] },
            react_1.default.createElement(WebView, Object.assign({ scalesPageToFit: react_native_1.Platform.select({ android: false, ios: undefined }), automaticallyAdjustContentInsets: false, scrollEnabled: true, style: [react_native_1.StyleSheet.absoluteFill, webViewProps && webViewProps.style], contentInset: defaultInsets }, webViewProps, { injectedJavaScript: script_1.default, javaScriptEnabled: true, onMessage: this.handleOnMessage, source: source }))));
    }
}
HTMLTable.defaultProps = {
    autoheight: true,
    useLayoutAnimations: false,
    transitionDuration: DEFAULT_TRANSITION_DURATION
};
HTMLTable.propTypes = {
    html: prop_types_1.default.string.isRequired,
    numOfChars: prop_types_1.default.number.isRequired,
    numOfColumns: prop_types_1.default.number.isRequired,
    numOfRows: prop_types_1.default.number.isRequired,
    WebViewComponent: prop_types_1.default.func.isRequired,
    autoheight: prop_types_1.default.bool,
    defaultHeight: prop_types_1.default.number,
    maxHeight: prop_types_1.default.number,
    onLinkPress: prop_types_1.default.func,
    style: prop_types_1.default.any,
    tableStyleSpecs: prop_types_1.default.shape({
        linkColor: prop_types_1.default.string.isRequired,
        fontFamily: prop_types_1.default.string.isRequired,
        tdBorderColor: prop_types_1.default.string.isRequired,
        thBorderColor: prop_types_1.default.string.isRequired,
        thBackground: prop_types_1.default.string.isRequired,
        thColor: prop_types_1.default.string.isRequired,
        trOddBackground: prop_types_1.default.string.isRequired,
        trOddColor: prop_types_1.default.string.isRequired,
        trEvenBackground: prop_types_1.default.string.isRequired,
        trEvenColor: prop_types_1.default.string.isRequired
    }),
    cssRules: prop_types_1.default.string,
    webViewProps: prop_types_1.default.object,
    useLayoutAnimations: prop_types_1.default.bool,
    transitionDuration: prop_types_1.default.number
};
exports.default = HTMLTable;
