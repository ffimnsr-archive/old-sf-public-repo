import { AppSettings } from "configs";
import moment from "moment";
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
    load() {

    },
};

function statusConvert(stat: string) {
    switch (stat) {
        case "active":
            return `<span class="badge badge-success">Active</span>`;
        case "inactive":
            return `<span class="badge badge-warning">Inactive</span>`;
        case "deleted":
            return `<span class="badge badge-warning">Deleted</span>`;
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
                    url: AppSettings.API_BASE_URL + "/api/debtor/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        json.data.map(function(v) {
                            v._id = v._id.toUpperCase();
                            v.uid = v._id.slice(-6);
                            v.industry = "None";
                            v.createdBy = "None";
                            v.button = "None";
                            v.status = statusConvert(v.status);
                            v.date = moment(v.createdAt).format('MMMM Do YYYY, h:mm:ss a');
                        });
                        return json.data;
                    }
                },
                dom: "Bfrtip",
                buttons: [
                    {
                        text: "New Debtor",
                        action: function(e: any, dt: any, node: any, config: any) {

                        }
                    },
                ],
                columns: [
                    { data: "uid", width: "7%" },
                    { data: "name" },
                    { data: "industry" },
                    { data: "status" },
                    { data: "createdBy" },
                    { data: "date" },
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
                                        m("li.breadcrumb-item.active", "Debtor List")
                                    ])
                                ),
                                m("h4.page-title", "Debtor List")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Debtor List"),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Name"),
                                            m("th", "Industry"),
                                            m("th", "Status"),
                                            m("th", "Created By"),
                                            m("th", "Created Date"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Name"),
                                            m("th", "Industry"),
                                            m("th", "Status"),
                                            m("th", "Created By"),
                                            m("th", "Created Date"),
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
