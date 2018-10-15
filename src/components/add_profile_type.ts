import investorAvatar from "images/investor.jpg";
import borrowerAvatar from "images/borrower.jpg";
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
    },
    setTypeHybrid: function() {
        localStorage.setItem("status", "step3-3");
        m.route.set("/");
    }
};

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
                                m("h3.mb-30.mt-20", "What type of account you want to use?"),
                                m("p.text-muted", [
                                    "Select the type of account you need, as this is a very critical phase as you won't have a chance to change this later."
                                ])
                            ]),
                            m(".mt-3",
                                m(".row", [
                                    m(".col-md-2"),
                                    m(".col-md-4",
                                        m(".price_card.text-center", [
                                            m(".pricing-header.bg-light", [
                                                m("img.img-fluid[alt='investor']", { src: investorAvatar }),
                                                m("span.price.text-dark", "Investor"),
                                                m("span.name.text-dark", "For people that want to invest money")
                                            ]),
                                            m("button.btn.btn-custom.waves-effect.waves-light.w-md", {
                                                onclick: Store.setTypeInvestor,
                                            }, "I'll be an Investor")
                                        ])
                                    ),
                                    m(".col-md-4",
                                        m(".price_card.text-center", [
                                            m(".pricing-header.bg-custom", [
                                                m("img.img-fluid[alt='borrower']", { src: borrowerAvatar }),
                                                m("span.price", "Borrower"),
                                                m("span.name", "For people who needs to borrow money")
                                            ]),
                                            m("button.btn.btn-custom.w-md.waves-effect.waves-light", {
                                                onclick: Store.setTypeBorrower,
                                            }, "I'll be a Borrower")
                                        ])
                                    ),
                                    m(".col-md-2"),
                                ])
                            ),
                            m(".text-center.mb-4", [
                                m(".text-muted", [
                                    "or do you want to become a an investor / borrower account ",
                                    m("a[href='javascript:;']", { onclick: Store.setTypeHybrid }, "click here!")
                                ]),
                            ])
                        ])
                    ),
                ])
            ),
            m(footer),
            m("div#snackbar"),
        ]);
    }
} as m.Component;
