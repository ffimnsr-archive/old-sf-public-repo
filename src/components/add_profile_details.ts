import m, { Vnode } from "mithril";
import $ from "jquery";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import { AppSettings } from "configs";
import avatar from "images/users/avatar-2.jpg";

const ProfileDetailsData = {
  forename: "",
  surname: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",

  countries: [] as string[],

  load: function() {
    const vm = this;
    m.request(AppSettings.API_BASE_URL + "/api/country/list", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
      }
    }).then(function(res: any) {
      if (res.success) {
        vm.countries = res.countries;
      } else {
        // TODO: add feedback so user would know he's been denied
      }
    }).catch(function(err) {
      console.error("error", err);
    });
  },
  canSave: function() {
    return this.forename !== "" &&
      this.surname !== "" &&
      this.address1 !== "" &&
      this.address2 !== "" &&
      this.city !== "" &&
      this.state !== "" &&
      this.zipCode !== "";
  },
  save: function() {
    const data = {
      user: {
        forename: ProfileDetailsData.forename,
        surname: ProfileDetailsData.surname,
        address1: ProfileDetailsData.address1,
        address2: ProfileDetailsData.address2,
        city: ProfileDetailsData.city,
        state: ProfileDetailsData.state,
        zipCode: ProfileDetailsData.zipCode,
      }
    };

    const token = localStorage.getItem("token")!;

    m.request(AppSettings.API_BASE_URL + "/api/user/details", {
      method: "PUT",
      data: data,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Token ${token}`,
      }
    }).then(function(res: any) {
      if (res.success) {
        localStorage.setItem("status", "step2");
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
    ProfileDetailsData.load();
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
                m("form[role='form']", {
                  onsubmit: (e: Event) => {
                    e.preventDefault();
                    ProfileDetailsData.save();
                  }
                }, [
                  m("div.form-row", [
                    m("div.form-group.col-md-6", [
                      m("label.col-form-label", "First Name"),
                      m("input.form-control[type='text'][placeholder='Jose']", {
                        oninput: m.withAttr("value", (v: string) => { ProfileDetailsData.forename = v }),
                        value: ProfileDetailsData.forename
                      })
                    ]),
                    m("div.form-group.col-md-6", [
                      m("label.col-form-label", "Last Name"),
                      m("input.form-control[type='text'][placeholder='Rizal']", {
                        oninput: m.withAttr("value", (v: string) => { ProfileDetailsData.surname = v }),
                        value: ProfileDetailsData.surname
                      })
                    ]),
                  ]),
                  m("div.form-group", [
                    m("label.col-form-label", "Address 1"),
                    m("input.form-control[type='text'][placeholder='House/Lot No. and Street']", {
                      oninput: m.withAttr("value", (v: string) => { ProfileDetailsData.address1 = v }),
                      value: ProfileDetailsData.address1
                    })
                  ]),
                  m("div.form-group", [
                    m("label.col-form-label", "Address 2"),
                    m("input.form-control[type='text'][placeholder='Apartment/Studio/Floor No.']", {
                      oninput: m.withAttr("value", (v: string) => { ProfileDetailsData.address2 = v }),
                      value: ProfileDetailsData.address2
                    })
                  ]),
                  m("div.form-row", [
                    m("div.form-group.col-md-6", [
                      m("label.col-form-label", "City"),
                      m("input.form-control[type='text'][placeholder='City']", {
                        oninput: m.withAttr("value", (v: string) => { ProfileDetailsData.city = v }),
                        value: ProfileDetailsData.city
                      })
                    ]),
                    m("div.form-group.col-md-4", [
                      m("label.col-form-label", "State"),
                      m("input.form-control[type='text'][placeholder='State']", {
                        oninput: m.withAttr("value", (v: string) => { ProfileDetailsData.state = v }),
                        value: ProfileDetailsData.state
                      })
                    ]),
                    m("div.form-group.col-md-2", [
                      m("label.col-form-label", "Zip Code"),
                      m("input.form-control[type='text'][placeholder='Zip Code']", {
                        oninput: m.withAttr("value", (v: string) => { ProfileDetailsData.zipCode = v }),
                        value: ProfileDetailsData.zipCode
                      })
                    ]),
                  ]),
                  m("div.form-group", [
                    m("label.col-form-label", "Country"),
                    m("select.form-control", ProfileDetailsData.countries.map(function(v: any) {
                      return m("option", { value: v.code }, v.name)
                    })),
                  ]),
                  m(".clearfix.text-right.mt-3",
                    m("button.btn.btn-custom.waves-effect.waves-light[type='submit']", {
                      disabled: !ProfileDetailsData.canSave()
                    }, "Submit")
                  )
                ]),
              ])
            )
          )
        ])
      ),
      m(footer)
    ]);
  }
} as m.Component;
