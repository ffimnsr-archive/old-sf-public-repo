import m, { Vnode } from "mithril";

import header from "widgets/header";
import footer from "widgets/footer";

import "styles/app";
import "styles/icons";

import logo from "images/sf-logo.png";

export default {
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
                      m("a[href='/#!/']", "SmartFunding")
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
                m("h3.m-b-10", "25563"),
                m("p.text-uppercase.m-b-5.font-13.font-600", "Total Investors")
              ])
            ),
            m(".col-sm-6.col-lg-6.col-xl-3",
              m(".card-box.bg-primary.widget-flat.border-primary.text-white", [
                m("i.fi-archive"),
                m("h3.m-b-10", "6952"),
                m("p.text-uppercase.m-b-5.font-13.font-600", "Pending Investors")
              ])
            ),
            m(".col-sm-6.col-lg-6.col-xl-3",
              m(".card-box.widget-flat.border-success.bg-success.text-white", [
                m("i.fi-help"),
                m("h3.m-b-10", "18361"),
                m("p.text-uppercase.m-b-5.font-13.font-600", "Total Borrowers")
              ])
            ),
            m(".col-sm-6.col-lg-6.col-xl-3",
              m(".card-box.bg-danger.widget-flat.border-danger.text-white", [
                m("i.fi-delete"),
                m("h3.m-b-10", "250"),
                m("p.text-uppercase.m-b-5.font-13.font-600", "Pending Borrowers")
              ])
            )
          ]),

          m(".row",
            m(".col-12",
              m(".card-box.table-responsive", [
                m("h4.m-t-0.header-title", "Default Example"),
                m("p.text-muted.font-14.m-b-30", [
                  "DataTables has most features enabled by default, so all you need to do to use it with your own tables is to call the construction function:",
                  m("code", "$().DataTable();"),
                  "."
                ]),
                m("table.table.table-bordered[id='datatable']", [
                  m("thead",
                    m("tr", [
                      m("th", "Name"),
                      m("th", "Position"),
                      m("th", "Office"),
                      m("th", "Age"),
                      m("th", "Start date"),
                      m("th", "Salary")
                    ])
                  ),
                  m("tbody", [
                    m("tr", [
                      m("td", "Tiger Nixon"),
                      m("td", "System Architect"),
                      m("td", "Edinburgh"),
                      m("td", "61"),
                      m("td", "2011/04/25"),
                      m("td", "$320,800")
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
