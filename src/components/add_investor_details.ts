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
        typeset: "",
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
    INSPECT_MAX_BYTES.load()
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
                    m("li.breadcrumb-item.active", "Personal Details")
                  ])
                ),
                m("h4.page-title", "Personal Details")
              ])
            )
          ),
          m(".row",
            m(".col-12",
              m(".card-box", [
                m("h4.header-title.m-t-0", "Personal Details"),
                m("p.text-muted.font-14.m-b-10", "Stores personal details."),
                m("form[role='form']",
                  m("div.form-row", [
                    m("div.form-group.col-md-6", [
                      m("label.col-form-label", "First Name"),
                      m("input.form-control[type='text'][placeholder='Jose']")
                    ]),
                    m("div.form-group.col-md-6", [
                      m("label.col-form-label", "Last Name"),
                      m("input.form-control[type='text'][placeholder='Rizal']")
                    ]),
                  ]),
                  m("div.form-group", [
                    m("label.col-form-label", "Address"),
                    m("input.form-control[type='text'][placeholder='Address']")
                  ]),
                  m("div.form-row", [
                    m("div.form-group.col-md-6", [
                      m("label.col-form-label", "City"),
                      m("input.form-control[type='text'][placeholder='City']")
                    ]),
                    m("div.form-group.col-md-4", [
                      m("label.col-form-label", "State"),
                      m("input.form-control[type='text'][placeholder='State']")
                    ]),
                    m("div.form-group.col-md-2", [
                      m("label.col-form-label", "Zip Code"),
                      m("input.form-control[type='text'][placeholder='Zip Code']")
                    ]),
                  ]),
                ),
                m(".clearfix.text-right.mt-3",
                  m("button.btn.btn-custom.waves-effect.waves-light[type='button']", "Submit")
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
