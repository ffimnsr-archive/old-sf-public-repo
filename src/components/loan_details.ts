import m, { Vnode } from "mithril";
import Web3 from "web3";
import Swal from "sweetalert2";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import { AppSettings } from "../configs";
import header from "../widgets/header";
import footer from "../widgets/footer";

const Store = {
    uid: "",
    data: {},
    amount: 0,

    load(id: string) {
        this.uid = id;

        const vm = this;
        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + `/api/loan/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                vm.data = res.data;
                let container = (<any>vm.data);

                container.uid = container._id.toUpperCase().slice(-6);
            } else {

            }
        }).catch(function(err) {
            console.error("error", err);
        });
    },
    async enableEthereum() {
        let ethereum = window["ethereum"];
        return await ethereum.enable();
    },
    payEth() {
        Store.enableEthereum().then(function(data) {
            let ethereum = window["ethereum"];
            let web3 = new Web3(ethereum);

            let user_address = data[0];
            web3.eth.sendTransaction({
                to: "0x90155f691b50da9b3ac32dd4f43b80c22aad7999",
                from: user_address,
                value: web3.utils.toWei(Store.amount.toString(), "ether"),
            }, function(err, _transactionHash) {
                if (err) return Swal("Failed", "Oops, an error occured.", "error");

                Swal("Success", "Successfully invested in a loan!", "success");
            });
        });
    }
};

export default {
    oncreate(_vnode: Vnode) {
        let uid = m.route.param("id");
        Store.load(uid);
    },
    view(_vnode: Vnode) {
        let data = (<any>Store.data);
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
                                        m("li.breadcrumb-item.active", "Loan Details")
                                    ])
                                ),
                                m("h4.page-title", "Loan Details")
                            ])
                        )
                    ),

                    m(".row",
                        m(".col-md-12",
                            m(".card-box",
                                [
                                    m(".clearfix",
                                        [
                                            m(".pull-left.mb-3",
                                                m("img[alt=''][height='28'][src='/images/sf-logo.png']")
                                            ),
                                            m(".pull-right",
                                                m("h4.m-0.d-print-none",
                                                    "Loan Details"
                                                )
                                            )
                                        ]
                                    ),
                                    m(".row",
                                        [
                                            m(".col-6",
                                                m(".pull-left.mt-3",
                                                    [
                                                        m("p",
                                                            m("b",
                                                                "Investing Note:"
                                                            )
                                                        ),
                                                        m("p.text-muted",
                                                            "All loans abides terms and conditions and will be paid upon said payment periods. Check agreement and loan documents to participate and bid on a loan deal."
                                                        )
                                                    ]
                                                )
                                            ),
                                            m(".col-4.offset-2",
                                                m(".mt-3.pull-right",
                                                    [
                                                        m("p.m-b-10",
                                                            [
                                                                m("strong",
                                                                    "Loan Date: "
                                                                ),
                                                                data.createdAt,
                                                            ]
                                                        ),
                                                        m("p.m-b-10",
                                                            [
                                                                m("strong",
                                                                    "Loan Status: "
                                                                ),
                                                                m("span.badge.badge-warning",
                                                                    data.status
                                                                )
                                                            ]
                                                        ),
                                                        m("p.m-b-10",
                                                            [
                                                                m("strong",
                                                                    "Loan ID: "
                                                                ),
                                                                data.uid,
                                                            ]
                                                        )
                                                    ]
                                                )
                                            )
                                        ],
                                    ),
                                    m("div.form-group", [
                                        m("label.col-form-label", "Amount to Invest (Ether)"),
                                        m("input.form-control[type='number']", {
                                            oninput: m.withAttr("value", (v: number) => { Store.amount = v }),
                                            value: Store.amount
                                        }),
                                    ]),
                                    m("div.form-group", [
                                        m(`a[href='javascript:;']`, {
                                            onclick: () => {
                                                Store.payEth();
                                            }
                                        },
                                            m("img[src='https://raw.githubusercontent.com/MetaMask/TipButton/master/images/3_pay_mm_over.png'][width='200']")),
                                        m("a[href='https://sandbox.coingate.com/pay/sfid']",
                                            m("img[src='https://static.coingate.com/images/buttons/1.png'][width='80']")),

                                    ]),
                                ]
                            )
                        )
                    ),
                )
            ),
            m(footer),
        ]);
    }
} as m.Component;
