import { AppSettings } from "../../configs";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
import footer from "../../widgets/footer";
import header from "../../widgets/header";
import avatar from "images/investor.png";


const Store = {
    load() {

    },
};

function statusConvert(s: string) {
    switch (s) {
        case "okay":
            return `<span class="badge badge-success">Active</span>`;
        case "locked":
            return `<span class="badge badge-warning">Inactive</span>`;
    }
}

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + "/api/user/power-user-list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();

                        json.users.map((v: any) => {
                            v._id = v._id.toUpperCase();
                            v.uid = v._id.slice(-6);
                            v.username = `
<a href="/#!/admin/view-m-p-account/${v._id}">
<img src="${avatar}" width="32" alt="contact-img" class="rounded-circle">
<span class="ml-2">${v.username}</span>
</a>`;

                            v.status = statusConvert(v.status);
                            v.button = `
<div class="btn-group dropdown">
<a href="javascript:;" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
<div class="dropdown-menu dropdown-menu-right">
<a href="/#!/admin/view-m-p-account/${v._id}" class="dropdown-item"><i class="fa fa-eye mr-2 font-18 vertical-middle"></i>Account</a>
<a href="/#!/admin/view-m-p-status/${v._id}" class="dropdown-item"><i class="fa fa-edit mr-2 font-18 vertical-middle"></i>Status</a>
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
                        text: "New Power User",
                        action: function(e: any, dt: any, node: any, config: any) {
                            m.route.set("/admin/new-power-user");
                        }
                    },
                ],
                columns: [
                    { data: "uid", width: "8%" },
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
                                        m("li.breadcrumb-item.active", "Control Panel"),
                                        m("li.breadcrumb-item.active", "Power Users")
                                    ])
                                ),
                                m("h4.page-title", "Power Users")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Power Users"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of all available power users."
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Status"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Username"),
                                            m("th", "Email"),
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
