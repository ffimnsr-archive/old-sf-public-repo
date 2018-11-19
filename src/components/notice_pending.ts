import m, { Vnode } from "mithril";
import { AppSettings } from "../configs";
import footer from "../widgets/footer";
import header from "../widgets/header";
import { Utils } from "../utils";

const Store = {
    continue: function() {
        const data = {
            user: {
                status: "pending",
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/set-status", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (!res.success) {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    }

};

export default {
    oninit(_vnode: Vnode) {
        Store.continue();
    },
    oncreate(_vnode: Vnode) {
        setTimeout(function() {
            console.log("logout");
            m.route.set("/logout");
        }, 10000);
    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(header),
            m(".wrapper",
                m(".container-fluid", [
                    m(".row",
                        m(".col-sm-12",
                            m(".page-title-box", [
                                m(".btn-group.pull-right",
                                    m("ol.breadcrumb.hide-phone.p-0.m-0", [
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                                        ),
                                        m("li.breadcrumb-item", m("a[href='/']", { oncreate: m.route.link }, "Account Setup")),
                                        m("li.breadcrumb-item.active", "Pending Verification")
                                    ])
                                ),
                                m("h4.page-title", "Pending Verification")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-sm-6.offset-3",
                            m(".text-center.mt-5", [
                                m("h1.text-error", "Account Pending"),
                                m("h4.text-uppercase.text-danger.mt-3", "Pending Verification"),
                                m("p.text-muted.mt-3", [
                                    "We will be sending you an email notification, once your account has been validated. Kindly, comeback again once its done. ",
                                    m("b", "You'll automatically be logout after 10 seconds.")
                                ]),
                                m("a.btn.btn-md.btn-custom.mt-3[href='/']", { oncreate: m.route.link }, "Return Home")
                            ])
                        )
                    )
                ])
            ),
            m(footer),
            m("div#snackbar"),
        ]);
    }
} as m.Component;
