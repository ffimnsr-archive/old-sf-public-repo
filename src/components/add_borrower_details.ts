import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";

const Store = {
    name: "",
    registrationNo: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    countries: [] as string[],

    load: function() {
        const token = localStorage.getItem("token")!;

        const vm = this;
        m.request(AppSettings.API_BASE_URL + "/api/country/list", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                vm.countries = res.countries;
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    },
    canSave: function() {
        return this.name !== "" &&
            this.registrationNo !== "" &&
            this.country !== "";
    },
    save: function() {
        const data = {
            user: {
                status: "step3-2",
                typeset: "borrower",
                company: {
                    name: this.name,
                    registrationNo: this.registrationNo,
                    address: {
                        address1: this.address1,
                        address2: this.address2,
                        city: this.city,
                        state: this.state,
                        zipCode: this.zipCode,
                        country: this.country,
                    }
                },
            }
        };

        const token = localStorage.getItem("token")!;
        m.request(AppSettings.API_BASE_URL + "/api/user/type-b", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                localStorage.setItem("status", "step4");
                m.route.set("/");
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
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
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                                        ),
                                        m("li.breadcrumb-item", m("a[href='/']", { oncreate: m.route.link }, "Account Setup")),
                                        m("li.breadcrumb-item.active", "Borrower Details")
                                    ])
                                ),
                                m("h4.page-title", "Borrower Details")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Borrower Details"),
                                m("p.text-muted.font-14.m-b-10", "All fields are required to be filled up."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "Company Name"),
                                            m("input.form-control[type='text'][placeholder='Acme Inc.']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.name = v }),
                                                value: Store.name
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Company Registration No."),
                                            m("input.form-control[type='text'][placeholder='SEC Registration No.']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.registrationNo = v }),
                                                value: Store.registrationNo
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Company Address 1"),
                                            m("input.form-control[type='text'][placeholder='House/Lot No. and Street']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.address1 = v }),
                                                value: Store.address1
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Company Address 2"),
                                            m("input.form-control[type='text'][placeholder='Apartment/Studio/Floor No.']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.address2 = v }),
                                                value: Store.address2
                                            })
                                        ]),
                                        m("div.form-row", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "City"),
                                                m("input.form-control[type='text'][placeholder='City']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.city = v }),
                                                    value: Store.city
                                                })
                                            ]),
                                            m("div.form-group.col-md-4", [
                                                m("label.col-form-label", "State"),
                                                m("input.form-control[type='text'][placeholder='State']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.state = v }),
                                                    value: Store.state
                                                })
                                            ]),
                                            m("div.form-group.col-md-2", [
                                                m("label.col-form-label", "Zip Code"),
                                                m("input.form-control[type='text'][placeholder='Zip Code']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.zipCode = v }),
                                                    value: Store.zipCode
                                                })
                                            ]),
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Country"),
                                            m("select.form-control", {
                                                onchange: m.withAttr("value", (v: string) => { Store.country = v }),
                                            }, function() {
                                                let countries = Store.countries.map(function(v: any) {
                                                    return m("option", { value: v.code }, v.name)
                                                });
                                                countries.unshift(m("option[disabled][selected]", "Choose country of origin..."));
                                                return countries;
                                            }()),
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Paid-up Capital"),
                                            m("input.form-control[type='text'][placeholder='Paid-up Capital']")
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Loan Purpose"),
                                            m("textarea.form-control[placeholder='Loan Purpose']")
                                        ]),
                                        m(".clearfix.text-right.mt-3",
                                            m("button.btn.btn-custom.waves-effect.waves-light.mr-3[type='button']", {
                                                onclick: () => {
                                                    localStorage.setItem("status", "step2");
                                                    m.route.set("/");
                                                },
                                            }, "Go Back"),
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
