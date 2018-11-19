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

export default {
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        $("#datatable").DataTable({
            ajax: {
                url: AppSettings.API_BASE_URL + "/api/log/list",
                type: "GET",
                beforeSend: function(request: any) {
                    request.setRequestHeader("Authorization", `Token ${token}`);
                },
                dataSrc: function(_json: any) {
                    m.redraw();
                    return [];
                }
            },
            dom: "Bfrtip",
            buttons: [
                {
                    text: "Export to Excel",
                    action: function(_e: any, _dt: any, _node: any, _config: any) {
                    }
                },
            ],
            columns: [
                { data: "date", width: "20%" },
                { data: "message" },
                { data: "message" },
                { data: "message" },
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
                                        m("li.breadcrumb-item.active", "My Wallet")
                                    ])
                                ),
                                m("h4.page-title", "My Wallet")
                            ])
                        )
                    ),

                    m(".row", [
                        m(".col-lg-12",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Transaction Wallet Logs"),
                                m("p.text-muted.font-14", "View your previous wallet transaction and biddings."),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Date"),
                                            m("th", "Message"),
                                            m("th", "Menu"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Date"),
                                            m("th", "Message"),
                                            m("th", "Menu"),
                                            m("th", "Action"),
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
