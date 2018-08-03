import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import jwtDecode from "jwt-decode";

import header from "widgets/header";
import footer from "widgets/footer";

import avatar from "images/users/avatar-2.jpg";

const HomeData = {
  image: "",

  load: function() {
    const token = localStorage.getItem("token")!;
    const data = jwtDecode<any>(token);

    const vm = this;
    QRCode.toDataURL(data.id, {
      errorCorrectionLevel: "H",
      version: 12,
    }, function(err, url) {
      vm.image = url;
      m.redraw();
    });
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
                m("h4.header-title.mb-3", "Wallet Logs"),
                m("table.table.table-bordered[id='datatable']", [
                  m("thead",
                    m("tr", [
                      m("th", "Date"),
                      m("th", "Balance"),
                      m("th", "From / To"),
                      m("th", "Note"),
                      m("th", "Status"),
                    ])
                  ),
                ]),
              ])
            ),
            m(".col-lg-4",
              m(".card-box", [
                m("h4.m-t-0.header-title", "Fund Your Account"),
                m("a.btn.btn-block.btn-info[href='/']", "Ethereum"),
                m("a.btn.btn-block.btn-info[href='/']", "Bitcoin"),
                m("a.btn.btn-block.btn-info[href='/']", "Paypal"),
              ])
            )
          ]),
          m(".row", [
            m(".col-lg-8",
              m(".card-box", [
                m("h4.header-title.mb-3", "Investment Options"),
                m("table.table.table-bordered[id='datatable']", [
                  m("thead",
                    m("tr", [
                      m("th", "Invoice"),
                      m("th", "Terms"),
                      m("th", "Amount"),
                      m("th", "Appreciation"),
                      m("th", "Funded"),
                      m("th", "Available"),
                      m("th", "Time Left"),
                      m("th", "Actions"),
                    ])
                  ),
                ])
              ])
            ),
            m(".col-lg-4",
              ""
            )
          ])
        )
      ),
      m(footer)
    ]);
  }
} as m.Component;
