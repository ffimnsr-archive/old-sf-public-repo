import m from "mithril";

import home from "components/home";
import register from "components/register";
import login from "components/login";
import logout from "components/logout";
import lockScreen from "components/lock_screen";
import confirmMail from "components/confirm_mail";
import recoverPassword from "components/recover_password";
import notFound from "components/not_found";
import serverError from "components/server_error";

m.route(document.body, "/", {
  "/": home,
  "/register": register,
  "/login": login,
  "/recover": recoverPassword,
  "/:any...": notFound
})
