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

/***/ "./images/users/avatar-2.jpg":
/*!***********************************!*\
  !*** ./images/users/avatar-2.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "images/avatar-2.jpg";

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
var ConfirmMailData = {
    getVerifyEmail: function () {
        var email = sessionStorage.getItem("verify_email");
        return email;
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
                            "A email has been send to ",
                            mithril_1.default("b", ConfirmMailData.getVerifyEmail()),
                            ". Please check for an email from SmartFunding and click on the included link to verify your account."
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
var avatar_2_jpg_1 = __importDefault(__webpack_require__(/*! images/users/avatar-2.jpg */ "./images/users/avatar-2.jpg"));
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
                                mithril_1.default("td", mithril_1.default("img.rounded-circle.thumb-sm[alt='img'][title='contact-img']", {
                                    src: avatar_2_jpg_1.default
                                })),
                                mithril_1.default("td", [
                                    mithril_1.default("h5.m-0.font-weight-normal", "#000000"),
                                    mithril_1.default("p.mb-0.text-muted", mithril_1.default("small", "January 01, 1970"))
                                ]),
                                mithril_1.default("td", [
                                    mithril_1.default("i.mdi.mdi-currency-btc.text-primary"),
                                    "BTC"
                                ]),
                                mithril_1.default("td", "0.00000000 BTC"),
                                mithril_1.default("td", "0.00000000 BTC"),
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
                sessionStorage.setItem("verify_email", RegisterAccountData.email);
                mithril_1.default.route.set("/confirm-mail");
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

/***/ "./src/components/upload_document.ts":
/*!*******************************************!*\
  !*** ./src/components/upload_document.ts ***!
  \*******************************************/
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
var avatar_2_jpg_1 = __importDefault(__webpack_require__(/*! images/users/avatar-2.jpg */ "./images/users/avatar-2.jpg"));
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
                                mithril_1.default("td", mithril_1.default("img.rounded-circle.thumb-sm[alt='img'][title='contact-img']", {
                                    src: avatar_2_jpg_1.default
                                })),
                                mithril_1.default("td", [
                                    mithril_1.default("h5.m-0.font-weight-normal", "#000000"),
                                    mithril_1.default("p.mb-0.text-muted", mithril_1.default("small", "January 01, 1970"))
                                ]),
                                mithril_1.default("td", [
                                    mithril_1.default("i.mdi.mdi-currency-btc.text-primary"),
                                    "BTC"
                                ]),
                                mithril_1.default("td", "0.00000000 BTC"),
                                mithril_1.default("td", "0.00000000 BTC"),
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

/***/ "./src/configs/index.ts":
/*!******************************!*\
  !*** ./src/configs/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = /** @class */ (function () {
    function AppSettings() {
    }
    AppSettings.API_BASE_URL = process.env.SF_API_BASE_URL || "https://api.smartfunding.io";
    return AppSettings;
}());
exports.AppSettings = AppSettings;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

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
var register_1 = __importDefault(__webpack_require__(/*! components/register */ "./src/components/register.ts"));
var login_1 = __importDefault(__webpack_require__(/*! components/login */ "./src/components/login.ts"));
var logout_1 = __importDefault(__webpack_require__(/*! components/logout */ "./src/components/logout.ts"));
var lock_screen_1 = __importDefault(__webpack_require__(/*! components/lock_screen */ "./src/components/lock_screen.ts"));
var confirm_mail_1 = __importDefault(__webpack_require__(/*! components/confirm_mail */ "./src/components/confirm_mail.ts"));
var recover_password_1 = __importDefault(__webpack_require__(/*! components/recover_password */ "./src/components/recover_password.ts"));
var home_1 = __importDefault(__webpack_require__(/*! components/home */ "./src/components/home.ts"));
var upload_document_1 = __importDefault(__webpack_require__(/*! components/upload_document */ "./src/components/upload_document.ts"));
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
        "/upload-document": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/login");
                else
                    return upload_document_1.default;
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
var HeaderData = {
    getEmail: function () {
        var email = localStorage.getItem("email");
        return email;
    }
};
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
                                HeaderData.getEmail(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL2JnLTEuanBnIiwid2VicGFjazovLy8uL2ltYWdlcy9iZy0yLmpwZyIsIndlYnBhY2s6Ly8vLi9pbWFnZXMvc2YtbG9nby5wbmciLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL3VzZXJzL2F2YXRhci0xLmpwZyIsIndlYnBhY2s6Ly8vLi9pbWFnZXMvdXNlcnMvYXZhdGFyLTIuanBnIiwid2VicGFjazovLy8uL3NyYy9hdXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FkbWluL2Rhc2hib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb25maXJtX21haWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaG9tZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sb2NrX3NjcmVlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sb2dpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sb2dvdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbm90X2ZvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25vdF9mb3VuZF9hbHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVjb3Zlcl9wYXNzd29yZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zZXJ2ZXJfZXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdXBsb2FkX2RvY3VtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb25maWdzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0cy9mb290ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldHMvaGVhZGVyLnRzIiwid2VicGFjazovLy8uL3N0eWxlcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvaWNvbnMuc2Nzcz8wOWEzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FB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QVcsQ0FBQzthQUNmLENBQUMsQ0FDTDtZQUNELGlCQUFDLENBQUMsZ0JBQWdCLEVBQ2hCLGlCQUFDLENBQUMsa0JBQWtCLEVBQ2xCLGlCQUFDLENBQUMsbUJBQW1CLEVBQ25CLGlCQUFDLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3RCLGlCQUFDLENBQUMsZ0JBQWdCLEVBQ2hCLGlCQUFDLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ2xCLGlCQUFDLENBQUMsb0JBQW9CLENBQUM7b0JBQ3ZCLFdBQVc7aUJBQ1osQ0FBQyxDQUNIO2FBQ0YsQ0FBQyxDQUNILENBQ0YsQ0FDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ2EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3hJakIsdUM7Ozs7Ozs7Ozs7O0FDQUEsdUMiLCJmaWxlIjoic2VzYW1lLjg1Y2E1YTUwYzcwOGExYWFjOThkLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwic2VzYW1lXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcImltYWdlcy9iZy0xLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJpbWFnZXMvYmctMi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcImltYWdlcy9hdmF0YXItMS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiaW1hZ2VzL2F2YXRhci0yLmpwZ1wiOyIsImV4cG9ydCBjbGFzcyBBdXRoIHtcbiAgcHVibGljIHN0YXRpYyBjaGVja1Rva2VuTm9uZSgpIHtcbiAgICBsZXQgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xuICAgIHJldHVybiB0b2tlbiA9PSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBoZWFkZXIgZnJvbSBcIndpZGdldHMvaGVhZGVyXCI7XG5pbXBvcnQgZm9vdGVyIGZyb20gXCJ3aWRnZXRzL2Zvb3RlclwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKGhlYWRlciksXG4gICAgICBtKFwiLndyYXBwZXJcIixcbiAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIixcblxuICAgICAgICAgIG0oXCIucm93XCIsXG4gICAgICAgICAgICBtKFwiLmNvbC1zbS0xMlwiLFxuICAgICAgICAgICAgICBtKFwiLnBhZ2UtdGl0bGUtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLmJ0bi1ncm91cC5wdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICBtKFwib2wuYnJlYWRjcnVtYi5oaWRlLXBob25lLnAtMC5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwibGkuYnJlYWRjcnVtYi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nLyMhLyddXCIsIFwiU21hcnRGdW5kaW5nXCIpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW0uYWN0aXZlXCIsIFwiRGFzaGJvYXJkXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImg0LnBhZ2UtdGl0bGVcIiwgXCJEYXNoYm9hcmRcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuXG4gICAgICAgICAgbShcIi5yb3dcIiwgW1xuICAgICAgICAgICAgbShcIi5jb2wtbGctOFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDQuaGVhZGVyLXRpdGxlLm1iLTNcIiwgXCJXYWxsZXQgQmFsYW5jZXNcIiksXG4gICAgICAgICAgICAgICAgbShcIi50YWJsZS1yZXNwb25zaXZlXCIsXG4gICAgICAgICAgICAgICAgICBtKFwidGFibGUudGFibGUudGFibGUtaG92ZXIudGFibGUtY2VudGVyZWQubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInRoZWFkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIlByb2ZpbGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJCYWxhbmNlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiUmVzZXJ2ZWQgaW4gb3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcInRib2R5XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcucm91bmRlZC1jaXJjbGUudGh1bWItc21bYWx0PSdjb250YWN0LWltZyddW3NyYz0nYXNzZXRzL2ltYWdlcy91c2Vycy9hdmF0YXItMi5qcGcnXVt0aXRsZT0nY29udGFjdC1pbWcnXVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJoNS5tLTAuZm9udC13ZWlnaHQtbm9ybWFsXCIsIFwiVG9tYXNsYXVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLm1iLTAudGV4dC1tdXRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzbWFsbFwiLCBcIk1lbWJlciBTaW5jZSAyMDE3XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImkubWRpLm1kaS1jdXJyZW5jeS1idGMudGV4dC1wcmltYXJ5XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkJUQ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBcIjAuMDA4MTYxMTcgQlRDXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiMC4wMDA5NzAzNiBCVENcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLXNtLmJ0bi1jdXN0b21baHJlZj0nIyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImkubWRpLm1kaS1wbHVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tc20uYnRuLWRhbmdlcltocmVmPScjJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLW1pbnVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtKFwiLmNvbC1sZy00XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoNC5tLXQtMC5oZWFkZXItdGl0bGVcIiwgXCJUb3RhbCBXYWxsZXQgQmFsYW5jZVwiKSxcbiAgICAgICAgICAgICAgICBtKFwiW2lkPSdkb251dC1jaGFydCddXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmZsb3QtY2hhcnQubXQtNVtpZD0nZG9udXQtY2hhcnQtY29udGFpbmVyJ11cIiwgeyBzdHlsZTogeyBcImhlaWdodFwiOiBcIjM0MHB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgbShmb290ZXIpXG4gICAgXSk7XG4gIH1cbn1cbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmNvbnN0IENvbmZpcm1NYWlsRGF0YSA9IHtcbiAgZ2V0VmVyaWZ5RW1haWwoKSB7XG4gICAgbGV0IGVtYWlsID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInZlcmlmeV9lbWFpbFwiKTtcbiAgICByZXR1cm4gZW1haWw7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmRcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8jIS8nXVwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi5hY2NvdW50LWNvbnRlbnQudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcInN2Z1t2ZXJzaW9uPScxLjEnXVt2aWV3Qm94PScwIDAgOTggOTgnXVt4PScwcHgnXVt4bWw6c3BhY2U9J3ByZXNlcnZlJ11beG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ11beG1sbnM6Z3JhcGg9JyZuc19ncmFwaHM7J11beG1sbnM6aT0nJm5zX2FpOyddW3htbG5zOng9JyZuc19leHRlbmQ7J11beG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXVt5PScwcHgnXVwiLCB7IHN0eWxlOiB7IFwiaGVpZ2h0XCI6IFwiMTIwcHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInN0eWxlW3R5cGU9J3RleHQvY3NzJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICBcIi5zdDB7ZmlsbDojRkZGRkZGO31cXFxuICAgICAgICAgICAgICAgICAgICAgICAuc3Qxe2ZpbGw6IzAyYThiNTt9XFxcbiAgICAgICAgICAgICAgICAgICAgICAgLnN0MntmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMmE4YjU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxcXG4gICAgICAgICAgICAgICAgICAgICAgIC5zdDN7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwiZ1tpOmV4dHJhbmVvdXM9J3NlbGYnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImNpcmNsZS5zdDBbY3g9JzQ5J11bY3k9JzQ5J11baWQ9J1hNTElEXzUwXyddW3I9JzQ5J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImdbaWQ9J1hNTElEXzRfJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J003Ny4zLDQyLjdWNzdjMCwwLjYtMC40LDEtMSwxSDIxLjdjLTAuNSwwLTEtMC41LTEtMVY0Mi43YzAtMC4zLDAuMS0wLjYsMC40LTAuOGwyNy4zLTIxLjcgYzAuMy0wLjMsMC44LTAuMywxLjIsMGwyNy4zLDIxLjdDNzcuMSw0Mi4xLDc3LjMsNDIuNCw3Ny4zLDQyLjd6J11baWQ9J1hNTElEXzQ5XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QyW2Q9J002Ni41LDY5LjVoLTM1Yy0xLjEsMC0yLTAuOS0yLTJWMjYuOGMwLTEuMSwwLjktMiwyLTJoMzVjMS4xLDAsMiwwLjksMiwydjQwLjcgQzY4LjUsNjguNiw2Ny42LDY5LjUsNjYuNSw2OS41eiddW2lkPSdYTUxJRF80OF8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNNjIuOSwzMy40SDQ3LjJjLTAuNSwwLTAuOS0wLjQtMC45LTAuOXYtMC4yYzAtMC41LDAuNC0wLjksMC45LTAuOWgxNS43IGMwLjUsMCwwLjksMC40LDAuOSwwLjl2MC4yQzYzLjgsMzMsNjMuNCwzMy40LDYyLjksMzMuNHonXVtpZD0nWE1MSURfNDdfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNDAuM0g0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDM5LjksNjMuNCw0MC4zLDYyLjksNDAuM3onXVtpZD0nWE1MSURfNDZfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNDcuMkg0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDQ2LjgsNjMuNCw0Ny4yLDYyLjksNDcuMnonXVtpZD0nWE1MSURfNDVfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNTQuMUg0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDUzLjcsNjMuNCw1NC4xLDYyLjksNTQuMXonXVtpZD0nWE1MSURfNDRfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDJbZD0nTTQxLjYsNDAuMWgtNS44Yy0wLjYsMC0xLTAuNC0xLTF2LTYuN2MwLTAuNiwwLjQtMSwxLTFoNS44YzAuNiwwLDEsMC40LDEsMXY2LjcgQzQyLjYsMzkuNyw0Mi4yLDQwLjEsNDEuNiw0MC4xeiddW2lkPSdYTUxJRF80M18nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MltkPSdNNDEuNiw1NC4yaC01LjhjLTAuNiwwLTEtMC40LTEtMXYtNi43YzAtMC42LDAuNC0xLDEtMWg1LjhjMC42LDAsMSwwLjQsMSwxdjYuNyBDNDIuNiw1My44LDQyLjIsNTQuMiw0MS42LDU0LjJ6J11baWQ9J1hNTElEXzQyXyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J00yMy40LDQ2LjJsMjUsMTcuOGMwLjMsMC4yLDAuNywwLjIsMS4xLDBsMjYuOC0xOS44bC0zLjMsMzAuOUgyNy43TDIzLjQsNDYuMnonXVtpZD0nWE1MSURfNDFfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDNbZD0nTTc0LjksNDUuMkw0OS41LDYzLjVjLTAuMywwLjItMC43LDAuMi0xLjEsMEwyMy4yLDQ1LjInXVtpZD0nWE1MSURfNDBfJ11cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTQubXQtMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiQSBlbWFpbCBoYXMgYmVlbiBzZW5kIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYlwiLCBDb25maXJtTWFpbERhdGEuZ2V0VmVyaWZ5RW1haWwoKSksXG4gICAgICAgICAgICAgICAgICAgIFwiLiBQbGVhc2UgY2hlY2sgZm9yIGFuIGVtYWlsIGZyb20gU21hcnRGdW5kaW5nIGFuZCBjbGljayBvbiB0aGUgaW5jbHVkZWQgbGluayB0byB2ZXJpZnkgeW91ciBhY2NvdW50LlwiXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0Lm10LTNbaHJlZj0nLyMhLyddXCIsIFwiQmFjayB0byBIb21lXCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmdcIikpXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgaGVhZGVyIGZyb20gXCJ3aWRnZXRzL2hlYWRlclwiO1xuaW1wb3J0IGZvb3RlciBmcm9tIFwid2lkZ2V0cy9mb290ZXJcIjtcblxuaW1wb3J0IFwianF1ZXJ5LXNsaW1zY3JvbGxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBhdmF0YXIgZnJvbSBcImltYWdlcy91c2Vycy9hdmF0YXItMi5qcGdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBvbmluaXQoKSB7XG4gICAgJChcIi5uYXZiYXItdG9nZ2xlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZTogRXZlbnQpIHtcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgJChcIiNuYXZpZ2F0aW9uXCIpLnNsaWRlVG9nZ2xlKDQwMCk7XG4gICAgfSk7XG5cbiAgICAkKFwiLm5hdmlnYXRpb24tbWVudT5saVwiKS5zbGljZSgtMikuYWRkQ2xhc3MoXCJsYXN0LWVsZW1lbnRzXCIpO1xuXG4gICAgJChcIi5uYXZpZ2F0aW9uLW1lbnUgbGkuaGFzLXN1Ym1lbnUgYVtocmVmPScjJ11cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlOiBFdmVudCkge1xuICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpISA8IDk5Mikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpLmZpbmQoXCIuc3VibWVudTpmaXJzdFwiKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiLnNsaW1zY3JvbGxcIikuc2xpbVNjcm9sbCh7XG4gICAgICBoZWlnaHQ6IFwiYXV0b1wiLFxuICAgICAgcG9zaXRpb246IFwicmlnaHRcIixcbiAgICAgIHNpemU6IFwiOHB4XCIsXG4gICAgICBjb2xvcjogXCIjOWVhNWFiXCJcbiAgICB9KTtcbiAgfSxcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oaGVhZGVyKSxcbiAgICAgIG0oXCIud3JhcHBlclwiLFxuICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLFxuXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyXCIsXG4gICAgICAgICAgICAgIG0oXCIucGFnZS10aXRsZS1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCIuYnRuLWdyb3VwLnB1bGwtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJvbC5icmVhZGNydW1iLmhpZGUtcGhvbmUucC0wLm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPScvIyEvJ11cIiwgXCJTbWFydEZ1bmRpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbS5hY3RpdmVcIiwgXCJEYXNoYm9hcmRcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucGFnZS10aXRsZVwiLCBcIkRhc2hib2FyZFwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG5cbiAgICAgICAgICBtKFwiLnJvd1wiLCBbXG4gICAgICAgICAgICBtKFwiLmNvbC1sZy04XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoNC5oZWFkZXItdGl0bGUubWItM1wiLCBcIldhbGxldCBCYWxhbmNlc1wiKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRhYmxlLXJlc3BvbnNpdmVcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJ0YWJsZS50YWJsZS50YWJsZS1ob3Zlci50YWJsZS1jZW50ZXJlZC5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwidGhlYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiUHJvZmlsZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIk5hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJDdXJyZW5jeVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIkJhbGFuY2VcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJSZXNlcnZlZCBpbiBvcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJBY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwidGJvZHlcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImltZy5yb3VuZGVkLWNpcmNsZS50aHVtYi1zbVthbHQ9J2ltZyddW3RpdGxlPSdjb250YWN0LWltZyddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGF2YXRhclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJoNS5tLTAuZm9udC13ZWlnaHQtbm9ybWFsXCIsIFwiIzAwMDAwMFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubWItMC50ZXh0LW11dGVkXCIsIG0oXCJzbWFsbFwiLCBcIkphbnVhcnkgMDEsIDE5NzBcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktY3VycmVuY3ktYnRjLnRleHQtcHJpbWFyeVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCVENcIlxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgXCIwLjAwMDAwMDAwIEJUQ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBcIjAuMDAwMDAwMDAgQlRDXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1zbS5idG4tY3VzdG9tW2hyZWY9JyMnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktcGx1c1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLXNtLmJ0bi1kYW5nZXJbaHJlZj0nIyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImkubWRpLm1kaS1taW51c1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbShcIi5jb2wtbGctNFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDQubS10LTAuaGVhZGVyLXRpdGxlXCIsIFwiVG90YWwgV2FsbGV0IEJhbGFuY2VcIiksXG4gICAgICAgICAgICAgICAgbShcIltpZD0nZG9udXQtY2hhcnQnXVwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5mbG90LWNoYXJ0Lm10LTVbaWQ9J2RvbnV0LWNoYXJ0LWNvbnRhaW5lciddXCIsIHsgc3R5bGU6IHsgXCJoZWlnaHRcIjogXCIzNDBweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIG0oZm9vdGVyKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIubWItM1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiaW1nLnJvdW5kZWQtY2lyY2xlLmltZy10aHVtYm5haWwudGh1bWItbGdbYWx0PSd0aHVtYm5haWwnXVtzcmM9J2Fzc2V0cy9pbWFnZXMvdXNlcnMvYXZhdGFyLTUuanBnJ11cIilcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm0tYi0wLmZvbnQtMTRcIiwgXCJFbnRlciB5b3VyIHBhc3N3b3JkIHRvIGFjY2VzcyB0aGUgYWRtaW4uXCIpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcImZvcm0uZm9ybS1ob3Jpem9udGFsW2FjdGlvbj0namF2YXNjcmlwdDo7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvd1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ncGFzc3dvcmQnXVwiLCBcIlBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3Bhc3N3b3JkJ11bcGxhY2Vob2xkZXI9J0VudGVyIHlvdXIgcGFzc3dvcmQnXVtyZXF1aXJlZF1bdHlwZT0ncGFzc3dvcmQnXVwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIiwgXCJMb2cgSW5cIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCIucm93Lm0tdC01MFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tMTIudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJOb3QgeW91PyByZXR1cm5cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubWwtMltocmVmPScvIyEvbG9naW4nXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImJcIiwgXCJTaWduIEluXCIpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmdcIikpXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuaW1wb3J0IHsgQXBwU2V0dGluZ3MgfSBmcm9tIFwiY29uZmlnc1wiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuY29uc3QgTG9naW5BY2NvdW50RGF0YSA9IHtcbiAgZW1haWw6IFwiXCIsXG4gIHBhc3N3b3JkOiBcIlwiLFxuXG4gIGNhblNhdmUoKSB7XG4gICAgcmV0dXJuIExvZ2luQWNjb3VudERhdGEuZW1haWwgIT09IFwiXCIgJiZcbiAgICAgIExvZ2luQWNjb3VudERhdGEucGFzc3dvcmQgIT09IFwiXCI7XG4gIH0sXG4gIHNhdmUoKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgZW1haWw6IExvZ2luQWNjb3VudERhdGEuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBMb2dpbkFjY291bnREYXRhLnBhc3N3b3JkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoKEFwcFNldHRpbmdzLkFQSV9CQVNFX1VSTCArIFwiL2FwaS9zZXNzaW9uL2xvZ2luXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShhY2NvdW50KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJlcnJvclwiLCBlcnIpKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2Nlc3MgJiYgcmVzLnVzZXIudG9rZW4pIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlbWFpbFwiLCByZXMudXNlci5lbWFpbCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgcmVzLnVzZXIudG9rZW4pO1xuICAgICAgICBtLnJvdXRlLnNldChcIi9cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3JcIiwgcmVzLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJmb3JtW21ldGhvZD0ncG9zdCddXCIsIHtcbiAgICAgICAgICAgICAgICAgIG9uc3VibWl0OiAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBMb2dpbkFjY291bnREYXRhLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAubS1iLTIwLnJvd1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWxhZGRyZXNzJ11cIiwgXCJFbWFpbCBhZGRyZXNzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J2VtYWlsYWRkcmVzcyddW3BsYWNlaG9sZGVyPSdFbnRlciB5b3VyIGVtYWlsJ11bcmVxdWlyZWQ9JyddW3R5cGU9J2VtYWlsJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgTG9naW5BY2NvdW50RGF0YS5lbWFpbCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTG9naW5BY2NvdW50RGF0YS5lbWFpbFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtbXV0ZWQucHVsbC1yaWdodFtocmVmPScvIyEvcmVjb3Zlci1wYXNzd29yZCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGxcIiwgXCJGb3Jnb3QgeW91ciBwYXNzd29yZD9cIilcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJsYWJlbFtmb3I9J3Bhc3N3b3JkJ11cIiwgXCJQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXQuZm9ybS1jb250cm9sW2lkPSdwYXNzd29yZCddW3BsYWNlaG9sZGVyPSdFbnRlciB5b3VyIHBhc3N3b3JkJ11bcmVxdWlyZWQ9JyddW3R5cGU9J3Bhc3N3b3JkJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgTG9naW5BY2NvdW50RGF0YS5wYXNzd29yZCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTG9naW5BY2NvdW50RGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiLmNoZWNrYm94LmNoZWNrYm94LWN1c3RvbVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXRbY2hlY2tlZD0nJ11baWQ9J3JlbWVtYmVyJ11bdHlwZT0nY2hlY2tib3gnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsYWJlbFtmb3I9J3JlbWVtYmVyJ11cIiwgXCJSZW1lbWJlciBtZVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93LnRleHQtY2VudGVyLm0tdC0xMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJidXR0b24uYnRuLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodFt0eXBlPSdzdWJtaXQnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIUxvZ2luQWNjb3VudERhdGEuY2FuU2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgfSwgXCJTaWduIEluXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtKFwiLnJvdy5tLXQtNTBcIixcbiAgICAgICAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIFwiRG9uJ3QgaGF2ZSBhbiBhY2NvdW50PyBcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubS1sLTVbaHJlZj0nLyMhL3JlZ2lzdGVyJ11cIiwgbShcImJcIiwgXCJTaWduIFVwXCIpKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmdcIikpXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBvbmluaXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJlbWFpbFwiKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICB9LFxuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyLm0tYi0yMFwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNoZWNrbWFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzdmdbZW5hYmxlLWJhY2tncm91bmQ9J25ldyAwIDAgMTYxLjIgMTYxLjInXVtpZD0nTGF5ZXJfMSddW3ZlcnNpb249JzEuMSddW3ZpZXdCb3g9JzAgMCAxNjEuMiAxNjEuMiddW3g9JzBweCddW3htbDpzcGFjZT0ncHJlc2VydmUnXVt4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXVt4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayddW3k9JzBweCddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnBhdGhbZD0nTTQyNS45LDUyLjFMNDI1LjksNTIuMWMtMi4yLTIuNi02LTIuNi04LjMtMC4xbC00Mi43LDQ2LjJsLTE0LjMtMTYuNCBjLTIuMy0yLjctNi4yLTIuNy04LjYtMC4xYy0xLjksMi4xLTIsNS42LTAuMSw3LjdsMTcuNiwyMC4zYzAuMiwwLjMsMC40LDAuNiwwLjYsMC45YzEuOCwyLDQuNCwyLjUsNi42LDEuNGMwLjctMC4zLDEuNC0wLjgsMi0xLjUgYzAuMy0wLjMsMC41LTAuNiwwLjctMC45bDQ2LjMtNTAuMUM0MjcuNyw1Ny41LDQyNy43LDU0LjIsNDI1LjksNTIuMXonXVtmaWxsPSdub25lJ11bc3Ryb2tlPScjMzJjODYxJ11bc3Ryb2tlLW1pdGVybGltaXQ9JzEwJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiY2lyY2xlLnBhdGhbY3g9JzgwLjYnXVtjeT0nODAuNiddW2ZpbGw9J25vbmUnXVtyPSc2Mi4xJ11bc3Ryb2tlPScjMzJjODYxJ11bc3Ryb2tlLW1pdGVybGltaXQ9JzEwJ11bc3Ryb2tlLXdpZHRoPSc0J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicG9seWxpbmUucGF0aFtmaWxsPSdub25lJ11bcG9pbnRzPScxMTMsNTIuOCA3NC4xLDEwOC40IDQ4LjIsODYuNCAnXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtbGluZWNhcD0ncm91bmQnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVtzdHJva2Utd2lkdGg9JzYnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJjaXJjbGUuc3BpbltjeD0nODAuNiddW2N5PSc4MC42J11bZmlsbD0nbm9uZSddW3I9JzczLjknXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtZGFzaGFycmF5PScxMi4yMTc1LDEyLjIxNzUnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVtzdHJva2Utd2lkdGg9JzQnXVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiaDRcIiwgXCJTZWUgWW91IEFnYWluICFcIiksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTQubS10LTEwXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgXCJZb3UgYXJlIG5vdyBzdWNjZXNzZnVsbHkgc2lnbiBvdXQuIEJhY2sgdG8gXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tLXItNVtocmVmPScvIyEvJ11cIiwgbShcImJcIiwgXCJTaWduIEluXCIpKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0xLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImgxLnRleHQtZXJyb3JcIiwgXCI0MDRcIiksXG4gICAgICAgICAgICAgICAgICBtKFwiaDQudGV4dC11cHBlcmNhc2UudGV4dC1kYW5nZXIubXQtM1wiLCBcIlBhZ2UgTm90IEZvdW5kXCIpLFxuICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5tdC0zXCIsIFwiSXQncyBsb29raW5nIGxpa2UgeW91IG1heSBoYXZlIHRha2VuIGEgd3JvbmcgdHVybi4gRG9uJ3Qgd29ycnkuLi4gaXQgaGFwcGVucyB0byB0aGUgYmVzdCBvZiB1cy4gSGVyZSdzIGEgbGl0dGxlIHRpcCB0aGF0IG1pZ2h0IGhlbHAgeW91IGdldCBiYWNrIG9uIHRyYWNrLlwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0Lm10LTNbaHJlZj0nLyMhLyddXCIsIFwiUmV0dXJuIEhvbWVcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBoZWFkZXIgZnJvbSBcIndpZGdldHMvaGVhZGVyXCI7XG5pbXBvcnQgZm9vdGVyIGZyb20gXCJ3aWRnZXRzL2Zvb3RlclwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMS5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShoZWFkZXIpLFxuICAgICAgbShcIi53cmFwcGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsIFtcbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tMTJcIixcbiAgICAgICAgICAgICAgbShcIi5wYWdlLXRpdGxlLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5idG4tZ3JvdXAucHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgbShcIm9sLmJyZWFkY3J1bWIuaGlkZS1waG9uZS5wLTAubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8jIS8nXVwiLCBcIlNtYXJ0RnVuZGluZ1wiKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwibGkuYnJlYWRjcnVtYi1pdGVtLmFjdGl2ZVwiLCBcIlBhZ2UgTm90IEZvdW5kXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImg0LnBhZ2UtdGl0bGVcIiwgXCJQYWdlIE5vdCBGb3VuZFwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTYub2Zmc2V0LTNcIixcbiAgICAgICAgICAgICAgbShcIi50ZXh0LWNlbnRlci5tdC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDEudGV4dC1lcnJvclwiLCBcIjQwNFwiKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQudGV4dC11cHBlcmNhc2UudGV4dC1kYW5nZXIubXQtM1wiLCBcIlBhZ2UgTm90IEZvdW5kXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQubXQtM1wiLFxuICAgICAgICAgICAgICAgICAgXCJJdCdzIGxvb2tpbmcgbGlrZSB5b3UgbWF5IGhhdmUgdGFrZW4gYSB3cm9uZyB0dXJuLiBEb24ndCB3b3JyeS4uLiBpdFxcXG4gICAgICAgICAgICAgICAgICAgIGhhcHBlbnMgdG8gdGhlIGJlc3Qgb2YgdXMuIEhlcmUncyBhIGxpdHRsZSB0aXAgdGhhdCBtaWdodCBoZWxwIHlvdSBnZXQgYmFjayBvbiB0cmFjay5cIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1tZC5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodC5tdC0zW2hyZWY9Jy8jIS8nXVwiLCBcIlJldHVybiBIb21lXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIG0oZm9vdGVyKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuaW1wb3J0IHsgQXBwU2V0dGluZ3MgfSBmcm9tIFwiY29uZmlnc1wiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuY29uc3QgUmVjb3ZlclBhc3N3b3JkRGF0YSA9IHtcbiAgZW1haWw6IFwiXCIsXG5cbiAgY2FuU2F2ZSgpIHtcbiAgICByZXR1cm4gUmVjb3ZlclBhc3N3b3JkRGF0YS5lbWFpbCAhPT0gXCJcIjtcbiAgfSxcbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBhY2NvdW50ID0ge1xuICAgICAgdXNlcjoge1xuICAgICAgICBlbWFpbDogUmVjb3ZlclBhc3N3b3JkRGF0YS5lbWFpbCxcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZmV0Y2goQXBwU2V0dGluZ3MuQVBJX0JBU0VfVVJMICsgXCIvYXBpL3Nlc3Npb24vcmVjb3ZlclwiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYWNjb3VudCksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKFwiZXJyb3JcIiwgZXJyKSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyLm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5tLWItMFwiLFxuICAgICAgICAgICAgICAgICAgICBcIkVudGVyIHlvdXIgZW1haWwgYWRkcmVzcyBhbmQgd2UnbGwgc2VuZCB5b3UgYW4gZW1haWwgd2l0aCBpbnN0cnVjdGlvbnMgdG8gcmVzZXQgeW91ciBwYXNzd29yZC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImZvcm0uZm9ybS1ob3Jpem9udGFsXCIsIHtcbiAgICAgICAgICAgICAgICAgIG9uc3VibWl0OiAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBSZWNvdmVyUGFzc3dvcmREYXRhLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWxhZGRyZXNzJ11cIiwgXCJFbWFpbCBhZGRyZXNzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J2VtYWlsYWRkcmVzcyddW3BsYWNlaG9sZGVyPSdlLmcuIGpvc2VAcml6YWwuY29tJ11bcmVxdWlyZWRdW3R5cGU9J2VtYWlsJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgUmVjb3ZlclBhc3N3b3JkRGF0YS5lbWFpbCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUmVjb3ZlclBhc3N3b3JkRGF0YS5lbWFpbFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy50ZXh0LWNlbnRlci5tLXQtMTBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFSZWNvdmVyUGFzc3dvcmREYXRhLmNhblNhdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIH0sIFwiUmVzZXQgUGFzc3dvcmRcIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCIucm93Lm0tdC01MFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tMTIudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJCYWNrIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tLWwtNVtocmVmPScvIyEvbG9naW4nXVwiLCBtKFwiYlwiLCBcIlNpZ24gSW5cIikpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCJjb25maWdzXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5jb25zdCBSZWdpc3RlckFjY291bnREYXRhID0ge1xuICB1c2VybmFtZTogXCJcIixcbiAgZW1haWw6IFwiXCIsXG4gIHBhc3N3b3JkOiBcIlwiLFxuXG4gIGNhblNhdmUoKSB7XG4gICAgcmV0dXJuIFJlZ2lzdGVyQWNjb3VudERhdGEudXNlcm5hbWUgIT09IFwiXCIgJiZcbiAgICAgIFJlZ2lzdGVyQWNjb3VudERhdGEuZW1haWwgIT09IFwiXCIgJiZcbiAgICAgIFJlZ2lzdGVyQWNjb3VudERhdGEucGFzc3dvcmQgIT09IFwiXCI7XG4gIH0sXG4gIHNhdmUoKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgdXNlcm5hbWU6IFJlZ2lzdGVyQWNjb3VudERhdGEudXNlcm5hbWUsXG4gICAgICAgIGVtYWlsOiBSZWdpc3RlckFjY291bnREYXRhLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogUmVnaXN0ZXJBY2NvdW50RGF0YS5wYXNzd29yZFxuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaChBcHBTZXR0aW5ncy5BUElfQkFTRV9VUkwgKyBcIi9hcGkvc2Vzc2lvbi9yZWdpc3RlclwiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYWNjb3VudCksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKFwiZXJyb3JcIiwgZXJyKSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ2ZXJpZnlfZW1haWxcIiwgUmVnaXN0ZXJBY2NvdW50RGF0YS5lbWFpbCk7XG4gICAgICAgIG0ucm91dGUuc2V0KFwiL2NvbmZpcm0tbWFpbFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvclwiLCByZXMubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9J2xvZ28nXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiZm9ybS5mb3JtLWhvcml6b250YWxbbWV0aG9kPSdwb3N0J11cIiwge1xuICAgICAgICAgICAgICAgICAgb25zdWJtaXQ6IChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIFJlZ2lzdGVyQWNjb3VudERhdGEuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSd1c2VybmFtZSddXCIsIFwiVXNlcm5hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0ndXNlcm5hbWUnXVtwbGFjZWhvbGRlcj0nZS5nLiBqcml6YWwnXVtyZXF1aXJlZF1bdHlwZT0ndGV4dCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IG0ud2l0aEF0dHIoXCJ2YWx1ZVwiLCAodjogc3RyaW5nKSA9PiB7IFJlZ2lzdGVyQWNjb3VudERhdGEudXNlcm5hbWUgPSB2IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFJlZ2lzdGVyQWNjb3VudERhdGEudXNlcm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdlbWFpbCddXCIsIFwiRW1haWwgYWRkcmVzc1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXQuZm9ybS1jb250cm9sW2lkPSdlbWFpbCddW3BsYWNlaG9sZGVyPSdlLmcuIGpvc2VAcml6YWwuY29tJ11bcmVxdWlyZWRdW3R5cGU9J2VtYWlsJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgUmVnaXN0ZXJBY2NvdW50RGF0YS5lbWFpbCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUmVnaXN0ZXJBY2NvdW50RGF0YS5lbWFpbFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJsYWJlbFtmb3I9J3Bhc3N3b3JkJ11cIiwgXCJQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXQuZm9ybS1jb250cm9sW2lkPSdwYXNzd29yZCddW3BsYWNlaG9sZGVyPSdFbnRlciB5b3VyIHBhc3N3b3JkJ11bcmVxdWlyZWRdW3R5cGU9J3Bhc3N3b3JkJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgUmVnaXN0ZXJBY2NvdW50RGF0YS5wYXNzd29yZCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUmVnaXN0ZXJBY2NvdW50RGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiLmNoZWNrYm94LmNoZWNrYm94LWN1c3RvbVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXRbY2hlY2tlZF1baWQ9J3JlbWVtYmVyJ11bdHlwZT0nY2hlY2tib3gnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsYWJlbFtmb3I9J3JlbWVtYmVyJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkkgYWNjZXB0IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWN1c3RvbVtocmVmPScvIyEvdGVybXMtYW5kLWNvbmRpdGlvbnMnXVwiLCBcIlRlcm1zIGFuZCBDb25kaXRpb25zXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93LnRleHQtY2VudGVyLm0tdC0xMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJidXR0b24uYnRuLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodFt0eXBlPSdzdWJtaXQnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIVJlZ2lzdGVyQWNjb3VudERhdGEuY2FuU2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgfSwgXCJTaWduIFVwIEZyZWVcIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCIucm93Lm0tdC01MFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tMTIudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJBbHJlYWR5IGhhdmUgYW4gYWNjb3VudD8gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrLm0tbC01W2hyZWY9Jy8jIS9sb2dpbiddXCIsIG0oXCJiXCIsIFwiU2lnbiBJblwiKSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRmdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmRcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8jIS8nXVwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi50ZXh0LWNlbnRlclwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiaDEudGV4dC1lcnJvclwiLCBcIjUwMFwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJoNC50ZXh0LXVwcGVyY2FzZS50ZXh0LWRhbmdlci5tdC0zXCIsIFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIpLFxuICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5tdC0zXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgXCJXaHkgbm90IHRyeSByZWZyZXNoaW5nIHlvdXIgcGFnZT8gb3IgeW91IGNhbiBjb250YWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFya1tocmVmPScvIyEvc3VwcG9ydCddXCIsIG0oXCJiXCIsIFwiU3VwcG9ydFwiKSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1tZC5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubXQtM1tocmVmPScvIyEvJ11cIiwgXCJSZXR1cm4gSG9tZVwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IGhlYWRlciBmcm9tIFwid2lkZ2V0cy9oZWFkZXJcIjtcbmltcG9ydCBmb290ZXIgZnJvbSBcIndpZGdldHMvZm9vdGVyXCI7XG5cbmltcG9ydCBcImpxdWVyeS1zbGltc2Nyb2xsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYXZhdGFyIGZyb20gXCJpbWFnZXMvdXNlcnMvYXZhdGFyLTIuanBnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb25pbml0KCkge1xuICAgICQoXCIubmF2YmFyLXRvZ2dsZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGU6IEV2ZW50KSB7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcbiAgICAgICQoXCIjbmF2aWdhdGlvblwiKS5zbGlkZVRvZ2dsZSg0MDApO1xuICAgIH0pO1xuXG4gICAgJChcIi5uYXZpZ2F0aW9uLW1lbnU+bGlcIikuc2xpY2UoLTIpLmFkZENsYXNzKFwibGFzdC1lbGVtZW50c1wiKTtcblxuICAgICQoXCIubmF2aWdhdGlvbi1tZW51IGxpLmhhcy1zdWJtZW51IGFbaHJlZj0nIyddXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZTogRXZlbnQpIHtcbiAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSEgPCA5OTIpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwib3BlblwiKS5maW5kKFwiLnN1Ym1lbnU6Zmlyc3RcIikudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChcIi5zbGltc2Nyb2xsXCIpLnNsaW1TY3JvbGwoe1xuICAgICAgaGVpZ2h0OiBcImF1dG9cIixcbiAgICAgIHBvc2l0aW9uOiBcInJpZ2h0XCIsXG4gICAgICBzaXplOiBcIjhweFwiLFxuICAgICAgY29sb3I6IFwiIzllYTVhYlwiXG4gICAgfSk7XG4gIH0sXG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKGhlYWRlciksXG4gICAgICBtKFwiLndyYXBwZXJcIixcbiAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIixcblxuICAgICAgICAgIG0oXCIucm93XCIsXG4gICAgICAgICAgICBtKFwiLmNvbC1zbS0xMlwiLFxuICAgICAgICAgICAgICBtKFwiLnBhZ2UtdGl0bGUtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLmJ0bi1ncm91cC5wdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICBtKFwib2wuYnJlYWRjcnVtYi5oaWRlLXBob25lLnAtMC5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwibGkuYnJlYWRjcnVtYi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nLyMhLyddXCIsIFwiU21hcnRGdW5kaW5nXCIpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW0uYWN0aXZlXCIsIFwiRGFzaGJvYXJkXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImg0LnBhZ2UtdGl0bGVcIiwgXCJEYXNoYm9hcmRcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuXG4gICAgICAgICAgbShcIi5yb3dcIiwgW1xuICAgICAgICAgICAgbShcIi5jb2wtbGctOFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDQuaGVhZGVyLXRpdGxlLm1iLTNcIiwgXCJXYWxsZXQgQmFsYW5jZXNcIiksXG4gICAgICAgICAgICAgICAgbShcIi50YWJsZS1yZXNwb25zaXZlXCIsXG4gICAgICAgICAgICAgICAgICBtKFwidGFibGUudGFibGUudGFibGUtaG92ZXIudGFibGUtY2VudGVyZWQubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInRoZWFkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIlByb2ZpbGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJCYWxhbmNlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiUmVzZXJ2ZWQgaW4gb3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcInRib2R5XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcucm91bmRlZC1jaXJjbGUudGh1bWItc21bYWx0PSdpbWcnXVt0aXRsZT0nY29udGFjdC1pbWcnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBhdmF0YXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaDUubS0wLmZvbnQtd2VpZ2h0LW5vcm1hbFwiLCBcIiMwMDAwMDBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLm1iLTAudGV4dC1tdXRlZFwiLCBtKFwic21hbGxcIiwgXCJKYW51YXJ5IDAxLCAxOTcwXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWN1cnJlbmN5LWJ0Yy50ZXh0LXByaW1hcnlcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQlRDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiMC4wMDAwMDAwMCBCVENcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgXCIwLjAwMDAwMDAwIEJUQ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tc20uYnRuLWN1c3RvbVtocmVmPScjJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLXBsdXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1zbS5idG4tZGFuZ2VyW2hyZWY9JyMnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktbWludXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG0oXCIuY29sLWxnLTRcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcImg0Lm0tdC0wLmhlYWRlci10aXRsZVwiLCBcIlRvdGFsIFdhbGxldCBCYWxhbmNlXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJbaWQ9J2RvbnV0LWNoYXJ0J11cIixcbiAgICAgICAgICAgICAgICAgIG0oXCIuZmxvdC1jaGFydC5tdC01W2lkPSdkb251dC1jaGFydC1jb250YWluZXInXVwiLCB7IHN0eWxlOiB7IFwiaGVpZ2h0XCI6IFwiMzQwcHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBtKGZvb3RlcilcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImV4cG9ydCBjbGFzcyBBcHBTZXR0aW5ncyB7XG4gIHB1YmxpYyBzdGF0aWMgQVBJX0JBU0VfVVJMID0gcHJvY2Vzcy5lbnYuU0ZfQVBJX0JBU0VfVVJMIHx8IFwiaHR0cHM6Ly9hcGkuc21hcnRmdW5kaW5nLmlvXCI7XG59XG4iLCJpbXBvcnQgbSBmcm9tIFwibWl0aHJpbFwiO1xuaW1wb3J0IFJhdmVuIGZyb20gXCJyYXZlbi1qc1wiO1xuXG5pbXBvcnQgcmVnaXN0ZXIgZnJvbSBcImNvbXBvbmVudHMvcmVnaXN0ZXJcIjtcbmltcG9ydCBsb2dpbiBmcm9tIFwiY29tcG9uZW50cy9sb2dpblwiO1xuaW1wb3J0IGxvZ291dCBmcm9tIFwiY29tcG9uZW50cy9sb2dvdXRcIjtcbmltcG9ydCBsb2NrU2NyZWVuIGZyb20gXCJjb21wb25lbnRzL2xvY2tfc2NyZWVuXCI7XG5pbXBvcnQgY29uZmlybU1haWwgZnJvbSBcImNvbXBvbmVudHMvY29uZmlybV9tYWlsXCI7XG5pbXBvcnQgcmVjb3ZlclBhc3N3b3JkIGZyb20gXCJjb21wb25lbnRzL3JlY292ZXJfcGFzc3dvcmRcIjtcblxuaW1wb3J0IGhvbWUgZnJvbSBcImNvbXBvbmVudHMvaG9tZVwiO1xuaW1wb3J0IHVwbG9hZERvY3VtZW50IGZyb20gXCJjb21wb25lbnRzL3VwbG9hZF9kb2N1bWVudFwiO1xuaW1wb3J0IGFkbWluRGFzaGJvYXJkIGZyb20gXCJjb21wb25lbnRzL2FkbWluL2Rhc2hib2FyZFwiO1xuXG5pbXBvcnQgbm90Rm91bmQgZnJvbSBcImNvbXBvbmVudHMvbm90X2ZvdW5kXCI7XG5pbXBvcnQgbm90Rm91bmRBbHQgZnJvbSBcImNvbXBvbmVudHMvbm90X2ZvdW5kX2FsdFwiO1xuaW1wb3J0IHNlcnZlckVycm9yIGZyb20gXCJjb21wb25lbnRzL3NlcnZlcl9lcnJvclwiO1xuXG5pbXBvcnQgeyBBdXRoIH0gZnJvbSBcIi4vYXV0aFwiO1xuXG5mdW5jdGlvbiBTbWFydEZ1bmRpbmdSb3V0ZXIoKSB7XG4gIGRvY3VtZW50LmJvZHkuaWQgPSBcInNmXCI7XG4gIG0ucm91dGUoZG9jdW1lbnQuYm9keSwgXCIvXCIsIHtcbiAgICBcIi9cIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgICBlbHNlIHJldHVybiBob21lO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvdXBsb2FkLWRvY3VtZW50XCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSBtLnJvdXRlLnNldChcIi9sb2dpblwiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdXBsb2FkRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9hZG1pbi9kYXNoYm9hcmRcIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgICBlbHNlIHJldHVybiBhZG1pbkRhc2hib2FyZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL3JlZ2lzdGVyXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gcmVnaXN0ZXI7XG4gICAgICAgIGVsc2UgbS5yb3V0ZS5zZXQoXCIvXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvbG9naW5cIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIHJldHVybiBsb2dpbjtcbiAgICAgICAgZWxzZSBtLnJvdXRlLnNldChcIi9cIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9sb2dvdXRcIjogbG9nb3V0LFxuICAgIFwiL2xvY2stc2NyZWVuXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gbG9ja1NjcmVlbjtcbiAgICAgICAgZWxzZSBtLnJvdXRlLnNldChcIi9cIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9jb25maXJtLW1haWxcIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIHJldHVybiBjb25maXJtTWFpbDtcbiAgICAgICAgZWxzZSBtLnJvdXRlLnNldChcIi9cIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9yZWNvdmVyLXBhc3N3b3JkXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gcmVjb3ZlclBhc3N3b3JkO1xuICAgICAgICBlbHNlIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL3NlcnZlci1lcnJvclwiOiBzZXJ2ZXJFcnJvcixcbiAgICBcIi9ub3QtZm91bmQtYWx0XCI6IG5vdEZvdW5kQWx0LFxuICAgIFwiLzphbnkuLi5cIjogbm90Rm91bmRcbiAgfSk7XG59XG5cblJhdmVuLmNvbmZpZyhcImh0dHBzOi8vMDY4ODk2MjdiOTJhNDkxODk5ODNlNWRjOGRhODNkNGZAc2VudHJ5LmlvLzEyMjc4NjZcIikuaW5zdGFsbCgpXG5SYXZlbi5jb250ZXh0KGZ1bmN0aW9uKCkge1xuICBTbWFydEZ1bmRpbmdSb3V0ZXIoKTtcbn0pO1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCJmb290ZXIuZm9vdGVyXCIsXG4gICAgICBtKFwiLmNvbnRhaW5lclwiLFxuICAgICAgICBtKFwiLnJvd1wiLCBtKFwiLmNvbC0xMi50ZXh0LWNlbnRlclwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcbmltcG9ydCBhdmF0YXIgZnJvbSBcImltYWdlcy91c2Vycy9hdmF0YXItMS5qcGdcIjtcblxuY29uc3QgSGVhZGVyRGF0YSA9IHtcbiAgZ2V0RW1haWwoKSB7XG4gICAgbGV0IGVtYWlsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJlbWFpbFwiKTtcbiAgICByZXR1cm4gZW1haWw7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb25pbml0KCkge1xuICAgICQoJy5uYXZiYXItdG9nZ2xlJylcbiAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZTogRXZlbnQpIHtcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICQoJyNuYXZpZ2F0aW9uJykuc2xpZGVUb2dnbGUoNDAwKTtcbiAgICB9KTtcblxuICAgICQoJy5uYXZpZ2F0aW9uLW1lbnU+bGknKS5zbGljZSgtMikuYWRkQ2xhc3MoJ2xhc3QtZWxlbWVudHMnKTtcblxuICAgICQoJy5uYXZpZ2F0aW9uLW1lbnUgbGkuaGFzLXN1Ym1lbnUgYVtocmVmPVwiamF2YXNjcmlwdDo7XCJdJylcbiAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZTogRXZlbnQpIHtcbiAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSEgPCA5OTIpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGknKS50b2dnbGVDbGFzcygnb3BlbicpXG4gICAgICAgICAgLmZpbmQoJy5zdWJtZW51OmZpcnN0JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcImhlYWRlcltpZD0ndG9wbmF2J11cIiwgW1xuICAgICAgbShcIi50b3BiYXItbWFpblwiLFxuICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLCBbXG4gICAgICAgICAgICBtKFwiLmxvZ29cIixcbiAgICAgICAgICAgICAgbShcImEubG9nb1tocmVmPScvIyEvJ11cIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJpbWcubG9nby1zbWFsbFthbHQ9JyddW2hlaWdodD0nMjYnXVtzcmM9J2Fzc2V0cy9pbWFnZXMvbG9nb19zbS5wbmcnXVwiKSxcbiAgICAgICAgICAgICAgICBtKFwiaW1nLmxvZ28tbGFyZ2VbYWx0PScnXVtoZWlnaHQ9JzIyJ11cIiwgeyBzcmM6IGxvZ28gfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtKFwiLm1lbnUtZXh0cmFzLnRvcGJhci1jdXN0b21cIixcbiAgICAgICAgICAgICAgbShcInVsLmxpc3QtdW5zdHlsZWQudG9wYmFyLXJpZ2h0LW1lbnUuZmxvYXQtcmlnaHQubWItMFwiLCBbXG4gICAgICAgICAgICAgICAgbShcImxpLm1lbnUtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgbShcImEubmF2YmFyLXRvZ2dsZS5uYXYtbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmxpbmVzXCIsIFsgbShcInNwYW5cIiksIG0oXCJzcGFuXCIpLCBtKFwic3BhblwiKSBdKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImxpLmRyb3Bkb3duLm5vdGlmaWNhdGlvbi1saXN0XCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZS5hcnJvdy1ub25lLndhdmVzLWVmZmVjdFthcmlhLWV4cGFuZGVkPSdmYWxzZSddW2FyaWEtaGFzcG9wdXA9J2ZhbHNlJ11bZGF0YS10b2dnbGU9J2Ryb3Bkb3duJ11baHJlZj0namF2YXNjcmlwdDo7J11bcm9sZT0nYnV0dG9uJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1iZWxsLm5vdGktaWNvblwiKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcIi5kcm9wZG93bi1tZW51LmRyb3Bkb3duLW1lbnUtcmlnaHQuZHJvcGRvd24tbGdcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLWl0ZW0ubm90aS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJoNi5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW4uZmxvYXQtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrW2hyZWY9JyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNtYWxsXCIsIFwiQ2xlYXIgQWxsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk5vdGlmaWNhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcIi5zbGltc2Nyb2xsXCIsIHsgc3R5bGU6IHsgXCJtYXgtaGVpZ2h0XCI6IFwiMjMwcHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6OyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb24uYmctc3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNvbW1lbnQtYWNjb3VudC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubm90aWZ5LWRldGFpbHNcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNhbGViIEZsYWtlbGFyIGNvbW1lbnRlZCBvbiBBZG1pblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGwudGV4dC1tdXRlZFwiLCBcIjEgbWluIGFnb1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS50ZXh0LWNlbnRlci50ZXh0LXByaW1hcnkubm90aWZ5LWl0ZW0ubm90aWZ5LWFsbFtocmVmPSdqYXZhc2NyaXB0OjsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJWaWV3IGFsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWFycm93LXJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuXG4gICAgICAgICAgICAgICAgbShcImxpLmRyb3Bkb3duLm5vdGlmaWNhdGlvbi1saXN0XCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZS53YXZlcy1lZmZlY3QubmF2LXVzZXJbYXJpYS1leHBhbmRlZD0nZmFsc2UnXVthcmlhLWhhc3BvcHVwPSdmYWxzZSddW2RhdGEtdG9nZ2xlPSdkcm9wZG93biddW2hyZWY9J2phdmFzY3JpcHQ6OyddW3JvbGU9J2J1dHRvbiddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImltZy5yb3VuZGVkLWNpcmNsZVthbHQ9J3VzZXInXVwiLCB7IHNyYzogYXZhdGFyIH0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5tbC0xLnByby11c2VyLW5hbWVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIEhlYWRlckRhdGEuZ2V0RW1haWwoKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNoZXZyb24tZG93blwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLW1lbnUuZHJvcGRvd24tbWVudS1yaWdodC5wcm9maWxlLWRyb3Bkb3duLlwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuZHJvcGRvd24taXRlbS5ub3RpLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImg2LnRleHQtb3ZlcmZsb3cubS0wXCIsIFwiV2VsY29tZSAhXCIpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1oZWFkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiTXkgQWNjb3VudFwiKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWNvZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBcIlNldHRpbmdzXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktaGVscFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBcIlN1cHBvcnRcIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1sb2NrXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiTG9jayBTY3JlZW5cIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1wb3dlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBcIkxvZ291dFwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG0oXCIuY2xlYXJmaXhcIilcbiAgICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIG0oXCIubmF2YmFyLWN1c3RvbVwiLFxuICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLFxuICAgICAgICAgIG0oXCJbaWQ9J25hdmlnYXRpb24nXVwiLFxuICAgICAgICAgICAgbShcInVsLm5hdmlnYXRpb24tbWVudVwiLCBbXG4gICAgICAgICAgICAgIG0oXCJsaS5oYXMtc3VibWVudVwiLFxuICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8jIS8nXVwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiaS5pY29uLXNwZWVkb21ldGVyXCIpLFxuICAgICAgICAgICAgICAgICAgXCJEYXNoYm9hcmRcIlxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIF0pXG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9