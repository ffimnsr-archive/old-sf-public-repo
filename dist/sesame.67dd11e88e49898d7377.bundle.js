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

/***/ "./images/users/avatar-5.jpg":
/*!***********************************!*\
  !*** ./images/users/avatar-5.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "images/avatar-5.jpg";

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
__webpack_require__(/*! datatables.net */ "./node_modules/datatables.net/js/jquery.dataTables.js");
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(header_1.default),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", [
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                    mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/']", { oncreate: mithril_1.default.route.link }, "SmartFunding")),
                        mithril_1.default("li.breadcrumb-item.active", "Admin Dashboard")
                    ])),
                    mithril_1.default("h4.page-title", "Admin Dashboard")
                ]))),
                mithril_1.default(".row.text-center", [
                    mithril_1.default(".col-sm-6.col-lg-6.col-xl-3", mithril_1.default(".card-box.widget-flat.border-custom.bg-custom.text-white", [
                        mithril_1.default("i.fi-tag"),
                        mithril_1.default("h3.m-b-10", "25563"),
                        mithril_1.default("p.text-uppercase.m-b-5.font-13.font-600", "Total Investors")
                    ])),
                    mithril_1.default(".col-sm-6.col-lg-6.col-xl-3", mithril_1.default(".card-box.bg-primary.widget-flat.border-primary.text-white", [
                        mithril_1.default("i.fi-archive"),
                        mithril_1.default("h3.m-b-10", "6952"),
                        mithril_1.default("p.text-uppercase.m-b-5.font-13.font-600", "Pending Investors")
                    ])),
                    mithril_1.default(".col-sm-6.col-lg-6.col-xl-3", mithril_1.default(".card-box.widget-flat.border-success.bg-success.text-white", [
                        mithril_1.default("i.fi-help"),
                        mithril_1.default("h3.m-b-10", "18361"),
                        mithril_1.default("p.text-uppercase.m-b-5.font-13.font-600", "Total Borrowers")
                    ])),
                    mithril_1.default(".col-sm-6.col-lg-6.col-xl-3", mithril_1.default(".card-box.bg-danger.widget-flat.border-danger.text-white", [
                        mithril_1.default("i.fi-delete"),
                        mithril_1.default("h3.m-b-10", "250"),
                        mithril_1.default("p.text-uppercase.m-b-5.font-13.font-600", "Pending Borrowers")
                    ]))
                ]),
                mithril_1.default(".row", mithril_1.default(".col-12", mithril_1.default(".card-box.table-responsive", [
                    mithril_1.default("h4.m-t-0.header-title", "Borrowers/ Investors"),
                    mithril_1.default("p.text-muted.font-14.m-b-30", [
                        "List of all investors and borrowers."
                    ]),
                    mithril_1.default("table.table.table-bordered[id='datatable']", [
                        mithril_1.default("thead", mithril_1.default("tr", [
                            mithril_1.default("th", "Name"),
                            mithril_1.default("th", "Position"),
                            mithril_1.default("th", "Office"),
                            mithril_1.default("th", "Age"),
                            mithril_1.default("th", "Start date"),
                            mithril_1.default("th", "Salary")
                        ])),
                        mithril_1.default("tbody", [
                            mithril_1.default("tr", [
                                mithril_1.default("td", "Anonymous User"),
                                mithril_1.default("td", "System Architect"),
                                mithril_1.default("td", "Edinburgh"),
                                mithril_1.default("td", "61"),
                                mithril_1.default("td", "2011/04/25"),
                                mithril_1.default("td", "$320,800")
                            ]),
                        ])
                    ])
                ])))
            ])),
            mithril_1.default(footer_1.default)
        ]);
    }
};


/***/ }),

/***/ "./src/components/admin/login.ts":
/*!***************************************!*\
  !*** ./src/components/admin/login.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var configs_1 = __webpack_require__(/*! configs */ "./src/configs/index.ts");
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
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
                            mithril_1.default("a.text-muted.pull-right[href='/recover-password']", { oncreate: mithril_1.default.route.link }, mithril_1.default("small", "Forgot your password?")),
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
                        mithril_1.default("a.text-dark.m-l-5[href='/register']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Sign Up"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/admin/logout.ts":
/*!****************************************!*\
  !*** ./src/components/admin/logout.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
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
                            mithril_1.default("a.text-dark.m-r-5[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Sign In"))
                        ])
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/confirm_mail_recover.ts":
/*!************************************************!*\
  !*** ./src/components/confirm_mail_recover.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
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
                            ". Please check for an email from SmartFunding and click on the included link to reset your password."
                        ]),
                        mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/']", { oncreate: mithril_1.default.route.link }, "Back to Home")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/confirm_mail_register.ts":
/*!*************************************************!*\
  !*** ./src/components/confirm_mail_register.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
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
                        mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/']", { oncreate: mithril_1.default.route.link }, "Back to Home")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/frequently_ask.ts":
/*!******************************************!*\
  !*** ./src/components/frequently_ask.ts ***!
  \******************************************/
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
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(header_1.default),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", [
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                    mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/']", { oncreate: mithril_1.default.route.link }, "SmartFunding")),
                        mithril_1.default("li.breadcrumb-item.active", "FAQ")
                    ])),
                    mithril_1.default("h4.page-title", "FAQ")
                ]))),
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".text-center", [
                    mithril_1.default("h3[class='']", "Frequently Asked Questions"),
                    mithril_1.default("p.text-muted", [
                        "Here you can find the most frequently ask question. If you can't find your answer here",
                        mithril_1.default("br"),
                        "you can contact us by any means using the links below:"
                    ]),
                    mithril_1.default("button.btn.btn-success.waves-effect.waves-light.m-t-10[type='button']", "Email us your question"),
                    " ",
                    mithril_1.default("button.btn.btn-primary.waves-effect.waves-light.m-t-10[type='button']", "Send us a tweet")
                ]))),
                mithril_1.default(".row.m-t-50.pt-3", [
                    mithril_1.default(".col-lg-5.offset-lg-1", [
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question[data-wow-delay='.1s']", "I want to change my SmartFunding account details. How do I do this? ?"),
                            mithril_1.default("p.answer", "The best way at the moment is to send an email to hi@smartfunding.sg. We are implementing more features on our platform over time, so you will be able to change your basic profile there as well.")
                        ]),
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question", "I forgot my SmartFunding account password. How do I retrieve and/or change it?"),
                            mithril_1.default("p.answer", "You can change it by clicking on \"Forgot your password\" on the login page. You will receive an email to reset your password after.")
                        ]),
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question", "I want to close my SmartFunding account. How do I go about doing it?"),
                            mithril_1.default("p.answer", "You can send an email to hi@smartfunding.sg with your name and Investor ID and we will close the account for you.")
                        ]),
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question[data-wow-delay='.1s']", "Can I own multiple SmartFunding accounts?"),
                            mithril_1.default("p.answer", "No, you can currently only own one investor account and one borrower account with SmartFunding each.")
                        ])
                    ]),
                    mithril_1.default(".col-lg-5", [
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question", "Is safe use Lorem Ipsum?"),
                            mithril_1.default("p.answer", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.")
                        ]),
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question", "When can be used?"),
                            mithril_1.default("p.answer", "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete.")
                        ]),
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question", [
                                "License ",
                                mithril_1.default.trust("&amp;"),
                                " Copyright"
                            ]),
                            mithril_1.default("p.answer", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.")
                        ]),
                        mithril_1.default("div", [
                            mithril_1.default(".question-q-box", "Q."),
                            mithril_1.default("h4.question", "Is safe use Lorem Ipsum?"),
                            mithril_1.default("p.answer", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.")
                        ])
                    ])
                ])
            ])),
            mithril_1.default(footer_1.default)
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
                    mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/']", { oncreate: mithril_1.default.route.link }, "SmartFunding")),
                    mithril_1.default("li.breadcrumb-item.active", "Dashboard")
                ])),
                mithril_1.default("h4.page-title", "Dashboard")
            ]))), mithril_1.default(".row", [
                mithril_1.default(".col-lg-8", mithril_1.default(".card-box", [
                    mithril_1.default("h4.header-title.mb-3", "Wallet Balances"),
                    mithril_1.default(".table-responsive", mithril_1.default("table.table.table-hover.table-centered.m-0", [
                        mithril_1.default("thead", mithril_1.default("tr", [
                            mithril_1.default("th", "Currency"),
                            mithril_1.default("th", "Balance"),
                            mithril_1.default("th", "Reserved in orders"),
                            mithril_1.default("th", "Action")
                        ])),
                        mithril_1.default("tbody", [])
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
var avatar_5_jpg_1 = __importDefault(__webpack_require__(/*! images/users/avatar-5.jpg */ "./images/users/avatar-5.jpg"));
var LockScreenData = {
    getEmail: function () {
        var email = localStorage.getItem("email");
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center", [
                        mithril_1.default(".mb-3", mithril_1.default("img.rounded-circle.img-thumbnail.thumb-lg[alt='thumbnail']", {
                            src: avatar_5_jpg_1.default
                        })),
                        mithril_1.default("p.text-muted.m-b-0.font-14", "Enter your password to access your account.")
                    ]),
                    mithril_1.default("form.form-horizontal[action='javascript:;']", [
                        mithril_1.default("input[type='hidden']", {
                            value: LockScreenData.getEmail()
                        }),
                        mithril_1.default(".form-group.row", mithril_1.default(".col-12", [
                            mithril_1.default("label[for='password']", "Password"),
                            mithril_1.default("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']")
                        ])),
                        mithril_1.default(".form-group.row.text-center", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", "Log In")))
                    ]),
                    mithril_1.default(".row.m-t-50", mithril_1.default(".col-sm-12.text-center", mithril_1.default("p.text-muted", [
                        "Not you? return",
                        mithril_1.default("a.text-dark.ml-2[href='/login']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Sign In"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
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
                            mithril_1.default("a.text-muted.pull-right[href='/recover-password']", { oncreate: mithril_1.default.route.link }, mithril_1.default("small", "Forgot your password?")),
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
                        mithril_1.default("a.text-dark.m-l-5[href='/register']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Sign Up"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
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
                            mithril_1.default("a.text-dark.m-r-5[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Sign In"))
                        ])
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center", [
                        mithril_1.default("h1.text-error", "404"),
                        mithril_1.default("h4.text-uppercase.text-danger.mt-3", "Page Not Found"),
                        mithril_1.default("p.text-muted.mt-3", "It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. Here's a little tip that might help you get back on track."),
                        mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/']", { oncreate: mithril_1.default.route.link }, "Return Home")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
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
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(header_1.default),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", [
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                    mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/']", { oncreate: mithril_1.default.route.link }, "SmartFunding")),
                        mithril_1.default("li.breadcrumb-item.active", "Page Not Found")
                    ])),
                    mithril_1.default("h4.page-title", "Page Not Found")
                ]))),
                mithril_1.default(".row", mithril_1.default(".col-sm-6.offset-3", mithril_1.default(".text-center.mt-5", [
                    mithril_1.default("h1.text-error", "404"),
                    mithril_1.default("h4.text-uppercase.text-danger.mt-3", "Page Not Found"),
                    mithril_1.default("p.text-muted.mt-3", "It's looking like you may have taken a wrong turn. Don't worry... it\
                    happens to the best of us. Here's a little tip that might help you get back on track."),
                    mithril_1.default("a.btn.btn-md.btn-custom.waves-effect.waves-light.mt-3[href='/']", { oncreate: mithril_1.default.route.link }, "Return Home")
                ])))
            ])),
            mithril_1.default(footer_1.default)
        ]);
    }
};


/***/ }),

/***/ "./src/components/privacy.ts":
/*!***********************************!*\
  !*** ./src/components/privacy.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var showdown_1 = __importDefault(__webpack_require__(/*! showdown */ "./node_modules/showdown/dist/showdown.js"));
var bg_1_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-1.jpg */ "./images/bg-1.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
var privacyPolicy = "\n### SmartFunding Pte. Ltd. Privacy Policy\n\nSmartFunding Pte. Ltd. takes the privacy and confidentiality of Users of this website seriously. It is emphasised to the Users of this website that they read this privacy policy (\"the Policy\") carefully before using the services provided in this website. By accessing and using the services on our website, the Users acknowledges that they have read, understood and agreed to the contents written in this Policy.\n\n1. Personal Data Collection\n    1. During the course of using the services of our website, we may collect, store and use your personal information which includes, but not limited to, the following:\n      (i) information about your computer, your visits and use of our website;\n      (ii) information provided by you to us when registering with our website for any relevant purposes such as registration for website information, notifications and newsletters, registration of new user profile and/or publication of information on our website;\n      (iii) information on any communication that you sent to us or through our website;\n      (iv) any other personal information that you may choose to send to us in the course of using our website.\n\n2. Usage of Personal Information\n    1. Personal information provided to the website by you will be used for, but not limited to, the following purposes:\n      (i) administer the website;\n      (ii) enable you to use the services provided by the website;\n      (iii) sending notifications through e-mail to you;\n      (iv) sending marketing and non-marketing commercial communications to you;\n      (v) sending notifications or e-mail newsletters if previously requested by you;\n      (vi) to provide sufficient information on the website to identify you to Investors and/or Borrowers;\n      (vii) to deal with any questions or complaints made by or about you in relation to our website;\n      (viii) to be kept and stored to prevent fraud and to secure our website for our legal and compliance requirements;\n      (ix) to verify your compliance with the terms and conditions governing the use of our website.\n    2. Personal information submitted by you to us for the purposes of publication on the website will be used for the said purposes in accordance with the consent that you have given to us.\n    3. We hereby give you a guarantee that without your express consent, we shall not supply any of your personal information to any unrelated third party for their own purposes unless it is required by law to do so.\n    4. All financial transactions made between the Investor and Borrowers on the website shall be facilitated through SmartFundings escrow account. For smooth transactions between all parties, some information must be shared to the escrow agent which maintains the said escrow account. We will only provide sufficient information to the extent necessary for the escrow agent to ensure smooth transaction of funds. Transaction of funds include processing and refunding monies, fees, payments and/or refund as well as dealing with complaints and queries relating to such monies, fees, payments and/or refunds.\n\n3.\tDisclosing of Personal Information\n    1. All your personal information provided to us may, if required, be processed by any of our employees, officers, professional advisers, agents (\"authorised personnel\") whether in or outside of Singapore. We guarantee that access to such personal information will only be released and used by the authorised personnel to fulfil any of their job requirements. It is further guaranteed that only necessary personal information shall be supplied to the authorised personnel depending on the job requirement at hand.\n    2. We may from time to time disclose your personal information in the following situations:\n      (i) to the extent we are required to do so by any law;\n      (ii) when there are any ongoing or prospective legal proceedings;\n      (iii) to establish and defend our legal rights when necessary;\n      (iv) to any person where it is reasonably believed that the said person may apply or have applied to a court or other competent authority for an order to disclose personal information.\n\n4.\tData Transfers\n    1. Personal information submitted by you shall be collected, stored and processed by us and may be transferred to other countries outside of Singapore depending on the location of the server(s) to secure and safeguard your personal information which have been submitted to us.\n    2. Personal information which is published by you or submitted by you for publication on our website may be available to the public in other parts of the world through the Internet. You acknowledge that we cannot prevent the use and/or misuse of your personal information by other parties.\n\n5.\tRetaining Personal Information\n    1. Personal information which you provide to us for any purposes shall not be kept longer than necessary for that purposes.\n    2. We will retain your personal information as long as may be necessary to protect the interests of SmartFunding and/or its authorised personnel as may be deemed necessary, or where it is required by the law.\n    3. We will also retain your personal information if:\n      (i) we are required by any existing laws to do so;\n      (ii) we believe that the personal information may be relevant to any ongoing or prospective legal proceedings;\n      (iii) it is to establish and defend our legal rights when necessary.\n\n6.\tSecurity of Personal Information\n    1. We warrant and guarantee that we will take all reasonable steps and measures to prevent loss, misuse or alteration of your personal information by any unauthorised person.\n    2. We further warrant and guarantee that all of your personal information submitted to us shall be stored in our secured servers.\n    3. All electronic financial transactions entered and processed through our website will be protected by encryption technology.\n    4. Notwithstanding clauses 6.2 and 6.3, it is understood that any information transmitted over the internet is inherently insecure. As such, you understand that we cannot give you a full guarantee on the security of any form of data sent over to us by you through the internet.\n    5. When registering yourself on the website, you shall be asked to create your own personal password. You are responsible for keeping the password confidential. Except on instances when you want to log into our website, we will never ask for your password.\n\n7.\tInformation Updates\n    1. We understand that you will need to update or correct your information from time to time. When an information update is needed, please contact us and provide us the relevant details. We will help to update and/or correct your information for you if it is deemed reasonable to do so.\n\n8.\tUse of Cookies\n    1. By visiting and using this website, you acknowledge that cookies may be installed in your computer. Cookies are files that records information such as browsing of the website from that computer or to collect Internet log information and visitor behaviour information. You may delete cookies installed on your computer at any time by configuring your browser software. Please take note that you may not benefit from some of the services on this website if cookies are uninstalled or prevented from being installed on your computer.\n\n9.\tAmendments\n    1. You understand and acknowledge that there may be changes made to this privacy policy from time to time. When we do so, we will update and publish the latest version of this privacy policy on the website.\n    2. You are advised to check this privacy policy from time to time to keep yourself updated with the latest changes in this privacy policy.\n    3. We may notify you of the changes made to this privacy policy by way of e-mail to your registered e-mail address.\n\n10.\tYour Rights\n    1. You may instruct us to provide you with your personal information which has been submitted to us provided that you supply us evidence as to your identity (identification card, passport or any other forms of documents which may proof the validity of your identity). You may also be required to make a payment for this service.\n    2. Notwithstanding clause 10.1, we may still withhold any personal information that you may have requested to the extent as permitted by law.\n\n11.\tExclusion of Liability\n    1. You agree to not hold us liable for any violation, breach or non-compliance with any precepts of privacy or the protection of Personal Data in the following situations:\n      (i) where an act of nature is involved or any unforeseeable circumstances has occurred, resulting in the malfunction, damage or destruction of any equipment and/or machinery which is used to secure, store or process personal data or information from the Users;\n      (ii) where the personal data or information is already available or able to be found by the public before any personal data or information of such kind has been submitted to us;\n      (iii) where after every reasonable effort and attempt has been made by us to verify, secure and safeguard any personal data and information submitted to us, there is unauthorised access, hacking, misuse, modification, alteration, tampering or abuse of such personal data and information caused by malicious, fraudulent or criminal acts of any kind or misconduct of a third party not being under our control or instruction.\n\n12.\tContact Information\n    1. If you have any questions about this privacy policy, or you would like to have access or make any ratification to your personal information, you may contact us at the contact details below:\n\n\n      Attention\t\t: Legal Department<br/>\n      E-mail\t\t\t: support@smartfunding.sg\n";
var converter = new showdown_1.default.Converter();
var page = converter.makeHtml(privacyPolicy);
exports.default = {
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(".accountbg", {
                style: {
                    "background": "url(" + bg_1_jpg_1.default + ")",
                    "background-size": "cover"
                }
            }),
            mithril_1.default(".wrapper-page.account-page-full", {
                style: {
                    "overflow-y": "hidden"
                }
            }, [
                mithril_1.default(".card", mithril_1.default(".card-block", mithril_1.default(".account-box", mithril_1.default(".card-box.p-5", {
                    style: {
                        "overflow-y": "scroll",
                        "height": "100vh"
                    }
                }, [
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default.trust(page),
                    mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3.mb-3[href='/']", { oncreate: mithril_1.default.route.link }, "Return Home")
                ])))),
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/profile.ts":
/*!***********************************!*\
  !*** ./src/components/profile.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var jwt_decode_1 = __importDefault(__webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js"));
var header_1 = __importDefault(__webpack_require__(/*! widgets/header */ "./src/widgets/header.ts"));
var footer_1 = __importDefault(__webpack_require__(/*! widgets/footer */ "./src/widgets/footer.ts"));
var avatar_1_jpg_1 = __importDefault(__webpack_require__(/*! images/users/avatar-1.jpg */ "./images/users/avatar-1.jpg"));
var ProfileData = {
    getEmail: function () {
        var email = localStorage.getItem("email");
        return email;
    },
    getUsername: function () {
        var token = localStorage.getItem("token");
        var data = jwt_decode_1.default(token);
        return data.username;
    }
};
exports.default = {
    oninit: {},
    view: function (vnode) {
        return mithril_1.default(".sf-root", [
            mithril_1.default(header_1.default),
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", [
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                    mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/']", { oncreate: mithril_1.default.route.link }, "SmartFunding")),
                        mithril_1.default("li.breadcrumb-item.active", "Profile")
                    ])),
                    mithril_1.default("h4.page-title", "Profile")
                ]))),
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".profile-user-box.card-box.bg-custom", mithril_1.default(".row", [
                    mithril_1.default(".col-sm-6", [
                        mithril_1.default("span.pull-left.mr-3", mithril_1.default("img.thumb-lg.rounded-circle[alt='']", { src: avatar_1_jpg_1.default })),
                        mithril_1.default(".media-body.text-white", [
                            mithril_1.default("h4.mt-1.mb-1.font-18", "Anonymous User"),
                            mithril_1.default("p.font-13.text-light", ProfileData.getUsername()),
                            mithril_1.default("p.text-light.mb-0", "California, United States")
                        ])
                    ]),
                    mithril_1.default(".col-sm-6", mithril_1.default(".text-right", mithril_1.default("button.btn.btn-light.waves-effect[type='button']", [
                        mithril_1.default("i.mdi.mdi-account-settings-variant.mr-1"),
                        "Edit Profile"
                    ])))
                ])))),
                mithril_1.default(".row", [
                    mithril_1.default(".col-md-4", [
                        mithril_1.default(".card-box", [
                            mithril_1.default("h4.header-title.mt-0.m-b-20", "Personal Information"),
                            mithril_1.default(".panel-body", [
                                mithril_1.default("p.text-muted.font-13", "Bio"),
                                mithril_1.default("hr"),
                                mithril_1.default(".text-left", [
                                    mithril_1.default("p.text-muted.font-13", [
                                        mithril_1.default("strong", "Full Name : "),
                                        mithril_1.default("span.m-l-15", "Anonymous User")
                                    ]),
                                    mithril_1.default("p.text-muted.font-13", [
                                        mithril_1.default("strong", "Email : "),
                                        mithril_1.default("span.m-l-15", ProfileData.getEmail())
                                    ]),
                                    mithril_1.default("p.text-muted.font-13", [
                                        mithril_1.default("strong", "Location : "),
                                        mithril_1.default("span.m-l-15", "Earth")
                                    ])
                                ]),
                            ])
                        ])
                    ]),
                    mithril_1.default(".col-md-8", [
                        mithril_1.default(".row", [
                            mithril_1.default(".col-sm-4", mithril_1.default(".card-box.tilebox-one", [
                                mithril_1.default("i.icon-layers.float-right.text-muted"),
                                mithril_1.default("h6.text-muted.text-uppercase.mt-0", "Wallet Balance"),
                                mithril_1.default("h2.m-b-20[data-plugin='counterup']", "1,587"),
                                mithril_1.default("span.badge.badge-custom", "+11%"),
                                mithril_1.default("span.text-muted", " From previous period")
                            ])),
                            mithril_1.default(".col-sm-4", mithril_1.default(".card-box.tilebox-one", [
                                mithril_1.default("i.icon-paypal.float-right.text-muted"),
                                mithril_1.default("h6.text-muted.text-uppercase.mt-0", "Paypal / Bank Balance"),
                                mithril_1.default("h2.m-b-20", [
                                    "$",
                                    mithril_1.default("span[data-plugin='counterup']", "46,782")
                                ]),
                                mithril_1.default("span.badge.badge-danger", "-29%"),
                                mithril_1.default("span.text-muted", " From previous period")
                            ])),
                            mithril_1.default(".col-sm-4", mithril_1.default(".card-box.tilebox-one", [
                                mithril_1.default("i.icon-rocket.float-right.text-muted"),
                                mithril_1.default("h6.text-muted.text-uppercase.mt-0", "Loan / Invest"),
                                mithril_1.default("h2.m-b-20[data-plugin='counterup']", "1,890"),
                                mithril_1.default("span.badge.badge-custom", "+89%"),
                                mithril_1.default("span.text-muted", " Last year")
                            ]))
                        ])
                    ])
                ])
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
            .then(function (res) {
            if (res.success) {
                sessionStorage.setItem("verify_email", RecoverPasswordData.email);
                mithril_1.default.route.set("/confirm-mail/recover");
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
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
                        mithril_1.default("a.text-dark.m-l-5[href='/login']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Sign In"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
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
            .then(function (res) {
            if (res.success) {
                sessionStorage.setItem("verify_email", RegisterAccountData.email);
                mithril_1.default.route.set("/confirm-mail/register");
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt='logo'][height='26']", { src: sf_logo_png_1.default })))),
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
                                mithril_1.default("a.text-custom[href='/terms-and-conditions']", { oncreate: mithril_1.default.route.link }, "Terms and Conditions")
                            ])
                        ]))),
                        mithril_1.default(".form-group.row.text-center.m-t-10", mithril_1.default(".col-12", mithril_1.default("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", {
                            disabled: !RegisterAccountData.canSave()
                        }, "Sign Up Free")))
                    ]),
                    mithril_1.default(".row.m-t-50", mithril_1.default(".col-sm-12.text-center", mithril_1.default("p.text-muted", [
                        "Already have an account? ",
                        mithril_1.default("a.text-dark.m-l-5[href='/login']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Sign In"))
                    ])))
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © Smartfunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='/']", { oncreate: mithril_1.default.route.link }, mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", { src: sf_logo_png_1.default })))),
                    mithril_1.default(".text-center", [
                        mithril_1.default("h1.text-error", "500"),
                        mithril_1.default("h4.text-uppercase.text-danger.mt-3", "Internal Server Error"),
                        mithril_1.default("p.text-muted.mt-3", [
                            "Why not try refreshing your page? or you can contact ",
                            mithril_1.default("a.text-dark[href='/support']", { oncreate: mithril_1.default.route.link }, mithril_1.default("b", "Support"))
                        ]),
                        mithril_1.default("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/']", { oncreate: mithril_1.default.route.link }, "Return Home")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
            ])
        ]);
    }
};


/***/ }),

/***/ "./src/components/site_maintenance.ts":
/*!********************************************!*\
  !*** ./src/components/site_maintenance.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(__webpack_require__(/*! mithril */ "./node_modules/mithril/mithril.js"));
var bg_2_jpg_1 = __importDefault(__webpack_require__(/*! images/bg-2.jpg */ "./images/bg-2.jpg"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
exports.default = {
    oninit: function () {
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
                    mithril_1.default("h2.text-uppercase.text-center.pb-4", mithril_1.default("a.text-success[href='index.html']", mithril_1.default("span", mithril_1.default("img[alt=''][height='26']", {
                        src: sf_logo_png_1.default
                    })))),
                    mithril_1.default(".text-center", [
                        mithril_1.default("svg.svg-computer[id='Layer_1'][viewBox='0 0 424.2 424.2'][xmlns='http://www.w3.org/2000/svg']", [
                            mithril_1.default("style", ".st0{fill:none;stroke:#02c0ce;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}"),
                            mithril_1.default("g[id='Layer_2']", [
                                mithril_1.default("path.st0[d='M339.7 289h-323c-2.8 0-5-2.2-5-5V55.5c0-2.8 2.2-5 5-5h323c2.8 0 5 2.2 5 5V284c0 2.7-2.2 5-5 5z']"),
                                mithril_1.default("path.st0[d='M26.1 64.9h304.6v189.6H26.1zM137.9 288.5l-3.2 33.5h92.6l-4.4-33M56.1 332.6h244.5l24.3 41.1H34.5zM340.7 373.7s-.6-29.8 35.9-30.2c36.5-.4 35.9 30.2 35.9 30.2h-71.8z']"),
                                mithril_1.default("path.st0[d='M114.2 82.8v153.3h147V82.8zM261.2 91.1h-147']"),
                                mithril_1.default("path.st0[d='M124.5 105.7h61.8v38.7h-61.8zM196.6 170.2H249v51.7h-52.4zM196.6 105.7H249M196.6 118.6H249M196.6 131.5H249M196.6 144.4H249M124.5 157.3H249M124.5 170.2h62.2M124.5 183.2h62.2M124.5 196.1h62.2M124.5 209h62.2M124.5 221.9h62.2']")
                            ])
                        ]),
                        mithril_1.default("h4.text-danger", "Site is Under Maintenance"),
                        mithril_1.default("p.text-muted", "We're making the system more awesome.we'll be back shortly.")
                    ])
                ])))),
                mithril_1.default(".m-t-40.text-center", mithril_1.default("p.account-copyright", [
                    "2018 © SmartFunding | ",
                    mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
                ]))
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
var aws_sdk_1 = __importDefault(__webpack_require__(/*! aws-sdk */ "./node_modules/aws-sdk/lib/browser.js"));
var header_1 = __importDefault(__webpack_require__(/*! widgets/header */ "./src/widgets/header.ts"));
var footer_1 = __importDefault(__webpack_require__(/*! widgets/footer */ "./src/widgets/footer.ts"));
__webpack_require__(/*! jquery-slimscroll */ "./node_modules/jquery-slimscroll/jquery.slimscroll.js");
__webpack_require__(/*! dropzone */ "./node_modules/dropzone/dist/dropzone.js");
aws_sdk_1.default.config.region = 'ap-southeast-1';
aws_sdk_1.default.config.credentials = new aws_sdk_1.default.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-1:4c1e349b-13b9-49ce-9b27-2d0b1fac48cd',
});
var bucketName = "bucket.smartfunding.io";
var bucket = new aws_sdk_1.default.S3({
    params: {
        Bucket: bucketName
    }
});
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
            mithril_1.default(".wrapper", mithril_1.default(".container-fluid", [
                mithril_1.default(".row", mithril_1.default(".col-sm-12", mithril_1.default(".page-title-box", [
                    mithril_1.default(".btn-group.pull-right", mithril_1.default("ol.breadcrumb.hide-phone.p-0.m-0", [
                        mithril_1.default("li.breadcrumb-item", mithril_1.default("a[href='/']", { oncreate: mithril_1.default.route.link }, "SmartFunding")),
                        mithril_1.default("li.breadcrumb-item.active", "Upload Verification Documents")
                    ])),
                    mithril_1.default("h4.page-title", "Upload Verification Documents")
                ]))),
                mithril_1.default(".row", mithril_1.default(".col-12", mithril_1.default(".card-box", [
                    mithril_1.default("h4.header-title.m-t-0", "Dropzone File Upload"),
                    mithril_1.default("p.text-muted.font-14.m-b-10", "Your awesome text goes here."),
                    mithril_1.default("form.dropzone[action='#'][id='dropzone']", mithril_1.default(".fallback", mithril_1.default("input[multiple=''][name='file'][type='file']"))),
                    mithril_1.default(".clearfix.text-right.mt-3", mithril_1.default("button.btn.btn-custom.waves-effect.waves-light[type='button']", "Submit"))
                ])))
            ])),
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
var privacy_1 = __importDefault(__webpack_require__(/*! components/privacy */ "./src/components/privacy.ts"));
var frequently_ask_1 = __importDefault(__webpack_require__(/*! components/frequently_ask */ "./src/components/frequently_ask.ts"));
var lock_screen_1 = __importDefault(__webpack_require__(/*! components/lock_screen */ "./src/components/lock_screen.ts"));
var confirm_mail_register_1 = __importDefault(__webpack_require__(/*! components/confirm_mail_register */ "./src/components/confirm_mail_register.ts"));
var confirm_mail_recover_1 = __importDefault(__webpack_require__(/*! components/confirm_mail_recover */ "./src/components/confirm_mail_recover.ts"));
var recover_password_1 = __importDefault(__webpack_require__(/*! components/recover_password */ "./src/components/recover_password.ts"));
var home_1 = __importDefault(__webpack_require__(/*! components/home */ "./src/components/home.ts"));
var profile_1 = __importDefault(__webpack_require__(/*! components/profile */ "./src/components/profile.ts"));
var upload_document_1 = __importDefault(__webpack_require__(/*! components/upload_document */ "./src/components/upload_document.ts"));
var login_2 = __importDefault(__webpack_require__(/*! components/admin/login */ "./src/components/admin/login.ts"));
var logout_2 = __importDefault(__webpack_require__(/*! components/admin/logout */ "./src/components/admin/logout.ts"));
var dashboard_1 = __importDefault(__webpack_require__(/*! components/admin/dashboard */ "./src/components/admin/dashboard.ts"));
var site_maintenance_1 = __importDefault(__webpack_require__(/*! components/site_maintenance */ "./src/components/site_maintenance.ts"));
var not_found_1 = __importDefault(__webpack_require__(/*! components/not_found */ "./src/components/not_found.ts"));
var not_found_alt_1 = __importDefault(__webpack_require__(/*! components/not_found_alt */ "./src/components/not_found_alt.ts"));
var server_error_1 = __importDefault(__webpack_require__(/*! components/server_error */ "./src/components/server_error.ts"));
var auth_1 = __webpack_require__(/*! ./auth */ "./src/auth.ts");
__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
__webpack_require__(/*! jquery-slimscroll */ "./node_modules/jquery-slimscroll/jquery.slimscroll.js");
__webpack_require__(/*! styles/app */ "./styles/app.scss");
__webpack_require__(/*! styles/icons */ "./styles/icons.scss");
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
        "/profile": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/login");
                else
                    return profile_1.default;
            }
        },
        "/admin/dashboard": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/admin/login");
                else
                    return dashboard_1.default;
            }
        },
        "/admin/login": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return login_2.default;
                else
                    mithril_1.default.route.set("/admin/dashboard");
            }
        },
        "/admin/logout": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/admin/login");
                else
                    return logout_2.default;
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
        "/register/:token": {
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
        "/logout": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/login");
                else
                    return logout_1.default;
            }
        },
        "/lock-screen": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/login");
                else
                    return lock_screen_1.default;
            }
        },
        "/frequently-ask": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    mithril_1.default.route.set("/login");
                else
                    return frequently_ask_1.default;
            }
        },
        "/confirm-mail/register": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return confirm_mail_register_1.default;
                else
                    mithril_1.default.route.set("/");
            }
        },
        "/confirm-mail/recover": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return confirm_mail_recover_1.default;
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
        "/recover-password/:token": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return recover_password_1.default;
                else
                    mithril_1.default.route.set("/");
            }
        },
        "/privacy": privacy_1.default,
        "/site-maintenance": site_maintenance_1.default,
        "/server-error": server_error_1.default,
        "/:any...": {
            onmatch: function () {
                if (auth_1.Auth.checkTokenNone())
                    return not_found_1.default;
                else
                    return not_found_alt_1.default;
            }
        }
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
        return mithril_1.default("footer.footer", mithril_1.default(".container", mithril_1.default(".row", [
            mithril_1.default(".col-12.text-center", [
                "2018 © SmartFunding | ",
                mithril_1.default("a[href='/privacy']", { oncreate: mithril_1.default.route.link }, "Privacy Policy")
            ])
        ])));
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
var jwt_decode_1 = __importDefault(__webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js"));
var sf_logo_png_1 = __importDefault(__webpack_require__(/*! images/sf-logo.png */ "./images/sf-logo.png"));
var avatar_1_jpg_1 = __importDefault(__webpack_require__(/*! images/users/avatar-1.jpg */ "./images/users/avatar-1.jpg"));
var HeaderData = {
    getEmail: function () {
        var email = localStorage.getItem("email");
        return email;
    },
    getUsername: function () {
        var token = localStorage.getItem("token");
        var data = jwt_decode_1.default(token);
        console.log(data.username);
        return data.username;
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
                mithril_1.default(".logo", mithril_1.default("a.logo[href='/']", { oncreate: mithril_1.default.route.link }, [
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
                                "  ",
                                HeaderData.getUsername(),
                                mithril_1.default("i.mdi.mdi-chevron-down")
                            ])
                        ]),
                        mithril_1.default(".dropdown-menu.dropdown-menu-right.profile-dropdown.", [
                            mithril_1.default(".dropdown-item.noti-title", mithril_1.default("h6.text-overflow.m-0", "Welcome " + HeaderData.getUsername() + "!")),
                            mithril_1.default("a.dropdown-item.notify-item[href='/profile']", { oncreate: mithril_1.default.route.link }, [
                                mithril_1.default("i.fi-head"),
                                mithril_1.default("span", "My Account")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='/settings']", { oncreate: mithril_1.default.route.link }, [
                                mithril_1.default("i.fi-cog"),
                                mithril_1.default("span", "Settings")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='/frequently-ask']", { oncreate: mithril_1.default.route.link }, [
                                mithril_1.default("i.fi-help"),
                                mithril_1.default("span", "Support")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='/lock-screen']", { oncreate: mithril_1.default.route.link }, [
                                mithril_1.default("i.fi-lock"),
                                mithril_1.default("span", "Lock Screen")
                            ]),
                            mithril_1.default("a.dropdown-item.notify-item[href='/logout']", { oncreate: mithril_1.default.route.link }, [
                                mithril_1.default("i.fi-power"),
                                mithril_1.default("span", "Logout")
                            ])
                        ])
                    ])
                ])),
                mithril_1.default(".clearfix")
            ])),
            mithril_1.default(".navbar-custom", mithril_1.default(".container-fluid", mithril_1.default("[id='navigation']", mithril_1.default("ul.navigation-menu", [
                mithril_1.default("li.has-submenu", mithril_1.default("a[href='/']", { oncreate: mithril_1.default.route.link }, [
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


/***/ }),

/***/ 5:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL2JnLTEuanBnIiwid2VicGFjazovLy8uL2ltYWdlcy9iZy0yLmpwZyIsIndlYnBhY2s6Ly8vLi9pbWFnZXMvc2YtbG9nby5wbmciLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL3VzZXJzL2F2YXRhci0xLmpwZyIsIndlYnBhY2s6Ly8vLi9pbWFnZXMvdXNlcnMvYXZhdGFyLTUuanBnIiwid2VicGFjazovLy8uL3NyYy9hdXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FkbWluL2Rhc2hib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hZG1pbi9sb2dpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hZG1pbi9sb2dvdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29uZmlybV9tYWlsX3JlY292ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29uZmlybV9tYWlsX3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ZyZXF1ZW50bHlfYXNrLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hvbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9ja19zY3JlZW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9nb3V0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25vdF9mb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ub3RfZm91bmRfYWx0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ByaXZhY3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcHJvZmlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9yZWNvdmVyX3Bhc3N3b3JkLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NlcnZlcl9lcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zaXRlX21haW50ZW5hbmNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3VwbG9hZF9kb2N1bWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlncy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dpZGdldHMvZm9vdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy93aWRnZXRzL2hlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2ljb25zLnNjc3M/MDlhMyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzNDLGlCQUFDLENBQUMsb0JBQW9CLENBQUM7b0JBQ3ZCLFdBQVc7aUJBQ1osQ0FBQyxDQUNIO2FBQ0YsQ0FBQyxDQUNILENBQ0YsQ0FDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ2EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3JJakIsdUM7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsZSIsImZpbGUiOiJzZXNhbWUuNjdkZDExZTg4ZTQ5ODk4ZDczNzcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJzZXNhbWVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiaW1hZ2VzL2JnLTEuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcImltYWdlcy9iZy0yLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiaW1hZ2VzL2F2YXRhci0xLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJpbWFnZXMvYXZhdGFyLTUuanBnXCI7IiwiZXhwb3J0IGNsYXNzIEF1dGgge1xuICBwdWJsaWMgc3RhdGljIGNoZWNrVG9rZW5Ob25lKCkge1xuICAgIGxldCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XG4gICAgcmV0dXJuIHRva2VuID09IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IGhlYWRlciBmcm9tIFwid2lkZ2V0cy9oZWFkZXJcIjtcbmltcG9ydCBmb290ZXIgZnJvbSBcIndpZGdldHMvZm9vdGVyXCI7XG5cbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuaW1wb3J0IFwiZGF0YXRhYmxlcy5uZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShoZWFkZXIpLFxuICAgICAgbShcIi53cmFwcGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsIFtcbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tMTJcIixcbiAgICAgICAgICAgICAgbShcIi5wYWdlLXRpdGxlLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5idG4tZ3JvdXAucHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgbShcIm9sLmJyZWFkY3J1bWIuaGlkZS1waG9uZS5wLTAubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJTbWFydEZ1bmRpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbS5hY3RpdmVcIiwgXCJBZG1pbiBEYXNoYm9hcmRcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucGFnZS10aXRsZVwiLCBcIkFkbWluIERhc2hib2FyZFwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgbShcIi5yb3cudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgbShcIi5jb2wtc20tNi5jb2wtbGctNi5jb2wteGwtM1wiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LndpZGdldC1mbGF0LmJvcmRlci1jdXN0b20uYmctY3VzdG9tLnRleHQtd2hpdGVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJpLmZpLXRhZ1wiKSxcbiAgICAgICAgICAgICAgICBtKFwiaDMubS1iLTEwXCIsIFwiMjU1NjNcIiksXG4gICAgICAgICAgICAgICAgbShcInAudGV4dC11cHBlcmNhc2UubS1iLTUuZm9udC0xMy5mb250LTYwMFwiLCBcIlRvdGFsIEludmVzdG9yc1wiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTYuY29sLWxnLTYuY29sLXhsLTNcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5iZy1wcmltYXJ5LndpZGdldC1mbGF0LmJvcmRlci1wcmltYXJ5LnRleHQtd2hpdGVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJpLmZpLWFyY2hpdmVcIiksXG4gICAgICAgICAgICAgICAgbShcImgzLm0tYi0xMFwiLCBcIjY5NTJcIiksXG4gICAgICAgICAgICAgICAgbShcInAudGV4dC11cHBlcmNhc2UubS1iLTUuZm9udC0xMy5mb250LTYwMFwiLCBcIlBlbmRpbmcgSW52ZXN0b3JzXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tNi5jb2wtbGctNi5jb2wteGwtM1wiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LndpZGdldC1mbGF0LmJvcmRlci1zdWNjZXNzLmJnLXN1Y2Nlc3MudGV4dC13aGl0ZVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImkuZmktaGVscFwiKSxcbiAgICAgICAgICAgICAgICBtKFwiaDMubS1iLTEwXCIsIFwiMTgzNjFcIiksXG4gICAgICAgICAgICAgICAgbShcInAudGV4dC11cHBlcmNhc2UubS1iLTUuZm9udC0xMy5mb250LTYwMFwiLCBcIlRvdGFsIEJvcnJvd2Vyc1wiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTYuY29sLWxnLTYuY29sLXhsLTNcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5iZy1kYW5nZXIud2lkZ2V0LWZsYXQuYm9yZGVyLWRhbmdlci50ZXh0LXdoaXRlXCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaS5maS1kZWxldGVcIiksXG4gICAgICAgICAgICAgICAgbShcImgzLm0tYi0xMFwiLCBcIjI1MFwiKSxcbiAgICAgICAgICAgICAgICBtKFwicC50ZXh0LXVwcGVyY2FzZS5tLWItNS5mb250LTEzLmZvbnQtNjAwXCIsIFwiUGVuZGluZyBCb3Jyb3dlcnNcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcblxuICAgICAgICAgIG0oXCIucm93XCIsXG4gICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnRhYmxlLXJlc3BvbnNpdmVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoNC5tLXQtMC5oZWFkZXItdGl0bGVcIiwgXCJCb3Jyb3dlcnMvIEludmVzdG9yc1wiKSxcbiAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTQubS1iLTMwXCIsIFtcbiAgICAgICAgICAgICAgICAgIFwiTGlzdCBvZiBhbGwgaW52ZXN0b3JzIGFuZCBib3Jyb3dlcnMuXCJcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtKFwidGFibGUudGFibGUudGFibGUtYm9yZGVyZWRbaWQ9J2RhdGF0YWJsZSddXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJ0aGVhZFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIk5hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiUG9zaXRpb25cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiT2ZmaWNlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIkFnZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJTdGFydCBkYXRlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJ0aFwiLCBcIlNhbGFyeVwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJ0Ym9keVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiQW5vbnltb3VzIFVzZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiU3lzdGVtIEFyY2hpdGVjdFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgXCJFZGluYnVyZ2hcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiNjFcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInRkXCIsIFwiMjAxMS8wNC8yNVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidGRcIiwgXCIkMzIwLDgwMFwiKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgICAgbShmb290ZXIpXG4gICAgXSk7XG4gIH1cbn1cbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcbmltcG9ydCB7IEFwcFNldHRpbmdzIH0gZnJvbSBcImNvbmZpZ3NcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuY29uc3QgTG9naW5BY2NvdW50RGF0YSA9IHtcbiAgZW1haWw6IFwiXCIsXG4gIHBhc3N3b3JkOiBcIlwiLFxuXG4gIGNhblNhdmUoKSB7XG4gICAgcmV0dXJuIExvZ2luQWNjb3VudERhdGEuZW1haWwgIT09IFwiXCIgJiZcbiAgICAgIExvZ2luQWNjb3VudERhdGEucGFzc3dvcmQgIT09IFwiXCI7XG4gIH0sXG4gIHNhdmUoKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgZW1haWw6IExvZ2luQWNjb3VudERhdGEuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBMb2dpbkFjY291bnREYXRhLnBhc3N3b3JkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoKEFwcFNldHRpbmdzLkFQSV9CQVNFX1VSTCArIFwiL2FwaS9zZXNzaW9uL2xvZ2luXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShhY2NvdW50KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5zdWNjZXNzICYmIHJlcy51c2VyLnRva2VuKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZW1haWxcIiwgcmVzLnVzZXIuZW1haWwpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2VuXCIsIHJlcy51c2VyLnRva2VuKTtcbiAgICAgICAgbS5yb3V0ZS5zZXQoXCIvXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yXCIsIHJlcy5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImZvcm1bbWV0aG9kPSdwb3N0J11cIiwge1xuICAgICAgICAgICAgICAgICAgb25zdWJtaXQ6IChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIExvZ2luQWNjb3VudERhdGEuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5tLWItMjAucm93XCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdlbWFpbGFkZHJlc3MnXVwiLCBcIkVtYWlsIGFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0nZW1haWxhZGRyZXNzJ11bcGxhY2Vob2xkZXI9J0VudGVyIHlvdXIgZW1haWwnXVtyZXF1aXJlZD0nJ11bdHlwZT0nZW1haWwnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBtLndpdGhBdHRyKFwidmFsdWVcIiwgKHY6IHN0cmluZykgPT4geyBMb2dpbkFjY291bnREYXRhLmVtYWlsID0gdiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBMb2dpbkFjY291bnREYXRhLmVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1tdXRlZC5wdWxsLXJpZ2h0W2hyZWY9Jy9yZWNvdmVyLXBhc3N3b3JkJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGxcIiwgXCJGb3Jnb3QgeW91ciBwYXNzd29yZD9cIilcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJsYWJlbFtmb3I9J3Bhc3N3b3JkJ11cIiwgXCJQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXQuZm9ybS1jb250cm9sW2lkPSdwYXNzd29yZCddW3BsYWNlaG9sZGVyPSdFbnRlciB5b3VyIHBhc3N3b3JkJ11bcmVxdWlyZWQ9JyddW3R5cGU9J3Bhc3N3b3JkJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgTG9naW5BY2NvdW50RGF0YS5wYXNzd29yZCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTG9naW5BY2NvdW50RGF0YS5wYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiLmNoZWNrYm94LmNoZWNrYm94LWN1c3RvbVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiaW5wdXRbY2hlY2tlZD0nJ11baWQ9J3JlbWVtYmVyJ11bdHlwZT0nY2hlY2tib3gnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJsYWJlbFtmb3I9J3JlbWVtYmVyJ11cIiwgXCJSZW1lbWJlciBtZVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93LnRleHQtY2VudGVyLm0tdC0xMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJidXR0b24uYnRuLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodFt0eXBlPSdzdWJtaXQnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIUxvZ2luQWNjb3VudERhdGEuY2FuU2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgfSwgXCJTaWduIEluXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtKFwiLnJvdy5tLXQtNTBcIixcbiAgICAgICAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIFwiRG9uJ3QgaGF2ZSBhbiBhY2NvdW50PyBcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubS1sLTVbaHJlZj0nL3JlZ2lzdGVyJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIG0oXCJiXCIsIFwiU2lnbiBVcFwiKSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFtcbiAgICAgICAgICAgIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmcgfCBcIixcbiAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy9wcml2YWN5J11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiUHJpdmFjeSBQb2xpY3lcIilcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9uaW5pdCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImVtYWlsXCIpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidG9rZW5cIik7XG4gIH0sXG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyLm0tYi0yMFwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNoZWNrbWFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzdmdbZW5hYmxlLWJhY2tncm91bmQ9J25ldyAwIDAgMTYxLjIgMTYxLjInXVtpZD0nTGF5ZXJfMSddW3ZlcnNpb249JzEuMSddW3ZpZXdCb3g9JzAgMCAxNjEuMiAxNjEuMiddW3g9JzBweCddW3htbDpzcGFjZT0ncHJlc2VydmUnXVt4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXVt4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayddW3k9JzBweCddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnBhdGhbZD0nTTQyNS45LDUyLjFMNDI1LjksNTIuMWMtMi4yLTIuNi02LTIuNi04LjMtMC4xbC00Mi43LDQ2LjJsLTE0LjMtMTYuNCBjLTIuMy0yLjctNi4yLTIuNy04LjYtMC4xYy0xLjksMi4xLTIsNS42LTAuMSw3LjdsMTcuNiwyMC4zYzAuMiwwLjMsMC40LDAuNiwwLjYsMC45YzEuOCwyLDQuNCwyLjUsNi42LDEuNGMwLjctMC4zLDEuNC0wLjgsMi0xLjUgYzAuMy0wLjMsMC41LTAuNiwwLjctMC45bDQ2LjMtNTAuMUM0MjcuNyw1Ny41LDQyNy43LDU0LjIsNDI1LjksNTIuMXonXVtmaWxsPSdub25lJ11bc3Ryb2tlPScjMzJjODYxJ11bc3Ryb2tlLW1pdGVybGltaXQ9JzEwJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiY2lyY2xlLnBhdGhbY3g9JzgwLjYnXVtjeT0nODAuNiddW2ZpbGw9J25vbmUnXVtyPSc2Mi4xJ11bc3Ryb2tlPScjMzJjODYxJ11bc3Ryb2tlLW1pdGVybGltaXQ9JzEwJ11bc3Ryb2tlLXdpZHRoPSc0J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicG9seWxpbmUucGF0aFtmaWxsPSdub25lJ11bcG9pbnRzPScxMTMsNTIuOCA3NC4xLDEwOC40IDQ4LjIsODYuNCAnXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtbGluZWNhcD0ncm91bmQnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVtzdHJva2Utd2lkdGg9JzYnXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJjaXJjbGUuc3BpbltjeD0nODAuNiddW2N5PSc4MC42J11bZmlsbD0nbm9uZSddW3I9JzczLjknXVtzdHJva2U9JyMzMmM4NjEnXVtzdHJva2UtZGFzaGFycmF5PScxMi4yMTc1LDEyLjIxNzUnXVtzdHJva2UtbWl0ZXJsaW1pdD0nMTAnXVtzdHJva2Utd2lkdGg9JzQnXVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiaDRcIiwgXCJTZWUgWW91IEFnYWluICFcIiksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTQubS10LTEwXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgXCJZb3UgYXJlIG5vdyBzdWNjZXNzZnVsbHkgc2lnbiBvdXQuIEJhY2sgdG8gXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tLXItNVtocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIG0oXCJiXCIsIFwiU2lnbiBJblwiKSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgW1xuICAgICAgICAgICAgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZyB8IFwiLFxuICAgICAgICAgICAgbShcImFbaHJlZj0nL3ByaXZhY3knXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJQcml2YWN5IFBvbGljeVwiKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmNvbnN0IENvbmZpcm1NYWlsRGF0YSA9IHtcbiAgZ2V0VmVyaWZ5RW1haWwoKSB7XG4gICAgbGV0IGVtYWlsID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInZlcmlmeV9lbWFpbFwiKTtcbiAgICByZXR1cm4gZW1haWw7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmRcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSxcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCIuYWNjb3VudC1jb250ZW50LnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJzdmdbdmVyc2lvbj0nMS4xJ11bdmlld0JveD0nMCAwIDk4IDk4J11beD0nMHB4J11beG1sOnNwYWNlPSdwcmVzZXJ2ZSddW3htbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyddW3htbG5zOmdyYXBoPScmbnNfZ3JhcGhzOyddW3htbG5zOmk9JyZuc19haTsnXVt4bWxuczp4PScmbnNfZXh0ZW5kOyddW3htbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ11beT0nMHB4J11cIiwgeyBzdHlsZTogeyBcImhlaWdodFwiOiBcIjEyMHB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzdHlsZVt0eXBlPSd0ZXh0L2NzcyddXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIuc3Qwe2ZpbGw6I0ZGRkZGRjt9XFxcbiAgICAgICAgICAgICAgICAgICAgICAgLnN0MXtmaWxsOiMwMmE4YjU7fVxcXG4gICAgICAgICAgICAgICAgICAgICAgIC5zdDJ7ZmlsbDojRkZGRkZGO3N0cm9rZTojMDJhOGI1O3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cXFxuICAgICAgICAgICAgICAgICAgICAgICAuc3Qze2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImdbaTpleHRyYW5lb3VzPSdzZWxmJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJjaXJjbGUuc3QwW2N4PSc0OSddW2N5PSc0OSddW2lkPSdYTUxJRF81MF8nXVtyPSc0OSddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJnW2lkPSdYTUxJRF80XyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNNzcuMyw0Mi43Vjc3YzAsMC42LTAuNCwxLTEsMUgyMS43Yy0wLjUsMC0xLTAuNS0xLTFWNDIuN2MwLTAuMywwLjEtMC42LDAuNC0wLjhsMjcuMy0yMS43IGMwLjMtMC4zLDAuOC0wLjMsMS4yLDBsMjcuMywyMS43Qzc3LjEsNDIuMSw3Ny4zLDQyLjQsNzcuMyw0Mi43eiddW2lkPSdYTUxJRF80OV8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MltkPSdNNjYuNSw2OS41aC0zNWMtMS4xLDAtMi0wLjktMi0yVjI2LjhjMC0xLjEsMC45LTIsMi0yaDM1YzEuMSwwLDIsMC45LDIsMnY0MC43IEM2OC41LDY4LjYsNjcuNiw2OS41LDY2LjUsNjkuNXonXVtpZD0nWE1MSURfNDhfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksMzMuNEg0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDMzLDYzLjQsMzMuNCw2Mi45LDMzLjR6J11baWQ9J1hNTElEXzQ3XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J002Mi45LDQwLjNINDcuMmMtMC41LDAtMC45LTAuNC0wLjktMC45di0wLjJjMC0wLjUsMC40LTAuOSwwLjktMC45aDE1LjcgYzAuNSwwLDAuOSwwLjQsMC45LDAuOXYwLjJDNjMuOCwzOS45LDYzLjQsNDAuMyw2Mi45LDQwLjN6J11baWQ9J1hNTElEXzQ2XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J002Mi45LDQ3LjJINDcuMmMtMC41LDAtMC45LTAuNC0wLjktMC45di0wLjJjMC0wLjUsMC40LTAuOSwwLjktMC45aDE1LjcgYzAuNSwwLDAuOSwwLjQsMC45LDAuOXYwLjJDNjMuOCw0Ni44LDYzLjQsNDcuMiw2Mi45LDQ3LjJ6J11baWQ9J1hNTElEXzQ1XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J002Mi45LDU0LjFINDcuMmMtMC41LDAtMC45LTAuNC0wLjktMC45di0wLjJjMC0wLjUsMC40LTAuOSwwLjktMC45aDE1LjcgYzAuNSwwLDAuOSwwLjQsMC45LDAuOXYwLjJDNjMuOCw1My43LDYzLjQsNTQuMSw2Mi45LDU0LjF6J11baWQ9J1hNTElEXzQ0XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QyW2Q9J000MS42LDQwLjFoLTUuOGMtMC42LDAtMS0wLjQtMS0xdi02LjdjMC0wLjYsMC40LTEsMS0xaDUuOGMwLjYsMCwxLDAuNCwxLDF2Ni43IEM0Mi42LDM5LjcsNDIuMiw0MC4xLDQxLjYsNDAuMXonXVtpZD0nWE1MSURfNDNfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDJbZD0nTTQxLjYsNTQuMmgtNS44Yy0wLjYsMC0xLTAuNC0xLTF2LTYuN2MwLTAuNiwwLjQtMSwxLTFoNS44YzAuNiwwLDEsMC40LDEsMXY2LjcgQzQyLjYsNTMuOCw0Mi4yLDU0LjIsNDEuNiw1NC4yeiddW2lkPSdYTUxJRF80Ml8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNMjMuNCw0Ni4ybDI1LDE3LjhjMC4zLDAuMiwwLjcsMC4yLDEuMSwwbDI2LjgtMTkuOGwtMy4zLDMwLjlIMjcuN0wyMy40LDQ2LjJ6J11baWQ9J1hNTElEXzQxXyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QzW2Q9J003NC45LDQ1LjJMNDkuNSw2My41Yy0wLjMsMC4yLTAuNywwLjItMS4xLDBMMjMuMiw0NS4yJ11baWQ9J1hNTElEXzQwXyddXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5mb250LTE0Lm10LTJcIiwgW1xuICAgICAgICAgICAgICAgICAgICBcIkEgZW1haWwgaGFzIGJlZW4gc2VuZCB0byBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcImJcIiwgQ29uZmlybU1haWxEYXRhLmdldFZlcmlmeUVtYWlsKCkpLFxuICAgICAgICAgICAgICAgICAgICBcIi4gUGxlYXNlIGNoZWNrIGZvciBhbiBlbWFpbCBmcm9tIFNtYXJ0RnVuZGluZyBhbmQgY2xpY2sgb24gdGhlIGluY2x1ZGVkIGxpbmsgdG8gcmVzZXQgeW91ciBwYXNzd29yZC5cIlxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLW1kLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodC5tdC0zW2hyZWY9Jy8nXVwiLFxuICAgICAgICAgICAgICAgICAgICB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJCYWNrIHRvIEhvbWVcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBbXG4gICAgICAgICAgICBcIjIwMTggwqkgU21hcnRGdW5kaW5nIHwgXCIsXG4gICAgICAgICAgICBtKFwiYVtocmVmPScvcHJpdmFjeSddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBcIlByaXZhY3kgUG9saWN5XCIpXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuY29uc3QgQ29uZmlybU1haWxEYXRhID0ge1xuICBnZXRWZXJpZnlFbWFpbCgpIHtcbiAgICBsZXQgZW1haWwgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidmVyaWZ5X2VtYWlsXCIpO1xuICAgIHJldHVybiBlbWFpbDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi5hY2NvdW50LWNvbnRlbnQudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcInN2Z1t2ZXJzaW9uPScxLjEnXVt2aWV3Qm94PScwIDAgOTggOTgnXVt4PScwcHgnXVt4bWw6c3BhY2U9J3ByZXNlcnZlJ11beG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ11beG1sbnM6Z3JhcGg9JyZuc19ncmFwaHM7J11beG1sbnM6aT0nJm5zX2FpOyddW3htbG5zOng9JyZuc19leHRlbmQ7J11beG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXVt5PScwcHgnXVwiLCB7IHN0eWxlOiB7IFwiaGVpZ2h0XCI6IFwiMTIwcHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInN0eWxlW3R5cGU9J3RleHQvY3NzJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICBcIi5zdDB7ZmlsbDojRkZGRkZGO31cXFxuICAgICAgICAgICAgICAgICAgICAgICAuc3Qxe2ZpbGw6IzAyYThiNTt9XFxcbiAgICAgICAgICAgICAgICAgICAgICAgLnN0MntmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMmE4YjU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxcXG4gICAgICAgICAgICAgICAgICAgICAgIC5zdDN7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwiZ1tpOmV4dHJhbmVvdXM9J3NlbGYnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImNpcmNsZS5zdDBbY3g9JzQ5J11bY3k9JzQ5J11baWQ9J1hNTElEXzUwXyddW3I9JzQ5J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImdbaWQ9J1hNTElEXzRfJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J003Ny4zLDQyLjdWNzdjMCwwLjYtMC40LDEtMSwxSDIxLjdjLTAuNSwwLTEtMC41LTEtMVY0Mi43YzAtMC4zLDAuMS0wLjYsMC40LTAuOGwyNy4zLTIxLjcgYzAuMy0wLjMsMC44LTAuMywxLjIsMGwyNy4zLDIxLjdDNzcuMSw0Mi4xLDc3LjMsNDIuNCw3Ny4zLDQyLjd6J11baWQ9J1hNTElEXzQ5XyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QyW2Q9J002Ni41LDY5LjVoLTM1Yy0xLjEsMC0yLTAuOS0yLTJWMjYuOGMwLTEuMSwwLjktMiwyLTJoMzVjMS4xLDAsMiwwLjksMiwydjQwLjcgQzY4LjUsNjguNiw2Ny42LDY5LjUsNjYuNSw2OS41eiddW2lkPSdYTUxJRF80OF8nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MVtkPSdNNjIuOSwzMy40SDQ3LjJjLTAuNSwwLTAuOS0wLjQtMC45LTAuOXYtMC4yYzAtMC41LDAuNC0wLjksMC45LTAuOWgxNS43IGMwLjUsMCwwLjksMC40LDAuOSwwLjl2MC4yQzYzLjgsMzMsNjMuNCwzMy40LDYyLjksMzMuNHonXVtpZD0nWE1MSURfNDdfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNDAuM0g0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDM5LjksNjMuNCw0MC4zLDYyLjksNDAuM3onXVtpZD0nWE1MSURfNDZfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNDcuMkg0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDQ2LjgsNjMuNCw0Ny4yLDYyLjksNDcuMnonXVtpZD0nWE1MSURfNDVfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDFbZD0nTTYyLjksNTQuMUg0Ny4yYy0wLjUsMC0wLjktMC40LTAuOS0wLjl2LTAuMmMwLTAuNSwwLjQtMC45LDAuOS0wLjloMTUuNyBjMC41LDAsMC45LDAuNCwwLjksMC45djAuMkM2My44LDUzLjcsNjMuNCw1NC4xLDYyLjksNTQuMXonXVtpZD0nWE1MSURfNDRfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDJbZD0nTTQxLjYsNDAuMWgtNS44Yy0wLjYsMC0xLTAuNC0xLTF2LTYuN2MwLTAuNiwwLjQtMSwxLTFoNS44YzAuNiwwLDEsMC40LDEsMXY2LjcgQzQyLjYsMzkuNyw0Mi4yLDQwLjEsNDEuNiw0MC4xeiddW2lkPSdYTUxJRF80M18nXVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MltkPSdNNDEuNiw1NC4yaC01LjhjLTAuNiwwLTEtMC40LTEtMXYtNi43YzAtMC42LDAuNC0xLDEtMWg1LjhjMC42LDAsMSwwLjQsMSwxdjYuNyBDNDIuNiw1My44LDQyLjIsNTQuMiw0MS42LDU0LjJ6J11baWQ9J1hNTElEXzQyXyddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QxW2Q9J00yMy40LDQ2LjJsMjUsMTcuOGMwLjMsMC4yLDAuNywwLjIsMS4xLDBsMjYuOC0xOS44bC0zLjMsMzAuOUgyNy43TDIzLjQsNDYuMnonXVtpZD0nWE1MSURfNDFfJ11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5zdDNbZD0nTTc0LjksNDUuMkw0OS41LDYzLjVjLTAuMywwLjItMC43LDAuMi0xLjEsMEwyMy4yLDQ1LjInXVtpZD0nWE1MSURfNDBfJ11cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTQubXQtMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiQSBlbWFpbCBoYXMgYmVlbiBzZW5kIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYlwiLCBDb25maXJtTWFpbERhdGEuZ2V0VmVyaWZ5RW1haWwoKSksXG4gICAgICAgICAgICAgICAgICAgIFwiLiBQbGVhc2UgY2hlY2sgZm9yIGFuIGVtYWlsIGZyb20gU21hcnRGdW5kaW5nIGFuZCBjbGljayBvbiB0aGUgaW5jbHVkZWQgbGluayB0byB2ZXJpZnkgeW91ciBhY2NvdW50LlwiXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0Lm10LTNbaHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBcIkJhY2sgdG8gSG9tZVwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFtcbiAgICAgICAgICAgIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmcgfCBcIixcbiAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy9wcml2YWN5J11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiUHJpdmFjeSBQb2xpY3lcIilcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgaGVhZGVyIGZyb20gXCJ3aWRnZXRzL2hlYWRlclwiO1xuaW1wb3J0IGZvb3RlciBmcm9tIFwid2lkZ2V0cy9mb290ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShoZWFkZXIpLFxuICAgICAgbShcIi53cmFwcGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsIFtcbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tMTJcIixcbiAgICAgICAgICAgICAgbShcIi5wYWdlLXRpdGxlLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5idG4tZ3JvdXAucHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgbShcIm9sLmJyZWFkY3J1bWIuaGlkZS1waG9uZS5wLTAubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJTbWFydEZ1bmRpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbS5hY3RpdmVcIiwgXCJGQVFcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucGFnZS10aXRsZVwiLCBcIkZBUVwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyXCIsXG4gICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXJcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoM1tjbGFzcz0nJ11cIiwgXCJGcmVxdWVudGx5IEFza2VkIFF1ZXN0aW9uc1wiKSxcbiAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkXCIsIFtcbiAgICAgICAgICAgICAgICAgIFwiSGVyZSB5b3UgY2FuIGZpbmQgdGhlIG1vc3QgZnJlcXVlbnRseSBhc2sgcXVlc3Rpb24uIElmIHlvdSBjYW4ndCBmaW5kIHlvdXIgYW5zd2VyIGhlcmVcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJiclwiKSxcbiAgICAgICAgICAgICAgICAgIFwieW91IGNhbiBjb250YWN0IHVzIGJ5IGFueSBtZWFucyB1c2luZyB0aGUgbGlua3MgYmVsb3c6XCJcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tc3VjY2Vzcy53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubS10LTEwW3R5cGU9J2J1dHRvbiddXCIsIFwiRW1haWwgdXMgeW91ciBxdWVzdGlvblwiKSxcbiAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tcHJpbWFyeS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubS10LTEwW3R5cGU9J2J1dHRvbiddXCIsIFwiU2VuZCB1cyBhIHR3ZWV0XCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtKFwiLnJvdy5tLXQtNTAucHQtM1wiLCBbXG4gICAgICAgICAgICBtKFwiLmNvbC1sZy01Lm9mZnNldC1sZy0xXCIsIFtcbiAgICAgICAgICAgICAgbShcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5xdWVzdGlvbi1xLWJveFwiLCBcIlEuXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJoNC5xdWVzdGlvbltkYXRhLXdvdy1kZWxheT0nLjFzJ11cIiwgXCJJIHdhbnQgdG8gY2hhbmdlIG15IFNtYXJ0RnVuZGluZyBhY2NvdW50IGRldGFpbHMuIEhvdyBkbyBJIGRvIHRoaXM/ID9cIiksXG4gICAgICAgICAgICAgICAgbShcInAuYW5zd2VyXCIsXG4gICAgICAgICAgICAgICAgICBcIlRoZSBiZXN0IHdheSBhdCB0aGUgbW9tZW50IGlzIHRvIHNlbmQgYW4gZW1haWwgdG8gaGlAc21hcnRmdW5kaW5nLnNnLiBXZSBhcmUgaW1wbGVtZW50aW5nIG1vcmUgZmVhdHVyZXMgb24gb3VyIHBsYXRmb3JtIG92ZXIgdGltZSwgc28geW91IHdpbGwgYmUgYWJsZSB0byBjaGFuZ2UgeW91ciBiYXNpYyBwcm9maWxlIHRoZXJlIGFzIHdlbGwuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBtKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLnF1ZXN0aW9uLXEtYm94XCIsIFwiUS5cIiksXG4gICAgICAgICAgICAgICAgbShcImg0LnF1ZXN0aW9uXCIsIFwiSSBmb3Jnb3QgbXkgU21hcnRGdW5kaW5nIGFjY291bnQgcGFzc3dvcmQuIEhvdyBkbyBJIHJldHJpZXZlIGFuZC9vciBjaGFuZ2UgaXQ/XCIpLFxuICAgICAgICAgICAgICAgIG0oXCJwLmFuc3dlclwiLFxuICAgICAgICAgICAgICAgICAgXCJZb3UgY2FuIGNoYW5nZSBpdCBieSBjbGlja2luZyBvbiBcXFwiRm9yZ290IHlvdXIgcGFzc3dvcmRcXFwiIG9uIHRoZSBsb2dpbiBwYWdlLiBZb3Ugd2lsbCByZWNlaXZlIGFuIGVtYWlsIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQgYWZ0ZXIuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBtKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLnF1ZXN0aW9uLXEtYm94XCIsIFwiUS5cIiksXG4gICAgICAgICAgICAgICAgbShcImg0LnF1ZXN0aW9uXCIsIFwiSSB3YW50IHRvIGNsb3NlIG15IFNtYXJ0RnVuZGluZyBhY2NvdW50LiBIb3cgZG8gSSBnbyBhYm91dCBkb2luZyBpdD9cIiksXG4gICAgICAgICAgICAgICAgbShcInAuYW5zd2VyXCIsXG4gICAgICAgICAgICAgICAgICBcIllvdSBjYW4gc2VuZCBhbiBlbWFpbCB0byBoaUBzbWFydGZ1bmRpbmcuc2cgd2l0aCB5b3VyIG5hbWUgYW5kIEludmVzdG9yIElEIGFuZCB3ZSB3aWxsIGNsb3NlIHRoZSBhY2NvdW50IGZvciB5b3UuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBtKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLnF1ZXN0aW9uLXEtYm94XCIsIFwiUS5cIiksXG4gICAgICAgICAgICAgICAgbShcImg0LnF1ZXN0aW9uW2RhdGEtd293LWRlbGF5PScuMXMnXVwiLCBcIkNhbiBJIG93biBtdWx0aXBsZSBTbWFydEZ1bmRpbmcgYWNjb3VudHM/XCIpLFxuICAgICAgICAgICAgICAgIG0oXCJwLmFuc3dlclwiLFxuICAgICAgICAgICAgICAgICAgXCJObywgeW91IGNhbiBjdXJyZW50bHkgb25seSBvd24gb25lIGludmVzdG9yIGFjY291bnQgYW5kIG9uZSBib3Jyb3dlciBhY2NvdW50IHdpdGggU21hcnRGdW5kaW5nIGVhY2guXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIG0oXCIuY29sLWxnLTVcIiwgW1xuICAgICAgICAgICAgICBtKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLnF1ZXN0aW9uLXEtYm94XCIsXG4gICAgICAgICAgICAgICAgICBcIlEuXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJoNC5xdWVzdGlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJJcyBzYWZlIHVzZSBMb3JlbSBJcHN1bT9cIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcInAuYW5zd2VyXCIsXG4gICAgICAgICAgICAgICAgICBcIkxvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeSdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBtKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiLnF1ZXN0aW9uLXEtYm94XCIsIFwiUS5cIiksXG4gICAgICAgICAgICAgICAgbShcImg0LnF1ZXN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICBcIldoZW4gY2FuIGJlIHVzZWQ/XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJwLmFuc3dlclwiLFxuICAgICAgICAgICAgICAgICAgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgaW4gbWVhIG5vbnVtZXMgZGlzc2VudGlhcyBkaXNzZW50aXVudCwgcHJvIHRlIHNvbGV0IG9yYXRpbyBpcml1cmUuIEN1IHNpdCBjb25zZXRldHVyIG1vZGVyYXRpdXMgaW50ZWxsZWdhbSwgaXVzIGRlY29yZSBhY2N1c2FtdXMgdGUuIE5lIHByaW1pcyBzdWF2aXRhdGUgZGlzcHV0YW5kbyBuYW0uIE11dGF0IGNvbnZlbmlyZXRlLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgbShcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5xdWVzdGlvbi1xLWJveFwiLCBcIlEuXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJoNC5xdWVzdGlvblwiLCBbXG4gICAgICAgICAgICAgICAgICBcIkxpY2Vuc2UgXCIsXG4gICAgICAgICAgICAgICAgICBtLnRydXN0KFwiJmFtcDtcIiksXG4gICAgICAgICAgICAgICAgICBcIiBDb3B5cmlnaHRcIlxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCJwLmFuc3dlclwiLFxuICAgICAgICAgICAgICAgICAgXCJMb3JlbSBJcHN1bSBpcyBzaW1wbHkgZHVtbXkgdGV4dCBvZiB0aGUgcHJpbnRpbmcgYW5kIHR5cGVzZXR0aW5nIGluZHVzdHJ5LiBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnkncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgbShcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5xdWVzdGlvbi1xLWJveFwiLFxuICAgICAgICAgICAgICAgICAgXCJRLlwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucXVlc3Rpb25cIixcbiAgICAgICAgICAgICAgICAgIFwiSXMgc2FmZSB1c2UgTG9yZW0gSXBzdW0/XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJwLmFuc3dlclwiLFxuICAgICAgICAgICAgICAgICAgXCJMb3JlbSBJcHN1bSBpcyBzaW1wbHkgZHVtbXkgdGV4dCBvZiB0aGUgcHJpbnRpbmcgYW5kIHR5cGVzZXR0aW5nIGluZHVzdHJ5LiBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnkncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIG0oZm9vdGVyKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgaGVhZGVyIGZyb20gXCJ3aWRnZXRzL2hlYWRlclwiO1xuaW1wb3J0IGZvb3RlciBmcm9tIFwid2lkZ2V0cy9mb290ZXJcIjtcblxuaW1wb3J0IGF2YXRhciBmcm9tIFwiaW1hZ2VzL3VzZXJzL2F2YXRhci0yLmpwZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9uaW5pdCgpIHtcbiAgICAkKFwiLm5hdmJhci10b2dnbGVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlOiBFdmVudCkge1xuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gICAgICAkKFwiI25hdmlnYXRpb25cIikuc2xpZGVUb2dnbGUoNDAwKTtcbiAgICB9KTtcblxuICAgICQoXCIubmF2aWdhdGlvbi1tZW51PmxpXCIpLnNsaWNlKC0yKS5hZGRDbGFzcyhcImxhc3QtZWxlbWVudHNcIik7XG5cbiAgICAkKFwiLm5hdmlnYXRpb24tbWVudSBsaS5oYXMtc3VibWVudSBhW2hyZWY9JyMnXVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGU6IEV2ZW50KSB7XG4gICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkhIDwgOTkyKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcIm9wZW5cIikuZmluZChcIi5zdWJtZW51OmZpcnN0XCIpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoXCIuc2xpbXNjcm9sbFwiKS5zbGltU2Nyb2xsKHtcbiAgICAgIGhlaWdodDogXCJhdXRvXCIsXG4gICAgICBwb3NpdGlvbjogXCJyaWdodFwiLFxuICAgICAgc2l6ZTogXCI4cHhcIixcbiAgICAgIGNvbG9yOiBcIiM5ZWE1YWJcIlxuICAgIH0pO1xuICB9LFxuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShoZWFkZXIpLFxuICAgICAgbShcIi53cmFwcGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsXG5cbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tMTJcIixcbiAgICAgICAgICAgICAgbShcIi5wYWdlLXRpdGxlLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5idG4tZ3JvdXAucHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgbShcIm9sLmJyZWFkY3J1bWIuaGlkZS1waG9uZS5wLTAubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJTbWFydEZ1bmRpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbS5hY3RpdmVcIiwgXCJEYXNoYm9hcmRcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucGFnZS10aXRsZVwiLCBcIkRhc2hib2FyZFwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG5cbiAgICAgICAgICBtKFwiLnJvd1wiLCBbXG4gICAgICAgICAgICBtKFwiLmNvbC1sZy04XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoNC5oZWFkZXItdGl0bGUubWItM1wiLCBcIldhbGxldCBCYWxhbmNlc1wiKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRhYmxlLXJlc3BvbnNpdmVcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJ0YWJsZS50YWJsZS50YWJsZS1ob3Zlci50YWJsZS1jZW50ZXJlZC5tLTBcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwidGhlYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwidGhcIiwgXCJCYWxhbmNlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiUmVzZXJ2ZWQgaW4gb3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInRoXCIsIFwiQWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcInRib2R5XCIsIFtcblxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbShcIi5jb2wtbGctNFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDQubS10LTAuaGVhZGVyLXRpdGxlXCIsIFwiVG90YWwgV2FsbGV0IEJhbGFuY2VcIiksXG4gICAgICAgICAgICAgICAgbShcIltpZD0nZG9udXQtY2hhcnQnXVwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5mbG90LWNoYXJ0Lm10LTVbaWQ9J2RvbnV0LWNoYXJ0LWNvbnRhaW5lciddXCIsIHsgc3R5bGU6IHsgXCJoZWlnaHRcIjogXCIzNDBweFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIG0oZm9vdGVyKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgXCJzdHlsZXMvYXBwXCI7XG5pbXBvcnQgXCJzdHlsZXMvaWNvbnNcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcbmltcG9ydCBhdmF0YXIgZnJvbSBcImltYWdlcy91c2Vycy9hdmF0YXItNS5qcGdcIjtcblxuY29uc3QgTG9ja1NjcmVlbkRhdGEgPSB7XG4gIGdldEVtYWlsKCkge1xuICAgIGxldCBlbWFpbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZW1haWxcIik7XG4gICAgcmV0dXJuIGVtYWlsO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCIubWItM1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiaW1nLnJvdW5kZWQtY2lyY2xlLmltZy10aHVtYm5haWwudGh1bWItbGdbYWx0PSd0aHVtYm5haWwnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgc3JjOiBhdmF0YXJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm0tYi0wLmZvbnQtMTRcIiwgXCJFbnRlciB5b3VyIHBhc3N3b3JkIHRvIGFjY2VzcyB5b3VyIGFjY291bnQuXCIpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcImZvcm0uZm9ybS1ob3Jpem9udGFsW2FjdGlvbj0namF2YXNjcmlwdDo7J11cIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImlucHV0W3R5cGU9J2hpZGRlbiddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IExvY2tTY3JlZW5EYXRhLmdldEVtYWlsKClcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvd1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ncGFzc3dvcmQnXVwiLCBcIlBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3Bhc3N3b3JkJ11bcGxhY2Vob2xkZXI9J0VudGVyIHlvdXIgcGFzc3dvcmQnXVtyZXF1aXJlZF1bdHlwZT0ncGFzc3dvcmQnXVwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIiwgXCJMb2cgSW5cIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCIucm93Lm0tdC01MFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tMTIudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJOb3QgeW91PyByZXR1cm5cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubWwtMltocmVmPScvbG9naW4nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgbShcImJcIiwgXCJTaWduIEluXCIpKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgW1xuICAgICAgICAgICAgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZyB8IFwiLFxuICAgICAgICAgICAgbShcImFbaHJlZj0nL3ByaXZhY3knXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJQcml2YWN5IFBvbGljeVwiKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCJjb25maWdzXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmNvbnN0IExvZ2luQWNjb3VudERhdGEgPSB7XG4gIGVtYWlsOiBcIlwiLFxuICBwYXNzd29yZDogXCJcIixcblxuICBjYW5TYXZlKCkge1xuICAgIHJldHVybiBMb2dpbkFjY291bnREYXRhLmVtYWlsICE9PSBcIlwiICYmXG4gICAgICBMb2dpbkFjY291bnREYXRhLnBhc3N3b3JkICE9PSBcIlwiO1xuICB9LFxuICBzYXZlKCkge1xuICAgIGNvbnN0IGFjY291bnQgPSB7XG4gICAgICB1c2VyOiB7XG4gICAgICAgIGVtYWlsOiBMb2dpbkFjY291bnREYXRhLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogTG9naW5BY2NvdW50RGF0YS5wYXNzd29yZFxuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaChBcHBTZXR0aW5ncy5BUElfQkFTRV9VUkwgKyBcIi9hcGkvc2Vzc2lvbi9sb2dpblwiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYWNjb3VudCksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuc3VjY2VzcyAmJiByZXMudXNlci50b2tlbikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVtYWlsXCIsIHJlcy51c2VyLmVtYWlsKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCByZXMudXNlci50b2tlbik7XG4gICAgICAgIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvclwiLCByZXMubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oXCIuYWNjb3VudGJnXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBcImJhY2tncm91bmRcIjogYHVybCgke2JnfSlgLFxuICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IFwiY292ZXJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG0oXCIud3JhcHBlci1wYWdlLmFjY291bnQtcGFnZS1mdWxsXCIsIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSxcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJmb3JtW21ldGhvZD0ncG9zdCddXCIsIHtcbiAgICAgICAgICAgICAgICAgIG9uc3VibWl0OiAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBMb2dpbkFjY291bnREYXRhLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAubS1iLTIwLnJvd1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWxhZGRyZXNzJ11cIiwgXCJFbWFpbCBhZGRyZXNzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J2VtYWlsYWRkcmVzcyddW3BsYWNlaG9sZGVyPSdFbnRlciB5b3VyIGVtYWlsJ11bcmVxdWlyZWQ9JyddW3R5cGU9J2VtYWlsJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgTG9naW5BY2NvdW50RGF0YS5lbWFpbCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTG9naW5BY2NvdW50RGF0YS5lbWFpbFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtbXV0ZWQucHVsbC1yaWdodFtocmVmPScvcmVjb3Zlci1wYXNzd29yZCddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInNtYWxsXCIsIFwiRm9yZ290IHlvdXIgcGFzc3dvcmQ/XCIpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdwYXNzd29yZCddXCIsIFwiUGFzc3dvcmRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0ncGFzc3dvcmQnXVtwbGFjZWhvbGRlcj0nRW50ZXIgeW91ciBwYXNzd29yZCddW3JlcXVpcmVkPScnXVt0eXBlPSdwYXNzd29yZCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IG0ud2l0aEF0dHIoXCJ2YWx1ZVwiLCAodjogc3RyaW5nKSA9PiB7IExvZ2luQWNjb3VudERhdGEucGFzc3dvcmQgPSB2IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IExvZ2luQWNjb3VudERhdGEucGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcIi5jaGVja2JveC5jaGVja2JveC1jdXN0b21cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0W2NoZWNrZWQ9JyddW2lkPSdyZW1lbWJlciddW3R5cGU9J2NoZWNrYm94J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdyZW1lbWJlciddXCIsIFwiUmVtZW1iZXIgbWVcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy50ZXh0LWNlbnRlci5tLXQtMTBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFMb2dpbkFjY291bnREYXRhLmNhblNhdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIH0sIFwiU2lnbiBJblwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcIi5yb3cubS10LTUwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS0xMi50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIkRvbid0IGhhdmUgYW4gYWNjb3VudD8gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1kYXJrLm0tbC01W2hyZWY9Jy9yZWdpc3RlciddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBtKFwiYlwiLCBcIlNpZ24gVXBcIikpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgbShcIi5tLXQtNDAudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICBtKFwicC5hY2NvdW50LWNvcHlyaWdodFwiLCBbXG4gICAgICAgICAgICBcIjIwMTggwqkgU21hcnRGdW5kaW5nIHwgXCIsXG4gICAgICAgICAgICBtKFwiYVtocmVmPScvcHJpdmFjeSddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBcIlByaXZhY3kgUG9saWN5XCIpXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMi5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBvbmluaXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJlbWFpbFwiKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICB9LFxuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwgW1xuICAgICAgICBtKFwiLmNhcmRcIixcbiAgICAgICAgICBtKFwiLmNhcmQtYmxvY2tcIixcbiAgICAgICAgICAgIG0oXCIuYWNjb3VudC1ib3hcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC5wLTVcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJoMi50ZXh0LXVwcGVyY2FzZS50ZXh0LWNlbnRlci5wYi00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LXN1Y2Nlc3NbaHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LFxuICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBtKFwiaW1nW2FsdD0nJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi50ZXh0LWNlbnRlci5tLWItMjBcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcIi5tLWItMjBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jaGVja21hcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3ZnW2VuYWJsZS1iYWNrZ3JvdW5kPSduZXcgMCAwIDE2MS4yIDE2MS4yJ11baWQ9J0xheWVyXzEnXVt2ZXJzaW9uPScxLjEnXVt2aWV3Qm94PScwIDAgMTYxLjIgMTYxLjInXVt4PScwcHgnXVt4bWw6c3BhY2U9J3ByZXNlcnZlJ11beG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ11beG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXVt5PScwcHgnXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwicGF0aC5wYXRoW2Q9J000MjUuOSw1Mi4xTDQyNS45LDUyLjFjLTIuMi0yLjYtNi0yLjYtOC4zLTAuMWwtNDIuNyw0Ni4ybC0xNC4zLTE2LjQgYy0yLjMtMi43LTYuMi0yLjctOC42LTAuMWMtMS45LDIuMS0yLDUuNi0wLjEsNy43bDE3LjYsMjAuM2MwLjIsMC4zLDAuNCwwLjYsMC42LDAuOWMxLjgsMiw0LjQsMi41LDYuNiwxLjRjMC43LTAuMywxLjQtMC44LDItMS41IGMwLjMtMC4zLDAuNS0wLjYsMC43LTAuOWw0Ni4zLTUwLjFDNDI3LjcsNTcuNSw0MjcuNyw1NC4yLDQyNS45LDUyLjF6J11bZmlsbD0nbm9uZSddW3N0cm9rZT0nIzMyYzg2MSddW3N0cm9rZS1taXRlcmxpbWl0PScxMCddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcImNpcmNsZS5wYXRoW2N4PSc4MC42J11bY3k9JzgwLjYnXVtmaWxsPSdub25lJ11bcj0nNjIuMSddW3N0cm9rZT0nIzMyYzg2MSddW3N0cm9rZS1taXRlcmxpbWl0PScxMCddW3N0cm9rZS13aWR0aD0nNCddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbShcInBvbHlsaW5lLnBhdGhbZmlsbD0nbm9uZSddW3BvaW50cz0nMTEzLDUyLjggNzQuMSwxMDguNCA0OC4yLDg2LjQgJ11bc3Ryb2tlPScjMzJjODYxJ11bc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJ11bc3Ryb2tlLW1pdGVybGltaXQ9JzEwJ11bc3Ryb2tlLXdpZHRoPSc2J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwiY2lyY2xlLnNwaW5bY3g9JzgwLjYnXVtjeT0nODAuNiddW2ZpbGw9J25vbmUnXVtyPSc3My45J11bc3Ryb2tlPScjMzJjODYxJ11bc3Ryb2tlLWRhc2hhcnJheT0nMTIuMjE3NSwxMi4yMTc1J11bc3Ryb2tlLW1pdGVybGltaXQ9JzEwJ11bc3Ryb2tlLXdpZHRoPSc0J11cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcImg0XCIsIFwiU2VlIFlvdSBBZ2FpbiAhXCIpLFxuICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5mb250LTE0Lm0tdC0xMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIFwiWW91IGFyZSBub3cgc3VjY2Vzc2Z1bGx5IHNpZ24gb3V0LiBCYWNrIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubS1yLTVbaHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBtKFwiYlwiLCBcIlNpZ24gSW5cIikpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFtcbiAgICAgICAgICAgIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmcgfCBcIixcbiAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy9wcml2YWN5J11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiUHJpdmFjeSBQb2xpY3lcIilcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0xLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJoMS50ZXh0LWVycm9yXCIsIFwiNDA0XCIpLFxuICAgICAgICAgICAgICAgICAgbShcImg0LnRleHQtdXBwZXJjYXNlLnRleHQtZGFuZ2VyLm10LTNcIiwgXCJQYWdlIE5vdCBGb3VuZFwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQubXQtM1wiLCBcIkl0J3MgbG9va2luZyBsaWtlIHlvdSBtYXkgaGF2ZSB0YWtlbiBhIHdyb25nIHR1cm4uIERvbid0IHdvcnJ5Li4uIGl0IGhhcHBlbnMgdG8gdGhlIGJlc3Qgb2YgdXMuIEhlcmUncyBhIGxpdHRsZSB0aXAgdGhhdCBtaWdodCBoZWxwIHlvdSBnZXQgYmFjayBvbiB0cmFjay5cIiksXG4gICAgICAgICAgICAgICAgICBtKFwiYS5idG4uYnRuLW1kLmJ0bi1ibG9jay5idG4tY3VzdG9tLndhdmVzLWVmZmVjdC53YXZlcy1saWdodC5tdC0zW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJSZXR1cm4gSG9tZVwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFtcbiAgICAgICAgICAgIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmcgfCBcIixcbiAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy9wcml2YWN5J11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiUHJpdmFjeSBQb2xpY3lcIilcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgaGVhZGVyIGZyb20gXCJ3aWRnZXRzL2hlYWRlclwiO1xuaW1wb3J0IGZvb3RlciBmcm9tIFwid2lkZ2V0cy9mb290ZXJcIjtcblxuaW1wb3J0IGJnIGZyb20gXCJpbWFnZXMvYmctMS5qcGdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShoZWFkZXIpLFxuICAgICAgbShcIi53cmFwcGVyXCIsXG4gICAgICAgIG0oXCIuY29udGFpbmVyLWZsdWlkXCIsIFtcbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtc20tMTJcIixcbiAgICAgICAgICAgICAgbShcIi5wYWdlLXRpdGxlLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcIi5idG4tZ3JvdXAucHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgbShcIm9sLmJyZWFkY3J1bWIuaGlkZS1waG9uZS5wLTAubS0wXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJTbWFydEZ1bmRpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxpLmJyZWFkY3J1bWItaXRlbS5hY3RpdmVcIiwgXCJQYWdlIE5vdCBGb3VuZFwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJoNC5wYWdlLXRpdGxlXCIsIFwiUGFnZSBOb3QgRm91bmRcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIG0oXCIucm93XCIsXG4gICAgICAgICAgICBtKFwiLmNvbC1zbS02Lm9mZnNldC0zXCIsXG4gICAgICAgICAgICAgIG0oXCIudGV4dC1jZW50ZXIubXQtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgxLnRleHQtZXJyb3JcIiwgXCI0MDRcIiksXG4gICAgICAgICAgICAgICAgbShcImg0LnRleHQtdXBwZXJjYXNlLnRleHQtZGFuZ2VyLm10LTNcIiwgXCJQYWdlIE5vdCBGb3VuZFwiKSxcbiAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm10LTNcIixcbiAgICAgICAgICAgICAgICAgIFwiSXQncyBsb29raW5nIGxpa2UgeW91IG1heSBoYXZlIHRha2VuIGEgd3JvbmcgdHVybi4gRG9uJ3Qgd29ycnkuLi4gaXRcXFxuICAgICAgICAgICAgICAgICAgICBoYXBwZW5zIHRvIHRoZSBiZXN0IG9mIHVzLiBIZXJlJ3MgYSBsaXR0bGUgdGlwIHRoYXQgbWlnaHQgaGVscCB5b3UgZ2V0IGJhY2sgb24gdHJhY2suXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubXQtM1tocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiUmV0dXJuIEhvbWVcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgICAgbShmb290ZXIpXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgc2hvd2Rvd24gZnJvbSBcInNob3dkb3duXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTEuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmNvbnN0IHByaXZhY3lQb2xpY3kgPSBgXG4jIyMgU21hcnRGdW5kaW5nIFB0ZS4gTHRkLiBQcml2YWN5IFBvbGljeVxuXG5TbWFydEZ1bmRpbmcgUHRlLiBMdGQuIHRha2VzIHRoZSBwcml2YWN5IGFuZCBjb25maWRlbnRpYWxpdHkgb2YgVXNlcnMgb2YgdGhpcyB3ZWJzaXRlIHNlcmlvdXNseS4gSXQgaXMgZW1waGFzaXNlZCB0byB0aGUgVXNlcnMgb2YgdGhpcyB3ZWJzaXRlIHRoYXQgdGhleSByZWFkIHRoaXMgcHJpdmFjeSBwb2xpY3kgKFwidGhlIFBvbGljeVwiKSBjYXJlZnVsbHkgYmVmb3JlIHVzaW5nIHRoZSBzZXJ2aWNlcyBwcm92aWRlZCBpbiB0aGlzIHdlYnNpdGUuIEJ5IGFjY2Vzc2luZyBhbmQgdXNpbmcgdGhlIHNlcnZpY2VzIG9uIG91ciB3ZWJzaXRlLCB0aGUgVXNlcnMgYWNrbm93bGVkZ2VzIHRoYXQgdGhleSBoYXZlIHJlYWQsIHVuZGVyc3Rvb2QgYW5kIGFncmVlZCB0byB0aGUgY29udGVudHMgd3JpdHRlbiBpbiB0aGlzIFBvbGljeS5cblxuMS4gUGVyc29uYWwgRGF0YSBDb2xsZWN0aW9uXG4gICAgMS4gRHVyaW5nIHRoZSBjb3Vyc2Ugb2YgdXNpbmcgdGhlIHNlcnZpY2VzIG9mIG91ciB3ZWJzaXRlLCB3ZSBtYXkgY29sbGVjdCwgc3RvcmUgYW5kIHVzZSB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIHdoaWNoIGluY2x1ZGVzLCBidXQgbm90IGxpbWl0ZWQgdG8sIHRoZSBmb2xsb3dpbmc6XG4gICAgICAoaSkgaW5mb3JtYXRpb24gYWJvdXQgeW91ciBjb21wdXRlciwgeW91ciB2aXNpdHMgYW5kIHVzZSBvZiBvdXIgd2Vic2l0ZTtcbiAgICAgIChpaSkgaW5mb3JtYXRpb24gcHJvdmlkZWQgYnkgeW91IHRvIHVzIHdoZW4gcmVnaXN0ZXJpbmcgd2l0aCBvdXIgd2Vic2l0ZSBmb3IgYW55IHJlbGV2YW50IHB1cnBvc2VzIHN1Y2ggYXMgcmVnaXN0cmF0aW9uIGZvciB3ZWJzaXRlIGluZm9ybWF0aW9uLCBub3RpZmljYXRpb25zIGFuZCBuZXdzbGV0dGVycywgcmVnaXN0cmF0aW9uIG9mIG5ldyB1c2VyIHByb2ZpbGUgYW5kL29yIHB1YmxpY2F0aW9uIG9mIGluZm9ybWF0aW9uIG9uIG91ciB3ZWJzaXRlO1xuICAgICAgKGlpaSkgaW5mb3JtYXRpb24gb24gYW55IGNvbW11bmljYXRpb24gdGhhdCB5b3Ugc2VudCB0byB1cyBvciB0aHJvdWdoIG91ciB3ZWJzaXRlO1xuICAgICAgKGl2KSBhbnkgb3RoZXIgcGVyc29uYWwgaW5mb3JtYXRpb24gdGhhdCB5b3UgbWF5IGNob29zZSB0byBzZW5kIHRvIHVzIGluIHRoZSBjb3Vyc2Ugb2YgdXNpbmcgb3VyIHdlYnNpdGUuXG5cbjIuIFVzYWdlIG9mIFBlcnNvbmFsIEluZm9ybWF0aW9uXG4gICAgMS4gUGVyc29uYWwgaW5mb3JtYXRpb24gcHJvdmlkZWQgdG8gdGhlIHdlYnNpdGUgYnkgeW91IHdpbGwgYmUgdXNlZCBmb3IsIGJ1dCBub3QgbGltaXRlZCB0bywgdGhlIGZvbGxvd2luZyBwdXJwb3NlczpcbiAgICAgIChpKSBhZG1pbmlzdGVyIHRoZSB3ZWJzaXRlO1xuICAgICAgKGlpKSBlbmFibGUgeW91IHRvIHVzZSB0aGUgc2VydmljZXMgcHJvdmlkZWQgYnkgdGhlIHdlYnNpdGU7XG4gICAgICAoaWlpKSBzZW5kaW5nIG5vdGlmaWNhdGlvbnMgdGhyb3VnaCBlLW1haWwgdG8geW91O1xuICAgICAgKGl2KSBzZW5kaW5nIG1hcmtldGluZyBhbmQgbm9uLW1hcmtldGluZyBjb21tZXJjaWFsIGNvbW11bmljYXRpb25zIHRvIHlvdTtcbiAgICAgICh2KSBzZW5kaW5nIG5vdGlmaWNhdGlvbnMgb3IgZS1tYWlsIG5ld3NsZXR0ZXJzIGlmIHByZXZpb3VzbHkgcmVxdWVzdGVkIGJ5IHlvdTtcbiAgICAgICh2aSkgdG8gcHJvdmlkZSBzdWZmaWNpZW50IGluZm9ybWF0aW9uIG9uIHRoZSB3ZWJzaXRlIHRvIGlkZW50aWZ5IHlvdSB0byBJbnZlc3RvcnMgYW5kL29yIEJvcnJvd2VycztcbiAgICAgICh2aWkpIHRvIGRlYWwgd2l0aCBhbnkgcXVlc3Rpb25zIG9yIGNvbXBsYWludHMgbWFkZSBieSBvciBhYm91dCB5b3UgaW4gcmVsYXRpb24gdG8gb3VyIHdlYnNpdGU7XG4gICAgICAodmlpaSkgdG8gYmUga2VwdCBhbmQgc3RvcmVkIHRvIHByZXZlbnQgZnJhdWQgYW5kIHRvIHNlY3VyZSBvdXIgd2Vic2l0ZSBmb3Igb3VyIGxlZ2FsIGFuZCBjb21wbGlhbmNlIHJlcXVpcmVtZW50cztcbiAgICAgIChpeCkgdG8gdmVyaWZ5IHlvdXIgY29tcGxpYW5jZSB3aXRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBnb3Zlcm5pbmcgdGhlIHVzZSBvZiBvdXIgd2Vic2l0ZS5cbiAgICAyLiBQZXJzb25hbCBpbmZvcm1hdGlvbiBzdWJtaXR0ZWQgYnkgeW91IHRvIHVzIGZvciB0aGUgcHVycG9zZXMgb2YgcHVibGljYXRpb24gb24gdGhlIHdlYnNpdGUgd2lsbCBiZSB1c2VkIGZvciB0aGUgc2FpZCBwdXJwb3NlcyBpbiBhY2NvcmRhbmNlIHdpdGggdGhlIGNvbnNlbnQgdGhhdCB5b3UgaGF2ZSBnaXZlbiB0byB1cy5cbiAgICAzLiBXZSBoZXJlYnkgZ2l2ZSB5b3UgYSBndWFyYW50ZWUgdGhhdCB3aXRob3V0IHlvdXIgZXhwcmVzcyBjb25zZW50LCB3ZSBzaGFsbCBub3Qgc3VwcGx5IGFueSBvZiB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIHRvIGFueSB1bnJlbGF0ZWQgdGhpcmQgcGFydHkgZm9yIHRoZWlyIG93biBwdXJwb3NlcyB1bmxlc3MgaXQgaXMgcmVxdWlyZWQgYnkgbGF3IHRvIGRvIHNvLlxuICAgIDQuIEFsbCBmaW5hbmNpYWwgdHJhbnNhY3Rpb25zIG1hZGUgYmV0d2VlbiB0aGUgSW52ZXN0b3IgYW5kIEJvcnJvd2VycyBvbiB0aGUgd2Vic2l0ZSBzaGFsbCBiZSBmYWNpbGl0YXRlZCB0aHJvdWdoIFNtYXJ0RnVuZGluZ3MgZXNjcm93IGFjY291bnQuIEZvciBzbW9vdGggdHJhbnNhY3Rpb25zIGJldHdlZW4gYWxsIHBhcnRpZXMsIHNvbWUgaW5mb3JtYXRpb24gbXVzdCBiZSBzaGFyZWQgdG8gdGhlIGVzY3JvdyBhZ2VudCB3aGljaCBtYWludGFpbnMgdGhlIHNhaWQgZXNjcm93IGFjY291bnQuIFdlIHdpbGwgb25seSBwcm92aWRlIHN1ZmZpY2llbnQgaW5mb3JtYXRpb24gdG8gdGhlIGV4dGVudCBuZWNlc3NhcnkgZm9yIHRoZSBlc2Nyb3cgYWdlbnQgdG8gZW5zdXJlIHNtb290aCB0cmFuc2FjdGlvbiBvZiBmdW5kcy4gVHJhbnNhY3Rpb24gb2YgZnVuZHMgaW5jbHVkZSBwcm9jZXNzaW5nIGFuZCByZWZ1bmRpbmcgbW9uaWVzLCBmZWVzLCBwYXltZW50cyBhbmQvb3IgcmVmdW5kIGFzIHdlbGwgYXMgZGVhbGluZyB3aXRoIGNvbXBsYWludHMgYW5kIHF1ZXJpZXMgcmVsYXRpbmcgdG8gc3VjaCBtb25pZXMsIGZlZXMsIHBheW1lbnRzIGFuZC9vciByZWZ1bmRzLlxuXG4zLlx0RGlzY2xvc2luZyBvZiBQZXJzb25hbCBJbmZvcm1hdGlvblxuICAgIDEuIEFsbCB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIHByb3ZpZGVkIHRvIHVzIG1heSwgaWYgcmVxdWlyZWQsIGJlIHByb2Nlc3NlZCBieSBhbnkgb2Ygb3VyIGVtcGxveWVlcywgb2ZmaWNlcnMsIHByb2Zlc3Npb25hbCBhZHZpc2VycywgYWdlbnRzIChcImF1dGhvcmlzZWQgcGVyc29ubmVsXCIpIHdoZXRoZXIgaW4gb3Igb3V0c2lkZSBvZiBTaW5nYXBvcmUuIFdlIGd1YXJhbnRlZSB0aGF0IGFjY2VzcyB0byBzdWNoIHBlcnNvbmFsIGluZm9ybWF0aW9uIHdpbGwgb25seSBiZSByZWxlYXNlZCBhbmQgdXNlZCBieSB0aGUgYXV0aG9yaXNlZCBwZXJzb25uZWwgdG8gZnVsZmlsIGFueSBvZiB0aGVpciBqb2IgcmVxdWlyZW1lbnRzLiBJdCBpcyBmdXJ0aGVyIGd1YXJhbnRlZWQgdGhhdCBvbmx5IG5lY2Vzc2FyeSBwZXJzb25hbCBpbmZvcm1hdGlvbiBzaGFsbCBiZSBzdXBwbGllZCB0byB0aGUgYXV0aG9yaXNlZCBwZXJzb25uZWwgZGVwZW5kaW5nIG9uIHRoZSBqb2IgcmVxdWlyZW1lbnQgYXQgaGFuZC5cbiAgICAyLiBXZSBtYXkgZnJvbSB0aW1lIHRvIHRpbWUgZGlzY2xvc2UgeW91ciBwZXJzb25hbCBpbmZvcm1hdGlvbiBpbiB0aGUgZm9sbG93aW5nIHNpdHVhdGlvbnM6XG4gICAgICAoaSkgdG8gdGhlIGV4dGVudCB3ZSBhcmUgcmVxdWlyZWQgdG8gZG8gc28gYnkgYW55IGxhdztcbiAgICAgIChpaSkgd2hlbiB0aGVyZSBhcmUgYW55IG9uZ29pbmcgb3IgcHJvc3BlY3RpdmUgbGVnYWwgcHJvY2VlZGluZ3M7XG4gICAgICAoaWlpKSB0byBlc3RhYmxpc2ggYW5kIGRlZmVuZCBvdXIgbGVnYWwgcmlnaHRzIHdoZW4gbmVjZXNzYXJ5O1xuICAgICAgKGl2KSB0byBhbnkgcGVyc29uIHdoZXJlIGl0IGlzIHJlYXNvbmFibHkgYmVsaWV2ZWQgdGhhdCB0aGUgc2FpZCBwZXJzb24gbWF5IGFwcGx5IG9yIGhhdmUgYXBwbGllZCB0byBhIGNvdXJ0IG9yIG90aGVyIGNvbXBldGVudCBhdXRob3JpdHkgZm9yIGFuIG9yZGVyIHRvIGRpc2Nsb3NlIHBlcnNvbmFsIGluZm9ybWF0aW9uLlxuXG40Llx0RGF0YSBUcmFuc2ZlcnNcbiAgICAxLiBQZXJzb25hbCBpbmZvcm1hdGlvbiBzdWJtaXR0ZWQgYnkgeW91IHNoYWxsIGJlIGNvbGxlY3RlZCwgc3RvcmVkIGFuZCBwcm9jZXNzZWQgYnkgdXMgYW5kIG1heSBiZSB0cmFuc2ZlcnJlZCB0byBvdGhlciBjb3VudHJpZXMgb3V0c2lkZSBvZiBTaW5nYXBvcmUgZGVwZW5kaW5nIG9uIHRoZSBsb2NhdGlvbiBvZiB0aGUgc2VydmVyKHMpIHRvIHNlY3VyZSBhbmQgc2FmZWd1YXJkIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24gd2hpY2ggaGF2ZSBiZWVuIHN1Ym1pdHRlZCB0byB1cy5cbiAgICAyLiBQZXJzb25hbCBpbmZvcm1hdGlvbiB3aGljaCBpcyBwdWJsaXNoZWQgYnkgeW91IG9yIHN1Ym1pdHRlZCBieSB5b3UgZm9yIHB1YmxpY2F0aW9uIG9uIG91ciB3ZWJzaXRlIG1heSBiZSBhdmFpbGFibGUgdG8gdGhlIHB1YmxpYyBpbiBvdGhlciBwYXJ0cyBvZiB0aGUgd29ybGQgdGhyb3VnaCB0aGUgSW50ZXJuZXQuIFlvdSBhY2tub3dsZWRnZSB0aGF0IHdlIGNhbm5vdCBwcmV2ZW50IHRoZSB1c2UgYW5kL29yIG1pc3VzZSBvZiB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIGJ5IG90aGVyIHBhcnRpZXMuXG5cbjUuXHRSZXRhaW5pbmcgUGVyc29uYWwgSW5mb3JtYXRpb25cbiAgICAxLiBQZXJzb25hbCBpbmZvcm1hdGlvbiB3aGljaCB5b3UgcHJvdmlkZSB0byB1cyBmb3IgYW55IHB1cnBvc2VzIHNoYWxsIG5vdCBiZSBrZXB0IGxvbmdlciB0aGFuIG5lY2Vzc2FyeSBmb3IgdGhhdCBwdXJwb3Nlcy5cbiAgICAyLiBXZSB3aWxsIHJldGFpbiB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIGFzIGxvbmcgYXMgbWF5IGJlIG5lY2Vzc2FyeSB0byBwcm90ZWN0IHRoZSBpbnRlcmVzdHMgb2YgU21hcnRGdW5kaW5nIGFuZC9vciBpdHMgYXV0aG9yaXNlZCBwZXJzb25uZWwgYXMgbWF5IGJlIGRlZW1lZCBuZWNlc3NhcnksIG9yIHdoZXJlIGl0IGlzIHJlcXVpcmVkIGJ5IHRoZSBsYXcuXG4gICAgMy4gV2Ugd2lsbCBhbHNvIHJldGFpbiB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIGlmOlxuICAgICAgKGkpIHdlIGFyZSByZXF1aXJlZCBieSBhbnkgZXhpc3RpbmcgbGF3cyB0byBkbyBzbztcbiAgICAgIChpaSkgd2UgYmVsaWV2ZSB0aGF0IHRoZSBwZXJzb25hbCBpbmZvcm1hdGlvbiBtYXkgYmUgcmVsZXZhbnQgdG8gYW55IG9uZ29pbmcgb3IgcHJvc3BlY3RpdmUgbGVnYWwgcHJvY2VlZGluZ3M7XG4gICAgICAoaWlpKSBpdCBpcyB0byBlc3RhYmxpc2ggYW5kIGRlZmVuZCBvdXIgbGVnYWwgcmlnaHRzIHdoZW4gbmVjZXNzYXJ5LlxuXG42Llx0U2VjdXJpdHkgb2YgUGVyc29uYWwgSW5mb3JtYXRpb25cbiAgICAxLiBXZSB3YXJyYW50IGFuZCBndWFyYW50ZWUgdGhhdCB3ZSB3aWxsIHRha2UgYWxsIHJlYXNvbmFibGUgc3RlcHMgYW5kIG1lYXN1cmVzIHRvIHByZXZlbnQgbG9zcywgbWlzdXNlIG9yIGFsdGVyYXRpb24gb2YgeW91ciBwZXJzb25hbCBpbmZvcm1hdGlvbiBieSBhbnkgdW5hdXRob3Jpc2VkIHBlcnNvbi5cbiAgICAyLiBXZSBmdXJ0aGVyIHdhcnJhbnQgYW5kIGd1YXJhbnRlZSB0aGF0IGFsbCBvZiB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIHN1Ym1pdHRlZCB0byB1cyBzaGFsbCBiZSBzdG9yZWQgaW4gb3VyIHNlY3VyZWQgc2VydmVycy5cbiAgICAzLiBBbGwgZWxlY3Ryb25pYyBmaW5hbmNpYWwgdHJhbnNhY3Rpb25zIGVudGVyZWQgYW5kIHByb2Nlc3NlZCB0aHJvdWdoIG91ciB3ZWJzaXRlIHdpbGwgYmUgcHJvdGVjdGVkIGJ5IGVuY3J5cHRpb24gdGVjaG5vbG9neS5cbiAgICA0LiBOb3R3aXRoc3RhbmRpbmcgY2xhdXNlcyA2LjIgYW5kIDYuMywgaXQgaXMgdW5kZXJzdG9vZCB0aGF0IGFueSBpbmZvcm1hdGlvbiB0cmFuc21pdHRlZCBvdmVyIHRoZSBpbnRlcm5ldCBpcyBpbmhlcmVudGx5IGluc2VjdXJlLiBBcyBzdWNoLCB5b3UgdW5kZXJzdGFuZCB0aGF0IHdlIGNhbm5vdCBnaXZlIHlvdSBhIGZ1bGwgZ3VhcmFudGVlIG9uIHRoZSBzZWN1cml0eSBvZiBhbnkgZm9ybSBvZiBkYXRhIHNlbnQgb3ZlciB0byB1cyBieSB5b3UgdGhyb3VnaCB0aGUgaW50ZXJuZXQuXG4gICAgNS4gV2hlbiByZWdpc3RlcmluZyB5b3Vyc2VsZiBvbiB0aGUgd2Vic2l0ZSwgeW91IHNoYWxsIGJlIGFza2VkIHRvIGNyZWF0ZSB5b3VyIG93biBwZXJzb25hbCBwYXNzd29yZC4gWW91IGFyZSByZXNwb25zaWJsZSBmb3Iga2VlcGluZyB0aGUgcGFzc3dvcmQgY29uZmlkZW50aWFsLiBFeGNlcHQgb24gaW5zdGFuY2VzIHdoZW4geW91IHdhbnQgdG8gbG9nIGludG8gb3VyIHdlYnNpdGUsIHdlIHdpbGwgbmV2ZXIgYXNrIGZvciB5b3VyIHBhc3N3b3JkLlxuXG43Llx0SW5mb3JtYXRpb24gVXBkYXRlc1xuICAgIDEuIFdlIHVuZGVyc3RhbmQgdGhhdCB5b3Ugd2lsbCBuZWVkIHRvIHVwZGF0ZSBvciBjb3JyZWN0IHlvdXIgaW5mb3JtYXRpb24gZnJvbSB0aW1lIHRvIHRpbWUuIFdoZW4gYW4gaW5mb3JtYXRpb24gdXBkYXRlIGlzIG5lZWRlZCwgcGxlYXNlIGNvbnRhY3QgdXMgYW5kIHByb3ZpZGUgdXMgdGhlIHJlbGV2YW50IGRldGFpbHMuIFdlIHdpbGwgaGVscCB0byB1cGRhdGUgYW5kL29yIGNvcnJlY3QgeW91ciBpbmZvcm1hdGlvbiBmb3IgeW91IGlmIGl0IGlzIGRlZW1lZCByZWFzb25hYmxlIHRvIGRvIHNvLlxuXG44Llx0VXNlIG9mIENvb2tpZXNcbiAgICAxLiBCeSB2aXNpdGluZyBhbmQgdXNpbmcgdGhpcyB3ZWJzaXRlLCB5b3UgYWNrbm93bGVkZ2UgdGhhdCBjb29raWVzIG1heSBiZSBpbnN0YWxsZWQgaW4geW91ciBjb21wdXRlci4gQ29va2llcyBhcmUgZmlsZXMgdGhhdCByZWNvcmRzIGluZm9ybWF0aW9uIHN1Y2ggYXMgYnJvd3Npbmcgb2YgdGhlIHdlYnNpdGUgZnJvbSB0aGF0IGNvbXB1dGVyIG9yIHRvIGNvbGxlY3QgSW50ZXJuZXQgbG9nIGluZm9ybWF0aW9uIGFuZCB2aXNpdG9yIGJlaGF2aW91ciBpbmZvcm1hdGlvbi4gWW91IG1heSBkZWxldGUgY29va2llcyBpbnN0YWxsZWQgb24geW91ciBjb21wdXRlciBhdCBhbnkgdGltZSBieSBjb25maWd1cmluZyB5b3VyIGJyb3dzZXIgc29mdHdhcmUuIFBsZWFzZSB0YWtlIG5vdGUgdGhhdCB5b3UgbWF5IG5vdCBiZW5lZml0IGZyb20gc29tZSBvZiB0aGUgc2VydmljZXMgb24gdGhpcyB3ZWJzaXRlIGlmIGNvb2tpZXMgYXJlIHVuaW5zdGFsbGVkIG9yIHByZXZlbnRlZCBmcm9tIGJlaW5nIGluc3RhbGxlZCBvbiB5b3VyIGNvbXB1dGVyLlxuXG45Llx0QW1lbmRtZW50c1xuICAgIDEuIFlvdSB1bmRlcnN0YW5kIGFuZCBhY2tub3dsZWRnZSB0aGF0IHRoZXJlIG1heSBiZSBjaGFuZ2VzIG1hZGUgdG8gdGhpcyBwcml2YWN5IHBvbGljeSBmcm9tIHRpbWUgdG8gdGltZS4gV2hlbiB3ZSBkbyBzbywgd2Ugd2lsbCB1cGRhdGUgYW5kIHB1Ymxpc2ggdGhlIGxhdGVzdCB2ZXJzaW9uIG9mIHRoaXMgcHJpdmFjeSBwb2xpY3kgb24gdGhlIHdlYnNpdGUuXG4gICAgMi4gWW91IGFyZSBhZHZpc2VkIHRvIGNoZWNrIHRoaXMgcHJpdmFjeSBwb2xpY3kgZnJvbSB0aW1lIHRvIHRpbWUgdG8ga2VlcCB5b3Vyc2VsZiB1cGRhdGVkIHdpdGggdGhlIGxhdGVzdCBjaGFuZ2VzIGluIHRoaXMgcHJpdmFjeSBwb2xpY3kuXG4gICAgMy4gV2UgbWF5IG5vdGlmeSB5b3Ugb2YgdGhlIGNoYW5nZXMgbWFkZSB0byB0aGlzIHByaXZhY3kgcG9saWN5IGJ5IHdheSBvZiBlLW1haWwgdG8geW91ciByZWdpc3RlcmVkIGUtbWFpbCBhZGRyZXNzLlxuXG4xMC5cdFlvdXIgUmlnaHRzXG4gICAgMS4gWW91IG1heSBpbnN0cnVjdCB1cyB0byBwcm92aWRlIHlvdSB3aXRoIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24gd2hpY2ggaGFzIGJlZW4gc3VibWl0dGVkIHRvIHVzIHByb3ZpZGVkIHRoYXQgeW91IHN1cHBseSB1cyBldmlkZW5jZSBhcyB0byB5b3VyIGlkZW50aXR5IChpZGVudGlmaWNhdGlvbiBjYXJkLCBwYXNzcG9ydCBvciBhbnkgb3RoZXIgZm9ybXMgb2YgZG9jdW1lbnRzIHdoaWNoIG1heSBwcm9vZiB0aGUgdmFsaWRpdHkgb2YgeW91ciBpZGVudGl0eSkuIFlvdSBtYXkgYWxzbyBiZSByZXF1aXJlZCB0byBtYWtlIGEgcGF5bWVudCBmb3IgdGhpcyBzZXJ2aWNlLlxuICAgIDIuIE5vdHdpdGhzdGFuZGluZyBjbGF1c2UgMTAuMSwgd2UgbWF5IHN0aWxsIHdpdGhob2xkIGFueSBwZXJzb25hbCBpbmZvcm1hdGlvbiB0aGF0IHlvdSBtYXkgaGF2ZSByZXF1ZXN0ZWQgdG8gdGhlIGV4dGVudCBhcyBwZXJtaXR0ZWQgYnkgbGF3LlxuXG4xMS5cdEV4Y2x1c2lvbiBvZiBMaWFiaWxpdHlcbiAgICAxLiBZb3UgYWdyZWUgdG8gbm90IGhvbGQgdXMgbGlhYmxlIGZvciBhbnkgdmlvbGF0aW9uLCBicmVhY2ggb3Igbm9uLWNvbXBsaWFuY2Ugd2l0aCBhbnkgcHJlY2VwdHMgb2YgcHJpdmFjeSBvciB0aGUgcHJvdGVjdGlvbiBvZiBQZXJzb25hbCBEYXRhIGluIHRoZSBmb2xsb3dpbmcgc2l0dWF0aW9uczpcbiAgICAgIChpKSB3aGVyZSBhbiBhY3Qgb2YgbmF0dXJlIGlzIGludm9sdmVkIG9yIGFueSB1bmZvcmVzZWVhYmxlIGNpcmN1bXN0YW5jZXMgaGFzIG9jY3VycmVkLCByZXN1bHRpbmcgaW4gdGhlIG1hbGZ1bmN0aW9uLCBkYW1hZ2Ugb3IgZGVzdHJ1Y3Rpb24gb2YgYW55IGVxdWlwbWVudCBhbmQvb3IgbWFjaGluZXJ5IHdoaWNoIGlzIHVzZWQgdG8gc2VjdXJlLCBzdG9yZSBvciBwcm9jZXNzIHBlcnNvbmFsIGRhdGEgb3IgaW5mb3JtYXRpb24gZnJvbSB0aGUgVXNlcnM7XG4gICAgICAoaWkpIHdoZXJlIHRoZSBwZXJzb25hbCBkYXRhIG9yIGluZm9ybWF0aW9uIGlzIGFscmVhZHkgYXZhaWxhYmxlIG9yIGFibGUgdG8gYmUgZm91bmQgYnkgdGhlIHB1YmxpYyBiZWZvcmUgYW55IHBlcnNvbmFsIGRhdGEgb3IgaW5mb3JtYXRpb24gb2Ygc3VjaCBraW5kIGhhcyBiZWVuIHN1Ym1pdHRlZCB0byB1cztcbiAgICAgIChpaWkpIHdoZXJlIGFmdGVyIGV2ZXJ5IHJlYXNvbmFibGUgZWZmb3J0IGFuZCBhdHRlbXB0IGhhcyBiZWVuIG1hZGUgYnkgdXMgdG8gdmVyaWZ5LCBzZWN1cmUgYW5kIHNhZmVndWFyZCBhbnkgcGVyc29uYWwgZGF0YSBhbmQgaW5mb3JtYXRpb24gc3VibWl0dGVkIHRvIHVzLCB0aGVyZSBpcyB1bmF1dGhvcmlzZWQgYWNjZXNzLCBoYWNraW5nLCBtaXN1c2UsIG1vZGlmaWNhdGlvbiwgYWx0ZXJhdGlvbiwgdGFtcGVyaW5nIG9yIGFidXNlIG9mIHN1Y2ggcGVyc29uYWwgZGF0YSBhbmQgaW5mb3JtYXRpb24gY2F1c2VkIGJ5IG1hbGljaW91cywgZnJhdWR1bGVudCBvciBjcmltaW5hbCBhY3RzIG9mIGFueSBraW5kIG9yIG1pc2NvbmR1Y3Qgb2YgYSB0aGlyZCBwYXJ0eSBub3QgYmVpbmcgdW5kZXIgb3VyIGNvbnRyb2wgb3IgaW5zdHJ1Y3Rpb24uXG5cbjEyLlx0Q29udGFjdCBJbmZvcm1hdGlvblxuICAgIDEuIElmIHlvdSBoYXZlIGFueSBxdWVzdGlvbnMgYWJvdXQgdGhpcyBwcml2YWN5IHBvbGljeSwgb3IgeW91IHdvdWxkIGxpa2UgdG8gaGF2ZSBhY2Nlc3Mgb3IgbWFrZSBhbnkgcmF0aWZpY2F0aW9uIHRvIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24sIHlvdSBtYXkgY29udGFjdCB1cyBhdCB0aGUgY29udGFjdCBkZXRhaWxzIGJlbG93OlxuXG5cbiAgICAgIEF0dGVudGlvblx0XHQ6IExlZ2FsIERlcGFydG1lbnQ8YnIvPlxuICAgICAgRS1tYWlsXHRcdFx0OiBzdXBwb3J0QHNtYXJ0ZnVuZGluZy5zZ1xuYDtcblxuY29uc3QgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcigpO1xuY29uc3QgcGFnZSA9IGNvbnZlcnRlci5tYWtlSHRtbChwcml2YWN5UG9saWN5KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiLnNmLXJvb3RcIiwgW1xuICAgICAgbShcIi5hY2NvdW50YmdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBgdXJsKCR7Ymd9KWAsXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbShcIi53cmFwcGVyLXBhZ2UuYWNjb3VudC1wYWdlLWZ1bGxcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIFwib3ZlcmZsb3cteVwiOiBcImhpZGRlblwiXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgbShcIi5jYXJkXCIsXG4gICAgICAgICAgbShcIi5jYXJkLWJsb2NrXCIsXG4gICAgICAgICAgICBtKFwiLmFjY291bnQtYm94XCIsXG4gICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gucC01XCIsIHtcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgXCJvdmVyZmxvdy15XCI6IFwic2Nyb2xsXCIsXG4gICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjEwMHZoXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICBtKFwiaDIudGV4dC11cHBlcmNhc2UudGV4dC1jZW50ZXIucGItNFwiLFxuICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1zdWNjZXNzW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSxcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7IHNyYzogbG9nbyB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0udHJ1c3QocGFnZSksXG4gICAgICAgICAgICAgICAgbShcImEuYnRuLmJ0bi1tZC5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHQubXQtMy5tYi0zW2hyZWY9Jy8nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJSZXR1cm4gSG9tZVwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgand0RGVjb2RlIGZyb20gXCJqd3QtZGVjb2RlXCI7XG5cbmltcG9ydCBoZWFkZXIgZnJvbSBcIndpZGdldHMvaGVhZGVyXCI7XG5pbXBvcnQgZm9vdGVyIGZyb20gXCJ3aWRnZXRzL2Zvb3RlclwiO1xuXG5pbXBvcnQgYXZhdGFyIGZyb20gXCJpbWFnZXMvdXNlcnMvYXZhdGFyLTEuanBnXCI7XG5cbmNvbnN0IFByb2ZpbGVEYXRhID0ge1xuICBnZXRFbWFpbCgpIHtcbiAgICBsZXQgZW1haWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImVtYWlsXCIpITtcbiAgICByZXR1cm4gZW1haWw7XG4gIH0sXG4gIGdldFVzZXJuYW1lKCk6IHN0cmluZyB7XG4gICAgbGV0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSE7XG4gICAgbGV0IGRhdGEgPSBqd3REZWNvZGU8YW55Pih0b2tlbik7XG4gICAgcmV0dXJuIGRhdGEudXNlcm5hbWU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb25pbml0OiB7XG5cbiAgfSxcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oaGVhZGVyKSxcbiAgICAgIG0oXCIud3JhcHBlclwiLFxuICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLCBbXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyXCIsXG4gICAgICAgICAgICAgIG0oXCIucGFnZS10aXRsZS1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCIuYnRuLWdyb3VwLnB1bGwtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJvbC5icmVhZGNydW1iLmhpZGUtcGhvbmUucC0wLm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW1cIiwgbShcImFbaHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBcIlNtYXJ0RnVuZGluZ1wiKSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW0uYWN0aXZlXCIsIFwiUHJvZmlsZVwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG0oXCJoNC5wYWdlLXRpdGxlXCIsIFwiUHJvZmlsZVwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyXCIsXG4gICAgICAgICAgICAgIG0oXCIucHJvZmlsZS11c2VyLWJveC5jYXJkLWJveC5iZy1jdXN0b21cIixcbiAgICAgICAgICAgICAgICBtKFwiLnJvd1wiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS02XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW4ucHVsbC1sZWZ0Lm1yLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaW1nLnRodW1iLWxnLnJvdW5kZWQtY2lyY2xlW2FsdD0nJ11cIiwgeyBzcmM6IGF2YXRhciB9KVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLm1lZGlhLWJvZHkudGV4dC13aGl0ZVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImg0Lm10LTEubWItMS5mb250LTE4XCIsIFwiQW5vbnltb3VzIFVzZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInAuZm9udC0xMy50ZXh0LWxpZ2h0XCIsIFByb2ZpbGVEYXRhLmdldFVzZXJuYW1lKCkpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbGlnaHQubWItMFwiLCBcIkNhbGlmb3JuaWEsIFVuaXRlZCBTdGF0ZXNcIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tNlwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLnRleHQtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tbGlnaHQud2F2ZXMtZWZmZWN0W3R5cGU9J2J1dHRvbiddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLm1kaS5tZGktYWNjb3VudC1zZXR0aW5ncy12YXJpYW50Lm1yLTFcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVkaXQgUHJvZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIG0oXCIucm93XCIsIFtcbiAgICAgICAgICAgIG0oXCIuY29sLW1kLTRcIiwgW1xuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaDQuaGVhZGVyLXRpdGxlLm10LTAubS1iLTIwXCIsIFwiUGVyc29uYWwgSW5mb3JtYXRpb25cIiksXG4gICAgICAgICAgICAgICAgbShcIi5wYW5lbC1ib2R5XCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xM1wiLCBcIkJpb1wiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJoclwiKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIudGV4dC1sZWZ0XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5mb250LTEzXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3Ryb25nXCIsIFwiRnVsbCBOYW1lIDogXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuLm0tbC0xNVwiLCBcIkFub255bW91cyBVc2VyXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLmZvbnQtMTNcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzdHJvbmdcIiwgXCJFbWFpbCA6IFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5tLWwtMTVcIiwgUHJvZmlsZURhdGEuZ2V0RW1haWwoKSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xM1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcInN0cm9uZ1wiLCBcIkxvY2F0aW9uIDogXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuLm0tbC0xNVwiLCBcIkVhcnRoXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBtKFwiLmNvbC1tZC04XCIsIFtcbiAgICAgICAgICAgICAgbShcIi5yb3dcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCIuY29sLXNtLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCIuY2FyZC1ib3gudGlsZWJveC1vbmVcIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiaS5pY29uLWxheWVycy5mbG9hdC1yaWdodC50ZXh0LW11dGVkXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwiaDYudGV4dC1tdXRlZC50ZXh0LXVwcGVyY2FzZS5tdC0wXCIsIFwiV2FsbGV0IEJhbGFuY2VcIiksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJoMi5tLWItMjBbZGF0YS1wbHVnaW49J2NvdW50ZXJ1cCddXCIsIFwiMSw1ODdcIiksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuLmJhZGdlLmJhZGdlLWN1c3RvbVwiLCBcIisxMSVcIiksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuLnRleHQtbXV0ZWRcIiwgXCIgRnJvbSBwcmV2aW91cyBwZXJpb2RcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS00XCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnRpbGVib3gtb25lXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcImkuaWNvbi1wYXlwYWwuZmxvYXQtcmlnaHQudGV4dC1tdXRlZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImg2LnRleHQtbXV0ZWQudGV4dC11cHBlcmNhc2UubXQtMFwiLCBcIlBheXBhbCAvIEJhbmsgQmFsYW5jZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImgyLm0tYi0yMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5bZGF0YS1wbHVnaW49J2NvdW50ZXJ1cCddXCIsIFwiNDYsNzgyXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5iYWRnZS5iYWRnZS1kYW5nZXJcIiwgXCItMjklXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi50ZXh0LW11dGVkXCIsIFwiIEZyb20gcHJldmlvdXMgcGVyaW9kXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi5jb2wtc20tNFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jYXJkLWJveC50aWxlYm94LW9uZVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLmljb24tcm9ja2V0LmZsb2F0LXJpZ2h0LnRleHQtbXV0ZWRcIiksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJoNi50ZXh0LW11dGVkLnRleHQtdXBwZXJjYXNlLm10LTBcIiwgXCJMb2FuIC8gSW52ZXN0XCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwiaDIubS1iLTIwW2RhdGEtcGx1Z2luPSdjb3VudGVydXAnXVwiLCBcIjEsODkwXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5iYWRnZS5iYWRnZS1jdXN0b21cIiwgXCIrODklXCIpLFxuICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi50ZXh0LW11dGVkXCIsIFwiIExhc3QgeWVhclwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgICAgbShmb290ZXIpXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCJjb25maWdzXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmNvbnN0IFJlY292ZXJQYXNzd29yZERhdGEgPSB7XG4gIGVtYWlsOiBcIlwiLFxuXG4gIGNhblNhdmUoKSB7XG4gICAgcmV0dXJuIFJlY292ZXJQYXNzd29yZERhdGEuZW1haWwgIT09IFwiXCI7XG4gIH0sXG4gIHNhdmUoKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgZW1haWw6IFJlY292ZXJQYXNzd29yZERhdGEuZW1haWwsXG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoKEFwcFNldHRpbmdzLkFQSV9CQVNFX1VSTCArIFwiL2FwaS9zZXNzaW9uL3JlY292ZXJcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGFjY291bnQpLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCJcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInZlcmlmeV9lbWFpbFwiLCBSZWNvdmVyUGFzc3dvcmREYXRhLmVtYWlsKTtcbiAgICAgICAgbS5yb3V0ZS5zZXQoXCIvY29uZmlybS1tYWlsL3JlY292ZXJcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpXG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyLm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZC5tLWItMFwiLFxuICAgICAgICAgICAgICAgICAgICBcIkVudGVyIHlvdXIgZW1haWwgYWRkcmVzcyBhbmQgd2UnbGwgc2VuZCB5b3UgYW4gZW1haWwgd2l0aCBpbnN0cnVjdGlvbnMgdG8gcmVzZXQgeW91ciBwYXNzd29yZC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImZvcm0uZm9ybS1ob3Jpem9udGFsXCIsIHtcbiAgICAgICAgICAgICAgICAgIG9uc3VibWl0OiAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBSZWNvdmVyUGFzc3dvcmREYXRhLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWxhZGRyZXNzJ11cIiwgXCJFbWFpbCBhZGRyZXNzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J2VtYWlsYWRkcmVzcyddW3BsYWNlaG9sZGVyPSdlLmcuIGpvc2VAcml6YWwuY29tJ11bcmVxdWlyZWRdW3R5cGU9J2VtYWlsJ11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25pbnB1dDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2OiBzdHJpbmcpID0+IHsgUmVjb3ZlclBhc3N3b3JkRGF0YS5lbWFpbCA9IHYgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUmVjb3ZlclBhc3N3b3JkRGF0YS5lbWFpbFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgbShcIi5mb3JtLWdyb3VwLnJvdy50ZXh0LWNlbnRlci5tLXQtMTBcIixcbiAgICAgICAgICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uLmJ0bi5idG4tYmxvY2suYnRuLWN1c3RvbS53YXZlcy1lZmZlY3Qud2F2ZXMtbGlnaHRbdHlwZT0nc3VibWl0J11cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFSZWNvdmVyUGFzc3dvcmREYXRhLmNhblNhdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIH0sIFwiUmVzZXQgUGFzc3dvcmRcIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIG0oXCIucm93Lm0tdC01MFwiLFxuICAgICAgICAgICAgICAgICAgbShcIi5jb2wtc20tMTIudGV4dC1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJCYWNrIHRvIFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFyay5tLWwtNVtocmVmPScvbG9naW4nXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgbShcImJcIiwgXCJTaWduIEluXCIpKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgW1xuICAgICAgICAgICAgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZyB8IFwiLFxuICAgICAgICAgICAgbShcImFbaHJlZj0nL3ByaXZhY3knXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJQcml2YWN5IFBvbGljeVwiKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCJjb25maWdzXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmNvbnN0IFJlZ2lzdGVyQWNjb3VudERhdGEgPSB7XG4gIHVzZXJuYW1lOiBcIlwiLFxuICBlbWFpbDogXCJcIixcbiAgcGFzc3dvcmQ6IFwiXCIsXG5cbiAgY2FuU2F2ZSgpIHtcbiAgICByZXR1cm4gUmVnaXN0ZXJBY2NvdW50RGF0YS51c2VybmFtZSAhPT0gXCJcIiAmJlxuICAgICAgUmVnaXN0ZXJBY2NvdW50RGF0YS5lbWFpbCAhPT0gXCJcIiAmJlxuICAgICAgUmVnaXN0ZXJBY2NvdW50RGF0YS5wYXNzd29yZCAhPT0gXCJcIjtcbiAgfSxcbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBhY2NvdW50ID0ge1xuICAgICAgdXNlcjoge1xuICAgICAgICB1c2VybmFtZTogUmVnaXN0ZXJBY2NvdW50RGF0YS51c2VybmFtZSxcbiAgICAgICAgZW1haWw6IFJlZ2lzdGVyQWNjb3VudERhdGEuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBSZWdpc3RlckFjY291bnREYXRhLnBhc3N3b3JkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoKEFwcFNldHRpbmdzLkFQSV9CQVNFX1VSTCArIFwiL2FwaS9zZXNzaW9uL3JlZ2lzdGVyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShhY2NvdW50KSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ2ZXJpZnlfZW1haWxcIiwgUmVnaXN0ZXJBY2NvdW50RGF0YS5lbWFpbCk7XG4gICAgICAgIG0ucm91dGUuc2V0KFwiL2NvbmZpcm0tbWFpbC9yZWdpc3RlclwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvclwiLCByZXMubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PSdsb2dvJ11baGVpZ2h0PScyNiddXCIsIHsgc3JjOiBsb2dvIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcImZvcm0uZm9ybS1ob3Jpem9udGFsW21ldGhvZD0ncG9zdCddXCIsIHtcbiAgICAgICAgICAgICAgICAgIG9uc3VibWl0OiAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBSZWdpc3RlckFjY291bnREYXRhLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0ndXNlcm5hbWUnXVwiLCBcIlVzZXJuYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dC5mb3JtLWNvbnRyb2xbaWQ9J3VzZXJuYW1lJ11bcGxhY2Vob2xkZXI9J2UuZy4ganJpemFsJ11bcmVxdWlyZWRdW3R5cGU9J3RleHQnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBtLndpdGhBdHRyKFwidmFsdWVcIiwgKHY6IHN0cmluZykgPT4geyBSZWdpc3RlckFjY291bnREYXRhLnVzZXJuYW1lID0gdiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBSZWdpc3RlckFjY291bnREYXRhLnVzZXJuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBtKFwiLmZvcm0tZ3JvdXAucm93Lm0tYi0yMFwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwiLmNvbC0xMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsW2Zvcj0nZW1haWwnXVwiLCBcIkVtYWlsIGFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0nZW1haWwnXVtwbGFjZWhvbGRlcj0nZS5nLiBqb3NlQHJpemFsLmNvbSddW3JlcXVpcmVkXVt0eXBlPSdlbWFpbCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IG0ud2l0aEF0dHIoXCJ2YWx1ZVwiLCAodjogc3RyaW5nKSA9PiB7IFJlZ2lzdGVyQWNjb3VudERhdGEuZW1haWwgPSB2IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFJlZ2lzdGVyQWNjb3VudERhdGEuZW1haWxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdwYXNzd29yZCddXCIsIFwiUGFzc3dvcmRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0LmZvcm0tY29udHJvbFtpZD0ncGFzc3dvcmQnXVtwbGFjZWhvbGRlcj0nRW50ZXIgeW91ciBwYXNzd29yZCddW3JlcXVpcmVkXVt0eXBlPSdwYXNzd29yZCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IG0ud2l0aEF0dHIoXCJ2YWx1ZVwiLCAodjogc3RyaW5nKSA9PiB7IFJlZ2lzdGVyQWNjb3VudERhdGEucGFzc3dvcmQgPSB2IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFJlZ2lzdGVyQWNjb3VudERhdGEucGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cubS1iLTIwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcIi5jaGVja2JveC5jaGVja2JveC1jdXN0b21cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbShcImlucHV0W2NoZWNrZWRdW2lkPSdyZW1lbWJlciddW3R5cGU9J2NoZWNrYm94J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwibGFiZWxbZm9yPSdyZW1lbWJlciddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJIGFjY2VwdCBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbShcImEudGV4dC1jdXN0b21baHJlZj0nL3Rlcm1zLWFuZC1jb25kaXRpb25zJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiVGVybXMgYW5kIENvbmRpdGlvbnNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG0oXCIuZm9ybS1ncm91cC5yb3cudGV4dC1jZW50ZXIubS10LTEwXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuY29sLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImJ1dHRvbi5idG4uYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0W3R5cGU9J3N1Ym1pdCddXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhUmVnaXN0ZXJBY2NvdW50RGF0YS5jYW5TYXZlKClcbiAgICAgICAgICAgICAgICAgICAgICB9LCBcIlNpZ24gVXAgRnJlZVwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgbShcIi5yb3cubS10LTUwXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmNvbC1zbS0xMi50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIkFscmVhZHkgaGF2ZSBhbiBhY2NvdW50PyBcIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmsubS1sLTVbaHJlZj0nL2xvZ2luJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIG0oXCJiXCIsIFwiU2lnbiBJblwiKSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBtKFwiLm0tdC00MC50ZXh0LWNlbnRlclwiLFxuICAgICAgICAgIG0oXCJwLmFjY291bnQtY29weXJpZ2h0XCIsIFtcbiAgICAgICAgICAgIFwiMjAxOCDCqSBTbWFydGZ1bmRpbmcgfCBcIixcbiAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy9wcml2YWN5J11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiUHJpdmFjeSBQb2xpY3lcIilcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pO1xuICB9XG59IGFzIG0uQ29tcG9uZW50O1xuIiwiaW1wb3J0IG0sIHsgVm5vZGUgfSBmcm9tIFwibWl0aHJpbFwiO1xuXG5pbXBvcnQgYmcgZnJvbSBcImltYWdlcy9iZy0yLmpwZ1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcImltYWdlcy9zZi1sb2dvLnBuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIG0oXCJpbWdbYWx0PScnXVtoZWlnaHQ9JzI2J11cIiwgeyBzcmM6IGxvZ28gfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiLnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJoMS50ZXh0LWVycm9yXCIsIFwiNTAwXCIpLFxuICAgICAgICAgICAgICAgICAgbShcImg0LnRleHQtdXBwZXJjYXNlLnRleHQtZGFuZ2VyLm10LTNcIiwgXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiksXG4gICAgICAgICAgICAgICAgICBtKFwicC50ZXh0LW11dGVkLm10LTNcIiwgW1xuICAgICAgICAgICAgICAgICAgICBcIldoeSBub3QgdHJ5IHJlZnJlc2hpbmcgeW91ciBwYWdlPyBvciB5b3UgY2FuIGNvbnRhY3QgXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtZGFya1tocmVmPScvc3VwcG9ydCddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBtKFwiYlwiLCBcIlN1cHBvcnRcIikpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIG0oXCJhLmJ0bi5idG4tbWQuYnRuLWJsb2NrLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0Lm10LTNbaHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBcIlJldHVybiBIb21lXCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgW1xuICAgICAgICAgICAgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZyB8IFwiLFxuICAgICAgICAgICAgbShcImFbaHJlZj0nL3ByaXZhY3knXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJQcml2YWN5IFBvbGljeVwiKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5cbmltcG9ydCBiZyBmcm9tIFwiaW1hZ2VzL2JnLTIuanBnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiaW1hZ2VzL3NmLWxvZ28ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb25pbml0KCkge1xuXG4gIH0sXG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCIuc2Ytcm9vdFwiLCBbXG4gICAgICBtKFwiLmFjY291bnRiZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IGB1cmwoJHtiZ30pYCxcbiAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiOiBcImNvdmVyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtKFwiLndyYXBwZXItcGFnZS5hY2NvdW50LXBhZ2UtZnVsbFwiLCBbXG4gICAgICAgIG0oXCIuY2FyZFwiLFxuICAgICAgICAgIG0oXCIuY2FyZC1ibG9ja1wiLFxuICAgICAgICAgICAgbShcIi5hY2NvdW50LWJveFwiLFxuICAgICAgICAgICAgICBtKFwiLmNhcmQtYm94LnAtNVwiLCBbXG4gICAgICAgICAgICAgICAgbShcImgyLnRleHQtdXBwZXJjYXNlLnRleHQtY2VudGVyLnBiLTRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJhLnRleHQtc3VjY2Vzc1tocmVmPSdpbmRleC5odG1sJ11cIixcbiAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgbShcImltZ1thbHQ9JyddW2hlaWdodD0nMjYnXVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgc3JjOiBsb2dvXG4gICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi50ZXh0LWNlbnRlclwiLCBbXG4gICAgICAgICAgICAgICAgICBtKFwic3ZnLnN2Zy1jb21wdXRlcltpZD0nTGF5ZXJfMSddW3ZpZXdCb3g9JzAgMCA0MjQuMiA0MjQuMiddW3htbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgbShcInN0eWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6IzAyYzBjZTtzdHJva2Utd2lkdGg6NTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJnW2lkPSdMYXllcl8yJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MFtkPSdNMzM5LjcgMjg5aC0zMjNjLTIuOCAwLTUtMi4yLTUtNVY1NS41YzAtMi44IDIuMi01IDUtNWgzMjNjMi44IDAgNSAyLjIgNSA1VjI4NGMwIDIuNy0yLjIgNS01IDV6J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QwW2Q9J00yNi4xIDY0LjloMzA0LjZ2MTg5LjZIMjYuMXpNMTM3LjkgMjg4LjVsLTMuMiAzMy41aDkyLjZsLTQuNC0zM001Ni4xIDMzMi42aDI0NC41bDI0LjMgNDEuMUgzNC41ek0zNDAuNyAzNzMuN3MtLjYtMjkuOCAzNS45LTMwLjJjMzYuNS0uNCAzNS45IDMwLjIgMzUuOSAzMC4yaC03MS44eiddXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJwYXRoLnN0MFtkPSdNMTE0LjIgODIuOHYxNTMuM2gxNDdWODIuOHpNMjYxLjIgOTEuMWgtMTQ3J11cIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInBhdGguc3QwW2Q9J00xMjQuNSAxMDUuN2g2MS44djM4LjdoLTYxLjh6TTE5Ni42IDE3MC4ySDI0OXY1MS43aC01Mi40ek0xOTYuNiAxMDUuN0gyNDlNMTk2LjYgMTE4LjZIMjQ5TTE5Ni42IDEzMS41SDI0OU0xOTYuNiAxNDQuNEgyNDlNMTI0LjUgMTU3LjNIMjQ5TTEyNC41IDE3MC4yaDYyLjJNMTI0LjUgMTgzLjJoNjIuMk0xMjQuNSAxOTYuMWg2Mi4yTTEyNC41IDIwOWg2Mi4yTTEyNC41IDIyMS45aDYyLjInXVwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiaDQudGV4dC1kYW5nZXJcIiwgXCJTaXRlIGlzIFVuZGVyIE1haW50ZW5hbmNlXCIpLFxuICAgICAgICAgICAgICAgICAgbShcInAudGV4dC1tdXRlZFwiLCBcIldlJ3JlIG1ha2luZyB0aGUgc3lzdGVtIG1vcmUgYXdlc29tZS53ZSdsbCBiZSBiYWNrIHNob3J0bHkuXCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIG0oXCIubS10LTQwLnRleHQtY2VudGVyXCIsXG4gICAgICAgICAgbShcInAuYWNjb3VudC1jb3B5cmlnaHRcIiwgW1xuICAgICAgICAgICAgXCIyMDE4IMKpIFNtYXJ0RnVuZGluZyB8IFwiLFxuICAgICAgICAgICAgbShcImFbaHJlZj0nL3ByaXZhY3knXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgXCJQcml2YWN5IFBvbGljeVwiKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSk7XG4gIH1cbn1cbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcbmltcG9ydCBBV1MgZnJvbSBcImF3cy1zZGtcIjtcblxuaW1wb3J0IGhlYWRlciBmcm9tIFwid2lkZ2V0cy9oZWFkZXJcIjtcbmltcG9ydCBmb290ZXIgZnJvbSBcIndpZGdldHMvZm9vdGVyXCI7XG5cbmltcG9ydCBcImpxdWVyeS1zbGltc2Nyb2xsXCI7XG5pbXBvcnQgXCJkcm9wem9uZVwiO1xuXG5pbXBvcnQgYXZhdGFyIGZyb20gXCJpbWFnZXMvdXNlcnMvYXZhdGFyLTIuanBnXCI7XG5cbkFXUy5jb25maWcucmVnaW9uID0gJ2FwLXNvdXRoZWFzdC0xJztcbkFXUy5jb25maWcuY3JlZGVudGlhbHMgPSBuZXcgQVdTLkNvZ25pdG9JZGVudGl0eUNyZWRlbnRpYWxzKHtcbiAgSWRlbnRpdHlQb29sSWQ6ICdhcC1zb3V0aGVhc3QtMTo0YzFlMzQ5Yi0xM2I5LTQ5Y2UtOWIyNy0yZDBiMWZhYzQ4Y2QnLFxufSk7XG5cbmNvbnN0IGJ1Y2tldE5hbWUgPSBcImJ1Y2tldC5zbWFydGZ1bmRpbmcuaW9cIjtcbmNvbnN0IGJ1Y2tldCA9IG5ldyBBV1MuUzMoe1xuICBwYXJhbXM6IHtcbiAgICBCdWNrZXQ6IGJ1Y2tldE5hbWVcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb25pbml0KCkge1xuICAgICQoXCIubmF2YmFyLXRvZ2dsZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gICAgICAkKFwiI25hdmlnYXRpb25cIikuc2xpZGVUb2dnbGUoNDAwKTtcbiAgICB9KTtcblxuICAgICQoXCIubmF2aWdhdGlvbi1tZW51PmxpXCIpLnNsaWNlKC0yKS5hZGRDbGFzcyhcImxhc3QtZWxlbWVudHNcIik7XG5cbiAgICAkKFwiLm5hdmlnYXRpb24tbWVudSBsaS5oYXMtc3VibWVudSBhW2hyZWY9JyMnXVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xuICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpISA8IDk5Mikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpLmZpbmQoXCIuc3VibWVudTpmaXJzdFwiKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiLnNsaW1zY3JvbGxcIikuc2xpbVNjcm9sbCh7XG4gICAgICBoZWlnaHQ6IFwiYXV0b1wiLFxuICAgICAgcG9zaXRpb246IFwicmlnaHRcIixcbiAgICAgIHNpemU6IFwiOHB4XCIsXG4gICAgICBjb2xvcjogXCIjOWVhNWFiXCJcbiAgICB9KTtcbiAgfSxcbiAgdmlldyh2bm9kZTogVm5vZGUpIHtcbiAgICByZXR1cm4gbShcIi5zZi1yb290XCIsIFtcbiAgICAgIG0oaGVhZGVyKSxcbiAgICAgIG0oXCIud3JhcHBlclwiLFxuICAgICAgICBtKFwiLmNvbnRhaW5lci1mbHVpZFwiLCBbXG4gICAgICAgICAgbShcIi5yb3dcIixcbiAgICAgICAgICAgIG0oXCIuY29sLXNtLTEyXCIsXG4gICAgICAgICAgICAgIG0oXCIucGFnZS10aXRsZS1ib3hcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCIuYnRuLWdyb3VwLnB1bGwtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJvbC5icmVhZGNydW1iLmhpZGUtcGhvbmUucC0wLm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiYVtocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiU21hcnRGdW5kaW5nXCIpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJsaS5icmVhZGNydW1iLWl0ZW0uYWN0aXZlXCIsIFwiVXBsb2FkIFZlcmlmaWNhdGlvbiBEb2N1bWVudHNcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwiaDQucGFnZS10aXRsZVwiLCBcIlVwbG9hZCBWZXJpZmljYXRpb24gRG9jdW1lbnRzXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtKFwiLnJvd1wiLFxuICAgICAgICAgICAgbShcIi5jb2wtMTJcIixcbiAgICAgICAgICAgICAgbShcIi5jYXJkLWJveFwiLCBbXG4gICAgICAgICAgICAgICAgbShcImg0LmhlYWRlci10aXRsZS5tLXQtMFwiLCBcIkRyb3B6b25lIEZpbGUgVXBsb2FkXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJwLnRleHQtbXV0ZWQuZm9udC0xNC5tLWItMTBcIiwgXCJZb3VyIGF3ZXNvbWUgdGV4dCBnb2VzIGhlcmUuXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJmb3JtLmRyb3B6b25lW2FjdGlvbj0nIyddW2lkPSdkcm9wem9uZSddXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiLmZhbGxiYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dFttdWx0aXBsZT0nJ11bbmFtZT0nZmlsZSddW3R5cGU9J2ZpbGUnXVwiKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbShcIi5jbGVhcmZpeC50ZXh0LXJpZ2h0Lm10LTNcIixcbiAgICAgICAgICAgICAgICAgIG0oXCJidXR0b24uYnRuLmJ0bi1jdXN0b20ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0W3R5cGU9J2J1dHRvbiddXCIsIFwiU3VibWl0XCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgICBtKGZvb3RlcilcbiAgICBdKTtcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsImV4cG9ydCBjbGFzcyBBcHBTZXR0aW5ncyB7XG4gIHB1YmxpYyBzdGF0aWMgQVBJX0JBU0VfVVJMID0gcHJvY2Vzcy5lbnYuU0ZfQVBJX0JBU0VfVVJMIHx8IFwiaHR0cHM6Ly9hcGkuc21hcnRmdW5kaW5nLmlvXCI7XG4gIC8vIHB1YmxpYyBzdGF0aWMgQVBJX0JBU0VfVVJMID0gcHJvY2Vzcy5lbnYuU0ZfQVBJX0JBU0VfVVJMIHx8IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG59XG4iLCJpbXBvcnQgbSBmcm9tIFwibWl0aHJpbFwiO1xuaW1wb3J0IFJhdmVuIGZyb20gXCJyYXZlbi1qc1wiO1xuXG5pbXBvcnQgcmVnaXN0ZXIgZnJvbSBcImNvbXBvbmVudHMvcmVnaXN0ZXJcIjtcbmltcG9ydCBsb2dpbiBmcm9tIFwiY29tcG9uZW50cy9sb2dpblwiO1xuaW1wb3J0IGxvZ291dCBmcm9tIFwiY29tcG9uZW50cy9sb2dvdXRcIjtcbmltcG9ydCBwcml2YWN5IGZyb20gXCJjb21wb25lbnRzL3ByaXZhY3lcIjtcbmltcG9ydCBmcmVxdWVudGx5QXNrIGZyb20gXCJjb21wb25lbnRzL2ZyZXF1ZW50bHlfYXNrXCI7XG5pbXBvcnQgbG9ja1NjcmVlbiBmcm9tIFwiY29tcG9uZW50cy9sb2NrX3NjcmVlblwiO1xuaW1wb3J0IGNvbmZpcm1NYWlsUmVnaXN0ZXIgZnJvbSBcImNvbXBvbmVudHMvY29uZmlybV9tYWlsX3JlZ2lzdGVyXCI7XG5pbXBvcnQgY29uZmlybU1haWxSZWNvdmVyIGZyb20gXCJjb21wb25lbnRzL2NvbmZpcm1fbWFpbF9yZWNvdmVyXCI7XG5pbXBvcnQgcmVjb3ZlclBhc3N3b3JkIGZyb20gXCJjb21wb25lbnRzL3JlY292ZXJfcGFzc3dvcmRcIjtcblxuaW1wb3J0IGhvbWUgZnJvbSBcImNvbXBvbmVudHMvaG9tZVwiO1xuaW1wb3J0IHByb2ZpbGUgZnJvbSBcImNvbXBvbmVudHMvcHJvZmlsZVwiO1xuaW1wb3J0IHVwbG9hZERvY3VtZW50IGZyb20gXCJjb21wb25lbnRzL3VwbG9hZF9kb2N1bWVudFwiO1xuXG5pbXBvcnQgYWRtaW5Mb2dpbiBmcm9tIFwiY29tcG9uZW50cy9hZG1pbi9sb2dpblwiO1xuaW1wb3J0IGFkbWluTG9nb3V0IGZyb20gXCJjb21wb25lbnRzL2FkbWluL2xvZ291dFwiO1xuaW1wb3J0IGFkbWluRGFzaGJvYXJkIGZyb20gXCJjb21wb25lbnRzL2FkbWluL2Rhc2hib2FyZFwiO1xuXG5pbXBvcnQgc2l0ZU1haW50ZW5hbmNlIGZyb20gXCJjb21wb25lbnRzL3NpdGVfbWFpbnRlbmFuY2VcIjtcbmltcG9ydCBub3RGb3VuZCBmcm9tIFwiY29tcG9uZW50cy9ub3RfZm91bmRcIjtcbmltcG9ydCBub3RGb3VuZEFsdCBmcm9tIFwiY29tcG9uZW50cy9ub3RfZm91bmRfYWx0XCI7XG5pbXBvcnQgc2VydmVyRXJyb3IgZnJvbSBcImNvbXBvbmVudHMvc2VydmVyX2Vycm9yXCI7XG5cbmltcG9ydCB7IEF1dGggfSBmcm9tIFwiLi9hdXRoXCI7XG5cbmltcG9ydCBcImJvb3RzdHJhcFwiO1xuaW1wb3J0IFwianF1ZXJ5LXNsaW1zY3JvbGxcIjtcblxuaW1wb3J0IFwic3R5bGVzL2FwcFwiO1xuaW1wb3J0IFwic3R5bGVzL2ljb25zXCI7XG5cbmZ1bmN0aW9uIFNtYXJ0RnVuZGluZ1JvdXRlcigpIHtcbiAgZG9jdW1lbnQuYm9keS5pZCA9IFwic2ZcIjtcbiAgbS5yb3V0ZShkb2N1bWVudC5ib2R5LCBcIi9cIiwge1xuICAgIFwiL1wiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgbS5yb3V0ZS5zZXQoXCIvbG9naW5cIik7XG4gICAgICAgIGVsc2UgcmV0dXJuIGhvbWU7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi91cGxvYWQtZG9jdW1lbnRcIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgICBlbHNlIHJldHVybiB1cGxvYWREb2N1bWVudDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL3Byb2ZpbGVcIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgICBlbHNlIHJldHVybiBwcm9maWxlO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvYWRtaW4vZGFzaGJvYXJkXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSBtLnJvdXRlLnNldChcIi9hZG1pbi9sb2dpblwiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gYWRtaW5EYXNoYm9hcmQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9hZG1pbi9sb2dpblwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIGFkbWluTG9naW47XG4gICAgICAgIGVsc2UgbS5yb3V0ZS5zZXQoXCIvYWRtaW4vZGFzaGJvYXJkXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvYWRtaW4vbG9nb3V0XCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSBtLnJvdXRlLnNldChcIi9hZG1pbi9sb2dpblwiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gYWRtaW5Mb2dvdXQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9yZWdpc3RlclwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIHJlZ2lzdGVyO1xuICAgICAgICBlbHNlIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL3JlZ2lzdGVyLzp0b2tlblwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIHJlZ2lzdGVyO1xuICAgICAgICBlbHNlIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL2xvZ2luXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gbG9naW47XG4gICAgICAgIGVsc2UgbS5yb3V0ZS5zZXQoXCIvXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvbG9nb3V0XCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSBtLnJvdXRlLnNldChcIi9sb2dpblwiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbG9nb3V0O1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvbG9jay1zY3JlZW5cIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgICBlbHNlIHJldHVybiBsb2NrU2NyZWVuO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvZnJlcXVlbnRseS1hc2tcIjoge1xuICAgICAgb25tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChBdXRoLmNoZWNrVG9rZW5Ob25lKCkpIG0ucm91dGUuc2V0KFwiL2xvZ2luXCIpO1xuICAgICAgICBlbHNlIHJldHVybiBmcmVxdWVudGx5QXNrO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCIvY29uZmlybS1tYWlsL3JlZ2lzdGVyXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gY29uZmlybU1haWxSZWdpc3RlcjtcbiAgICAgICAgZWxzZSBtLnJvdXRlLnNldChcIi9cIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9jb25maXJtLW1haWwvcmVjb3ZlclwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIGNvbmZpcm1NYWlsUmVjb3ZlcjtcbiAgICAgICAgZWxzZSBtLnJvdXRlLnNldChcIi9cIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBcIi9yZWNvdmVyLXBhc3N3b3JkXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gcmVjb3ZlclBhc3N3b3JkO1xuICAgICAgICBlbHNlIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL3JlY292ZXItcGFzc3dvcmQvOnRva2VuXCI6IHtcbiAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoQXV0aC5jaGVja1Rva2VuTm9uZSgpKSByZXR1cm4gcmVjb3ZlclBhc3N3b3JkO1xuICAgICAgICBlbHNlIG0ucm91dGUuc2V0KFwiL1wiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiL3ByaXZhY3lcIjogcHJpdmFjeSxcbiAgICBcIi9zaXRlLW1haW50ZW5hbmNlXCI6IHNpdGVNYWludGVuYW5jZSxcbiAgICBcIi9zZXJ2ZXItZXJyb3JcIjogc2VydmVyRXJyb3IsXG4gICAgXCIvOmFueS4uLlwiOiB7XG4gICAgICBvbm1hdGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEF1dGguY2hlY2tUb2tlbk5vbmUoKSkgcmV0dXJuIG5vdEZvdW5kO1xuICAgICAgICBlbHNlIHJldHVybiBub3RGb3VuZEFsdDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5SYXZlbi5jb25maWcoXCJodHRwczovLzA2ODg5NjI3YjkyYTQ5MTg5OTgzZTVkYzhkYTgzZDRmQHNlbnRyeS5pby8xMjI3ODY2XCIpLmluc3RhbGwoKVxuUmF2ZW4uY29udGV4dChmdW5jdGlvbigpIHtcbiAgU21hcnRGdW5kaW5nUm91dGVyKCk7XG59KTtcbiIsImltcG9ydCBtLCB7IFZub2RlIH0gZnJvbSBcIm1pdGhyaWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3KHZub2RlOiBWbm9kZSkge1xuICAgIHJldHVybiBtKFwiZm9vdGVyLmZvb3RlclwiLFxuICAgICAgbShcIi5jb250YWluZXJcIixcbiAgICAgICAgbShcIi5yb3dcIiwgW1xuICAgICAgICAgIG0oXCIuY29sLTEyLnRleHQtY2VudGVyXCIsIFtcbiAgICAgICAgICAgIFwiMjAxOCDCqSBTbWFydEZ1bmRpbmcgfCBcIixcbiAgICAgICAgICAgIG0oXCJhW2hyZWY9Jy9wcml2YWN5J11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFwiUHJpdmFjeSBQb2xpY3lcIilcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0gYXMgbS5Db21wb25lbnQ7XG4iLCJpbXBvcnQgbSwgeyBWbm9kZSB9IGZyb20gXCJtaXRocmlsXCI7XG5pbXBvcnQgand0RGVjb2RlIGZyb20gXCJqd3QtZGVjb2RlXCI7XG5cbmltcG9ydCBsb2dvIGZyb20gXCJpbWFnZXMvc2YtbG9nby5wbmdcIjtcbmltcG9ydCBhdmF0YXIgZnJvbSBcImltYWdlcy91c2Vycy9hdmF0YXItMS5qcGdcIjtcblxuY29uc3QgSGVhZGVyRGF0YSA9IHtcbiAgZ2V0RW1haWwoKSB7XG4gICAgbGV0IGVtYWlsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJlbWFpbFwiKSE7XG4gICAgcmV0dXJuIGVtYWlsO1xuICB9LFxuICBnZXRVc2VybmFtZSgpOiBzdHJpbmcge1xuICAgIGxldCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIikhO1xuICAgIGxldCBkYXRhID0gand0RGVjb2RlPGFueT4odG9rZW4pO1xuICAgIGNvbnNvbGUubG9nKGRhdGEudXNlcm5hbWUpO1xuICAgIHJldHVybiBkYXRhLnVzZXJuYW1lO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9uaW5pdCgpIHtcbiAgICAkKCcubmF2YmFyLXRvZ2dsZScpXG4gICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAkKCcjbmF2aWdhdGlvbicpLnNsaWRlVG9nZ2xlKDQwMCk7XG4gICAgfSk7XG5cbiAgICAkKCcubmF2aWdhdGlvbi1tZW51PmxpJykuc2xpY2UoLTIpLmFkZENsYXNzKCdsYXN0LWVsZW1lbnRzJyk7XG5cbiAgICAkKCcubmF2aWdhdGlvbi1tZW51IGxpLmhhcy1zdWJtZW51IGFbaHJlZj1cImphdmFzY3JpcHQ6O1wiXScpXG4gICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XG4gICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkhIDwgOTkyKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoJ2xpJykudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAgIC5maW5kKCcuc3VibWVudTpmaXJzdCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHZpZXcodm5vZGU6IFZub2RlKSB7XG4gICAgcmV0dXJuIG0oXCJoZWFkZXJbaWQ9J3RvcG5hdiddXCIsIFtcbiAgICAgIG0oXCIudG9wYmFyLW1haW5cIixcbiAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIiwgW1xuICAgICAgICAgICAgbShcIi5sb2dvXCIsXG4gICAgICAgICAgICAgIG0oXCJhLmxvZ29baHJlZj0nLyddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBbXG4gICAgICAgICAgICAgICAgbShcImltZy5sb2dvLXNtYWxsW2FsdD0nJ11baGVpZ2h0PScyNiddW3NyYz0nYXNzZXRzL2ltYWdlcy9sb2dvX3NtLnBuZyddXCIpLFxuICAgICAgICAgICAgICAgIG0oXCJpbWcubG9nby1sYXJnZVthbHQ9JyddW2hlaWdodD0nMjInXVwiLCB7IHNyYzogbG9nbyB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG0oXCIubWVudS1leHRyYXMudG9wYmFyLWN1c3RvbVwiLFxuICAgICAgICAgICAgICBtKFwidWwubGlzdC11bnN0eWxlZC50b3BiYXItcmlnaHQtbWVudS5mbG9hdC1yaWdodC5tYi0wXCIsIFtcbiAgICAgICAgICAgICAgICBtKFwibGkubWVudS1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBtKFwiYS5uYXZiYXItdG9nZ2xlLm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgIG0oXCIubGluZXNcIiwgWyBtKFwic3BhblwiKSwgbShcInNwYW5cIiksIG0oXCJzcGFuXCIpIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtKFwibGkuZHJvcGRvd24ubm90aWZpY2F0aW9uLWxpc3RcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImEubmF2LWxpbmsuZHJvcGRvd24tdG9nZ2xlLmFycm93LW5vbmUud2F2ZXMtZWZmZWN0W2FyaWEtZXhwYW5kZWQ9J2ZhbHNlJ11bYXJpYS1oYXNwb3B1cD0nZmFsc2UnXVtkYXRhLXRvZ2dsZT0nZHJvcGRvd24nXVtocmVmPSdqYXZhc2NyaXB0OjsnXVtyb2xlPSdidXR0b24nXVwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWJlbGwubm90aS1pY29uXCIpLFxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLW1lbnUuZHJvcGRvd24tbWVudS1yaWdodC5kcm9wZG93bi1sZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuZHJvcGRvd24taXRlbS5ub3RpLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImg2Lm0tMFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtKFwic3Bhbi5mbG9hdC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwiYS50ZXh0LWRhcmtbaHJlZj0nJ11cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtKFwic21hbGxcIiwgXCJDbGVhciBBbGxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTm90aWZpY2F0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLnRleHQtY2VudGVyLnRleHQtcHJpbWFyeS5ub3RpZnktaXRlbS5ub3RpZnktYWxsW2hyZWY9J2phdmFzY3JpcHQ6OyddXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIlZpZXcgYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktYXJyb3ctcmlnaHRcIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSksXG5cbiAgICAgICAgICAgICAgICBtKFwibGkuZHJvcGRvd24ubm90aWZpY2F0aW9uLWxpc3RcIiwgW1xuICAgICAgICAgICAgICAgICAgbShcImEubmF2LWxpbmsuZHJvcGRvd24tdG9nZ2xlLndhdmVzLWVmZmVjdC5uYXYtdXNlclthcmlhLWV4cGFuZGVkPSdmYWxzZSddW2FyaWEtaGFzcG9wdXA9J2ZhbHNlJ11bZGF0YS10b2dnbGU9J2Ryb3Bkb3duJ11baHJlZj0namF2YXNjcmlwdDo7J11bcm9sZT0nYnV0dG9uJ11cIiwgW1xuICAgICAgICAgICAgICAgICAgICBtKFwiaW1nLnJvdW5kZWQtY2lyY2xlW2FsdD0ndXNlciddXCIsIHsgc3JjOiBhdmF0YXIgfSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuLm1sLTEucHJvLXVzZXItbmFtZVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCIgIFwiLFxuICAgICAgICAgICAgICAgICAgICAgIEhlYWRlckRhdGEuZ2V0VXNlcm5hbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5tZGkubWRpLWNoZXZyb24tZG93blwiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBtKFwiLmRyb3Bkb3duLW1lbnUuZHJvcGRvd24tbWVudS1yaWdodC5wcm9maWxlLWRyb3Bkb3duLlwiLCBbXG4gICAgICAgICAgICAgICAgICAgIG0oXCIuZHJvcGRvd24taXRlbS5ub3RpLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbShcImg2LnRleHQtb3ZlcmZsb3cubS0wXCIsIGBXZWxjb21lICR7SGVhZGVyRGF0YS5nZXRVc2VybmFtZSgpfSFgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9Jy9wcm9maWxlJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1oZWFkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiTXkgQWNjb3VudFwiKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImEuZHJvcGRvd24taXRlbS5ub3RpZnktaXRlbVtocmVmPScvc2V0dGluZ3MnXVwiLCB7IG9uY3JlYXRlOiBtLnJvdXRlLmxpbmsgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIG0oXCJpLmZpLWNvZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBcIlNldHRpbmdzXCIpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYS5kcm9wZG93bi1pdGVtLm5vdGlmeS1pdGVtW2hyZWY9Jy9mcmVxdWVudGx5LWFzayddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktaGVscFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBtKFwic3BhblwiLCBcIlN1cHBvcnRcIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0nL2xvY2stc2NyZWVuJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBtKFwiaS5maS1sb2NrXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIG0oXCJzcGFuXCIsIFwiTG9jayBTY3JlZW5cIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJhLmRyb3Bkb3duLWl0ZW0ubm90aWZ5LWl0ZW1baHJlZj0nL2xvZ291dCddXCIsIHsgb25jcmVhdGU6IG0ucm91dGUubGluayB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgbShcImkuZmktcG93ZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgbShcInNwYW5cIiwgXCJMb2dvdXRcIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtKFwiLmNsZWFyZml4XCIpXG4gICAgICAgICAgXSlcbiAgICAgICksXG4gICAgICBtKFwiLm5hdmJhci1jdXN0b21cIixcbiAgICAgICAgbShcIi5jb250YWluZXItZmx1aWRcIixcbiAgICAgICAgICBtKFwiW2lkPSduYXZpZ2F0aW9uJ11cIixcbiAgICAgICAgICAgIG0oXCJ1bC5uYXZpZ2F0aW9uLW1lbnVcIiwgW1xuICAgICAgICAgICAgICBtKFwibGkuaGFzLXN1Ym1lbnVcIixcbiAgICAgICAgICAgICAgICBtKFwiYVtocmVmPScvJ11cIiwgeyBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rIH0sIFtcbiAgICAgICAgICAgICAgICAgIG0oXCJpLmljb24tc3BlZWRvbWV0ZXJcIiksXG4gICAgICAgICAgICAgICAgICBcIkRhc2hib2FyZFwiXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgXSlcbiAgfVxufSBhcyBtLkNvbXBvbmVudDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=