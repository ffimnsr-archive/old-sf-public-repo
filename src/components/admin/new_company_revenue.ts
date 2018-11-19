import { AppSettings } from "../../configs";
import m, { Vnode } from "mithril";
import footer from "../../widgets/footer";
import header from "../../widgets/header";
import { Utils } from "../../utils";

const Store = {
    revenue: "",
    status: "",

    canSave: function() {
        return this.revenue !== "" &&
            this.status !== "";
    },
    save: function() {
        const data = {
            user: {
                revenue: this.revenue,
                status: this.status,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/company-revenue/", {
            method: "POST",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                Utils.showSnackbar("Successfully created new company revenue option. This will redirect after 3 seconds.");
                setTimeout(function() {
                    m.route.set("/admin/view-company-revenue-list");
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
                                        m("li.breadcrumb-item.active", "New Company Revenue")
                                    ])
                                ),
                                m("h4.page-title", "New Company Revenue")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "New Company Revenue"),
                                m("p.text-muted.font-14.m-b-10", "Create a new company revenue option."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "Revenue"),
                                            m("input.form-control[type='text'][placeholder='e.g. 1 - 1000']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.revenue = v }),
                                                value: Store.revenue
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
