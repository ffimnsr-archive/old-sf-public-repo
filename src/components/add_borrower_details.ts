import m, { Vnode } from "mithril";
import $ from "jquery";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import { AppSettings } from "configs";
import avatar from "images/users/avatar-2.jpg";

const BorrowerDetailsData = {
  forename: "",
  surname: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",

  countries: [] as string[],

  load: function() {
    const token = localStorage.getItem("token")!;

    const vm = this;
    m.request(AppSettings.API_BASE_URL + "/api/country/list", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Token ${token}`,
      }
    }).then(function(res: any) {
      if (res.success) {
        vm.countries = res.countries;
      } else {
        // TODO: add feedback so user would know he's been denied
        m.route.set("/server-error");
      }
    }).catch(function(err) {
      console.error("error", err);
      m.route.set("/server-error");
    });
  },
  canSave: function() {
    return this.forename !== "" &&
      this.surname !== "" &&
      this.country !== "";
  },
  save: function() {
    const data = {
      user: {
        typeset: "borrower",
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
        localStorage.setItem("status", "step5");
        m.route.set("/");
      } else {
        // TODO: add feedback so user would know he's been denied
        console.error("error", res);
        m.route.set("/server-error");
      }
    }).catch(function(err) {
      console.error("error", err);
      m.route.set("/server-error");
    });
  }
};

export default {
  oninit(vnode: Vnode) {
    BorrowerDetailsData.load();
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
                    m("li.breadcrumb-item.active", "Borrower Details")
                  ])
                ),
                m("h4.page-title", "Borrower Details")
              ])
            )
          ),
          m(".row",
            m(".col-12",
              m(".card-box", [
                m("h4.header-title.m-t-0", "Borrower Details"),
                m("p.text-muted.font-14.m-b-10", "Stores borrower details."),
                m("form[role='form']", {
                  onsubmit: (e: Event) => {
                    e.preventDefault();
                    BorrowerDetailsData.save();
                  }
                }, [
                  m("div.form-group", [
                    m("label.col-form-label", "Company Name"),
                    m("input.form-control[type='text'][placeholder='Acme Inc.']")
                  ]),
                  m("div.form-group", [
                    m("label.col-form-label", "Company Registration No."),
                    m("input.form-control[type='text'][placeholder='SEC Registration No.']")
                  ]),
                  m("div.form-group", [
                    m("label.col-form-label", "Company Address 1"),
                    m("input.form-control[type='text'][placeholder='House/Lot No. and Street']")
                  ]),
                  m("div.form-group", [
                    m("label.col-form-label", "Company Address 2"),
                    m("input.form-control[type='text'][placeholder='Apartment/Studio/Floor No.']")
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
                  m("div.form-group", [
                    m("label.col-form-label", "Country"),
                    m("select.form-control", {
                      onchange: m.withAttr("value", (v: string) => { BorrowerDetailsData.country = v }),
                    }, BorrowerDetailsData.countries.map(function(v: any) {
                      return m("option", { value: v.code }, v.name)
                    })),
                  ]),
                  m(".clearfix.text-right.mt-3",
                    m("button.btn.btn-custom.waves-effect.waves-light[type='submit']", {
                      disabled: !BorrowerDetailsData.canSave()
                    }, "Submit")
                  )
                ]),
              ])
            )
          )
        ])
      ),
      m(footer),
      m("div#snackbar"),
    ]);
  }
} as m.Component;
