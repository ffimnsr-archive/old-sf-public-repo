/*! SmartFunding */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"sesame": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./images/bg-1.jpg":
/*!*************************!*\
  !*** ./images/bg-1.jpg ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "images/bg-1.jpg";

/***/ }),

/***/ "./images/bg-2.jpg":
/*!*************************!*\
  !*** ./images/bg-2.jpg ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "images/bg-2.jpg";

/***/ }),

/***/ "./images/sf-logo.png":
/*!****************************!*\
  !*** ./images/sf-logo.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "images/sf-logo.png";

/***/ }),

/***/ "./images/users/avatar-1.jpg":
/*!***********************************!*\
  !*** ./images/users/avatar-1.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "images/avatar-1.jpg";

/***/ }),

/***/ "./src/auth.ts":
/*!*********************!*\
  !*** ./src/auth.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.checkTokenNone = function () {
        var token = localStorage.getItem("token");
        return token == null;
    };
    return Auth;
}());
exports.Auth = Auth;


/***/ }),

/***/ "./src/components/admin/dashboard.ts":
/*!*******************************************!*\
  !*** ./src/components/admin/dashboard.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var header_1 = __importDefault(__webpack_require__(/*! widgets/header */ "./src/widgets/header.ts"));
var footer_1 = __importDefault(__webpack_require__(/*! widgets/footer */ "./src/widgets/footer.ts"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(header_1.default),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                    mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/#!/']", "SmartFunding")),
                    mithril_1.default("li.breadcrumb-item.active", "Dashboard")
                ])),
                mithril_1.default("h4.page-title", "Dashboard")
            ]))), mithril_1.default(".row", [
                mithril_1.default(".col-lg-8", mithril_1.default(".card-box", [
                    mithril_1.default("h4.header-title.mb-3", "Wallet Balances"),
                    mithril_1.default(".table-responsive", mithril_1.default("table.table.table-hover.table-centered.m-0", [
                        mithril_1.default("thead", mithril_1.default("tr", [
                            mithril_1.default("th", "Profile"),
                            mithril_1.default("th", "Name"),
                            mithril_1.default("th", "Currency"),
                            mithril_1.default("th", "Balance"),
                            mithril_1.default("th", "Reserved in orders"),
                            mithril_1.default("th", "Action")
                        ])),
                        mithril_1.default("tbody", [
                            mithril_1.default("tr", [
                                mithril_1.default("td", mithril_1.default("img.rounded-circle.thumb-sm[alt='contact-img'][src='assets/images/users/avatar-2.jpg'][title='contact-img']")),
                                mithril_1.default("td", [
                                    mithril_1.default("h5.m-0.font-weight-normal", "Tomaslau"),
                                    mithril_1.default("p.mb-0.text-muted", mithril_1.default("small", "Member Since 2017"))
                                ]),
                                mithril_1.default("td", [
                                    mithril_1.default("i.mdi.mdi-currency-btc.text-primary"),
                                    "BTC"
                                ]),
                                mithril_1.default("td", "0.00816117 BTC"),
                                mithril_1.default("td", "0.00097036 BTC"),
                                mithril_1.default("td", [
                                    mithril_1.default("a.btn.btn-sm.btn-custom[href='#']", mithril_1.default("i.mdi.mdi-plus")),
                                    mithril_1.default("a.btn.btn-sm.btn-danger[href='#']", mithril_1.default("i.mdi.mdi-minus"))
                                ])
                            ]),
                        ])
                    ]))
                ])),
                mithril_1.default(".col-lg-4", mithril_1.default(".card-box", [
                    mithril_1.default("h4.m-t-0.header-title", "Total Wallet Balance"),
                    mithril_1.default("[id='donut-chart']", mithril_1.default(".flot-chart.mt-5[id='donut-chart-container']", { style: { "height": "340px" } }))
                ]))
            ]))),
            mithril_1.default(footer_1.default)
        ]);
    }
};


/***/ }),

/***/ "./src/components/confirm_mail.ts":
/*!****************************************!*\
  !*** ./src/components/confirm_mail.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_2_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".account-content.text-center", [
                        mithril_1.default("svg[version='1.1'][viewBox='0 0 98 98'][x='0px'][xml:space='preserve'][xmlns='http://www.w3.org/2000/svg'][xmlns:graph='&ns_graphs;'][xmlns:i='&ns_ai;'][xmlns:x='&ns_extend;'][xmlns:xlink='http://www.w3.org/1999/xlink'][y='0px']", { style: { "height": "120px" } }, [
                            mithril_1.default("style[type='text/css']", ".st0{fill:#FFFFFF;}\
                       .st1{fill:#02a8b5;}\
                       .st2{fill:#FFFFFF;stroke:#02a8b5;stroke-width:2;stroke-miterlimit:10;}\
                       .st3{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}"),
                            mithril_1.default("g[i:extraneous='self']", [
                                mithril_1.default("circle.st0[cx='49'][cy='49'][id='XMLID_50_'][r='49']"),
                                mithril_1.default("g[id='XMLID_4_']", [
                                    mithril_1.default("path.st1[d='M77.3,42.7V77c0,0.6-0.4,1-1,1H21.7c-0.5,0-1-0.5-1-1V42.7c0-0.3,0.1-0.6,0.4-0.8l27.3-21.7 c0.3-0.3,0.8-0.3,1.2,0l27.3,21.7C77.1,42.1,77.3,42.4,77.3,42.7z'][id='XMLID_49_']"),
                                    mithril_1.default("path.st2[d='M66.5,69.5h-35c-1.1,0-2-0.9-2-2V26.8c0-1.1,0.9-2,2-2h35c1.1,0,2,0.9,2,2v40.7 C68.5,68.6,67.6,69.5,66.5,69.5z'][id='XMLID_48_']"),
                                    mithril_1.default("path.st1[d='M62.9,33.4H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,33,63.4,33.4,62.9,33.4z'][id='XMLID_47_']"),
                                    mithril_1.default("path.st1[d='M62.9,40.3H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,39.9,63.4,40.3,62.9,40.3z'][id='XMLID_46_']"),
                                    mithril_1.default("path.st1[d='M62.9,47.2H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,46.8,63.4,47.2,62.9,47.2z'][id='XMLID_45_']"),
                                    mithril_1.default("path.st1[d='M62.9,54.1H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,53.7,63.4,54.1,62.9,54.1z'][id='XMLID_44_']"),
                                    mithril_1.default("path.st2[d='M41.6,40.1h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7 C42.6,39.7,42.2,40.1,41.6,40.1z'][id='XMLID_43_']"),
                                    mithril_1.default("path.st2[d='M41.6,54.2h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7 C42.6,53.8,42.2,54.2,41.6,54.2z'][id='XMLID_42_']"),
                                    mithril_1.default("path.st1[d='M23.4,46.2l25,17.8c0.3,0.2,0.7,0.2,1.1,0l26.8-19.8l-3.3,30.9H27.7L23.4,46.2z'][id='XMLID_41_']"),
                                    mithril_1.default("path.st3[d='M74.9,45.2L49.5,63.5c-0.3,0.2-0.7,0.2-1.1,0L23.2,45.2'][id='XMLID_40_']")
                                ])
                            ])
                        ]),
                        mithril_1.default("p.text-muted.font-14.mt-2", [
                            "A email has been send to",
                            mithril_1.default("b", "youremail@domain.com"),
                            ".\
                      Please check for an email from company and click on the included link to\
                      reset your password."
                        ]),
                        mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/#!/']", "Back to Home")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © SmartFunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/home.ts":
/*!********************************!*\
  !*** ./src/components/home.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var header_1 = __importDefault(__webpack_require__(/*! widgets/header */ "./src/widgets/header.ts"));
var footer_1 = __importDefault(__webpack_require__(/*! widgets/footer */ "./src/widgets/footer.ts"));
__webpack_require__(/*! jquery-slimscroll */ "./node_modules/jquery-slimscroll/jquery.slimscroll.js");
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
exports.default = {
    oninit: function () {
        $(".navbar-toggle").on("click", function (e) {
            $(this).toggleClass("open");
            $("#navigation").slideToggle(400);
        });
        $(".navigation-menu>li").slice(-2).addClass("last-elements");
        $(".navigation-menu li.has-submenu a[href='#']").on("click", function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent("li").toggleClass("open").find(".submenu:first").toggleClass("open");
            }
        });
        $(".slimscroll").slimScroll({
            height: "auto",
            position: "right",
            size: "8px",
            color: "#9ea5ab"
        });
    },
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(header_1.default),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                    mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/#!/']", "SmartFunding")),
                    mithril_1.default("li.breadcrumb-item.active", "Dashboard")
                ])),
                mithril_1.default("h4.page-title", "Dashboard")
            ]))), 
            // m(".row",
            //   m(".col-12",
            //     m(".card-box", [
            //       m("h4.header-title.mb-4", "Account Overview"),
            //       m(".row", [
            //         m(".col-sm-6.col-lg-6.col-xl-3",
            //           m(".card-box.mb-0.widget-chart-two", [
            //             m(".float-right",
            //               m("input[data-angleoffset='180'][data-fgcolor='#0acf97'][data-height='80'][data-linecap='round'][data-plugin='knob'][data-readonly='true'][data-skin='tron'][data-thickness='.1'][data-width='80'][value='37']")
            //             ),
            //             m(".widget-chart-two-content", [
            //               m("p.text-muted.mb-0.mt-2", "Daily Sales"),
            //               m("h3[class='']", "$35,715")
            //             ])
            //           ])
            //         ),
            //       ])
            //     ])
            //   )
            // ),
            mithril_1.default(".row", [
                mithril_1.default(".col-lg-8", mithril_1.default(".card-box", [
                    mithril_1.default("h4.header-title.mb-3", "Wallet Balances"),
                    mithril_1.default(".table-responsive", mithril_1.default("table.table.table-hover.table-centered.m-0", [
                        mithril_1.default("thead", mithril_1.default("tr", [
                            mithril_1.default("th", "Profile"),
                            mithril_1.default("th", "Name"),
                            mithril_1.default("th", "Currency"),
                            mithril_1.default("th", "Balance"),
                            mithril_1.default("th", "Reserved in orders"),
                            mithril_1.default("th", "Action")
                        ])),
                        mithril_1.default("tbody", [
                            mithril_1.default("tr", [
                                mithril_1.default("td", mithril_1.default("img.rounded-circle.thumb-sm[alt='contact-img'][src='assets/images/users/avatar-2.jpg'][title='contact-img']")),
                                mithril_1.default("td", [
                                    mithril_1.default("h5.m-0.font-weight-normal", "Tomaslau"),
                                    mithril_1.default("p.mb-0.text-muted", mithril_1.default("small", "Member Since 2017"))
                                ]),
                                mithril_1.default("td", [
                                    mithril_1.default("i.mdi.mdi-currency-btc.text-primary"),
                                    "BTC"
                                ]),
                                mithril_1.default("td", "0.00816117 BTC"),
                                mithril_1.default("td", "0.00097036 BTC"),
                                mithril_1.default("td", [
                                    mithril_1.default("a.btn.btn-sm.btn-custom[href='#']", mithril_1.default("i.mdi.mdi-plus")),
                                    mithril_1.default("a.btn.btn-sm.btn-danger[href='#']", mithril_1.default("i.mdi.mdi-minus"))
                                ])
                            ]),
                        ])
                    ]))
                ])),
                mithril_1.default(".col-lg-4", mithril_1.default(".card-box", [
                    mithril_1.default("h4.m-t-0.header-title", "Total Wallet Balance"),
                    mithril_1.default("[id='donut-chart']", mithril_1.default(".flot-chart.mt-5[id='donut-chart-container']", { style: { "height": "340px" } }))
                ]))
            ]))),
            mithril_1.default(footer_1.default)
        ]);
    }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/lock_screen.ts":
/*!***************************************!*\
  !*** ./src/components/lock_screen.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_2_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center", [
                        mithril_1.default(".mb-3", mithril_1.default("img.rounded-circle.img-thumbnail.thumb-lg[alt='thumbnail'][src='assets/images/users/avatar-5.jpg']")),
                        mithril_1.default("p.text-muted.m-b-0.font-14", "Enter your password to access the admin.")
                    ]),
                    mithril_1.default("form.form-horizontal[action='javascript:;']", [
                        mithril_1.default(".form-group.row", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='password']", "Password"),
                            mithril_1.default("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']")
                        ])),
                        mithril_1.default(".form-group.row.text-center", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", "Log In")))
                    ]),
                    mithril_1.default(".row.m-t-50", mithril_1.default(".col-sm-12.text-center", mithril_1.default("p.text-muted", [
                        "Not you? return",
                        mithril_1.default("a.text-dark.ml-2[href='/#!/login']", mithril_1.default("b", "Sign In"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © SmartFunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/login.ts":
/*!*********************************!*\
  !*** ./src/components/login.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var configs_1 = __webpack_require__(/*! configs */ "./src/configs/index.ts");
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
var LoginAccountData = {
    email: "",
    password: "",
    canSave: function () {
        return LoginAccountData.email !== "" &&
            LoginAccountData.password !== "";
    },
    save: function () {
        var account = {
            user: {
                email: LoginAccountData.email,
                password: LoginAccountData.password
            }
        };
        fetch(configs_1.AppSettings.API_BASE_URL + "/api/session/login", {
            method: "POST",
            body: JSON.stringify(account),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(function (res) { return res.json(); })
            .catch(function (err) { return console.error("error", err); })
            .then(function (res) {
            if (res.success && res.user.token) {
                localStorage.setItem("email", res.user.email);
                localStorage.setItem("token", res.user.token);
                mithril_1.default.route.set("/");
            }
            else {
                console.error("error", res.message);
            }
        });
    }
};
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_2_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default("form[method='post']", {
                        onsubmit: function (e) {
                            e.preventDefault();
                            LoginAccountData.save();
                        }
                    }, [
                        mithril_1.default(".form-group.m-b-20.row", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='emailaddress']", "Email address"),
                            mithril_1.default("input.form-control[id='emailaddress'][placeholder='Enter your email'][required=''][type='email']", {
                                oninput: mithril_1.default.withAttr("value", function (v) { LoginAccountData.email = v; }),
                                value: LoginAccountData.email
                            })
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("a.text-muted.pull-right[href='/#!/recover-password']", mithril_1.default("small", "Forgot your password?")),
                            mithril_1.default("label[for='password']", "Password"),
                            mithril_1.default("input.form-control[id='password'][placeholder='Enter your password'][required=''][type='password']", {
                                oninput: mithril_1.default.withAttr("value", function (v) { LoginAccountData.password = v; }),
                                value: LoginAccountData.password
                            })
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", mithril_1.default(".checkbox.checkbox-custom", [
                            mithril_1.default("input[checked=''][id='remember'][type='checkbox']"),
                            mithril_1.default("label[for='remember']", "Remember me")
                        ]))),
                        mithril_1.default(".form-group.row.text-center.m-t-10", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", {
                            disabled: !LoginAccountData.canSave()
                        }, "Sign In")))
                    ]),
                    mithril_1.default(".row.m-t-50", mithril_1.default(".col-sm-12.text-center", mithril_1.default("p.text-muted", [
                        "Don't have an account? ",
                        mithril_1.default("a.text-dark.m-l-5[href='/#!/register']", mithril_1.default("b", "Sign Up"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © SmartFunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/logout.ts":
/*!**********************************!*\
  !*** ./src/components/logout.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
exports.default = {
    oninit: function () {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
    },
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_2_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center.m-b-20", [
                        mithril_1.default(".m-b-20", mithril_1.default(".checkmark", mithril_1.default("svg[enable-background='new 0 0 161.2 161.2'][id='Layer_1'][version='1.1'][viewBox='0 0 161.2 161.2'][x='0px'][xml:space='preserve'][xmlns='http://www.w3.org/2000/svg'][xmlns:xlink='http://www.w3.org/1999/xlink'][y='0px']", [
                            mithril_1.default("path.path[d='M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4 c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5 c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z'][fill='none'][stroke='#32c861'][stroke-miterlimit='10']"),
                            mithril_1.default("circle.path[cx='80.6'][cy='80.6'][fill='none'][r='62.1'][stroke='#32c861'][stroke-miterlimit='10'][stroke-width='4']"),
                            mithril_1.default("polyline.path[fill='none'][points='113,52.8 74.1,108.4 48.2,86.4 '][stroke='#32c861'][stroke-linecap='round'][stroke-miterlimit='10'][stroke-width='6']"),
                            mithril_1.default("circle.spin[cx='80.6'][cy='80.6'][fill='none'][r='73.9'][stroke='#32c861'][stroke-dasharray='12.2175,12.2175'][stroke-miterlimit='10'][stroke-width='4']")
                        ]))),
                        mithril_1.default("h4", "See You Again !"),
                        mithril_1.default("p.text-muted.font-14.m-t-10", [
                            "You are now successfully sign out. Back to ",
                            mithril_1.default("a.text-dark.m-r-5[href='/#!/']", mithril_1.default("b", "Sign In"))
                        ])
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © SmartFunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/not_found.ts":
/*!*************************************!*\
  !*** ./src/components/not_found.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_1_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-1.jpg */ "./images/bg-1.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_1_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center", [
                        mithril_1.default("h1.text-error", "404"),
                        mithril_1.default("h4.text-uppercase.text-danger.mt-3", "Page Not Found"),
                        mithril_1.default("p.text-muted.mt-3", "It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. Here's a little tip that might help you get back on track."),
                        mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/#!/']", "Return Home")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © SmartFunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/not_found_alt.ts":
/*!*****************************************!*\
  !*** ./src/components/not_found_alt.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var header_1 = __importDefault(__webpack_require__(/*! widgets/header */ "./src/widgets/header.ts"));
var footer_1 = __importDefault(__webpack_require__(/*! widgets/footer */ "./src/widgets/footer.ts"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(header_1.default),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", [
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                    mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/#!/']", "SmartFunding")),
                        mithril_1.default("li.breadcrumb-item.active", "Page Not Found")
                    ])),
                    mithril_1.default("h4.page-title", "Page Not Found")
                ]))),
                mithril_1.default(".row", mithril_1.default(".col-sm-6.offset-3", mithril_1.default(".text-center.mt-5", [
                    mithril_1.default("h1.text-error", "404"),
                    mithril_1.default("h4.text-uppercase.text-danger.mt-3", "Page Not Found"),
                    mithril_1.default("p.text-muted.mt-3", "It's looking like you may have taken a wrong turn. Don't worry... it\
                    happens to the best of us. Here's a little tip that might help you get back on track."),
                    mithril_1.default("a.btn.btn-md.btn-custom.waves-effect.waves-light.mt-3[href='/#!/']", "Return Home")
                ])))
            ])),
            mithril_1.default(footer_1.default)
        ]);
    }
};


/***/ }),

/***/ "./src/components/recover_password.ts":
/*!********************************************!*\
  !*** ./src/components/recover_password.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var configs_1 = __webpack_require__(/*! configs */ "./src/configs/index.ts");
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
var RecoverPasswordData = {
    email: "",
    canSave: function () {
        return RecoverPasswordData.email !== "";
    },
    save: function () {
        var account = {
            user: {
                email: RecoverPasswordData.email,
            }
        };
        fetch(configs_1.AppSettings.API_BASE_URL + "/api/session/recover", {
            method: "POST",
            body: JSON.stringify(account),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(function (res) { return res.json(); })
            .catch(function (err) { return console.error("error", err); })
            .then(function (res) {
            if (res.success) {
                mithril_1.default.route.set("/login");
            }
            else {
                console.log("error");
            }
        });
    },
};
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_2_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center.m-b-20", mithril_1.default("p.text-muted.m-b-0", "Enter your email address and we'll send you an email with instructions to reset your password.")),
                    mithril_1.default("form.form-horizontal", {
                        onsubmit: function (e) {
                            e.preventDefault();
                            RecoverPasswordData.save();
                        }
                    }, [
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='emailaddress']", "Email address"),
                            mithril_1.default("input.form-control[id='emailaddress'][placeholder='e.g. jose@rizal.com'][required][type='email']", {
                                oninput: mithril_1.default.withAttr("value", function (v) { RecoverPasswordData.email = v; }),
                                value: RecoverPasswordData.email
                            })
                        ])),
                        mithril_1.default(".form-group.row.text-center.m-t-10", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", {
                            disabled: !RecoverPasswordData.canSave()
                        }, "Reset Password")))
                    ]),
                    mithril_1.default(".row.m-t-50", mithril_1.default(".col-sm-12.text-center", mithril_1.default("p.text-muted", [
                        "Back to ",
                        mithril_1.default("a.text-dark.m-l-5[href='/#!/login']", mithril_1.default("b", "Sign In"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © SmartFunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/register.ts":
/*!************************************!*\
  !*** ./src/components/register.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var configs_1 = __webpack_require__(/*! configs */ "./src/configs/index.ts");
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
var RegisterAccountData = {
    username: "",
    email: "",
    password: "",
    canSave: function () {
        return RegisterAccountData.username !== "" &&
            RegisterAccountData.email !== "" &&
            RegisterAccountData.password !== "";
    },
    save: function () {
        var account = {
            user: {
                username: RegisterAccountData.username,
                email: RegisterAccountData.email,
                password: RegisterAccountData.password
            }
        };
        fetch(configs_1.AppSettings.API_BASE_URL + "/api/session/register", {
            method: "POST",
            body: JSON.stringify(account),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(function (res) { return res.json(); })
            .catch(function (err) { return console.error("error", err); })
            .then(function (res) {
            if (res.success) {
                mithril_1.default.route.set("/login");
            }
            else {
                console.error("error", res.message);
            }
        });
    },
};
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background-image": "url(" + bg_2_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt='logo'][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default("form.form-horizontal[method='post']", {
                        onsubmit: function (e) {
                            e.preventDefault();
                            RegisterAccountData.save();
                        }
                    }, [
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='username']", "Username"),
                            mithril_1.default("input.form-control[id='username'][placeholder='e.g. jrizal'][required][type='text']", {
                                oninput: mithril_1.default.withAttr("value", function (v) { RegisterAccountData.username = v; }),
                                value: RegisterAccountData.username
                            })
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='email']", "Email address"),
                            mithril_1.default("input.form-control[id='email'][placeholder='e.g. jose@rizal.com'][required][type='email']", {
                                oninput: mithril_1.default.withAttr("value", function (v) { RegisterAccountData.email = v; }),
                                value: RegisterAccountData.email
                            })
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='password']", "Password"),
                            mithril_1.default("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']", {
                                oninput: mithril_1.default.withAttr("value", function (v) { RegisterAccountData.password = v; }),
                                value: RegisterAccountData.password
                            })
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", mithril_1.default(".checkbox.checkbox-custom", [
                            mithril_1.default("input[checked][id='remember'][type='checkbox']"),
                            mithril_1.default("label[for='remember']", [
                                "I accept ",
                                mithril_1.default("a.text-custom[href='/#!/terms-and-conditions']", "Terms and Conditions")
                            ])
                        ]))),
                        mithril_1.default(".form-group.row.text-center.m-t-10", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", {
                            disabled: !RegisterAccountData.canSave()
                        }, "Sign Up Free")))
                    ]),
                    mithril_1.default(".row.m-t-50", mithril_1.default(".col-sm-12.text-center", mithril_1.default("p.text-muted", [
                        "Already have an account? ",
                        mithril_1.default("a.text-dark.m-l-5[href='/#!/login']", mithril_1.default("b", "Sign In"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © Smartfunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/server_error.ts":
/*!****************************************!*\
  !*** ./src/components/server_error.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_2_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/#!/']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center", [
                        mithril_1.default("h1.text-error", "500"),
                        mithril_1.default("h4.text-uppercase.text-danger.mt-3", "Internal Server Error"),
                        mithril_1.default("p.text-muted.mt-3", [
                            "Why not try refreshing your page? or you can contact",
                            mithril_1.default("a.text-dark[href='/#!/support']", mithril_1.default("b", "Support"))
                        ]),
                        mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/#!/']", "Return Home")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", "2018 © SmartFunding"))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/configs/index.ts":
/*!******************************!*\
  !*** ./src/configs/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = /** @class */ (function () {
    function AppSettings() {
    }
    AppSettings.API_BASE_URL = "http://localhost:3000";
    return AppSettings;
}());
exports.AppSettings = AppSettings;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var raven_js_1 = __importDefault(__webpack_require__(/*! raven-js */ "./node_modules/raven-js/src/singleton.js"));
var home_1 = __importDefault(__webpack_require__(/*! components/home */ "./src/components/home.ts"));
var register_1 = __importDefault(__webpack_require__(/*! components/register */ "./src/components/register.ts"));
var login_1 = __importDefault(__webpack_require__(/*! components/login */ "./src/components/login.ts"));
var logout_1 = __importDefault(__webpack_require__(/*! components/logout */ "./src/components/logout.ts"));
var lock_screen_1 = __importDefault(__webpack_require__(/*! components/lock_screen */ "./src/components/lock_screen.ts"));
var confirm_mail_1 = __importDefault(__webpack_require__(/*! components/confirm_mail */ "./src/components/confirm_mail.ts"));
var recover_password_1 = __importDefault(__webpack_require__(/*! components/recover_password */ "./src/components/recover_password.ts"));
var dashboard_1 = __importDefault(__webpack_require__(/*! components/admin/dashboard */ "./src/components/admin/dashboard.ts"));
var not_found_1 = __importDefault(__webpack_require__(/*! components/not_found */ "./src/components/not_found.ts"));
var not_found_alt_1 = __importDefault(__webpack_require__(/*! components/not_found_alt */ "./src/components/not_found_alt.ts"));
var server_error_1 = __importDefault(__webpack_require__(/*! components/server_error */ "./src/components/server_error.ts"));
var auth_1 = __webpack_require__(/*! ./auth */ "./src/auth.ts");
function SmartFundingRouter() {
    document.body.id = "sf";
    mithril_1.default.route(document.body, "/", {
        "/": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/login");
                else
                    return home_1.default;
            }
        },
        "/admin/dashboard": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/login");
                else
                    return dashboard_1.default;
            }
        },
        "/register": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return register_1.default;
                else
                    mithril_1.default.route.set("/");
            }
        },
        "/login": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return login_1.default;
                else
                    mithril_1.default.route.set("/");
            }
        },
        "/logout": logout_1.default,
        "/lock-screen": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return lock_screen_1.default;
                else
                    mithril_1.default.route.set("/");
            }
        },
        "/confirm-mail": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return confirm_mail_1.default;
                else
                    mithril_1.default.route.set("/");
            }
        },
        "/recover-password": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return recover_password_1.default;
                else
                    mithril_1.default.route.set("/");
            }
        },
        "/server-error": server_error_1.default,
        "/not-found-alt": not_found_alt_1.default,
        "/:any...": not_found_1.default
    });
}
raven_js_1.default.config("https://06889627b92a49189983e5dc8da83d4f@sentry.io/1227866").install();
raven_js_1.default.context(function () {
    SmartFundingRouter();
});


/***/ }),

/***/ "./src/widgets/footer.ts":
/*!*******************************!*\
  !*** ./src/widgets/footer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
exports.default = {
    view: function (vnode) {
        return mithril_1.default("footer.footer", mithril_1.default(".container", mithril_1.default(".row", mithril_1.default(".col-12.text-center", "2018 © SmartFunding"))));
    }
};


/***/ }),

/***/ "./src/widgets/header.ts":
/*!*******************************!*\
  !*** ./src/widgets/header.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
var avatar_1_jpg_1 = __importDefault(__webpack_require__(/*! images/users/avatar-1.jpg */ "./images/users/avatar-1.jpg"));
exports.default = {
    oninit: function () {
        $('.navbar-toggle')
            .on('click', function (e) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });
        $('.navigation-menu>li').slice(-2).addClass('last-elements');
        $('.navigation-menu li.has-submenu a[href="javascript:;"]')
            .on('click', function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open')
                    .find('.submenu:first').toggleClass('open');
            }
        });
    },
    view: function (vnode) {
        return mithril_1.default("header[id='topnav']", [
            mithril_1.default(".topbar-main", mithril_1.default(".container-fluid", [
                mithril_1.default(".logo", mithril_1.default("a.logo[href='/#!/']", [
                    mithril_1.default("img.logo-small[alt=''][height='26'][src='assets/images/logo_sm.png']"),
                    mithril_1.default("img.logo-large[alt=''][height='22']", { src: sf_logo_png_1.default })
                ])),
                mithril_1.default(".menu-extras.topbar-custom", mithril_1.default("ul.list-unstyled.topbar-right-menu.float-right.mb-0", [
                    mithril_1.default("li.menu-item", mithril_1.default("a.navbar-toggle.nav-link", mithril_1.default(".lines", [mithril_1.default("span"), mithril_1.default("span"), mithril_1.default("span")]))),
                    mithril_1.default("li.dropdown.notification-list", [
                        mithril_1.default("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='javascript:;'][role='button']", [
                            mithril_1.default("i.fi-bell.noti-icon"),
                        ]),
                        mithril_1.default(".dropdown-menu.dropdown-menu-right.dropdown-lg", [
                            mithril_1.default(".dropdown-item.noti-title", mithril_1.default("h6.m-0", [
                                mithril_1.default("span.float-right", mithril_1.default("a.text-dark[href='']", mithril_1.default("small", "Clear All"))),
                                "Notification"
                            ])),
                            mithril_1.default(".slimscroll", { style: { "max-height": "230px" } }, [
                                mithril_1.default("a.dropdown-item.notify-item[href='javascript:;']", [
                                    mithril_1.default(".notify-icon.bg-success", mithril_1.default("i.mdi.mdi-comment-account-outline")),
                                    mithril_1.default("p.notify-details", [
                                        "Caleb Flakelar commented on Admin",
                                        mithril_1.default("small.text-muted", "1 min ago")
                                    ])
                                ])
                            ]),
                            mithril_1.default("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:;']", [
                                "View all",
                                mithril_1.default("i.fi-arrow-right")
                            ])
                        ])
                    ]),
                    mithril_1.default("li.dropdown.notification-list", [
                        mithril_1.default("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='javascript:;'][role='button']", [
                            mithril_1.default("img.rounded-circle[alt='user']", { src: avatar_1_jpg_1.default }),
                            mithril_1.default("span.ml-1.pro-user-name", [
                                "User",
                                mithril_1.default("i.mdi.mdi-chevron-down")
                            ])
                        ]),
                        mithril_1.default(".dropdown-menu.dropdown-menu-right.profile-dropdown.", [
                            mithril_1.default(".dropdown-item.noti-title", mithril_1.default("h6.text-overflow.m-0", "Welcome !")),
                            mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                mithril_1.default("i.fi-head"),
                                mithril_1.default("span", "My Account")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                mithril_1.default("i.fi-cog"),
                                mithril_1.default("span", "Settings")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                mithril_1.default("i.fi-help"),
                                mithril_1.default("span", "Support")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                mithril_1.default("i.fi-lock"),
                                mithril_1.default("span", "Lock Screen")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                mithril_1.default("i.fi-power"),
                                mithril_1.default("span", "Logout")
                            ])
                        ])
                    ])
                ])),
                mithril_1.default(".clearfix")
            ])),
            mithril_1.default(".navbar-custom", mithril_1.default(".container-fluid", mithril_1.default("[id='navigation']", mithril_1.default("ul.navigation-menu", [
                mithril_1.default("li.has-submenu", mithril_1.default("a[href='/#!/']", [
                    mithril_1.default("i.icon-speedometer"),
                    "Dashboard"
                ])),
            ]))))
        ]);
    }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./styles/app.scss":
/*!*************************!*\
  !*** ./styles/app.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./styles/icons.scss":
/*!***************************!*\
  !*** ./styles/icons.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ffimnsr/Public/Projects/alchemy/src/github.com/ffimnsr/loan/smartfunding-crypto/src/index.ts */"./src/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL2JnLTEuanBnIiwid2VicGFjazovLy8uL2ltYWdlcy9iZy0yLmpwZyIsIndlYnBhY2s6Ly8vLi9pbWFnZXMvc2YtbG9nby5wbmciLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL3VzZXJzL2F2YXRhci0xLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0aC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hZG1pbi9kYXNoYm9hcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29uZmlybV9tYWlsLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hvbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9ja19zY3JlZW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9nb3V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25vdF9mb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ub3RfZm91bmRfYWx0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JlY292ZXJfcGFzc3dvcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VydmVyX2Vycm9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25maWdzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0cy9mb290ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldHMvaGVhZGVyLnRzIiwid2VicGFjazovLy8uL3N0eWxlcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvaWNvbnMu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Q0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDOzZCQUN0QixDQUFDOzRCQUNGLGlCQUFDLENBQUMseURBQXlELEVBQUU7Z0NBQzNELGlCQUFDLENBQUMsV0FBVyxDQUFDO2dDQUNkLGlCQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQzs2QkFDckIsQ0FBQzs0QkFDRixpQkFBQyxDQUFDLHlEQUF5RCxFQUFFO2dDQUMzRCxpQkFBQyxDQUFDLFdBQVcsQ0FBQztnQ0FDZCxpQkFBQyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7NkJBQ3pCLENBQUM7NEJBQ0YsaUJBQUMsQ0FBQyx5REFBeUQsRUFBRTtnQ0FDM0QsaUJBQUMsQ0FBQyxZQUFZLENBQUM7Z0NBQ2YsaUJBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDOzZCQUNwQixDQUFDO3lCQUNILENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDLENBQ0g7Z0JBQ0QsaUJBQUMsQ0FBQyxXQUFXLENBQUM7YUFDZixDQUFDLENBQ0w7WUFDRCxpQkFBQyxDQUFDLGdCQUFnQixFQUNoQixpQkFBQyxDQUFDLGtCQUFrQixFQUNsQixpQkFBQyxDQUFDLG1CQUFtQixFQUNuQixpQkFBQyxDQUFDLG9CQUFvQixFQUFFO2dCQUN0QixpQkFBQyxDQUFDLGdCQUFnQixFQUNoQixpQkFBQyxDQUFDLGdCQUFnQixFQUFFO29CQUNsQixpQkFBQyxDQUFDLG9CQUFvQixDQUFDO29CQUN2QixXQUFXO2lCQUNaLENBQUMsQ0FDSDthQUNGLENBQUMsQ0FDSCxDQUNGLENBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNhLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNqSWpCLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDIiwiZmlsZSI6InNlc2FtZS44MjliZWM1MjBjZDg1MzU1ZWZhNS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInNlc2FtZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJpbWFnZXMvYmctMS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiaW1hZ2VzL2JnLTIuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJpbWFnZXMvYXZhdGFyLTEuanBnXCI7IiwiZXhwb3J0IGNsYXNzIEF1dGgge1xuICBwdWJsaWMgc3RhdGljIGNoZWNrVG9rZW5Ob25lKCkge1xuICAgIGxldCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XG4gICAgcmV0dXJuIHRva2VuID09IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IGhlYWRlciBmcm9tIFwid2lkZ2V0cy9oZWFkZXJcIjtcbmltcG9ydCBmb290ZXIgZnJvbSBcIndpZGdldHMvZm9vdGVyXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oaGVhZGVyKSxcbiAgICAgIG0oXCIud3JhcHBlclwiLFxuICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLFxuXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyXCIsXG4gICAgICAgICAgICAgIG0oXCIucGFnZS10aXRsZS1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCIuYnRuLWdyb3VwLnB1bGwtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJvbC5icmVhZGNydW1iLmhpZGUtcGhvbmUucC0wLm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPScvIyEvJ11cIiwgXCJTbWFydEZ1bmRpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbS5hY3RpdmVcIiwgXCJEYXNoYm9hcmRcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucGFnZS10aXRsZVwiLCBcIkRhc2hib2FyZFwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG5cbiAgICAgICAgICBtKFwiLnJvd1wiLCBbXG4gICAgICAgICAgICBtKFwiLmNvbC1sZy04XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoNC5oZWFkZXItdGl0bGUubWItM1wiLCBcIldhbGxldCBCYWxhbmNlc1wiKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRhYmxlLXJlc3BvbnNpdmVcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJ0YWJsZS50YWJsZS50YWJsZS1ob3Zlci50YWJsZS1jZW50ZXJlZC5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwidGhlYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiUHJvZmlsZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIk5hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJDdXJyZW5jeVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIkJhbGFuY2VcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJSZXNlcnZlZCBpbiBvcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJBY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwidGJvZHlcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImltZy5yb3VuZGVkLWNpcmNsZS50aHVtYi1zbVthbHQ9J2NvbnRhY3QtaW1nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci0yLmpwZyddW3RpdGxlPSdjb250YWN0LWltZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImg1Lm0tMC5mb250LXdlaWdodC1ub3JtYWxcIiwgXCJUb21hc2xhdVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubWItMC50ZXh0LW11dGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNtYWxsXCIsIFwiTWVtYmVyIFNpbmNlIDIwMTdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWN1cnJlbmN5LWJ0Yy50ZXh0LXByaW1hcnlcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQlRDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiMC4wMDgxNjExNyBCVENcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgXCIwLjAwMDk3MDM2IEJUQ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tc20uYnRuLWN1c3RvbVtocmVmPScjJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLXBsdXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1zbS5idG4tZGFuZ2VyW2hyZWY9JyMnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktbWludXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG0oXCIuY29sLWxnLTRcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcImg0Lm0tdC0wLmhlYWRlci10aXRsZVwiLCBcIlRvdGFsIFdhbGxldCBCYWxhbmNlXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJbaWQ9J2RvbnV0LWNoYXJ0J11cIixcbiAgICAgICAgICAgICAgICAgIG0oXCIuZmxvdC1jaGFydC5tdC01W2lkPSdkb251dC1jaGFydC1jb250YWluZXInXVwiLCB7IHN0eWxlOiB7IFwiaGVpZ2h0XCI6IFwiMzQwcHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBtKGZvb3RlcilcbiAgICBdKTtcbiAgfVxufVxuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLmFjY291bnQtY29udGVudC50ZXh0LWNlbnRlclwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwic3ZnW3ZlcnNpb249JzEuMSddW3ZpZXdCb3g9JzAgMCA5OCA5OCddW3g9JzBweCddW3htbDpzcGFjZT0ncHJlc2VydmUnXVt4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXVt4bWxuczpncmFwaD0nJm5zX2dyYXBoczsnXVt4bWxuczppPScmbnNfYWk7J11beG1sbnM6eD0nJm5zX2V4dGVuZDsnXVt4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayddW3k9JzBweCddXCIsIHsgc3R5bGU6IHsgXCJoZWlnaHRcIjogXCIxMjBweFwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwic3R5bGVbdHlwZT0ndGV4dC9jc3MnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiLnN0MHtmaWxsOiNGRkZGRkY7fVxcXG4gICAgICAgICAgICAgICAgICAgICAgIC5zdDF7ZmlsbDojMDJhOGI1O31cXFxuICAgICAgICAgICAgICAgICAgICAgICAuc3Qye2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAyYThiNTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XFxcbiAgICAgICAgICAgICAgICAgICAgICAgLnN0M3tmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJnW2k6ZXh0cmFuZW91cz0nc2VsZiddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiY2lyY2xlLnN0MFtjeD0nNDknXVtjeT0nNDknXVtpZD0nWE1MSURfNTBfJ11bcj0nNDknXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiZ1tpZD0nWE1MSURfNF8nXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTc3LjMsNDIuN1Y3N2MwLDAuNi0wLjQsMS0xLDFIMjEuN2MtMC41LDAtMS0wLjUtMS0xVjQyLjdjMC0wLjMsMC4xLTAuNiwwLjQtMC44bDI3LjMtMjEuNyBjMC4zLTAuMywwLjgtMC4zLDEuMiwwbDI3LjMsMjEuN0M3Ny4xLDQyLjEsNzcuMyw0Mi40LDc3LjMsNDIuN3onXVtpZD0nWE1MSURfNDlfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDJbZD0nTTY2LjUsNjkuNWgtMzVjLTEuMSwwLTItMC45LTItMlYyNi44YzAtMS4xLDAuOS0yLDItMmgzNWMxLjEsMCwyLDAuOSwyLDJ2NDAuNyBDNjguNSw2OC42LDY3LjYsNjkuNSw2Ni41LDY5LjV6J11baWQ9J1hNTElEXzQ4XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J002Mi45LDMzLjRINDcuMmMtMC41LDAtMC45LTAuNC0wLjktMC45di0wLjJjMC0wLjUsMC40LTAuOSwwLjktMC45aDE1LjcgYzAuNSwwLDAuOSwwLjQsMC45LDAuOXYwLjJDNjMuOCwzMyw2My40LDMzLjQsNjIuOSwzMy40eiddW2lkPSdYTUxJRF80N18nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNNjIuOSw0MC4zSDQ3LjJjLTAuNSwwLTAuOS0wLjQtMC45LTAuOXYtMC4yYzAtMC41LDAuNC0wLjksMC45LTAuOWgxNS43IGMwLjUsMCwwLjksMC40LDAuOSwwLjl2MC4yQzYzLjgsMzkuOSw2My40LDQwLjMsNjIuOSw0MC4zeiddW2lkPSdYTUxJRF80Nl8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNNjIuOSw0Ny4ySDQ3LjJjLTAuNSwwLTAuOS0wLjQtMC45LTAuOXYtMC4yYzAtMC41LDAuNC0wLjksMC45LTAuOWgxNS43IGMwLjUsMCwwLjksMC40LDAuOSwwLjl2MC4yQzYzLjgsNDYuOCw2My40LDQ3LjIsNjIuOSw0Ny4yeiddW2lkPSdYTUxJRF80NV8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNNjIuOSw1NC4xSDQ3LjJjLTAuNSwwLTAuOS0wLjQtMC45LTAuOXYtMC4yYzAtMC41LDAuNC0wLjksMC45LTAuOWgxNS43IGMwLjUsMCwwLjksMC40LDAuOSwwLjl2MC4yQzYzLjgsNTMuNyw2My40LDU0LjEsNjIuOSw1NC4xeiddW2lkPSdYTUxJRF80NF8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MltkPSdNNDEuNiw0MC4xaC01LjhjLTAuNiwwLTEtMC40LTEtMXYtNi43YzAtMC42LDAuNC0xLDEtMWg1LjhjMC42LDAsMSwwLjQsMSwxdjYuNyBDNDIuNiwzOS43LDQyLjIsNDAuMSw0MS42LDQwLjF6J11baWQ9J1hNTElEXzQzXyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QyW2Q9J000MS42LDU0LjJoLTUuOGMtMC42LDAtMS0wLjQtMS0xdi02LjdjMC0wLjYsMC40LTEsMS0xaDUuOGMwLjYsMCwxLDAuNCwxLDF2Ni43IEM0Mi42LDUzLjgsNDIuMiw1NC4yLDQxLjYsNTQuMnonXVtpZD0nWE1MSURfNDJfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTIzLjQsNDYuMmwyNSwxNy44YzAuMywwLjIsMC43LDAuMiwxLjEsMGwyNi44LTE5LjhsLTMuMywzMC45SDI3LjdMMjMuNCw0Ni4yeiddW2lkPSdYTUxJRF80MV8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0M1tkPSdNNzQuOSw0NS4yTDQ5LjUsNjMuNWMtMC4zLDAuMi0wLjcsMC4yLTEuMSwwTDIzLjIsNDUuMiddW2lkPSdYTUxJRF80MF8nXVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xNC5tdC0yXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgXCJBIGVtYWlsIGhhcyBiZWVuIHNlbmQgdG9cIixcbiAgICAgICAgICAgICAgICAgICAgbShcImJcIiwgXCJ5b3VyZW1haWxAZG9tYWluLmNvbVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCIuXFxcbiAgICAgICAgICAgICAgICAgICAgICBQbGVhc2UgY2hlY2sgZm9yIGFuIGVtYWlsIGZyb20gY29tcGFueSBhbmQgY2xpY2sgb24gdGhlIGluY2x1ZGVkIGxpbmsgdG9cXFxuICAgICAgICAgICAgICAgICAgICAgIHJlc2V0IHlvdXIgcGFzc3dvcmQuXCJcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1tZC5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubXQtM1tocmVmPScvIyEvJ11cIiwgXCJCYWNrIHRvIEhvbWVcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBoZWFkZXIgZnJvbSBcIndpZGdldHMvaGVhZGVyXCI7XG5pbXBvcnQgZm9vdGVyIGZyb20gXCJ3aWRnZXRzL2Zvb3RlclwiO1xuXG5pbXBvcnQgXCJqcXVlcnktc2xpbXNjcm9sbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBvbmluaXQoKSB7XG4gICAgJChcIi5uYXZiYXItdG9nZ2xlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZTogRXZlbnQpIHtcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgJChcIiNuYXZpZ2F0aW9uXCIpLnNsaWRlVG9nZ2xlKDQwMCk7XG4gICAgfSk7XG5cbiAgICAkKFwiLm5hdmlnYXRpb24tbWVudT5saVwiKS5zbGljZSgtMikuYWRkQ2xhc3MoXCJsYXN0LWVsZW1lbnRzXCIpO1xuXG4gICAgJChcIi5uYXZpZ2F0aW9uLW1lbnUgbGkuaGFzLXN1Ym1lbnUgYVtocmVmPScjJ11cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlOiBFdmVudCkge1xuICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpISA8IDk5Mikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpLmZpbmQoXCIuc3VibWVudTpmaXJzdFwiKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgICQoXCIuc2xpbXNjcm9sbFwiKS5zbGltU2Nyb2xsKHtcbiAgICAgIGhlaWdodDogXCJhdXRvXCIsXG4gICAgICBwb3NpdGlvbjogXCJyaWdodFwiLFxuICAgICAgc2l6ZTogXCI4cHhcIixcbiAgICAgIGNvbG9yOiBcIiM5ZWE1YWJcIlxuICAgIH0pO1xuICB9LFxuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShoZWFkZXIpLFxuICAgICAgbShcIi53cmFwcGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsXG5cbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tMTJcIixcbiAgICAgICAgICAgICAgbShcIi5wYWdlLXRpdGxlLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5idG4tZ3JvdXAucHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgbShcIm9sLmJyZWFkY3J1bWIuaGlkZS1waG9uZS5wLTAubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8jIS8nXVwiLCBcIlNtYXJ0RnVuZGluZ1wiKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwibGkuYnJlYWRjcnVtYi1pdGVtLmFjdGl2ZVwiLCBcIkRhc2hib2FyZFwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJoNC5wYWdlLXRpdGxlXCIsIFwiRGFzaGJvYXJkXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcblxuICAgICAgICAgIC8vIG0oXCIucm93XCIsXG4gICAgICAgICAgLy8gICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgIC8vICAgICBtKFwiLmNhcmQtYm94XCIsIFtcbiAgICAgICAgICAvLyAgICAgICBtKFwiaDQuaGVhZGVyLXRpdGxlLm1iLTRcIiwgXCJBY2NvdW50IE92ZXJ2aWV3XCIpLFxuICAgICAgICAgIC8vICAgICAgIG0oXCIucm93XCIsIFtcbiAgICAgICAgICAvLyAgICAgICAgIG0oXCIuY29sLXNtLTYuY29sLWxnLTYuY29sLXhsLTNcIixcbiAgICAgICAgICAvLyAgICAgICAgICAgbShcIi5jYXJkLWJveC5tYi0wLndpZGdldC1jaGFydC10d29cIiwgW1xuICAgICAgICAgIC8vICAgICAgICAgICAgIG0oXCIuZmxvYXQtcmlnaHRcIixcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgIG0oXCJpbnB1dFtkYXRhLWFuZ2xlb2Zmc2V0PScxODAnXVtkYXRhLWZnY29sb3I9JyMwYWNmOTcnXVtkYXRhLWhlaWdodD0nODAnXVtkYXRhLWxpbmVjYXA9J3JvdW5kJ11bZGF0YS1wbHVnaW49J2tub2InXVtkYXRhLXJlYWRvbmx5PSd0cnVlJ11bZGF0YS1za2luPSd0cm9uJ11bZGF0YS10aGlja25lc3M9Jy4xJ11bZGF0YS13aWR0aD0nODAnXVt2YWx1ZT0nMzcnXVwiKVxuICAgICAgICAgIC8vICAgICAgICAgICAgICksXG4gICAgICAgICAgLy8gICAgICAgICAgICAgbShcIi53aWRnZXQtY2hhcnQtdHdvLWNvbnRlbnRcIiwgW1xuICAgICAgICAgIC8vICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5tYi0wLm10LTJcIiwgXCJEYWlseSBTYWxlc1wiKSxcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgIG0oXCJoM1tjbGFzcz0nJ11cIiwgXCIkMzUsNzE1XCIpXG4gICAgICAgICAgLy8gICAgICAgICAgICAgXSlcbiAgICAgICAgICAvLyAgICAgICAgICAgXSlcbiAgICAgICAgICAvLyAgICAgICAgICksXG4gICAgICAgICAgLy8gICAgICAgXSlcbiAgICAgICAgICAvLyAgICAgXSlcbiAgICAgICAgICAvLyAgIClcbiAgICAgICAgICAvLyApLFxuXG4gICAgICAgICAgbShcIi5yb3dcIiwgW1xuICAgICAgICAgICAgbShcIi5jb2wtbGctOFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDQuaGVhZGVyLXRpdGxlLm1iLTNcIiwgXCJXYWxsZXQgQmFsYW5jZXNcIiksXG4gICAgICAgICAgICAgICAgbShcIi50YWJsZS1yZXNwb25zaXZlXCIsXG4gICAgICAgICAgICAgICAgICBtKFwidGFibGUudGFibGUudGFibGUtaG92ZXIudGFibGUtY2VudGVyZWQubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInRoZWFkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIlByb2ZpbGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJCYWxhbmNlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiUmVzZXJ2ZWQgaW4gb3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcInRib2R5XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcucm91bmRlZC1jaXJjbGUudGh1bWItc21bYWx0PSdjb250YWN0LWltZyddW3NyYz0nYXNzZXRzL2ltYWdlcy91c2Vycy9hdmF0YXItMi5qcGcnXVt0aXRsZT0nY29udGFjdC1pbWcnXVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJoNS5tLTAuZm9udC13ZWlnaHQtbm9ybWFsXCIsIFwiVG9tYXNsYXVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLm1iLTAudGV4dC1tdXRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzbWFsbFwiLCBcIk1lbWJlciBTaW5jZSAyMDE3XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImkubWRpLm1kaS1jdXJyZW5jeS1idGMudGV4dC1wcmltYXJ5XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkJUQ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBcIjAuMDA4MTYxMTcgQlRDXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiMC4wMDA5NzAzNiBCVENcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLXNtLmJ0bi1jdXN0b21baHJlZj0nIyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImkubWRpLm1kaS1wbHVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tc20uYnRuLWRhbmdlcltocmVmPScjJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLW1pbnVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtKFwiLmNvbC1sZy00XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoNC5tLXQtMC5oZWFkZXItdGl0bGVcIiwgXCJUb3RhbCBXYWxsZXQgQmFsYW5jZVwiKSxcbiAgICAgICAgICAgICAgICBtKFwiW2lkPSdkb251dC1jaGFydCddXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmZsb3QtY2hhcnQubXQtNVtpZD0nZG9udXQtY2hhcnQtY29udGFpbmVyJ11cIiwgeyBzdHlsZTogeyBcImhlaWdodFwiOiBcIjM0MHB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgbShmb290ZXIpXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcIi5tYi0zXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpbWcucm91bmRlZC1jaXJjbGUuaW1nLXRodW1ibmFpbC50aHVtYi1sZ1thbHQ9J3RodW1ibmFpbCddW3NyYz0nYXNzZXRzL2ltYWdlcy91c2Vycy9hdmF0YXItNS5qcGcnXVwiKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQubS1iLTAuZm9udC0xNFwiLCBcIkVudGVyIHlvdXIgcGFzc3dvcmQgdG8gYWNjZXNzIHRoZSBhZG1pbi5cIilcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtKFwiZm9ybS5mb3JtLWhvcml6b250YWxbYWN0aW9uPSdqYXZhc2NyaXB0OjsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93XCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdwYXNzd29yZCddXCIsIFwiUGFzc3dvcmRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0ncGFzc3dvcmQnXVtwbGFjZWhvbGRlcj0nRW50ZXIgeW91ciBwYXNzd29yZCddW3JlcXVpcmVkXVt0eXBlPSdwYXNzd29yZCddXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJidXR0b24uYnRuLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodFt0eXBlPSdzdWJtaXQnXVwiLCBcIkxvZyBJblwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcIi5yb3cubS10LTUwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS0xMi50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIk5vdCB5b3U/IHJldHVyblwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tbC0yW2hyZWY9Jy8jIS9sb2dpbiddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiYlwiLCBcIlNpZ24gSW5cIilcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCJjb25maWdzXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5jb25zdCBMb2dpbkFjY291bnREYXRhID0ge1xuICBlbWFpbDogXCJcIixcbiAgcGFzc3dvcmQ6IFwiXCIsXG5cbiAgY2FuU2F2ZSgpIHtcbiAgICByZXR1cm4gTG9naW5BY2NvdW50RGF0YS5lbWFpbCAhPT0gXCJcIiAmJlxuICAgICAgTG9naW5BY2NvdW50RGF0YS5wYXNzd29yZCAhPT0gXCJcIjtcbiAgfSxcbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBhY2NvdW50ID0ge1xuICAgICAgdXNlcjoge1xuICAgICAgICBlbWFpbDogTG9naW5BY2NvdW50RGF0YS5lbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IExvZ2luQWNjb3VudERhdGEucGFzc3dvcmRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZmV0Y2goQXBwU2V0dGluZ3MuQVBJX0JBU0VfVVJMICsgXCIvYXBpL3Nlc3Npb24vbG9naW5cIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGFjY291bnQpLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCJcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihcImVycm9yXCIsIGVycikpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuc3VjY2VzcyAmJiByZXMudXNlci50b2tlbikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVtYWlsXCIsIHJlcy51c2VyLmVtYWlsKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCByZXMudXNlci50b2tlbik7XG4gICAgICAgIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvclwiLCByZXMubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmRcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8jIS8nXVwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImZvcm1bbWV0aG9kPSdwb3N0J11cIiwge1xuICAgICAgICAgICAgICAgICAgb25zdWJtaXQ6IChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIExvZ2luQWNjb3VudERhdGEuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5tLWItMjAucm93XCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdlbWFpbGFkZHJlc3MnXVwiLCBcIkVtYWlsIGFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0nZW1haWxhZGRyZXNzJ11bcGxhY2Vob2xkZXI9J0VudGVyIHlvdXIgZW1haWwnXVtyZXF1aXJlZD0nJ11bdHlwZT0nZW1haWwnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBtLndpdGhBdHRyKFwidmFsdWVcIiwgKHY6IHN0cmluZykgPT4geyBMb2dpbkFjY291bnREYXRhLmVtYWlsID0gdiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBMb2dpbkFjY291bnREYXRhLmVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1tdXRlZC5wdWxsLXJpZ2h0W2hyZWY9Jy8jIS9yZWNvdmVyLXBhc3N3b3JkJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzbWFsbFwiLCBcIkZvcmdvdCB5b3VyIHBhc3N3b3JkP1wiKVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ncGFzc3dvcmQnXVwiLCBcIlBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3Bhc3N3b3JkJ11bcGxhY2Vob2xkZXI9J0VudGVyIHlvdXIgcGFzc3dvcmQnXVtyZXF1aXJlZD0nJ11bdHlwZT0ncGFzc3dvcmQnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBtLndpdGhBdHRyKFwidmFsdWVcIiwgKHY6IHN0cmluZykgPT4geyBMb2dpbkFjY291bnREYXRhLnBhc3N3b3JkID0gdiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBMb2dpbkFjY291bnREYXRhLnBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCIuY2hlY2tib3guY2hlY2tib3gtY3VzdG9tXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dFtjaGVja2VkPScnXVtpZD0ncmVtZW1iZXInXVt0eXBlPSdjaGVja2JveCddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ncmVtZW1iZXInXVwiLCBcIlJlbWVtYmVyIG1lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cudGV4dC1jZW50ZXIubS10LTEwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImJ1dHRvbi5idG4uYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0W3R5cGU9J3N1Ym1pdCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhTG9naW5BY2NvdW50RGF0YS5jYW5TYXZlKClcbiAgICAgICAgICAgICAgICAgICAgICB9LCBcIlNpZ24gSW5cIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCIucm93Lm0tdC01MFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tMTIudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJEb24ndCBoYXZlIGFuIGFjY291bnQ/IFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tLWwtNVtocmVmPScvIyEvcmVnaXN0ZXInXVwiLCBtKFwiYlwiLCBcIlNpZ24gVXBcIikpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9uaW5pdCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImVtYWlsXCIpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidG9rZW5cIik7XG4gIH0sXG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXIubS1iLTIwXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY2hlY2ttYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInN2Z1tlbmFibGUtYmFja2dyb3VuZD0nbmV3IDAgMCAxNjEuMiAxNjEuMiddW2lkPSdMYXllcl8xJ11bdmVyc2lvbj0nMS4xJ11bdmlld0JveD0nMCAwIDE2MS4yIDE2MS4yJ11beD0nMHB4J11beG1sOnNwYWNlPSdwcmVzZXJ2ZSddW3htbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyddW3htbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ11beT0nMHB4J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGgucGF0aFtkPSdNNDI1LjksNTIuMUw0MjUuOSw1Mi4xYy0yLjItMi42LTYtMi42LTguMy0wLjFsLTQyLjcsNDYuMmwtMTQuMy0xNi40IGMtMi4zLTIuNy02LjItMi43LTguNi0wLjFjLTEuOSwyLjEtMiw1LjYtMC4xLDcuN2wxNy42LDIwLjNjMC4yLDAuMywwLjQsMC42LDAuNiwwLjljMS44LDIsNC40LDIuNSw2LjYsMS40YzAuNy0wLjMsMS40LTAuOCwyLTEuNSBjMC4zLTAuMywwLjUtMC42LDAuNy0wLjlsNDYuMy01MC4xQzQyNy43LDU3LjUsNDI3LjcsNTQuMiw0MjUuOSw1Mi4xeiddW2ZpbGw9J25vbmUnXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJjaXJjbGUucGF0aFtjeD0nODAuNiddW2N5PSc4MC42J11bZmlsbD0nbm9uZSddW3I9JzYyLjEnXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVtzdHJva2Utd2lkdGg9JzQnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwb2x5bGluZS5wYXRoW2ZpbGw9J25vbmUnXVtwb2ludHM9JzExMyw1Mi44IDc0LjEsMTA4LjQgNDguMiw4Ni40ICddW3N0cm9rZT0nIzMyYzg2MSddW3N0cm9rZS1saW5lY2FwPSdyb3VuZCddW3N0cm9rZS1taXRlcmxpbWl0PScxMCddW3N0cm9rZS13aWR0aD0nNiddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImNpcmNsZS5zcGluW2N4PSc4MC42J11bY3k9JzgwLjYnXVtmaWxsPSdub25lJ11bcj0nNzMuOSddW3N0cm9rZT0nIzMyYzg2MSddW3N0cm9rZS1kYXNoYXJyYXk9JzEyLjIxNzUsMTIuMjE3NSddW3N0cm9rZS1taXRlcmxpbWl0PScxMCddW3N0cm9rZS13aWR0aD0nNCddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJoNFwiLCBcIlNlZSBZb3UgQWdhaW4gIVwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xNC5tLXQtMTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBcIllvdSBhcmUgbm93IHN1Y2Nlc3NmdWxseSBzaWduIG91dC4gQmFjayB0byBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrLm0tci01W2hyZWY9Jy8jIS8nXVwiLCBtKFwiYlwiLCBcIlNpZ24gSW5cIikpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTEuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmRcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8jIS8nXVwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi50ZXh0LWNlbnRlclwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiaDEudGV4dC1lcnJvclwiLCBcIjQwNFwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJoNC50ZXh0LXVwcGVyY2FzZS50ZXh0LWRhbmdlci5tdC0zXCIsIFwiUGFnZSBOb3QgRm91bmRcIiksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm10LTNcIiwgXCJJdCdzIGxvb2tpbmcgbGlrZSB5b3UgbWF5IGhhdmUgdGFrZW4gYSB3cm9uZyB0dXJuLiBEb24ndCB3b3JyeS4uLiBpdCBoYXBwZW5zIHRvIHRoZSBiZXN0IG9mIHVzLiBIZXJlJ3MgYSBsaXR0bGUgdGlwIHRoYXQgbWlnaHQgaGVscCB5b3UgZ2V0IGJhY2sgb24gdHJhY2suXCIpLFxuICAgICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1tZC5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubXQtM1tocmVmPScvIyEvJ11cIiwgXCJSZXR1cm4gSG9tZVwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IGhlYWRlciBmcm9tIFwid2lkZ2V0cy9oZWFkZXJcIjtcbmltcG9ydCBmb290ZXIgZnJvbSBcIndpZGdldHMvZm9vdGVyXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0xLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKGhlYWRlciksXG4gICAgICBtKFwiLndyYXBwZXJcIixcbiAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIiwgW1xuICAgICAgICAgIG0oXCIucm93XCIsXG4gICAgICAgICAgICBtKFwiLmNvbC1zbS0xMlwiLFxuICAgICAgICAgICAgICBtKFwiLnBhZ2UtdGl0bGUtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLmJ0bi1ncm91cC5wdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICBtKFwib2wuYnJlYWRjcnVtYi5oaWRlLXBob25lLnAtMC5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwibGkuYnJlYWRjcnVtYi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nLyMhLyddXCIsIFwiU21hcnRGdW5kaW5nXCIpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW0uYWN0aXZlXCIsIFwiUGFnZSBOb3QgRm91bmRcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucGFnZS10aXRsZVwiLCBcIlBhZ2UgTm90IEZvdW5kXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tNi5vZmZzZXQtM1wiLFxuICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyLm10LTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMS50ZXh0LWVycm9yXCIsIFwiNDA0XCIpLFxuICAgICAgICAgICAgICAgIG0oXCJoNC50ZXh0LXVwcGVyY2FzZS50ZXh0LWRhbmdlci5tdC0zXCIsIFwiUGFnZSBOb3QgRm91bmRcIiksXG4gICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5tdC0zXCIsXG4gICAgICAgICAgICAgICAgICBcIkl0J3MgbG9va2luZyBsaWtlIHlvdSBtYXkgaGF2ZSB0YWtlbiBhIHdyb25nIHR1cm4uIERvbid0IHdvcnJ5Li4uIGl0XFxcbiAgICAgICAgICAgICAgICAgICAgaGFwcGVucyB0byB0aGUgYmVzdCBvZiB1cy4gSGVyZSdzIGEgbGl0dGxlIHRpcCB0aGF0IG1pZ2h0IGhlbHAgeW91IGdldCBiYWNrIG9uIHRyYWNrLlwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLW1kLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0Lm10LTNbaHJlZj0nLyMhLyddXCIsIFwiUmV0dXJuIEhvbWVcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgICAgbShmb290ZXIpXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCJjb25maWdzXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5jb25zdCBSZWNvdmVyUGFzc3dvcmREYXRhID0ge1xuICBlbWFpbDogXCJcIixcblxuICBjYW5TYXZlKCkge1xuICAgIHJldHVybiBSZWNvdmVyUGFzc3dvcmREYXRhLmVtYWlsICE9PSBcIlwiO1xuICB9LFxuICBzYXZlKCkge1xuICAgIGNvbnN0IGFjY291bnQgPSB7XG4gICAgICB1c2VyOiB7XG4gICAgICAgIGVtYWlsOiBSZWNvdmVyUGFzc3dvcmREYXRhLmVtYWlsLFxuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaChBcHBTZXR0aW5ncy5BUElfQkFTRV9VUkwgKyBcIi9hcGkvc2Vzc2lvbi9yZWNvdmVyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShhY2NvdW50KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJlcnJvclwiLCBlcnIpKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgbS5yb3V0ZS5zZXQoXCIvbG9naW5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpXG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXIubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm0tYi0wXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRW50ZXIgeW91ciBlbWFpbCBhZGRyZXNzIGFuZCB3ZSdsbCBzZW5kIHlvdSBhbiBlbWFpbCB3aXRoIGluc3RydWN0aW9ucyB0byByZXNldCB5b3VyIHBhc3N3b3JkLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiZm9ybS5mb3JtLWhvcml6b250YWxcIiwge1xuICAgICAgICAgICAgICAgICAgb25zdWJtaXQ6IChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIFJlY292ZXJQYXNzd29yZERhdGEuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdlbWFpbGFkZHJlc3MnXVwiLCBcIkVtYWlsIGFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0nZW1haWxhZGRyZXNzJ11bcGxhY2Vob2xkZXI9J2UuZy4gam9zZUByaXphbC5jb20nXVtyZXF1aXJlZF1bdHlwZT0nZW1haWwnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBtLndpdGhBdHRyKFwidmFsdWVcIiwgKHY6IHN0cmluZykgPT4geyBSZWNvdmVyUGFzc3dvcmREYXRhLmVtYWlsID0gdiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBSZWNvdmVyUGFzc3dvcmREYXRhLmVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93LnRleHQtY2VudGVyLm0tdC0xMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJidXR0b24uYnRuLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodFt0eXBlPSdzdWJtaXQnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIVJlY292ZXJQYXNzd29yZERhdGEuY2FuU2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgfSwgXCJSZXNldCBQYXNzd29yZFwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcIi5yb3cubS10LTUwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS0xMi50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIkJhY2sgdG8gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrLm0tbC01W2hyZWY9Jy8jIS9sb2dpbiddXCIsIG0oXCJiXCIsIFwiU2lnbiBJblwiKSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcbmltcG9ydCB7IEFwcFNldHRpbmdzIH0gZnJvbSBcImNvbmZpZ3NcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmNvbnN0IFJlZ2lzdGVyQWNjb3VudERhdGEgPSB7XG4gIHVzZXJuYW1lOiBcIlwiLFxuICBlbWFpbDogXCJcIixcbiAgcGFzc3dvcmQ6IFwiXCIsXG5cbiAgY2FuU2F2ZSgpIHtcbiAgICByZXR1cm4gUmVnaXN0ZXJBY2NvdW50RGF0YS51c2VybmFtZSAhPT0gXCJcIiAmJlxuICAgICAgUmVnaXN0ZXJBY2NvdW50RGF0YS5lbWFpbCAhPT0gXCJcIiAmJlxuICAgICAgUmVnaXN0ZXJBY2NvdW50RGF0YS5wYXNzd29yZCAhPT0gXCJcIjtcbiAgfSxcbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBhY2NvdW50ID0ge1xuICAgICAgdXNlcjoge1xuICAgICAgICB1c2VybmFtZTogUmVnaXN0ZXJBY2NvdW50RGF0YS51c2VybmFtZSxcbiAgICAgICAgZW1haWw6IFJlZ2lzdGVyQWNjb3VudERhdGEuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBSZWdpc3RlckFjY291bnREYXRhLnBhc3N3b3JkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoKEFwcFNldHRpbmdzLkFQSV9CQVNFX1VSTCArIFwiL2FwaS9zZXNzaW9uL3JlZ2lzdGVyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShhY2NvdW50KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJlcnJvclwiLCBlcnIpKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgbS5yb3V0ZS5zZXQoXCIvbG9naW5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3JcIiwgcmVzLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZC1pbWFnZVwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PSdsb2dvJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImZvcm0uZm9ybS1ob3Jpem9udGFsW21ldGhvZD0ncG9zdCddXCIsIHtcbiAgICAgICAgICAgICAgICAgIG9uc3VibWl0OiAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBSZWdpc3RlckFjY291bnREYXRhLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ndXNlcm5hbWUnXVwiLCBcIlVzZXJuYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3VzZXJuYW1lJ11bcGxhY2Vob2xkZXI9J2UuZy4ganJpemFsJ11bcmVxdWlyZWRdW3R5cGU9J3RleHQnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBtLndpdGhBdHRyKFwidmFsdWVcIiwgKHY6IHN0cmluZykgPT4geyBSZWdpc3RlckFjY291bnREYXRhLnVzZXJuYW1lID0gdiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBSZWdpc3RlckFjY291bnREYXRhLnVzZXJuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWwnXVwiLCBcIkVtYWlsIGFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0nZW1haWwnXVtwbGFjZWhvbGRlcj0nZS5nLiBqb3NlQHJpemFsLmNvbSddW3JlcXVpcmVkXVt0eXBlPSdlbWFpbCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IG0ud2l0aEF0dHIoXCJ2YWx1ZVwiLCAodjogc3RyaW5nKSA9PiB7IFJlZ2lzdGVyQWNjb3VudERhdGEuZW1haWwgPSB2IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFJlZ2lzdGVyQWNjb3VudERhdGEuZW1haWxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdwYXNzd29yZCddXCIsIFwiUGFzc3dvcmRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0ncGFzc3dvcmQnXVtwbGFjZWhvbGRlcj0nRW50ZXIgeW91ciBwYXNzd29yZCddW3JlcXVpcmVkXVt0eXBlPSdwYXNzd29yZCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IG0ud2l0aEF0dHIoXCJ2YWx1ZVwiLCAodjogc3RyaW5nKSA9PiB7IFJlZ2lzdGVyQWNjb3VudERhdGEucGFzc3dvcmQgPSB2IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFJlZ2lzdGVyQWNjb3VudERhdGEucGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcIi5jaGVja2JveC5jaGVja2JveC1jdXN0b21cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0W2NoZWNrZWRdW2lkPSdyZW1lbWJlciddW3R5cGU9J2NoZWNrYm94J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdyZW1lbWJlciddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJIGFjY2VwdCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1jdXN0b21baHJlZj0nLyMhL3Rlcm1zLWFuZC1jb25kaXRpb25zJ11cIiwgXCJUZXJtcyBhbmQgQ29uZGl0aW9uc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy50ZXh0LWNlbnRlci5tLXQtMTBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFSZWdpc3RlckFjY291bnREYXRhLmNhblNhdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIH0sIFwiU2lnbiBVcCBGcmVlXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtKFwiLnJvdy5tLXQtNTBcIixcbiAgICAgICAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIFwiQWxyZWFkeSBoYXZlIGFuIGFjY291bnQ/IFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tLWwtNVtocmVmPScvIyEvbG9naW4nXVwiLCBtKFwiYlwiLCBcIlNpZ24gSW5cIikpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0ZnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImgxLnRleHQtZXJyb3JcIiwgXCI1MDBcIiksXG4gICAgICAgICAgICAgICAgICBtKFwiaDQudGV4dC11cHBlcmNhc2UudGV4dC1kYW5nZXIubXQtM1wiLCBcIkludGVybmFsIFNlcnZlciBFcnJvclwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQubXQtM1wiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiV2h5IG5vdCB0cnkgcmVmcmVzaGluZyB5b3VyIHBhZ2U/IG9yIHlvdSBjYW4gY29udGFjdFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmtbaHJlZj0nLyMhL3N1cHBvcnQnXVwiLCBtKFwiYlwiLCBcIlN1cHBvcnRcIikpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0Lm10LTNbaHJlZj0nLyMhLyddXCIsIFwiUmV0dXJuIEhvbWVcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJleHBvcnQgY2xhc3MgQXBwU2V0dGluZ3Mge1xuICBwdWJsaWMgc3RhdGljIEFQSV9CQVNFX1VSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG59XG4iLCJpbXBvcnQgbSBmcm9tIFwibWl0aHJpbFwiO1xuaW1wb3J0IFJhdmVuIGZyb20gXCJyYXZlbi1qc1wiO1xuXG5pbXBvcnQgaG9tZSBmcm9tIFwiY29tcG9uZW50cy9ob21lXCI7XG5pbXBvcnQgcmVnaXN0ZXIgZnJvbSBcImNvbXBvbmVudHMvcmVnaXN0ZXJcIjtcbmltcG9ydCBsb2dpbiBmcm9tIFwiY29tcG9uZW50cy9sb2dpblwiO1xuaW1wb3J0IGxvZ291dCBmcm9tIFwiY29tcG9uZW50cy9sb2dvdXRcIjtcbmltcG9ydCBsb2NrU2NyZWVuIGZyb20gXCJjb21wb25lbnRzL2xvY2tfc2NyZWVuXCI7XG5pbXBvcnQgY29uZmlybU1haWwgZnJvbSBcImNvbXBvbmVudHMvY29uZmlybV9tYWlsXCI7XG5pbXBvcnQgcmVjb3ZlclBhc3N3b3JkIGZyb20gXCJjb21wb25lbnRzL3JlY292ZXJfcGFzc3dvcmRcIjtcblxuaW1wb3J0IGFkbWluRGFzaGJvYXJkIGZyb20gXCJjb21wb25lbnRzL2FkbWluL2Rhc2hib2FyZFwiO1xuXG5pbXBvcnQgbm90Rm91bmQgZnJvbSBcImNvbXBvbmVudHMvbm90X2ZvdW5kXCI7XG5pbXBvcnQgbm90Rm91bmRBbHQgZnJvbSBcImNvbXBvbmVudHMvbm90X2ZvdW5kX2FsdFwiO1xuaW1wb3J0IHNlcnZlckVycm9yIGZyb20gXCJjb21wb25lbnRzL3NlcnZlcl9lcnJvclwiO1xuXG5pbXBvcnQgeyBBdXRoIH0gZnJvbSBcIi4vYXV0aFwiO1xuXG5mdW5jdGlvbiBTbWFydEZ1bmRpbmdSb3V0ZXIoKSB7XG4gIGRvY3VtZW50LmJvZHkuaWQgPSBcInNmXCI7XG4gIG0ucm91dGUoZG9jdW1lbnQuYm9keSwgXCIvXCIsIHtcbiAgICBcIi9cIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgICBlbHNlIHJldHVybiBob21lO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvYWRtaW4vZGFzaGJvYXJkXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSBtLnJvdXRlLnNldChcIi9sb2dpblwiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gYWRtaW5EYXNoYm9hcmQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9yZWdpc3RlclwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIHJlZ2lzdGVyO1xuICAgICAgICBlbHNlIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL2xvZ2luXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gbG9naW47XG4gICAgICAgIGVsc2UgbS5yb3V0ZS5zZXQoXCIvXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvbG9nb3V0XCI6IGxvZ291dCxcbiAgICBcIi9sb2NrLXNjcmVlblwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIGxvY2tTY3JlZW47XG4gICAgICAgIGVsc2UgbS5yb3V0ZS5zZXQoXCIvXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvY29uZmlybS1tYWlsXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gY29uZmlybU1haWw7XG4gICAgICAgIGVsc2UgbS5yb3V0ZS5zZXQoXCIvXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvcmVjb3Zlci1wYXNzd29yZFwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIHJlY292ZXJQYXNzd29yZDtcbiAgICAgICAgZWxzZSBtLnJvdXRlLnNldChcIi9cIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9zZXJ2ZXItZXJyb3JcIjogc2VydmVyRXJyb3IsXG4gICAgXCIvbm90LWZvdW5kLWFsdFwiOiBub3RGb3VuZEFsdCxcbiAgICBcIi86YW55Li4uXCI6IG5vdEZvdW5kXG4gIH0pO1xufVxuXG5SYXZlbi5jb25maWcoXCJodHRwczovLzA2ODg5NjI3YjkyYTQ5MTg5OTgzZTVkYzhkYTgzZDRmQHNlbnRyeS5pby8xMjI3ODY2XCIpLmluc3RhbGwoKVxuUmF2ZW4uY29udGV4dChmdW5jdGlvbigpIHtcbiAgU21hcnRGdW5kaW5nUm91dGVyKCk7XG59KTtcbiIsImltcG9ydCBtIGZyb20gXCJtaXRocmlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZSkge1xuICAgIHJldHVybiBtKFwiZm9vdGVyLmZvb3RlclwiLFxuICAgICAgbShcIi5jb250YWluZXJcIixcbiAgICAgICAgbShcIi5yb3dcIiwgbShcIi5jb2wtMTIudGV4dC1jZW50ZXJcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIClcbiAgICApO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuaW1wb3J0IGF2YXRhciBmcm9tIFwiaW1hZ2VzL3VzZXJzL2F2YXRhci0xLmpwZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9uaW5pdCgpIHtcbiAgICAkKCcubmF2YmFyLXRvZ2dsZScpXG4gICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAkKCcjbmF2aWdhdGlvbicpLnNsaWRlVG9nZ2xlKDQwMCk7XG4gICAgfSk7XG5cbiAgICAkKCcubmF2aWdhdGlvbi1tZW51PmxpJykuc2xpY2UoLTIpLmFkZENsYXNzKCdsYXN0LWVsZW1lbnRzJyk7XG5cbiAgICAkKCcubmF2aWdhdGlvbi1tZW51IGxpLmhhcy1zdWJtZW51IGFbaHJlZj1cImphdmFzY3JpcHQ6O1wiXScpXG4gICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XG4gICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkhIDwgOTkyKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAgIC5maW5kKCcuc3VibWVudTpmaXJzdCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHZpZXcodm5vZGUpIHtcbiAgICByZXR1cm4gbShcImhlYWRlcltpZD0ndG9wbmF2J11cIiwgW1xuICAgICAgbShcIi50b3BiYXItbWFpblwiLFxuICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLCBbXG4gICAgICAgICAgICBtKFwiLmxvZ29cIixcbiAgICAgICAgICAgICAgbShcImEubG9nb1tocmVmPScvIyEvJ11cIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJpbWcubG9nby1zbWFsbFthbHQ9JyddW2hlaWdodD0nMjYnXVtzcmM9J2Fzc2V0cy9pbWFnZXMvbG9nb19zbS5wbmcnXVwiKSxcbiAgICAgICAgICAgICAgICBtKFwiaW1nLmxvZ28tbGFyZ2VbYWx0PScnXVtoZWlnaHQ9JzIyJ11cIiwgeyBzcmM6IGxvZ28gfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtKFwiLm1lbnUtZXh0cmFzLnRvcGJhci1jdXN0b21cIixcbiAgICAgICAgICAgICAgbShcInVsLmxpc3QtdW5zdHlsZWQudG9wYmFyLXJpZ2h0LW1lbnUuZmxvYXQtcmlnaHQubWItMFwiLCBbXG4gICAgICAgICAgICAgICAgbShcImxpLm1lbnUtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgbShcImEubmF2YmFyLXRvZ2dsZS5uYXYtbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmxpbmVzXCIsIFsgbShcInNwYW5cIiksIG0oXCJzcGFuXCIpLCBtKFwic3BhblwiKSBdKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImxpLmRyb3Bkb3duLm5vdGlmaWNhdGlvbi1saXN0XCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZS5hcnJvdy1ub25lLndhdmVzLWVmZmVjdFthcmlhLWV4cGFuZGVkPSdmYWxzZSddW2FyaWEtaGFzcG9wdXA9J2ZhbHNlJ11bZGF0YS10b2dnbGU9J2Ryb3Bkb3duJ11baHJlZj0namF2YXNjcmlwdDo7J11bcm9sZT0nYnV0dG9uJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1iZWxsLm5vdGktaWNvblwiKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcIi5kcm9wZG93bi1tZW51LmRyb3Bkb3duLW1lbnUtcmlnaHQuZHJvcGRvd24tbGdcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLWl0ZW0ubm90aS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJoNi5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW4uZmxvYXQtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrW2hyZWY9JyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNtYWxsXCIsIFwiQ2xlYXIgQWxsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk5vdGlmaWNhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcIi5zbGltc2Nyb2xsXCIsIHsgc3R5bGU6IHsgXCJtYXgtaGVpZ2h0XCI6IFwiMjMwcHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6OyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb24uYmctc3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNvbW1lbnQtYWNjb3VudC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubm90aWZ5LWRldGFpbHNcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNhbGViIEZsYWtlbGFyIGNvbW1lbnRlZCBvbiBBZG1pblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGwudGV4dC1tdXRlZFwiLCBcIjEgbWluIGFnb1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS50ZXh0LWNlbnRlci50ZXh0LXByaW1hcnkubm90aWZ5LWl0ZW0ubm90aWZ5LWFsbFtocmVmPSdqYXZhc2NyaXB0OjsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJWaWV3IGFsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWFycm93LXJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuXG4gICAgICAgICAgICAgICAgbShcImxpLmRyb3Bkb3duLm5vdGlmaWNhdGlvbi1saXN0XCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZS53YXZlcy1lZmZlY3QubmF2LXVzZXJbYXJpYS1leHBhbmRlZD0nZmFsc2UnXVthcmlhLWhhc3BvcHVwPSdmYWxzZSddW2RhdGEtdG9nZ2xlPSdkcm9wZG93biddW2hyZWY9J2phdmFzY3JpcHQ6OyddW3JvbGU9J2J1dHRvbiddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImltZy5yb3VuZGVkLWNpcmNsZVthbHQ9J3VzZXInXVwiLCB7IHNyYzogYXZhdGFyIH0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5tbC0xLnByby11c2VyLW5hbWVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIFwiVXNlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktY2hldnJvbi1kb3duXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZHJvcGRvd24tbWVudS5kcm9wZG93bi1tZW51LXJpZ2h0LnByb2ZpbGUtZHJvcGRvd24uXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcIi5kcm9wZG93bi1pdGVtLm5vdGktdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaDYudGV4dC1vdmVyZmxvdy5tLTBcIiwgXCJXZWxjb21lICFcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWhlYWRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJNeSBBY2NvdW50XCIpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktY29nXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiU2V0dGluZ3NcIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1oZWxwXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiU3VwcG9ydFwiKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWxvY2tcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJMb2NrIFNjcmVlblwiKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLXBvd2VyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiTG9nb3V0XCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbShcIi5jbGVhcmZpeFwiKVxuICAgICAgICAgIF0pXG4gICAgICApLFxuICAgICAgbShcIi5uYXZiYXItY3VzdG9tXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsXG4gICAgICAgICAgbShcIltpZD0nbmF2aWdhdGlvbiddXCIsXG4gICAgICAgICAgICBtKFwidWwubmF2aWdhdGlvbi1tZW51XCIsIFtcbiAgICAgICAgICAgICAgbShcImxpLmhhcy1zdWJtZW51XCIsXG4gICAgICAgICAgICAgICAgbShcImFbaHJlZj0nLyMhLyddXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJpLmljb24tc3BlZWRvbWV0ZXJcIiksXG4gICAgICAgICAgICAgICAgICBcIkRhc2hib2FyZFwiXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgXSlcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=