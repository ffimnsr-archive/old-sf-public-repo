import { AppSettings } from "configs";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";


const Store = {
    count: 0,
    pendingInvestorsCount: 0,
    pendingBorrowersCount: 0,
    discardedCount: 0,

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
                        Store.count = json.count;
                        Store.pendingInvestorsCount = json.pendingInvestorsCount;
                        Store.pendingBorrowersCount = json.pendingBorrowersCount;
                        Store.discardedCount = json.discardedCount;
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
                                        m("li.breadcrumb-item.active", "Admin Dashboard")
                                    ])
                                ),
                                m("h4.page-title", "Admin Dashboard")
                            ])
                        )
                    ),
                    m(".row.text-center", [
                        m(".col-sm-6.col-lg-6.col-xl-3",
                            m(".card-box.widget-flat.border-custom.bg-custom.text-white", [
                                m("i.fi-tag"),
                                m("h3.m-b-10", Store.count),
                                m("p.text-uppercase.m-b-5.font-13.font-600", "Total Registered Users")
                            ])
                        ),
                        m(".col-sm-6.col-lg-6.col-xl-3",
                            m(".card-box.bg-primary.widget-flat.border-primary.text-white", [
                                m("i.fi-archive"),
                                m("h3.m-b-10", Store.pendingInvestorsCount),
                                m("p.text-uppercase.m-b-5.font-13.font-600", "Pending Investors")
                            ])
                        ),
                        m(".col-sm-6.col-lg-6.col-xl-3",
                            m(".card-box.widget-flat.border-success.bg-success.text-white", [
                                m("i.fi-help"),
                                m("h3.m-b-10", Store.pendingBorrowersCount),
                                m("p.text-uppercase.m-b-5.font-13.font-600", "Pending Borrowers")
                            ])
                        ),
                        m(".col-sm-6.col-lg-6.col-xl-3",
                            m(".card-box.bg-danger.widget-flat.border-danger.text-white", [
                                m("i.fi-delete"),
                                m("h3.m-b-10", Store.discardedCount),
                                m("p.text-uppercase.m-b-5.font-13.font-600", "Discarded Applicants")
                            ])
                        )
                    ]),

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
                                            m("th", "Type"),
                                            m("th", "Documents"),
                                            m("th", "Verified"),
                                            m("th", "Status"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Forename"),
                                            m("th", "Surname"),
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Type"),
                                            m("th", "Documents"),
                                            m("th", "Verified"),
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
            m("div.modal#status[tabindex='-1'][role='dialog']",
                m("div.modal-dialog.modal-dialog-centered[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header", [
                            m("h5.modal-title", "Update Status"),
                            m("button.close[type='button'][data-dismiss='modal'][aria-label='Close']",
                                m("span[aria-hidden='true']", '×')
                            )
                        ]),
                        m("div.modal-body",
                            m("p", "Modal body goes here.")
                        ),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary", "Save changes"),
                            m("button.btn.btn-secondary[data-dismiss='modal']", "Close")
                        ])
                    ])
                )
            ),
            m("div.modal#account[tabindex='-1'][role='dialog']",
                m("div.modal-dialog.modal-dialog-centered[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header", [
                            m("h5.modal-title", "Update Status"),
                            m("button.close[type='button'][data-dismiss='modal'][aria-label='Close']",
                                m("span[aria-hidden='true']", '×')
                            )
                        ]),
                        m("div.modal-body",
                            m("p", "Modal body goes here.")
                        ),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary", "Save changes"),
                            m("button.btn.btn-secondary[data-dismiss='modal']", "Close")
                        ])
                    ])
                )
            ),
        ]);
    }
}
