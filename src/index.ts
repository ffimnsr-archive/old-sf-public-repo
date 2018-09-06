import m from "mithril";
import Raven from "raven-js";

import register from "components/register";
import registerActivate from "components/register_activate";
import login from "components/login";
import logout from "components/logout";
import privacy from "components/privacy";
import frequentlyAsk from "components/frequently_ask";
import lockScreen from "components/lock_screen";
import confirmMailRegister from "components/confirm_mail_register";
import confirmMailRecover from "components/confirm_mail_recover";
import recoverPassword from "components/recover_password";
import recoverPasswordActivate from "components/recover_password_activate";

import home from "components/home";
import profile from "components/profile";
import settings from "components/settings";
import addProfileDetails from "components/add_profile_details";
import addProfileType from "components/add_profile_type";
import addProfilePicture from "components/add_profile_picture";
import addInvestorDetails from "components/add_investor_details";
import addBorrowerDetails from "components/add_borrower_details";
import addKycDocuments from "components/add_kyc_documents";
import addCryptoWallets from "components/add_crypto_wallet";
import addMfa from "components/add_mfa";
import noticePending from "components/notice_pending";
import editProfileDetails from "components/edit_profile_details";

import adminDashboard from "components/admin/dashboard";
import adminViewLog from "components/admin/view_log";
import adminViewCountryList from "components/admin/view_country_list";
import adminViewCompanyRevenueList from "components/admin/view_company_revenue_list";
import adminViewCreditRateList from "components/admin/view_credit_rate_list";
import adminViewFrequentlyAskQuestions from "components/admin/view_frequently_ask_questions";
import adminInvestors from "components/admin/investors";
import adminBorrowers from "components/admin/borrowers";
import adminPowerUsers from "components/admin/power_users";
import adminInquiries from "components/admin/inquiries";
import adminNewCountry from "components/admin/new_country";
import adminNewCreditRate from "components/admin/new_credit_rate";

import siteMaintenance from "components/site_maintenance";
import notFound from "components/not_found";
import notFoundAlt from "components/not_found_alt";
import serverError from "components/server_error";

import { Auth } from "./auth";

import "bootstrap";
import "jquery-slimscroll";

import "styles/app";
import "styles/icons";

// TODO: need code splitting to minimize large chunk dependecy.
function SmartFundingRouter() {
    document.body.id = "sf";
    m.route(document.body, "/", {
        "/": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) m.route.set("/admin/dashboard");
                    else if (Auth.checkIsDocumentsSubmitted()) return home;
                    else {
                        const status = localStorage.getItem("status")
                        switch (status) {
                            case "step1":
                                return addProfileDetails;
                            case "step2":
                                return addProfileType;
                            case "step3-1":
                                return addInvestorDetails;
                            case "step3-2":
                                return addBorrowerDetails;
                            case "step4":
                                return addKycDocuments;
                            case "step5":
                                return addCryptoWallets;
                            case "step6":
                                return addMfa;
                            case "pending":
                                return noticePending;
                            case "picture":
                                return addProfilePicture;
                            case "okay":
                                return home;
                            default:
                                return addProfileDetails;
                        }
                    }
                };
            }
        },
        "/profile": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else return profile;
            }
        },
        "/settings": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else return settings;
            }
        },
        "/profile/edit": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else return editProfileDetails;
            }
        },
        "/admin/dashboard": {
            onmatch: function() {
                // return siteMaintenance;

                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminDashboard;
                    else m.route.set("/");
                }
            }
        },
        "/admin/investments": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminPowerUsers;
                    else m.route.set("/");
                }
            }
        },
        "/admin/collections": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminPowerUsers;
                    else m.route.set("/");
                }
            }
        },
        "/admin/invoices": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminPowerUsers;
                    else m.route.set("/");
                }
            }
        },
        "/admin/power-users": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminPowerUsers;
                    else m.route.set("/");
                }
            }
        },
        "/admin/data-analytics": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminViewLog;
                    else m.route.set("/");
                }
            }
        },
        "/admin/inquiries/:type": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminInquiries;
                    else m.route.set("/");
                }
            }
        },
        "/admin/wallet-configurations": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminViewLog;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-log": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminViewLog;
                    else m.route.set("/");
                }
            }
        },
        "/admin/new-country": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminNewCountry;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-country-list": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminViewCountryList;
                    else m.route.set("/");
                }
            }
        },
        "/admin/new-company-revenue": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminNewCreditRate;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-company-revenue-list": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminViewCompanyRevenueList;
                    else m.route.set("/");
                }
            }
        },
        "/admin/new-credit-rate": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminNewCreditRate;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-credit-rate-list": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminViewCreditRateList;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-frequently-ask-questions": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminViewFrequentlyAskQuestions;
                    else m.route.set("/");
                }
            }
        },
        "/admin/investors/:key": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminInvestors;
                    else m.route.set("/");
                }
            }
        },
        "/admin/borrowers/:key": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminBorrowers;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-m-account/:id": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminDashboard;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-m-status/:id": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminDashboard;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-m-logs/:id": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminDashboard;
                    else m.route.set("/");
                }
            }
        },
        "/admin/view-m-wallet/:id": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else {
                    if (Auth.checkIsRoleAdmin()) return adminDashboard;
                    else m.route.set("/");
                }
            }
        },
        "/register": {
            onmatch: function() {
                if (Auth.checkTokenNone()) return register;
                else m.route.set("/");
            }
        },
        "/register/:token": {
            onmatch: function() {
                if (Auth.checkTokenNone()) return registerActivate;
                else m.route.set("/");
            }
        },
        "/login": {
            onmatch: function() {
                if (Auth.checkTokenNone()) return login;
                else m.route.set("/");
            }
        },
        "/logout": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else return logout;
            }
        },
        "/lock-screen": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else return lockScreen;
            }
        },
        "/frequently-ask": {
            onmatch: function() {
                if (Auth.checkTokenNone()) m.route.set("/login");
                else return frequentlyAsk;
            }
        },
        "/confirm-mail/register": {
            onmatch: function() {
                if (Auth.checkTokenNone()) return confirmMailRegister;
                else m.route.set("/");
            }
        },
        "/confirm-mail/recover": {
            onmatch: function() {
                if (Auth.checkTokenNone()) return confirmMailRecover;
                else m.route.set("/");
            }
        },
        "/recover-password": {
            onmatch: function() {
                if (Auth.checkTokenNone()) return recoverPassword;
                else m.route.set("/");
            }
        },
        "/recover-password/:token": {
            onmatch: function() {
                if (Auth.checkTokenNone()) return recoverPasswordActivate;
                else m.route.set("/");
            }
        },
        "/privacy": privacy,
        "/site-maintenance": siteMaintenance,
        "/server-error": serverError,
        "/:404...": {
            onmatch: function() {
                // return siteMaintenance;

                if (Auth.checkTokenNone()) return notFound;
                else return notFoundAlt;
            }
        },
        "/:any...": serverError,
    });
}

Raven.config("https://06889627b92a49189983e5dc8da83d4f@sentry.io/1227866").install()
Raven.context(function() {
    SmartFundingRouter();
});
