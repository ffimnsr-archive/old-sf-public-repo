import m, { Vnode } from "mithril";

import header from "widgets/header";
import footer from "widgets/footer";

import avatar from "images/users/avatar-2.jpg";

const HomeData = {
  load: function() {

  }
};

export default {
  oninit() {
    HomeData.load();
  },
  view(vnode: Vnode) {
    return m(".sf-root", [
      m(header),
      m(".wrapper",
        m(".container-fluid",

          m(".row",
            m(".col-sm-12",
              m(".page-title-box", [
                m(".btn-group.pull-right",
                  m("ol.breadcrumb.hide-phone.p-0.m-0", [
                    m("li.breadcrumb-item",
                      m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                    ),
                    m("li.breadcrumb-item.active", "Dashboard")
                  ])
                ),
                m("h4.page-title", "Dashboard")
              ])
            )
          ),

          m(".row", [
            m(".col-lg-8",
              m(".card-box", [
                m("h4.header-title.mb-3", "Wallet Balances"),
                m(".table-responsive",
                  m("table.table.table-hover.table-centered.m-0", [
                    m("thead",
                      m("tr", [
                        m("th", "Currency"),
                        m("th", "Balance"),
                        m("th", "Reserved in orders"),
                        m("th", "Action")
                      ])
                    ),
                    m("tbody", [

                    ])
                  ])
                )
              ])
            ),
            m(".col-lg-4",
              m(".card-box", [
                m("h4.m-t-0.header-title", "Total Wallet Balance"),
                m("[id='donut-chart']",
                  m(".flot-chart.mt-5[id='donut-chart-container']", { style: { "height": "340px" } })
                )
              ])
            )
          ])
        )
      ),
      m(footer)
    ]);
  }
} as m.Component;
