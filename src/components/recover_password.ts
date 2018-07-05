import m, { Vnode } from "mithril";
import { AppSettings } from "configs";
import { Utils } from "../utils";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";

const RecoverPasswordData = {
  email: "",

  canSave: function() {
    return this.email !== "";
  },
  save: function() {
    const account = {
      user: {
        email: this.email,
      }
    };

    const vm = this;
    m.request(AppSettings.API_BASE_URL + "/api/session/recover", {
      method: "POST",
      data: account,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(function(res: any) {
      if (res.success) {
        sessionStorage.setItem("verify_email", vm.email);
        m.route.set("/confirm-mail/recover");
      } else {
        Utils.showSnackbar(res.message);
      }
    }).catch(function(err) {
      Utils.showSnackbar(err);
    });
  },
};

export default {
  view(vnode: Vnode) {
    return m(".sf-root", [
      m(".accountbg", {
        style: {
          "background": `url(${bg})`,
          "background-size": "cover"
        }
      }),
      m(".wrapper-page.account-page-full", [
        m(".card",
          m(".card-block",
            m(".account-box",
              m(".card-box.p-5", [
                m("h2.text-uppercase.text-center.pb-4",
                  m("a.text-success[href='/']", { oncreate: m.route.link },
                    m("span", m("img[alt=''][height='26']", { src: logo }))
                  )
                ),
                m(".text-center.m-b-20",
                  m("p.text-muted.m-b-0",
                    "Enter your email address and we'll send you an email with instructions to reset your password."
                  )
                ),
                m("form.form-horizontal", {
                  onsubmit: (e: Event) => {
                    e.preventDefault();
                    RecoverPasswordData.save();
                  }
                }, [
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("label[for='emailaddress']", "Email address"),
                      m("input.form-control[id='emailaddress'][placeholder='e.g. jose@rizal.com'][required][type='email']", {
                        oninput: m.withAttr("value", (v: string) => { RecoverPasswordData.email = v }),
                        value: RecoverPasswordData.email
                      })
                    ])
                  ),
                  m(".form-group.row.text-center.m-t-10",
                    m(".col-12",
                      m("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", {
                        disabled: !RecoverPasswordData.canSave()
                      }, "Reset Password")
                    )
                  )
                ]),
                m(".row.m-t-50",
                  m(".col-sm-12.text-center",
                    m("p.text-muted", [
                      "Back to ",
                      m("a.text-dark.m-l-5[href='/login']", { oncreate: m.route.link }, m("b", "Sign In"))
                    ])
                  )
                )
              ])
            )
          )
        ),
        m(".m-t-40.text-center",
          m("p.account-copyright", [
            "2018 © SmartFunding | ",
            m("a[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
          ])
        )
      ]),
      m("div#snackbar"),
    ]);
  }
} as m.Component;
