import m, { Vnode } from "mithril";

import header from "widgets/header";
import footer from "widgets/footer";

import logo from "images/sf-logo.png";

import { AppSettings } from "configs";

import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";

const AdminDashboardData = {
  count: 0,
  pendingInvestorsCount: 0,
  pendingBorrowersCount: 0,
  discardedCount: 0,

  load: function() {

  },
};

export default {
  oninit(vnode: Vnode) {
    AdminDashboardData.load();
  },
  oncreate(vnode: Vnode) {
    $(document).ready(function() {
      $("#datatable").DataTable({
        ajax: {
          url: AppSettings.API_BASE_URL + "/api/user/list",
          type: "GET",
          dataSrc: function(json: any) {
            AdminDashboardData.count = json.count;
            AdminDashboardData.pendingInvestorsCount = json.pendingInvestorsCount;
            AdminDashboardData.pendingBorrowersCount = json.pendingBorrowersCount;
            AdminDashboardData.discardedCount = json.discardedCount;
            m.redraw();
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
          { data: "_id" },
        ]
      });
    });
  },
  view(vnode: Vnode) {
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
                m("h3.m-b-10", AdminDashboardData.count),
                m("p.text-uppercase.m-b-5.font-13.font-600", "Total Registered Users")
              ])
            ),
            m(".col-sm-6.col-lg-6.col-xl-3",
              m(".card-box.bg-primary.widget-flat.border-primary.text-white", [
                m("i.fi-archive"),
                m("h3.m-b-10", AdminDashboardData.pendingInvestorsCount),
                m("p.text-uppercase.m-b-5.font-13.font-600", "Pending Investors")
              ])
            ),
            m(".col-sm-6.col-lg-6.col-xl-3",
              m(".card-box.widget-flat.border-success.bg-success.text-white", [
                m("i.fi-help"),
                m("h3.m-b-10", AdminDashboardData.pendingBorrowersCount),
                m("p.text-uppercase.m-b-5.font-13.font-600", "Pending Borrowers")
              ])
            ),
            m(".col-sm-6.col-lg-6.col-xl-3",
              m(".card-box.bg-danger.widget-flat.border-danger.text-white", [
                m("i.fi-delete"),
                m("h3.m-b-10", AdminDashboardData.discardedCount),
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
      m(footer)
    ]);
  }
}
