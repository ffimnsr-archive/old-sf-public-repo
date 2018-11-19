import m, { Vnode } from "mithril";
import Swal from "sweetalert2";
import Web3 from "web3";
import { AppSettings } from "../configs";
import { Utils } from "../utils";
import footer from "../widgets/footer";
import header from "../widgets/header";

const Store = {
    loanDocument: "",
    walletBalance: "",
    amount: "",
    term: "",
    eir: "",
    apr: "",
    processingFee: "",
    closingDate: "",
    loanPurpose: "",
    documentPrepared: false,
    contractSigned: false,
    notified: false,

    loanPurposes: [],

    load() {
        const token = localStorage.getItem("token")!;
        const vm = this;
        m.request(AppSettings.API_BASE_URL + "/api/loan-purpose/list", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                vm.loanPurposes = res.loanPurposes;
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    },
    upload(e: any) {
        var target = e.target;
        Store.loanDocument = target.files[0];
    },
    canSave() {
        return true;
    },
    save() {
        const data = {
            user: {
                loanDocument: this.loanDocument,
                amount: this.amount,
                term: this.term,
                eir: this.eir,
                apr: this.apr,
                processingFee: this.processingFee,
                closingDate: this.closingDate,
                loanPurpose: this.loanPurpose,
                documentPrepared: this.documentPrepared,
                contractSigned: this.contractSigned,
                notified: this.notified,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/new-loan", {
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
                    text: "You have successfully applied for a loan!",
                    type: "success",
                    confirmButtonClass: "btn btn-confirm mt-2"
                });
            } else {
                Swal({
                    title: "Failed!",
                    text: res.message.errors.message,
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
    },
    async getEthBalance() {
        let ethereum = window["ethereum"];
        return await ethereum.enable();
    }
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
        Store.getEthBalance().then(function(data) {
            Store.loanDocument = data[0];
            let ethereum = window["ethereum"];
            let web3 = new Web3(ethereum);
            web3.eth.getBalance(data[0]).then(function(balance) {
                let ether = web3.utils.fromWei(balance, "ether");
                Store.walletBalance = ether.toString();
                m.redraw();
            });

            m.redraw();
        });
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
                                        m("li.breadcrumb-item.active", "Apply for Loan")
                                    ])
                                ),
                                m("h4.page-title", "Apply for Loan")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Apply for Loan"),
                                m("p.text-muted", "."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-row", [
                                            m("div.form-group.col-md-9", [
                                                m("label.col-form-label", "Staked Crypto Wallet (ETH)"),
                                                m("input.form-control[type='text'][placeholder=''][required='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.loanDocument = v }),
                                                    value: Store.loanDocument,
                                                })
                                            ]),
                                            m("div.form-group.col-md-3", [
                                                m("label.col-form-label", "Wallet Balance (Ether)"),
                                                m("input.form-control[type='text'][placeholder=''][readonly=''][required='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.walletBalance = v }),
                                                    value: Store.walletBalance,
                                                })
                                            ]),
                                        ]),
                                        m("div.form-row", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Amount"),
                                                m("input.form-control[type='number'][placeholder=''][required='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.amount = v }),
                                                    value: Store.amount
                                                })
                                            ]),
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Term (Days)"),
                                                m("input.form-control[type='number'][placeholder=''][required='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.term = v }),
                                                    value: Store.term
                                                })
                                            ]),
                                        ]),
                                        m("div.form-row", [
                                            m("div.form-group.col-md-4", [
                                                m("label.col-form-label", "Monthly Interest Rates (EIR)"),
                                                m("input.form-control[type='number'][placeholder=''][required='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.eir = v }),
                                                    value: Store.eir
                                                })
                                            ]),
                                            m("div.form-group.col-md-4", [
                                                m("label.col-form-label", "Annual Percentage Rate (APR)"),
                                                m("input.form-control[type='number'][placeholder=''][required='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.apr = v }),
                                                    value: Store.apr
                                                })
                                            ]),
                                            m("div.form-group.col-md-4", [
                                                m("label.col-form-label", "Processing Fee"),
                                                m("input.form-control[type='number'][placeholder=''][required='']", {
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
                                                        m("input.form-control#datepicker-auto[type='text'][placeholder='mm/dd/yyyy'][required='']"),
                                                        m("div.input-group-append",
                                                            m("span.input-group-text",
                                                                m("i.mdi.mdi-calendar")
                                                            )
                                                        )
                                                    ])
                                                )
                                            ]),
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Loan Purpose"),
                                                m("select.form-control[required='']", {
                                                    onchange: m.withAttr("value", (v: string) => { Store.loanPurpose = v }),
                                                }, function() {
                                                    let loanPurposes = Store.loanPurposes.map(function(v: any) {
                                                        return m("option", { value: v.name }, v.name)
                                                    });
                                                    loanPurposes.unshift(m("option[disabled][selected]", "Choose loan purpose..."));
                                                    return loanPurposes;
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
