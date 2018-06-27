import m from "mithril";
import Raven from "raven-js";

import register from "components/register";
import login from "components/login";
import logout from "components/logout";
import privacy from "components/privacy";
import frequentlyAsk from "components/frequently_ask";
import lockScreen from "components/lock_screen";
import confirmMailRegister from "components/confirm_mail_register";
import confirmMailRecover from "components/confirm_mail_recover";
import recoverPassword from "components/recover_password";

import home from "components/home";
import profile from "components/profile";
import addProfileDetails from "components/add_profile_details";
import addProfileType from "components/add_profile_type";
import addProfilePicture from "components/add_profile_picture";
import addInvestorDetails from "components/add_investor_details";
import addBorrowerDetails from "components/add_borrower_details";
import uploadDocument from "components/upload_document";

import adminDashboard from "components/admin/dashboard";

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
          if (Auth.checkIsDocumentsSubmitted()) return home;
          else {
            // return addProfileDetails;
            // return addProfileType;
            // return addProfilePicture;
            // return addInvestorDetails;
            // return addBorrowerDetails;
            return uploadDocument;
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
    "/profile/edit": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/login");
        else return profile;
      }
    },
    "/admin/dashboard": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/login");
        else return adminDashboard;
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
        if (Auth.checkTokenNone()) return register;
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
        if (Auth.checkTokenNone()) return recoverPassword;
        else m.route.set("/");
      }
    },
    "/privacy": privacy,
    "/site-maintenance": siteMaintenance,
    "/server-error": serverError,
    "/:any...": {
      onmatch: function() {
        if (Auth.checkTokenNone()) return notFound;
        else return notFoundAlt;
      }
    }
  });
}

Raven.config("https://06889627b92a49189983e5dc8da83d4f@sentry.io/1227866").install()
Raven.context(function() {
  SmartFundingRouter();
});
