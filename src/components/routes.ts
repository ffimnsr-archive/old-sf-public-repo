import m from "mithril";
import { Auth } from "../auth";

import register from "./register";
import registerActivate from "./register_activate";
import login from "./login";
import logout from "./logout";
import privacy from "./privacy";
import frequentlyAsk from "./frequently_ask";
import lockScreen from "./lock_screen";
import confirmMailRegister from "./confirm_mail_register";
import confirmMailRecover from "./confirm_mail_recover";
import recoverPassword from "./recover_password";
import recoverPasswordActivate from "./recover_password_activate";

import home from "./home";
import topUp from "./top_up";
import wallet from "./wallet";
import profile from "./profile";
import portfolio from "./portfolio";
import settings from "./settings";
import deals from "./deals";
import applyForLoan from "./apply_for_loan";
import loanDetails from "./loan_details";
import addInquiry from "./add_inquiry";
import addProfileDetails from "./add_profile_details";
import addProfileType from "./add_profile_type";
import addProfilePicture from "./add_profile_picture";
import addInvestorDetails from "./add_investor_details";
import addBorrowerDetails from "./add_borrower_details";
import addKycDocuments from "./add_kyc_documents";
import addCryptoWallets from "./add_crypto_wallet";
import addMfa from "./add_mfa";
import noticePending from "./notice_pending";
import editProfileDetails from "./edit_profile_details";

import siteMaintenance from "./site_maintenance";

export default {
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
                            return addMfa;
                        case "crypto":
                            return addCryptoWallets;
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
    "/top-up": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return topUp;
        }
    },
    "/my-wallet": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return wallet;
        }
    },
    "/deals": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return deals;
        }
    },
    "/portfolio": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return portfolio;
        }
    },
    "/apply-for-loan": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return applyForLoan;
        }
    },
    "/loan-details/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return loanDetails;
        }
    },
    "/create-inquiry": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return addInquiry;
        }
    },
    "/profile/edit": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else return editProfileDetails;
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
};
