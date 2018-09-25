import { AppSettings } from "configs";
import moment from "moment";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import jwtDecode from "jwt-decode";

import header from "widgets/header";
import footer from "widgets/footer";

export default {
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        $("#datatable").DataTable({
            ajax: {
                url: AppSettings.API_BASE_URL + "/api/investor-portfolio/list",
                type: "GET",
                beforeSend: function(request: any) {
                    request.setRequestHeader("Authorization", `Token ${token}`);
                },
                dataSrc: function(json: any) {
                    m.redraw();

                    json.investorPortfolios.map((v: any) => {
                        v.date = moment(v.createdAt).format('MMMM Do YYYY, h:mm:ss a');
                        v.status = "active";
                        return v;
                    });

                    return json.investorPortfolios;
                }
            },
            dom: "Bfrtip",
            buttons: [
                {
                    text: "Export to Excel",
                    action: function(e: any, dt: any, node: any, config: any) {
                    }
                },
            ],
            columns: [
                { data: "_id", width: "20%" },
                { data: "currentMonthlyExpectedInterest" },
                { data: "expectedRepayment" },
                { data: "paymentReceived" },
                { data: "status" },
            ]
        });
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
                                        m("li.breadcrumb-item.active", "Portfolio")
                                    ])
                                ),
                                m("h4.page-title", "Portfolio")
                            ])
                        )
                    ),

                    m(".row", [
                        m(".col-lg-12",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Portfolio"),
                                m("p.text-muted.font-14", "Check all your invoice deeds."),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Monthly Return"),
                                            m("th", "Expected Repayment Date"),
                                            m("th", "Updated Repayment Date"),
                                            m("th", "Status"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Monthly Return"),
                                            m("th", "Expected Repayment Date"),
                                            m("th", "Updated Repayment Date"),
                                            m("th", "Status"),
                                        ]),
                                    ])
                                ])
                            ])
                        ),
                    ])
                )
            ),
            m(footer),
        ]);
    }
} as m.Component;
