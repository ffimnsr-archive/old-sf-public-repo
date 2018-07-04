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
                m("h4.header-title.mb-3", "Wallet Balances"),
                // m(".table-responsive",
                //   m("table.table.table-hover.table-centered.m-0", [
                //     m("thead",
                //       m("tr", [
                //         m("th", "Currency"),
                //         m("th", "Balance"),
                //         m("th", "Reserved in orders"),
                //         m("th", "Action")
                //       ])
                //     ),
                //     m("tbody", [

                //     ])
                //   ])
                // )
              ])
            ),
            m(".col-lg-4",
              m(".card-box", [
                m("h4.m-t-0.header-title", "Wallet Address"),
                m("img.mx-auto.d-block[alt='wallet-address']", {
                  src: HomeData.image,
                })
              ])
            )
          ])
        )
      ),
      m(footer)
    ]);
  }
} as m.Component;
