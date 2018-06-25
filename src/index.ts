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
import uploadDocument from "components/upload_document";

import adminLogin from "components/admin/login";
import adminLogout from "components/admin/logout";
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

function SmartFundingRouter() {
  document.body.id = "sf";
  m.route(document.body, "/", {
    "/": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/login");
        else {
          console.log("hello");
          if (Auth.checkIsDocumentsSubmitted()) return home;
          else return uploadDocument;
        };
      }
    },
    "/profile": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/login");
        else return profile;
      }
    },
    "/admin/dashboard": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/admin/login");
        else return adminDashboard;
      }
    },
    "/admin/login": {
      onmatch: function() {
        if (Auth.checkTokenNone()) return adminLogin;
        else m.route.set("/admin/dashboard");
      }
    },
    "/admin/logout": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/admin/login");
        else return adminLogout;
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
