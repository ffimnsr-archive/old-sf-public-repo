/*! Open Sesame Sec */
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
exports.default = {
    oninit: function () {
        mithril_1.default.route.set("/login");
    },
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default("header[id='topnav']", [
                mithril_1.default(".topbar-main", mithril_1.default(".container-fluid", [
                    mithril_1.default(".logo", mithril_1.default("a.logo[href='index.html']", [
                        mithril_1.default("img.logo-small[alt=''][height='26'][src='assets/images/logo_sm.png']"),
                        mithril_1.default("img.logo-large[alt=''][height='22'][src='assets/images/logo.png']")
                    ])),
                    mithril_1.default(".menu-extras.topbar-custom", mithril_1.default("ul.list-unstyled.topbar-right-menu.float-right.mb-0", [
                        mithril_1.default("li.menu-item", mithril_1.default("a.navbar-toggle.nav-link", mithril_1.default(".lines", [
                            mithril_1.default("span"),
                            mithril_1.default("span"),
                            mithril_1.default("span")
                        ]))),
                        mithril_1.default("li.dropdown.notification-list.hide-phone", [
                            mithril_1.default("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("i.mdi.mdi-earth"),
                                "English",
                                mithril_1.default("i.mdi.mdi-chevron-down")
                            ]),
                            mithril_1.default(".dropdown-menu.dropdown-menu-right", [
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "Spanish"),
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "Italian"),
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "French"),
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "Russian")
                            ])
                        ]),
                        mithril_1.default("li.dropdown.notification-list", [
                            mithril_1.default("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("i.fi-bell.noti-icon"),
                                mithril_1.default("span.badge.badge-danger.badge-pill.noti-icon-badge", "4")
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
                            mithril_1.default("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("i.fi-speech-bubble.noti-icon"),
                                mithril_1.default("span.badge.badge-dark.badge-pill.noti-icon-badge", "6")
                            ]),
                            mithril_1.default(".dropdown-menu.dropdown-menu-right.dropdown-lg", [
                                mithril_1.default(".dropdown-item.noti-title", mithril_1.default("h6.m-0", [
                                    mithril_1.default("span.float-right", mithril_1.default("a.text-dark[href='']", mithril_1.default("small", "Clear All"))),
                                    "Chat"
                                ])),
                                mithril_1.default(".slimscroll", { style: { "max-height": "230px" } }, [
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-2.jpg']")),
                                        mithril_1.default("p.notify-details", "Cristina Pride"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Hi, How are you? What about our next meeting")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-3.jpg']")),
                                        mithril_1.default("p.notify-details", "Sam Garret"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Yeah everything is fine")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-4.jpg']")),
                                        mithril_1.default("p.notify-details", "Karen Robinson"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Wow that's great")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-5.jpg']")),
                                        mithril_1.default("p.notify-details", "Sherry Marshall"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Hi, How are you? What about our next meeting")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-6.jpg']")),
                                        mithril_1.default("p.notify-details", "Shawn Millard"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Yeah everything is fine")
                                    ])
                                ]),
                                mithril_1.default("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:void(0);']", [
                                    "View all",
                                    mithril_1.default("i.fi-arrow-right")
                                ])
                            ])
                        ]),
                        mithril_1.default("li.dropdown.notification-list", [
                            mithril_1.default("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("img.rounded-circle[alt='user'][src='assets/images/users/avatar-1.jpg']"),
                                mithril_1.default("span.ml-1.pro-user-name", [
                                    "Maxine K",
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
            ]),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                    mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='#']", "Highdmin")),
                    mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='#']", "Extra Pages")),
                    mithril_1.default("li.breadcrumb-item.active", "Starter")
                ])),
                mithril_1.default("h4.page-title", "Starter")
            ]))))),
            mithril_1.default("footer.footer", mithril_1.default(".container", mithril_1.default(".row", mithril_1.default(".col-12.text-center", "2018 © SmartFunding"))))
        ]);
    }
};


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
                    mithril_1.default("form[action='javascript:;'][class='']", [
                        mithril_1.default(".form-group.m-b-20.row", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='emailaddress']", "Email address"),
                            mithril_1.default("input.form-control[id='emailaddress'][placeholder='Enter your email'][required=''][type='email']")
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("a.text-muted.pull-right[href='/#!/recover-password']", mithril_1.default("small", "Forgot your password?")),
                            mithril_1.default("label[for='password']", "Password"),
                            mithril_1.default("input.form-control[id='password'][placeholder='Enter your password'][required=''][type='password']")
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", mithril_1.default(".checkbox.checkbox-custom", [
                            mithril_1.default("input[checked=''][id='remember'][type='checkbox']"),
                            mithril_1.default("label[for='remember']", "Remember me")
                        ]))),
                        mithril_1.default(".form-group.row.text-center.m-t-10", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", "Sign In")))
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
                            "You are now successfully sign out. Back to",
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
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default("header[id='topnav']", [
                mithril_1.default(".topbar-main", mithril_1.default(".container-fluid", [
                    mithril_1.default(".logo", mithril_1.default("a.logo[href='index.html']", [
                        mithril_1.default("img.logo-small[alt=''][height='26'][src='assets/images/logo_sm.png']"),
                        mithril_1.default("img.logo-large[alt=''][height='22'][src='assets/images/logo.png']")
                    ])),
                    mithril_1.default(".menu-extras.topbar-custom", mithril_1.default("ul.list-unstyled.topbar-right-menu.float-right.mb-0", [
                        mithril_1.default("li.menu-item", mithril_1.default("a.navbar-toggle.nav-link", mithril_1.default(".lines", [
                            mithril_1.default("span"),
                            mithril_1.default("span"),
                            mithril_1.default("span")
                        ]))),
                        mithril_1.default("li.dropdown.notification-list.hide-phone", [
                            mithril_1.default("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("i.mdi.mdi-earth"),
                                "English",
                                mithril_1.default("i.mdi.mdi-chevron-down")
                            ]),
                            mithril_1.default(".dropdown-menu.dropdown-menu-right", [
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "Spanish"),
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "Italian"),
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "French"),
                                mithril_1.default("a.dropdown-item[href='javascript:void(0);']", "Russian")
                            ])
                        ]),
                        mithril_1.default("li.dropdown.notification-list", [
                            mithril_1.default("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("i.fi-bell.noti-icon"),
                                mithril_1.default("span.badge.badge-danger.badge-pill.noti-icon-badge", "4")
                            ]),
                            mithril_1.default(".dropdown-menu.dropdown-menu-right.dropdown-lg", [
                                mithril_1.default(".dropdown-item.noti-title", mithril_1.default("h6.m-0", [
                                    mithril_1.default("span.float-right", mithril_1.default("a.text-dark[href='']", mithril_1.default("small", "Clear All"))),
                                    "Notification"
                                ])),
                                mithril_1.default(".slimscroll", { style: { "max-height": "230px" } }, [
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon.bg-success", mithril_1.default("i.mdi.mdi-comment-account-outline")),
                                        mithril_1.default("p.notify-details", [
                                            "Caleb Flakelar commented on Admin",
                                            mithril_1.default("small.text-muted", "1 min ago")
                                        ])
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon.bg-info", mithril_1.default("i.mdi.mdi-account-plus")),
                                        mithril_1.default("p.notify-details", [
                                            "New user registered.",
                                            mithril_1.default("small.text-muted", "5 hours ago")
                                        ])
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon.bg-danger", mithril_1.default("i.mdi.mdi-heart")),
                                        mithril_1.default("p.notify-details", [
                                            "Carlos Crouch liked",
                                            mithril_1.default("b", "Admin"),
                                            mithril_1.default("small.text-muted", "3 days ago")
                                        ])
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon.bg-warning", mithril_1.default("i.mdi.mdi-comment-account-outline")),
                                        mithril_1.default("p.notify-details", [
                                            "Caleb Flakelar commented on Admin",
                                            mithril_1.default("small.text-muted", "4 days ago")
                                        ])
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon.bg-purple", mithril_1.default("i.mdi.mdi-account-plus")),
                                        mithril_1.default("p.notify-details", [
                                            "New user registered.",
                                            mithril_1.default("small.text-muted", "7 days ago")
                                        ])
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon.bg-custom", mithril_1.default("i.mdi.mdi-heart")),
                                        mithril_1.default("p.notify-details", [
                                            "Carlos Crouch liked",
                                            mithril_1.default("b", "Admin"),
                                            mithril_1.default("small.text-muted", "13 days ago")
                                        ])
                                    ])
                                ]),
                                mithril_1.default("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:void(0);']", [
                                    "View all",
                                    mithril_1.default("i.fi-arrow-right")
                                ])
                            ])
                        ]),
                        mithril_1.default("li.dropdown.notification-list", [
                            mithril_1.default("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("i.fi-speech-bubble.noti-icon"),
                                mithril_1.default("span.badge.badge-dark.badge-pill.noti-icon-badge", "6")
                            ]),
                            mithril_1.default(".dropdown-menu.dropdown-menu-right.dropdown-lg", [
                                mithril_1.default(".dropdown-item.noti-title", mithril_1.default("h6.m-0", [
                                    mithril_1.default("span.float-right", mithril_1.default("a.text-dark[href='']", mithril_1.default("small", "Clear All"))),
                                    "Chat"
                                ])),
                                mithril_1.default(".slimscroll", { style: { "max-height": "230px" } }, [
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-2.jpg']")),
                                        mithril_1.default("p.notify-details", "Cristina Pride"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Hi, How are you? What about our next meeting")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-3.jpg']")),
                                        mithril_1.default("p.notify-details", "Sam Garret"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Yeah everything is fine")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-4.jpg']")),
                                        mithril_1.default("p.notify-details", "Karen Robinson"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Wow that's great")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-5.jpg']")),
                                        mithril_1.default("p.notify-details", "Sherry Marshall"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Hi, How are you? What about our next meeting")
                                    ]),
                                    mithril_1.default("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                                        mithril_1.default(".notify-icon", mithril_1.default("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-6.jpg']")),
                                        mithril_1.default("p.notify-details", "Shawn Millard"),
                                        mithril_1.default("p.text-muted.font-13.mb-0.user-msg", "Yeah everything is fine")
                                    ])
                                ]),
                                mithril_1.default("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:void(0);']", [
                                    "View all",
                                    mithril_1.default("i.fi-arrow-right")
                                ])
                            ])
                        ]),
                        mithril_1.default("li.dropdown.notification-list", [
                            mithril_1.default("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                                mithril_1.default("img.rounded-circle[alt='user'][src='assets/images/users/avatar-1.jpg']"),
                                mithril_1.default("span.ml-1.pro-user-name", [
                                    "Maxine K",
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
                    mithril_1.default("li.has-submenu", mithril_1.default("a[href='index.html']", [
                        mithril_1.default("i.icon-speedometer"),
                        "Dashboard"
                    ])),
                    mithril_1.default("li.has-submenu", [
                        mithril_1.default("a[href='#']", [
                            mithril_1.default("i.icon-layers"),
                            "Apps"
                        ]),
                        mithril_1.default("ul.submenu", [
                            mithril_1.default("li", mithril_1.default("a[href='apps-calendar.html']", "Calendar")),
                            mithril_1.default("li", mithril_1.default("a[href='apps-tickets.html']", "Tickets")),
                            mithril_1.default("li", mithril_1.default("a[href='apps-taskboard.html']", "Task Board")),
                            mithril_1.default("li", mithril_1.default("a[href='apps-task-detail.html']", "Task Detail")),
                            mithril_1.default("li", mithril_1.default("a[href='apps-contacts.html']", "Contacts")),
                            mithril_1.default("li", mithril_1.default("a[href='apps-projects.html']", "Projects")),
                            mithril_1.default("li", mithril_1.default("a[href='apps-companies.html']", "Companies")),
                            mithril_1.default("li", mithril_1.default("a[href='apps-file-manager.html']", "File Manager"))
                        ])
                    ]),
                    mithril_1.default("li.has-submenu", [
                        mithril_1.default("a[href='#']", [
                            mithril_1.default("i.icon-briefcase"),
                            "UI Elements"
                        ]),
                        mithril_1.default("ul.submenu.megamenu", [
                            mithril_1.default("li", mithril_1.default("ul", [
                                mithril_1.default("li", mithril_1.default("a[href='ui-typography.html']", "Typography")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-cards.html']", "Cards")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-buttons.html']", "Buttons")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-modals.html']", "Modals")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-spinners.html']", "Spinners"))
                            ])),
                            mithril_1.default("li", mithril_1.default("ul", [
                                mithril_1.default("li", mithril_1.default("a[href='ui-ribbons.html']", "Ribbons")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-tooltips-popovers.html']", "Tooltips & Popover")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-checkbox-radio.html']", "Checkboxs-Radios")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-tabs.html']", "Tabs")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-progressbars.html']", "Progress Bars"))
                            ])),
                            mithril_1.default("li", mithril_1.default("ul", [
                                mithril_1.default("li", mithril_1.default("a[href='ui-notifications.html']", "Notification")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-grid.html']", "Grid")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-sweet-alert.html']", "Sweet Alert")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-bootstrap.html']", "Bootstrap UI")),
                                mithril_1.default("li", mithril_1.default("a[href='ui-range-slider.html']", "Range Slider"))
                            ]))
                        ])
                    ]),
                    mithril_1.default("li.has-submenu", [
                        mithril_1.default("a[href='#']", [
                            mithril_1.default("i.icon-fire"),
                            "Components"
                        ]),
                        mithril_1.default("ul.submenu", [
                            mithril_1.default("li.has-submenu", [
                                mithril_1.default("a[href='#']", "Email"),
                                mithril_1.default("ul.submenu", [
                                    mithril_1.default("li", mithril_1.default("a[href='email-inbox.html']", "Inbox")),
                                    mithril_1.default("li", mithril_1.default("a[href='email-read.html']", "Read Email")),
                                    mithril_1.default("li", mithril_1.default("a[href='email-compose.html']", "Compose Email"))
                                ])
                            ]),
                            mithril_1.default("li", mithril_1.default("a[href='widgets.html']", "Widgets")),
                            mithril_1.default("li.has-submenu", [
                                mithril_1.default("a[href='#']", "Charts"),
                                mithril_1.default("ul.submenu", [
                                    mithril_1.default("li", mithril_1.default("a[href='chart-flot.html']", "Flot Chart")),
                                    mithril_1.default("li", mithril_1.default("a[href='chart-morris.html']", "Morris Chart")),
                                    mithril_1.default("li", mithril_1.default("a[href='chart-google.html']", "Google Chart")),
                                    mithril_1.default("li", mithril_1.default("a[href='chart-chartist.html']", "Chartist Chart")),
                                    mithril_1.default("li", mithril_1.default("a[href='chart-chartjs.html']", "Chartjs Chart")),
                                    mithril_1.default("li", mithril_1.default("a[href='chart-sparkline.html']", "Sparkline Chart")),
                                    mithril_1.default("li", mithril_1.default("a[href='chart-knob.html']", "Jquery Knob"))
                                ])
                            ]),
                            mithril_1.default("li.has-submenu", [
                                mithril_1.default("a[href='#']", "Forms"),
                                mithril_1.default("ul.submenu", [
                                    mithril_1.default("li", mithril_1.default("a[href='form-elements.html']", "Form Elements")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-advanced.html']", "Form Advanced")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-validation.html']", "Form Validation")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-pickers.html']", "Form Pickers")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-wizard.html']", "Form Wizard")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-mask.html']", "Form Masks")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-summernote.html']", "Summernote")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-wysiwig.html']", "Wysiwig Editors")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-x-editable.html']", "X Editable")),
                                    mithril_1.default("li", mithril_1.default("a[href='form-uploads.html']", "Multiple File Upload"))
                                ])
                            ]),
                            mithril_1.default("li.has-submenu", [
                                mithril_1.default("a[href='#']", "Icons"),
                                mithril_1.default("ul.submenu", [
                                    mithril_1.default("li", mithril_1.default("a[href='icons-materialdesign.html']", "Material Design")),
                                    mithril_1.default("li", mithril_1.default("a[href='icons-dripicons.html']", "Dripicons")),
                                    mithril_1.default("li", mithril_1.default("a[href='icons-fontawesome.html']", "Font awesome")),
                                    mithril_1.default("li", mithril_1.default("a[href='icons-feather.html']", "Feather Icons")),
                                    mithril_1.default("li", mithril_1.default("a[href='icons-simpleline.html']", "Simple Line Icons"))
                                ])
                            ]),
                            mithril_1.default("li.has-submenu", [
                                mithril_1.default("a[href='#']", "Tables"),
                                mithril_1.default("ul.submenu", [
                                    mithril_1.default("li", mithril_1.default("a[href='tables-basic.html']", "Basic Tables")),
                                    mithril_1.default("li", mithril_1.default("a[href='tables-datatable.html']", "Data Tables")),
                                    mithril_1.default("li", mithril_1.default("a[href='tables-responsive.html']", "Responsive Table")),
                                    mithril_1.default("li", mithril_1.default("a[href='tables-tablesaw.html']", "Tablesaw Tables")),
                                    mithril_1.default("li", mithril_1.default("a[href='tables-foo.html']", "Foo Tables"))
                                ])
                            ]),
                            mithril_1.default("li.has-submenu", [
                                mithril_1.default("a[href='#']", "Maps"),
                                mithril_1.default("ul.submenu", [
                                    mithril_1.default("li", mithril_1.default("a[href='maps-google.html']", "Google Maps")),
                                    mithril_1.default("li", mithril_1.default("a[href='maps-vector.html']", "Vector Maps")),
                                    mithril_1.default("li", mithril_1.default("a[href='maps-mapael.html']", "Mapael Maps"))
                                ])
                            ])
                        ])
                    ]),
                    mithril_1.default("li.has-submenu", [
                        mithril_1.default("a[href='#']", [
                            mithril_1.default("i.icon-docs"),
                            "Pages"
                        ]),
                        mithril_1.default("ul.submenu.megamenu", [
                            mithril_1.default("li", mithril_1.default("ul", [
                                mithril_1.default("li", mithril_1.default("a[href='page-starter.html']", "Starter Page")),
                                mithril_1.default("li", mithril_1.default("a[href='page-login.html']", "Login")),
                                mithril_1.default("li", mithril_1.default("a[href='page-register.html']", "Register")),
                                mithril_1.default("li", mithril_1.default("a[href='page-logout.html']", "Logout")),
                                mithril_1.default("li", mithril_1.default("a[href='page-recoverpw.html']", "Recover Password"))
                            ])),
                            mithril_1.default("li", mithril_1.default("ul", [
                                mithril_1.default("li", mithril_1.default("a[href='page-lock-screen.html']", "Lock Screen")),
                                mithril_1.default("li", mithril_1.default("a[href='page-confirm-mail.html']", "Confirm Mail")),
                                mithril_1.default("li", mithril_1.default("a[href='page-404.html']", "Error 404")),
                                mithril_1.default("li", mithril_1.default("a[href='page-404-alt.html']", "Error 404-alt")),
                                mithril_1.default("li", mithril_1.default("a[href='page-500.html']", "Error 500"))
                            ]))
                        ])
                    ]),
                    mithril_1.default("li.has-submenu", [
                        mithril_1.default("a[href='#']", [
                            mithril_1.default("i.icon-present"),
                            "Extra Pages"
                        ]),
                        mithril_1.default("ul.submenu.megamenu", [
                            mithril_1.default("li", mithril_1.default("ul", [
                                mithril_1.default("li", mithril_1.default("a[href='extras-timeline.html']", "Timeline")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-profile.html']", "Profile")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-invoice.html']", "Invoice")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-faq.html']", "FAQ")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-pricing.html']", "Pricing")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-email-template.html']", "Email Templates"))
                            ])),
                            mithril_1.default("li", mithril_1.default("ul", [
                                mithril_1.default("li", mithril_1.default("a[href='extras-ratings.html']", "Ratings")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-search-results.html']", "Search Results")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-gallery.html']", "Gallery")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-maintenance.html']", "Maintenance")),
                                mithril_1.default("li", mithril_1.default("a[href='extras-coming-soon.html']", "Coming Soon"))
                            ]))
                        ])
                    ])
                ]))))
            ]),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", [
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                    mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='#']", "Highdmin")),
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='#']", "Pages")),
                        mithril_1.default("li.breadcrumb-item.active", "Error 404")
                    ])),
                    mithril_1.default("h4.page-title", "Error 404")
                ]))),
                mithril_1.default(".row", mithril_1.default(".col-sm-6.offset-3", mithril_1.default(".text-center.mt-5", [
                    mithril_1.default("h1.text-error", "404"),
                    mithril_1.default("h4.text-uppercase.text-danger.mt-3", "Page Not Found"),
                    mithril_1.default("p.text-muted.mt-3", "It's looking like you may have taken a wrong turn. Don't worry... it\
                                  happens to the best of us. Here's a\
                                  little tip that might help you get back on track."),
                    mithril_1.default("a.btn.btn-md.btn-custom.waves-effect.waves-light.mt-3[href='index.html']", "Return Home")
                ])))
            ])),
            mithril_1.default("footer.footer", mithril_1.default(".container", mithril_1.default(".row", mithril_1.default(".col-12.text-center", "2018 © SmartFunding"))))
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
                    mithril_1.default(".text-center.m-b-20", mithril_1.default("p.text-muted.m-b-0", "Enter your email address and we'll send you an email with instructions to reset your password.")),
                    mithril_1.default("form.form-horizontal[action='javascript:;']", [
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='emailaddress']", "Email address"),
                            mithril_1.default("input.form-control[id='emailaddress'][placeholder='e.g. jose@rizal.com'][required][type='email']")
                        ])),
                        mithril_1.default(".form-group.row.text-center.m-t-10", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", "Reset Password")))
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
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
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
                    mithril_1.default("form.form-horizontal[action='javascript:;']", [
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='username']", "Full Name"),
                            mithril_1.default("input.form-control[id='username'][placeholder='e.g. Jose Rizal'][required][type='text']")
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='email']", "Email address"),
                            mithril_1.default("input.form-control[id='email'][placeholder='e.g. jose@rizal.com'][required][type='email']")
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='password']", "Password"),
                            mithril_1.default("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']")
                        ])),
                        mithril_1.default(".form-group.row.m-b-20", mithril_1.default(".col-12", mithril_1.default(".checkbox.checkbox-custom", [
                            mithril_1.default("input[checked=''][id='remember'][type='checkbox']"),
                            mithril_1.default("label[for='remember']", [
                                "I accept ",
                                mithril_1.default("a.text-custom[href='/#!/terms-and-conditions']", "Terms and Conditions")
                            ])
                        ]))),
                        mithril_1.default(".form-group.row.text-center.m-t-10", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", "Sign Up Free")))
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
var home_1 = __importDefault(__webpack_require__(/*! components/home */ "./src/components/home.ts"));
var register_1 = __importDefault(__webpack_require__(/*! components/register */ "./src/components/register.ts"));
var login_1 = __importDefault(__webpack_require__(/*! components/login */ "./src/components/login.ts"));
var logout_1 = __importDefault(__webpack_require__(/*! components/logout */ "./src/components/logout.ts"));
var lock_screen_1 = __importDefault(__webpack_require__(/*! components/lock_screen */ "./src/components/lock_screen.ts"));
var confirm_mail_1 = __importDefault(__webpack_require__(/*! components/confirm_mail */ "./src/components/confirm_mail.ts"));
var recover_password_1 = __importDefault(__webpack_require__(/*! components/recover_password */ "./src/components/recover_password.ts"));
var not_found_1 = __importDefault(__webpack_require__(/*! components/not_found */ "./src/components/not_found.ts"));
var not_found_alt_1 = __importDefault(__webpack_require__(/*! components/not_found_alt */ "./src/components/not_found_alt.ts"));
var server_error_1 = __importDefault(__webpack_require__(/*! components/server_error */ "./src/components/server_error.ts"));
function MemberRouter() {
    document.body.id = "member";
    mithril_1.default.route(document.body, "/", {
        "/": home_1.default,
        "/server-error": server_error_1.default,
        "/:any...": not_found_alt_1.default
    });
}
function AnonymousRouter() {
    document.body.id = "anonymous";
    mithril_1.default.route(document.body, "/", {
        "/": home_1.default,
        "/register": register_1.default,
        "/login": login_1.default,
        "/logout": logout_1.default,
        "/lock-screen": lock_screen_1.default,
        "/confirm-mail": confirm_mail_1.default,
        "/recover-password": recover_password_1.default,
        "/server-error": server_error_1.default,
        "/:any...": not_found_1.default
    });
}
AnonymousRouter();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL2JnLTEuanBnIiwid2VicGFjazovLy8uL2ltYWdlcy9iZy0yLmpwZyIsIndlYnBhY2s6Ly8vLi9pbWFnZXMvc2YtbG9nby5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29uZmlybV9tYWlsLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hvbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9ja19zY3JlZW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9nb3V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25vdF9mb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ub3RfZm91bmRfYWx0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JlY292ZXJfcGFzc3dvcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VydmVyX2Vycm9yLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2ljb25zLnNjc3M/MDlhMyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0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RCx5SUFBMEQ7QUFDMUQsb0hBQTRDO0FBQzVDLGdJQUFtRDtBQUNuRCw2SEFBa0Q7QUFFbEQ7SUFDRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFDNUIsaUJBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDMUIsR0FBRyxFQUFFLGNBQUk7UUFDVCxlQUFlLEVBQUUsc0JBQVc7UUFDNUIsVUFBVSxFQUFFLHVCQUFXO0tBQ3hCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDtJQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQztJQUMvQixpQkFBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUMxQixHQUFHLEVBQUUsY0FBSTtRQUNULFdBQVcsRUFBRSxrQkFBUTtRQUNyQixRQUFRLEVBQUUsZUFBSztRQUNmLFNBQVMsRUFBRSxnQkFBTTtRQUNqQixjQUFjLEVBQUUscUJBQVU7UUFDMUIsZUFBZSxFQUFFLHNCQUFXO1FBQzVCLG1CQUFtQixFQUFFLDBCQUFlO1FBQ3BDLGVBQWUsRUFBRSxzQkFBVztRQUM1QixVQUFVLEVBQUUsbUJBQVE7S0FDckIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELGVBQWUsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7QUNyQ2xCLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDIiwiZmlsZSI6InNlc2FtZS5iNDA2MjY4OTgyNGI2ZDZiYWY1Ny5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInNlc2FtZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJpbWFnZXMvYmctMS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiaW1hZ2VzL2JnLTIuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiOyIsImltcG9ydCBtIGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmRcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8jIS8nXVwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi5hY2NvdW50LWNvbnRlbnQudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcInN2Z1t2ZXJzaW9uPScxLjEnXVt2aWV3Qm94PScwIDAgOTggOTgnXVt4PScwcHgnXVt4bWw6c3BhY2U9J3ByZXNlcnZlJ11beG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ11beG1sbnM6Z3JhcGg9JyZuc19ncmFwaHM7J11beG1sbnM6aT0nJm5zX2FpOyddW3htbG5zOng9JyZuc19leHRlbmQ7J11beG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXVt5PScwcHgnXVwiLCB7IHN0eWxlOiB7IFwiaGVpZ2h0XCI6IFwiMTIwcHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInN0eWxlW3R5cGU9J3RleHQvY3NzJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICBcIi5zdDB7ZmlsbDojRkZGRkZGO31cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0MXtmaWxsOiMwMmE4YjU7fVxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Qye2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAyYThiNTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdDN7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwiZ1tpOmV4dHJhbmVvdXM9J3NlbGYnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImNpcmNsZS5zdDBbY3g9JzQ5J11bY3k9JzQ5J11baWQ9J1hNTElEXzUwXyddW3I9JzQ5J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImdbaWQ9J1hNTElEXzRfJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J003Ny4zLDQyLjdWNzdjMCwwLjYtMC40LDEtMSwxSDIxLjdjLTAuNSwwLTEtMC41LTEtMVY0Mi43YzAtMC4zLDAuMS0wLjYsMC40LTAuOGwyNy4zLTIxLjcgYzAuMy0wLjMsMC44LTAuMywxLjIsMGwyNy4zLDIxLjdDNzcuMSw0Mi4xLDc3LjMsNDIuNCw3Ny4zLDQyLjd6J11baWQ9J1hNTElEXzQ5XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QyW2Q9J002Ni41LDY5LjVoLTM1Yy0xLjEsMC0yLTAuOS0yLTJWMjYuOGMwLTEuMSwwLjktMiwyLTJoMzVjMS4xLDAsMiwwLjksMiwydjQwLjcgQzY4LjUsNjguNiw2Ny42LDY5LjUsNjYuNSw2OS41eiddW2lkPSdYTUxJRF80OF8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNNjIuOSwzMy40SDQ3LjJjLTAuNSwwLTAuOS0wLjQtMC45LTAuOXYtMC4yYzAtMC41LDAuNC0wLjksMC45LTAuOWgxNS43IGMwLjUsMCwwLjksMC40LDAuOSwwLjl2MC4yQzYzLjgsMzMsNjMuNCwzMy40LDYyLjksMzMuNHonXVtpZD0nWE1MSURfNDdfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNDAuM0g0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDM5LjksNjMuNCw0MC4zLDYyLjksNDAuM3onXVtpZD0nWE1MSURfNDZfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNDcuMkg0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDQ2LjgsNjMuNCw0Ny4yLDYyLjksNDcuMnonXVtpZD0nWE1MSURfNDVfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNTQuMUg0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDUzLjcsNjMuNCw1NC4xLDYyLjksNTQuMXonXVtpZD0nWE1MSURfNDRfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDJbZD0nTTQxLjYsNDAuMWgtNS44Yy0wLjYsMC0xLTAuNC0xLTF2LTYuN2MwLTAuNiwwLjQtMSwxLTFoNS44YzAuNiwwLDEsMC40LDEsMXY2LjcgQzQyLjYsMzkuNyw0Mi4yLDQwLjEsNDEuNiw0MC4xeiddW2lkPSdYTUxJRF80M18nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MltkPSdNNDEuNiw1NC4yaC01LjhjLTAuNiwwLTEtMC40LTEtMXYtNi43YzAtMC42LDAuNC0xLDEtMWg1LjhjMC42LDAsMSwwLjQsMSwxdjYuNyBDNDIuNiw1My44LDQyLjIsNTQuMiw0MS42LDU0LjJ6J11baWQ9J1hNTElEXzQyXyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J00yMy40LDQ2LjJsMjUsMTcuOGMwLjMsMC4yLDAuNywwLjIsMS4xLDBsMjYuOC0xOS44bC0zLjMsMzAuOUgyNy43TDIzLjQsNDYuMnonXVtpZD0nWE1MSURfNDFfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDNbZD0nTTc0LjksNDUuMkw0OS41LDYzLjVjLTAuMywwLjItMC43LDAuMi0xLjEsMEwyMy4yLDQ1LjInXVtpZD0nWE1MSURfNDBfJ11cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTQubXQtMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiQSBlbWFpbCBoYXMgYmVlbiBzZW5kIHRvXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJiXCIsIFwieW91cmVtYWlsQGRvbWFpbi5jb21cIiksXG4gICAgICAgICAgICAgICAgICAgIFwiLlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbGVhc2UgY2hlY2sgZm9yIGFuIGVtYWlsIGZyb20gY29tcGFueSBhbmQgY2xpY2sgb24gdGhlIGluY2x1ZGVkIGxpbmsgdG9cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQgeW91ciBwYXNzd29yZC5cIlxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLW1kLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodC5tdC0zW2hyZWY9Jy8jIS8nXVwiLCBcIkJhY2sgdG8gSG9tZVwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtIGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9uaW5pdCAoKSB7XG4gICAgbS5yb3V0ZS5zZXQoXCIvbG9naW5cIilcbiAgfSxcbiAgdmlldyAodm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCJoZWFkZXJbaWQ9J3RvcG5hdiddXCIsIFtcbiAgICAgICAgICBtKFwiLnRvcGJhci1tYWluXCIsXG4gICAgICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5sb2dvXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS5sb2dvW2hyZWY9J2luZGV4Lmh0bWwnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpbWcubG9nby1zbWFsbFthbHQ9JyddW2hlaWdodD0nMjYnXVtzcmM9J2Fzc2V0cy9pbWFnZXMvbG9nb19zbS5wbmcnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImltZy5sb2dvLWxhcmdlW2FsdD0nJ11baGVpZ2h0PScyMiddW3NyYz0nYXNzZXRzL2ltYWdlcy9sb2dvLnBuZyddXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi5tZW51LWV4dHJhcy50b3BiYXItY3VzdG9tXCIsXG4gICAgICAgICAgICAgICAgICBtKFwidWwubGlzdC11bnN0eWxlZC50b3BiYXItcmlnaHQtbWVudS5mbG9hdC1yaWdodC5tYi0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLm1lbnUtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdmJhci10b2dnbGUubmF2LWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubGluZXNcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmRyb3Bkb3duLm5vdGlmaWNhdGlvbi1saXN0LmhpZGUtcGhvbmVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZS53YXZlcy1lZmZlY3QubmF2LXVzZXJbYXJpYS1leHBhbmRlZD0nZmFsc2UnXVthcmlhLWhhc3BvcHVwPSdmYWxzZSddW2RhdGEtdG9nZ2xlPSdkcm9wZG93biddW2hyZWY9JyMnXVtyb2xlPSdidXR0b24nXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWVhcnRoXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFbmdsaXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNoZXZyb24tZG93blwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCIuZHJvcGRvd24tbWVudS5kcm9wZG93bi1tZW51LXJpZ2h0XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFwiU3BhbmlzaFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFwiSXRhbGlhblwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFwiRnJlbmNoXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgXCJSdXNzaWFuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5kcm9wZG93bi5ub3RpZmljYXRpb24tbGlzdFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEubmF2LWxpbmsuZHJvcGRvd24tdG9nZ2xlLmFycm93LW5vbmUud2F2ZXMtZWZmZWN0W2FyaWEtZXhwYW5kZWQ9J2ZhbHNlJ11bYXJpYS1oYXNwb3B1cD0nZmFsc2UnXVtkYXRhLXRvZ2dsZT0nZHJvcGRvd24nXVtocmVmPScjJ11bcm9sZT0nYnV0dG9uJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktYmVsbC5ub3RpLWljb25cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5iYWRnZS5iYWRnZS1kYW5nZXIuYmFkZ2UtcGlsbC5ub3RpLWljb24tYmFkZ2VcIiwgXCI0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgbShcIi5kcm9wZG93bi1tZW51LmRyb3Bkb3duLW1lbnUtcmlnaHQuZHJvcGRvd24tbGdcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcIi5kcm9wZG93bi1pdGVtLm5vdGktdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImg2Lm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW4uZmxvYXQtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFya1tocmVmPScnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGxcIiwgXCJDbGVhciBBbGxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTm90aWZpY2F0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiLnNsaW1zY3JvbGxcIiwgeyBzdHlsZTogeyBcIm1heC1oZWlnaHRcIjogXCIyMzBweFwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6OyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiLm5vdGlmeS1pY29uLmJnLXN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktY29tbWVudC1hY2NvdW50LW91dGxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLm5vdGlmeS1kZXRhaWxzXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2FsZWIgRmxha2VsYXIgY29tbWVudGVkIG9uIEFkbWluXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGwudGV4dC1tdXRlZFwiLCBcIjEgbWluIGFnb1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0udGV4dC1jZW50ZXIudGV4dC1wcmltYXJ5Lm5vdGlmeS1pdGVtLm5vdGlmeS1hbGxbaHJlZj0namF2YXNjcmlwdDo7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZpZXcgYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWFycm93LXJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwibGkuZHJvcGRvd24ubm90aWZpY2F0aW9uLWxpc3RcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZS5hcnJvdy1ub25lLndhdmVzLWVmZmVjdFthcmlhLWV4cGFuZGVkPSdmYWxzZSddW2FyaWEtaGFzcG9wdXA9J2ZhbHNlJ11bZGF0YS10b2dnbGU9J2Ryb3Bkb3duJ11baHJlZj0nIyddW3JvbGU9J2J1dHRvbiddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLXNwZWVjaC1idWJibGUubm90aS1pY29uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW4uYmFkZ2UuYmFkZ2UtZGFyay5iYWRnZS1waWxsLm5vdGktaWNvbi1iYWRnZVwiLCBcIjZcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLW1lbnUuZHJvcGRvd24tbWVudS1yaWdodC5kcm9wZG93bi1sZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLWl0ZW0ubm90aS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaDYubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5mbG9hdC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrW2hyZWY9JyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzbWFsbFwiLCBcIkNsZWFyIEFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDaGF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiLnNsaW1zY3JvbGxcIiwgeyBzdHlsZTogeyBcIm1heC1oZWlnaHRcIjogXCIyMzBweFwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcIi5ub3RpZnktaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImltZy5pbWctZmx1aWQucm91bmRlZC1jaXJjbGVbYWx0PScnXVtzcmM9J2Fzc2V0cy9pbWFnZXMvdXNlcnMvYXZhdGFyLTIuanBnJ11cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLm5vdGlmeS1kZXRhaWxzXCIsIFwiQ3Jpc3RpbmEgUHJpZGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5mb250LTEzLm1iLTAudXNlci1tc2dcIiwgXCJIaSwgSG93IGFyZSB5b3U/IFdoYXQgYWJvdXQgb3VyIG5leHQgbWVldGluZ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcuaW1nLWZsdWlkLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci0zLmpwZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBcIlNhbSBHYXJyZXRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5mb250LTEzLm1iLTAudXNlci1tc2dcIiwgXCJZZWFoIGV2ZXJ5dGhpbmcgaXMgZmluZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcuaW1nLWZsdWlkLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci00LmpwZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBcIkthcmVuIFJvYmluc29uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xMy5tYi0wLnVzZXItbXNnXCIsIFwiV293IHRoYXQncyBncmVhdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcuaW1nLWZsdWlkLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci01LmpwZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBcIlNoZXJyeSBNYXJzaGFsbFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTMubWItMC51c2VyLW1zZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJIaSwgSG93IGFyZSB5b3U/IFdoYXQgYWJvdXQgb3VyIG5leHQgbWVldGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcuaW1nLWZsdWlkLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci02LmpwZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBcIlNoYXduIE1pbGxhcmRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5mb250LTEzLm1iLTAudXNlci1tc2dcIiwgXCJZZWFoIGV2ZXJ5dGhpbmcgaXMgZmluZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLnRleHQtY2VudGVyLnRleHQtcHJpbWFyeS5ub3RpZnktaXRlbS5ub3RpZnktYWxsW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVmlldyBhbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktYXJyb3ctcmlnaHRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5kcm9wZG93bi5ub3RpZmljYXRpb24tbGlzdFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEubmF2LWxpbmsuZHJvcGRvd24tdG9nZ2xlLndhdmVzLWVmZmVjdC5uYXYtdXNlclthcmlhLWV4cGFuZGVkPSdmYWxzZSddW2FyaWEtaGFzcG9wdXA9J2ZhbHNlJ11bZGF0YS10b2dnbGU9J2Ryb3Bkb3duJ11baHJlZj0nIyddW3JvbGU9J2J1dHRvbiddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcucm91bmRlZC1jaXJjbGVbYWx0PSd1c2VyJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci0xLmpwZyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW4ubWwtMS5wcm8tdXNlci1uYW1lXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNYXhpbmUgS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNoZXZyb24tZG93blwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLW1lbnUuZHJvcGRvd24tbWVudS1yaWdodC5wcm9maWxlLWRyb3Bkb3duLlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLWl0ZW0ubm90aS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaDYudGV4dC1vdmVyZmxvdy5tLTBcIiwgXCJXZWxjb21lICFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWhlYWRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiTXkgQWNjb3VudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWNvZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJTZXR0aW5nc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWhlbHBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiU3VwcG9ydFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWxvY2tcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiTG9jayBTY3JlZW5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1wb3dlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJMb2dvdXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLmNsZWFyZml4XCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtKFwiLm5hdmJhci1jdXN0b21cIixcbiAgICAgICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsXG4gICAgICAgICAgICAgIG0oXCJbaWQ9J25hdmlnYXRpb24nXVwiLFxuICAgICAgICAgICAgICAgIG0oXCJ1bC5uYXZpZ2F0aW9uLW1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImxpLmhhcy1zdWJtZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8jIS8nXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuaWNvbi1zcGVlZG9tZXRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBcIkRhc2hib2FyZFwiXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIF0pLFxuICAgICAgbShcIi53cmFwcGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyXCIsXG4gICAgICAgICAgICAgIG0oXCIucGFnZS10aXRsZS1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCIuYnRuLWdyb3VwLnB1bGwtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJvbC5icmVhZGNydW1iLmhpZGUtcGhvbmUucC0wLm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPScjJ11cIiwgXCJIaWdoZG1pblwiKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwibGkuYnJlYWRjcnVtYi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nIyddXCIsIFwiRXh0cmEgUGFnZXNcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbS5hY3RpdmVcIiwgXCJTdGFydGVyXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImg0LnBhZ2UtdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgIFwiU3RhcnRlclwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIG0oXCJmb290ZXIuZm9vdGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyXCIsXG4gICAgICAgICAgbShcIi5yb3dcIiwgbShcIi5jb2wtMTIudGV4dC1jZW50ZXJcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIubWItM1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiaW1nLnJvdW5kZWQtY2lyY2xlLmltZy10aHVtYm5haWwudGh1bWItbGdbYWx0PSd0aHVtYm5haWwnXVtzcmM9J2Fzc2V0cy9pbWFnZXMvdXNlcnMvYXZhdGFyLTUuanBnJ11cIilcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm0tYi0wLmZvbnQtMTRcIiwgXCJFbnRlciB5b3VyIHBhc3N3b3JkIHRvIGFjY2VzcyB0aGUgYWRtaW4uXCIpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcImZvcm0uZm9ybS1ob3Jpem9udGFsW2FjdGlvbj0namF2YXNjcmlwdDo7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvd1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ncGFzc3dvcmQnXVwiLCBcIlBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3Bhc3N3b3JkJ11bcGxhY2Vob2xkZXI9J0VudGVyIHlvdXIgcGFzc3dvcmQnXVtyZXF1aXJlZF1bdHlwZT0ncGFzc3dvcmQnXVwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIiwgXCJMb2cgSW5cIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCIucm93Lm0tdC01MFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tMTIudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJOb3QgeW91PyByZXR1cm5cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubWwtMltocmVmPScvIyEvbG9naW4nXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImJcIiwgXCJTaWduIEluXCIpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmdcIikpXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiZm9ybVthY3Rpb249J2phdmFzY3JpcHQ6OyddW2NsYXNzPScnXVwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAubS1iLTIwLnJvd1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWxhZGRyZXNzJ11cIiwgXCJFbWFpbCBhZGRyZXNzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J2VtYWlsYWRkcmVzcyddW3BsYWNlaG9sZGVyPSdFbnRlciB5b3VyIGVtYWlsJ11bcmVxdWlyZWQ9JyddW3R5cGU9J2VtYWlsJ11cIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1tdXRlZC5wdWxsLXJpZ2h0W2hyZWY9Jy8jIS9yZWNvdmVyLXBhc3N3b3JkJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzbWFsbFwiLCBcIkZvcmdvdCB5b3VyIHBhc3N3b3JkP1wiKVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ncGFzc3dvcmQnXVwiLCBcIlBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3Bhc3N3b3JkJ11bcGxhY2Vob2xkZXI9J0VudGVyIHlvdXIgcGFzc3dvcmQnXVtyZXF1aXJlZD0nJ11bdHlwZT0ncGFzc3dvcmQnXVwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcIi5jaGVja2JveC5jaGVja2JveC1jdXN0b21cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0W2NoZWNrZWQ9JyddW2lkPSdyZW1lbWJlciddW3R5cGU9J2NoZWNrYm94J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdyZW1lbWJlciddXCIsIFwiUmVtZW1iZXIgbWVcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy50ZXh0LWNlbnRlci5tLXQtMTBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU2lnbiBJblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcIi5yb3cubS10LTUwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS0xMi50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIkRvbid0IGhhdmUgYW4gYWNjb3VudD8gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrLm0tbC01W2hyZWY9Jy8jIS9yZWdpc3RlciddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiYlwiLCBcIlNpZ24gVXBcIilcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXIubS1iLTIwXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY2hlY2ttYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInN2Z1tlbmFibGUtYmFja2dyb3VuZD0nbmV3IDAgMCAxNjEuMiAxNjEuMiddW2lkPSdMYXllcl8xJ11bdmVyc2lvbj0nMS4xJ11bdmlld0JveD0nMCAwIDE2MS4yIDE2MS4yJ11beD0nMHB4J11beG1sOnNwYWNlPSdwcmVzZXJ2ZSddW3htbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyddW3htbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ11beT0nMHB4J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGgucGF0aFtkPSdNNDI1LjksNTIuMUw0MjUuOSw1Mi4xYy0yLjItMi42LTYtMi42LTguMy0wLjFsLTQyLjcsNDYuMmwtMTQuMy0xNi40IGMtMi4zLTIuNy02LjItMi43LTguNi0wLjFjLTEuOSwyLjEtMiw1LjYtMC4xLDcuN2wxNy42LDIwLjNjMC4yLDAuMywwLjQsMC42LDAuNiwwLjljMS44LDIsNC40LDIuNSw2LjYsMS40YzAuNy0wLjMsMS40LTAuOCwyLTEuNSBjMC4zLTAuMywwLjUtMC42LDAuNy0wLjlsNDYuMy01MC4xQzQyNy43LDU3LjUsNDI3LjcsNTQuMiw0MjUuOSw1Mi4xeiddW2ZpbGw9J25vbmUnXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJjaXJjbGUucGF0aFtjeD0nODAuNiddW2N5PSc4MC42J11bZmlsbD0nbm9uZSddW3I9JzYyLjEnXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVtzdHJva2Utd2lkdGg9JzQnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwb2x5bGluZS5wYXRoW2ZpbGw9J25vbmUnXVtwb2ludHM9JzExMyw1Mi44IDc0LjEsMTA4LjQgNDguMiw4Ni40ICddW3N0cm9rZT0nIzMyYzg2MSddW3N0cm9rZS1saW5lY2FwPSdyb3VuZCddW3N0cm9rZS1taXRlcmxpbWl0PScxMCddW3N0cm9rZS13aWR0aD0nNiddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImNpcmNsZS5zcGluW2N4PSc4MC42J11bY3k9JzgwLjYnXVtmaWxsPSdub25lJ11bcj0nNzMuOSddW3N0cm9rZT0nIzMyYzg2MSddW3N0cm9rZS1kYXNoYXJyYXk9JzEyLjIxNzUsMTIuMjE3NSddW3N0cm9rZS1taXRlcmxpbWl0PScxMCddW3N0cm9rZS13aWR0aD0nNCddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJoNFwiLCBcIlNlZSBZb3UgQWdhaW4gIVwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xNC5tLXQtMTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBcIllvdSBhcmUgbm93IHN1Y2Nlc3NmdWxseSBzaWduIG91dC4gQmFjayB0b1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubS1yLTVbaHJlZj0nLyMhLyddXCIsIG0oXCJiXCIsIFwiU2lnbiBJblwiKSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmdcIikpXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTEuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJoMS50ZXh0LWVycm9yXCIsIFwiNDA0XCIpLFxuICAgICAgICAgICAgICAgICAgbShcImg0LnRleHQtdXBwZXJjYXNlLnRleHQtZGFuZ2VyLm10LTNcIiwgXCJQYWdlIE5vdCBGb3VuZFwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQubXQtM1wiLCBcIkl0J3MgbG9va2luZyBsaWtlIHlvdSBtYXkgaGF2ZSB0YWtlbiBhIHdyb25nIHR1cm4uIERvbid0IHdvcnJ5Li4uIGl0IGhhcHBlbnMgdG8gdGhlIGJlc3Qgb2YgdXMuIEhlcmUncyBhIGxpdHRsZSB0aXAgdGhhdCBtaWdodCBoZWxwIHlvdSBnZXQgYmFjayBvbiB0cmFjay5cIiksXG4gICAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLW1kLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodC5tdC0zW2hyZWY9Jy8jIS8nXVwiLCBcIlJldHVybiBIb21lXCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmdcIikpXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTEuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcImhlYWRlcltpZD0ndG9wbmF2J11cIiwgW1xuICAgICAgICBtKFwiLnRvcGJhci1tYWluXCIsXG4gICAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIiwgW1xuICAgICAgICAgICAgbShcIi5sb2dvXCIsXG4gICAgICAgICAgICAgIG0oXCJhLmxvZ29baHJlZj0naW5kZXguaHRtbCddXCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaW1nLmxvZ28tc21hbGxbYWx0PScnXVtoZWlnaHQ9JzI2J11bc3JjPSdhc3NldHMvaW1hZ2VzL2xvZ29fc20ucG5nJ11cIiksXG4gICAgICAgICAgICAgICAgbShcImltZy5sb2dvLWxhcmdlW2FsdD0nJ11baGVpZ2h0PScyMiddW3NyYz0nYXNzZXRzL2ltYWdlcy9sb2dvLnBuZyddXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbShcIi5tZW51LWV4dHJhcy50b3BiYXItY3VzdG9tXCIsXG4gICAgICAgICAgICAgIG0oXCJ1bC5saXN0LXVuc3R5bGVkLnRvcGJhci1yaWdodC1tZW51LmZsb2F0LXJpZ2h0Lm1iLTBcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJsaS5tZW51LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdmJhci10b2dnbGUubmF2LWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5saW5lc1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJsaS5kcm9wZG93bi5ub3RpZmljYXRpb24tbGlzdC5oaWRlLXBob25lXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJhLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZS53YXZlcy1lZmZlY3QubmF2LXVzZXJbYXJpYS1leHBhbmRlZD0nZmFsc2UnXVthcmlhLWhhc3BvcHVwPSdmYWxzZSddW2RhdGEtdG9nZ2xlPSdkcm9wZG93biddW2hyZWY9JyMnXVtyb2xlPSdidXR0b24nXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktZWFydGhcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiRW5nbGlzaFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNoZXZyb24tZG93blwiKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLW1lbnUuZHJvcGRvd24tbWVudS1yaWdodFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFwiU3BhbmlzaFwiKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgXCJJdGFsaWFuXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBcIkZyZW5jaFwiKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgXCJSdXNzaWFuXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCJsaS5kcm9wZG93bi5ub3RpZmljYXRpb24tbGlzdFwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiYS5uYXYtbGluay5kcm9wZG93bi10b2dnbGUuYXJyb3ctbm9uZS53YXZlcy1lZmZlY3RbYXJpYS1leHBhbmRlZD0nZmFsc2UnXVthcmlhLWhhc3BvcHVwPSdmYWxzZSddW2RhdGEtdG9nZ2xlPSdkcm9wZG93biddW2hyZWY9JyMnXVtyb2xlPSdidXR0b24nXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWJlbGwubm90aS1pY29uXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5iYWRnZS5iYWRnZS1kYW5nZXIuYmFkZ2UtcGlsbC5ub3RpLWljb24tYmFkZ2VcIiwgXCI0XCIpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZHJvcGRvd24tbWVudS5kcm9wZG93bi1tZW51LXJpZ2h0LmRyb3Bkb3duLWxnXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcIi5kcm9wZG93bi1pdGVtLm5vdGktdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaDYubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuLmZsb2F0LXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFya1tocmVmPScnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzbWFsbFwiLCBcIkNsZWFyIEFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3RpZmljYXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuc2xpbXNjcm9sbFwiLCB7IHN0eWxlOiB7IFwibWF4LWhlaWdodFwiOiBcIjIzMHB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcIi5ub3RpZnktaWNvbi5iZy1zdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktY29tbWVudC1hY2NvdW50LW91dGxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2FsZWIgRmxha2VsYXIgY29tbWVudGVkIG9uIEFkbWluXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJzbWFsbC50ZXh0LW11dGVkXCIsIFwiMSBtaW4gYWdvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb24uYmctaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWFjY291bnQtcGx1c1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLm5vdGlmeS1kZXRhaWxzXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOZXcgdXNlciByZWdpc3RlcmVkLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGwudGV4dC1tdXRlZFwiLCBcIjUgaG91cnMgYWdvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb24uYmctZGFuZ2VyXCIsIG0oXCJpLm1kaS5tZGktaGVhcnRcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubm90aWZ5LWRldGFpbHNcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNhcmxvcyBDcm91Y2ggbGlrZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImJcIiwgXCJBZG1pblwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNtYWxsLnRleHQtbXV0ZWRcIiwgXCIzIGRheXMgYWdvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb24uYmctd2FybmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNvbW1lbnQtYWNjb3VudC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubm90aWZ5LWRldGFpbHNcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNhbGViIEZsYWtlbGFyIGNvbW1lbnRlZCBvbiBBZG1pblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGwudGV4dC1tdXRlZFwiLCBcIjQgZGF5cyBhZ29cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcIi5ub3RpZnktaWNvbi5iZy1wdXJwbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImkubWRpLm1kaS1hY2NvdW50LXBsdXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmV3IHVzZXIgcmVnaXN0ZXJlZC5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcInNtYWxsLnRleHQtbXV0ZWRcIiwgXCI3IGRheXMgYWdvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb24uYmctY3VzdG9tXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktaGVhcnRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2FybG9zIENyb3VjaCBsaWtlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYlwiLCBcIkFkbWluXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGwudGV4dC1tdXRlZFwiLCBcIjEzIGRheXMgYWdvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLnRleHQtY2VudGVyLnRleHQtcHJpbWFyeS5ub3RpZnktaXRlbS5ub3RpZnktYWxsW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJWaWV3IGFsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWFycm93LXJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCJsaS5kcm9wZG93bi5ub3RpZmljYXRpb24tbGlzdFwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiYS5uYXYtbGluay5kcm9wZG93bi10b2dnbGUuYXJyb3ctbm9uZS53YXZlcy1lZmZlY3RbYXJpYS1leHBhbmRlZD0nZmFsc2UnXVthcmlhLWhhc3BvcHVwPSdmYWxzZSddW2RhdGEtdG9nZ2xlPSdkcm9wZG93biddW2hyZWY9JyMnXVtyb2xlPSdidXR0b24nXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLXNwZWVjaC1idWJibGUubm90aS1pY29uXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5iYWRnZS5iYWRnZS1kYXJrLmJhZGdlLXBpbGwubm90aS1pY29uLWJhZGdlXCIsIFwiNlwiKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLW1lbnUuZHJvcGRvd24tbWVudS1yaWdodC5kcm9wZG93bi1sZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuZHJvcGRvd24taXRlbS5ub3RpLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImg2Lm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5mbG9hdC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmtbaHJlZj0nJ11cIiwgbShcInNtYWxsXCIsIFwiQ2xlYXIgQWxsXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2hhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcIi5zbGltc2Nyb2xsXCIsIHsgc3R5bGU6IHsgXCJtYXgtaGVpZ2h0XCI6IFwiMjMwcHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiLm5vdGlmeS1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcuaW1nLWZsdWlkLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci0yLmpwZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubm90aWZ5LWRldGFpbHNcIiwgXCJDcmlzdGluYSBQcmlkZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xMy5tYi0wLnVzZXItbXNnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiSGksIEhvdyBhcmUgeW91PyBXaGF0IGFib3V0IG91ciBuZXh0IG1lZXRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCIubm90aWZ5LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImltZy5pbWctZmx1aWQucm91bmRlZC1jaXJjbGVbYWx0PScnXVtzcmM9J2Fzc2V0cy9pbWFnZXMvdXNlcnMvYXZhdGFyLTMuanBnJ11cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicC5ub3RpZnktZGV0YWlsc1wiLCBcIlNhbSBHYXJyZXRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTMubWItMC51c2VyLW1zZ1wiLCBcIlllYWggZXZlcnl0aGluZyBpcyBmaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcIi5ub3RpZnktaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiaW1nLmltZy1mbHVpZC5yb3VuZGVkLWNpcmNsZVthbHQ9JyddW3NyYz0nYXNzZXRzL2ltYWdlcy91c2Vycy9hdmF0YXItNC5qcGcnXVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLm5vdGlmeS1kZXRhaWxzXCIsIFwiS2FyZW4gUm9iaW5zb25cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTMubWItMC51c2VyLW1zZ1wiLCBcIldvdyB0aGF0J3MgZ3JlYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiLm5vdGlmeS1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcuaW1nLWZsdWlkLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci01LmpwZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubm90aWZ5LWRldGFpbHNcIiwgXCJTaGVycnkgTWFyc2hhbGxcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTMubWItMC51c2VyLW1zZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkhpLCBIb3cgYXJlIHlvdT8gV2hhdCBhYm91dCBvdXIgbmV4dCBtZWV0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiLm5vdGlmeS1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWcuaW1nLWZsdWlkLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11bc3JjPSdhc3NldHMvaW1hZ2VzL3VzZXJzL2F2YXRhci02LmpwZyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAubm90aWZ5LWRldGFpbHNcIiwgXCJTaGF3biBNaWxsYXJkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5mb250LTEzLm1iLTAudXNlci1tc2dcIiwgXCJZZWFoIGV2ZXJ5dGhpbmcgaXMgZmluZVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLnRleHQtY2VudGVyLnRleHQtcHJpbWFyeS5ub3RpZnktaXRlbS5ub3RpZnktYWxsW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJWaWV3IGFsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWFycm93LXJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCJsaS5kcm9wZG93bi5ub3RpZmljYXRpb24tbGlzdFwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiYS5uYXYtbGluay5kcm9wZG93bi10b2dnbGUud2F2ZXMtZWZmZWN0Lm5hdi11c2VyW2FyaWEtZXhwYW5kZWQ9J2ZhbHNlJ11bYXJpYS1oYXNwb3B1cD0nZmFsc2UnXVtkYXRhLXRvZ2dsZT0nZHJvcGRvd24nXVtocmVmPScjJ11bcm9sZT0nYnV0dG9uJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiaW1nLnJvdW5kZWQtY2lyY2xlW2FsdD0ndXNlciddW3NyYz0nYXNzZXRzL2ltYWdlcy91c2Vycy9hdmF0YXItMS5qcGcnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW4ubWwtMS5wcm8tdXNlci1uYW1lXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIk1heGluZSBLXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkubWRpLm1kaS1jaGV2cm9uLWRvd25cIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcIi5kcm9wZG93bi1tZW51LmRyb3Bkb3duLW1lbnUtcmlnaHQucHJvZmlsZS1kcm9wZG93bi5cIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLWl0ZW0ubm90aS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJoNi50ZXh0LW92ZXJmbG93Lm0tMFwiLCBcIldlbGNvbWUgIVwiKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktaGVhZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBcIk15IEFjY291bnRcIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0namF2YXNjcmlwdDp2b2lkKDApOyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1jb2dcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJTZXR0aW5nc1wiKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWhlbHBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJTdXBwb3J0XCIpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktbG9ja1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBcIkxvY2sgU2NyZWVuXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktcG93ZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJMb2dvdXRcIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtKFwiLmNsZWFyZml4XCIpXG4gICAgICAgICAgXSlcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5uYXZiYXItY3VzdG9tXCIsXG4gICAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIixcbiAgICAgICAgICAgIG0oXCJbaWQ9J25hdmlnYXRpb24nXVwiLFxuICAgICAgICAgICAgICBtKFwidWwubmF2aWdhdGlvbi1tZW51XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwibGkuaGFzLXN1Ym1lbnVcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2luZGV4Lmh0bWwnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLmljb24tc3BlZWRvbWV0ZXJcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiRGFzaGJvYXJkXCJcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwibGkuaGFzLXN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nIyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImkuaWNvbi1sYXllcnNcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiQXBwc1wiXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJ1bC5zdWJtZW51XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nYXBwcy1jYWxlbmRhci5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2FsZW5kYXJcIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nYXBwcy10aWNrZXRzLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUaWNrZXRzXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2FwcHMtdGFza2JvYXJkLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUYXNrIEJvYXJkXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2FwcHMtdGFzay1kZXRhaWwuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRhc2sgRGV0YWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2FwcHMtY29udGFjdHMuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRhY3RzXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2FwcHMtcHJvamVjdHMuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlByb2plY3RzXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2FwcHMtY29tcGFuaWVzLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb21wYW5pZXNcIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nYXBwcy1maWxlLW1hbmFnZXIuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkZpbGUgTWFuYWdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCJsaS5oYXMtc3VibWVudVwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPScjJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiaS5pY29uLWJyaWVmY2FzZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJVSSBFbGVtZW50c1wiXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJ1bC5zdWJtZW51Lm1lZ2FtZW51XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInVsXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSd1aS10eXBvZ3JhcGh5Lmh0bWwnXVwiLCBcIlR5cG9ncmFwaHlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndWktY2FyZHMuaHRtbCddXCIsIFwiQ2FyZHNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndWktYnV0dG9ucy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkJ1dHRvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3VpLW1vZGFscy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1vZGFsc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndWktc3Bpbm5lcnMuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTcGlubmVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidWxcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsIG0oXCJhW2hyZWY9J3VpLXJpYmJvbnMuaHRtbCddXCIsIFwiUmliYm9uc1wiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIiwgbShcImFbaHJlZj0ndWktdG9vbHRpcHMtcG9wb3ZlcnMuaHRtbCddXCIsIFwiVG9vbHRpcHMgJiBQb3BvdmVyXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLCBtKFwiYVtocmVmPSd1aS1jaGVja2JveC1yYWRpby5odG1sJ11cIiwgXCJDaGVja2JveHMtUmFkaW9zXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLCBtKFwiYVtocmVmPSd1aS10YWJzLmh0bWwnXVwiLCBcIlRhYnNcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsIG0oXCJhW2hyZWY9J3VpLXByb2dyZXNzYmFycy5odG1sJ11cIiwgXCJQcm9ncmVzcyBCYXJzXCIpKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJ1bFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndWktbm90aWZpY2F0aW9ucy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk5vdGlmaWNhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndWktZ3JpZC5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3VpLXN3ZWV0LWFsZXJ0Lmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU3dlZXQgQWxlcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3VpLWJvb3RzdHJhcC5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkJvb3RzdHJhcCBVSVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndWktcmFuZ2Utc2xpZGVyLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmFuZ2UgU2xpZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcImxpLmhhcy1zdWJtZW51XCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9JyMnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLmljb24tZmlyZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJDb21wb25lbnRzXCJcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcInVsLnN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwibGkuaGFzLXN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9JyMnXVwiLCBcIkVtYWlsXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJ1bC5zdWJtZW51XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdlbWFpbC1pbmJveC5odG1sJ11cIiwgXCJJbmJveFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdlbWFpbC1yZWFkLmh0bWwnXVwiLCBcIlJlYWQgRW1haWxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nZW1haWwtY29tcG9zZS5odG1sJ11cIiwgXCJDb21wb3NlIEVtYWlsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3dpZGdldHMuaHRtbCddXCIsIFwiV2lkZ2V0c1wiKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwibGkuaGFzLXN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9JyMnXVwiLCBcIkNoYXJ0c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidWwuc3VibWVudVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nY2hhcnQtZmxvdC5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZsb3QgQ2hhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2NoYXJ0LW1vcnJpcy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1vcnJpcyBDaGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nY2hhcnQtZ29vZ2xlLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29vZ2xlIENoYXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdjaGFydC1jaGFydGlzdC5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNoYXJ0aXN0IENoYXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdjaGFydC1jaGFydGpzLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2hhcnRqcyBDaGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nY2hhcnQtc3BhcmtsaW5lLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU3BhcmtsaW5lIENoYXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdjaGFydC1rbm9iLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSnF1ZXJ5IEtub2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5oYXMtc3VibWVudVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nIyddXCIsIFwiRm9ybXNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInVsLnN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2Zvcm0tZWxlbWVudHMuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGb3JtIEVsZW1lbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdmb3JtLWFkdmFuY2VkLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRm9ybSBBZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nZm9ybS12YWxpZGF0aW9uLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRm9ybSBWYWxpZGF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdmb3JtLXBpY2tlcnMuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGb3JtIFBpY2tlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2Zvcm0td2l6YXJkLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRm9ybSBXaXphcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2Zvcm0tbWFzay5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZvcm0gTWFza3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2Zvcm0tc3VtbWVybm90ZS5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlN1bW1lcm5vdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2Zvcm0td3lzaXdpZy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIld5c2l3aWcgRWRpdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nZm9ybS14LWVkaXRhYmxlLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiWCBFZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nZm9ybS11cGxvYWRzLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTXVsdGlwbGUgRmlsZSBVcGxvYWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5oYXMtc3VibWVudVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nIyddXCIsIFwiSWNvbnNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInVsLnN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2ljb25zLW1hdGVyaWFsZGVzaWduLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTWF0ZXJpYWwgRGVzaWduXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdpY29ucy1kcmlwaWNvbnMuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEcmlwaWNvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2ljb25zLWZvbnRhd2Vzb21lLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRm9udCBhd2Vzb21lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdpY29ucy1mZWF0aGVyLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRmVhdGhlciBJY29uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0naWNvbnMtc2ltcGxlbGluZS5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNpbXBsZSBMaW5lIEljb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwibGkuaGFzLXN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9JyMnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUYWJsZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInVsLnN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3RhYmxlcy1iYXNpYy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkJhc2ljIFRhYmxlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndGFibGVzLWRhdGF0YWJsZS5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRhdGEgVGFibGVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSd0YWJsZXMtcmVzcG9uc2l2ZS5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlc3BvbnNpdmUgVGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3RhYmxlcy10YWJsZXNhdy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRhYmxlc2F3IFRhYmxlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ndGFibGVzLWZvby5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZvbyBUYWJsZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5oYXMtc3VibWVudVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nIyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk1hcHNcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInVsLnN1Ym1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J21hcHMtZ29vZ2xlLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29vZ2xlIE1hcHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J21hcHMtdmVjdG9yLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVmVjdG9yIE1hcHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J21hcHMtbWFwYWVsLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTWFwYWVsIE1hcHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcImxpLmhhcy1zdWJtZW51XCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9JyMnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLmljb24tZG9jc1wiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJQYWdlc1wiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcInVsLnN1Ym1lbnUubWVnYW1lbnVcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidWxcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3BhZ2Utc3RhcnRlci5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlN0YXJ0ZXIgUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ncGFnZS1sb2dpbi5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvZ2luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdwYWdlLXJlZ2lzdGVyLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVnaXN0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3BhZ2UtbG9nb3V0Lmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nb3V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdwYWdlLXJlY292ZXJwdy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlY292ZXIgUGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3BhZ2UtbG9jay1zY3JlZW4uaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvY2sgU2NyZWVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J3BhZ2UtY29uZmlybS1tYWlsLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb25maXJtIE1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ncGFnZS00MDQuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVycm9yIDQwNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdwYWdlLTQwNC1hbHQuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVycm9yIDQwNC1hbHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0ncGFnZS01MDAuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVycm9yIDUwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCJsaS5oYXMtc3VibWVudVwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPScjJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiaS5pY29uLXByZXNlbnRcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiRXh0cmEgUGFnZXNcIlxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwidWwuc3VibWVudS5tZWdhbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nZXh0cmFzLXRpbWVsaW5lLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRpbWVsaW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nZXh0cmFzLXByb2ZpbGUuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2V4dHJhcy1pbnZvaWNlLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkludm9pY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdleHRyYXMtZmFxLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZBUVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2V4dHJhcy1wcmljaW5nLmh0bWwnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlByaWNpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdleHRyYXMtZW1haWwtdGVtcGxhdGUuaHRtbCddXCIsIFwiRW1haWwgVGVtcGxhdGVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidWxcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdleHRyYXMtcmF0aW5ncy5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmF0aW5nc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPSdleHRyYXMtc2VhcmNoLXJlc3VsdHMuaHRtbCddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNlYXJjaCBSZXN1bHRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2V4dHJhcy1nYWxsZXJ5Lmh0bWwnXVwiLCBcIkdhbGxlcnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nZXh0cmFzLW1haW50ZW5hbmNlLmh0bWwnXVwiLCBcIk1haW50ZW5hbmNlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9J2V4dHJhcy1jb21pbmctc29vbi5odG1sJ11cIiwgXCJDb21pbmcgU29vblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBtKFwiLndyYXBwZXJcIixcbiAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIiwgW1xuICAgICAgICAgIG0oXCIucm93XCIsXG4gICAgICAgICAgICBtKFwiLmNvbC1zbS0xMlwiLFxuICAgICAgICAgICAgICBtKFwiLnBhZ2UtdGl0bGUtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLmJ0bi1ncm91cC5wdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICBtKFwib2wuYnJlYWRjcnVtYi5oaWRlLXBob25lLnAtMC5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwibGkuYnJlYWRjcnVtYi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImFbaHJlZj0nIyddXCIsIFwiSGlnaGRtaW5cIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9JyMnXVwiLCBcIlBhZ2VzXCIpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW0uYWN0aXZlXCIsIFwiRXJyb3IgNDA0XCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImg0LnBhZ2UtdGl0bGVcIiwgXCJFcnJvciA0MDRcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIG0oXCIucm93XCIsXG4gICAgICAgICAgICBtKFwiLmNvbC1zbS02Lm9mZnNldC0zXCIsXG4gICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXIubXQtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgxLnRleHQtZXJyb3JcIiwgXCI0MDRcIiksXG4gICAgICAgICAgICAgICAgbShcImg0LnRleHQtdXBwZXJjYXNlLnRleHQtZGFuZ2VyLm10LTNcIiwgXCJQYWdlIE5vdCBGb3VuZFwiKSxcbiAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm10LTNcIixcbiAgICAgICAgICAgICAgICAgIFwiSXQncyBsb29raW5nIGxpa2UgeW91IG1heSBoYXZlIHRha2VuIGEgd3JvbmcgdHVybi4gRG9uJ3Qgd29ycnkuLi4gaXRcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBlbnMgdG8gdGhlIGJlc3Qgb2YgdXMuIEhlcmUncyBhXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXR0bGUgdGlwIHRoYXQgbWlnaHQgaGVscCB5b3UgZ2V0IGJhY2sgb24gdHJhY2suXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubXQtM1tocmVmPSdpbmRleC5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgIFwiUmV0dXJuIEhvbWVcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgICAgbShcImZvb3Rlci5mb290ZXJcIixcbiAgICAgICAgbShcIi5jb250YWluZXJcIixcbiAgICAgICAgICBtKFwiLnJvd1wiLCBtKFwiLmNvbC0xMi50ZXh0LWNlbnRlclwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgICApXG4gICAgICApXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXIubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm0tYi0wXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRW50ZXIgeW91ciBlbWFpbCBhZGRyZXNzIGFuZCB3ZSdsbCBzZW5kIHlvdSBhbiBlbWFpbCB3aXRoIGluc3RydWN0aW9ucyB0byByZXNldCB5b3VyIHBhc3N3b3JkLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiZm9ybS5mb3JtLWhvcml6b250YWxbYWN0aW9uPSdqYXZhc2NyaXB0OjsnXVwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWxhZGRyZXNzJ11cIiwgXCJFbWFpbCBhZGRyZXNzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J2VtYWlsYWRkcmVzcyddW3BsYWNlaG9sZGVyPSdlLmcuIGpvc2VAcml6YWwuY29tJ11bcmVxdWlyZWRdW3R5cGU9J2VtYWlsJ11cIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93LnRleHQtY2VudGVyLm0tdC0xMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJidXR0b24uYnRuLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodFt0eXBlPSdzdWJtaXQnXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXNldCBQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcIi5yb3cubS10LTUwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS0xMi50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIkJhY2sgdG8gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrLm0tbC01W2hyZWY9Jy8jIS9sb2dpbiddXCIsIG0oXCJiXCIsIFwiU2lnbiBJblwiKSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtIGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBcInN0eWxlcy9hcHBcIjtcbmltcG9ydCBcInN0eWxlcy9pY29uc1wiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmQtaW1hZ2VcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8jIS8nXVwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBtKFwiaW1nW2FsdD0nbG9nbyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJmb3JtLmZvcm0taG9yaXpvbnRhbFthY3Rpb249J2phdmFzY3JpcHQ6OyddXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSd1c2VybmFtZSddXCIsIFwiRnVsbCBOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3VzZXJuYW1lJ11bcGxhY2Vob2xkZXI9J2UuZy4gSm9zZSBSaXphbCddW3JlcXVpcmVkXVt0eXBlPSd0ZXh0J11cIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWwnXVwiLCBcIkVtYWlsIGFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0nZW1haWwnXVtwbGFjZWhvbGRlcj0nZS5nLiBqb3NlQHJpemFsLmNvbSddW3JlcXVpcmVkXVt0eXBlPSdlbWFpbCddXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJsYWJlbFtmb3I9J3Bhc3N3b3JkJ11cIiwgXCJQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXQuZm9ybS1jb250cm9sW2lkPSdwYXNzd29yZCddW3BsYWNlaG9sZGVyPSdFbnRlciB5b3VyIHBhc3N3b3JkJ11bcmVxdWlyZWRdW3R5cGU9J3Bhc3N3b3JkJ11cIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCIuY2hlY2tib3guY2hlY2tib3gtY3VzdG9tXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dFtjaGVja2VkPScnXVtpZD0ncmVtZW1iZXInXVt0eXBlPSdjaGVja2JveCddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ncmVtZW1iZXInXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiSSBhY2NlcHQgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtY3VzdG9tW2hyZWY9Jy8jIS90ZXJtcy1hbmQtY29uZGl0aW9ucyddXCIsIFwiVGVybXMgYW5kIENvbmRpdGlvbnNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cudGV4dC1jZW50ZXIubS10LTEwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImJ1dHRvbi5idG4uYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0W3R5cGU9J3N1Ym1pdCddXCIsIFwiU2lnbiBVcCBGcmVlXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtKFwiLnJvdy5tLXQtNTBcIixcbiAgICAgICAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIFwiQWxyZWFkeSBoYXZlIGFuIGFjY291bnQ/IFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tLWwtNVtocmVmPScvIyEvbG9naW4nXVwiLCBtKFwiYlwiLCBcIlNpZ24gSW5cIikpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIiwgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgXCIyMDE4IMKpIFNtYXJ0ZnVuZGluZ1wiKSlcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvIyEvJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImgxLnRleHQtZXJyb3JcIiwgXCI1MDBcIiksXG4gICAgICAgICAgICAgICAgICBtKFwiaDQudGV4dC11cHBlcmNhc2UudGV4dC1kYW5nZXIubXQtM1wiLCBcIkludGVybmFsIFNlcnZlciBFcnJvclwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQubXQtM1wiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiV2h5IG5vdCB0cnkgcmVmcmVzaGluZyB5b3VyIHBhZ2U/IG9yIHlvdSBjYW4gY29udGFjdFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmtbaHJlZj0nLyMhL3N1cHBvcnQnXVwiLCBtKFwiYlwiLCBcIlN1cHBvcnRcIikpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0Lm10LTNbaHJlZj0nLyMhLyddXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUmV0dXJuIEhvbWVcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLCBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBcIjIwMTggwqkgU21hcnRGdW5kaW5nXCIpKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtIGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBob21lIGZyb20gXCJjb21wb25lbnRzL2hvbWVcIjtcbmltcG9ydCByZWdpc3RlciBmcm9tIFwiY29tcG9uZW50cy9yZWdpc3RlclwiO1xuaW1wb3J0IGxvZ2luIGZyb20gXCJjb21wb25lbnRzL2xvZ2luXCI7XG5pbXBvcnQgbG9nb3V0IGZyb20gXCJjb21wb25lbnRzL2xvZ291dFwiO1xuaW1wb3J0IGxvY2tTY3JlZW4gZnJvbSBcImNvbXBvbmVudHMvbG9ja19zY3JlZW5cIjtcbmltcG9ydCBjb25maXJtTWFpbCBmcm9tIFwiY29tcG9uZW50cy9jb25maXJtX21haWxcIjtcbmltcG9ydCByZWNvdmVyUGFzc3dvcmQgZnJvbSBcImNvbXBvbmVudHMvcmVjb3Zlcl9wYXNzd29yZFwiO1xuaW1wb3J0IG5vdEZvdW5kIGZyb20gXCJjb21wb25lbnRzL25vdF9mb3VuZFwiO1xuaW1wb3J0IG5vdEZvdW5kQWx0IGZyb20gXCJjb21wb25lbnRzL25vdF9mb3VuZF9hbHRcIjtcbmltcG9ydCBzZXJ2ZXJFcnJvciBmcm9tIFwiY29tcG9uZW50cy9zZXJ2ZXJfZXJyb3JcIjtcblxuZnVuY3Rpb24gTWVtYmVyUm91dGVyKCkge1xuICBkb2N1bWVudC5ib2R5LmlkID0gXCJtZW1iZXJcIjtcbiAgbS5yb3V0ZShkb2N1bWVudC5ib2R5LCBcIi9cIiwge1xuICAgIFwiL1wiOiBob21lLFxuICAgIFwiL3NlcnZlci1lcnJvclwiOiBzZXJ2ZXJFcnJvcixcbiAgICBcIi86YW55Li4uXCI6IG5vdEZvdW5kQWx0XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBBbm9ueW1vdXNSb3V0ZXIoKSB7XG4gIGRvY3VtZW50LmJvZHkuaWQgPSBcImFub255bW91c1wiO1xuICBtLnJvdXRlKGRvY3VtZW50LmJvZHksIFwiL1wiLCB7XG4gICAgXCIvXCI6IGhvbWUsXG4gICAgXCIvcmVnaXN0ZXJcIjogcmVnaXN0ZXIsXG4gICAgXCIvbG9naW5cIjogbG9naW4sXG4gICAgXCIvbG9nb3V0XCI6IGxvZ291dCxcbiAgICBcIi9sb2NrLXNjcmVlblwiOiBsb2NrU2NyZWVuLFxuICAgIFwiL2NvbmZpcm0tbWFpbFwiOiBjb25maXJtTWFpbCxcbiAgICBcIi9yZWNvdmVyLXBhc3N3b3JkXCI6IHJlY292ZXJQYXNzd29yZCxcbiAgICBcIi9zZXJ2ZXItZXJyb3JcIjogc2VydmVyRXJyb3IsXG4gICAgXCIvOmFueS4uLlwiOiBub3RGb3VuZFxuICB9KTtcbn1cblxuQW5vbnltb3VzUm91dGVyKCk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9