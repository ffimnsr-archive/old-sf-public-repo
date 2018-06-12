import m from "mithril";

import "styles/app";
import "styles/icons";

import bg from "images/bg-1.jpg";
import logo from "images/sf-logo.png";

export default {
  view(vnode) {
    return m("sf-root", [
      m("header[id='topnav']", [
        m(".topbar-main",
          m(".container-fluid", [
            m(".logo",
              m("a.logo[href='index.html']", [
                m("img.logo-small[alt=''][height='26'][src='assets/images/logo_sm.png']"),
                m("img.logo-large[alt=''][height='22'][src='assets/images/logo.png']")
              ])
            ),
            m(".menu-extras.topbar-custom",
              m("ul.list-unstyled.topbar-right-menu.float-right.mb-0", [
                m("li.menu-item",
                  m("a.navbar-toggle.nav-link",
                    m(".lines", [
                      m("span"),
                      m("span"),
                      m("span")
                    ])
                  )
                ),
                m("li.dropdown.notification-list.hide-phone", [
                  m("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                    m("i.mdi.mdi-earth"),
                    "English",
                    m("i.mdi.mdi-chevron-down")
                  ]),
                  m(".dropdown-menu.dropdown-menu-right", [
                    m("a.dropdown-item[href='javascript:void(0);']", "Spanish"),
                    m("a.dropdown-item[href='javascript:void(0);']", "Italian"),
                    m("a.dropdown-item[href='javascript:void(0);']", "French"),
                    m("a.dropdown-item[href='javascript:void(0);']", "Russian")
                  ])
                ]),
                m("li.dropdown.notification-list", [
                  m("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                    m("i.fi-bell.noti-icon"),
                    m("span.badge.badge-danger.badge-pill.noti-icon-badge", "4")
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
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon.bg-success",
                          m("i.mdi.mdi-comment-account-outline")
                        ),
                        m("p.notify-details", [
                          "Caleb Flakelar commented on Admin",
                          m("small.text-muted", "1 min ago")
                        ])
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon.bg-info",
                          m("i.mdi.mdi-account-plus")
                        ),
                        m("p.notify-details", [
                          "New user registered.",
                          m("small.text-muted", "5 hours ago")
                        ])
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon.bg-danger", m("i.mdi.mdi-heart")),
                        m("p.notify-details", [
                          "Carlos Crouch liked",
                          m("b", "Admin"),
                          m("small.text-muted", "3 days ago")
                        ])
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon.bg-warning",
                          m("i.mdi.mdi-comment-account-outline")
                        ),
                        m("p.notify-details", [
                          "Caleb Flakelar commented on Admin",
                          m("small.text-muted", "4 days ago")
                        ])
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon.bg-purple",
                          m("i.mdi.mdi-account-plus")
                        ),
                        m("p.notify-details", [
                          "New user registered.",
                          m("small.text-muted", "7 days ago")
                        ])
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon.bg-custom",
                          m("i.mdi.mdi-heart")
                        ),
                        m("p.notify-details", [
                          "Carlos Crouch liked",
                          m("b", "Admin"),
                          m("small.text-muted", "13 days ago")
                        ])
                      ])
                    ]),
                    m("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:void(0);']", [
                      "View all",
                      m("i.fi-arrow-right")
                    ])
                  ])
                ]),
                m("li.dropdown.notification-list", [
                  m("a.nav-link.dropdown-toggle.arrow-none.waves-effect[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                    m("i.fi-speech-bubble.noti-icon"),
                    m("span.badge.badge-dark.badge-pill.noti-icon-badge", "6")
                  ]),
                  m(".dropdown-menu.dropdown-menu-right.dropdown-lg", [
                    m(".dropdown-item.noti-title",
                      m("h6.m-0", [
                        m("span.float-right",
                          m("a.text-dark[href='']", m("small", "Clear All"))
                        ),
                        "Chat"
                      ])
                    ),
                    m(".slimscroll", { style: { "max-height": "230px" } }, [
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon",
                          m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-2.jpg']")
                        ),
                        m("p.notify-details", "Cristina Pride"),
                        m("p.text-muted.font-13.mb-0.user-msg",
                          "Hi, How are you? What about our next meeting"
                        )
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon",
                          m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-3.jpg']")
                        ),
                        m("p.notify-details", "Sam Garret"),
                        m("p.text-muted.font-13.mb-0.user-msg", "Yeah everything is fine")
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon",
                          m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-4.jpg']")
                        ),
                        m("p.notify-details", "Karen Robinson"),
                        m("p.text-muted.font-13.mb-0.user-msg", "Wow that's great")
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon",
                          m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-5.jpg']")
                        ),
                        m("p.notify-details", "Sherry Marshall"),
                        m("p.text-muted.font-13.mb-0.user-msg",
                          "Hi, How are you? What about our next meeting"
                        )
                      ]),
                      m("a.dropdown-item.notify-item[href='javascript:void(0);']", [
                        m(".notify-icon",
                          m("img.img-fluid.rounded-circle[alt=''][src='assets/images/users/avatar-6.jpg']")
                        ),
                        m("p.notify-details", "Shawn Millard"),
                        m("p.text-muted.font-13.mb-0.user-msg", "Yeah everything is fine")
                      ])
                    ]),
                    m("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:void(0);']", [
                      "View all",
                      m("i.fi-arrow-right")
                    ])
                  ])
                ]),
                m("li.dropdown.notification-list", [
                  m("a.nav-link.dropdown-toggle.waves-effect.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='#'][role='button']", [
                    m("img.rounded-circle[alt='user'][src='assets/images/users/avatar-1.jpg']"),
                    m("span.ml-1.pro-user-name", [
                      "Maxine K",
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
                  m("a[href='index.html']", [
                    m("i.icon-speedometer"),
                    "Dashboard"
                  ])
                ),
                m("li.has-submenu", [
                  m("a[href='#']", [
                    m("i.icon-layers"),
                    "Apps"
                  ]),
                  m("ul.submenu", [
                    m("li",
                      m("a[href='apps-calendar.html']",
                        "Calendar"
                      )
                    ),
                    m("li",
                      m("a[href='apps-tickets.html']",
                        "Tickets"
                      )
                    ),
                    m("li",
                      m("a[href='apps-taskboard.html']",
                        "Task Board"
                      )
                    ),
                    m("li",
                      m("a[href='apps-task-detail.html']",
                        "Task Detail"
                      )
                    ),
                    m("li",
                      m("a[href='apps-contacts.html']",
                        "Contacts"
                      )
                    ),
                    m("li",
                      m("a[href='apps-projects.html']",
                        "Projects"
                      )
                    ),
                    m("li",
                      m("a[href='apps-companies.html']",
                        "Companies"
                      )
                    ),
                    m("li",
                      m("a[href='apps-file-manager.html']",
                        "File Manager"
                      )
                    )
                  ])
                ]),
                m("li.has-submenu", [
                  m("a[href='#']", [
                    m("i.icon-briefcase"),
                    "UI Elements"
                  ]),
                  m("ul.submenu.megamenu", [
                    m("li",
                      m("ul", [
                        m("li",
                          m("a[href='ui-typography.html']", "Typography")
                        ),
                        m("li",
                          m("a[href='ui-cards.html']", "Cards")
                        ),
                        m("li",
                          m("a[href='ui-buttons.html']",
                            "Buttons"
                          )
                        ),
                        m("li",
                          m("a[href='ui-modals.html']",
                            "Modals"
                          )
                        ),
                        m("li",
                          m("a[href='ui-spinners.html']",
                            "Spinners"
                          )
                        )
                      ])
                    ),
                    m("li",
                      m("ul", [
                        m("li", m("a[href='ui-ribbons.html']", "Ribbons")),
                        m("li", m("a[href='ui-tooltips-popovers.html']", "Tooltips & Popover")),
                        m("li", m("a[href='ui-checkbox-radio.html']", "Checkboxs-Radios")),
                        m("li", m("a[href='ui-tabs.html']", "Tabs")),
                        m("li", m("a[href='ui-progressbars.html']", "Progress Bars"))
                      ])
                    ),
                    m("li",
                      m("ul", [
                        m("li",
                          m("a[href='ui-notifications.html']",
                            "Notification"
                          )
                        ),
                        m("li",
                          m("a[href='ui-grid.html']",
                            "Grid"
                          )
                        ),
                        m("li",
                          m("a[href='ui-sweet-alert.html']",
                            "Sweet Alert"
                          )
                        ),
                        m("li",
                          m("a[href='ui-bootstrap.html']",
                            "Bootstrap UI"
                          )
                        ),
                        m("li",
                          m("a[href='ui-range-slider.html']",
                            "Range Slider"
                          )
                        )
                      ])
                    )
                  ])
                ]),
                m("li.has-submenu", [
                  m("a[href='#']", [
                    m("i.icon-fire"),
                    "Components"
                  ]),
                  m("ul.submenu", [
                    m("li.has-submenu", [
                      m("a[href='#']", "Email"),
                      m("ul.submenu", [
                        m("li",
                          m("a[href='email-inbox.html']", "Inbox")
                        ),
                        m("li",
                          m("a[href='email-read.html']", "Read Email")
                        ),
                        m("li",
                          m("a[href='email-compose.html']", "Compose Email")
                        )
                      ])
                    ]),
                    m("li",
                      m("a[href='widgets.html']", "Widgets")
                    ),
                    m("li.has-submenu", [
                      m("a[href='#']", "Charts"),
                      m("ul.submenu", [
                        m("li",
                          m("a[href='chart-flot.html']",
                            "Flot Chart"
                          )
                        ),
                        m("li",
                          m("a[href='chart-morris.html']",
                            "Morris Chart"
                          )
                        ),
                        m("li",
                          m("a[href='chart-google.html']",
                            "Google Chart"
                          )
                        ),
                        m("li",
                          m("a[href='chart-chartist.html']",
                            "Chartist Chart"
                          )
                        ),
                        m("li",
                          m("a[href='chart-chartjs.html']",
                            "Chartjs Chart"
                          )
                        ),
                        m("li",
                          m("a[href='chart-sparkline.html']",
                            "Sparkline Chart"
                          )
                        ),
                        m("li",
                          m("a[href='chart-knob.html']",
                            "Jquery Knob"
                          )
                        )
                      ])
                    ]),
                    m("li.has-submenu", [
                      m("a[href='#']", "Forms"),
                      m("ul.submenu", [
                        m("li",
                          m("a[href='form-elements.html']",
                            "Form Elements"
                          )
                        ),
                        m("li",
                          m("a[href='form-advanced.html']",
                            "Form Advanced"
                          )
                        ),
                        m("li",
                          m("a[href='form-validation.html']",
                            "Form Validation"
                          )
                        ),
                        m("li",
                          m("a[href='form-pickers.html']",
                            "Form Pickers"
                          )
                        ),
                        m("li",
                          m("a[href='form-wizard.html']",
                            "Form Wizard"
                          )
                        ),
                        m("li",
                          m("a[href='form-mask.html']",
                            "Form Masks"
                          )
                        ),
                        m("li",
                          m("a[href='form-summernote.html']",
                            "Summernote"
                          )
                        ),
                        m("li",
                          m("a[href='form-wysiwig.html']",
                            "Wysiwig Editors"
                          )
                        ),
                        m("li",
                          m("a[href='form-x-editable.html']",
                            "X Editable"
                          )
                        ),
                        m("li",
                          m("a[href='form-uploads.html']",
                            "Multiple File Upload"
                          )
                        )
                      ])
                    ]),
                    m("li.has-submenu", [
                      m("a[href='#']", "Icons"),
                      m("ul.submenu", [
                        m("li",
                          m("a[href='icons-materialdesign.html']",
                            "Material Design"
                          )
                        ),
                        m("li",
                          m("a[href='icons-dripicons.html']",
                            "Dripicons"
                          )
                        ),
                        m("li",
                          m("a[href='icons-fontawesome.html']",
                            "Font awesome"
                          )
                        ),
                        m("li",
                          m("a[href='icons-feather.html']",
                            "Feather Icons"
                          )
                        ),
                        m("li",
                          m("a[href='icons-simpleline.html']",
                            "Simple Line Icons"
                          )
                        )
                      ])
                    ]),
                    m("li.has-submenu", [
                      m("a[href='#']",
                        "Tables"
                      ),
                      m("ul.submenu", [
                        m("li",
                          m("a[href='tables-basic.html']",
                            "Basic Tables"
                          )
                        ),
                        m("li",
                          m("a[href='tables-datatable.html']",
                            "Data Tables"
                          )
                        ),
                        m("li",
                          m("a[href='tables-responsive.html']",
                            "Responsive Table"
                          )
                        ),
                        m("li",
                          m("a[href='tables-tablesaw.html']",
                            "Tablesaw Tables"
                          )
                        ),
                        m("li",
                          m("a[href='tables-foo.html']",
                            "Foo Tables"
                          )
                        )
                      ])
                    ]),
                    m("li.has-submenu", [
                      m("a[href='#']",
                        "Maps"
                      ),
                      m("ul.submenu", [
                        m("li",
                          m("a[href='maps-google.html']",
                            "Google Maps"
                          )
                        ),
                        m("li",
                          m("a[href='maps-vector.html']",
                            "Vector Maps"
                          )
                        ),
                        m("li",
                          m("a[href='maps-mapael.html']",
                            "Mapael Maps"
                          )
                        )
                      ])
                    ])
                  ])
                ]),
                m("li.has-submenu", [
                  m("a[href='#']", [
                    m("i.icon-docs"),
                    "Pages"
                  ]
                  ),
                  m("ul.submenu.megamenu", [
                    m("li",
                      m("ul", [
                        m("li",
                          m("a[href='page-starter.html']",
                            "Starter Page"
                          )
                        ),
                        m("li",
                          m("a[href='page-login.html']",
                            "Login"
                          )
                        ),
                        m("li",
                          m("a[href='page-register.html']",
                            "Register"
                          )
                        ),
                        m("li",
                          m("a[href='page-logout.html']",
                            "Logout"
                          )
                        ),
                        m("li",
                          m("a[href='page-recoverpw.html']",
                            "Recover Password"
                          )
                        )
                      ]
                      )
                    ),
                    m("li",
                      m("ul",
                        [
                          m("li",
                            m("a[href='page-lock-screen.html']",
                              "Lock Screen"
                            )
                          ),
                          m("li",
                            m("a[href='page-confirm-mail.html']",
                              "Confirm Mail"
                            )
                          ),
                          m("li",
                            m("a[href='page-404.html']",
                              "Error 404"
                            )
                          ),
                          m("li",
                            m("a[href='page-404-alt.html']",
                              "Error 404-alt"
                            )
                          ),
                          m("li",
                            m("a[href='page-500.html']",
                              "Error 500"
                            )
                          )
                        ])
                    )
                  ])
                ]),
                m("li.has-submenu", [
                  m("a[href='#']", [
                    m("i.icon-present"),
                    "Extra Pages"
                  ]),
                  m("ul.submenu.megamenu",
                    [
                      m("li",
                        m("ul",
                          [
                            m("li",
                              m("a[href='extras-timeline.html']",
                                "Timeline"
                              )
                            ),
                            m("li",
                              m("a[href='extras-profile.html']",
                                "Profile"
                              )
                            ),
                            m("li",
                              m("a[href='extras-invoice.html']",
                                "Invoice"
                              )
                            ),
                            m("li",
                              m("a[href='extras-faq.html']",
                                "FAQ"
                              )
                            ),
                            m("li",
                              m("a[href='extras-pricing.html']",
                                "Pricing"
                              )
                            ),
                            m("li",
                              m("a[href='extras-email-template.html']", "Email Templates")
                            )
                          ])
                      ),
                      m("li",
                        m("ul", [
                          m("li",
                            m("a[href='extras-ratings.html']",
                              "Ratings"
                            )
                          ),
                          m("li",
                            m("a[href='extras-search-results.html']",
                              "Search Results"
                            )
                          ),
                          m("li",
                            m("a[href='extras-gallery.html']", "Gallery")
                          ),
                          m("li",
                            m("a[href='extras-maintenance.html']", "Maintenance")
                          ),
                          m("li",
                            m("a[href='extras-coming-soon.html']", "Coming Soon")
                          )
                        ])
                      )
                    ])
                ])
              ])
            )
          )
        )
      ]),
      m(".wrapper",
        m(".container-fluid", [
          m(".row",
            m(".col-sm-12",
              m(".page-title-box", [
                m(".btn-group.pull-right",
                  m("ol.breadcrumb.hide-phone.p-0.m-0", [
                    m("li.breadcrumb-item",
                      m("a[href='#']", "Highdmin")
                    ),
                    m("li.breadcrumb-item",
                      m("a[href='#']", "Pages")
                    ),
                    m("li.breadcrumb-item.active", "Error 404")
                  ])
                ),
                m("h4.page-title", "Error 404")
              ])
            )
          ),
          m(".row",
            m(".col-sm-6.offset-3",
              m(".text-center.mt-5", [
                m("h1.text-error", "404"),
                m("h4.text-uppercase.text-danger.mt-3", "Page Not Found"),
                m("p.text-muted.mt-3",
                  "It's looking like you may have taken a wrong turn. Don't worry... it\
                                  happens to the best of us. Here's a\
                                  little tip that might help you get back on track."
                ),
                m("a.btn.btn-md.btn-custom.waves-effect.waves-light.mt-3[href='index.html']",
                  "Return Home"
                )
              ])
            )
          )
        ])
      ),
      m("footer.footer",
        m(".container",
          m(".row", m(".col-12.text-center", "2018 © SmartFunding"))
        )
      )
    ]);
  }
} as m.Component;
