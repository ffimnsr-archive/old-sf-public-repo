import m, { Vnode } from "mithril";
import { AppSettings } from "configs";
import QRCode from "qrcode";
import jwtDecode from "jwt-decode";
import Chartist from "chartist";
import "chartist/dist/chartist.css";
import Swal from "sweetalert2";

import header from "widgets/header";
import footer from "widgets/footer";
import panelExchangePrices from "widgets/panel_exchange_prices";
import panelShowWalletAddresses from "widgets/panel_show_wallet_addresses";
import modalBitcoin from "widgets/modal_user_get_bitcoin_address";
import modalEthereum from "widgets/modal_user_get_ethereum_address";
import modalStellar from "widgets/modal_user_get_stellar_address";


const Store = {
    image: "",

    load: function() {
        const token = localStorage.getItem("token")!;
    }
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {

    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(header),
            m(".wrapper",
                m(".container-fluid",
                    m(".row",
                        m(".col-sm-12",
                            m(".page-title-box", [
                                m(".btn-group.pull-right",
                                    m("ol.breadcrumb.hide-phone.p-0.m-0", [
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                                        ),
                                        m("li.breadcrumb-item.active", "Deals")
                                    ])
                                ),
                                m("h4.page-title", "Deals")
                            ])
                        )
                    ),

                    m(".row", [
                        m(".col-xl-4",
                            m(".card-box.project-box",
                                [
                                    m(".dropdown.pull-right",
                                        [
                                            m("a.dropdown-toggle.card-drop.arrow-none[aria-expanded='false'][data-toggle='dropdown'][href='#']",
                                                m("h3.m-0.text-muted",
                                                    m("i.mdi.mdi-dots-horizontal")
                                                )
                                            ),
                                            m(".dropdown-menu.dropdown-menu-right[aria-labelledby='btnGroupDrop1']",
                                                [
                                                    m("a.dropdown-item[href='#']",
                                                        "Edit"
                                                    ),
                                                    m("a.dropdown-item[href='#']",
                                                        "Delete"
                                                    ),
                                                    m("a.dropdown-item[href='#']",
                                                        "Add Members"
                                                    ),
                                                    m("a.dropdown-item[href='#']",
                                                        "Add Due Date"
                                                    )
                                                ]
                                            )
                                        ]
                                    ),
                                    m("p.text-muted.text-uppercase.mb-0.font-13",
                                        "Orange Limited"
                                    ),
                                    m("h4.mt-0.mb-3",
                                        m("a.text-dark[href='']",
                                            "New Admin Design"
                                        )
                                    ),
                                    m("ul.list-inline",
                                        [
                                            m("li.list-inline-item",
                                                [
                                                    m("h3.mb-0",
                                                        "124"
                                                    ),
                                                    m("p.text-muted",
                                                        "Attachments"
                                                    )
                                                ]
                                            ),
                                            m("li.list-inline-item",
                                                [
                                                    m("h3.mb-0",
                                                        "452"
                                                    ),
                                                    m("p.text-muted",
                                                        "Comments"
                                                    )
                                                ]
                                            ),
                                            m("li.list-inline-item",
                                                [
                                                    m("h3.mb-0",
                                                        "85"
                                                    ),
                                                    m("p.text-muted",
                                                        "Tasks"
                                                    )
                                                ]
                                            )
                                        ]
                                    ),
                                    m(".project-members.mb-4",
                                        [
                                            m("label.mr-3",
                                                "Team :"
                                            ),
                                            m("a[data-original-title='Mat Helme'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-1.jpg']")
                                            ),
                                            m("a[data-original-title='Michael Zenaty'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-2.jpg']")
                                            ),
                                            m("a[data-original-title='James Anderson'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-3.jpg']")
                                            ),
                                            m("a[data-original-title='Mat Helme'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-4.jpg']")
                                            ),
                                            m("a[data-original-title='Username'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-5.jpg']")
                                            )
                                        ]
                                    ),
                                    m("label[class='']",
                                        [
                                            "Funding completed:",
                                            m("span.text-custom",
                                                "55/85"
                                            )
                                        ]
                                    ),
                                    m(".progress.mb-1", { style: { "height": "7px" } },
                                        m(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='80'][role='progressbar']", { style: { "width": "80%" } },
                                        )
                                    )
                                ]
                            )
                        )
                    ]),
                    m(".row", [
                        m(".col-xl-4",
                            m(".card-box.project-box",
                                [
                                    m(".dropdown.pull-right",
                                        [
                                            m("a.dropdown-toggle.card-drop.arrow-none[aria-expanded='false'][data-toggle='dropdown'][href='#']",
                                                m("h3.m-0.text-muted",
                                                    m("i.mdi.mdi-dots-horizontal")
                                                )
                                            ),
                                            m(".dropdown-menu.dropdown-menu-right[aria-labelledby='btnGroupDrop1']",
                                                [
                                                    m("a.dropdown-item[href='#']",
                                                        "Invest"
                                                    ),
                                                    m("a.dropdown-item[href='#']",
                                                        "More Info"
                                                    ),
                                                ]
                                            )
                                        ]
                                    ),
                                    m("p.text-muted.text-uppercase.mb-0.font-13",
                                        "Orange Limited"
                                    ),
                                    m("h4.mt-0.mb-3",
                                        m("a.text-dark[href='']",
                                            "New Admin Design"
                                        )
                                    ),
                                    m("ul.list-inline",
                                        [
                                            m("li.list-inline-item",
                                                [
                                                    m("h3.mb-0",
                                                        "124"
                                                    ),
                                                    m("p.text-muted",
                                                        "Term"
                                                    )
                                                ]
                                            ),
                                            m("li.list-inline-item",
                                                [
                                                    m("h3.mb-0",
                                                        "452"
                                                    ),
                                                    m("p.text-muted",
                                                        "Appreciation"
                                                    )
                                                ]
                                            ),
                                            m("li.list-inline-item",
                                                [
                                                    m("h3.mb-0",
                                                        "85"
                                                    ),
                                                    m("p.text-muted",
                                                        "Available"
                                                    )
                                                ]
                                            )
                                        ]
                                    ),
                                    m(".project-members.mb-4",
                                        [
                                            m("label.mr-3",
                                                "Team :"
                                            ),
                                            m("a[data-original-title='Mat Helme'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-1.jpg']")
                                            ),
                                            m("a[data-original-title='Michael Zenaty'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-2.jpg']")
                                            ),
                                            m("a[data-original-title='James Anderson'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-3.jpg']")
                                            ),
                                            m("a[data-original-title='Mat Helme'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-4.jpg']")
                                            ),
                                            m("a[data-original-title='Username'][data-placement='top'][data-toggle='tooltip'][href='#'][title='']",
                                                m("img.rounded-circle.thumb-sm[alt='friend'][src='assets/images/users/avatar-5.jpg']")
                                            )
                                        ]
                                    ),
                                    m("label[class='']",
                                        [
                                            "Funding completed:",
                                            m("span.text-custom",
                                                "55/85"
                                            )
                                        ]
                                    ),
                                    m(".progress.mb-1", { style: { "height": "7px" } },
                                        m(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='80'][role='progressbar']", { style: { "width": "80%" } },
                                        )
                                    )
                                ]
                            )
                        )
                    ]),
                    m("div.row",
                        m(".col-lg-12",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Investment Options"),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead", [
                                        m("tr", [
                                            m("th", "Invoice"),
                                            m("th", "Terms"),
                                            m("th", "Amount"),
                                            m("th", "Appreciation"),
                                            m("th", "Funded"),
                                            m("th", "Available"),
                                            m("th", "Time Left"),
                                            m("th", "Actions"),
                                        ])
                                    ]),

                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Invoice"),
                                            m("th", "Terms"),
                                            m("th", "Amount"),
                                            m("th", "Appreciation"),
                                            m("th", "Funded"),
                                            m("th", "Available"),
                                            m("th", "Time Left"),
                                            m("th", "Actions"),
                                        ]),
                                    ])

                                ])
                            ])
                        ),
                    )
                ),
            ),
            m(footer),
        ]);
    }
} as m.Component;
