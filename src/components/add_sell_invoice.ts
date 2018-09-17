import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";

const Store = {
    invoiceDocument: "",

    load() {
        const token = localStorage.getItem("token")!;

        const vm = this;
    },
    upload(e: Event) {
        var target = e.target!;
    },
    canSave() {
        return true;
    },
    save() {
        const data = {
            user: {

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
    oncreate(_vnode: Vnode) {
        $('#datepicker-auto').datepicker({
            autoclose: true,
            startDate: "+3d",
        });

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
                                        m("li.breadcrumb-item.active", "Sell Invoice")
                                    ])
                                ),
                                m("h4.page-title", "Sell Invoice")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Sell Invoice"),
                                m("p.text-muted", "Sell your invoice to get loans."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("input.default[type='file'][accept='application/pdf']", {
                                                onchange: Store.upload,
                                            })
                                        ]),
                                        // m("div.form-row", [
                                        //     m("div.form-group.col-md-6", [
                                        //         m("label.col-form-label", "Amount"),
                                        //         m("input.form-control[type='text'][placeholder='']", {
                                        //             oninput: m.withAttr("value", (v: string) => { Store.forename = v }),
                                        //             value: Store.forename
                                        //         })
                                        //     ]),
                                        //     m("div.form-group.col-md-6", [
                                        //         m("label.col-form-label", "Term (Days)"),
                                        //         m("input.form-control[type='text'][placeholder='']", {
                                        //             oninput: m.withAttr("value", (v: string) => { Store.surname = v }),
                                        //             value: Store.surname
                                        //         })
                                        //     ]),
                                        // ]),
                                        // m("div.form-row", [
                                        //     m("div.form-group.col-md-4", [
                                        //         m("label.col-form-label", "Monthly Interest Rates (EIR)"),
                                        //         m("input.form-control[type='text'][placeholder='']", {
                                        //             oninput: m.withAttr("value", (v: string) => { Store.forename = v }),
                                        //             value: Store.forename
                                        //         })
                                        //     ]),
                                        //     m("div.form-group.col-md-4", [
                                        //         m("label.col-form-label", "Annual Percentage Rate (APR)"),
                                        //         m("input.form-control[type='text'][placeholder='']", {
                                        //             oninput: m.withAttr("value", (v: string) => { Store.surname = v }),
                                        //             value: Store.surname
                                        //         })
                                        //     ]),
                                        //     m("div.form-group.col-md-4", [
                                        //         m("label.col-form-label", "Processing Fee"),
                                        //         m("input.form-control[type='text'][placeholder='']", {
                                        //             oninput: m.withAttr("value", (v: string) => { Store.surname = v }),
                                        //             value: Store.surname
                                        //         })
                                        //     ]),
                                        // ]),
                                        // m("div.form-row", [
                                        //     m("div.form-group.col-md-6", [
                                        //         m("label.col-form-label", "Closing Date"),
                                        //         m("div",
                                        //             m("div.input-group", [
                                        //                 m("input.form-control#datepicker-auto[type='text'][placeholder='mm/dd/yyyy']", {
                                        //                     oninput: m.withAttr("value", (v: string) => { Store.forename = v }),
                                        //                     value: Store.forename
                                        //                 }),
                                        //                 m("div.input-group-append",
                                        //                     m("span.input-group-text",
                                        //                         m("i.mdi.mdi-calendar")
                                        //                     )
                                        //                 )
                                        //             ])
                                        //         )
                                        //     ]),
                                        //     m("div.form-group.col-md-6", [
                                        //         m("label.col-form-label", "Debtor"),
                                        //         m("input.form-control[type='text'][placeholder='']", {
                                        //             oninput: m.withAttr("value", (v: string) => { Store.surname = v }),
                                        //             value: Store.surname
                                        //         })
                                        //     ]),
                                        // ]),
                                        m("div.form-group", [
                                            m("div.checkbox", [
                                                m("input#checkbox0[type=checkbox]"),
                                                m("label[for=checkbox0]", "Document Prepared")
                                            ]),
                                            m("div.checkbox", [
                                                m("input#checkbox0[type=checkbox]"),
                                                m("label[for=checkbox0]", "Contract Signed")
                                            ]),
                                            m("div.checkbox", [
                                                m("input#checkbox0[type=checkbox]"),
                                                m("label[for=checkbox0]", "Notified")
                                            ])
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
