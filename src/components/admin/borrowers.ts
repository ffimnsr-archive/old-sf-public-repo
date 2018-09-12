import { AppSettings } from "configs";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    status: "new",
    setStatus(status: string) {
        this.status = status;
    }
};

function statusConvert(stat: string) {
    switch (stat) {
        case "pending":
            return `<span class="badge badge-purple">Pending</span>`;
        case "okay":
            return `<span class="badge badge-success">Active</span>`;
        case "locked":
            return `<span class="badge badge-warning">Inactive</span>`;
        case "deleted":
            return `<span class="badge badge-warning">Rejected</span>`;
        default:
            return `<span class="badge badge-info">Fill-up</span>`;
    }
}

export default {
    oncreate(_vnode: Vnode) {
        Store.setStatus(m.route.param("key"));
        const token = localStorage.getItem("token")!;

        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + `/api/user/borrowers-list/${Store.status}`,
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        json.users.map((v: any) => {
                            v._id = v._id.toUpperCase();
                            v.uid = v._id.slice(-6);
                            v.status = statusConvert(v.status);
                            v.button = `
<div class="btn-group dropdown">
<a href="javascript:;" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
<div class="dropdown-menu dropdown-menu-right">
<a href="/#!/admin/view-m-b-account/${v._id}" class="dropdown-item"><i class="fa fa-eye mr-2 font-18 vertical-middle"></i>Account</a>
<a href="/#!/admin/view-m-status/${v._id}" class="dropdown-item"><i class="fa fa-edit mr-2 font-18 vertical-middle"></i>Status</a>
</div>
</div>`;
                            return v;
                        });

                        return json.users;
                    }
                },
                dom: "Bfrtip",
                buttons: [
                    {
                        text: "New Member",
                        action: function(e: any, dt: any, node: any, config: any) {
                            m.route.set("/admin/new-account");
                        }
                    },
                ],
                columns: [
                    { data: "uid", width: "8%" },
                    { data: "forename" },
                    { data: "username" },
                    { data: "email" },
                    { data: "status", width: "6%" },
                    { data: "button", width: "5%" },
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
                                        m("li.breadcrumb-item.active", "Borrowers"),
                                        m("li.breadcrumb-item.active", { style: { textTransform: "capitalize" } }, `${Store.status} Borrowers`),
                                    ])
                                ),
                                m("h4.page-title", { style: { textTransform: "capitalize" } }, `${Store.status} Borrowers`),
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", { style: { textTransform: "capitalize" } }, `${Store.status} Borrowers`),
                                m("p.text-muted.font-14.m-b-30", [
                                    `List of all ${Store.status} borrowers.`
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Name"),
                                            m("th", "Company"),
                                            m("th", "Contact"),
                                            m("th", "Status"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Name"),
                                            m("th", "Company"),
                                            m("th", "Contact"),
                                            m("th", "Status"),
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
