import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../../utils";

const Store = {
    rate: "",
    status: "",

    canSave: function() {
        return this.rate !== "" &&
            this.status !== "";
    },
    save: function() {
        const data = {
            user: {
                rate: this.rate,
                status: this.status,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/credit-rate/", {
            method: "POST",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                Utils.showSnackbar("Successfully created new credit rate. This will redirect after 3 seconds.");
                setTimeout(function() {
                    m.route.set("/admin/view-credit-rate-list");
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
                                        m("li.breadcrumb-item.active", "New Credit Rate")
                                    ])
                                ),
                                m("h4.page-title", "New Credit Rate")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "New Credit Rate"),
                                m("p.text-muted.font-14.m-b-10", "Create a new credit rate."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "Credit Rate"),
                                            m("input.form-control[type='text'][placeholder='e.g. A+']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.rate = v }),
                                                value: Store.rate
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Status"),
                                            m("select.form-control", {
                                                onchange: m.withAttr("value", (v: string) => { Store.status = v })
                                            }, [
                                                    m("option[disabled][selected]", "Choose status of document."),
                                                    m("option[value='active']", "Active"),
                                                    m("option[value='inactive']", "Inactive"),
                                                ]
                                            )
                                        ]),
                                        m(".clearfix.text-right.mt-3",
                                            m("button.btn.btn-custom.waves-effect.waves-light[type='submit']", {
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
