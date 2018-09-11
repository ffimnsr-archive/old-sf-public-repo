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
                    url: AppSettings.API_BASE_URL + "/api/credit-rate/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        json.creditRates.map(function(v) {
                            v._id = v._id.toUpperCase();
                        });

                        return json.creditRates;
                    }
                },
                dom: "Bfrtip",
                buttons: [
                    {
                        text: "New Credit Rate Option",
                        action: function(e: any, dt: any, node: any, config: any) {
                            m.route.set("/admin/new-credit-rate")
                        }
                    },
                ],
                columns: [
                    { data: "_id", width: "20%" },
                    { data: "rate" },
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
                                        m("li.breadcrumb-item.active", "Credit Rate Option List"),
                                    ])
                                ),
                                m("h4.page-title", "Credit Rate Option List"),
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Credit Rate Option List"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of credit rate options."
                                ]),
                                m("table.table.table-bordered[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Credit Rate"),
                                            m("th", "Status"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Credit Rate"),
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
