import m from "mithril";

import "styles/app";
import "styles/icons";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";

export default {
  view(vnode) {
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
                    m("span",
                      m("img[alt=''][height='26']", { src: logo })
                    )
                  )
                ),
                m(".text-center", [
                  m(".mb-3",
                    m("img.rounded-circle.img-thumbnail.thumb-lg[alt='thumbnail'][src='assets/images/users/avatar-5.jpg']")
                  ),
                  m("p.text-muted.m-b-0.font-14", "Enter your password to access the admin.")
                ]),
                m("form.form-horizontal[action='javascript:;']", [
                  m(".form-group.row",
                    m(".col-12", [
                      m("label[for='password']", "Password"),
                      m("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']")
                    ])
                  ),
                  m(".form-group.row.text-center",
                    m(".col-12",
                      m("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", "Log In")
                    )
                  )
                ]),
                m(".row.m-t-50",
                  m(".col-sm-12.text-center",
                    m("p.text-muted", [
                      "Not you? return",
                      m("a.text-dark.ml-2[href='/#!/login']",
                        m("b", "Sign In")
                      )
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
