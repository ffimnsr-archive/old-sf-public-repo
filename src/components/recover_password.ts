import m from "mithril";

import "styles/app";
import "styles/icons";

import bg from "images/bg-2.jpg";

export default {
  view(vnode) {
    return m("sf-root", [
      m(".wrapper-page.account-page-full",
      [
        m(".card",
          m(".card-block",
            m(".account-box",
              m(".card-box.p-5",
                [
                  m("h2.text-uppercase.text-center.pb-4",
                    m("a.text-success[href='index.html']",
                      m("span",
                        m("img[alt=''][height='26'][src='assets/images/logo.png']")
                      )
                    )
                  ),
                  m(".text-center.m-b-20",
                    m("p.text-muted.m-b-0",
                      "Enter your email address and we'll send you an email with instructions to reset your password."
                    )
                  ),
                  m("form.form-horizontal[action='#']",
                    [
                      m(".form-group.row.m-b-20",
                        m(".col-12",
                          [
                            m("label[for='emailaddress']",
                              "Email address"
                            ),
                            m("input.form-control[id='emailaddress'][placeholder='john@deo.com'][required=''][type='email']")
                          ]
                        )
                      ),
                      m(".form-group.row.text-center.m-t-10",
                        m(".col-12",
                          m("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']",
                            "Reset Password"
                          )
                        )
                      )
                    ]
                  ),
                  m(".row.m-t-50",
                    m(".col-sm-12.text-center",
                      m("p.text-muted",
                        [
                          "Back to",
                          m("a.text-dark.m-l-5[href='page-login.html']",
                            m("b",
                              "Sign In"
                            )
                          )
                        ]
                      )
                    )
                  )
                ]
              )
            )
          )
        ),
        m(".m-t-40.text-center", m("p.account-copyright", "2018 © SmartFunding"))
      ]
    )
    ]);
  }
} as m.Component;
