import m from "mithril";

import logo from "images/sf-logo.png";
import avatar from "images/users/avatar-1.jpg";

export default {
  oninit() {
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
  view(vnode) {
    return m("header[id='topnav']", [
      m(".topbar-main",
        m(".container-fluid", [
            m(".logo",
              m("a.logo[href='/#!/']", [
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
                    m(".slimscroll", { style: { "max-height": "230px" } }, [
                      m("a.dropdown-item.notify-item[href='javascript:;']", [
                        m(".notify-icon.bg-success",
                          m("i.mdi.mdi-comment-account-outline")
                        ),
                        m("p.notify-details", [
                          "Caleb Flakelar commented on Admin",
                          m("small.text-muted", "1 min ago")
                        ])
                      ])
                    ]),
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
                      "User",
                      m("i.mdi.mdi-chevron-down")
                    ])
                  ]),
                  m(".dropdown-menu.dropdown-menu-right.profile-dropdown.", [
                    m(".dropdown-item.noti-title",
                      m("h6.text-overflow.m-0", "Welcome !")
                    ),
                    m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                      m("i.fi-head"),
                      m("span", "My Account")
                    ]),
                    m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                      m("i.fi-cog"),
                      m("span", "Settings")
                    ]),
                    m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                      m("i.fi-help"),
                      m("span", "Support")
                    ]),
                    m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                      m("i.fi-lock"),
                      m("span", "Lock Screen")
                    ]),
                    m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                      m("i.fi-power"),
                      m("span", "Logout")
                    ])
                  ])
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
                m("a[href='/#!/']", [
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
