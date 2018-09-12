import { AppSettings } from "configs";
import moment from "moment";
import m, { Vnode } from "mithril";
import tabProfile from "widgets/tab_profile";

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
                                        m("li.breadcrumb-item.active", "Power User Account")
                                    ])
                                ),
                                m("h4.page-title", "Power User Account")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.m-t-0.m-b-30.header-title", "Power User Account"),
                                m("ul.nav.nav-tabs.tabs-bordered",
                                    [
                                        m("li.nav-item",
                                            m("a.nav-link.show.active[aria-expanded='true'][data-toggle='tab'][href='#profile-b2']",
                                                [
                                                    m("i.fi-head.mr-2"),
                                                    "Personal Information"
                                                ]
                                            )
                                        ),
                                    ]
                                ),
                                m(".tab-content",
                                    [
                                        m(tabProfile),
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
