import m from "mithril";
import Raven from "raven-js";

import "bootstrap";
import "bootstrap-datepicker";
import "jquery-slimscroll";

import "styles/app";
import "styles/icons";

import memberRoutes from "./components/routes";
import adminRoutes from "./components/admin/routes";

import { Auth } from "./auth";
import notFound from "./components/not_found";
import notFoundAlt from "./components/not_found_alt";
import serverError from "./components/server_error";

function SmartFundingRouter() {
    document.body.id = "sf";

    const nonRoutes = {
        "/server-error": serverError,
        "/:404...": {
            onmatch: function() {
                // return siteMaintenance;

                if (Auth.checkTokenNone()) return notFound;
                else return notFoundAlt;
            }
        },
        "/:any...": serverError,
    };

    const allRoutes = { ...memberRoutes, ...adminRoutes, ...nonRoutes };
    m.route(document.body, "/", allRoutes);
}

Raven.config("https://06889627b92a49189983e5dc8da83d4f@sentry.io/1227866").install()
Raven.context(function() {
    SmartFundingRouter();
});
