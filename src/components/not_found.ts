import m, { Vnode } from "mithril";

import bg from "images/bg-1.jpg";
import logo from "images/sf-logo.png";

export default {
  view(_vnode: Vnode) {
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
                m(".text-center", [
                  m("h1.text-error", "404"),
                  m("h4.text-uppercase.text-danger.mt-3", "Page Not Found"),
                  m("p.text-muted.mt-3", "It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. Here's a little tip that might help you get back on track."),
                  m("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/']", { oncreate: m.route.link }, "Return Home")
                ])
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
      ])
    ]);
  }
} as m.Component;
