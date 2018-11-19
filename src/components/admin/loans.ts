import m, { Vnode } from "mithril";
import { AppSettings } from "../../configs";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import footer from "../../widgets/footer";
import header from "../../widgets/header";

const Store = {
    load() {

    },
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + "/api/loan/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        json.data.map(function(v: any) {
                            v._id = v._id.toUpperCase();
                            v.uid = v._id.slice(-6);
                            v.info = `
APR: ${v.aprPercent}<br>
EIR: ${v.eirPercent}`;
                            v.button = `
<div class="btn-group dropdown">
<a href="javascript:;" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
<div class="dropdown-menu dropdown-menu-right">
<a href="/#!/admin/view-m-p-status/${v._id}" class="dropdown-item"><i class="fa fa-edit mr-2 font-18 vertical-middle"></i>Status</a>
</div>
</div>`;
                        });
                        return json.data;
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
                    { data: "uid", width: "8%" },
                    { data: "period" },
                    { data: "amount" },
                    { data: "info" },
                    { data: "createdAt" },
                    { data: "closingDate" },
                    { data: "button" },
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
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "Control Panel")
                                        ),
                                        m("li.breadcrumb-item.active", "Loans")
                                    ])
                                ),
                                m("h4.page-title", "Loans")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Loans"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of all active and inactive invoices."
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Period"),
                                            m("th", "Amount"),
                                            m("th", "Info"),
                                            m("th", "Created Date"),
                                            m("th", "Closing Date"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Invoice Seller"),
                                            m("th", "Amount"),
                                            m("th", "Info"),
                                            m("th", "Created Date"),
                                            m("th", "Closing Date"),
                                            m("th", "Action"),
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
