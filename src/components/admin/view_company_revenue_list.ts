import { AppSettings } from "configs";
import moment from "moment";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

export default {
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + "/api/company-revenue/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        json.companyRevenues.map(function(v) {
                            v._id = v._id.toUpperCase();
                        });
                        return json.companyRevenues;
                    }
                },
                dom: "Bfrtip",
                buttons: [
                    {
                        text: "New Company Revenue Option",
                        action: function(e: any, dt: any, node: any, config: any) {
                            m.route.set("/admin/new-company-revenue")
                        }
                    },
                ],
                columns: [
                    { data: "_id", width: "20%" },
                    { data: "revenue" },
                    { data: "status", width: "7%" },
                ]
            });
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
                                        m("li.breadcrumb-item.active", "Control Panel"),
                                        m("li.breadcrumb-item.active", "Company Revenue List"),
                                    ])
                                ),
                                m("h4.page-title", "Company Revenue List"),
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Company Revenue List"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of options of company revenues."
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Revenue"),
                                            m("th", "Status"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Revenue"),
                                            m("th", "Status"),
                                        ]),
                                    ])
                                ])
                            ])
                        )
                    )
                ])
            ),
            m(footer),
        ]);
    }
}
