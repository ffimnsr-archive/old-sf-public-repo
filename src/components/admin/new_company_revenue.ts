import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../../utils";

const Store = {
    code: "",
    name: "",
    status: "",

    canSave: function() {
        return this.code !== "" &&
            this.name !== "" &&
            this.status !== "";
    },
    save: function() {
        const data = {
            user: {
                code: this.code,
                name: this.name,
                status: this.status,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/country/", {
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
                    m.route.set("/admin/view-country-list");
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
                                m("h4.header-title.m-t-0", "New Country"),
                                m("p.text-muted.font-14.m-b-10", "Create a new country."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "Country Code"),
                                            m("input.form-control[type='text'][placeholder='e.g. SG']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.code = v }),
                                                value: Store.code
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Country Name"),
                                            m("input.form-control[type='text'][placeholder='e.g. Singapore']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.name = v }),
                                                value: Store.name
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
