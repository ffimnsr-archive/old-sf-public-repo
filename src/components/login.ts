import m, { Vnode } from "mithril";
import { AppSettings } from "configs";

import "styles/app";
import "styles/icons";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";

const LoginAccountData = {
  email: "",
  password: "",

  canSave() {
    return LoginAccountData.email !== "" &&
      LoginAccountData.password !== "";
  },
  save() {
    const account = {
      user: {
        email: LoginAccountData.email,
        password: LoginAccountData.password
      }
    };

    fetch(AppSettings.API_BASE_URL + "/api/session/login", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.success && res.user.token) {
        localStorage.setItem("email", res.user.email);
        localStorage.setItem("token", res.user.token);
        m.route.set("/");
      } else {
        console.error("error", res.message);
      }
    });
  }
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
                  m("a.text-success[href='/#!/']",
                    m("span", m("img[alt=''][height='26']", { src: logo }))
                  )
                ),
                m("form[method='post']", {
                  onsubmit: (e: Event) => {
                    e.preventDefault();
                    LoginAccountData.save();
                  }
                }, [
                  m(".form-group.m-b-20.row",
                    m(".col-12", [
                      m("label[for='emailaddress']", "Email address"),
                      m("input.form-control[id='emailaddress'][placeholder='Enter your email'][required=''][type='email']", {
                        oninput: m.withAttr("value", (v: string) => { LoginAccountData.email = v }),
                        value: LoginAccountData.email
                      })
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("a.text-muted.pull-right[href='/#!/recover-password']",
                        m("small", "Forgot your password?")
                      ),
                      m("label[for='password']", "Password"),
                      m("input.form-control[id='password'][placeholder='Enter your password'][required=''][type='password']", {
                        oninput: m.withAttr("value", (v: string) => { LoginAccountData.password = v }),
                        value: LoginAccountData.password
                      })
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12",
                      m(".checkbox.checkbox-custom", [
                        m("input[checked=''][id='remember'][type='checkbox']"),
                        m("label[for='remember']", "Remember me")
                      ])
                    )
                  ),
                  m(".form-group.row.text-center.m-t-10",
                    m(".col-12",
                      m("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", {
                        disabled: !LoginAccountData.canSave()
                      }, "Sign In")
                    )
                  )
                ]),
                m(".row.m-t-50",
                  m(".col-sm-12.text-center",
                    m("p.text-muted", [
                      "Don't have an account? ",
                      m("a.text-dark.m-l-5[href='/#!/register']", m("b", "Sign Up"))
                    ])
                  )
                )
              ])
            )
          )
        ),
        m(".m-t-40.text-center", m("p.account-copyright", "2018 © SmartFunding"))
      ])
    ]);
  }
} as m.Component;
