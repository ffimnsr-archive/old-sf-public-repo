import m from "mithril";

import home from "components/home";
import register from "components/register";
import login from "components/login";
import logout from "components/logout";
import lockScreen from "components/lock_screen";
import confirmMail from "components/confirm_mail";
import recoverPassword from "components/recover_password";
import notFound from "components/not_found";
import notFoundAlt from "components/not_found_alt";
import serverError from "components/server_error";

function MemberRouter() {
  document.body.id = "member";
  m.route(document.body, "/", {
    "/": home,
    "/server-error": serverError,
    "/:any...": notFoundAlt
  });
}

function AnonymousRouter() {
  document.body.id = "anonymous";
  m.route(document.body, "/", {
    "/": home,
    "/register": register,
    "/login": login,
    "/logout": logout,
    "/lock-screen": lockScreen,
    "/confirm-mail": confirmMail,
    "/recover-password": recoverPassword,
    "/server-error": serverError,
    "/not-found-alt": notFoundAlt,
    "/:any...": notFound
  });
}

AnonymousRouter();
