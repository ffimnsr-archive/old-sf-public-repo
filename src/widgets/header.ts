import m, { Vnode } from "mithril";
import jwtDecode from "jwt-decode";

import logo from "images/sf-logo.png";
import avatar from "images/users/avatar-1.jpg";

const HeaderData = {
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

function ProfileBarComponent(vnode: Vnode) {
  return {
    view: function() {
      return m(".dropdown-menu.dropdown-menu-right.profile-dropdown.", [
        m(".dropdown-item.noti-title",
          m("h6.text-overflow.m-0", `Welcome ${HeaderData.getUsername()}!`)
        ),
        m("a.dropdown-item.notify-item[href='/profile']", { oncreate: m.route.link }, [
          m("i.fi-head"),
          m("span", "My Account")
        ]),
        m("a.dropdown-item.notify-item[href='/settings']", { oncreate: m.route.link }, [
          m("i.fi-cog"),
          m("span", "Settings")
        ]),
        m("a.dropdown-item.notify-item[href='/frequently-ask']", { oncreate: m.route.link }, [
          m("i.fi-help"),
          m("span", "Support")
        ]),
        m("a.dropdown-item.notify-item[href='/lock-screen']", { oncreate: m.route.link }, [
          m("i.fi-lock"),
          m("span", "Lock Screen")
        ]),
        m("a.dropdown-item.notify-item[href='/logout']", { oncreate: m.route.link }, [
          m("i.fi-power"),
          m("span", "Logout")
        ])
      ]);
    }
  };
}

export default {
  oninit(vnode: Vnode) {
    $('.navbar-toggle')
      .on('click', function (e: Event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

    $('.navigation-menu>li').slice(-2).addClass('last-elements');

    $('.navigation-menu li.has-submenu a[href="javascript:;"]')
      .on('click', function (e: Event) {
      if ($(window).width()! < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open')
          .find('.submenu:first').toggleClass('open');
      }
    });
  },
  view(vnode: Vnode) {
    return m("header[id='topnav']", [
      m(".topbar-main",
        m(".container-fluid", [
            m(".logo",
              m("a.logo[href='/']", { oncreate: m.route.link }, [
                m("img.logo-small[alt=''][height='26'][src='assets/images/logo_sm.png']"),
                m("img.logo-large[alt=''][height='22']", { src: logo })
              ])
            ),
            m(".menu-extras.topbar-custom",
              m("ul.list-unstyled.topbar-right-menu.float-right.mb-0", [
                m("li.menu-item",
                  m("a.navbar-toggle.nav-link",
                    m(".lines", [ m("span"), m("span"), m("span") ])
                  )
                ),
                m("li.dropdown.notification-list", [
                  m("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='javascript:;'][role='button']", [
                    m("i.fi-bell.noti-icon"),
                  ]),
                  m(".dropdown-menu.dropdown-menu-right.dropdown-lg", [
                    m(".dropdown-item.noti-title",
                      m("h6.m-0", [
                        m("span.float-right",
                          m("a.text-dark[href='']",
                            m("small", "Clear All")
                          )
                        ),
                        "Notification"
                      ])
                    ),
                    m("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:;']", [
                      "View all",
                      m("i.fi-arrow-right")
                    ])
                  ])
                ]),

                m("li.dropdown.notification-list", [
                  m("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='javascript:;'][role='button']", [
                    m("img.rounded-circle[alt='user']", { src: avatar }),
                    m("span.ml-1.pro-user-name", [
                      "  ",
                      HeaderData.getUsername(),
                      m("i.mdi.mdi-chevron-down")
                    ])
                  ]),

                  m(ProfileBarComponent),
                ])
              ])
            ),
            m(".clearfix")
          ])
      ),
      m(".navbar-custom",
        m(".container-fluid",
          m("[id='navigation']",
            m("ul.navigation-menu", [
              m("li.has-submenu",
                m("a[href='/']", { oncreate: m.route.link }, [
                  m("i.icon-speedometer"),
                  "Dashboard"
                ])
              ),
            ])
          )
        )
      )
    ])
  }
} as m.Component;
