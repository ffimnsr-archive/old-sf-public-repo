import m, { Vnode } from "mithril";
// import QRCode from "qrcode";
// import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

import header from "../widgets/header";
import footer from "../widgets/footer";

// const Store = {
//     image: "",

//     // load: function() {
//     //     const token = localStorage.getItem("token")!;
//     //     const data = jwtDecode<any>(token);

//     //     const vm = this;
//     // }
// };

export default {
    oninit() {
        // Store.load();
    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(header),
            m(".wrapper",
                m(".container-fluid",
                    m(".row",
                        m(".col-sm-12",
                            m(".page-title-box", [
                                m(".btn-group.pull-right",
                                    m("ol.breadcrumb.hide-phone.p-0.m-0", [
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                                        ),
                                        m("li.breadcrumb-item.active", "Top-up")
                                    ])
                                ),
                                m("h4.page-title", "Top-up")
                            ])
                        )
                    ),

                    m(".row", [
                        m(".col-lg-8",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Top-up"),
                                m("p.text-muted.font-14", "Step-by-step process to top-up your wallet through bank transfer."),
                                m("h5", "Step 1: Transfer Cash To Your Account"),
                                m("hr"),
                                m("div.table-responsive", [
                                    m("table.table.table-sm.table-borderless", [
                                        m("tbody", [
                                            m("tr", [
                                                m("td", "Account Name:"),
                                                m("td.text-left", "Vista Trust - Smartfunding Pte. Ltd."),
                                            ]),
                                            m("tr", [
                                                m("td", "Account Number:"),
                                                m("td.text-left", "003-946094-5"),
                                            ]),
                                            m("tr", [
                                                m("td", "Swift Code:"),
                                                m("td.text-left", "DBSSSGSG"),
                                            ]),
                                            m("tr", [
                                                m("td", "Bank Name:"),
                                                m("td.text-left", "DBS BANK Ltd."),
                                            ]),
                                            m("tr", [
                                                m("td", "Bank Address:"),
                                                m("td.text-left", "12 Marina Boulevard, DBS Asia Central, Marina Bay Financial Centre Tower 3, Singapore 018982"),
                                            ]),

                                        ]),
                                    ]),
                                    m("p", "Always state your unique username and name in the transaction description so we are able to match your deposit with the transactions on our bank account. The minimum deposit is USD$1,000."),
                                    m("h5", "Step 2: Upload Proof of Payment"),
                                    m("hr"),
                                    m("p", "Upload here your proof of payment."),
                                    m("form.form-horizontal[action='#']", [
                                        m("div.col-8", [
                                            m("input.default[type='file']")
                                        ]),
                                        m("br"),
                                        m("div.form-group", [
                                            m("button.btn.btn-custom[type='submit']", {
                                                onclick: () => {
                                                    Swal(
                                                        "Good job!",
                                                        "You submitted your payment proof!",
                                                        "success"
                                                    );
                                                }
                                            }, "Submit Payment Proof"),
                                        ]),
                                    ]),
                                    m("h5", "Step 3: We Match Your Transaction"),
                                    m("hr"),
                                    m("p", "Once we have matched the transaction confirmation you sent with the money deposited on our account, we will update your Investor Wallet within 1 working day."),
                                    m("h5", "Step 4: Start Investing!"),
                                    m("hr"),
                                    m("p", "You can now start investing in invoices on our platform with as little as USD$100 per invoice."),
                                    m("p", "")
                                ]),
                            ])
                        ),
                    ])
                )
            ),
            m(footer),
        ]);
    }
} as m.Component;
