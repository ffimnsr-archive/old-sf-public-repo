import investorAvatar from "images/investor.png";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    setTypeInvestor: function() {
        localStorage.setItem("status", "step3-1");
        m.route.set("/");
    },
    setTypeBorrower: function() {
        localStorage.setItem("status", "step3-2");
        m.route.set("/");
    }
};

export default {
    oninit(_vnode: Vnode) {

    },
    oncreate(_vnode: Vnode) {

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
                                        m("li.breadcrumb-item.active", "Account Type")
                                    ])
                                ),
                                m("h4.page-title", "Account Type")
                            ])
                        )
                    ),

                    m(".row.justify-content-center",
                        m(".col-xl-10", [
                            m(".text-center", [
                                m("h3.m-b-30.m-t-20", "Choose your account type"),
                                m("p.text-muted", [
                                    ""
                                ])
                            ]),
                            m(".mt-3",
                                m(".row", [
                                    m(".col-md-6",
                                        m(".price_card.text-center", [
                                            m(".pricing-header.bg-light", [
                                                m("img.img-fluid[alt='investor']", { src: investorAvatar }),
                                                m("span.price.text-dark", "Investor"),
                                                m("span.name.text-dark", "For people that want to invest money")
                                            ]),
                                            m("button.btn.btn-custom.waves-effect.waves-light.w-md", {
                                                onclick: Store.setTypeInvestor,
                                            }, "Select")
                                        ])
                                    ),
                                    m(".col-md-6",
                                        m(".price_card.text-center", [
                                            m(".pricing-header.bg-custom", [
                                                m("img.img-fluid[alt='borrower']", { src: investorAvatar }),
                                                m("span.price", "Borrower"),
                                                m("span.name", "For people who needs to borrow money")
                                            ]),
                                            m("button.btn.btn-custom.w-md.waves-effect.waves-light", {
                                                onclick: Store.setTypeBorrower,
                                            }, "Select")
                                        ])
                                    ),
                                ])
                            )
                        ])
                    )
                ])
            ),
            m(footer),
            m("div#snackbar"),
        ]);
    }
} as m.Component;
