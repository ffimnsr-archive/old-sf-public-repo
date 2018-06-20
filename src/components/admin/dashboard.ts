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
        m(".container-fluid",

          m(".row",
            m(".col-sm-12",
              m(".page-title-box", [
                m(".btn-group.pull-right",
                  m("ol.breadcrumb.hide-phone.p-0.m-0", [
                    m("li.breadcrumb-item",
                      m("a[href='/#!/']", "SmartFunding")
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
                        m("th", "Profile"),
                        m("th", "Name"),
                        m("th", "Currency"),
                        m("th", "Balance"),
                        m("th", "Reserved in orders"),
                        m("th", "Action")
                      ])
                    ),
                    m("tbody", [
                      m("tr", [
                        m("td",
                          m("img.rounded-circle.thumb-sm[alt='contact-img'][src='assets/images/users/avatar-2.jpg'][title='contact-img']")
                        ),
                        m("td", [
                          m("h5.m-0.font-weight-normal", "Tomaslau"),
                          m("p.mb-0.text-muted",
                            m("small", "Member Since 2017")
                          )
                        ]),
                        m("td", [
                          m("i.mdi.mdi-currency-btc.text-primary"),
                          "BTC"
                        ]),
                        m("td", "0.00816117 BTC"),
                        m("td", "0.00097036 BTC"),
                        m("td", [
                          m("a.btn.btn-sm.btn-custom[href='#']",
                            m("i.mdi.mdi-plus")
                          ),
                          m("a.btn.btn-sm.btn-danger[href='#']",
                            m("i.mdi.mdi-minus")
                          )
                        ])
                      ]),
                    ])
                  ])
                )
              ])
            ),
            m(".col-lg-4",
              m(".card-box", [
                m("h4.m-t-0.header-title", "Total Wallet Balance"),
                m("[id='donut-chart']",
                  m(".flot-chart.mt-5[id='donut-chart-container']", { style: { "height": "340px" } },
                  )
                )
              ])
            )
          ])
        )
      ),
      m(footer)
    ]);
  }
}