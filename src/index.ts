import m from "mithril";
import Raven from "raven-js";

import register from "components/register";
import login from "components/login";
import logout from "components/logout";
import lockScreen from "components/lock_screen";
import confirmMailRegister from "components/confirm_mail_register";
import confirmMailRecover from "components/confirm_mail_recover";
import recoverPassword from "components/recover_password";

import home from "components/home";
import uploadDocument from "components/upload_document";
import adminDashboard from "components/admin/dashboard";

import notFound from "components/not_found";
import notFoundAlt from "components/not_found_alt";
import serverError from "components/server_error";

import { Auth } from "./auth";

function SmartFundingRouter() {
  document.body.id = "sf";
  m.route(document.body, "/", {
    "/": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/login");
        else return home;
      }
    },
    "/upload-document": {
      onmatch: function() {
        if (Auth.checkTokenNone()) m.route.set("/login");
        else return uploadDocument;
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
    "/login": {
      onmatch: function() {
        if (Auth.checkTokenNone()) return login;
        else m.route.set("/");
      }
    },
    "/logout": logout,
    "/lock-screen": {
      onmatch: function() {
        if (Auth.checkTokenNone()) return lockScreen;
        else m.route.set("/");
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
    "/server-error": serverError,
    "/not-found-alt": notFoundAlt,
    "/:any...": notFound
  });
}

Raven.config("https://06889627b92a49189983e5dc8da83d4f@sentry.io/1227866").install()
Raven.context(function() {
  SmartFundingRouter();
});