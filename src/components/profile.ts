import m, { Vnode } from "mithril";
import jwtDecode from "jwt-decode";

import header from "widgets/header";
import footer from "widgets/footer";

import avatar from "images/users/avatar-1.jpg";

const ProfileData = {
  getEmail() {
    let email = localStorage.getItem("email")!;
    return email;
  },
  getUsername(): string {
    let token = localStorage.getItem("token")!;
    let data = jwtDecode<any>(token);
    return data.username;
  }
};

export default {
  oninit: {

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
                    m("li.breadcrumb-item", m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")),
                    m("li.breadcrumb-item.active", "Profile")
                  ])
                ),
                m("h4.page-title", "Profile")
              ])
            )
          ),
          m(".row",
            m(".col-sm-12",
              m(".profile-user-box.card-box.bg-custom",
                m(".row", [
                  m(".col-sm-6", [
                    m("span.pull-left.mr-3",
                      m("img.thumb-lg.rounded-circle[alt='']", { src: avatar })
                    ),
                    m(".media-body.text-white", [
                      m("h4.mt-1.mb-1.font-18", "Anonymous User"),
                      m("p.font-13.text-light", ProfileData.getUsername()),
                      m("p.text-light.mb-0", "California, United States")
                    ])
                  ]),
                  m(".col-sm-6",
                    m(".text-right",
                      m("button.btn.btn-light.waves-effect[type='button']", [
                        m("i.mdi.mdi-account-settings-variant.mr-1"),
                        "Edit Profile"
                      ])
                    )
                  )
                ])
              )
            )
          ),
          m(".row", [
            m(".col-md-4", [
              m(".card-box", [
                m("h4.header-title.mt-0.m-b-20", "Personal Information"),
                m(".panel-body", [
                  m("p.text-muted.font-13", "Bio"),
                  m("hr"),
                  m(".text-left", [
                    m("p.text-muted.font-13", [
                      m("strong", "Full Name : "),
                      m("span.m-l-15", "Anonymous User")
                    ]),
                    m("p.text-muted.font-13", [
                      m("strong", "Email : "),
                      m("span.m-l-15", ProfileData.getEmail())
                    ]),
                    m("p.text-muted.font-13", [
                      m("strong", "Location : "),
                      m("span.m-l-15", "Earth")
                    ])
                  ]),
                ])
              ])
            ]),
            m(".col-md-8", [
              m(".row", [
                m(".col-sm-4",
                  m(".card-box.tilebox-one", [
                    m("i.icon-layers.float-right.text-muted"),
                    m("h6.text-muted.text-uppercase.mt-0", "Wallet Balance"),
                    m("h2.m-b-20[data-plugin='counterup']", "1,587"),
                    m("span.badge.badge-custom", "+11%"),
                    m("span.text-muted", " From previous period")
                  ])
                ),
                m(".col-sm-4",
                  m(".card-box.tilebox-one", [
                    m("i.icon-paypal.float-right.text-muted"),
                    m("h6.text-muted.text-uppercase.mt-0", "Paypal / Bank Balance"),
                    m("h2.m-b-20", [
                      "$",
                      m("span[data-plugin='counterup']", "46,782")
                    ]),
                    m("span.badge.badge-danger", "-29%"),
                    m("span.text-muted", " From previous period")
                  ])
                ),
                m(".col-sm-4",
                  m(".card-box.tilebox-one", [
                    m("i.icon-rocket.float-right.text-muted"),
                    m("h6.text-muted.text-uppercase.mt-0", "Loan / Invest"),
                    m("h2.m-b-20[data-plugin='counterup']", "1,890"),
                    m("span.badge.badge-custom", "+89%"),
                    m("span.text-muted", " Last year")
                  ])
                )
              ])
            ])
          ])
        ])
      ),
      m(footer)
    ]);
  }
} as m.Component;
