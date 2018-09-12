import { AppSettings } from "configs";
import avatar from "images/users/avatar-1.png";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";

const Store = {
    fullname: "",
    username: "",
    email: "",
    role: "",
    typeset: "",
    location: "",

    load() {
        const token = localStorage.getItem("token")!;
        const vm = this;
        m.request(AppSettings.API_BASE_URL + "/api/user/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                console.log(res);
                vm.fullname = res.user.fullname;
                vm.username = res.user.username;
                vm.email = res.user.email;
                vm.role = res.user.role;
                vm.typeset = res.user.typeset;
                let location = res.address.city + ", " + res.address.country;
                vm.location = location;
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    },

    getTypeSet() {
        if (this.typeset === "") {

        }
    }
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
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
                                        m("li.breadcrumb-item", m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")),
                                        m("li.breadcrumb-item.active", "Profile")
                                    ])
                                ),
                                m("h4.page-title", "Profile")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-sm-12",
                            m(".profile-user-box.card-box.bg-custom",
                                m(".row", [
                                    m(".col-sm-6", [
                                        m("span.pull-left.mr-3",
                                            m("img.thumb-lg.rounded-circle[alt='']", { src: avatar })
                                        ),
                                        m(".media-body.text-white", [
                                            m("h4.mt-1.mb-1.font-18", Store.fullname),
                                            m("p.font-13.text-light", Store.username),
                                            m("p.text-light.mb-0", { style: { textTransform: "capitalize" } }, Store.typeset),
                                        ])
                                    ]),
                                    m(".col-sm-6",
                                        m(".text-right",
                                            m("a.btn.btn-light.waves-effect[type='button'][href='/profile/edit']", { oncreate: m.route.link }, [
                                                m("i.mdi.mdi-account-settings-variant.mr-1"),
                                                "Edit Profile"
                                            ])
                                        )
                                    )
                                ])
                            )
                        )
                    ),
                    m(".row", [
                        m(".col-md-4", [
                            m(".card-box", [
                                m("h4.header-title.mt-0.m-b-20", "Personal Information"),
                                m(".panel-body", [
                                    m("hr"),
                                    m(".text-left", [
                                        m("p.text-muted.font-13", [
                                            m("strong", "Full Name : "),
                                            m("span.m-l-15", Store.fullname),
                                        ]),
                                        m("p.text-muted.font-13", [
                                            m("strong", "Email : "),
                                            m("span.m-l-15", Store.email),
                                        ]),
                                        m("p.text-muted.font-13", [
                                            m("strong", "Location : "),
                                            m("span.m-l-15", { style: { textTransform: "capitalize" } }, Store.location),
                                        ]),
                                        m("p.text-muted.font-13", [
                                            m("strong", "Account Type : "),
                                            m("span.m-l-15", { style: { textTransform: "capitalize" } }, Store.typeset),
                                        ])
                                    ]),
                                ])
                            ])
                        ]),
                        m(".col-md-8", [
                            m(".row", [
                                m(".col-sm-4",
                                    m(".card-box.tilebox-one", [
                                        m("i.icon-layers.float-right.text-muted"),
                                        m("h6.text-muted.text-uppercase.mt-0", "Wallet Balance"),
                                        m("h2.m-b-20", [
                                            "$",
                                            m("span[data-plugin='counterup']", "0")
                                        ]),
                                        m("span.text-muted", " From previous period")
                                    ])
                                ),
                                m(".col-sm-4",
                                    m(".card-box.tilebox-one", [
                                        m("i.icon-paypal.float-right.text-muted"),
                                        m("h6.text-muted.text-uppercase.mt-0", "Paypal / Bank Balance"),
                                        m("h2.m-b-20", [
                                            "$",
                                            m("span[data-plugin='counterup']", "0")
                                        ]),
                                        m("span.text-muted", " From previous period")
                                    ])
                                ),
                                m(".col-sm-4",
                                    m(".card-box.tilebox-one", [
                                        m("i.icon-rocket.float-right.text-muted"),
                                        m("h6.text-muted.text-uppercase.mt-0", "Loan / Invest"),
                                        m("h2.m-b-20[data-plugin='counterup']", "0"),
                                        m("span.text-muted", " Last year")
                                    ])
                                )
                            ])
                        ])
                    ])
                ])
            ),
            m(footer),
            m("div#snackbar"),
        ]);
    }
} as m.Component;
