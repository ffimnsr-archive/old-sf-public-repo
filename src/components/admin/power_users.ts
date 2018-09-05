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
import updateAccountInfo from "widgets/modal_admin_update_account_info";
import updateStatus from "widgets/modal_admin_update_status";


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
                    url: AppSettings.API_BASE_URL + "/api/user/power-user-list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();

                        json.users.map((v: any) => {
                            v.button = `
              <a href="/#!/admin/view-m-account/${v._id}" class="btn btn-custom"><i class="fa fa-eye"></i></a>
              <a href="/#!/admin/view-m-status/${v._id}" class="btn btn-custom"><i class="fa fa-edit"></i></a>`;
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
                    { data: "username" },
                    { data: "email" },
                    { data: "status" },
                    { data: "button", width: "16%" },
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
                                m("table.table.table-bordered[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Status"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
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
