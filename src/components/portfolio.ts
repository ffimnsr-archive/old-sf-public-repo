import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import jwtDecode from "jwt-decode";

import header from "widgets/header";
import footer from "widgets/footer";

const Store = {

};

export default {
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
                                        m("li.breadcrumb-item.active", "Portfolio")
                                    ])
                                ),
                                m("h4.page-title", "Portfolio")
                            ])
                        )
                    ),

                    m(".row", [
                        m(".col-lg-8",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Porfolio"),
                                m("p.text-muted.font-14", "Check all your invoice deeds."),
                            ])
                        ),
                    ])
                )
            ),
            m(footer),
        ]);
    }
} as m.Component;
