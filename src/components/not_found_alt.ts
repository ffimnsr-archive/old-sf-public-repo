import m, { Vnode } from "mithril";
import footer from "../widgets/footer";
import header from "../widgets/header";

export default {
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
                                        m("li.breadcrumb-item.active", "Page Not Found")
                                    ])
                                ),
                                m("h4.page-title", "Page Not Found")
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
                    happens to the best of us. Here's a little tip that might help you get back on track."
                                ),
                                m("a.btn.btn-md.btn-custom.mt-3[href='/']", { oncreate: m.route.link }, "Return Home")
                            ])
                        )
                    )
                ])
            ),
            m(footer)
        ]);
    }
} as m.Component;
