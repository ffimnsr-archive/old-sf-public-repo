import m, { Vnode } from "mithril";
import $ from "jquery";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import { AppSettings } from "configs";
import avatar from "images/users/avatar-2.jpg";

const InvestorDetailsData = {
  load: function() {

  },
  canSave: function() {

  },
  save: function() {
    const data = {
      user: {
        typeset: "investor",
      }
    };

    const token = localStorage.getItem("token")!;

    m.request(AppSettings.API_BASE_URL + "/api/user/type", {
      method: "PUT",
      data: data,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Token ${token}`,
      }
    }).then(function(res: any) {
      if (res.success) {
        localStorage.setItem("status", "okay");
        m.route.set("/");
      } else {
        // TODO: add feedback so user would know he's been denied
        console.error("error", res);
      }
    }).catch(function(err) {
      console.error("error", err);
    });
  }
};

export default {
  oninit(vnode: Vnode) {
    InvestorDetailsData.load();
  },
  oncreate(vnode: Vnode) {

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
                    m("li.breadcrumb-item.active", "Investor Details")
                  ])
                ),
                m("h4.page-title", "Investor Details")
              ])
            )
          ),
          m(".row",
            m(".col-12",
              m(".card-box", [
                m("h4.header-title.m-t-0", "Investor Details"),
                m("p.text-muted.font-14.m-b-10", "All fields are required to be answered."),

                m(".clearfix.text-right.mt-3",
                  m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                    onclick: InvestorDetailsData.save,
                  }, "Submit")
                )
              ])
            )
          )
        ])
      ),
      m(footer)
    ]);
  }
} as m.Component;
