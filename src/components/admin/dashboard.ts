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
import avatar from "images/investor.png";


const Store = {
    count: 0,
    pendingInvestorsCount: 0,
    pendingBorrowersCount: 0,
    discardedCount: 0,

    load() {

    },
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
                    data: [
                        1,
                        2,
                        3,
                        5,
                        8,
                        12
                    ],
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

        new Chartist.Bar('#cryptocurrency-usage', {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
            series: [
                [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
            ]
        }, {
                high: 10,
                low: -10,
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                },
            }
        );

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

                    new Chartist.Pie('#user-distribution-profile', {
                        labels: ['', '', ''],
                        series: [30, 15, 5, 40]
                    }, {
                            labelInterpolationFnc: function(value) {
                                return value[0]
                            }
                        }
                    );


                    m.redraw();

                    json.users.map((v: any) => {
                        v._id = v._id.toUpperCase();
                        v.uid = v._id.slice(-6);
                        v.username = `
<a href="/#!/admin/view-m-account/${v._id}">
<img src="${avatar}" width="32" alt="contact-img" class="rounded-circle">
<span class="ml-2">${v.username}</span>
</a>`;
                        v.status = statusConvert(v.status);
                        v.typeset = v.typeset.charAt(0).toUpperCase() + v.typeset.slice(1);
                        v.button = `
<div class="btn-group dropdown">
<a href="javascript:;" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
<div class="dropdown-menu dropdown-menu-right">
<a href="/#!/admin/view-m-account/${v._id}" class="dropdown-item"><i class="fa fa-eye mr-2 font-18 vertical-middle"></i>Account</a>
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
                { data: "username" },
                { data: "email" },
                { data: "typeset", width: "9%" },
                { data: "status", width: "6%" },
                { data: "button", width: "5%" },
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

                    m(".row", [
                        m(".col-lg-6",
                            m(".card-box", [
                                m("h4.header-title", "User Distribution Profile"),
                                m("div.ct-chart.ct-golden-section#user-distribution-profile"),
                            ])
                        ),
                        m(".col-lg-6",
                            m(".card-box", [
                                m("h4.header-title", "Cryptocurrency Usage"),
                                m("div.ct-chart.ct-golden-section#cryptocurrency-usage"),
                            ])
                        )
                    ]),

                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.m-t-0.header-title", "Members List"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of all users in system."
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Type"),
                                            m("th", "Status"),
                                            m("th", "Action"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Username"),
                                            m("th", "Email"),
                                            m("th", "Type"),
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
