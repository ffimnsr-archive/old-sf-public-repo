import m, { Vnode } from "mithril";
import jwtDecode from "jwt-decode";

import header from "widgets/header";
import footer from "widgets/footer";

import { AppSettings } from "configs";
import avatar from "images/users/avatar-1.jpg";

const ProfileData = {
  fullname: "",
  username: "",
  email: "",
  role: "",

  load: function() {
    const token = localStorage.getItem("token")!;
    const vm = this;
    m.request(AppSettings.API_BASE_URL + "/api/user/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Token ${token}`,
      }
    }).then(function(res: any) {
      if (res.success) {
        console.log(res.user);
        vm.fullname = res.user.fullname;
        vm.username = res.user.username;
        vm.email = res.user.email;
        vm.role = res.user.role;
      } else {
        // TODO: add feedback so user would know he's been denied
        console.error("error", res);
        m.route.set("/server-error");
      }
    }).catch(function(err) {
      console.error("error", err);
      m.route.set("/server-error");
    });
  },
};

export default {
  oninit(vnode: Vnode) {
    ProfileData.load();
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
                      m("h4.mt-1.mb-1.font-18", ProfileData.fullname),
                      m("p.font-13.text-light", ProfileData.username),
                      m("p.text-light.mb-0", "undefined")
                    ])
                  ]),
                  m(".col-sm-6",
                    m(".text-right",
                      m("a.btn.btn-light.waves-effect[type='button'][href='/profile/edit']", { oncreate: m.route.link }, [
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
                  m(".text-left", [
                    m("p.text-muted.font-13", [
                      m("strong", "Full Name : "),
                      m("span.m-l-15", ProfileData.fullname),
                    ]),
                    m("p.text-muted.font-13", [
                      m("strong", "Email : "),
                      m("span.m-l-15", ProfileData.email),
                    ]),
                    m("p.text-muted.font-13", [
                      m("strong", "Location : "),
                      m("span.m-l-15", "undefined"),
                    ]),
                    m("p.text-muted.font-13", [
                      m("strong", "Role : "),
                      m("span.m-l-15", ProfileData.role),
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
                    m("h2.m-b-20", [
                      "$",
                      m("span[data-plugin='counterup']", "0")
                    ]),
                    m("span.text-muted", " From previous period")
                  ])
                ),
                m(".col-sm-4",
                  m(".card-box.tilebox-one", [
                    m("i.icon-paypal.float-right.text-muted"),
                    m("h6.text-muted.text-uppercase.mt-0", "Paypal / Bank Balance"),
                    m("h2.m-b-20", [
                      "$",
                      m("span[data-plugin='counterup']", "0")
                    ]),
                    m("span.text-muted", " From previous period")
                  ])
                ),
                m(".col-sm-4",
                  m(".card-box.tilebox-one", [
                    m("i.icon-rocket.float-right.text-muted"),
                    m("h6.text-muted.text-uppercase.mt-0", "Loan / Invest"),
                    m("h2.m-b-20[data-plugin='counterup']", "0"),
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
