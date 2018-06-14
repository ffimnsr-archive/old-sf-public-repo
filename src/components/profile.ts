import m, { Vnode } from "mithril";

import header from "widgets/header";
import footer from "widgets/footer";

export default {
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
                    m("li.breadcrumb-item", m("a[href='#']", "SmartFunding")),
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
                          m("img.thumb-lg.rounded-circle[alt=''][src='assets/images/users/avatar-1.jpg']")
                        ),
                        m(".media-body.text-white", [
                            m("h4.mt-1.mb-1.font-18", "Michael A. Franklin"),
                            m("p.font-13.text-light", "User Experience Specialist"),
                            m("p.text-light.mb-0", "California, United States")
                          ])
                      ]),
                    m(".col-sm-6",
                      m(".text-right",
                        m("button.btn.btn-light.waves-effect[type='button']",
                          [
                            m("i.mdi.mdi-account-settings-variant.mr-1"),
                            "Edit Profile"
                          ]
                        )
                      )
                    )
                  ]
                )
              )
            )
          ),
          m(".row",
            [
              m(".col-md-4",
                [
                  m(".card-box",
                    [
                      m("h4.header-title.mt-0.m-b-20",
                        "Personal Information"
                      ),
                      m(".panel-body",
                        [
                          m("p.text-muted.font-13",
                            "Hye, I’m Johnathan Doe residing in this beautiful world. I create websites and mobile apps with great UX and UI design. I have done work with big companies like Nokia, Google and Yahoo. Meet me or Contact me for any queries. One Extra line for filling space. Fill as many you want."
                          ),
                          m("hr"),
                          m(".text-left",
                            [
                              m("p.text-muted.font-13",
                                [
                                  m("strong",
                                    "Full Name :"
                                  ),
                                  m("span.m-l-15",
                                    "Johnathan Deo"
                                  )
                                ]
                              ),
                              m("p.text-muted.font-13",
                                [
                                  m("strong",
                                    "Mobile :"
                                  ),
                                  m("span.m-l-15",
                                    "(+12) 123 1234 567"
                                  )
                                ]
                              ),
                              m("p.text-muted.font-13",
                                [
                                  m("strong",
                                    "Email :"
                                  ),
                                  m("span.m-l-15",
                                    "coderthemes@gmail.com"
                                  )
                                ]
                              ),
                              m("p.text-muted.font-13",
                                [
                                  m("strong",
                                    "Location :"
                                  ),
                                  m("span.m-l-15",
                                    "USA"
                                  )
                                ]
                              ),
                              m("p.text-muted.font-13",
                                [
                                  m("strong",
                                    "Languages :"
                                  ),
                                  m("span.m-l-5",
                                    [
                                      m("span.flag-icon.flag-icon-us.m-r-5.m-t-0[title='us']"),
                                      m("span",
                                        "English"
                                      )
                                    ]
                                  ),
                                  m("span.m-l-5",
                                    [
                                      m("span.flag-icon.flag-icon-de.m-r-5[title='de']"),
                                      m("span",
                                        "German"
                                      )
                                    ]
                                  ),
                                  m("span.m-l-5",
                                    [
                                      m("span.flag-icon.flag-icon-es.m-r-5[title='es']"),
                                      m("span",
                                        "Spanish"
                                      )
                                    ]
                                  ),
                                  m("span.m-l-5",
                                    [
                                      m("span.flag-icon.flag-icon-fr.m-r-5[title='fr']"),
                                      m("span",
                                        "French"
                                      )
                                    ]
                                  )
                                ]
                              )
                            ]
                          ),
                          m("ul.social-links.list-inline.m-t-20.m-b-0",
                            [
                              m("li.list-inline-item",
                                m("a.tooltips[data-original-title='Facebook'][data-placement='top'][data-toggle='tooltip'][href=''][title='']",
                                  m("i.fa.fa-facebook")
                                )
                              ),
                              m("li.list-inline-item",
                                m("a.tooltips[data-original-title='Twitter'][data-placement='top'][data-toggle='tooltip'][href=''][title='']",
                                  m("i.fa.fa-twitter")
                                )
                              ),
                              m("li.list-inline-item",
                                m("a.tooltips[data-original-title='Skype'][data-placement='top'][data-toggle='tooltip'][href=''][title='']",
                                  m("i.fa.fa-skype")
                                )
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  ),
                  m(".card-box.ribbon-box",
                    [
                      m(".ribbon.ribbon-primary",
                        "Messages"
                      ),
                      m(".clearfix"),
                      m(".inbox-widget",
                        [
                          m("a[href='#']",
                            m(".inbox-item",
                              [
                                m(".inbox-item-img",
                                  m("img.rounded-circle[alt=''][src='assets/images/users/avatar-2.jpg']")
                                ),
                                m("p.inbox-item-author",
                                  "Tomaslau"
                                ),
                                m("p.inbox-item-text",
                                  "I've finished it! See you so..."
                                ),
                                m("p.inbox-item-date.m-t-10",
                                  m("button.btn.btn-icon.btn-sm.waves-effect.waves-light.btn-success[type='button']",
                                    "Reply"
                                  )
                                )
                              ]
                            )
                          ),
                          m("a[href='#']",
                            m(".inbox-item",
                              [
                                m(".inbox-item-img",
                                  m("img.rounded-circle[alt=''][src='assets/images/users/avatar-3.jpg']")
                                ),
                                m("p.inbox-item-author",
                                  "Stillnotdavid"
                                ),
                                m("p.inbox-item-text",
                                  "This theme is awesome!"
                                ),
                                m("p.inbox-item-date.m-t-10",
                                  m("button.btn.btn-icon.btn-sm.waves-effect.waves-light.btn-success[type='button']",
                                    "Reply"
                                  )
                                )
                              ]
                            )
                          ),
                          m("a[href='#']",
                            m(".inbox-item",
                              [
                                m(".inbox-item-img",
                                  m("img.rounded-circle[alt=''][src='assets/images/users/avatar-4.jpg']")
                                ),
                                m("p.inbox-item-author",
                                  "Kurafire"
                                ),
                                m("p.inbox-item-text",
                                  "Nice to meet you"
                                ),
                                m("p.inbox-item-date.m-t-10",
                                  m("button.btn.btn-icon.btn-sm.waves-effect.waves-light.btn-success[type='button']",
                                    "Reply"
                                  )
                                )
                              ]
                            )
                          ),
                          m("a[href='#']",
                            m(".inbox-item",
                              [
                                m(".inbox-item-img",
                                  m("img.rounded-circle[alt=''][src='assets/images/users/avatar-5.jpg']")
                                ),
                                m("p.inbox-item-author",
                                  "Shahedk"
                                ),
                                m("p.inbox-item-text",
                                  "Hey! there I'm available..."
                                ),
                                m("p.inbox-item-date.m-t-10",
                                  m("button.btn.btn-icon.btn-sm.waves-effect.waves-light.btn-success[type='button']",
                                    "Reply"
                                  )
                                )
                              ]
                            )
                          ),
                          m("a[href='#']",
                            m(".inbox-item",
                              [
                                m(".inbox-item-img",
                                  m("img.rounded-circle[alt=''][src='assets/images/users/avatar-6.jpg']")
                                ),
                                m("p.inbox-item-author",
                                  "Adhamdannaway"
                                ),
                                m("p.inbox-item-text",
                                  "This theme is awesome!"
                                ),
                                m("p.inbox-item-date.m-t-10",
                                  m("button.btn.btn-icon.btn-sm.waves-effect.waves-light.btn-success[type='button']",
                                    "Reply"
                                  )
                                )
                              ]
                            )
                          ),
                          m("a[href='#']",
                            m(".inbox-item",
                              [
                                m(".inbox-item-img",
                                  m("img.rounded-circle[alt=''][src='assets/images/users/avatar-2.jpg']")
                                ),
                                m("p.inbox-item-author",
                                  "Tomaslau"
                                ),
                                m("p.inbox-item-text",
                                  "I've finished it! See you so..."
                                ),
                                m("p.inbox-item-date.m-t-10",
                                  m("button.btn.btn-icon.btn-sm.waves-effect.waves-light.btn-success[type='button']",
                                    "Reply"
                                  )
                                )
                              ]
                            )
                          ),
                          m("a[href='#']",
                            m(".inbox-item",
                              [
                                m(".inbox-item-img",
                                  m("img.rounded-circle[alt=''][src='assets/images/users/avatar-3.jpg']")
                                ),
                                m("p.inbox-item-author",
                                  "Stillnotdavid"
                                ),
                                m("p.inbox-item-text",
                                  "This theme is awesome!"
                                ),
                                m("p.inbox-item-date.m-t-10",
                                  m("button.btn.btn-icon.btn-sm.waves-effect.waves-light.btn-success[type='button']",
                                    "Reply"
                                  )
                                )
                              ]
                            )
                          )
                        ]
                      )
                    ]
                  )
                ]
              ),
              m(".col-md-8",
                [
                  m(".row",
                    [
                      m(".col-sm-4",
                        m(".card-box.tilebox-one",
                          [
                            m("i.icon-layers.float-right.text-muted"),
                            m("h6.text-muted.text-uppercase.mt-0",
                              "Orders"
                            ),
                            m("h2.m-b-20[data-plugin='counterup']",
                              "1,587"
                            ),
                            m("span.badge.badge-custom",
                              "+11%"
                            ),
                            m("span.text-muted",
                              "From previous period"
                            )
                          ]
                        )
                      ),
                      m(".col-sm-4",
                        m(".card-box.tilebox-one",
                          [
                            m("i.icon-paypal.float-right.text-muted"),
                            m("h6.text-muted.text-uppercase.mt-0",
                              "Revenue"
                            ),
                            m("h2.m-b-20",
                              [
                                "$",
                                m("span[data-plugin='counterup']",
                                  "46,782"
                                )
                              ]
                            ),
                            m("span.badge.badge-danger",
                              "-29%"
                            ),
                            m("span.text-muted",
                              "From previous period"
                            )
                          ]
                        )
                      ),
                      m(".col-sm-4",
                        m(".card-box.tilebox-one",
                          [
                            m("i.icon-rocket.float-right.text-muted"),
                            m("h6.text-muted.text-uppercase.mt-0",
                              "Product Sold"
                            ),
                            m("h2.m-b-20[data-plugin='counterup']",
                              "1,890"
                            ),
                            m("span.badge.badge-custom",
                              "+89%"
                            ),
                            m("span.text-muted",
                              "Last year"
                            )
                          ]
                        )
                      )
                    ]
                  ),
                  m(".card-box",
                    [
                      m("h4.header-title.mt-0.mb-3",
                        "Experience"
                      ),
                      m("[class='']",
                        [
                          m("[class='']",
                            [
                              m("h5.text-custom.m-b-5",
                                "Lead designer / Developer"
                              ),
                              m("p.m-b-0",
                                "websitename.com"
                              ),
                              m("p",
                                m("b",
                                  "2010-2015"
                                )
                              ),
                              m("p.text-muted.font-13.m-b-0",
                                "Lorem Ipsum is simply dummy text\
                                        of the printing and typesetting industry. Lorem Ipsum has\
                                        been the industry's standard dummy text ever since the\
                                        1500s, when an unknown printer took a galley of type and\
                                        scrambled it to make a type specimen book."
                              )
                            ]
                          ),
                          m("hr"),
                          m("[class='']",
                            [
                              m("h5.text-custom.m-b-5",
                                "Senior Graphic Designer"
                              ),
                              m("p.m-b-0",
                                "coderthemes.com"
                              ),
                              m("p",
                                m("b",
                                  "2007-2009"
                                )
                              ),
                              m("p.text-muted.font-13",
                                "Lorem Ipsum is simply dummy text\
                                        of the printing and typesetting industry. Lorem Ipsum has\
                                        been the industry's standard dummy text ever since the\
                                        1500s, when an unknown printer took a galley of type and\
                                        scrambled it to make a type specimen book."
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  ),
                  m(".card-box",
                    [
                      m("h4.header-title.mb-3",
                        "My Projects"
                      ),
                      m(".table-responsive",
                        m("table.table.m-b-0",
                          [
                            m("thead",
                              m("tr",
                                [
                                  m("th",
                                    "#"
                                  ),
                                  m("th",
                                    "Project Name"
                                  ),
                                  m("th",
                                    "Start Date"
                                  ),
                                  m("th",
                                    "Due Date"
                                  ),
                                  m("th",
                                    "Status"
                                  ),
                                  m("th",
                                    "Assign"
                                  )
                                ]
                              )
                            ),
                            m("tbody",
                              [
                                m("tr",
                                  [
                                    m("td",
                                      "1"
                                    ),
                                    m("td",
                                      "Adminox Admin"
                                    ),
                                    m("td",
                                      "01/01/2015"
                                    ),
                                    m("td",
                                      "07/05/2015"
                                    ),
                                    m("td",
                                      m("span.label.label-info",
                                        "Work in Progress"
                                      )
                                    ),
                                    m("td",
                                      "Coderthemes"
                                    )
                                  ]
                                ),
                                m("tr",
                                  [
                                    m("td",
                                      "2"
                                    ),
                                    m("td",
                                      "Adminox Frontend"
                                    ),
                                    m("td",
                                      "01/01/2015"
                                    ),
                                    m("td",
                                      "07/05/2015"
                                    ),
                                    m("td",
                                      m("span.label.label-success",
                                        "Pending"
                                      )
                                    ),
                                    m("td",
                                      "Coderthemes"
                                    )
                                  ]
                                ),
                                m("tr",
                                  [
                                    m("td",
                                      "3"
                                    ),
                                    m("td",
                                      "Adminox Admin"
                                    ),
                                    m("td",
                                      "01/01/2015"
                                    ),
                                    m("td",
                                      "07/05/2015"
                                    ),
                                    m("td",
                                      m("span.label.label-pink",
                                        "Done"
                                      )
                                    ),
                                    m("td",
                                      "Coderthemes"
                                    )
                                  ]
                                ),
                                m("tr",
                                  [
                                    m("td",
                                      "4"
                                    ),
                                    m("td",
                                      "Adminox Frontend"
                                    ),
                                    m("td",
                                      "01/01/2015"
                                    ),
                                    m("td",
                                      "07/05/2015"
                                    ),
                                    m("td",
                                      m("span.label.label-purple",
                                        "Work in Progress"
                                      )
                                    ),
                                    m("td",
                                      "Coderthemes"
                                    )
                                  ]
                                ),
                                m("tr",
                                  [
                                    m("td",
                                      "5"
                                    ),
                                    m("td",
                                      "Adminox Admin"
                                    ),
                                    m("td",
                                      "01/01/2015"
                                    ),
                                    m("td",
                                      "07/05/2015"
                                    ),
                                    m("td",
                                      m("span.label.label-warning",
                                        "Coming soon"
                                      )
                                    ),
                                    m("td",
                                      "Coderthemes"
                                    )
                                  ])
                              ])
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
