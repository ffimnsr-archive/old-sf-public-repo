import { AppSettings } from "configs";
import moment from "moment";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    load() {

    },
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;
    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(header),
            m(".wrapper",
                m(".container-fluid", [
                    m(".row",
                        m(".col-sm-12",
                            m(".page-title-box", [
                                m(".btn-group.pull-right",
                                    m("ol.breadcrumb.hide-phone.p-0.m-0", [
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                                        ),
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "Control Panel")
                                        ),
                                        m("li.breadcrumb-item.active", "Member Account")
                                    ])
                                ),
                                m("h4.page-title", "Member Account")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.m-t-0.m-b-30.header-title", "Member Account"),
                                m("ul.nav.nav-tabs.tabs-bordered.nav-justified",
                                    [
                                        m("li.nav-item",
                                            m("a.nav-link[aria-expanded='false'][data-toggle='tab'][href='#home-b2']",
                                                [
                                                    m("i.fi-monitor.mr-2"),
                                                    "Personal Information"
                                                ]
                                            )
                                        ),
                                        m("li.nav-item",
                                            m("a.nav-link[aria-expanded='true'][data-toggle='tab'][href='#profile-b2']",
                                                [
                                                    m("i.fi-head.mr-2"),
                                                    "Financial Information"
                                                ]
                                            )
                                        ),
                                        m("li.nav-item",
                                            m("a.nav-link.active.show[aria-expanded='false'][data-toggle='tab'][href='#messages-b2']",
                                                [
                                                    m("i.fi-mail.mr-2"),
                                                    "Investment Details"
                                                ]
                                            )
                                        ),
                                        m("li.nav-item",
                                            m("a.nav-link[aria-expanded='false'][data-toggle='tab'][href='#settings-b2']",
                                                [
                                                    m("i.fi-cog.mr-2"),
                                                    "Documents"
                                                ]
                                            )
                                        ),
                                        m("li.nav-item",
                                            m("a.nav-link[aria-expanded='false'][data-toggle='tab'][href='#settings-b2']",
                                                [
                                                    m("i.fi-cog.mr-2"),
                                                    "KYC Details"
                                                ]
                                            )
                                        ),
                                        m("li.nav-item",
                                            m("a.nav-link[aria-expanded='false'][data-toggle='tab'][href='#settings-b2']",
                                                [
                                                    m("i.fi-cog.mr-2"),
                                                    "Summary"
                                                ]
                                            )
                                        ),
                                    ]
                                ),
                                m(".tab-content",
                                    [
                                        m(".tab-pane[id='home-b2']",
                                            [

                                            ]
                                        ),
                                        m(".tab-pane[id='profile-b2']",
                                            [

                                            ]
                                        ),
                                        m(".tab-pane.active.show[id='messages-b2']",
                                            [

                                            ]
                                        ),
                                        m(".tab-pane[id='settings-b2']",
                                            [

                                            ]
                                        )
                                    ]
                                )
                            ])
                        )
                    )
                ])
            ),
            m(footer),
        ]);
    }
}
