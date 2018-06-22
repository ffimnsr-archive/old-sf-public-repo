import m, { Vnode } from "mithril";
import { AppSettings } from "configs";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";

const RegisterAccountData = {
  username: "",
  email: "",
  password: "",

  canSave() {
    return RegisterAccountData.username !== "" &&
      RegisterAccountData.email !== "" &&
      RegisterAccountData.password !== "";
  },
  save() {
    const account = {
      user: {
        username: RegisterAccountData.username,
        email: RegisterAccountData.email,
        password: RegisterAccountData.password
      }
    };

    fetch(AppSettings.API_BASE_URL + "/api/session/register", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        sessionStorage.setItem("verify_email", RegisterAccountData.email);
        m.route.set("/confirm-mail/register");
      } else {
        console.error("error", res.message);
      }
    });
  },
};

export default {
  view(vnode: Vnode) {
    return m(".sf-root", [
      m(".accountbg", {
        style: {
          "background-image": `url(${bg})`,
          "background-size": "cover"
        }
      }),
      m(".wrapper-page.account-page-full", [
        m(".card",
          m(".card-block",
            m(".account-box",
              m(".card-box.p-5", [
                m("h2.text-uppercase.text-center.pb-4",
                  m("a.text-success[href='/#!/']",
                    m("span", m("img[alt='logo'][height='26']", { src: logo }))
                  )
                ),
                m("form.form-horizontal[method='post']", {
                  onsubmit: (e: Event) => {
                    e.preventDefault();
                    RegisterAccountData.save();
                  }
                }, [
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("label[for='username']", "Username"),
                      m("input.form-control[id='username'][placeholder='e.g. jrizal'][required][type='text']", {
                        oninput: m.withAttr("value", (v: string) => { RegisterAccountData.username = v }),
                        value: RegisterAccountData.username
                      })
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("label[for='email']", "Email address"),
                      m("input.form-control[id='email'][placeholder='e.g. jose@rizal.com'][required][type='email']", {
                        oninput: m.withAttr("value", (v: string) => { RegisterAccountData.email = v }),
                        value: RegisterAccountData.email
                      })
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("label[for='password']", "Password"),
                      m("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']", {
                        oninput: m.withAttr("value", (v: string) => { RegisterAccountData.password = v }),
                        value: RegisterAccountData.password
                      })
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12",
                      m(".checkbox.checkbox-custom", [
                        m("input[checked][id='remember'][type='checkbox']"),
                        m("label[for='remember']", [
                          "I accept ",
                          m("a.text-custom[href='/#!/terms-and-conditions']", "Terms and Conditions")
                        ])
                      ])
                    )
                  ),
                  m(".form-group.row.text-center.m-t-10",
                    m(".col-12",
                      m("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", {
                        disabled: !RegisterAccountData.canSave()
                      }, "Sign Up Free")
                    )
                  )
                ]),
                m(".row.m-t-50",
                  m(".col-sm-12.text-center",
                    m("p.text-muted", [
                      "Already have an account? ",
                      m("a.text-dark.m-l-5[href='/#!/login']", m("b", "Sign In"))
                    ])
                  )
                )
              ])
            )
          )
        ),
        m(".m-t-40.text-center",
          m("p.account-copyright", [
            "2018 © Smartfunding | ",
            m("a[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
          ])
        )
      ])
    ]);
  }
} as m.Component;
