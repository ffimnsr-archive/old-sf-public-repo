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

export default {
    oncreate(vnode: Vnode) {
        Store.setStatus(m.route.param("key"));
        const token = localStorage.getItem("token")!;

        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + `/api/user/investors-list/${Store.status}`,
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();

                        json.users.map((v: any) => {
                            v.button = `
              <a href="javascript:;" data-toggle="modal" data-target="#status" class="btn btn-custom"><i class="fa fa-eye"></i></a>
              <a href="javascript:;" data-toggle="modal" data-target="#status" class="btn btn-custom"><i class="fa fa-edit"></i></a>
              <a href="javascript:;" data-toggle="modal" data-target="#status" class="btn btn-custom"><i class="fa fa-money"></i></a>`;
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
                        }
                    },
                ],
                columns: [
                    { data: "forename" },
                    { data: "surname" },
                    { data: "username" },
                    { data: "email" },
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
                                        m("li.breadcrumb-item.active", "Investors"),
                                        m("li.breadcrumb-item.active", { style: { textTransform: "capitalize" } }, `${Store.status}  Investors`)
                                    ])
                                ),
                                m("h4.page-title", { style: { textTransform: "capitalize" } }, `${Store.status} Investors`)
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", { style: { textTransform: "capitalize" } }, `${Store.status} Investors`),
                                m("p.text-muted.font-14.m-b-30", [
                                    `List of all ${Store.status} investors.`
                                ]),
                                m("table.table.table-bordered[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Forename"),
                                            m("th", "Surname"),
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Forename"),
                                            m("th", "Surname"),
                                            m("th", "Username"),
                                            m("th", "Email"),
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
