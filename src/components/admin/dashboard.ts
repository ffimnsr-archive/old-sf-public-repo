import { AppSettings } from "configs";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import Chartist from "chartist";
import "chartist/dist/chartist.css";


import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import updateAccountInfo from "widgets/modal_admin_update_account_info";
import updateStatus from "widgets/modal_admin_update_status";


const Store = {
    count: 0,
    pendingInvestorsCount: 0,
    pendingBorrowersCount: 0,
    discardedCount: 0,

    load() {

    },
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        let options: Chartist.ILineChartOptions = {
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }
        };

        new Chartist.Line('#user-overview', {
            labels: ['1', '2', '3', '4', '5', '6'],
            series: [
                {
                    data: [1, 2, 3, 5, 8, 12],
                }
            ]
        }, options);

        new Chartist.Line('#wallet-transaction', {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: [
                [2, 1, 3.5, 7, 3],
                [1, 3, 4, 5, 6],
            ]
        }, options);

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
                        v._id = v._id.toUpperCase();
                        v.uid = v._id.slice(-6);
                        v.typeset = v.typeset.charAt(0).toUpperCase() + v.typeset.slice(1);
                        v.button = `
              <a href="/#!/admin/view-m-account/${v._id}" class="btn btn-sm btn-custom"><i class="fa fa-eye"></i></a>
              <a href="/#!/admin/view-m-status/${v._id}" class="btn btn-sm btn-custom"><i class="fa fa-edit"></i></a>
              <a href="/#!/admin/view-m-logs/${v._id}" class="btn btn-sm btn-custom"><i class="fa fa-file-text"></i></a>
              <a href="/#!/admin/view-m-wallet/${v._id}" class="btn btn-sm btn-custom"><i class="fa fa-money"></i></a>`;
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
                { data: "username" },
                { data: "email" },
                { data: "typeset" },
                { data: "button", width: "20%" },
            ]
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
                                m("p.text-uppercase.m-b-5.font-13.font-600", "Unprocessed Applicants")
                            ])
                        )
                    ]),

                    m(".row", [
                        m(".col-lg-6",
                            m(".card-box", [
                                m("h4.header-title", "User Registration Overview"),
                                m("div.ct-chart.ct-major-eleventh#user-overview"),

                            ])
                        ),
                        m(".col-lg-6",
                            m(".card-box", [
                                m("h4.header-title", "SmartFunding Wallet Transaction (Cash In)"),
                                m("div.ct-chart.ct-major-eleventh#wallet-transaction"),
                            ])
                        )
                    ]),

                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Members List"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of all users in system."
                                ]),
                                m("table.table.table-bordered[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Type"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Identifier"),
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Type"),
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
