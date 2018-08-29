import { AppSettings } from "configs";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    load: function() {

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
                    url: AppSettings.API_BASE_URL + "/api/user/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();

                        json.users.map((v: any) => {
                            v.button = `
              <a href="javascript:;" data-toggle="modal" data-target="#status" class="btn btn-custom">View Account</a>
              <a href="javascript:;" data-toggle="modal" data-target="#status" class="btn btn-custom">Update Status</a>`;
                            return v;
                        });

                        return json.users;
                    }
                },
                columns: [
                    { data: "forename" },
                    { data: "surname" },
                    { data: "username" },
                    { data: "email" },
                    { data: "typeset" },
                    { data: "isDocumentsSubmitted" },
                    { data: "isMailVerified" },
                    { data: "status" },
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
                                        m("li.breadcrumb-item.active", "Investors")
                                    ])
                                ),
                                m("h4.page-title", "Investors")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Borrowers / Investors"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of all investors and borrowers."
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