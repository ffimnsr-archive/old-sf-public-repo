import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    forename: "",
    surname: "",
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
                // TODO: add feedback so user would know he's been denied
                m.route.set("/server-error");
            }
        }).catch(function(err) {
            console.error("error", err);
            m.route.set("/server-error");
        });
    },
    canSave: function() {
        return this.forename !== "" &&
            this.surname !== "" &&
            this.country !== "";
    },
    save: function() {
        const data = {
            user: {
                forename: this.forename,
                surname: this.surname,
                address1: this.address1,
                address2: this.address2,
                city: this.city,
                state: this.state,
                zipCode: this.zipCode,
                country: this.country,
                status: "step1",
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/details", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                localStorage.setItem("status", "step2");
                m.route.set("/");
            } else {
                // TODO: add feedback so user would know he's been denied
                console.error("error", res);
            }
        }).catch(function(err) {
            console.error("error", err);
        });
    }
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {

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
                                        m("li.breadcrumb-item.active", "Personal Details")
                                    ])
                                ),
                                m("h4.page-title", "Personal Details")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Personal Details"),
                                m("p.text-muted.font-14.m-b-10", "Stores personal details."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-row", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "First Name"),
                                                m("input.form-control[type='text'][placeholder='Jose']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.forename = v }),
                                                    value: Store.forename
                                                })
                                            ]),
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Last Name"),
                                                m("input.form-control[type='text'][placeholder='Rizal']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.surname = v }),
                                                    value: Store.surname
                                                })
                                            ]),
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Address 1"),
                                            m("input.form-control[type='text'][placeholder='House/Lot No. and Street']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.address1 = v }),
                                                value: Store.address1
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Address 2"),
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
                                            }, Store.countries.map(function(v: any) {
                                                return m("option", { value: v.code }, v.name)
                                            })),
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
