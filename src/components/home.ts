import m from "mithril";

import "styles/app";
import "styles/icons";

import bg from "images/bg-2.jpg";

export default {
  view(vnode) {
    return m("sf-root", [
      m("header[id='topnav']",
        [
          m(".topbar-main",
            m(".container-fluid",
              [
                m(".logo",
                  m("a.logo[href='index.html']",
                    [
                      m("img.logo-small[alt=''][height='26'][src='assets/images/logo_sm.png']"),
                      m("img.logo-large[alt=''][height='22'][src='assets/images/logo.png']")
                    ]
                  )
                ),
                m(".menu-extras.topbar-custom",
                  m("ul.list-unstyled.topbar-right-menu.float-right.mb-0",
                    [
                      m("li.menu-item",
                        m("a.navbar-toggle.nav-link",
                          m(".lines",
                            [
                              m("span"),
                              m("span"),
                              m("span")
                            ]
                          )
                        )
                      ),
                      m("li.dropdown.notification-list.hide-phone",
                        [
                          m("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']",
                            [
                              m("i.mdi.mdi-earth"),
                              "English",
                              m("i.mdi.mdi-chevron-down")
                            ]
                          ),
                          m(".dropdown-menu.dropdown-menu-right",
                            [
                              m("a.dropdown-item[href='javascript:void(0);']",
                                "Spanish"
                              ),
                              m("a.dropdown-item[href='javascript:void(0);']",
                                "Italian"
                              ),
                              m("a.dropdown-item[href='javascript:void(0);']",
                                "French"
                              ),
                              m("a.dropdown-item[href='javascript:void(0);']",
                                "Russian"
                              )
                            ]
                          )
                        ]
                      ),
                      m("li.dropdown.notification-list",
                        [
                          m("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']",
                            [
                              m("i.fi-bell.noti-icon"),
                              m("span.badge.badge-danger.badge-pill.noti-icon-badge", "4")
                            ]
                          ),
                          m(".dropdown-menu.dropdown-menu-right.dropdown-lg",
                            [
                              m(".dropdown-item.noti-title",
                                m("h6.m-0",
                                  [
                                    m("span.float-right",
                                      m("a.text-dark[href='']",
                                        m("small", "Clear All")
                                      )
                                    ),
                                    "Notification"
                                  ]
                                )
                              ),
                              m(".slimscroll", { style: { "max-height": "230px" } },
                                [
                                  m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                    [
                                      m(".notify-icon.bg-success",
                                        m("i.mdi.mdi-comment-account-outline")
                                      ),
                                      m("p.notify-details",
                                        [
                                          "Caleb Flakelar commented on Admin",
                                          m("small.text-muted",
                                            "1 min ago"
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ]
                              ),
                              m("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:void(0);']",
                                [
                                  "View all",
                                  m("i.fi-arrow-right")
                                ]
                              )
                            ]
                          )
                        ]
                      ),
                      m("li.dropdown.notification-list",
                        [
                          m("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']",
                            [
                              m("i.fi-speech-bubble.noti-icon"),
                              m("span.badge.badge-dark.badge-pill.noti-icon-badge",
                                "6"
                              )
                            ]
                          ),
                          m(".dropdown-menu.dropdown-menu-right.dropdown-lg",
                            [
                              m(".dropdown-item.noti-title",
                                m("h6.m-0",
                                  [
                                    m("span.float-right",
                                      m("a.text-dark[href='']",
                                        m("small",
                                          "Clear All"
                                        )
                                      )
                                    ),
                                    "Chat"
                                  ]
                                )
                              ),
                              m(".slimscroll", { style: { "max-height": "230px" } },
                                [
                                  m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                    [
                                      m(".notify-icon",
                                        m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-2.jpg']")
                                      ),
                                      m("p.notify-details",
                                        "Cristina Pride"
                                      ),
                                      m("p.text-muted.font-13.mb-0.user-msg",
                                        "Hi, How are you? What about our next meeting"
                                      )
                                    ]
                                  ),
                                  m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                    [
                                      m(".notify-icon",
                                        m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-3.jpg']")
                                      ),
                                      m("p.notify-details",
                                        "Sam Garret"
                                      ),
                                      m("p.text-muted.font-13.mb-0.user-msg",
                                        "Yeah everything is fine"
                                      )
                                    ]
                                  ),
                                  m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                    [
                                      m(".notify-icon",
                                        m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-4.jpg']")
                                      ),
                                      m("p.notify-details",
                                        "Karen Robinson"
                                      ),
                                      m("p.text-muted.font-13.mb-0.user-msg",
                                        "Wow that's great"
                                      )
                                    ]
                                  ),
                                  m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                    [
                                      m(".notify-icon",
                                        m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-5.jpg']")
                                      ),
                                      m("p.notify-details",
                                        "Sherry Marshall"
                                      ),
                                      m("p.text-muted.font-13.mb-0.user-msg",
                                        "Hi, How are you? What about our next meeting"
                                      )
                                    ]
                                  ),
                                  m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                    [
                                      m(".notify-icon",
                                        m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-6.jpg']")
                                      ),
                                      m("p.notify-details",
                                        "Shawn Millard"
                                      ),
                                      m("p.text-muted.font-13.mb-0.user-msg",
                                        "Yeah everything is fine"
                                      )
                                    ]
                                  )
                                ]
                              ),
                              m("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:void(0);']",
                                [
                                  "View all",
                                  m("i.fi-arrow-right")
                                ]
                              )
                            ]
                          )
                        ]
                      ),
                      m("li.dropdown.notification-list",
                        [
                          m("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']",
                            [
                              m("img.rounded-circle[alt='user'][src='assets/images/users/avatar-1.jpg']"),
                              m("span.ml-1.pro-user-name",
                                [
                                  "Maxine K",
                                  m("i.mdi.mdi-chevron-down")
                                ]
                              )
                            ]
                          ),
                          m(".dropdown-menu.dropdown-menu-right.profile-dropdown.",
                            [
                              m(".dropdown-item.noti-title",
                                m("h6.text-overflow.m-0",
                                  "Welcome !"
                                )
                              ),
                              m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                [
                                  m("i.fi-head"),
                                  m("span",
                                    "My Account"
                                  )
                                ]
                              ),
                              m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                [
                                  m("i.fi-cog"),
                                  m("span",
                                    "Settings"
                                  )
                                ]
                              ),
                              m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                [
                                  m("i.fi-help"),
                                  m("span",
                                    "Support"
                                  )
                                ]
                              ),
                              m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                [
                                  m("i.fi-lock"),
                                  m("span",
                                    "Lock Screen"
                                  )
                                ]
                              ),
                              m("a.dropdown-item.notify-item[href='javascript:void(0);']",
                                [
                                  m("i.fi-power"),
                                  m("span",
                                    "Logout"
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  )
                ),
                m(".clearfix")
              ]
            )
          ),
          m(".navbar-custom",
            m(".container-fluid",
              m("[id='navigation']",
                m("ul.navigation-menu",
                  [
                    m("li.has-submenu",
                      m("a[href='index.html']",
                        [
                          m("i.icon-speedometer"),
                          "Dashboard"
                        ]
                      )
                    ),
                  ]
                )
              )
            )
          )
        ]
      ),
      m(".wrapper",
        m(".container-fluid",
          m(".row",
            m(".col-sm-12",
              m(".page-title-box",
                [
                  m(".btn-group.pull-right",
                    m("ol.breadcrumb.hide-phone.p-0.m-0",
                      [
                        m("li.breadcrumb-item",
                          m("a[href='#']",
                            "Highdmin"
                          )
                        ),
                        m("li.breadcrumb-item",
                          m("a[href='#']",
                            "Extra Pages"
                          )
                        ),
                        m("li.breadcrumb-item.active",
                          "Starter"
                        )
                      ]
                    )
                  ),
                  m("h4.page-title",
                    "Starter"
                  )
                ]
              )
            )
          )
        )
      ),
      m("footer.footer",
        m(".container",
          m(".row", m(".col-12.text-center", "2018 © SmartFunding"))
        )
      )
    ]);
  }
} as m.Component;
