/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/@formatjs/fast-memoize/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@formatjs/fast-memoize/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ memoize),
/* harmony export */   "strategies": () => (/* binding */ strategies)
/* harmony export */ });
//
// Main
//
function memoize(fn, options) {
    var cache = options && options.cache ? options.cache : cacheDefault;
    var serializer = options && options.serializer ? options.serializer : serializerDefault;
    var strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache: cache,
        serializer: serializer,
    });
}
//
// Strategy
//
function isPrimitive(value) {
    return (value == null || typeof value === 'number' || typeof value === 'boolean'); // || typeof value === "string" 'unsafe' primitive for our needs
}
function monadic(fn, cache, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
var serializerDefault = function () {
    return JSON.stringify(arguments);
};
//
// Cache
//
function ObjectWithoutPrototypeCache() {
    this.cache = Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.get = function (key) {
    return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
    this.cache[key] = value;
};
var cacheDefault = {
    create: function create() {
        // @ts-ignore
        return new ObjectWithoutPrototypeCache();
    },
};
var strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic,
};


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/error.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorKind": () => (/* binding */ ErrorKind)
/* harmony export */ });
var ErrorKind;
(function (ErrorKind) {
    /** Argument is unclosed (e.g. `{0`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    /** Argument is empty (e.g. `{}`). */
    ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    /** Argument is malformed (e.g. `{foo!}``) */
    ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    /** Expect an argument type (e.g. `{foo,}`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    /** Unsupported argument type (e.g. `{foo,foo}`) */
    ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    /** Expect an argument style (e.g. `{foo, number, }`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    /** The number skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    /** The date time skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    /** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */
    ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    /** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */
    ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    /** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */
    ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    /** Missing select argument options (e.g. `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    /** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Expecting a selector in `select` argument (e.g `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    /** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    /** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    /**
     * Expecting a message fragment after the `plural` or `selectordinal` selector
     * (e.g. `{foo, plural, one}`)
     */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    /** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    /**
     * Duplicate selectors in `plural` or `selectordinal` argument.
     * (e.g. {foo, plural, one {#} one {#}})
     */
    ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    /** Duplicate selectors in `select` argument.
     * (e.g. {foo, select, apple {apple} apple {apple}})
     */
    ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    /** Plural or select argument option must have `other` clause. */
    ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    /** The tag is malformed. (e.g. `<bold!>foo</bold!>) */
    ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
    /** The tag name is invalid. (e.g. `<123>foo</123>`) */
    ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    /** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */
    ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    /** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */
    ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "SKELETON_TYPE": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SKELETON_TYPE),
/* harmony export */   "TYPE": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.TYPE),
/* harmony export */   "createLiteralElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.createLiteralElement),
/* harmony export */   "createNumberElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.createNumberElement),
/* harmony export */   "isArgumentElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isArgumentElement),
/* harmony export */   "isDateElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isDateElement),
/* harmony export */   "isDateTimeSkeleton": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isDateTimeSkeleton),
/* harmony export */   "isLiteralElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isLiteralElement),
/* harmony export */   "isNumberElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isNumberElement),
/* harmony export */   "isNumberSkeleton": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isNumberSkeleton),
/* harmony export */   "isPluralElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isPluralElement),
/* harmony export */   "isPoundElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isPoundElement),
/* harmony export */   "isSelectElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isSelectElement),
/* harmony export */   "isTagElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isTagElement),
/* harmony export */   "isTimeElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isTimeElement)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./node_modules/@formatjs/icu-messageformat-parser/lib/error.js");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ "./node_modules/@formatjs/icu-messageformat-parser/lib/parser.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./node_modules/@formatjs/icu-messageformat-parser/lib/types.js");




function pruneLocation(els) {
    els.forEach(function (el) {
        delete el.location;
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isSelectElement)(el) || (0,_types__WEBPACK_IMPORTED_MODULE_2__.isPluralElement)(el)) {
            for (var k in el.options) {
                delete el.options[k].location;
                pruneLocation(el.options[k].value);
            }
        }
        else if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isNumberElement)(el) && (0,_types__WEBPACK_IMPORTED_MODULE_2__.isNumberSkeleton)(el.style)) {
            delete el.style.location;
        }
        else if (((0,_types__WEBPACK_IMPORTED_MODULE_2__.isDateElement)(el) || (0,_types__WEBPACK_IMPORTED_MODULE_2__.isTimeElement)(el)) &&
            (0,_types__WEBPACK_IMPORTED_MODULE_2__.isDateTimeSkeleton)(el.style)) {
            delete el.style.location;
        }
        else if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isTagElement)(el)) {
            pruneLocation(el.children);
        }
    });
}
function parse(message, opts) {
    if (opts === void 0) { opts = {}; }
    opts = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
    var result = new _parser__WEBPACK_IMPORTED_MODULE_1__.Parser(message, opts).parse();
    if (result.err) {
        var error = SyntaxError(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind[result.err.kind]);
        // @ts-expect-error Assign to error object
        error.location = result.err.location;
        // @ts-expect-error Assign to error object
        error.originalMessage = result.err.message;
        throw error;
    }
    if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
    }
    return result.val;
}



/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/parser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/parser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parser": () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./node_modules/@formatjs/icu-messageformat-parser/lib/error.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./node_modules/@formatjs/icu-messageformat-parser/lib/types.js");
/* harmony import */ var _regex_generated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./regex.generated */ "./node_modules/@formatjs/icu-messageformat-parser/lib/regex.generated.js");
/* harmony import */ var _formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @formatjs/icu-skeleton-parser */ "./node_modules/@formatjs/icu-skeleton-parser/lib/index.js");
var _a;





var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(_regex_generated__WEBPACK_IMPORTED_MODULE_2__.SPACE_SEPARATOR_REGEX.source, "*"));
var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(_regex_generated__WEBPACK_IMPORTED_MODULE_2__.SPACE_SEPARATOR_REGEX.source, "*$"));
function createLocation(start, end) {
    return { start: start, end: end };
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
var hasNativeStartsWith = !!String.prototype.startsWith;
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger
    ? Number.isSafeInteger
    : function (n) {
        return (typeof n === 'number' &&
            isFinite(n) &&
            Math.floor(n) === n &&
            Math.abs(n) <= 0x1fffffffffffff);
    };
// IE11 does not support y and u.
var REGEX_SUPPORTS_U_AND_Y = true;
try {
    var re = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    /**
     * legacy Edge or Xbox One browser
     * Unicode flag support: supported
     * Pattern_Syntax support: not supported
     * See https://github.com/formatjs/formatjs/issues/2822
     */
    REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec('a')) === null || _a === void 0 ? void 0 : _a[0]) === 'a';
}
catch (_) {
    REGEX_SUPPORTS_U_AND_Y = false;
}
var startsWith = hasNativeStartsWith
    ? // Native
        function startsWith(s, search, position) {
            return s.startsWith(search, position);
        }
    : // For IE11
        function startsWith(s, search, position) {
            return s.slice(position, position + search.length) === search;
        };
var fromCodePoint = hasNativeFromCodePoint
    ? String.fromCodePoint
    : // IE11
        function fromCodePoint() {
            var codePoints = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                codePoints[_i] = arguments[_i];
            }
            var elements = '';
            var length = codePoints.length;
            var i = 0;
            var code;
            while (length > i) {
                code = codePoints[i++];
                if (code > 0x10ffff)
                    throw RangeError(code + ' is not a valid code point');
                elements +=
                    code < 0x10000
                        ? String.fromCharCode(code)
                        : String.fromCharCode(((code -= 0x10000) >> 10) + 0xd800, (code % 0x400) + 0xdc00);
            }
            return elements;
        };
var fromEntries = 
// native
hasNativeFromEntries
    ? Object.fromEntries
    : // Ponyfill
        function fromEntries(entries) {
            var obj = {};
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var _a = entries_1[_i], k = _a[0], v = _a[1];
                obj[k] = v;
            }
            return obj;
        };
var codePointAt = hasNativeCodePointAt
    ? // Native
        function codePointAt(s, index) {
            return s.codePointAt(index);
        }
    : // IE 11
        function codePointAt(s, index) {
            var size = s.length;
            if (index < 0 || index >= size) {
                return undefined;
            }
            var first = s.charCodeAt(index);
            var second;
            return first < 0xd800 ||
                first > 0xdbff ||
                index + 1 === size ||
                (second = s.charCodeAt(index + 1)) < 0xdc00 ||
                second > 0xdfff
                ? first
                : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
        };
var trimStart = hasTrimStart
    ? // Native
        function trimStart(s) {
            return s.trimStart();
        }
    : // Ponyfill
        function trimStart(s) {
            return s.replace(SPACE_SEPARATOR_START_REGEX, '');
        };
var trimEnd = hasTrimEnd
    ? // Native
        function trimEnd(s) {
            return s.trimEnd();
        }
    : // Ponyfill
        function trimEnd(s) {
            return s.replace(SPACE_SEPARATOR_END_REGEX, '');
        };
// Prevent minifier to translate new RegExp to literal form that might cause syntax error on IE11.
function RE(s, flag) {
    return new RegExp(s, flag);
}
// #endregion
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
    // Native
    var IDENTIFIER_PREFIX_RE_1 = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var _a;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s);
        return (_a = match[1]) !== null && _a !== void 0 ? _a : '';
    };
}
else {
    // IE11
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var match = [];
        while (true) {
            var c = codePointAt(s, index);
            if (c === undefined || _isWhiteSpace(c) || _isPatternSyntax(c)) {
                break;
            }
            match.push(c);
            index += c >= 0x10000 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
    };
}
var Parser = /** @class */ (function () {
    function Parser(message, options) {
        if (options === void 0) { options = {}; }
        this.message = message;
        this.position = { offset: 0, line: 1, column: 1 };
        this.ignoreTag = !!options.ignoreTag;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    Parser.prototype.parse = function () {
        if (this.offset() !== 0) {
            throw Error('parser can only be used once');
        }
        return this.parseMessage(0, '', false);
    };
    Parser.prototype.parseMessage = function (nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
            var char = this.char();
            if (char === 123 /* `{` */) {
                var result = this.parseArgument(nestingLevel, expectingCloseTag);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else if (char === 125 /* `}` */ && nestingLevel > 0) {
                break;
            }
            else if (char === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) {
                var position = this.clonePosition();
                this.bump();
                elements.push({
                    type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.pound,
                    location: createLocation(position, this.clonePosition()),
                });
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                this.peek() === 47 // char code for '/'
            ) {
                if (expectingCloseTag) {
                    break;
                }
                else {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
                }
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                _isAlpha(this.peek() || 0)) {
                var result = this.parseTag(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else {
                var result = this.parseLiteral(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
        }
        return { val: elements, err: null };
    };
    /**
     * A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
     * [custom element name][] except that a dash is NOT always mandatory and uppercase letters
     * are accepted:
     *
     * ```
     * tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
     * tagName ::= [a-z] (PENChar)*
     * PENChar ::=
     *     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
     *     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
     *     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
     * ```
     *
     * [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
     * NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
     * since other tag-based engines like React allow it
     */
    Parser.prototype.parseTag = function (nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump(); // `<`
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf('/>')) {
            // Self closing tag
            return {
                val: {
                    type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.literal,
                    value: "<".concat(tagName, "/>"),
                    location: createLocation(startPosition, this.clonePosition()),
                },
                err: null,
            };
        }
        else if (this.bumpIf('>')) {
            var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
                return childrenResult;
            }
            var children = childrenResult.val;
            // Expecting a close tag
            var endTagStartPosition = this.clonePosition();
            if (this.bumpIf('</')) {
                if (this.isEOF() || !_isAlpha(this.char())) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                var closingTagNameStartPosition = this.clonePosition();
                var closingTagName = this.parseTagName();
                if (tagName !== closingTagName) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
                }
                this.bumpSpace();
                if (!this.bumpIf('>')) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                return {
                    val: {
                        type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.tag,
                        value: tagName,
                        children: children,
                        location: createLocation(startPosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            else {
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
        }
        else {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
    };
    /**
     * This method assumes that the caller has peeked ahead for the first tag character.
     */
    Parser.prototype.parseTagName = function () {
        var startOffset = this.offset();
        this.bump(); // the first tag name character
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
            this.bump();
        }
        return this.message.slice(startOffset, this.offset());
    };
    Parser.prototype.parseLiteral = function (nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = '';
        while (true) {
            var parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
                value += parseQuoteResult;
                continue;
            }
            var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
                value += parseUnquotedResult;
                continue;
            }
            var parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
                value += parseLeftAngleResult;
                continue;
            }
            break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
            val: { type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.literal, value: value, location: location },
            err: null,
        };
    };
    Parser.prototype.tryParseLeftAngleBracket = function () {
        if (!this.isEOF() &&
            this.char() === 60 /* `<` */ &&
            (this.ignoreTag ||
                // If at the opening tag or closing tag position, bail.
                !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump(); // `<`
            return '<';
        }
        return null;
    };
    /**
     * Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
     * a character that requires quoting (that is, "only where needed"), and works the same in
     * nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
     */
    Parser.prototype.tryParseQuote = function (parentArgType) {
        if (this.isEOF() || this.char() !== 39 /* `'` */) {
            return null;
        }
        // Parse escaped char following the apostrophe, or early return if there is no escaped char.
        // Check if is valid escaped character
        switch (this.peek()) {
            case 39 /* `'` */:
                // double quote, should return as a single quote.
                this.bump();
                this.bump();
                return "'";
            // '{', '<', '>', '}'
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35: // '#'
                if (parentArgType === 'plural' || parentArgType === 'selectordinal') {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump(); // apostrophe
        var codePoints = [this.char()]; // escaped char
        this.bump();
        // read chars until the optional closing apostrophe is found
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch === 39 /* `'` */) {
                if (this.peek() === 39 /* `'` */) {
                    codePoints.push(39);
                    // Bump one more time because we need to skip 2 characters.
                    this.bump();
                }
                else {
                    // Optional closing apostrophe.
                    this.bump();
                    break;
                }
            }
            else {
                codePoints.push(ch);
            }
            this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
    };
    Parser.prototype.tryParseUnquoted = function (nestingLevel, parentArgType) {
        if (this.isEOF()) {
            return null;
        }
        var ch = this.char();
        if (ch === 60 /* `<` */ ||
            ch === 123 /* `{` */ ||
            (ch === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) ||
            (ch === 125 /* `}` */ && nestingLevel > 0)) {
            return null;
        }
        else {
            this.bump();
            return fromCodePoint(ch);
        }
    };
    Parser.prototype.parseArgument = function (nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump(); // `{`
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125 /* `}` */) {
            this.bump();
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        // argument name
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
            // Simple argument: `{name}`
            case 125 /* `}` */: {
                this.bump(); // `}`
                return {
                    val: {
                        type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.argument,
                        // value does not include the opening and closing braces.
                        value: value,
                        location: createLocation(openingBracePosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            // Argument with options: `{name, format, ...}`
            case 44 /* `,` */: {
                this.bump(); // `,`
                this.bumpSpace();
                if (this.isEOF()) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
                }
                return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
            }
            default:
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
    };
    /**
     * Advance the parser until the end of the identifier, if it is currently on
     * an identifier character. Return an empty string otherwise.
     */
    Parser.prototype.parseIdentifierIfPossible = function () {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return { value: value, location: location };
    };
    Parser.prototype.parseArgumentOptions = function (nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a;
        // Parse this range:
        // {name, type, style}
        //        ^---^
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
            case '':
                // Expecting a style string number, date, time, plural, selectordinal, or select.
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case 'number':
            case 'date':
            case 'time': {
                // Parse this range:
                // {name, number, style}
                //              ^-------^
                this.bumpSpace();
                var styleAndLocation = null;
                if (this.bumpIf(',')) {
                    this.bumpSpace();
                    var styleStartPosition = this.clonePosition();
                    var result = this.parseSimpleArgStyleIfPossible();
                    if (result.err) {
                        return result;
                    }
                    var style = trimEnd(result.val);
                    if (style.length === 0) {
                        return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    var styleLocation = createLocation(styleStartPosition, this.clonePosition());
                    styleAndLocation = { style: style, styleLocation: styleLocation };
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_1 = createLocation(openingBracePosition, this.clonePosition());
                // Extract style or skeleton
                if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, '::', 0)) {
                    // Skeleton starts with `::`.
                    var skeleton = trimStart(styleAndLocation.style.slice(2));
                    if (argType === 'number') {
                        var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                        if (result.err) {
                            return result;
                        }
                        return {
                            val: { type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.number, value: value, location: location_1, style: result.val },
                            err: null,
                        };
                    }
                    else {
                        if (skeleton.length === 0) {
                            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                        }
                        var style = {
                            type: _types__WEBPACK_IMPORTED_MODULE_1__.SKELETON_TYPE.dateTime,
                            pattern: skeleton,
                            location: styleAndLocation.styleLocation,
                            parsedOptions: this.shouldParseSkeletons
                                ? (0,_formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__.parseDateTimeSkeleton)(skeleton)
                                : {},
                        };
                        var type = argType === 'date' ? _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.date : _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.time;
                        return {
                            val: { type: type, value: value, location: location_1, style: style },
                            err: null,
                        };
                    }
                }
                // Regular style or no style.
                return {
                    val: {
                        type: argType === 'number'
                            ? _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.number
                            : argType === 'date'
                                ? _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.date
                                : _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.time,
                        value: value,
                        location: location_1,
                        style: (_a = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a !== void 0 ? _a : null,
                    },
                    err: null,
                };
            }
            case 'plural':
            case 'selectordinal':
            case 'select': {
                // Parse this range:
                // {name, plural, options}
                //              ^---------^
                var typeEndPosition_1 = this.clonePosition();
                this.bumpSpace();
                if (!this.bumpIf(',')) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, typeEndPosition_1)));
                }
                this.bumpSpace();
                // Parse offset:
                // {name, plural, offset:1, options}
                //                ^-----^
                //
                // or the first option:
                //
                // {name, plural, one {...} other {...}}
                //                ^--^
                var identifierAndLocation = this.parseIdentifierIfPossible();
                var pluralOffset = 0;
                if (argType !== 'select' && identifierAndLocation.value === 'offset') {
                    if (!this.bumpIf(':')) {
                        return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    this.bumpSpace();
                    var result = this.tryParseDecimalInteger(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                    if (result.err) {
                        return result;
                    }
                    // Parse another identifier for option parsing
                    this.bumpSpace();
                    identifierAndLocation = this.parseIdentifierIfPossible();
                    pluralOffset = result.val;
                }
                var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
                if (optionsResult.err) {
                    return optionsResult;
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_2 = createLocation(openingBracePosition, this.clonePosition());
                if (argType === 'select') {
                    return {
                        val: {
                            type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.select,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            location: location_2,
                        },
                        err: null,
                    };
                }
                else {
                    return {
                        val: {
                            type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.plural,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            offset: pluralOffset,
                            pluralType: argType === 'plural' ? 'cardinal' : 'ordinal',
                            location: location_2,
                        },
                        err: null,
                    };
                }
            }
            default:
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
    };
    Parser.prototype.tryParseArgumentClose = function (openingBracePosition) {
        // Parse: {value, number, ::currency/GBP }
        //
        if (this.isEOF() || this.char() !== 125 /* `}` */) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump(); // `}`
        return { val: true, err: null };
    };
    /**
     * See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
     */
    Parser.prototype.parseSimpleArgStyleIfPossible = function () {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
            var ch = this.char();
            switch (ch) {
                case 39 /* `'` */: {
                    // Treat apostrophe as quoting but include it in the style part.
                    // Find the end of the quoted literal text.
                    this.bump();
                    var apostrophePosition = this.clonePosition();
                    if (!this.bumpUntil("'")) {
                        return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                    }
                    this.bump();
                    break;
                }
                case 123 /* `{` */: {
                    nestedBraces += 1;
                    this.bump();
                    break;
                }
                case 125 /* `}` */: {
                    if (nestedBraces > 0) {
                        nestedBraces -= 1;
                    }
                    else {
                        return {
                            val: this.message.slice(startPosition.offset, this.offset()),
                            err: null,
                        };
                    }
                    break;
                }
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null,
        };
    };
    Parser.prototype.parseNumberSkeletonFromString = function (skeleton, location) {
        var tokens = [];
        try {
            tokens = (0,_formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__.parseNumberSkeletonFromString)(skeleton);
        }
        catch (e) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
            val: {
                type: _types__WEBPACK_IMPORTED_MODULE_1__.SKELETON_TYPE.number,
                tokens: tokens,
                location: location,
                parsedOptions: this.shouldParseSkeletons
                    ? (0,_formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__.parseNumberSkeleton)(tokens)
                    : {},
            },
            err: null,
        };
    };
    /**
     * @param nesting_level The current nesting level of messages.
     *     This can be positive when parsing message fragment in select or plural argument options.
     * @param parent_arg_type The parent argument's type.
     * @param parsed_first_identifier If provided, this is the first identifier-like selector of
     *     the argument. It is a by-product of a previous parsing attempt.
     * @param expecting_close_tag If true, this message is directly or indirectly nested inside
     *     between a pair of opening and closing tags. The nested message will not parse beyond
     *     the closing tag boundary.
     */
    Parser.prototype.tryParsePluralOrSelectOptions = function (nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a;
        var hasOtherClause = false;
        var options = [];
        var parsedSelectors = new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        // Parse:
        // one {one apple}
        // ^--^
        while (true) {
            if (selector.length === 0) {
                var startPosition = this.clonePosition();
                if (parentArgType !== 'select' && this.bumpIf('=')) {
                    // Try parse `={number}` selector
                    var result = this.tryParseDecimalInteger(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (result.err) {
                        return result;
                    }
                    selectorLocation = createLocation(startPosition, this.clonePosition());
                    selector = this.message.slice(startPosition.offset, this.offset());
                }
                else {
                    break;
                }
            }
            // Duplicate selector clauses
            if (parsedSelectors.has(selector)) {
                return this.error(parentArgType === 'select'
                    ? _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR
                    : _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === 'other') {
                hasOtherClause = true;
            }
            // Parse:
            // one {one apple}
            //     ^----------^
            this.bumpSpace();
            var openingBracePosition = this.clonePosition();
            if (!this.bumpIf('{')) {
                return this.error(parentArgType === 'select'
                    ? _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
                    : _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
                return fragmentResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
                return argCloseResult;
            }
            options.push([
                selector,
                {
                    value: fragmentResult.val,
                    location: createLocation(openingBracePosition, this.clonePosition()),
                },
            ]);
            // Keep track of the existing selectors
            parsedSelectors.add(selector);
            // Prep next selector clause.
            this.bumpSpace();
            (_a = this.parseIdentifierIfPossible(), selector = _a.value, selectorLocation = _a.location);
        }
        if (options.length === 0) {
            return this.error(parentArgType === 'select'
                ? _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR
                : _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return { val: options, err: null };
    };
    Parser.prototype.tryParseDecimalInteger = function (expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf('+')) {
        }
        else if (this.bumpIf('-')) {
            sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch >= 48 /* `0` */ && ch <= 57 /* `9` */) {
                hasDigits = true;
                decimal = decimal * 10 + (ch - 48);
                this.bump();
            }
            else {
                break;
            }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
            return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
        }
        return { val: decimal, err: null };
    };
    Parser.prototype.offset = function () {
        return this.position.offset;
    };
    Parser.prototype.isEOF = function () {
        return this.offset() === this.message.length;
    };
    Parser.prototype.clonePosition = function () {
        // This is much faster than `Object.assign` or spread.
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column,
        };
    };
    /**
     * Return the code point at the current position of the parser.
     * Throws if the index is out of bound.
     */
    Parser.prototype.char = function () {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error('out of bound');
        }
        var code = codePointAt(this.message, offset);
        if (code === undefined) {
            throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
        }
        return code;
    };
    Parser.prototype.error = function (kind, location) {
        return {
            val: null,
            err: {
                kind: kind,
                message: this.message,
                location: location,
            },
        };
    };
    /** Bump the parser to the next UTF-16 code unit. */
    Parser.prototype.bump = function () {
        if (this.isEOF()) {
            return;
        }
        var code = this.char();
        if (code === 10 /* '\n' */) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        }
        else {
            this.position.column += 1;
            // 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
            this.position.offset += code < 0x10000 ? 1 : 2;
        }
    };
    /**
     * If the substring starting at the current position of the parser has
     * the given prefix, then bump the parser to the character immediately
     * following the prefix and return true. Otherwise, don't bump the parser
     * and return false.
     */
    Parser.prototype.bumpIf = function (prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
            for (var i = 0; i < prefix.length; i++) {
                this.bump();
            }
            return true;
        }
        return false;
    };
    /**
     * Bump the parser until the pattern character is found and return `true`.
     * Otherwise bump to the end of the file and return `false`.
     */
    Parser.prototype.bumpUntil = function (pattern) {
        var currentOffset = this.offset();
        var index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
            this.bumpTo(index);
            return true;
        }
        else {
            this.bumpTo(this.message.length);
            return false;
        }
    };
    /**
     * Bump the parser to the target offset.
     * If target offset is beyond the end of the input, bump the parser to the end of the input.
     */
    Parser.prototype.bumpTo = function (targetOffset) {
        if (this.offset() > targetOffset) {
            throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
            var offset = this.offset();
            if (offset === targetOffset) {
                break;
            }
            if (offset > targetOffset) {
                throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    };
    /** advance the parser through all whitespace to the next non-whitespace code unit. */
    Parser.prototype.bumpSpace = function () {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
            this.bump();
        }
    };
    /**
     * Peek at the *next* Unicode codepoint in the input without advancing the parser.
     * If the input has been exhausted, then this returns null.
     */
    Parser.prototype.peek = function () {
        if (this.isEOF()) {
            return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 0x10000 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
    };
    return Parser;
}());

/**
 * This check if codepoint is alphabet (lower & uppercase)
 * @param codepoint
 * @returns
 */
function _isAlpha(codepoint) {
    return ((codepoint >= 97 && codepoint <= 122) ||
        (codepoint >= 65 && codepoint <= 90));
}
function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47; /* '/' */
}
/** See `parseTag` function docs. */
function _isPotentialElementNameChar(c) {
    return (c === 45 /* '-' */ ||
        c === 46 /* '.' */ ||
        (c >= 48 && c <= 57) /* 0..9 */ ||
        c === 95 /* '_' */ ||
        (c >= 97 && c <= 122) /** a..z */ ||
        (c >= 65 && c <= 90) /* A..Z */ ||
        c == 0xb7 ||
        (c >= 0xc0 && c <= 0xd6) ||
        (c >= 0xd8 && c <= 0xf6) ||
        (c >= 0xf8 && c <= 0x37d) ||
        (c >= 0x37f && c <= 0x1fff) ||
        (c >= 0x200c && c <= 0x200d) ||
        (c >= 0x203f && c <= 0x2040) ||
        (c >= 0x2070 && c <= 0x218f) ||
        (c >= 0x2c00 && c <= 0x2fef) ||
        (c >= 0x3001 && c <= 0xd7ff) ||
        (c >= 0xf900 && c <= 0xfdcf) ||
        (c >= 0xfdf0 && c <= 0xfffd) ||
        (c >= 0x10000 && c <= 0xeffff));
}
/**
 * Code point equivalent of regex `\p{White_Space}`.
 * From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isWhiteSpace(c) {
    return ((c >= 0x0009 && c <= 0x000d) ||
        c === 0x0020 ||
        c === 0x0085 ||
        (c >= 0x200e && c <= 0x200f) ||
        c === 0x2028 ||
        c === 0x2029);
}
/**
 * Code point equivalent of regex `\p{Pattern_Syntax}`.
 * See https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isPatternSyntax(c) {
    return ((c >= 0x0021 && c <= 0x0023) ||
        c === 0x0024 ||
        (c >= 0x0025 && c <= 0x0027) ||
        c === 0x0028 ||
        c === 0x0029 ||
        c === 0x002a ||
        c === 0x002b ||
        c === 0x002c ||
        c === 0x002d ||
        (c >= 0x002e && c <= 0x002f) ||
        (c >= 0x003a && c <= 0x003b) ||
        (c >= 0x003c && c <= 0x003e) ||
        (c >= 0x003f && c <= 0x0040) ||
        c === 0x005b ||
        c === 0x005c ||
        c === 0x005d ||
        c === 0x005e ||
        c === 0x0060 ||
        c === 0x007b ||
        c === 0x007c ||
        c === 0x007d ||
        c === 0x007e ||
        c === 0x00a1 ||
        (c >= 0x00a2 && c <= 0x00a5) ||
        c === 0x00a6 ||
        c === 0x00a7 ||
        c === 0x00a9 ||
        c === 0x00ab ||
        c === 0x00ac ||
        c === 0x00ae ||
        c === 0x00b0 ||
        c === 0x00b1 ||
        c === 0x00b6 ||
        c === 0x00bb ||
        c === 0x00bf ||
        c === 0x00d7 ||
        c === 0x00f7 ||
        (c >= 0x2010 && c <= 0x2015) ||
        (c >= 0x2016 && c <= 0x2017) ||
        c === 0x2018 ||
        c === 0x2019 ||
        c === 0x201a ||
        (c >= 0x201b && c <= 0x201c) ||
        c === 0x201d ||
        c === 0x201e ||
        c === 0x201f ||
        (c >= 0x2020 && c <= 0x2027) ||
        (c >= 0x2030 && c <= 0x2038) ||
        c === 0x2039 ||
        c === 0x203a ||
        (c >= 0x203b && c <= 0x203e) ||
        (c >= 0x2041 && c <= 0x2043) ||
        c === 0x2044 ||
        c === 0x2045 ||
        c === 0x2046 ||
        (c >= 0x2047 && c <= 0x2051) ||
        c === 0x2052 ||
        c === 0x2053 ||
        (c >= 0x2055 && c <= 0x205e) ||
        (c >= 0x2190 && c <= 0x2194) ||
        (c >= 0x2195 && c <= 0x2199) ||
        (c >= 0x219a && c <= 0x219b) ||
        (c >= 0x219c && c <= 0x219f) ||
        c === 0x21a0 ||
        (c >= 0x21a1 && c <= 0x21a2) ||
        c === 0x21a3 ||
        (c >= 0x21a4 && c <= 0x21a5) ||
        c === 0x21a6 ||
        (c >= 0x21a7 && c <= 0x21ad) ||
        c === 0x21ae ||
        (c >= 0x21af && c <= 0x21cd) ||
        (c >= 0x21ce && c <= 0x21cf) ||
        (c >= 0x21d0 && c <= 0x21d1) ||
        c === 0x21d2 ||
        c === 0x21d3 ||
        c === 0x21d4 ||
        (c >= 0x21d5 && c <= 0x21f3) ||
        (c >= 0x21f4 && c <= 0x22ff) ||
        (c >= 0x2300 && c <= 0x2307) ||
        c === 0x2308 ||
        c === 0x2309 ||
        c === 0x230a ||
        c === 0x230b ||
        (c >= 0x230c && c <= 0x231f) ||
        (c >= 0x2320 && c <= 0x2321) ||
        (c >= 0x2322 && c <= 0x2328) ||
        c === 0x2329 ||
        c === 0x232a ||
        (c >= 0x232b && c <= 0x237b) ||
        c === 0x237c ||
        (c >= 0x237d && c <= 0x239a) ||
        (c >= 0x239b && c <= 0x23b3) ||
        (c >= 0x23b4 && c <= 0x23db) ||
        (c >= 0x23dc && c <= 0x23e1) ||
        (c >= 0x23e2 && c <= 0x2426) ||
        (c >= 0x2427 && c <= 0x243f) ||
        (c >= 0x2440 && c <= 0x244a) ||
        (c >= 0x244b && c <= 0x245f) ||
        (c >= 0x2500 && c <= 0x25b6) ||
        c === 0x25b7 ||
        (c >= 0x25b8 && c <= 0x25c0) ||
        c === 0x25c1 ||
        (c >= 0x25c2 && c <= 0x25f7) ||
        (c >= 0x25f8 && c <= 0x25ff) ||
        (c >= 0x2600 && c <= 0x266e) ||
        c === 0x266f ||
        (c >= 0x2670 && c <= 0x2767) ||
        c === 0x2768 ||
        c === 0x2769 ||
        c === 0x276a ||
        c === 0x276b ||
        c === 0x276c ||
        c === 0x276d ||
        c === 0x276e ||
        c === 0x276f ||
        c === 0x2770 ||
        c === 0x2771 ||
        c === 0x2772 ||
        c === 0x2773 ||
        c === 0x2774 ||
        c === 0x2775 ||
        (c >= 0x2794 && c <= 0x27bf) ||
        (c >= 0x27c0 && c <= 0x27c4) ||
        c === 0x27c5 ||
        c === 0x27c6 ||
        (c >= 0x27c7 && c <= 0x27e5) ||
        c === 0x27e6 ||
        c === 0x27e7 ||
        c === 0x27e8 ||
        c === 0x27e9 ||
        c === 0x27ea ||
        c === 0x27eb ||
        c === 0x27ec ||
        c === 0x27ed ||
        c === 0x27ee ||
        c === 0x27ef ||
        (c >= 0x27f0 && c <= 0x27ff) ||
        (c >= 0x2800 && c <= 0x28ff) ||
        (c >= 0x2900 && c <= 0x2982) ||
        c === 0x2983 ||
        c === 0x2984 ||
        c === 0x2985 ||
        c === 0x2986 ||
        c === 0x2987 ||
        c === 0x2988 ||
        c === 0x2989 ||
        c === 0x298a ||
        c === 0x298b ||
        c === 0x298c ||
        c === 0x298d ||
        c === 0x298e ||
        c === 0x298f ||
        c === 0x2990 ||
        c === 0x2991 ||
        c === 0x2992 ||
        c === 0x2993 ||
        c === 0x2994 ||
        c === 0x2995 ||
        c === 0x2996 ||
        c === 0x2997 ||
        c === 0x2998 ||
        (c >= 0x2999 && c <= 0x29d7) ||
        c === 0x29d8 ||
        c === 0x29d9 ||
        c === 0x29da ||
        c === 0x29db ||
        (c >= 0x29dc && c <= 0x29fb) ||
        c === 0x29fc ||
        c === 0x29fd ||
        (c >= 0x29fe && c <= 0x2aff) ||
        (c >= 0x2b00 && c <= 0x2b2f) ||
        (c >= 0x2b30 && c <= 0x2b44) ||
        (c >= 0x2b45 && c <= 0x2b46) ||
        (c >= 0x2b47 && c <= 0x2b4c) ||
        (c >= 0x2b4d && c <= 0x2b73) ||
        (c >= 0x2b74 && c <= 0x2b75) ||
        (c >= 0x2b76 && c <= 0x2b95) ||
        c === 0x2b96 ||
        (c >= 0x2b97 && c <= 0x2bff) ||
        (c >= 0x2e00 && c <= 0x2e01) ||
        c === 0x2e02 ||
        c === 0x2e03 ||
        c === 0x2e04 ||
        c === 0x2e05 ||
        (c >= 0x2e06 && c <= 0x2e08) ||
        c === 0x2e09 ||
        c === 0x2e0a ||
        c === 0x2e0b ||
        c === 0x2e0c ||
        c === 0x2e0d ||
        (c >= 0x2e0e && c <= 0x2e16) ||
        c === 0x2e17 ||
        (c >= 0x2e18 && c <= 0x2e19) ||
        c === 0x2e1a ||
        c === 0x2e1b ||
        c === 0x2e1c ||
        c === 0x2e1d ||
        (c >= 0x2e1e && c <= 0x2e1f) ||
        c === 0x2e20 ||
        c === 0x2e21 ||
        c === 0x2e22 ||
        c === 0x2e23 ||
        c === 0x2e24 ||
        c === 0x2e25 ||
        c === 0x2e26 ||
        c === 0x2e27 ||
        c === 0x2e28 ||
        c === 0x2e29 ||
        (c >= 0x2e2a && c <= 0x2e2e) ||
        c === 0x2e2f ||
        (c >= 0x2e30 && c <= 0x2e39) ||
        (c >= 0x2e3a && c <= 0x2e3b) ||
        (c >= 0x2e3c && c <= 0x2e3f) ||
        c === 0x2e40 ||
        c === 0x2e41 ||
        c === 0x2e42 ||
        (c >= 0x2e43 && c <= 0x2e4f) ||
        (c >= 0x2e50 && c <= 0x2e51) ||
        c === 0x2e52 ||
        (c >= 0x2e53 && c <= 0x2e7f) ||
        (c >= 0x3001 && c <= 0x3003) ||
        c === 0x3008 ||
        c === 0x3009 ||
        c === 0x300a ||
        c === 0x300b ||
        c === 0x300c ||
        c === 0x300d ||
        c === 0x300e ||
        c === 0x300f ||
        c === 0x3010 ||
        c === 0x3011 ||
        (c >= 0x3012 && c <= 0x3013) ||
        c === 0x3014 ||
        c === 0x3015 ||
        c === 0x3016 ||
        c === 0x3017 ||
        c === 0x3018 ||
        c === 0x3019 ||
        c === 0x301a ||
        c === 0x301b ||
        c === 0x301c ||
        c === 0x301d ||
        (c >= 0x301e && c <= 0x301f) ||
        c === 0x3020 ||
        c === 0x3030 ||
        c === 0xfd3e ||
        c === 0xfd3f ||
        (c >= 0xfe45 && c <= 0xfe46));
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/regex.generated.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/regex.generated.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SPACE_SEPARATOR_REGEX": () => (/* binding */ SPACE_SEPARATOR_REGEX),
/* harmony export */   "WHITE_SPACE_REGEX": () => (/* binding */ WHITE_SPACE_REGEX)
/* harmony export */ });
// @generated from regex-gen.ts
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/;


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/types.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/types.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TYPE": () => (/* binding */ TYPE),
/* harmony export */   "SKELETON_TYPE": () => (/* binding */ SKELETON_TYPE),
/* harmony export */   "isLiteralElement": () => (/* binding */ isLiteralElement),
/* harmony export */   "isArgumentElement": () => (/* binding */ isArgumentElement),
/* harmony export */   "isNumberElement": () => (/* binding */ isNumberElement),
/* harmony export */   "isDateElement": () => (/* binding */ isDateElement),
/* harmony export */   "isTimeElement": () => (/* binding */ isTimeElement),
/* harmony export */   "isSelectElement": () => (/* binding */ isSelectElement),
/* harmony export */   "isPluralElement": () => (/* binding */ isPluralElement),
/* harmony export */   "isPoundElement": () => (/* binding */ isPoundElement),
/* harmony export */   "isTagElement": () => (/* binding */ isTagElement),
/* harmony export */   "isNumberSkeleton": () => (/* binding */ isNumberSkeleton),
/* harmony export */   "isDateTimeSkeleton": () => (/* binding */ isDateTimeSkeleton),
/* harmony export */   "createLiteralElement": () => (/* binding */ createLiteralElement),
/* harmony export */   "createNumberElement": () => (/* binding */ createNumberElement)
/* harmony export */ });
var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    TYPE[TYPE["pound"] = 7] = "pound";
    /**
     * XML-like tag
     */
    TYPE[TYPE["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function (SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.dateTime);
}
function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value: value,
    };
}
function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value: value,
        style: style,
    };
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/date-time.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/date-time.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseDateTimeSkeleton": () => (/* binding */ parseDateTimeSkeleton)
/* harmony export */ });
/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseDateTimeSkeleton": () => (/* reexport safe */ _date_time__WEBPACK_IMPORTED_MODULE_0__.parseDateTimeSkeleton),
/* harmony export */   "parseNumberSkeleton": () => (/* reexport safe */ _number__WEBPACK_IMPORTED_MODULE_1__.parseNumberSkeleton),
/* harmony export */   "parseNumberSkeletonFromString": () => (/* reexport safe */ _number__WEBPACK_IMPORTED_MODULE_1__.parseNumberSkeletonFromString)
/* harmony export */ });
/* harmony import */ var _date_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date-time */ "./node_modules/@formatjs/icu-skeleton-parser/lib/date-time.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number */ "./node_modules/@formatjs/icu-skeleton-parser/lib/number.js");




/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/number.js":
/*!******************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/number.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseNumberSkeletonFromString": () => (/* binding */ parseNumberSkeletonFromString),
/* harmony export */   "parseNumberSkeleton": () => (/* binding */ parseNumberSkeleton)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _regex_generated__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.generated */ "./node_modules/@formatjs/icu-skeleton-parser/lib/regex.generated.js");


function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
        throw new Error('Number skeleton cannot be empty');
    }
    // Parse the skeleton
    var stringTokens = skeleton
        .split(_regex_generated__WEBPACK_IMPORTED_MODULE_0__.WHITE_SPACE_REGEX)
        .filter(function (x) { return x.length > 0; });
    var tokens = [];
    for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split('/');
        if (stemAndOptions.length === 0) {
            throw new Error('Invalid number skeleton');
        }
        var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
            var option = options_1[_a];
            if (option.length === 0) {
                throw new Error('Invalid number skeleton');
            }
        }
        tokens.push({ stem: stem, options: options });
    }
    return tokens;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
    var result = {};
    if (str[str.length - 1] === 'r') {
        result.roundingPriority = 'morePrecision';
    }
    else if (str[str.length - 1] === 's') {
        result.roundingPriority = 'lessPrecision';
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
        case '()':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
        case '+!':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
        case '()!':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
        case '+?':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
        case '()?':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
        case '+_':
            return {
                signDisplay: 'never',
            };
    }
}
function parseConciseScientificAndEngineeringStem(stem) {
    // Engineering
    var result;
    if (stem[0] === 'E' && stem[1] === 'E') {
        result = {
            notation: 'engineering',
        };
        stem = stem.slice(2);
    }
    else if (stem[0] === 'E') {
        result = {
            notation: 'scientific',
        };
        stem = stem.slice(1);
    }
    if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === '+!') {
            result.signDisplay = 'always';
            stem = stem.slice(2);
        }
        else if (signDisplay === '+?') {
            result.signDisplay = 'exceptZero';
            stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
            throw new Error('Malformed concise eng/scientific notation');
        }
        result.minimumIntegerDigits = stem.length;
    }
    return result;
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function parseNumberSkeleton(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
            case '%':
                result.style = 'percent';
                continue;
            case '%x100':
                result.style = 'percent';
                result.scale = 100;
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
            case ',_':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
            case '.':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
            case 'unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
            case 'K':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
            case 'KK':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
            case 'scale':
                result.scale = parseFloat(token.options[0]);
                continue;
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
            case 'integer-width':
                if (token.options.length > 1) {
                    throw new RangeError('integer-width stems only accept a single optional option');
                }
                token.options[0].replace(INTEGER_WIDTH_REGEX, function (_, g1, g2, g3, g4, g5) {
                    if (g1) {
                        result.minimumIntegerDigits = g2.length;
                    }
                    else if (g3 && g4) {
                        throw new Error('We currently do not support maximum integer digits');
                    }
                    else if (g5) {
                        throw new Error('We currently do not support exact integer digits');
                    }
                    return '';
                });
                continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
            result.minimumIntegerDigits = token.stem.length;
            continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            // Precision
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
            // precision-integer case
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === '*') {
                    result.minimumFractionDigits = g1.length;
                }
                // .### case
                else if (g3 && g3[0] === '#') {
                    result.maximumFractionDigits = g3.length;
                }
                // .00## case
                else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                }
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return '';
            });
            var opt = token.options[0];
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
            if (opt === 'w') {
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), { trailingZeroDisplay: 'stripIfInteger' });
            }
            else if (opt) {
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), parseSignificantPrecision(opt));
            }
            continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
            result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), conciseScientificAndEngineeringOpts);
        }
    }
    return result;
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/regex.generated.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/regex.generated.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WHITE_SPACE_REGEX": () => (/* binding */ WHITE_SPACE_REGEX)
/* harmony export */ });
// @generated from regex-gen.ts
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;


/***/ }),

/***/ "./resources/js/App.svelte":
/*!*********************************!*\
  !*** ./resources/js/App.svelte ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
/* harmony import */ var _components_Nav_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Nav.svelte */ "./resources/js/components/Nav.svelte");
/* harmony import */ var _components_Header_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Header.svelte */ "./resources/js/components/Header.svelte");
/* harmony import */ var _components_Section_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Section.svelte */ "./resources/js/components/Section.svelte");
/* harmony import */ var _components_sections_About_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/sections/About.svelte */ "./resources/js/components/sections/About.svelte");
/* harmony import */ var _components_sections_Skill_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/sections/Skill.svelte */ "./resources/js/components/sections/Skill.svelte");
/* harmony import */ var _components_sections_Project_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/sections/Project.svelte */ "./resources/js/components/sections/Project.svelte");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\App.svelte generated by Svelte v3.46.3 */




 // sections





function create_else_block(ctx) {
  var nav;
  var t0;
  var div;
  var header;
  var t1;
  var section0;
  var t2;
  var section1;
  var t3;
  var section2;
  var current;
  nav = new _components_Nav_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({});
  header = new _components_Header_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({});
  section0 = new _components_Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
    props: {
      sectionId: "about",
      $$slots: {
        "default": [create_default_slot_2]
      },
      $$scope: {
        ctx: ctx
      }
    }
  });
  section1 = new _components_Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
    props: {
      sectionId: "skill",
      $$slots: {
        "default": [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    }
  });
  section2 = new _components_Section_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
    props: {
      sectionId: "project",
      $$slots: {
        "default": [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    }
  });
  return {
    c: function c() {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(nav.$$.fragment);
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(header.$$.fragment);
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(section0.$$.fragment);
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(section1.$$.fragment);
      t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(section2.$$.fragment);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "id", "container");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(nav, target, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t0, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(header, div, null);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(section0, div, null);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(section1, div, null);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t3);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(section2, div, null);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(nav.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(header.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(section0.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(section1.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(section2.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(nav.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(header.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(section0.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(section1.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(section2.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(nav, detaching);
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t0);
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(header);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(section0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(section1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(section2);
    }
  };
} // (19:4) {#if $isLoading}


function create_if_block(ctx) {
  var h1;
  return {
    c: function c() {
      h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
      h1.textContent = "Loading";
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h1, "class", "text-3xl uppercase");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, h1, anchor);
    },
    i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(h1);
    }
  };
} // (27:12) <Section sectionId="about">


function create_default_slot_2(ctx) {
  var about;
  var current;
  about = new _components_sections_About_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({});
  return {
    c: function c() {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(about.$$.fragment);
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(about, target, anchor);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(about.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(about.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(about, detaching);
    }
  };
} // (31:12) <Section sectionId="skill">


function create_default_slot_1(ctx) {
  var skill;
  var current;
  skill = new _components_sections_Skill_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({});
  return {
    c: function c() {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(skill.$$.fragment);
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(skill, target, anchor);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(skill.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(skill.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(skill, detaching);
    }
  };
} // (35:12) <Section sectionId="project">


function create_default_slot(ctx) {
  var project;
  var current;
  project = new _components_sections_Project_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({});
  return {
    c: function c() {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(project.$$.fragment);
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(project, target, anchor);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(project.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(project.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(project, detaching);
    }
  };
}

function create_fragment(ctx) {
  var main;
  var current_block_type_index;
  var if_block;
  var current;
  var mounted;
  var dispose;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$isLoading*/
    ctx[1]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      main = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("main");
      if_block.c();
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, main, anchor);
      if_blocks[current_block_type_index].m(main, null);
      current = true;

      if (!mounted) {
        dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(window, "scroll",
        /*scroll_handler*/
        ctx[2]);
        mounted = true;
      }
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx, dirty);

      if (current_block_type_index !== previous_block_index) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {}

        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
        if_block.m(main, null);
      }
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(main);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $isLoading;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_1__.isLoading, function ($$value) {
    return $$invalidate(1, $isLoading = $$value);
  });
  var scroll = 0;

  var scroll_handler = function scroll_handler() {
    $$invalidate(0, scroll = document.documentElement.scrollTop);
  };

  return [scroll, $isLoading, scroll_handler];
}

var App = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(App, _SvelteComponent);

  var _super = _createSuper(App);

  function App(options) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
    return _this;
  }

  return _createClass(App);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./resources/js/components/Header.svelte":
/*!***********************************************!*\
  !*** ./resources/js/components/Header.svelte ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
/* harmony import */ var _helpers_AnimatedDots__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/AnimatedDots */ "./resources/js/helpers/AnimatedDots.js");
/* harmony import */ var _helpers_AnimatedText_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/AnimatedText.ts */ "./resources/js/helpers/AnimatedText.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\Header.svelte generated by Svelte v3.46.3 */






function create_fragment(ctx) {
  var header;
  var canvas;
  var t0;
  var div1;
  var div0;
  var h10;
  var span0;
  var t1_value =
  /*$t*/
  ctx[0]('home.hello') + "";
  var t1;
  var t2;
  var span1;
  var t3_value =
  /*$t*/
  ctx[0]('home.name') + "";
  var t3;
  var t4;
  var h2;
  var t5_value =
  /*$t*/
  ctx[0]('home.and') + "";
  var t5;
  var t6;
  var h11;
  return {
    c: function c() {
      header = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("header");
      canvas = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("canvas");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      h10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
      span0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      span1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
      t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t3_value);
      t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      h2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h2");
      t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t5_value);
      t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      h11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
      h11.innerHTML = "<span id=\"job-title\">.</span> \n                <span id=\"blink\" class=\"blink\">|</span>";
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(canvas, "id", "canvas");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(canvas, "class", "w-100 h-100");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span1, "class", "p-1 text-white capitalize bg-red-600 rounded-md small-caps");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h10, "class", "mx-auto my-0 text-3xl capitalize");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h2, "class", "mx-auto mt-2 mb-5 text-lg text-white");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h11, "id", "");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h11, "class", "text-2xl");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "text-white mx-auto text-center relative top-[50%] translate-y-[-50%]");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "container absolute top-0 left-0 justify-center w-full align-middle d-flex h-100 align-items-center rtl:right-0");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div1, "height", "100vh");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div1, "width", "100vw");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(header, "id", "canvas-header");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(header, "class", "relative w-full h-screen");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, header, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(header, canvas);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(header, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(header, div1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, h10);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h10, span0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span0, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h10, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h10, span1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span1, t3);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t4);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, h2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h2, t5);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t6);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, h11);
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$t*/
      1 && t1_value !== (t1_value =
      /*$t*/
      ctx[0]('home.hello') + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);
      if (dirty &
      /*$t*/
      1 && t3_value !== (t3_value =
      /*$t*/
      ctx[0]('home.name') + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t3, t3_value);
      if (dirty &
      /*$t*/
      1 && t5_value !== (t5_value =
      /*$t*/
      ctx[0]('home.and') + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t5, t5_value);
    },
    i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(header);
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $t;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.t, function ($$value) {
    return $$invalidate(0, $t = $$value);
  });
  (0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(function () {
    (0,_helpers_AnimatedDots__WEBPACK_IMPORTED_MODULE_3__.runAnimatedDots)('canvas');
    new _helpers_AnimatedText_ts__WEBPACK_IMPORTED_MODULE_4__["default"](document.querySelector('#job-title'), ['A Back End Web Developer', 'A Laravel Developer', 'A Full Stack Web Developer', 'An Ionic Devloper', 'A Flutter Developer']).run();
  });
  return [$t];
}

var Header = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(Header, _SvelteComponent);

  var _super = _createSuper(Header);

  function Header(options) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
    return _this;
  }

  return _createClass(Header);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./resources/js/components/Nav.svelte":
/*!********************************************!*\
  !*** ./resources/js/components/Nav.svelte ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var _nav_LangSelector_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nav/LangSelector.svelte */ "./resources/js/components/nav/LangSelector.svelte");
/* harmony import */ var _nav_DarkModeToggler_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nav/DarkModeToggler.svelte */ "./resources/js/components/nav/DarkModeToggler.svelte");
/* harmony import */ var _stores_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stores/tab */ "./resources/js/stores/tab.js");
/* harmony import */ var svelte_scrollto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! svelte-scrollto */ "./node_modules/svelte-scrollto/src/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\Nav.svelte generated by Svelte v3.46.3 */








function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i].icon;
  child_ctx[7] = list[i].txt;
  return child_ctx;
} // (44:20) {:else}


function create_else_block(ctx) {
  var path;
  var path_transition;
  var current;
  return {
    c: function c() {
      path = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "fill-rule", "evenodd");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "d", "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "clip-rule", "evenodd");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, path, anchor);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(function () {
        if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.fade, {}, true);
        path_transition.run(1);
      });
      current = true;
    },
    o: function o(local) {
      if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.fade, {}, false);
      path_transition.run(0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(path);
      if (detaching && path_transition) path_transition.end();
    }
  };
} // (37:20) {#if opend}


function create_if_block(ctx) {
  var path;
  var path_transition;
  var current;
  return {
    c: function c() {
      path = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "fill-rule", "evenodd");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "clip-rule", "evenodd");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, path, anchor);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(function () {
        if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.fade, {}, true);
        path_transition.run(1);
      });
      current = true;
    },
    o: function o(local) {
      if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.fade, {}, false);
      path_transition.run(0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(path);
      if (detaching && path_transition) path_transition.end();
    }
  };
} // (63:12) {#each navLinks as { icon, txt }}


function create_each_block(ctx) {
  var a;
  var i;
  var i_class_value;
  var t0;
  var span;
  var t1_value =
  /*$t*/
  ctx[1]("nav.".concat(
  /*txt*/
  ctx[7])) + "";
  var t1;
  var t2;
  var a_class_value;
  var a_href_value;
  var scrollto_action;
  var mounted;
  var dispose;

  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[5](
      /*txt*/
      ctx[7])
    );
  }

  return {
    c: function c() {
      a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
      i = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("i");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(i, "class", i_class_value = "fas fa fa-" +
      /*icon*/
      ctx[6]);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value = "px-4 py-2 mt-2 text-sm font-semibold capitalize bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline " + (
      /*$tabStore*/
      ctx[2] ===
      /*txt*/
      ctx[7] ? 'text-gray-900 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active' : ''));
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = '#' +
      /*txt*/
      ctx[7]);
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, a, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, i);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, span);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, t2);

      if (!mounted) {
        dispose = [(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(scrollto_action = svelte_scrollto__WEBPACK_IMPORTED_MODULE_6__.scrollto.call(null, a, "#".concat(
        /*txt*/
        ctx[7]))), (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(click_handler_1))];
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*$t*/
      2 && t1_value !== (t1_value =
      /*$t*/
      ctx[1]("nav.".concat(
      /*txt*/
      ctx[7])) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);

      if (dirty &
      /*$tabStore*/
      4 && a_class_value !== (a_class_value = "px-4 py-2 mt-2 text-sm font-semibold capitalize bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline " + (
      /*$tabStore*/
      ctx[2] ===
      /*txt*/
      ctx[7] ? 'text-gray-900 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active' : ''))) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value);
      }
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(a);
      mounted = false;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
    }
  };
}

function create_fragment(ctx) {
  var div2;
  var div1;
  var div0;
  var a;
  var t0_value =
  /*$t*/
  ctx[1]('nav.portfolio') + "";
  var t0;
  var t1;
  var button;
  var svg;
  var current_block_type_index;
  var if_block;
  var t2;
  var nav;
  var darkmodetoggler0;
  var t3;
  var t4;
  var langselector;
  var nav_class_value;
  var t5;
  var darkmodetoggler1;
  var current;
  var mounted;
  var dispose;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*opend*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  darkmodetoggler0 = new _nav_DarkModeToggler_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
    props: {
      addonClassList: "md:hidden"
    }
  });
  var each_value =
  /*navLinks*/
  ctx[3];
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  langselector = new _nav_LangSelector_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({});
  darkmodetoggler1 = new _nav_DarkModeToggler_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
    props: {
      addonClassList: "hidden md:inline-block"
    }
  });
  return {
    c: function c() {
      div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
      svg = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("svg");
      if_block.c();
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      nav = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("nav");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(darkmodetoggler0.$$.fragment);
      t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(langselector.$$.fragment);
      t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(darkmodetoggler1.$$.fragment);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", "/");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", "text-lg font-semibold tracking-widest text-white whitespace-pre rounded-lg focus:outline-none focus:shadow-outline");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(a, "font-variant", "small-caps");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "fill", "currentColor");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "viewBox", "0 0 20 20");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "class", "w-6 h-6");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "class", "rounded-lg md:hidden focus:outline-none focus:shadow-outline");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "flex flex-row items-center justify-between p-4");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(nav, "class", nav_class_value = "flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-center md:flex-row " + (
      /*opend*/
      ctx[0] ? 'flex bg-blue-700 dark:bg-gray-800' : 'hidden bg-[transparent]'));
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "class", "fixed z-50 w-full text-gray-200 transition bg-blue-700 dark:bg-gray-800 ltr:left-0 rtl:right-0");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div2, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, a);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, button);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(button, svg);
      if_blocks[current_block_type_index].m(svg, null);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, nav);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(darkmodetoggler0, nav, null);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(nav, t3);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].m(nav, null);
      }

      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(nav, t4);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(langselector, nav, null);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t5);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(darkmodetoggler1, div1, null);
      current = true;

      if (!mounted) {
        dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(
        /*click_handler*/
        ctx[4]));
        mounted = true;
      }
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*$t*/
      2) && t0_value !== (t0_value =
      /*$t*/
      ctx[1]('nav.portfolio') + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t0, t0_value);
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx, dirty);

      if (current_block_type_index !== previous_block_index) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {}

        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
        if_block.m(svg, null);
      }

      if (dirty &
      /*$tabStore, navLinks, $t*/
      14) {
        each_value =
        /*navLinks*/
        ctx[3];

        var _i3;

        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i3);

          if (each_blocks[_i3]) {
            each_blocks[_i3].p(child_ctx, dirty);
          } else {
            each_blocks[_i3] = create_each_block(child_ctx);

            each_blocks[_i3].c();

            each_blocks[_i3].m(nav, t4);
          }
        }

        for (; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (!current || dirty &
      /*opend*/
      1 && nav_class_value !== (nav_class_value = "flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-center md:flex-row " + (
      /*opend*/
      ctx[0] ? 'flex bg-blue-700 dark:bg-gray-800' : 'hidden bg-[transparent]'))) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(nav, "class", nav_class_value);
      }
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(darkmodetoggler0.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(langselector.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(darkmodetoggler1.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(darkmodetoggler0.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(langselector.$$.fragment, local);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(darkmodetoggler1.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div2);
      if_blocks[current_block_type_index].d();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(darkmodetoggler0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(langselector);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(darkmodetoggler1);
      mounted = false;
      dispose();
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $t;
  var $tabStore;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_1__.t, function ($$value) {
    return $$invalidate(1, $t = $$value);
  });
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores_tab__WEBPACK_IMPORTED_MODULE_5__["default"], function ($$value) {
    return $$invalidate(2, $tabStore = $$value);
  });
  var opend = false;
  var navLinks = [{
    icon: 'blog',
    txt: 'blog'
  }, {
    icon: 'address-book',
    txt: 'contact'
  }, {
    icon: 'project-diagram',
    txt: 'my_projects'
  }];

  var click_handler = function click_handler() {
    $$invalidate(0, opend = !opend);
  };

  var click_handler_1 = function click_handler_1(txt) {
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores_tab__WEBPACK_IMPORTED_MODULE_5__["default"], $tabStore = txt, $tabStore);
  };

  return [opend, $t, $tabStore, navLinks, click_handler, click_handler_1];
}

var Nav = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(Nav, _SvelteComponent);

  var _super = _createSuper(Nav);

  function Nav(options) {
    var _this;

    _classCallCheck(this, Nav);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
    return _this;
  }

  return _createClass(Nav);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Nav);

/***/ }),

/***/ "./resources/js/components/Section.svelte":
/*!************************************************!*\
  !*** ./resources/js/components/Section.svelte ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\Section.svelte generated by Svelte v3.46.3 */



function create_fragment(ctx) {
  var html_tag;
  var raw0_value = "<!-- ".concat(
  /*sectionId*/
  ctx[0], " Start -->") + "";
  var t0;
  var section;
  var div;
  var h1;
  var t1_value =
  /*$t*/
  ctx[1]("home.title.".concat(
  /*sectionId*/
  ctx[0])) + "";
  var t1;
  var t2;
  var hr;
  var t3;
  var section_class_value;
  var t4;
  var html_tag_1;
  var raw1_value = "<!-- ".concat(
  /*sectionId*/
  ctx[0], " Ends -->") + "";
  var html_anchor;
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[3]["default"];
  var default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx,
  /*$$scope*/
  ctx[2], null);
  return {
    c: function c() {
      html_tag = new svelte_internal__WEBPACK_IMPORTED_MODULE_0__.HtmlTag();
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      section = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("section");
      div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      hr = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("hr");
      t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      if (default_slot) default_slot.c();
      t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      html_tag_1 = new svelte_internal__WEBPACK_IMPORTED_MODULE_0__.HtmlTag();
      html_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
      html_tag.a = t0;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h1, "class", "text-2xl");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(hr, "class", "w-1/4 px-5 mx-auto mt-1 border border-gray-500 rounded");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(section, "id",
      /*sectionId*/
      ctx[0]);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(section, "class", section_class_value = "w-full h-full py-4 text-center text-gray-700 dark:text-white ".concat(
      /*sectionId*/
      ctx[0], "-section"));
      html_tag_1.a = html_anchor;
    },
    m: function m(target, anchor) {
      html_tag.m(raw0_value, target, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t0, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, section, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(section, div);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, h1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h1, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, hr);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(section, t3);

      if (default_slot) {
        default_slot.m(section, null);
      }

      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t4, anchor);
      html_tag_1.m(raw1_value, target, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, html_anchor, anchor);
      current = true;
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*sectionId*/
      1) && raw0_value !== (raw0_value = "<!-- ".concat(
      /*sectionId*/
      ctx[0], " Start -->") + "")) html_tag.p(raw0_value);
      if ((!current || dirty &
      /*$t, sectionId*/
      3) && t1_value !== (t1_value =
      /*$t*/
      ctx[1]("home.title.".concat(
      /*sectionId*/
      ctx[0])) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);

      if (default_slot) {
        if (default_slot.p && (!current || dirty &
        /*$$scope*/
        4)) {
          (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[2], !current ? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(
          /*$$scope*/
          ctx[2]) : (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template,
          /*$$scope*/
          ctx[2], dirty, null), null);
        }
      }

      if (!current || dirty &
      /*sectionId*/
      1) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(section, "id",
        /*sectionId*/
        ctx[0]);
      }

      if (!current || dirty &
      /*sectionId*/
      1 && section_class_value !== (section_class_value = "w-full h-full py-4 text-center text-gray-700 dark:text-white ".concat(
      /*sectionId*/
      ctx[0], "-section"))) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(section, "class", section_class_value);
      }

      if ((!current || dirty &
      /*sectionId*/
      1) && raw1_value !== (raw1_value = "<!-- ".concat(
      /*sectionId*/
      ctx[0], " Ends -->") + "")) html_tag_1.p(raw1_value);
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) html_tag.d();
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t0);
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(section);
      if (default_slot) default_slot.d(detaching);
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t4);
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(html_anchor);
      if (detaching) html_tag_1.d();
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $t;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_1__.t, function ($$value) {
    return $$invalidate(1, $t = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  var sectionId = $$props.sectionId;

  $$self.$$set = function ($$props) {
    if ('sectionId' in $$props) $$invalidate(0, sectionId = $$props.sectionId);
    if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };

  return [sectionId, $t, $$scope, slots];
}

var Section = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(Section, _SvelteComponent);

  var _super = _createSuper(Section);

  function Section(options) {
    var _this;

    _classCallCheck(this, Section);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {
      sectionId: 0
    });
    return _this;
  }

  return _createClass(Section);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Section);

/***/ }),

/***/ "./resources/js/components/nav/DarkModeToggler.svelte":
/*!************************************************************!*\
  !*** ./resources/js/components/nav/DarkModeToggler.svelte ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _stores_darkMode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stores/darkMode */ "./resources/js/stores/darkMode.js");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\nav\DarkModeToggler.svelte generated by Svelte v3.46.3 */




function create_else_block(ctx) {
  var path;
  var path_transition;
  var current;
  return {
    c: function c() {
      path = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "d", "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, path, anchor);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(function () {
        if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, true);
        path_transition.run(1);
      });
      current = true;
    },
    o: function o(local) {
      if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, false);
      path_transition.run(0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(path);
      if (detaching && path_transition) path_transition.end();
    }
  };
} // (21:8) {#if $darkMode}


function create_if_block(ctx) {
  var path;
  var path_transition;
  var current;
  return {
    c: function c() {
      path = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "fill-rule", "evenodd");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "d", "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "clip-rule", "evenodd");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, path, anchor);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(function () {
        if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, true);
        path_transition.run(1);
      });
      current = true;
    },
    o: function o(local) {
      if (!path_transition) path_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(path, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.scale, {}, false);
      path_transition.run(0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(path);
      if (detaching && path_transition) path_transition.end();
    }
  };
}

function create_fragment(ctx) {
  var a;
  var svg;
  var current_block_type_index;
  var if_block;
  var a_class_value;
  var a_href_value;
  var current;
  var mounted;
  var dispose;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$darkMode*/
    ctx[1]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
      svg = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("svg");
      if_block.c();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "class", "w-5 h-5");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "aria-label", "Apply light theme");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "fill", "currentColor");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "viewBox", "0 0 20 20");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value = "" + (
      /*addonClassList*/
      ctx[0] + " px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg !text-center dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline capitalize"));
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = '#');
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, a, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, svg);
      if_blocks[current_block_type_index].m(svg, null);
      current = true;

      if (!mounted) {
        dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(
        /*click_handler*/
        ctx[2]));
        mounted = true;
      }
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx, dirty);

      if (current_block_type_index !== previous_block_index) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {}

        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
        if_block.m(svg, null);
      }

      if (!current || dirty &
      /*addonClassList*/
      1 && a_class_value !== (a_class_value = "" + (
      /*addonClassList*/
      ctx[0] + " px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg !text-center dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline capitalize"))) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value);
      }
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(a);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $darkMode;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores_darkMode__WEBPACK_IMPORTED_MODULE_1__["default"], function ($$value) {
    return $$invalidate(1, $darkMode = $$value);
  });
  var _$$props$addonClassLi = $$props.addonClassList,
      addonClassList = _$$props$addonClassLi === void 0 ? '' : _$$props$addonClassLi;

  var click_handler = function click_handler() {
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores_darkMode__WEBPACK_IMPORTED_MODULE_1__["default"], $darkMode = !$darkMode, $darkMode);
  };

  $$self.$$set = function ($$props) {
    if ('addonClassList' in $$props) $$invalidate(0, addonClassList = $$props.addonClassList);
  };

  return [addonClassList, $darkMode, click_handler];
}

var DarkModeToggler = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(DarkModeToggler, _SvelteComponent);

  var _super = _createSuper(DarkModeToggler);

  function DarkModeToggler(options) {
    var _this;

    _classCallCheck(this, DarkModeToggler);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {
      addonClassList: 0
    });
    return _this;
  }

  return _createClass(DarkModeToggler);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DarkModeToggler);

/***/ }),

/***/ "./resources/js/components/nav/LangSelector.svelte":
/*!*********************************************************!*\
  !*** ./resources/js/components/nav/LangSelector.svelte ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/transition */ "./node_modules/svelte/transition/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
/* harmony import */ var _plugins_clickOutside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../plugins/clickOutside */ "./resources/js/plugins/clickOutside.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\nav\LangSelector.svelte generated by Svelte v3.46.3 */





function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
} // (37:4) {#if open}


function create_if_block(ctx) {
  var div1;
  var div0;
  var clickOutside_action;
  var div1_transition;
  var current;
  var mounted;
  var dispose;
  var each_value =
  /*$locales*/
  ctx[2];
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  return {
    c: function c() {
      div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "px-2 py-2 bg-blue-700 rounded-md shadow dark:shadow-black dark:bg-gray-800");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "absolute right-0 w-full mt-2 origin-top-right bg-gray-700 rounded-md shadow-lg md:w-48");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].m(div0, null);
      }

      current = true;

      if (!mounted) {
        dispose = [(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(clickOutside_action = _plugins_clickOutside__WEBPACK_IMPORTED_MODULE_3__.clickOutside.call(null, div1)), (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(div1, "click_outside",
        /*click_outside_handler*/
        ctx[6])];
        mounted = true;
      }
    },
    p: function p(ctx, dirty) {
      if (dirty &
      /*$locale, $locales*/
      12) {
        each_value =
        /*$locales*/
        ctx[2];

        var _i3;

        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i3);

          if (each_blocks[_i3]) {
            each_blocks[_i3].p(child_ctx, dirty);
          } else {
            each_blocks[_i3] = create_each_block(child_ctx);

            each_blocks[_i3].c();

            each_blocks[_i3].m(div0, null);
          }
        }

        for (; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(function () {
        if (!div1_transition) div1_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div1, svelte_transition__WEBPACK_IMPORTED_MODULE_1__.slide, {}, true);
        div1_transition.run(1);
      });
      current = true;
    },
    o: function o(local) {
      if (!div1_transition) div1_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div1, svelte_transition__WEBPACK_IMPORTED_MODULE_1__.slide, {}, false);
      div1_transition.run(0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
      if (detaching && div1_transition) div1_transition.end();
      mounted = false;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
    }
  };
} // (49:16) {#each $locales as loc}


function create_each_block(ctx) {
  var a;
  var t_1_value =
  /*loc*/
  ctx[8].replace('en', 'English').replace('ar', 'العربية') + "";
  var t_1;
  var a_class_value;
  var a_href_value;
  var mounted;
  var dispose;

  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[5](
      /*loc*/
      ctx[8])
    );
  }

  return {
    c: function c() {
      a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
      t_1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_1_value);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value = "block px-4 py-2 my-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline " + (
      /*$locale*/
      ctx[3] ===
      /*loc*/
      ctx[8] ? 'bg-green-700 hover:bg-teal-500 focus:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:bg-teal-700' : ''));
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "href", a_href_value = '#');
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, a, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(a, t_1);

      if (!mounted) {
        dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(click_handler_1));
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*$locales*/
      4 && t_1_value !== (t_1_value =
      /*loc*/
      ctx[8].replace('en', 'English').replace('ar', 'العربية') + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t_1, t_1_value);

      if (dirty &
      /*$locale, $locales*/
      12 && a_class_value !== (a_class_value = "block px-4 py-2 my-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline " + (
      /*$locale*/
      ctx[3] ===
      /*loc*/
      ctx[8] ? 'bg-green-700 hover:bg-teal-500 focus:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:bg-teal-700' : ''))) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(a, "class", a_class_value);
      }
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(a);
      mounted = false;
      dispose();
    }
  };
}

function create_fragment(ctx) {
  var div;
  var button;
  var i;
  var t0;
  var span;
  var t1_value =
  /*$t*/
  ctx[1]('nav.language') + "";
  var t1;
  var t2;
  var svg;
  var path;
  var svg_class_value;
  var t3;
  var current;
  var mounted;
  var dispose;
  var if_block =
  /*open*/
  ctx[0] && create_if_block(ctx);
  return {
    c: function c() {
      div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
      i = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("i");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      svg = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("svg");
      path = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
      t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      if (if_block) if_block.c();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(i, "class", "fas fa fa-language");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "fill-rule", "evenodd");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "d", "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(path, "clip-rule", "evenodd");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "fill", "currentColor");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "viewBox", "0 0 20 20");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "class", svg_class_value = "inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 " + (
      /*open*/
      ctx[0] ? 'rotate-180' : 'rotate-0'));
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button, "class", "flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left capitalize bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "relative");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, button);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(button, i);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(button, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(button, span);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(button, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(button, svg);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(svg, path);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t3);
      if (if_block) if_block.m(div, null);
      current = true;

      if (!mounted) {
        dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(
        /*click_handler*/
        ctx[4]));
        mounted = true;
      }
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*$t*/
      2) && t1_value !== (t1_value =
      /*$t*/
      ctx[1]('nav.language') + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);

      if (!current || dirty &
      /*open*/
      1 && svg_class_value !== (svg_class_value = "inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 " + (
      /*open*/
      ctx[0] ? 'rotate-180' : 'rotate-0'))) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(svg, "class", svg_class_value);
      }

      if (
      /*open*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*open*/
          1) {
            (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, function () {
          if_block = null;
        });
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
      }
    },
    i: function i(local) {
      if (current) return;
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
      current = true;
    },
    o: function o(local) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $isLoading;
  var $t;
  var $locales;
  var $locale;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.isLoading, function ($$value) {
    return $$invalidate(7, $isLoading = $$value);
  });
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.t, function ($$value) {
    return $$invalidate(1, $t = $$value);
  });
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.locales, function ($$value) {
    return $$invalidate(2, $locales = $$value);
  });
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.locale, function ($$value) {
    return $$invalidate(3, $locale = $$value);
  });
  var open = false; // document element scripts

  svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.locale.subscribe(function (locale) {
    if ($isLoading) return;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  });

  var click_handler = function click_handler() {
    $$invalidate(0, open = !open);
  };

  var click_handler_1 = function click_handler_1(loc) {
    if ($locale === loc) return;
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.locale, $locale = loc, $locale);
  };

  var click_outside_handler = function click_outside_handler() {
    $$invalidate(0, open = false);
  };

  return [open, $t, $locales, $locale, click_handler, click_handler_1, click_outside_handler];
}

var LangSelector = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(LangSelector, _SvelteComponent);

  var _super = _createSuper(LangSelector);

  function LangSelector(options) {
    var _this;

    _classCallCheck(this, LangSelector);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
    return _this;
  }

  return _createClass(LangSelector);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LangSelector);

/***/ }),

/***/ "./resources/js/components/sections/About.svelte":
/*!*******************************************************!*\
  !*** ./resources/js/components/sections/About.svelte ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\sections\About.svelte generated by Svelte v3.46.3 */



function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[2] = list[i].title;
  child_ctx[3] = list[i].icon;
  child_ctx[4] = list[i].txt;
  return child_ctx;
} // (39:4) {#each features as { title, icon, txt }}


function create_each_block(ctx) {
  var div1;
  var div0;
  var i;
  var i_class_value;
  var t0;
  var h3;
  var t1_value =
  /*title*/
  ctx[2] + "";
  var t1;
  var t2;
  var span;
  var t3_value =
  /*txt*/
  ctx[4] + "";
  var t3;
  var t4;
  return {
    c: function c() {
      div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      i = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("i");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      h3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
      t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t3_value);
      t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(i, "class", i_class_value = 'fas fa-2x fa-' +
      /*icon*/
      ctx[3]);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "py-1 mx-auto text-lg cursor-pointer wyg");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(h3, "class", "mt-3 text-xl capitalize d-block small-caps");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "class", "text-gray-600 dark:text-gray-400 group-hover:text-white");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "p-2 mb-3 transition duration-300 border border-gray-500 rounded shadow cursor-pointer dark:shadow-black pros hover:shadow-lg hover:bg-blue-600 hover:text-white dark:hover:bg-gray-700 group");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, i);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, h3);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(h3, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, span);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span, t3);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t4);
    },
    p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
    }
  };
}

function create_fragment(ctx) {
  var div;
  var each_value =
  /*features*/
  ctx[0];
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  return {
    c: function c() {
      div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "grid h-full grid-cols-1 p-2 text-center sm:grid-cols-2 sm:gap-3 md:grid-cols-3 sm:text-left sm:rtl:text-right");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].m(div, null);
      }
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*features*/
      1) {
        each_value =
        /*features*/
        ctx[0];

        var _i3;

        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i3);

          if (each_blocks[_i3]) {
            each_blocks[_i3].p(child_ctx, dirty);
          } else {
            each_blocks[_i3] = create_each_block(child_ctx);

            each_blocks[_i3].c();

            each_blocks[_i3].m(div, null);
          }
        }

        for (; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $t;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_1__.t, function ($$value) {
    return $$invalidate(1, $t = $$value);
  });
  var features = [{
    title: $t('home.about.responsive'),
    icon: 'tablet-alt',
    txt: $t('home.about.responsive_txt')
  }, {
    title: $t('home.about.dynamic'),
    icon: 'rocket',
    txt: $t('home.about.dynamic_txt')
  }, {
    title: $t('home.about.tested'),
    icon: 'cog',
    txt: $t('home.about.tested_txt')
  }, {
    title: $t('home.about.organized'),
    icon: 'code',
    txt: $t('home.about.organized_txt')
  }, {
    title: $t('home.about.up_to_date'),
    icon: 'laptop-code',
    txt: $t('home.about.up_to_date_txt')
  }, {
    title: $t('home.about.multi_language'),
    icon: 'language',
    txt: $t('home.about.multi_language_txt')
  }];
  return [features];
}

var About = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(About, _SvelteComponent);

  var _super = _createSuper(About);

  function About(options) {
    var _this;

    _classCallCheck(this, About);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
    return _this;
  }

  return _createClass(About);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);

/***/ }),

/***/ "./resources/js/components/sections/Project.svelte":
/*!*********************************************************!*\
  !*** ./resources/js/components/sections/Project.svelte ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\sections\Project.svelte generated by Svelte v3.46.3 */



function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
} // (17:12) {#each tabs as tab}


function create_each_block(ctx) {
  var li;
  var t0_value =
  /*tab*/
  ctx[5].title + "";
  var t0;
  var t1;
  var li_class_value;
  var mounted;
  var dispose;

  function click_handler() {
    return (
      /*click_handler*/
      ctx[2](
      /*tab*/
      ctx[5])
    );
  }

  return {
    c: function c() {
      li = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(li, "class", li_class_value = 'px-4 py-2 transition border-b-8 cursor-pointer dark:border-b-gray-700 ' + (
      /*activeTab*/
      ctx[0] ===
      /*tab*/
      ctx[5].value ? 'text-blue-500 !border-blue-500 font-semibold' : 'text-gray-500'));
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, li, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(li, t1);

      if (!mounted) {
        dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(li, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(click_handler));
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*activeTab*/
      1 && li_class_value !== (li_class_value = 'px-4 py-2 transition border-b-8 cursor-pointer dark:border-b-gray-700 ' + (
      /*activeTab*/
      ctx[0] ===
      /*tab*/
      ctx[5].value ? 'text-blue-500 !border-blue-500 font-semibold' : 'text-gray-500'))) {
        (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(li, "class", li_class_value);
      }
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(li);
      mounted = false;
      dispose();
    }
  };
}

function create_fragment(ctx) {
  var div1;
  var div0;
  var ul;
  var each_value =
  /*tabs*/
  ctx[1];
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  return {
    c: function c() {
      div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      ul = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(ul, "class", "flex items-center justify-center my-4 ");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, ul);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].m(ul, null);
      }
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*activeTab, tabs*/
      3) {
        each_value =
        /*tabs*/
        ctx[1];

        var _i3;

        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i3);

          if (each_blocks[_i3]) {
            each_blocks[_i3].p(child_ctx, dirty);
          } else {
            each_blocks[_i3] = create_each_block(child_ctx);

            each_blocks[_i3].c();

            each_blocks[_i3].m(ul, null);
          }
        }

        for (; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
    }
  };
}

var modalOpen = false;

function instance($$self, $$props, $$invalidate) {
  var $t;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_1__.t, function ($$value) {
    return $$invalidate(3, $t = $$value);
  });
  var activeTab = 'all';
  var currentProject = {};
  var tabs = [{
    title: $t('home.project.tabs.all'),
    value: 'all'
  }, {
    title: $t('home.project.tabs.laravel'),
    value: 'laravel'
  }, {
    title: $t('home.project.tabs.spa'),
    value: 'spa'
  }, {
    title: $t('home.project.tabs.mobile'),
    value: 'mobile'
  }];

  var click_handler = function click_handler(tab) {
    $$invalidate(0, activeTab = tab.value);
  };

  return [activeTab, tabs, click_handler];
}

var Project = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(Project, _SvelteComponent);

  var _super = _createSuper(Project);

  function Project(options) {
    var _this;

    _classCallCheck(this, Project);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
    return _this;
  }

  return _createClass(Project);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./resources/js/components/sections/Skill.svelte":
/*!*******************************************************!*\
  !*** ./resources/js/components/sections/Skill.svelte ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");
/* harmony import */ var _helpers_ScrollObserver_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/ScrollObserver.ts */ "./resources/js/helpers/ScrollObserver.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* resources\js\components\sections\Skill.svelte generated by Svelte v3.46.3 */





function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[3] = list[i].title;
  child_ctx[4] = list[i].value;
  return child_ctx;
} // (53:8) {#each skills as { title, value }}


function create_each_block(ctx) {
  var div4;
  var div0;
  var t0_value =
  /*title*/
  ctx[3] + "";
  var t0;
  var t1;
  var div3;
  var div2;
  var div1;
  var t2_value = (
  /*value*/
  ctx[4] || 0) + '%' + "";
  var t2;
  var animateSkillBar_action;
  var t3;
  var mounted;
  var dispose;
  return {
    c: function c() {
      div4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      div3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t2_value);
      t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "w-3/12 text-white capitalize bg-gray-900 rounded-l rtl:rounded-r small-caps dark:bg-gray-400 dark:text-white");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "inline-block px-2 text-xs text-white bg-teal-700 rounded-full");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "class", "text-center bg-teal-900 rounded-r-full rtl:rounded-l-full transation duration-[750ms]");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div2, "width", "0%");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div3, "class", "w-9/12 bg-gray-300 rounded-r-full rtl:rounded-l-full");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div4, "class", "flex flex-row w-full my-2");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div4, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div4, div0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div4, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div4, div3);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div3, div2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div4, t3);

      if (!mounted) {
        dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(animateSkillBar_action =
        /*animateSkillBar*/
        ctx[2].call(null, div2,
        /*value*/
        ctx[4]));
        mounted = true;
      }
    },
    p: function p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div4);
      mounted = false;
      dispose();
    }
  };
}

function create_fragment(ctx) {
  var div2;
  var div0;
  var img;
  var img_src_value;
  var t0;
  var p;
  var t1_value =
  /*$t*/
  ctx[0]('home.skill.skill_info') + "";
  var t1;
  var t2;
  var div1;
  var each_value =
  /*skills*/
  ctx[1];
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  return {
    c: function c() {
      div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
      img = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("img");
      t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
      t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
      t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
      div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      if (!(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.src_url_equal)(img.src, img_src_value = "/img/myAvatar.png")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "src", img_src_value);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "class", "w-3/4 p-1 mx-auto border rounded lazy img border-secondary");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(img, "alt", "my avatar");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p, "class", "mt-2 text-gray-500 capitalize");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "text-center");
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "class", "grid w-full grid-cols-1 p-2 md:grid-cols-2 gap-y-7 md:gap-4");
    },
    m: function m(target, anchor) {
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div2, anchor);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, img);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t0);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, p);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p, t1);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div1);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].m(div1, null);
      }
    },
    p: function p(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$t*/
      1 && t1_value !== (t1_value =
      /*$t*/
      ctx[0]('home.skill.skill_info') + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);

      if (dirty &
      /*skills*/
      2) {
        each_value =
        /*skills*/
        ctx[1];

        var _i3;

        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i3);

          if (each_blocks[_i3]) {
            each_blocks[_i3].p(child_ctx, dirty);
          } else {
            each_blocks[_i3] = create_each_block(child_ctx);

            each_blocks[_i3].c();

            each_blocks[_i3].m(div1, null);
          }
        }

        for (; _i3 < each_blocks.length; _i3 += 1) {
          each_blocks[_i3].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
    d: function d(detaching) {
      if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div2);
      (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var $t;
  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, svelte_i18n__WEBPACK_IMPORTED_MODULE_2__.t, function ($$value) {
    return $$invalidate(0, $t = $$value);
  });
  var skills = [{
    title: 'php',
    value: 95
  }, {
    title: 'oop',
    value: 85
  }, {
    title: 'mysql',
    value: 80
  }, {
    title: 'laravel',
    value: 95
  }, {
    title: 'livewire',
    value: 80
  }, {
    title: 'lumen',
    value: 90
  }, {
    title: 'ionic',
    value: 85
  }, {
    title: 'unit Testing',
    value: 85
  }, {
    title: 'html',
    value: 90
  }, {
    title: 'css',
    value: 85
  }, {
    title: 'javascipt',
    value: 85
  }, {
    title: 'typescript',
    value: 85
  }, {
    title: 'vue',
    value: 90
  }, {
    title: 'jquery',
    value: 80
  }, {
    title: 'alpine Js',
    value: 85
  }, {
    title: 'bootstrap',
    value: 85
  }, {
    title: 'tailwindcss',
    value: 90
  }, {
    title: 'spa',
    value: 85
  }, {
    title: 'flutter',
    value: 50
  }];

  function animateSkillBar(el, value) {
    var observer = new _helpers_ScrollObserver_ts__WEBPACK_IMPORTED_MODULE_3__["default"](function (entries) {
      var initalValue = 20;

      if (true === entries[0].isIntersecting && el.style.width === "".concat(initalValue, "%")) {
        setTimeout(function () {
          for (var i = 0; i < value - initalValue; i++) {
            el.style.width = "".concat(parseInt(el.style.width.replace('%', '')) + 1, "%");
          }
        }, 150);
        return;
      }

      el.style.width = "".concat(initalValue, "%");
    }).observer;
    observer.observe(document.getElementById('skill'));
  }

  return [$t, skills, animateSkillBar];
}

var Skill = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(Skill, _SvelteComponent);

  var _super = _createSuper(Skill);

  function Skill(options) {
    var _this;

    _classCallCheck(this, Skill);

    _this = _super.call(this);
    (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(_assertThisInitialized(_this), options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});
    return _this;
  }

  return _createClass(Skill);
}(svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Skill);

/***/ }),

/***/ "./resources/js/app.ts":
/*!*****************************!*\
  !*** ./resources/js/app.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _i18n_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n.js */ "./resources/js/i18n.js");
/* harmony import */ var _App_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.svelte */ "./resources/js/App.svelte");


var app = new _App_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
  target: document.body // props: {
  // 	name: 'world'
  // }

});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

/***/ }),

/***/ "./resources/js/helpers/AnimatedText.ts":
/*!**********************************************!*\
  !*** ./resources/js/helpers/AnimatedText.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnimatedText)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var AnimatedText = /*#__PURE__*/function () {
  function AnimatedText(el, arr) {
    _classCallCheck(this, AnimatedText);

    this.stringInx = 0;
    this.currentArrayInx = 0;
    this.arr = [''];
    this.interval = {};
    this.el = el;
    this.arr = arr;
  }

  _createClass(AnimatedText, [{
    key: "run",
    value: function run() {
      var _this = this;

      this.el.textContent = ''; // uncomment below to activate
      // this.interval = setInterval((_) => {
      //     this.typeWriter();
      // }, 150);

      window.addEventListener('hashchange', function () {
        // @ts-ignore
        clearInterval(_this.interval);
      });
    }
  }, {
    key: "typeWriter",
    value: function typeWriter() {
      if (this.stringInx >= this.arr[this.currentArrayInx].length) {
        if (this.currentArrayInx >= this.arr.length - 1) {
          this.currentArrayInx = -1;
        }

        this.stringInx = 0;
        this.el.textContent = '';
        this.currentArrayInx++;
        return;
      }

      this.el.textContent += this.arr[this.currentArrayInx].charAt(this.stringInx);
      this.stringInx++;
    }
  }]);

  return AnimatedText;
}();



/***/ }),

/***/ "./resources/js/helpers/ScrollObserver.ts":
/*!************************************************!*\
  !*** ./resources/js/helpers/ScrollObserver.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScrollObserver)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollObserver = /*#__PURE__*/_createClass(function ScrollObserver(onInter) {
  _classCallCheck(this, ScrollObserver);

  this.observer = new IntersectionObserver(onInter, {
    root: null,
    threshold: 0.3 // percentage of taregt's visible area. Triggers "onIntersection"

  });
});



/***/ }),

/***/ "./resources/js/helpers/AnimatedDots.js":
/*!**********************************************!*\
  !*** ./resources/js/helpers/AnimatedDots.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runAnimatedDots": () => (/* binding */ runAnimatedDots),
/* harmony export */   "clearBG": () => (/* binding */ clearBG),
/* harmony export */   "setup": () => (/* binding */ setup)
/* harmony export */ });
var _this = undefined;

var opts = {
  get lineColor() {
    return colorVariation({
      r: 150,
      g: 150,
      b: 150
    });
  },

  particleAmount: 30,
  defaultSpeed: 1,
  variantSpeed: 1,
  defaultRadius: 2,
  variantRadius: 2,
  linkRadius: 200,
  animationFrame: 0,
  canvasBody: '',
  drawArea: ''
};
var delay = 200,
    tid,
    rgb = opts.lineColor.match(/\d+/g),
    w,
    h,
    particles = 0;
function runAnimatedDots(canvasID) {
  opts.canvasBody = document.querySelector("#".concat(canvasID)), opts.drawArea = opts.canvasBody.getContext('2d'); // change line color

  rgb = opts.lineColor.match(/\d+/g);
  resizeReset(); // uncommment below to activate
  // setup();
}

var resizeReset = function resizeReset() {
  w = opts.canvasBody.width = window.innerWidth;
  h = opts.canvasBody.height = window.innerHeight;
};

var drawCanvasBG = function drawCanvasBG() {
  var color = {
    r: 12,
    g: 9,
    b: 29
  };
  opts.drawArea.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
  opts.drawArea.fillRect(0, 0, w, h);
};

var clearBG = function clearBG() {
  if (!particles) return;
  particles.splice(0);

  _this.cancelAnimationFrame(opts.animationFrame);

  opts.drawArea.clearRect(0, 0, w, h);
};

var checkDistance = function checkDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
/**
 * Provides some nice color variation
 * Accepts an rgba object
 * returns a modified rgba object or a rgba string if
 * true is passed in for argument 2
 *
 * @param color
 * @param returnString
 */


function colorVariation(color) {
  var r, g, b, a;
  var colorVari = 255;
  r = Math.round(Math.random() * colorVari - colorVari / 2 + color.r);
  g = Math.round(Math.random() * colorVari - colorVari / 2 + color.g);
  b = Math.round(Math.random() * colorVari - colorVari / 2 + color.b);
  a = Math.random() + 0.5;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

var linkPoints = function linkPoints(point1, hubs) {
  for (var i = 0; i < hubs.length; i++) {
    var distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
    var opacity = 1 - distance / opts.linkRadius;

    if (opacity > 0) {
      opts.drawArea.lineWidth = 0.5;
      opts.drawArea.strokeStyle = "rgba(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ", ").concat(opacity, ")");
      opts.drawArea.beginPath();
      opts.drawArea.moveTo(point1.x, point1.y);
      opts.drawArea.lineTo(hubs[i].x, hubs[i].y);
      opts.drawArea.closePath();
      opts.drawArea.stroke();
    }
  }
};

var Particle = function Particle(xPos, yPos) {
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
  this.directionAngle = Math.floor(Math.random() * 360);
  this.color = colorVariation({
    r: 200,
    g: 200,
    b: 200
  });
  this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
  this.vector = {
    x: Math.cos(this.directionAngle) * this.speed,
    y: Math.sin(this.directionAngle) * this.speed
  };

  this.update = function () {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  };

  this.border = function () {
    if (this.x >= w || this.x <= 0) {
      this.vector.x *= -1;
    }

    if (this.y >= h || this.y <= 0) {
      this.vector.y *= -1;
    }

    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  };

  this.draw = function () {
    opts.drawArea.beginPath();
    opts.drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    opts.drawArea.closePath();
    opts.drawArea.fillStyle = this.color;
    opts.drawArea.fill();
  };
};

function setup() {
  particles = [];
  resizeReset();

  for (var i = 0; i < opts.particleAmount; i++) {
    particles.push(new Particle());
  }

  opts.animationFrame = window.requestAnimationFrame(loop);
}

function loop() {
  opts.animationFrame = window.requestAnimationFrame(loop);
  opts.drawArea.clearRect(0, 0, w, h);
  drawCanvasBG();

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  for (var _i = 0; _i < particles.length; _i++) {
    linkPoints(particles[_i], particles);
  }
}

/***/ }),

/***/ "./resources/js/i18n.js":
/*!******************************!*\
  !*** ./resources/js/i18n.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte-i18n */ "./node_modules/svelte-i18n/dist/runtime.esm.js");

(0,svelte_i18n__WEBPACK_IMPORTED_MODULE_0__.register)('en', function () {
  return __webpack_require__.e(/*! import() */ "resources_js_lang_en_json").then(__webpack_require__.t.bind(__webpack_require__, /*! ./lang/en.json */ "./resources/js/lang/en.json", 19));
});
(0,svelte_i18n__WEBPACK_IMPORTED_MODULE_0__.register)('ar', function () {
  return __webpack_require__.e(/*! import() */ "resources_js_lang_ar_json").then(__webpack_require__.t.bind(__webpack_require__, /*! ./lang/ar.json */ "./resources/js/lang/ar.json", 19));
});
(0,svelte_i18n__WEBPACK_IMPORTED_MODULE_0__.init)({
  fallbackLocale: 'en',
  initialLocale: localStorage.getItem('user_lang') || (0,svelte_i18n__WEBPACK_IMPORTED_MODULE_0__.getLocaleFromNavigator)()
});
svelte_i18n__WEBPACK_IMPORTED_MODULE_0__.locale.set(localStorage.getItem('user_lang') || 'en');
svelte_i18n__WEBPACK_IMPORTED_MODULE_0__.locale.subscribe(function (val) {
  localStorage.setItem('user_lang', val);
}); // starts loading 'en-US' and 'en'

/***/ }),

/***/ "./resources/js/plugins/clickOutside.js":
/*!**********************************************!*\
  !*** ./resources/js/plugins/clickOutside.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickOutside": () => (/* binding */ clickOutside)
/* harmony export */ });
/** Dispatch event on click outside of node */
function clickOutside(node) {
  var handleClick = function handleClick(event) {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node));
    }
  };

  document.addEventListener('click', handleClick, true);
  return {
    destroy: function destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

/***/ }),

/***/ "./resources/js/stores/darkMode.js":
/*!*****************************************!*\
  !*** ./resources/js/stores/darkMode.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var darkMode = (0,svelte_store__WEBPACK_IMPORTED_MODULE_1__.writable)(false);
darkMode.set(localStorage.getItem('darkMode') === '1' ? true : false);
var unsubdarkMode = darkMode.subscribe( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(val) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            localStorage.setItem('darkMode', val ? '1' : '0');
            document.documentElement.classList.toggle('dark', val);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (darkMode);

/***/ }),

/***/ "./resources/js/stores/tab.js":
/*!************************************!*\
  !*** ./resources/js/stores/tab.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var svelte_scrollto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-scrollto */ "./node_modules/svelte-scrollto/src/index.js");


var tabStore = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)('');

if (location.hash.length) {
  var sectionId = location.hash.replace('#', '');
  tabStore.set(sectionId); // wait for element to be loaded

  setTimeout(function () {
    var element = document.getElementById(sectionId);
    if (!element) return;
    svelte_scrollto__WEBPACK_IMPORTED_MODULE_1__.scrollTo({
      element: element
    });
  }, 400);
}

tabStore.subscribe(function (val) {
  if (!val) return;
  location.hash = val; // animation will be done by actions in <Nav /> componet
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabStore);

/***/ }),

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./node_modules/intl-messageformat/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PART_TYPE": () => (/* reexport safe */ _src_formatters__WEBPACK_IMPORTED_MODULE_0__.PART_TYPE),
/* harmony export */   "formatToParts": () => (/* reexport safe */ _src_formatters__WEBPACK_IMPORTED_MODULE_0__.formatToParts),
/* harmony export */   "isFormatXMLElementFn": () => (/* reexport safe */ _src_formatters__WEBPACK_IMPORTED_MODULE_0__.isFormatXMLElementFn),
/* harmony export */   "IntlMessageFormat": () => (/* reexport safe */ _src_core__WEBPACK_IMPORTED_MODULE_1__.IntlMessageFormat),
/* harmony export */   "ErrorCode": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.ErrorCode),
/* harmony export */   "FormatError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.FormatError),
/* harmony export */   "InvalidValueError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.InvalidValueError),
/* harmony export */   "InvalidValueTypeError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.InvalidValueTypeError),
/* harmony export */   "MissingValueError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.MissingValueError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/core */ "./node_modules/intl-messageformat/lib/src/core.js");
/* harmony import */ var _src_formatters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/formatters */ "./node_modules/intl-messageformat/lib/src/formatters.js");
/* harmony import */ var _src_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/error */ "./node_modules/intl-messageformat/lib/src/error.js");
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_core__WEBPACK_IMPORTED_MODULE_1__.IntlMessageFormat);


/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/core.js":
/*!*********************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/core.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IntlMessageFormat": () => (/* binding */ IntlMessageFormat)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @formatjs/icu-messageformat-parser */ "./node_modules/@formatjs/icu-messageformat-parser/lib/index.js");
/* harmony import */ var _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @formatjs/fast-memoize */ "./node_modules/@formatjs/fast-memoize/lib/index.js");
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatters */ "./node_modules/intl-messageformat/lib/src/formatters.js");
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/




// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, defaultConfig));
}
function createFastMemoizeCache(store) {
    return {
        create: function () {
            return {
                get: function (key) {
                    return store[key];
                },
                set: function (key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: (0,_formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.NumberFormat).bind.apply(_a, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.number),
            strategy: _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__.strategies.variadic,
        }),
        getDateTimeFormat: (0,_formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.DateTimeFormat).bind.apply(_a, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.dateTime),
            strategy: _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__.strategies.variadic,
        }),
        getPluralRules: (0,_formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.PluralRules).bind.apply(_a, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.pluralRules),
            strategy: _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__.strategies.variadic,
        }),
    };
}
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            var parts = _this.formatToParts(values);
            // Hot path for straight simple msg translations
            if (parts.length === 1) {
                return parts[0].value;
            }
            var result = parts.reduce(function (all, part) {
                if (!all.length ||
                    part.type !== _formatters__WEBPACK_IMPORTED_MODULE_3__.PART_TYPE.literal ||
                    typeof all[all.length - 1] !== 'string') {
                    all.push(part.value);
                }
                else {
                    all[all.length - 1] += part.value;
                }
                return all;
            }, []);
            if (result.length <= 1) {
                return result[0] || '';
            }
            return result;
        };
        this.formatToParts = function (values) {
            return (0,_formatters__WEBPACK_IMPORTED_MODULE_3__.formatToParts)(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.resolvedOptions = function () { return ({
            locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
        }); };
        this.getAst = function () { return _this.ast; };
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag,
            });
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    Object.defineProperty(IntlMessageFormat, "defaultLocale", {
        get: function () {
            if (!IntlMessageFormat.memoizedDefaultLocale) {
                IntlMessageFormat.memoizedDefaultLocale =
                    new Intl.NumberFormat().resolvedOptions().locale;
            }
            return IntlMessageFormat.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
    });
    IntlMessageFormat.memoizedDefaultLocale = null;
    IntlMessageFormat.__parse = _formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.parse;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            integer: {
                maximumFractionDigits: 0,
            },
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());



/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/error.js":
/*!**********************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/error.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorCode": () => (/* binding */ ErrorCode),
/* harmony export */   "FormatError": () => (/* binding */ FormatError),
/* harmony export */   "InvalidValueError": () => (/* binding */ InvalidValueError),
/* harmony export */   "InvalidValueTypeError": () => (/* binding */ InvalidValueTypeError),
/* harmony export */   "MissingValueError": () => (/* binding */ MissingValueError)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var ErrorCode;
(function (ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(FormatError, _super);
    function FormatError(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
    }
    FormatError.prototype.toString = function () {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    };
    return FormatError;
}(Error));

var InvalidValueError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(InvalidValueError, _super);
    function InvalidValueError(variableId, value, options, originalMessage) {
        return _super.call(this, "Invalid values for \"".concat(variableId, "\": \"").concat(value, "\". Options are \"").concat(Object.keys(options).join('", "'), "\""), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueError;
}(FormatError));

var InvalidValueTypeError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(InvalidValueTypeError, _super);
    function InvalidValueTypeError(value, type, originalMessage) {
        return _super.call(this, "Value for \"".concat(value, "\" must be of type ").concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueTypeError;
}(FormatError));

var MissingValueError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(MissingValueError, _super);
    function MissingValueError(variableId, originalMessage) {
        return _super.call(this, "The intl string context variable \"".concat(variableId, "\" was not provided to the string \"").concat(originalMessage, "\""), ErrorCode.MISSING_VALUE, originalMessage) || this;
    }
    return MissingValueError;
}(FormatError));



/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/formatters.js":
/*!***************************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/formatters.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PART_TYPE": () => (/* binding */ PART_TYPE),
/* harmony export */   "isFormatXMLElementFn": () => (/* binding */ isFormatXMLElementFn),
/* harmony export */   "formatToParts": () => (/* binding */ formatToParts)
/* harmony export */ });
/* harmony import */ var _formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @formatjs/icu-messageformat-parser */ "./node_modules/@formatjs/icu-messageformat-parser/lib/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/intl-messageformat/lib/src/error.js");


var PART_TYPE;
(function (PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== PART_TYPE.literal ||
            part.type !== PART_TYPE.literal) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === 'function';
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isLiteralElement)(els[0])) {
        return [
            {
                type: PART_TYPE.literal,
                value: els[0].value,
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isLiteralElement)(el)) {
            result.push({
                type: PART_TYPE.literal,
                value: el.value,
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isPoundElement)(el)) {
            if (typeof currentPluralValue === 'number') {
                result.push({
                    type: PART_TYPE.literal,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue),
                });
            }
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new _error__WEBPACK_IMPORTED_MODULE_1__.MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isArgumentElement)(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: typeof value === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isDateElement)(el)) {
            var style = typeof el.style === 'string'
                ? formats.date[el.style]
                : (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isDateTimeSkeleton)(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isTimeElement)(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isDateTimeSkeleton)(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isNumberElement)(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isNumberSkeleton)(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            if (style && style.scale) {
                value =
                    value *
                        (style.scale || 1);
            }
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isTagElement)(el)) {
            var children = el.children, value_1 = el.value;
            var formatFn = values[value_1];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__.InvalidValueTypeError(value_1, 'function', originalMessage);
            }
            var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            var chunks = formatFn(parts.map(function (p) { return p.value; }));
            if (!Array.isArray(chunks)) {
                chunks = [chunks];
            }
            result.push.apply(result, chunks.map(function (c) {
                return {
                    type: typeof c === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                    value: c,
                };
            }));
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isSelectElement)(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isPluralElement)(el)) {
            var opt = el.options["=".concat(value)];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new _error__WEBPACK_IMPORTED_MODULE_1__.FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", _error__WEBPACK_IMPORTED_MODULE_1__.ErrorCode.MISSING_INTL_API, originalMessage);
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}


/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\nTypeError: String.prototype.bold called on null or undefined\n    at bold (<anonymous>)\n    at E:\\laragon\\www\\svelt-portfolio\\node_modules\\tailwindcss\\lib\\util\\transformThemeValue.js:37:54\n    at E:\\laragon\\www\\svelt-portfolio\\node_modules\\tailwindcss\\lib\\util\\createUtilityPlugin.js:37:41\n    at Array.reduce (<anonymous>)\n    at font (E:\\laragon\\www\\svelt-portfolio\\node_modules\\tailwindcss\\lib\\util\\createUtilityPlugin.js:30:43)\n    at wrapped (E:\\laragon\\www\\svelt-portfolio\\node_modules\\tailwindcss\\lib\\lib\\setupContextUtils.js:369:46)\n    at resolveMatches (E:\\laragon\\www\\svelt-portfolio\\node_modules\\tailwindcss\\lib\\lib\\generateRules.js:378:47)\n    at resolveMatches.next (<anonymous>)\n    at Function.from (<anonymous>)\n    at Object.generateRules (E:\\laragon\\www\\svelt-portfolio\\node_modules\\tailwindcss\\lib\\lib\\generateRules.js:503:29)\n    at processResult (E:\\laragon\\www\\svelt-portfolio\\node_modules\\webpack\\lib\\NormalModule.js:753:19)\n    at E:\\laragon\\www\\svelt-portfolio\\node_modules\\webpack\\lib\\NormalModule.js:855:5\n    at E:\\laragon\\www\\svelt-portfolio\\node_modules\\loader-runner\\lib\\LoaderRunner.js:399:11\n    at E:\\laragon\\www\\svelt-portfolio\\node_modules\\loader-runner\\lib\\LoaderRunner.js:251:18\n    at context.callback (E:\\laragon\\www\\svelt-portfolio\\node_modules\\loader-runner\\lib\\LoaderRunner.js:124:13)\n    at Object.loader (E:\\laragon\\www\\svelt-portfolio\\node_modules\\postcss-loader\\dist\\index.js:142:7)");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/svelte-i18n/dist/runtime.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/svelte-i18n/dist/runtime.esm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ X),
/* harmony export */   "addMessages": () => (/* binding */ m),
/* harmony export */   "date": () => (/* binding */ ee),
/* harmony export */   "defineMessages": () => (/* binding */ oe),
/* harmony export */   "dictionary": () => (/* binding */ s),
/* harmony export */   "format": () => (/* binding */ X),
/* harmony export */   "getDateFormatter": () => (/* binding */ q),
/* harmony export */   "getLocaleFromHash": () => (/* binding */ z),
/* harmony export */   "getLocaleFromHostname": () => (/* binding */ N),
/* harmony export */   "getLocaleFromNavigator": () => (/* binding */ I),
/* harmony export */   "getLocaleFromPathname": () => (/* binding */ A),
/* harmony export */   "getLocaleFromQueryString": () => (/* binding */ F),
/* harmony export */   "getMessageFormatter": () => (/* binding */ H),
/* harmony export */   "getNumberFormatter": () => (/* binding */ _),
/* harmony export */   "getTimeFormatter": () => (/* binding */ B),
/* harmony export */   "init": () => (/* binding */ $),
/* harmony export */   "isLoading": () => (/* binding */ k),
/* harmony export */   "json": () => (/* binding */ te),
/* harmony export */   "locale": () => (/* binding */ M),
/* harmony export */   "locales": () => (/* binding */ f),
/* harmony export */   "number": () => (/* binding */ ne),
/* harmony export */   "register": () => (/* binding */ y),
/* harmony export */   "t": () => (/* binding */ X),
/* harmony export */   "time": () => (/* binding */ Y),
/* harmony export */   "waitLocale": () => (/* binding */ re)
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! intl-messageformat */ "./node_modules/intl-messageformat/lib/index.js");
const r={},i=(e,n,t)=>t?(n in r||(r[n]={}),e in r[n]||(r[n][e]=t),t):t,l=(e,n)=>{if(null==n)return;if(n in r&&e in r[n])return r[n][e];const t=E(n);for(let o=0;o<t.length;o++){const r=c(t[o],e);if(r)return i(e,n,r)}};let a;const s=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)({});function u(e){return e in a}function c(e,n){if(!u(e))return null;return function(e,n){if(null==n)return;if(n in e)return e[n];const t=n.split(".");let o=e;for(let e=0;e<t.length;e++)if("object"==typeof o){if(e>0){const n=t.slice(e,t.length).join(".");if(n in o){o=o[n];break}}o=o[t[e]]}else o=void 0;return o}(function(e){return a[e]||null}(e),n)}function m(e,...n){delete r[e],s.update((o=>(o[e]=deepmerge__WEBPACK_IMPORTED_MODULE_1___default().all([o[e]||{},...n]),o)))}const f=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)([s],(([e])=>Object.keys(e)));s.subscribe((e=>a=e));const d={};function g(e){return d[e]}function w(e){return null!=e&&E(e).some((e=>{var n;return null===(n=g(e))||void 0===n?void 0:n.size}))}function h(e,n){return Promise.all(n.map((n=>(function(e,n){d[e].delete(n),0===d[e].size&&delete d[e]}(e,n),n().then((e=>e.default||e)))))).then((n=>m(e,...n)))}const p={};function b(e){if(!w(e))return e in p?p[e]:Promise.resolve();const n=function(e){return E(e).map((e=>{const n=g(e);return[e,n?[...n]:[]]})).filter((([,e])=>e.length>0))}(e);return p[e]=Promise.all(n.map((([e,n])=>h(e,n)))).then((()=>{if(w(e))return b(e);delete p[e]})),p[e]}function y(e,n){g(e)||function(e){d[e]=new Set}(e);const t=g(e);g(e).has(n)||(u(e)||s.update((n=>(n[e]={},n))),t.add(n))}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function v(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t}const O={fallbackLocale:null,loadingDelay:200,formats:{number:{scientific:{notation:"scientific"},engineering:{notation:"engineering"},compactLong:{notation:"compact",compactDisplay:"long"},compactShort:{notation:"compact",compactDisplay:"short"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},warnOnMissingMessages:!0,ignoreTag:!0};function j(){return O}function $(e){const{formats:n}=e,t=v(e,["formats"]),o=e.initialLocale||e.fallbackLocale;return Object.assign(O,t,{initialLocale:o}),n&&("number"in n&&Object.assign(O.formats.number,n.number),"date"in n&&Object.assign(O.formats.date,n.date),"time"in n&&Object.assign(O.formats.time,n.time)),M.set(o)}const k=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(!1);let L;const T=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(null);function x(e){return e.split("-").map(((e,n,t)=>t.slice(0,n+1).join("-"))).reverse()}function E(e,n=j().fallbackLocale){const t=x(e);return n?[...new Set([...t,...x(n)])]:t}function D(){return null!=L?L:void 0}T.subscribe((e=>{L=null!=e?e:void 0,"undefined"!=typeof window&&null!=e&&document.documentElement.setAttribute("lang",e)}));const M=Object.assign(Object.assign({},T),{set:e=>{if(e&&function(e){if(null==e)return;const n=E(e);for(let e=0;e<n.length;e++){const t=n[e];if(u(t))return t}}(e)&&w(e)){const{loadingDelay:n}=j();let t;return"undefined"!=typeof window&&null!=D()&&n?t=window.setTimeout((()=>k.set(!0)),n):k.set(!0),b(e).then((()=>{T.set(e)})).finally((()=>{clearTimeout(t),k.set(!1)}))}return T.set(e)}}),P=(e,n)=>{const t=e.split("&").find((e=>0===e.indexOf(`${n}=`)));return t?t.split("=").pop():null},S=(e,n)=>{const t=n.exec(e);return t&&t[1]||null},N=e=>"undefined"==typeof window?null:S(window.location.hostname,e),A=e=>"undefined"==typeof window?null:S(window.location.pathname,e),I=()=>"undefined"==typeof window?null:window.navigator.language||window.navigator.languages[0],F=e=>"undefined"==typeof window?null:P(window.location.search.substr(1),e),z=e=>"undefined"==typeof window?null:P(window.location.hash.substr(1),e),Z=e=>{const n=Object.create(null);return t=>{const o=JSON.stringify(t);return o in n?n[o]:n[o]=e(t)}},C=(e,n)=>{const{formats:t}=j();if(e in t&&n in t[e])return t[e][n];throw new Error(`[svelte-i18n] Unknown "${n}" ${e} format.`)},G=Z((e=>{var{locale:n,format:t}=e,o=v(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format numbers');return t&&(o=C("number",t)),new Intl.NumberFormat(n,o)})),J=Z((e=>{var{locale:n,format:t}=e,o=v(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format dates');return t?o=C("date",t):0===Object.keys(o).length&&(o=C("date","short")),new Intl.DateTimeFormat(n,o)})),U=Z((e=>{var{locale:n,format:t}=e,o=v(e,["locale","format"]);if(null==n)throw new Error('[svelte-i18n] A "locale" must be set to format time values');return t?o=C("time",t):0===Object.keys(o).length&&(o=C("time","short")),new Intl.DateTimeFormat(n,o)})),_=(e={})=>{var{locale:n=D()}=e,t=v(e,["locale"]);return G(Object.assign({locale:n},t))},q=(e={})=>{var{locale:n=D()}=e,t=v(e,["locale"]);return J(Object.assign({locale:n},t))},B=(e={})=>{var{locale:n=D()}=e,t=v(e,["locale"]);return U(Object.assign({locale:n},t))},H=Z(((e,n=D())=>new intl_messageformat__WEBPACK_IMPORTED_MODULE_2__["default"](e,n,j().formats,{ignoreTag:j().ignoreTag}))),K=(e,n={})=>{let t=n;"object"==typeof e&&(t=e,e=t.id);const{values:o,locale:r=D(),default:i}=t;if(null==r)throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");let a=l(e,r);if(a){if("string"!=typeof a)return console.warn(`[svelte-i18n] Message with id "${e}" must be of type "string", found: "${typeof a}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`),a}else j().warnOnMissingMessages&&console.warn(`[svelte-i18n] The message "${e}" was not found in "${E(r).join('", "')}".${w(D())?"\n\nNote: there are at least one loader still registered to this locale that wasn't executed.":""}`),a=null!=i?i:e;if(!o)return a;let s=a;try{s=H(a,r).format(o)}catch(n){console.warn(`[svelte-i18n] Message "${e}" has syntax error:`,n.message)}return s},Q=(e,n)=>B(n).format(e),R=(e,n)=>q(n).format(e),V=(e,n)=>_(n).format(e),W=(e,n=D())=>l(e,n),X=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)([M,s],(()=>K)),Y=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)([M],(()=>Q)),ee=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)([M],(()=>R)),ne=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)([M],(()=>V)),te=(0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)([M,s],(()=>W));function oe(e){return e}function re(e){return b(e||D()||j().initialLocale)}


/***/ }),

/***/ "./node_modules/svelte-scrollto/src/helper.js":
/*!****************************************************!*\
  !*** ./node_modules/svelte-scrollto/src/helper.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  $(selector) {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    }
    return selector;
  },
  extend(...args) {
    return Object.assign(...args);
  },
  cumulativeOffset(element) {
    let top = 0;
    let left = 0;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  },
  directScroll(element) {
    return element && element !== document && element !== document.body;
  },
  scrollTop(element, value) {
    let inSetter = value !== undefined;
    if (this.directScroll(element)) {
      return inSetter ? (element.scrollTop = value) : element.scrollTop;
    } else {
      return inSetter
        ? (document.documentElement.scrollTop = document.body.scrollTop = value)
        : window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
    }
  },
  scrollLeft(element, value) {
    let inSetter = value !== undefined;
    if (this.directScroll(element)) {
      return inSetter ? (element.scrollLeft = value) : element.scrollLeft;
    } else {
      return inSetter
        ? (document.documentElement.scrollLeft = document.body.scrollLeft = value)
        : window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0;
    }
  }
});


/***/ }),

/***/ "./node_modules/svelte-scrollto/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/svelte-scrollto/src/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setGlobalOptions": () => (/* binding */ setGlobalOptions),
/* harmony export */   "scrollTo": () => (/* binding */ scrollTo),
/* harmony export */   "scrollToBottom": () => (/* binding */ scrollToBottom),
/* harmony export */   "scrollToTop": () => (/* binding */ scrollToTop),
/* harmony export */   "makeScrollToAction": () => (/* binding */ makeScrollToAction),
/* harmony export */   "scrollto": () => (/* binding */ scrollto),
/* harmony export */   "scrolltotop": () => (/* binding */ scrolltotop),
/* harmony export */   "scrolltobottom": () => (/* binding */ scrolltobottom)
/* harmony export */ });
/* harmony import */ var svelte_easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/easing */ "./node_modules/svelte/easing/index.mjs");
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./node_modules/svelte-scrollto/src/helper.js");




const defaultOptions = {
  container: "body",
  duration: 500,
  delay: 0,
  offset: 0,
  easing: svelte_easing__WEBPACK_IMPORTED_MODULE_0__.cubicInOut,
  onStart: svelte_internal__WEBPACK_IMPORTED_MODULE_1__.noop,
  onDone: svelte_internal__WEBPACK_IMPORTED_MODULE_1__.noop,
  onAborting: svelte_internal__WEBPACK_IMPORTED_MODULE_1__.noop,
  scrollX: false,
  scrollY: true
};

const _scrollTo = options => {
  let {
    offset,
    duration,
    delay,
    easing,
    x=0,
    y=0,
    scrollX,
    scrollY,
    onStart,
    onDone,
    container,
    onAborting,
    element
  } = options;

  if (typeof offset === "function") {
    offset = offset();
  }

  var cumulativeOffsetContainer = _helper__WEBPACK_IMPORTED_MODULE_2__["default"].cumulativeOffset(container);
  var cumulativeOffsetTarget = element
    ? _helper__WEBPACK_IMPORTED_MODULE_2__["default"].cumulativeOffset(element)
    : { top: y, left: x };

  var initialX = _helper__WEBPACK_IMPORTED_MODULE_2__["default"].scrollLeft(container);
  var initialY = _helper__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTop(container);

  var targetX =
    cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset;
  var targetY =
    cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset;

  var diffX = targetX - initialX;
	var diffY = targetY - initialY;

  let scrolling = true;
  let started = false;
  let start_time = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_1__.now)() + delay;
  let end_time = start_time + duration;

  function scrollToTopLeft(element, top, left) {
    if (scrollX) _helper__WEBPACK_IMPORTED_MODULE_2__["default"].scrollLeft(element, left);
    if (scrollY) _helper__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTop(element, top);
  }

  function start(delayStart) {
    if (!delayStart) {
      started = true;
      onStart(element, {x, y});
    }
  }

  function tick(progress) {
    scrollToTopLeft(
      container,
      initialY + diffY * progress,
      initialX + diffX * progress
    );
  }

  function stop() {
    scrolling = false;
  }

  (0,svelte_internal__WEBPACK_IMPORTED_MODULE_1__.loop)(now => {
    if (!started && now >= start_time) {
      start(false)
    }

    if (started && now >= end_time) {
      tick(1);
      stop();
      onDone(element, {x, y});
    }

    if (!scrolling) {
      onAborting(element, {x, y});
      return false;
    }
    if (started) {
      const p = now - start_time;
      const t = 0 + 1 * easing(p / duration);
      tick(t);
    }

    return true;
  });

  start(delay);

  tick(0);

  return stop;
};

const proceedOptions = options => {
	let opts = _helper__WEBPACK_IMPORTED_MODULE_2__["default"].extend({}, defaultOptions, options);
  opts.container = _helper__WEBPACK_IMPORTED_MODULE_2__["default"].$(opts.container);
  opts.element = _helper__WEBPACK_IMPORTED_MODULE_2__["default"].$(opts.element);
  return opts;
};

const scrollContainerHeight = containerElement => {
  if (
    containerElement &&
    containerElement !== document &&
    containerElement !== document.body
  ) {
    return containerElement.scrollHeight - containerElement.offsetHeight;
  } else {
    let body = document.body;
    let html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }
};

const setGlobalOptions = options => {
	_helper__WEBPACK_IMPORTED_MODULE_2__["default"].extend(defaultOptions, options || {});
};

const scrollTo = options => {
  return _scrollTo(proceedOptions(options));
};

const scrollToBottom = options => {
  options = proceedOptions(options);

  return _scrollTo(
    _helper__WEBPACK_IMPORTED_MODULE_2__["default"].extend(options, {
      element: null,
      y: scrollContainerHeight(options.container)
    })
  );
};

const scrollToTop = options => {
  options = proceedOptions(options);

  return _scrollTo(
    _helper__WEBPACK_IMPORTED_MODULE_2__["default"].extend(options, {
      element: null,
      y: 0
    })
  );
};

const makeScrollToAction = scrollToFunc => {
  return (node, options) => {
    let current = options;
    const handle = e => {
      e.preventDefault();
      scrollToFunc(
        typeof current === "string" ? { element: current } : current
      );
    };
    node.addEventListener("click", handle);
    node.addEventListener("touchstart", handle);
    return {
      update(options) {
        current = options;
      },
      destroy() {
        node.removeEventListener("click", handle);
        node.removeEventListener("touchstart", handle);
      }
    };
  };
};

const scrollto = makeScrollToAction(scrollTo);
const scrolltotop = makeScrollToAction(scrollToTop);
const scrolltobottom = makeScrollToAction(scrollToBottom);


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ "./node_modules/svelte/easing/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/svelte/easing/index.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "linear": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.identity),
/* harmony export */   "backIn": () => (/* binding */ backIn),
/* harmony export */   "backInOut": () => (/* binding */ backInOut),
/* harmony export */   "backOut": () => (/* binding */ backOut),
/* harmony export */   "bounceIn": () => (/* binding */ bounceIn),
/* harmony export */   "bounceInOut": () => (/* binding */ bounceInOut),
/* harmony export */   "bounceOut": () => (/* binding */ bounceOut),
/* harmony export */   "circIn": () => (/* binding */ circIn),
/* harmony export */   "circInOut": () => (/* binding */ circInOut),
/* harmony export */   "circOut": () => (/* binding */ circOut),
/* harmony export */   "cubicIn": () => (/* binding */ cubicIn),
/* harmony export */   "cubicInOut": () => (/* binding */ cubicInOut),
/* harmony export */   "cubicOut": () => (/* binding */ cubicOut),
/* harmony export */   "elasticIn": () => (/* binding */ elasticIn),
/* harmony export */   "elasticInOut": () => (/* binding */ elasticInOut),
/* harmony export */   "elasticOut": () => (/* binding */ elasticOut),
/* harmony export */   "expoIn": () => (/* binding */ expoIn),
/* harmony export */   "expoInOut": () => (/* binding */ expoInOut),
/* harmony export */   "expoOut": () => (/* binding */ expoOut),
/* harmony export */   "quadIn": () => (/* binding */ quadIn),
/* harmony export */   "quadInOut": () => (/* binding */ quadInOut),
/* harmony export */   "quadOut": () => (/* binding */ quadOut),
/* harmony export */   "quartIn": () => (/* binding */ quartIn),
/* harmony export */   "quartInOut": () => (/* binding */ quartInOut),
/* harmony export */   "quartOut": () => (/* binding */ quartOut),
/* harmony export */   "quintIn": () => (/* binding */ quintIn),
/* harmony export */   "quintInOut": () => (/* binding */ quintInOut),
/* harmony export */   "quintOut": () => (/* binding */ quintOut),
/* harmony export */   "sineIn": () => (/* binding */ sineIn),
/* harmony export */   "sineInOut": () => (/* binding */ sineInOut),
/* harmony export */   "sineOut": () => (/* binding */ sineOut)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");

/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/

function backInOut(t) {
  var s = 1.70158 * 1.525;
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

function backIn(t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s);
}

function backOut(t) {
  var s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1;
}

function bounceOut(t) {
  var a = 4.0 / 11.0;
  var b = 8.0 / 11.0;
  var c = 9.0 / 10.0;
  var ca = 4356.0 / 361.0;
  var cb = 35442.0 / 1805.0;
  var cc = 16061.0 / 1805.0;
  var t2 = t * t;
  return t < a ? 7.5625 * t2 : t < b ? 9.075 * t2 - 9.9 * t + 3.4 : t < c ? ca * t2 - cb * t + cc : 10.8 * t * t - 20.52 * t + 10.72;
}

function bounceInOut(t) {
  return t < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0)) : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}

function bounceIn(t) {
  return 1.0 - bounceOut(1.0 - t);
}

function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}

function circIn(t) {
  return 1.0 - Math.sqrt(1.0 - t * t);
}

function circOut(t) {
  return Math.sqrt(1 - --t * t);
}

function cubicInOut(t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}

function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  var f = t - 1.0;
  return f * f * f + 1.0;
}

function elasticInOut(t) {
  return t < 0.5 ? 0.5 * Math.sin(+13.0 * Math.PI / 2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0)) : 0.5 * Math.sin(-13.0 * Math.PI / 2 * (2.0 * t - 1.0 + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}

function elasticIn(t) {
  return Math.sin(13.0 * t * Math.PI / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}

function elasticOut(t) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0;
}

function expoInOut(t) {
  return t === 0.0 || t === 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}

function expoIn(t) {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}

function expoOut(t) {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}

function quadInOut(t) {
  t /= 0.5;
  if (t < 1) return 0.5 * t * t;
  t--;
  return -0.5 * (t * (t - 2) - 1);
}

function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return -t * (t - 2.0);
}

function quartInOut(t) {
  return t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}

function quartIn(t) {
  return Math.pow(t, 4.0);
}

function quartOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

function quintInOut(t) {
  if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
  return 0.5 * ((t -= 2) * t * t * t * t + 2);
}

function quintIn(t) {
  return t * t * t * t * t;
}

function quintOut(t) {
  return --t * t * t * t * t + 1;
}

function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}

function sineIn(t) {
  var v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;else return 1 - v;
}

function sineOut(t) {
  return Math.sin(t * Math.PI / 2);
}



/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponent": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentTyped),
/* harmony export */   "afterUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.afterUpdate),
/* harmony export */   "beforeUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.beforeUpdate),
/* harmony export */   "createEventDispatcher": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.createEventDispatcher),
/* harmony export */   "getAllContexts": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getAllContexts),
/* harmony export */   "getContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getContext),
/* harmony export */   "hasContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.hasContext),
/* harmony export */   "onDestroy": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy),
/* harmony export */   "onMount": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onMount),
/* harmony export */   "setContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.setContext),
/* harmony export */   "tick": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.tick)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");


/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": () => (/* binding */ HtmlTag),
/* harmony export */   "HtmlTagHydration": () => (/* binding */ HtmlTagHydration),
/* harmony export */   "SvelteComponent": () => (/* binding */ SvelteComponent),
/* harmony export */   "SvelteComponentDev": () => (/* binding */ SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* binding */ SvelteComponentTyped),
/* harmony export */   "SvelteElement": () => (/* binding */ SvelteElement),
/* harmony export */   "action_destroyer": () => (/* binding */ action_destroyer),
/* harmony export */   "add_attribute": () => (/* binding */ add_attribute),
/* harmony export */   "add_classes": () => (/* binding */ add_classes),
/* harmony export */   "add_flush_callback": () => (/* binding */ add_flush_callback),
/* harmony export */   "add_location": () => (/* binding */ add_location),
/* harmony export */   "add_render_callback": () => (/* binding */ add_render_callback),
/* harmony export */   "add_resize_listener": () => (/* binding */ add_resize_listener),
/* harmony export */   "add_styles": () => (/* binding */ add_styles),
/* harmony export */   "add_transform": () => (/* binding */ add_transform),
/* harmony export */   "afterUpdate": () => (/* binding */ afterUpdate),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "append_dev": () => (/* binding */ append_dev),
/* harmony export */   "append_empty_stylesheet": () => (/* binding */ append_empty_stylesheet),
/* harmony export */   "append_hydration": () => (/* binding */ append_hydration),
/* harmony export */   "append_hydration_dev": () => (/* binding */ append_hydration_dev),
/* harmony export */   "append_styles": () => (/* binding */ append_styles),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "attr_dev": () => (/* binding */ attr_dev),
/* harmony export */   "attribute_to_object": () => (/* binding */ attribute_to_object),
/* harmony export */   "beforeUpdate": () => (/* binding */ beforeUpdate),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "binding_callbacks": () => (/* binding */ binding_callbacks),
/* harmony export */   "blank_object": () => (/* binding */ blank_object),
/* harmony export */   "bubble": () => (/* binding */ bubble),
/* harmony export */   "check_outros": () => (/* binding */ check_outros),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "claim_component": () => (/* binding */ claim_component),
/* harmony export */   "claim_element": () => (/* binding */ claim_element),
/* harmony export */   "claim_html_tag": () => (/* binding */ claim_html_tag),
/* harmony export */   "claim_space": () => (/* binding */ claim_space),
/* harmony export */   "claim_svg_element": () => (/* binding */ claim_svg_element),
/* harmony export */   "claim_text": () => (/* binding */ claim_text),
/* harmony export */   "clear_loops": () => (/* binding */ clear_loops),
/* harmony export */   "component_subscribe": () => (/* binding */ component_subscribe),
/* harmony export */   "compute_rest_props": () => (/* binding */ compute_rest_props),
/* harmony export */   "compute_slots": () => (/* binding */ compute_slots),
/* harmony export */   "createEventDispatcher": () => (/* binding */ createEventDispatcher),
/* harmony export */   "create_animation": () => (/* binding */ create_animation),
/* harmony export */   "create_bidirectional_transition": () => (/* binding */ create_bidirectional_transition),
/* harmony export */   "create_component": () => (/* binding */ create_component),
/* harmony export */   "create_in_transition": () => (/* binding */ create_in_transition),
/* harmony export */   "create_out_transition": () => (/* binding */ create_out_transition),
/* harmony export */   "create_slot": () => (/* binding */ create_slot),
/* harmony export */   "create_ssr_component": () => (/* binding */ create_ssr_component),
/* harmony export */   "current_component": () => (/* binding */ current_component),
/* harmony export */   "custom_event": () => (/* binding */ custom_event),
/* harmony export */   "dataset_dev": () => (/* binding */ dataset_dev),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "destroy_block": () => (/* binding */ destroy_block),
/* harmony export */   "destroy_component": () => (/* binding */ destroy_component),
/* harmony export */   "destroy_each": () => (/* binding */ destroy_each),
/* harmony export */   "detach": () => (/* binding */ detach),
/* harmony export */   "detach_after_dev": () => (/* binding */ detach_after_dev),
/* harmony export */   "detach_before_dev": () => (/* binding */ detach_before_dev),
/* harmony export */   "detach_between_dev": () => (/* binding */ detach_between_dev),
/* harmony export */   "detach_dev": () => (/* binding */ detach_dev),
/* harmony export */   "dirty_components": () => (/* binding */ dirty_components),
/* harmony export */   "dispatch_dev": () => (/* binding */ dispatch_dev),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "element": () => (/* binding */ element),
/* harmony export */   "element_is": () => (/* binding */ element_is),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "end_hydrating": () => (/* binding */ end_hydrating),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "escape_attribute_value": () => (/* binding */ escape_attribute_value),
/* harmony export */   "escape_object": () => (/* binding */ escape_object),
/* harmony export */   "escaped": () => (/* binding */ escaped),
/* harmony export */   "exclude_internal_props": () => (/* binding */ exclude_internal_props),
/* harmony export */   "fix_and_destroy_block": () => (/* binding */ fix_and_destroy_block),
/* harmony export */   "fix_and_outro_and_destroy_block": () => (/* binding */ fix_and_outro_and_destroy_block),
/* harmony export */   "fix_position": () => (/* binding */ fix_position),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "getAllContexts": () => (/* binding */ getAllContexts),
/* harmony export */   "getContext": () => (/* binding */ getContext),
/* harmony export */   "get_all_dirty_from_scope": () => (/* binding */ get_all_dirty_from_scope),
/* harmony export */   "get_binding_group_value": () => (/* binding */ get_binding_group_value),
/* harmony export */   "get_current_component": () => (/* binding */ get_current_component),
/* harmony export */   "get_custom_elements_slots": () => (/* binding */ get_custom_elements_slots),
/* harmony export */   "get_root_for_style": () => (/* binding */ get_root_for_style),
/* harmony export */   "get_slot_changes": () => (/* binding */ get_slot_changes),
/* harmony export */   "get_spread_object": () => (/* binding */ get_spread_object),
/* harmony export */   "get_spread_update": () => (/* binding */ get_spread_update),
/* harmony export */   "get_store_value": () => (/* binding */ get_store_value),
/* harmony export */   "globals": () => (/* binding */ globals),
/* harmony export */   "group_outros": () => (/* binding */ group_outros),
/* harmony export */   "handle_promise": () => (/* binding */ handle_promise),
/* harmony export */   "hasContext": () => (/* binding */ hasContext),
/* harmony export */   "has_prop": () => (/* binding */ has_prop),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "insert_dev": () => (/* binding */ insert_dev),
/* harmony export */   "insert_hydration": () => (/* binding */ insert_hydration),
/* harmony export */   "insert_hydration_dev": () => (/* binding */ insert_hydration_dev),
/* harmony export */   "intros": () => (/* binding */ intros),
/* harmony export */   "invalid_attribute_name_character": () => (/* binding */ invalid_attribute_name_character),
/* harmony export */   "is_client": () => (/* binding */ is_client),
/* harmony export */   "is_crossorigin": () => (/* binding */ is_crossorigin),
/* harmony export */   "is_empty": () => (/* binding */ is_empty),
/* harmony export */   "is_function": () => (/* binding */ is_function),
/* harmony export */   "is_promise": () => (/* binding */ is_promise),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "listen_dev": () => (/* binding */ listen_dev),
/* harmony export */   "loop": () => (/* binding */ loop),
/* harmony export */   "loop_guard": () => (/* binding */ loop_guard),
/* harmony export */   "merge_ssr_styles": () => (/* binding */ merge_ssr_styles),
/* harmony export */   "missing_component": () => (/* binding */ missing_component),
/* harmony export */   "mount_component": () => (/* binding */ mount_component),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "not_equal": () => (/* binding */ not_equal),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "null_to_empty": () => (/* binding */ null_to_empty),
/* harmony export */   "object_without_properties": () => (/* binding */ object_without_properties),
/* harmony export */   "onDestroy": () => (/* binding */ onDestroy),
/* harmony export */   "onMount": () => (/* binding */ onMount),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "outro_and_destroy_block": () => (/* binding */ outro_and_destroy_block),
/* harmony export */   "prevent_default": () => (/* binding */ prevent_default),
/* harmony export */   "prop_dev": () => (/* binding */ prop_dev),
/* harmony export */   "query_selector_all": () => (/* binding */ query_selector_all),
/* harmony export */   "raf": () => (/* binding */ raf),
/* harmony export */   "run": () => (/* binding */ run),
/* harmony export */   "run_all": () => (/* binding */ run_all),
/* harmony export */   "safe_not_equal": () => (/* binding */ safe_not_equal),
/* harmony export */   "schedule_update": () => (/* binding */ schedule_update),
/* harmony export */   "select_multiple_value": () => (/* binding */ select_multiple_value),
/* harmony export */   "select_option": () => (/* binding */ select_option),
/* harmony export */   "select_options": () => (/* binding */ select_options),
/* harmony export */   "select_value": () => (/* binding */ select_value),
/* harmony export */   "self": () => (/* binding */ self),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "set_attributes": () => (/* binding */ set_attributes),
/* harmony export */   "set_current_component": () => (/* binding */ set_current_component),
/* harmony export */   "set_custom_element_data": () => (/* binding */ set_custom_element_data),
/* harmony export */   "set_data": () => (/* binding */ set_data),
/* harmony export */   "set_data_dev": () => (/* binding */ set_data_dev),
/* harmony export */   "set_input_type": () => (/* binding */ set_input_type),
/* harmony export */   "set_input_value": () => (/* binding */ set_input_value),
/* harmony export */   "set_now": () => (/* binding */ set_now),
/* harmony export */   "set_raf": () => (/* binding */ set_raf),
/* harmony export */   "set_store_value": () => (/* binding */ set_store_value),
/* harmony export */   "set_style": () => (/* binding */ set_style),
/* harmony export */   "set_svg_attributes": () => (/* binding */ set_svg_attributes),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "spread": () => (/* binding */ spread),
/* harmony export */   "src_url_equal": () => (/* binding */ src_url_equal),
/* harmony export */   "start_hydrating": () => (/* binding */ start_hydrating),
/* harmony export */   "stop_propagation": () => (/* binding */ stop_propagation),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "svg_element": () => (/* binding */ svg_element),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "tick": () => (/* binding */ tick),
/* harmony export */   "time_ranges_to_array": () => (/* binding */ time_ranges_to_array),
/* harmony export */   "to_number": () => (/* binding */ to_number),
/* harmony export */   "toggle_class": () => (/* binding */ toggle_class),
/* harmony export */   "transition_in": () => (/* binding */ transition_in),
/* harmony export */   "transition_out": () => (/* binding */ transition_out),
/* harmony export */   "trusted": () => (/* binding */ trusted),
/* harmony export */   "update_await_block_branch": () => (/* binding */ update_await_block_branch),
/* harmony export */   "update_keyed_each": () => (/* binding */ update_keyed_each),
/* harmony export */   "update_slot": () => (/* binding */ update_slot),
/* harmony export */   "update_slot_base": () => (/* binding */ update_slot_base),
/* harmony export */   "validate_component": () => (/* binding */ validate_component),
/* harmony export */   "validate_each_argument": () => (/* binding */ validate_each_argument),
/* harmony export */   "validate_each_keys": () => (/* binding */ validate_each_keys),
/* harmony export */   "validate_slots": () => (/* binding */ validate_slots),
/* harmony export */   "validate_store": () => (/* binding */ validate_store),
/* harmony export */   "xlink_attr": () => (/* binding */ xlink_attr)
/* harmony export */ });
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function noop() {}

var identity = function identity(x) {
  return x;
};

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function is_promise(value) {
  return value && _typeof(value) === 'object' && typeof value.then === 'function';
}

function add_location(element, file, line, column, _char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      "char": _char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

var src_url_equal_anchor;

function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement('a');
  }

  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}

function not_equal(a, b) {
  return a != a ? b == b : a !== b;
}

function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
  }
}

function subscribe(store) {
  if (store == null) {
    return noop;
  }

  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }

  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}

function get_store_value(store) {
  var value;
  subscribe(store, function (_) {
    return value = _;
  })();
  return value;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  var slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
  update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}

function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    var dirty = [];
    var length = $$scope.ctx.length / 32;

    for (var i = 0; i < length; i++) {
      dirty[i] = -1;
    }

    return dirty;
  }

  return -1;
}

function exclude_internal_props(props) {
  var result = {};

  for (var k in props) {
    if (k[0] !== '$') result[k] = props[k];
  }

  return result;
}

function compute_rest_props(props, keys) {
  var rest = {};
  keys = new Set(keys);

  for (var k in props) {
    if (!keys.has(k) && k[0] !== '$') rest[k] = props[k];
  }

  return rest;
}

function compute_slots(slots) {
  var result = {};

  for (var key in slots) {
    result[key] = true;
  }

  return result;
}

function once(fn) {
  var ran = false;
  return function () {
    if (ran) return;
    ran = true;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    fn.call.apply(fn, [this].concat(args));
  };
}

function null_to_empty(value) {
  return value == null ? '' : value;
}

function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}

var has_prop = function has_prop(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

var is_client = typeof window !== 'undefined';
var now = is_client ? function () {
  return window.performance.now();
} : function () {
  return Date.now();
};
var raf = is_client ? function (cb) {
  return requestAnimationFrame(cb);
} : noop; // used internally for testing

function set_now(fn) {
  now = fn;
}

function set_raf(fn) {
  raf = fn;
}

var tasks = new Set();

function run_tasks(now) {
  tasks.forEach(function (task) {
    if (!task.c(now)) {
      tasks["delete"](task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
/**
 * For testing purposes only!
 */


function clear_loops() {
  tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */


function loop(callback) {
  var task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise(function (fulfill) {
      tasks.add(task = {
        c: callback,
        f: fulfill
      });
    }),
    abort: function abort() {
      tasks["delete"](task);
    }
  };
} // Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.


var is_hydrating = false;

function start_hydrating() {
  is_hydrating = true;
}

function end_hydrating() {
  is_hydrating = false;
}

function upper_bound(low, high, key, value) {
  // Return first index of value larger than input value in the range [low, high)
  while (low < high) {
    var mid = low + (high - low >> 1);

    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

function init_hydrate(target) {
  if (target.hydrate_init) return;
  target.hydrate_init = true; // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>

  var children = target.childNodes; // If target is <head>, there may be children without claim_order

  if (target.nodeName === 'HEAD') {
    var myChildren = [];

    for (var i = 0; i < children.length; i++) {
      var node = children[i];

      if (node.claim_order !== undefined) {
        myChildren.push(node);
      }
    }

    children = myChildren;
  }
  /*
  * Reorder claimed children optimally.
  * We can reorder claimed children optimally by finding the longest subsequence of
  * nodes that are already claimed in order and only moving the rest. The longest
  * subsequence subsequence of nodes that are claimed in order can be found by
  * computing the longest increasing subsequence of .claim_order values.
  *
  * This algorithm is optimal in generating the least amount of reorder operations
  * possible.
  *
  * Proof:
  * We know that, given a set of reordering operations, the nodes that do not move
  * always form an increasing subsequence, since they do not move among each other
  * meaning that they must be already ordered among each other. Thus, the maximal
  * set of nodes that do not move form a longest increasing subsequence.
  */
  // Compute longest increasing subsequence
  // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j


  var m = new Int32Array(children.length + 1); // Predecessor indices + 1

  var p = new Int32Array(children.length);
  m[0] = -1;
  var longest = 0;

  for (var _i = 0; _i < children.length; _i++) {
    var current = children[_i].claim_order; // Find the largest subsequence length such that it ends in a value less than our current value
    // upper_bound returns first greater value, so we subtract one
    // with fast path for when we are on the current longest subsequence

    var seqLen = (longest > 0 && children[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, function (idx) {
      return children[m[idx]].claim_order;
    }, current)) - 1;
    p[_i] = m[seqLen] + 1;
    var newLen = seqLen + 1; // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.

    m[newLen] = _i;
    longest = Math.max(newLen, longest);
  } // The longest increasing subsequence of nodes (initially reversed)


  var lis = []; // The rest of the nodes, nodes that will be moved

  var toMove = [];
  var last = children.length - 1;

  for (var cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children[cur - 1]);

    for (; last >= cur; last--) {
      toMove.push(children[last]);
    }

    last--;
  }

  for (; last >= 0; last--) {
    toMove.push(children[last]);
  }

  lis.reverse(); // We sort the nodes being moved to guarantee that their insertion order matches the claim order

  toMove.sort(function (a, b) {
    return a.claim_order - b.claim_order;
  }); // Finally, we move the nodes

  for (var _i2 = 0, j = 0; _i2 < toMove.length; _i2++) {
    while (j < lis.length && toMove[_i2].claim_order >= lis[j].claim_order) {
      j++;
    }

    var anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[_i2], anchor);
  }
}

function append(target, node) {
  target.appendChild(node);
}

function append_styles(target, style_sheet_id, styles) {
  var append_styles_to = get_root_for_style(target);

  if (!append_styles_to.getElementById(style_sheet_id)) {
    var style = element('style');
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}

function get_root_for_style(node) {
  if (!node) return document;
  var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;

  if (root && root.host) {
    return root;
  }

  return node.ownerDocument;
}

function append_empty_stylesheet(node) {
  var style_element = element('style');
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}

function append_stylesheet(node, style) {
  append(node.head || node, style);
}

function append_hydration(target, node) {
  if (is_hydrating) {
    init_hydrate(target);

    if (target.actual_end_child === undefined || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    } // Skip nodes of undefined ordering


    while (target.actual_end_child !== null && target.actual_end_child.claim_order === undefined) {
      target.actual_end_child = target.actual_end_child.nextSibling;
    }

    if (node !== target.actual_end_child) {
      // We only insert if the ordering of this node should be modified or the parent node is not target
      if (node.claim_order !== undefined || node.parentNode !== target) {
        target.insertBefore(node, target.actual_end_child);
      }
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target || node.nextSibling !== null) {
    target.appendChild(node);
  }
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function insert_hydration(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append_hydration(target, node);
  } else if (node.parentNode !== target || node.nextSibling != anchor) {
    target.insertBefore(node, anchor || null);
  }
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function element_is(name, is) {
  return document.createElement(name, {
    is: is
  });
}

function object_without_properties(obj, exclude) {
  var target = {};

  for (var k in obj) {
    if (has_prop(obj, k) // @ts-ignore
    && exclude.indexOf(k) === -1) {
      // @ts-ignore
      target[k] = obj[k];
    }
  }

  return target;
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function prevent_default(fn) {
  return function (event) {
    event.preventDefault(); // @ts-ignore

    return fn.call(this, event);
  };
}

function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation(); // @ts-ignore

    return fn.call(this, event);
  };
}

function self(fn) {
  return function (event) {
    // @ts-ignore
    if (event.target === this) fn.call(this, event);
  };
}

function trusted(fn) {
  return function (event) {
    // @ts-ignore
    if (event.isTrusted) fn.call(this, event);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function set_attributes(node, attributes) {
  // @ts-ignore
  var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

  for (var key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value') {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}

function set_svg_attributes(node, attributes) {
  for (var key in attributes) {
    attr(node, key, attributes[key]);
  }
}

function set_custom_element_data(node, prop, value) {
  if (prop in node) {
    node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
  } else {
    attr(node, prop, value);
  }
}

function xlink_attr(node, attribute, value) {
  node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function get_binding_group_value(group, __value, checked) {
  var value = new Set();

  for (var i = 0; i < group.length; i += 1) {
    if (group[i].checked) value.add(group[i].__value);
  }

  if (!checked) {
    value["delete"](__value);
  }

  return Array.from(value);
}

function to_number(value) {
  return value === '' ? null : +value;
}

function time_ranges_to_array(ranges) {
  var array = [];

  for (var i = 0; i < ranges.length; i += 1) {
    array.push({
      start: ranges.start(i),
      end: ranges.end(i)
    });
  }

  return array;
}

function children(element) {
  return Array.from(element.childNodes);
}

function init_claim_info(nodes) {
  if (nodes.claim_info === undefined) {
    nodes.claim_info = {
      last_index: 0,
      total_claimed: 0
    };
  }
}

function claim_node(nodes, predicate, processNode, createNode) {
  var dontUpdateLastIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  // Try to find nodes in an order such that we lengthen the longest increasing subsequence
  init_claim_info(nodes);

  var resultNode = function () {
    // We first try to find an element after the previous one
    for (var i = nodes.claim_info.last_index; i < nodes.length; i++) {
      var node = nodes[i];

      if (predicate(node)) {
        var replacement = processNode(node);

        if (replacement === undefined) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }

        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        }

        return node;
      }
    } // Otherwise, we try to find one before
    // We iterate in reverse so that we don't go too far back


    for (var _i3 = nodes.claim_info.last_index - 1; _i3 >= 0; _i3--) {
      var _node = nodes[_i3];

      if (predicate(_node)) {
        var _replacement = processNode(_node);

        if (_replacement === undefined) {
          nodes.splice(_i3, 1);
        } else {
          nodes[_i3] = _replacement;
        }

        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = _i3;
        } else if (_replacement === undefined) {
          // Since we spliced before the last_index, we decrease it
          nodes.claim_info.last_index--;
        }

        return _node;
      }
    } // If we can't find any matching node, we create a new one


    return createNode();
  }();

  resultNode.claim_order = nodes.claim_info.total_claimed;
  nodes.claim_info.total_claimed += 1;
  return resultNode;
}

function claim_element_base(nodes, name, attributes, create_element) {
  return claim_node(nodes, function (node) {
    return node.nodeName === name;
  }, function (node) {
    var remove = [];

    for (var j = 0; j < node.attributes.length; j++) {
      var attribute = node.attributes[j];

      if (!attributes[attribute.name]) {
        remove.push(attribute.name);
      }
    }

    remove.forEach(function (v) {
      return node.removeAttribute(v);
    });
    return undefined;
  }, function () {
    return create_element(name);
  });
}

function claim_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, element);
}

function claim_svg_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, svg_element);
}

function claim_text(nodes, data) {
  return claim_node(nodes, function (node) {
    return node.nodeType === 3;
  }, function (node) {
    var dataStr = '' + data;

    if (node.data.startsWith(dataStr)) {
      if (node.data.length !== dataStr.length) {
        return node.splitText(dataStr.length);
      }
    } else {
      node.data = dataStr;
    }
  }, function () {
    return text(data);
  }, true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
  );
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function find_comment(nodes, text, start) {
  for (var i = start; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 8
    /* comment node */
    && node.textContent.trim() === text) {
      return i;
    }
  }

  return nodes.length;
}

function claim_html_tag(nodes) {
  // find html opening tag
  var start_index = find_comment(nodes, 'HTML_TAG_START', 0);
  var end_index = find_comment(nodes, 'HTML_TAG_END', start_index);

  if (start_index === end_index) {
    return new HtmlTagHydration();
  }

  init_claim_info(nodes);
  var html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
  detach(html_tag_nodes[0]);
  detach(html_tag_nodes[html_tag_nodes.length - 1]);
  var claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);

  var _iterator = _createForOfIteratorHelper(claimed_nodes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var n = _step.value;
      n.claim_order = nodes.claim_info.total_claimed;
      nodes.claim_info.total_claimed += 1;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return new HtmlTagHydration(claimed_nodes);
}

function set_data(text, data) {
  data = '' + data;
  if (text.wholeText !== data) text.data = data;
}

function set_input_value(input, value) {
  input.value = value == null ? '' : value;
}

function set_input_type(input, type) {
  try {
    input.type = type;
  } catch (e) {// do nothing
  }
}

function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? 'important' : '');
  }
}

function select_option(select, value) {
  for (var i = 0; i < select.options.length; i += 1) {
    var option = select.options[i];

    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }

  select.selectedIndex = -1; // no option should be selected
}

function select_options(select, value) {
  for (var i = 0; i < select.options.length; i += 1) {
    var option = select.options[i];
    option.selected = ~value.indexOf(option.__value);
  }
}

function select_value(select) {
  var selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}

function select_multiple_value(select) {
  return [].map.call(select.querySelectorAll(':checked'), function (option) {
    return option.__value;
  });
} // unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead


var crossorigin;

function is_crossorigin() {
  if (crossorigin === undefined) {
    crossorigin = false;

    try {
      if (typeof window !== 'undefined' && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }

  return crossorigin;
}

function add_resize_listener(node, fn) {
  var computed_style = getComputedStyle(node);

  if (computed_style.position === 'static') {
    node.style.position = 'relative';
  }

  var iframe = element('iframe');
  iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' + 'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.tabIndex = -1;
  var crossorigin = is_crossorigin();
  var unsubscribe;

  if (crossorigin) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
    unsubscribe = listen(window, 'message', function (event) {
      if (event.source === iframe.contentWindow) fn();
    });
  } else {
    iframe.src = 'about:blank';

    iframe.onload = function () {
      unsubscribe = listen(iframe.contentWindow, 'resize', fn);
    };
  }

  append(node, iframe);
  return function () {
    if (crossorigin) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }

    detach(iframe);
  };
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}

function query_selector_all(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return Array.from(parent.querySelectorAll(selector));
}

var HtmlTag = /*#__PURE__*/function () {
  function HtmlTag() {
    _classCallCheck(this, HtmlTag);

    this.e = this.n = null;
  }

  _createClass(HtmlTag, [{
    key: "c",
    value: function c(html) {
      this.h(html);
    }
  }, {
    key: "m",
    value: function m(html, target) {
      var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!this.e) {
        this.e = element(target.nodeName);
        this.t = target;
        this.c(html);
      }

      this.i(anchor);
    }
  }, {
    key: "h",
    value: function h(html) {
      this.e.innerHTML = html;
      this.n = Array.from(this.e.childNodes);
    }
  }, {
    key: "i",
    value: function i(anchor) {
      for (var i = 0; i < this.n.length; i += 1) {
        insert(this.t, this.n[i], anchor);
      }
    }
  }, {
    key: "p",
    value: function p(html) {
      this.d();
      this.h(html);
      this.i(this.a);
    }
  }, {
    key: "d",
    value: function d() {
      this.n.forEach(detach);
    }
  }]);

  return HtmlTag;
}();

var HtmlTagHydration = /*#__PURE__*/function (_HtmlTag) {
  _inherits(HtmlTagHydration, _HtmlTag);

  var _super = _createSuper(HtmlTagHydration);

  function HtmlTagHydration(claimed_nodes) {
    var _this;

    _classCallCheck(this, HtmlTagHydration);

    _this = _super.call(this);
    _this.e = _this.n = null;
    _this.l = claimed_nodes;
    return _this;
  }

  _createClass(HtmlTagHydration, [{
    key: "c",
    value: function c(html) {
      if (this.l) {
        this.n = this.l;
      } else {
        _get(_getPrototypeOf(HtmlTagHydration.prototype), "c", this).call(this, html);
      }
    }
  }, {
    key: "i",
    value: function i(anchor) {
      for (var i = 0; i < this.n.length; i += 1) {
        insert_hydration(this.t, this.n[i], anchor);
      }
    }
  }]);

  return HtmlTagHydration;
}(HtmlTag);

function attribute_to_object(attributes) {
  var result = {};

  var _iterator2 = _createForOfIteratorHelper(attributes),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var attribute = _step2.value;
      result[attribute.name] = attribute.value;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return result;
}

function get_custom_elements_slots(element) {
  var result = {};
  element.childNodes.forEach(function (node) {
    result[node.slot || 'default'] = true;
  });
  return result;
} // we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624


var managed_styles = new Map();
var active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

function hash(str) {
  var hash = 5381;
  var i = str.length;

  while (i--) {
    hash = (hash << 5) - hash ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}

function create_style_information(doc, node) {
  var info = {
    stylesheet: append_empty_stylesheet(node),
    rules: {}
  };
  managed_styles.set(doc, info);
  return info;
}

function create_rule(node, a, b, duration, delay, ease, fn) {
  var uid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var step = 16.666 / duration;
  var keyframes = '{\n';

  for (var p = 0; p <= 1; p += step) {
    var t = a + (b - a) * ease(p);
    keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
  }

  var rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
  var name = "__svelte_".concat(hash(rule), "_").concat(uid);
  var doc = get_root_for_style(node);

  var _ref = managed_styles.get(doc) || create_style_information(doc, node),
      stylesheet = _ref.stylesheet,
      rules = _ref.rules;

  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
  }

  var animation = node.style.animation || '';
  node.style.animation = "".concat(animation ? "".concat(animation, ", ") : '').concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
  active += 1;
  return name;
}

function delete_rule(node, name) {
  var previous = (node.style.animation || '').split(', ');
  var next = previous.filter(name ? function (anim) {
    return anim.indexOf(name) < 0;
  } // remove specific animation
  : function (anim) {
    return anim.indexOf('__svelte') === -1;
  } // remove all Svelte animations
  );
  var deleted = previous.length - next.length;

  if (deleted) {
    node.style.animation = next.join(', ');
    active -= deleted;
    if (!active) clear_rules();
  }
}

function clear_rules() {
  raf(function () {
    if (active) return;
    managed_styles.forEach(function (info) {
      var stylesheet = info.stylesheet;
      var i = stylesheet.cssRules.length;

      while (i--) {
        stylesheet.deleteRule(i);
      }

      info.rules = {};
    });
    managed_styles.clear();
  });
}

function create_animation(node, from, fn, params) {
  if (!from) return noop;
  var to = node.getBoundingClientRect();
  if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) return noop;

  var _fn = fn(node, {
    from: from,
    to: to
  }, params),
      _fn$delay = _fn.delay,
      delay = _fn$delay === void 0 ? 0 : _fn$delay,
      _fn$duration = _fn.duration,
      duration = _fn$duration === void 0 ? 300 : _fn$duration,
      _fn$easing = _fn.easing,
      easing = _fn$easing === void 0 ? identity : _fn$easing,
      _fn$start = _fn.start,
      start_time = _fn$start === void 0 ? now() + delay : _fn$start,
      _fn$end = _fn.end,
      end = _fn$end === void 0 ? start_time + duration : _fn$end,
      _fn$tick = _fn.tick,
      tick = _fn$tick === void 0 ? noop : _fn$tick,
      css = _fn.css;

  var running = true;
  var started = false;
  var name;

  function start() {
    if (css) {
      name = create_rule(node, 0, 1, duration, delay, easing, css);
    }

    if (!delay) {
      started = true;
    }
  }

  function stop() {
    if (css) delete_rule(node, name);
    running = false;
  }

  loop(function (now) {
    if (!started && now >= start_time) {
      started = true;
    }

    if (started && now >= end) {
      tick(1, 0);
      stop();
    }

    if (!running) {
      return false;
    }

    if (started) {
      var p = now - start_time;
      var t = 0 + 1 * easing(p / duration);
      tick(t, 1 - t);
    }

    return true;
  });
  start();
  tick(0, 1);
  return stop;
}

function fix_position(node) {
  var style = getComputedStyle(node);

  if (style.position !== 'absolute' && style.position !== 'fixed') {
    var width = style.width,
        height = style.height;
    var a = node.getBoundingClientRect();
    node.style.position = 'absolute';
    node.style.width = width;
    node.style.height = height;
    add_transform(node, a);
  }
}

function add_transform(node, a) {
  var b = node.getBoundingClientRect();

  if (a.left !== b.left || a.top !== b.top) {
    var style = getComputedStyle(node);
    var transform = style.transform === 'none' ? '' : style.transform;
    node.style.transform = "".concat(transform, " translate(").concat(a.left - b.left, "px, ").concat(a.top - b.top, "px)");
  }
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}

function beforeUpdate(fn) {
  get_current_component().$$.before_update.push(fn);
}

function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  var component = get_current_component();
  return function (type, detail) {
    var callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail);
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
}

function getAllContexts() {
  return get_current_component().$$.context;
}

function hasContext(key) {
  return get_current_component().$$.context.has(key);
} // TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  var _this2 = this;

  var callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    // @ts-ignore
    callbacks.slice().forEach(function (fn) {
      return fn.call(_this2, event);
    });
  }
}

var dirty_components = [];
var intros = {
  enabled: false
};
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function tick() {
  schedule_update();
  return resolved_promise;
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

function add_flush_callback(fn) {
  flush_callbacks.push(fn);
} // flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.


var seen_callbacks = new Set();
var flushidx = 0; // Do *not* move this inside the flush() function

function flush() {
  var saved_component = current_component;

  do {
    // first, call beforeUpdate functions
    // and update components
    while (flushidx < dirty_components.length) {
      var component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }

    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var i = 0; i < render_callbacks.length; i += 1) {
      var callback = render_callbacks[i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var promise;

function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(function () {
      promise = null;
    });
  }

  return promise;
}

function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing["delete"](block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing["delete"](block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var null_transition = {
  duration: 0
};

function create_in_transition(node, fn, params) {
  var config = fn(node, params);
  var running = false;
  var animation_name;
  var task;
  var uid = 0;

  function cleanup() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function go() {
    var _ref2 = config || null_transition,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
        _ref2$duration = _ref2.duration,
        duration = _ref2$duration === void 0 ? 300 : _ref2$duration,
        _ref2$easing = _ref2.easing,
        easing = _ref2$easing === void 0 ? identity : _ref2$easing,
        _ref2$tick = _ref2.tick,
        tick = _ref2$tick === void 0 ? noop : _ref2$tick,
        css = _ref2.css;

    if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
    tick(0, 1);
    var start_time = now() + delay;
    var end_time = start_time + duration;
    if (task) task.abort();
    running = true;
    add_render_callback(function () {
      return dispatch(node, true, 'start');
    });
    task = loop(function (now) {
      if (running) {
        if (now >= end_time) {
          tick(1, 0);
          dispatch(node, true, 'end');
          cleanup();
          return running = false;
        }

        if (now >= start_time) {
          var t = easing((now - start_time) / duration);
          tick(t, 1 - t);
        }
      }

      return running;
    });
  }

  var started = false;
  return {
    start: function start() {
      if (started) return;
      started = true;
      delete_rule(node);

      if (is_function(config)) {
        config = config();
        wait().then(go);
      } else {
        go();
      }
    },
    invalidate: function invalidate() {
      started = false;
    },
    end: function end() {
      if (running) {
        cleanup();
        running = false;
      }
    }
  };
}

function create_out_transition(node, fn, params) {
  var config = fn(node, params);
  var running = true;
  var animation_name;
  var group = outros;
  group.r += 1;

  function go() {
    var _ref3 = config || null_transition,
        _ref3$delay = _ref3.delay,
        delay = _ref3$delay === void 0 ? 0 : _ref3$delay,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 300 : _ref3$duration,
        _ref3$easing = _ref3.easing,
        easing = _ref3$easing === void 0 ? identity : _ref3$easing,
        _ref3$tick = _ref3.tick,
        tick = _ref3$tick === void 0 ? noop : _ref3$tick,
        css = _ref3.css;

    if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    var start_time = now() + delay;
    var end_time = start_time + duration;
    add_render_callback(function () {
      return dispatch(node, false, 'start');
    });
    loop(function (now) {
      if (running) {
        if (now >= end_time) {
          tick(0, 1);
          dispatch(node, false, 'end');

          if (! --group.r) {
            // this will result in `end()` being called,
            // so we don't need to clean up here
            run_all(group.c);
          }

          return false;
        }

        if (now >= start_time) {
          var t = easing((now - start_time) / duration);
          tick(1 - t, t);
        }
      }

      return running;
    });
  }

  if (is_function(config)) {
    wait().then(function () {
      // @ts-ignore
      config = config();
      go();
    });
  } else {
    go();
  }

  return {
    end: function end(reset) {
      if (reset && config.tick) {
        config.tick(1, 0);
      }

      if (running) {
        if (animation_name) delete_rule(node, animation_name);
        running = false;
      }
    }
  };
}

function create_bidirectional_transition(node, fn, params, intro) {
  var config = fn(node, params);
  var t = intro ? 0 : 1;
  var running_program = null;
  var pending_program = null;
  var animation_name = null;

  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function init(program, duration) {
    var d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d: d,
      duration: duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }

  function go(b) {
    var _ref4 = config || null_transition,
        _ref4$delay = _ref4.delay,
        delay = _ref4$delay === void 0 ? 0 : _ref4$delay,
        _ref4$duration = _ref4.duration,
        duration = _ref4$duration === void 0 ? 300 : _ref4$duration,
        _ref4$easing = _ref4.easing,
        easing = _ref4$easing === void 0 ? identity : _ref4$easing,
        _ref4$tick = _ref4.tick,
        tick = _ref4$tick === void 0 ? noop : _ref4$tick,
        css = _ref4.css;

    var program = {
      start: now() + delay,
      b: b
    };

    if (!b) {
      // @ts-ignore todo: improve typings
      program.group = outros;
      outros.r += 1;
    }

    if (running_program || pending_program) {
      pending_program = program;
    } else {
      // if this is an intro, and there's a delay, we need to do
      // an initial tick and/or apply CSS animation immediately
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }

      if (b) tick(0, 1);
      running_program = init(program, duration);
      add_render_callback(function () {
        return dispatch(node, b, 'start');
      });
      loop(function (now) {
        if (pending_program && now > pending_program.start) {
          running_program = init(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, 'start');

          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }

        if (running_program) {
          if (now >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, 'end');

            if (!pending_program) {
              // we're done
              if (running_program.b) {
                // intro — we can tidy up immediately
                clear_animation();
              } else {
                // outro — needs to be coordinated
                if (! --running_program.group.r) run_all(running_program.group.c);
              }
            }

            running_program = null;
          } else if (now >= running_program.start) {
            var p = now - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }

        return !!(running_program || pending_program);
      });
    }
  }

  return {
    run: function run(b) {
      if (is_function(config)) {
        wait().then(function () {
          // @ts-ignore
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },
    end: function end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}

function handle_promise(promise, info) {
  var token = info.token = {};

  function update(type, index, key, value) {
    if (info.token !== token) return;
    info.resolved = value;
    var child_ctx = info.ctx;

    if (key !== undefined) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }

    var block = type && (info.current = type)(child_ctx);
    var needs_flush = false;

    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach(function (block, i) {
          if (i !== index && block) {
            group_outros();
            transition_out(block, 1, 1, function () {
              if (info.blocks[i] === block) {
                info.blocks[i] = null;
              }
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }

      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }

    info.block = block;
    if (info.blocks) info.blocks[index] = block;

    if (needs_flush) {
      flush();
    }
  }

  if (is_promise(promise)) {
    var _current_component = get_current_component();

    promise.then(function (value) {
      set_current_component(_current_component);
      update(info.then, 1, info.value, value);
      set_current_component(null);
    }, function (error) {
      set_current_component(_current_component);
      update(info["catch"], 2, info.error, error);
      set_current_component(null);

      if (!info.hasCatch) {
        throw error;
      }
    }); // if we previously had a then/catch block, destroy it

    if (info.current !== info.pending) {
      update(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update(info.then, 1, info.value, promise);
      return true;
    }

    info.resolved = promise;
  }
}

function update_await_block_branch(info, ctx, dirty) {
  var child_ctx = ctx.slice();
  var resolved = info.resolved;

  if (info.current === info.then) {
    child_ctx[info.value] = resolved;
  }

  if (info.current === info["catch"]) {
    child_ctx[info.error] = resolved;
  }

  info.block.p(child_ctx, dirty);
}

var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function destroy_block(block, lookup) {
  block.d(1);
  lookup["delete"](block.key);
}

function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, function () {
    lookup["delete"](block.key);
  });
}

function fix_and_destroy_block(block, lookup) {
  block.f();
  destroy_block(block, lookup);
}

function fix_and_outro_and_destroy_block(block, lookup) {
  block.f();
  outro_and_destroy_block(block, lookup);
}

function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  var o = old_blocks.length;
  var n = list.length;
  var i = o;
  var old_indexes = {};

  while (i--) {
    old_indexes[old_blocks[i].key] = i;
  }

  var new_blocks = [];
  var new_lookup = new Map();
  var deltas = new Map();
  i = n;

  while (i--) {
    var child_ctx = get_context(ctx, list, i);
    var key = get_key(child_ctx);
    var block = lookup.get(key);

    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }

    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
  }

  var will_move = new Set();
  var did_move = new Set();

  function insert(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }

  while (o && n) {
    var new_block = new_blocks[n - 1];
    var old_block = old_blocks[o - 1];
    var new_key = new_block.key;
    var old_key = old_block.key;

    if (new_block === old_block) {
      // do nothing
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      // remove old block
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }

  while (o--) {
    var _old_block = old_blocks[o];
    if (!new_lookup.has(_old_block.key)) destroy(_old_block, lookup);
  }

  while (n) {
    insert(new_blocks[n - 1]);
  }

  return new_blocks;
}

function validate_each_keys(ctx, list, get_context, get_key) {
  var keys = new Set();

  for (var i = 0; i < list.length; i++) {
    var key = get_key(get_context(ctx, list, i));

    if (keys.has(key)) {
      throw new Error('Cannot have duplicate keys in a keyed each');
    }

    keys.add(key);
  }
}

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html


var boolean_attributes = new Set(['allowfullscreen', 'allowpaymentrequest', 'async', 'autofocus', 'autoplay', 'checked', 'controls', 'default', 'defer', 'disabled', 'formnovalidate', 'hidden', 'ismap', 'loop', 'multiple', 'muted', 'nomodule', 'novalidate', 'open', 'playsinline', 'readonly', 'required', 'reversed', 'selected']);
var invalid_attribute_name_character = /(?:[\t-\r "'\/=>\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFDD0-\uFDEF\uFEFF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF])/; // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter

function spread(args, attrs_to_add) {
  var attributes = Object.assign.apply(Object, [{}].concat(_toConsumableArray(args)));

  if (attrs_to_add) {
    var classes_to_add = attrs_to_add.classes;
    var styles_to_add = attrs_to_add.styles;

    if (classes_to_add) {
      if (attributes["class"] == null) {
        attributes["class"] = classes_to_add;
      } else {
        attributes["class"] += ' ' + classes_to_add;
      }
    }

    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }

  var str = '';
  Object.keys(attributes).forEach(function (name) {
    if (invalid_attribute_name_character.test(name)) return;
    var value = attributes[name];
    if (value === true) str += ' ' + name;else if (boolean_attributes.has(name.toLowerCase())) {
      if (value) str += ' ' + name;
    } else if (value != null) {
      str += " ".concat(name, "=\"").concat(value, "\"");
    }
  });
  return str;
}

function merge_ssr_styles(style_attribute, style_directive) {
  var style_object = {};

  var _iterator3 = _createForOfIteratorHelper(style_attribute.split(';')),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var individual_style = _step3.value;
      var colon_index = individual_style.indexOf(':');

      var _name = individual_style.slice(0, colon_index).trim();

      var _value = individual_style.slice(colon_index + 1).trim();

      if (!_name) continue;
      style_object[_name] = _value;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  for (var name in style_directive) {
    var value = style_directive[name];

    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }

  return style_object;
}

var escaped = {
  '"': '&quot;',
  "'": '&#39;',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

function escape(html) {
  return String(html).replace(/["'&<>]/g, function (match) {
    return escaped[match];
  });
}

function escape_attribute_value(value) {
  return typeof value === 'string' ? escape(value) : value;
}

function escape_object(obj) {
  var result = {};

  for (var key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }

  return result;
}

function each(items, fn) {
  var str = '';

  for (var i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }

  return str;
}

var missing_component = {
  $$render: function $$render() {
    return '';
  }
};

function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === 'svelte:component') name += ' this={...}';
    throw new Error("<".concat(name, "> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules"));
  }

  return component;
}

function debug(file, line, column, values) {
  console.log("{@debug} ".concat(file ? file + ' ' : '', "(").concat(line, ":").concat(column, ")")); // eslint-disable-line no-console

  console.log(values); // eslint-disable-line no-console

  return '';
}

var on_destroy;

function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    var parent_component = current_component;
    var $$ = {
      on_destroy: on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({
      $$: $$
    });
    var html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }

  return {
    render: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$$$slots = _ref5.$$slots,
          $$slots = _ref5$$$slots === void 0 ? {} : _ref5$$$slots,
          _ref5$context = _ref5.context,
          context = _ref5$context === void 0 ? new Map() : _ref5$context;

      on_destroy = [];
      var result = {
        title: '',
        head: '',
        css: new Set()
      };
      var html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html: html,
        css: {
          code: Array.from(result.css).map(function (css) {
            return css.code;
          }).join('\n'),
          map: null // TODO

        },
        head: result.title + result.head
      };
    },
    $$render: $$render
  };
}

function add_attribute(name, value, _boolean) {
  if (value == null || _boolean && !value) return '';
  return " ".concat(name).concat(value === true && boolean_attributes.has(name) ? '' : "=".concat(typeof value === 'string' ? JSON.stringify(escape(value)) : "\"".concat(value, "\"")));
}

function add_classes(classes) {
  return classes ? " class=\"".concat(classes, "\"") : '';
}

function style_object_to_string(style_object) {
  return Object.keys(style_object).filter(function (key) {
    return style_object[key];
  }).map(function (key) {
    return "".concat(key, ": ").concat(style_object[key], ";");
  }).join(' ');
}

function add_styles(style_object) {
  var styles = style_object_to_string(style_object);
  return styles ? " style=\"".concat(styles, "\"") : '';
}

function bind(component, name, callback) {
  var index = component.$$.props[name];

  if (index !== undefined) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor, customElement) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor);

  if (!customElement) {
    // onMount happens before the initial afterUpdate
    add_render_callback(function () {
      var new_on_destroy = on_mount.map(run).filter(is_function);

      if (on_destroy) {
        on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }

      component.$$.on_mount = [];
    });
  }

  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props, append_styles) {
  var dirty = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty: dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  var ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }

  set_current_component(parent_component);
}

var SvelteElement;

if (typeof HTMLElement === 'function') {
  SvelteElement = /*#__PURE__*/function (_HTMLElement) {
    _inherits(SvelteElement, _HTMLElement);

    var _super2 = _createSuper(SvelteElement);

    function SvelteElement() {
      var _this3;

      _classCallCheck(this, SvelteElement);

      _this3 = _super2.call(this);

      _this3.attachShadow({
        mode: 'open'
      });

      return _this3;
    }

    _createClass(SvelteElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var on_mount = this.$$.on_mount;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function); // @ts-ignore todo: improve typings

        for (var key in this.$$.slotted) {
          // @ts-ignore todo: improve typings
          this.appendChild(this.$$.slotted[key]);
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, _oldValue, newValue) {
        this[attr] = newValue;
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
    }, {
      key: "$destroy",
      value: function $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
    }, {
      key: "$on",
      value: function $on(type, callback) {
        // TODO should this delegate to addEventListener?
        var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return function () {
          var index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
        };
      }
    }, {
      key: "$set",
      value: function $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    }]);

    return SvelteElement;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
}
/**
 * Base class for Svelte components. Used when dev=false.
 */


var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }]);

  return SvelteComponent;
}();

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.46.3'
  }, detail), true));
}

function append_dev(target, node) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node
  });
  append(target, node);
}

function append_hydration_dev(target, node) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node
  });
  append_hydration(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node,
    anchor: anchor
  });
  insert(target, node, anchor);
}

function insert_hydration_dev(target, node, anchor) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node,
    anchor: anchor
  });
  insert_hydration(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev('SvelteDOMRemove', {
    node: node
  });
  detach(node);
}

function detach_between_dev(before, after) {
  while (before.nextSibling && before.nextSibling !== after) {
    detach_dev(before.nextSibling);
  }
}

function detach_before_dev(after) {
  while (after.previousSibling) {
    detach_dev(after.previousSibling);
  }
}

function detach_after_dev(before) {
  while (before.nextSibling) {
    detach_dev(before.nextSibling);
  }
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev('SvelteDOMAddEventListener', {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev('SvelteDOMRemoveEventListener', {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', {
    node: node,
    attribute: attribute
  });else dispatch_dev('SvelteDOMSetAttribute', {
    node: node,
    attribute: attribute,
    value: value
  });
}

function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev('SvelteDOMSetProperty', {
    node: node,
    property: property,
    value: value
  });
}

function dataset_dev(node, property, value) {
  node.dataset[property] = value;
  dispatch_dev('SvelteDOMSetDataset', {
    node: node,
    property: property,
    value: value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.wholeText === data) return;
  dispatch_dev('SvelteDOMSetData', {
    node: text,
    data: data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (var _i4 = 0, _Object$keys = Object.keys(slot); _i4 < _Object$keys.length; _i4++) {
    var slot_key = _Object$keys[_i4];

    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */


var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);

  var _super3 = _createSuper(SvelteComponentDev);

  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);

    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    return _super3.call(this);
  }

  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

      this.$destroy = function () {
        console.warn('Component was already destroyed'); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);

  return SvelteComponentDev;
}(SvelteComponent);
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */


var SvelteComponentTyped = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(SvelteComponentTyped, _SvelteComponentDev);

  var _super4 = _createSuper(SvelteComponentTyped);

  function SvelteComponentTyped(options) {
    _classCallCheck(this, SvelteComponentTyped);

    return _super4.call(this, options);
  }

  return _createClass(SvelteComponentTyped);
}(SvelteComponentDev);

function loop_guard(timeout) {
  var start = Date.now();
  return function () {
    if (Date.now() - start > timeout) {
      throw new Error('Infinite loop detected');
    }
  };
}



/***/ }),

/***/ "./node_modules/svelte/store/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/svelte/store/index.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.get_store_value),
/* harmony export */   "derived": () => (/* binding */ derived),
/* harmony export */   "readable": () => (/* binding */ readable),
/* harmony export */   "writable": () => (/* binding */ writable)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */

function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
  var stop;
  var subscribers = new Set();

  function set(new_value) {
    if ((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal)(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        var _iterator = _createForOfIteratorHelper(subscribers),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var subscriber = _step.value;
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (run_queue) {
          for (var i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
    var subscriber = [run, invalidate];
    subscribers.add(subscriber);

    if (subscribers.size === 1) {
      stop = start(set) || _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
    }

    run(value);
    return function () {
      subscribers["delete"](subscriber);

      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

function derived(stores, fn, initial_value) {
  var single = !Array.isArray(stores);
  var stores_array = single ? [stores] : stores;
  var auto = fn.length < 2;
  return readable(initial_value, function (set) {
    var inited = false;
    var values = [];
    var pending = 0;
    var cleanup = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;

    var sync = function sync() {
      if (pending) {
        return;
      }

      cleanup();
      var result = fn(single ? values[0] : values, set);

      if (auto) {
        set(result);
      } else {
        cleanup = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.is_function)(result) ? result : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
      }
    };

    var unsubscribers = stores_array.map(function (store, i) {
      return (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.subscribe)(store, function (value) {
        values[i] = value;
        pending &= ~(1 << i);

        if (inited) {
          sync();
        }
      }, function () {
        pending |= 1 << i;
      });
    });
    inited = true;
    sync();
    return function stop() {
      (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.run_all)(unsubscribers);
      cleanup();
    };
  });
}



/***/ }),

/***/ "./node_modules/svelte/transition/index.mjs":
/*!**************************************************!*\
  !*** ./node_modules/svelte/transition/index.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blur": () => (/* binding */ blur),
/* harmony export */   "crossfade": () => (/* binding */ crossfade),
/* harmony export */   "draw": () => (/* binding */ draw),
/* harmony export */   "fade": () => (/* binding */ fade),
/* harmony export */   "fly": () => (/* binding */ fly),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "slide": () => (/* binding */ slide)
/* harmony export */ });
/* harmony import */ var _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../easing/index.mjs */ "./node_modules/svelte/easing/index.mjs");
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/svelte/internal/index.mjs");


/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function blur(node) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 0 : _ref$delay,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 400 : _ref$duration,
      _ref$easing = _ref.easing,
      easing = _ref$easing === void 0 ? _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut : _ref$easing,
      _ref$amount = _ref.amount,
      amount = _ref$amount === void 0 ? 5 : _ref$amount,
      _ref$opacity = _ref.opacity,
      opacity = _ref$opacity === void 0 ? 0 : _ref$opacity;

  var style = getComputedStyle(node);
  var target_opacity = +style.opacity;
  var f = style.filter === 'none' ? '' : style.filter;
  var od = target_opacity * (1 - opacity);
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(_t, u) {
      return "opacity: ".concat(target_opacity - od * u, "; filter: ").concat(f, " blur(").concat(u * amount, "px);");
    }
  };
}

function fade(node) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 400 : _ref2$duration,
      _ref2$easing = _ref2.easing,
      easing = _ref2$easing === void 0 ? _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.linear : _ref2$easing;

  var o = +getComputedStyle(node).opacity;
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t) {
      return "opacity: ".concat(t * o);
    }
  };
}

function fly(node) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$delay = _ref3.delay,
      delay = _ref3$delay === void 0 ? 0 : _ref3$delay,
      _ref3$duration = _ref3.duration,
      duration = _ref3$duration === void 0 ? 400 : _ref3$duration,
      _ref3$easing = _ref3.easing,
      easing = _ref3$easing === void 0 ? _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut : _ref3$easing,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y,
      _ref3$opacity = _ref3.opacity,
      opacity = _ref3$opacity === void 0 ? 0 : _ref3$opacity;

  var style = getComputedStyle(node);
  var target_opacity = +style.opacity;
  var transform = style.transform === 'none' ? '' : style.transform;
  var od = target_opacity * (1 - opacity);
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t, u) {
      return "\n\t\t\ttransform: ".concat(transform, " translate(").concat((1 - t) * x, "px, ").concat((1 - t) * y, "px);\n\t\t\topacity: ").concat(target_opacity - od * u);
    }
  };
}

function slide(node) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$delay = _ref4.delay,
      delay = _ref4$delay === void 0 ? 0 : _ref4$delay,
      _ref4$duration = _ref4.duration,
      duration = _ref4$duration === void 0 ? 400 : _ref4$duration,
      _ref4$easing = _ref4.easing,
      easing = _ref4$easing === void 0 ? _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut : _ref4$easing;

  var style = getComputedStyle(node);
  var opacity = +style.opacity;
  var height = parseFloat(style.height);
  var padding_top = parseFloat(style.paddingTop);
  var padding_bottom = parseFloat(style.paddingBottom);
  var margin_top = parseFloat(style.marginTop);
  var margin_bottom = parseFloat(style.marginBottom);
  var border_top_width = parseFloat(style.borderTopWidth);
  var border_bottom_width = parseFloat(style.borderBottomWidth);
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t) {
      return 'overflow: hidden;' + "opacity: ".concat(Math.min(t * 20, 1) * opacity, ";") + "height: ".concat(t * height, "px;") + "padding-top: ".concat(t * padding_top, "px;") + "padding-bottom: ".concat(t * padding_bottom, "px;") + "margin-top: ".concat(t * margin_top, "px;") + "margin-bottom: ".concat(t * margin_bottom, "px;") + "border-top-width: ".concat(t * border_top_width, "px;") + "border-bottom-width: ".concat(t * border_bottom_width, "px;");
    }
  };
}

function scale(node) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$delay = _ref5.delay,
      delay = _ref5$delay === void 0 ? 0 : _ref5$delay,
      _ref5$duration = _ref5.duration,
      duration = _ref5$duration === void 0 ? 400 : _ref5$duration,
      _ref5$easing = _ref5.easing,
      easing = _ref5$easing === void 0 ? _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut : _ref5$easing,
      _ref5$start = _ref5.start,
      start = _ref5$start === void 0 ? 0 : _ref5$start,
      _ref5$opacity = _ref5.opacity,
      opacity = _ref5$opacity === void 0 ? 0 : _ref5$opacity;

  var style = getComputedStyle(node);
  var target_opacity = +style.opacity;
  var transform = style.transform === 'none' ? '' : style.transform;
  var sd = 1 - start;
  var od = target_opacity * (1 - opacity);
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(_t, u) {
      return "\n\t\t\ttransform: ".concat(transform, " scale(").concat(1 - sd * u, ");\n\t\t\topacity: ").concat(target_opacity - od * u, "\n\t\t");
    }
  };
}

function draw(node) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$delay = _ref6.delay,
      delay = _ref6$delay === void 0 ? 0 : _ref6$delay,
      speed = _ref6.speed,
      duration = _ref6.duration,
      _ref6$easing = _ref6.easing,
      easing = _ref6$easing === void 0 ? _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut : _ref6$easing;

  var len = node.getTotalLength();
  var style = getComputedStyle(node);

  if (style.strokeLinecap !== 'butt') {
    len += parseInt(style.strokeWidth);
  }

  if (duration === undefined) {
    if (speed === undefined) {
      duration = 800;
    } else {
      duration = len / speed;
    }
  } else if (typeof duration === 'function') {
    duration = duration(len);
  }

  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t, u) {
      return "stroke-dasharray: ".concat(t * len, " ").concat(u * len);
    }
  };
}

function crossfade(_a) {
  var fallback = _a.fallback,
      defaults = __rest(_a, ["fallback"]);

  var to_receive = new Map();
  var to_send = new Map();

  function crossfade(from, node, params) {
    var _assign = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)({}, defaults), params),
        _assign$delay = _assign.delay,
        delay = _assign$delay === void 0 ? 0 : _assign$delay,
        _assign$duration = _assign.duration,
        duration = _assign$duration === void 0 ? function (d) {
      return Math.sqrt(d) * 30;
    } : _assign$duration,
        _assign$easing = _assign.easing,
        easing = _assign$easing === void 0 ? _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut : _assign$easing;

    var to = node.getBoundingClientRect();
    var dx = from.left - to.left;
    var dy = from.top - to.top;
    var dw = from.width / to.width;
    var dh = from.height / to.height;
    var d = Math.sqrt(dx * dx + dy * dy);
    var style = getComputedStyle(node);
    var transform = style.transform === 'none' ? '' : style.transform;
    var opacity = +style.opacity;
    return {
      delay: delay,
      duration: (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.is_function)(duration) ? duration(d) : duration,
      easing: easing,
      css: function css(t, u) {
        return "\n\t\t\t\topacity: ".concat(t * opacity, ";\n\t\t\t\ttransform-origin: top left;\n\t\t\t\ttransform: ").concat(transform, " translate(").concat(u * dx, "px,").concat(u * dy, "px) scale(").concat(t + (1 - t) * dw, ", ").concat(t + (1 - t) * dh, ");\n\t\t\t");
      }
    };
  }

  function transition(items, counterparts, intro) {
    return function (node, params) {
      items.set(params.key, {
        rect: node.getBoundingClientRect()
      });
      return function () {
        if (counterparts.has(params.key)) {
          var _counterparts$get = counterparts.get(params.key),
              rect = _counterparts$get.rect;

          counterparts["delete"](params.key);
          return crossfade(rect, node, params);
        } // if the node is disappearing altogether
        // (i.e. wasn't claimed by the other list)
        // then we need to supply an outro


        items["delete"](params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }

  return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames not based on template
/******/ 			if ({"resources_js_lang_en_json":1,"resources_js_lang_ar_json":1}[chunkId]) return "js/" + chunkId + ".js";
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "svelt-portfolio:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksvelt_portfolio"] = self["webpackChunksvelt_portfolio"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./resources/js/app.ts");
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/css/app.css");
/******/ 	
/******/ })()
;