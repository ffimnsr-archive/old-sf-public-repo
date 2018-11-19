import m, { Vnode } from "mithril";
import { AppSettings } from "../../configs";
import footer from "../../widgets/footer";
import header from "../../widgets/header";
import { Utils } from "../../utils";

const Store = {
    username: "",
    email: "",
    typeset: "",
    name: "",
    status: "",

    canSave() {
        return this.username !== "" &&
            this.email !== "" &&
            this.typeset !== "" &&
            this.status !== "";
    },
    save() {
        const data = {
            user: {
                username: this.username,
                email: this.email,
                typeset: this.typeset,
                status: this.status,
            }
        };

        const token = localStorage.getItem("token")!;
        const vm = this;

        m.request(AppSettings.API_BASE_URL + "/api/user/new-account", {
            method: "POST",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                Utils.showSnackbar("Successfully created new user. This will redirect after 3 seconds.");
                setTimeout(function() {
                    m.route.set(`/admin/${vm.typeset}s/new`);
                }, 3000);
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    }
};

export default {
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
                                        m("li.breadcrumb-item", m("a[href='/']", { oncreate: m.route.link }, "Control Panel")),
                                        m("li.breadcrumb-item.active", "New Member Account")
                                    ])
                                ),
                                m("h4.page-title", "New Member Account")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "New Member Account"),
                                m("p.text-muted.font-14.m-b-10", "Create a new account."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "Username"),
                                            m("input.form-control[type='text'][placeholder='e.g. jrizal']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.username = v }),
                                                value: Store.username
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Email"),
                                            m("input.form-control[type='text'][placeholder='e.g. jrizal@smartfunding.sg']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.email = v }),
                                                value: Store.email
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Type"),
                                            m("select.form-control", {
                                                onchange: m.withAttr("value", (v: string) => { Store.typeset = v }),
                                            }, [
                                                    m("option[disabled][selected]", "Choose account type..."),
                                                    m("option[value='investor']", "Investor"),
                                                    m("option[value='borrower']", "Borrower"),
                                                ]
                                            ),
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Status"),
                                            m("select.form-control", {
                                                onchange: m.withAttr("value", (v: string) => { Store.status = v })
                                            }, [
                                                    m("option[disabled][selected]", "Choose status of account..."),
                                                    m("option[value='new']", "Newly Submitted"),
                                                    m("option[value='active']", "Active"),
                                                    m("option[value='pending']", "Pending"),
                                                    m("option[value='inactive']", "Inactive"),
                                                ]
                                            )
                                        ]),

                                        m("label.col-form-label", "* Temporary passwords will be sent to the email account."),
                                        m(".clearfix.text-right.mt-3",
                                            m("button.btn.btn-custom[type='submit']", {
                                                disabled: !Store.canSave()
                                            }, "Submit")
                                        )
                                    ]),
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
