import { AppSettings } from "../configs";
// import moment from "moment";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
// import QRCode from "qrcode";
// import jwtDecode from "jwt-decode";

import header from "../widgets/header";
import footer from "../widgets/footer";


const Store = {
    uid: "",
    data: {},

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
                                        ]
                                    ),
                                    m(`a.btn.btn-info[href='/#!/loan-invest/${data._id}']`,
                                        "Invest"
                                    )
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
