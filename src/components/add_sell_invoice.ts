import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";
import Swal from "sweetalert2";

const Store = {
    invoiceDocument: {},
    amount: "",
    term: "",
    eir: "",
    apr: "",
    processingFee: "",
    closingDate: "",
    debtor: "",
    documentPrepared: false,
    contractSigned: false,
    notified: false,

    debtors: [],

    load() {
        const token = localStorage.getItem("token")!;
        const vm = this;
        m.request(AppSettings.API_BASE_URL + "/api/debtor/list", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                vm.debtors = res.data;
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    },
    upload(e: any) {
        var target = e.target;
        Store.invoiceDocument = target.files[0];
    },
    canSave() {
        return true;
    },
    save() {
        const data = {
            user: {
                invoiceDocument: this.invoiceDocument,
                amount: this.amount,
                term: this.term,
                eir: this.eir,
                apr: this.apr,
                processingFee: this.processingFee,
                closingDate: this.closingDate,
                debtor: this.debtor,
                documentPrepared: this.documentPrepared,
                contractSigned: this.contractSigned,
                notified: this.notified,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/new-sell-invoice", {
            method: "POST",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                Swal({
                    title: "Success!",
                    text: "You have successfully created a sell invoice!",
                    type: "success",
                    confirmButtonClass: "btn btn-confirm mt-2"
                });
            } else {
                Swal({
                    title: "Failed!",
                    text: res.message,
                    type: "error",
                    confirmButtonClass: "btn btn-confirm mt-2"
                });
            }
        }).catch(function(err) {
            Swal({
                title: "Failed!",
                text: err,
                type: "error",
                confirmButtonClass: "btn btn-confirm mt-2"
            });
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

        $('#datepicker-auto').on('changeDate', function() {
            Store.closingDate = $('#datepicker-auto').datepicker('getFormattedDate');
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
                                        m("div.form-row", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Amount"),
                                                m("input.form-control[type='text'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.amount = v }),
                                                    value: Store.amount
                                                })
                                            ]),
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Term (Days)"),
                                                m("input.form-control[type='text'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.term = v }),
                                                    value: Store.term
                                                })
                                            ]),
                                        ]),
                                        m("div.form-row", [
                                            m("div.form-group.col-md-4", [
                                                m("label.col-form-label", "Monthly Interest Rates (EIR)"),
                                                m("input.form-control[type='text'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.eir = v }),
                                                    value: Store.eir
                                                })
                                            ]),
                                            m("div.form-group.col-md-4", [
                                                m("label.col-form-label", "Annual Percentage Rate (APR)"),
                                                m("input.form-control[type='text'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.apr = v }),
                                                    value: Store.apr
                                                })
                                            ]),
                                            m("div.form-group.col-md-4", [
                                                m("label.col-form-label", "Processing Fee"),
                                                m("input.form-control[type='text'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.processingFee = v }),
                                                    value: Store.processingFee
                                                })
                                            ]),
                                        ]),
                                        m("div.form-row", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Closing Date"),
                                                m("div",
                                                    m("div.input-group", [
                                                        m("input.form-control#datepicker-auto[type='text'][placeholder='mm/dd/yyyy']"),
                                                        m("div.input-group-append",
                                                            m("span.input-group-text",
                                                                m("i.mdi.mdi-calendar")
                                                            )
                                                        )
                                                    ])
                                                )
                                            ]),
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Debtor"),
                                                m("select.form-control", {
                                                    onchange: m.withAttr("value", (v: string) => { Store.debtor = v }),
                                                }, function() {
                                                    let debtors = Store.debtors.map(function(v: any) {
                                                        return m("option", { value: v.name }, v.name)
                                                    });
                                                    debtors.unshift(m("option[disabled][selected]", "Choose debtor..."));
                                                    return debtors;
                                                }()),
                                            ]),
                                        ]),
                                        m("div.form-group", [
                                            m("div.checkbox", [
                                                m("input#checkbox0[name='c0'][type=checkbox]", {
                                                    onclick: m.withAttr("checked", (v: boolean) => { Store.documentPrepared = v })
                                                }),
                                                m("label[for=checkbox0]", "Document Prepared")
                                            ]),
                                            m("div.checkbox", [
                                                m("input#checkbox1[name='c1'][type=checkbox]", {
                                                    onclick: m.withAttr("checked", (v: boolean) => { Store.contractSigned = v })
                                                }),
                                                m("label[for=checkbox1]", "Contract Signed")
                                            ]),
                                            m("div.checkbox", [
                                                m("input#checkbox2[name='c2'][type=checkbox]", {
                                                    onclick: m.withAttr("checked", (v: boolean) => { Store.notified = v })
                                                }),
                                                m("label[for=checkbox2]", "Notified")
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
