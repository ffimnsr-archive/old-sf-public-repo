import m, { Vnode } from "mithril";

import header from "widgets/header";
import footer from "widgets/footer";

import bg from "images/bg-1.jpg";
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
                      m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                    ),
                    m("li.breadcrumb-item.active", "Pending Verification")
                  ])
                ),
                m("h4.page-title", "Pending Verification")
              ])
            )
          ),
          m(".row",
            m(".col-sm-6.offset-3",
              m(".text-center.mt-5", [
                m("h1.text-error", "Account Pending"),
                m("h4.text-uppercase.text-danger.mt-3", "Pending Verification"),
                m("p.text-muted.mt-3",
                  "We will be sending you an email notification, once your account has been validated. Kindly, comeback again once its done."
                ),
                m("a.btn.btn-md.btn-custom.waves-effect.waves-light.mt-3[href='/']", { oncreate: m.route.link }, "Return Home")
              ])
            )
          )
        ])
      ),
      m(footer)
    ]);
  }
} as m.Component;
