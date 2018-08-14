import m, { Vnode } from "mithril";

import header from "widgets/header";
import footer from "widgets/footer";

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
                    m("li.breadcrumb-item.active", "FAQ")
                  ])
                ),
                m("h4.page-title", "FAQ")
              ])
            )
          ),
          m(".row",
            m(".col-sm-12",
              m(".text-center", [
                m("h3[class='']", "Frequently Asked Questions"),
                m("p.text-muted", [
                  "Here you can find the most frequently ask question. If you can't find your answer here",
                  m("br"),
                  "you can contact us by any means using the links below:"
                ]),
                m("button.btn.btn-success.waves-effect.waves-light.m-t-10[type='button']", "Email us your question"),
                " ",
                m("button.btn.btn-primary.waves-effect.waves-light.m-t-10[type='button']", "Send us a tweet")
              ])
            )
          ),
          m(".row.m-t-50.pt-3", [
            m(".col-lg-5.offset-lg-1", [
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question[data-wow-delay='.1s']", "I want to change my SmartFunding account details. How do I do this? ?"),
                m("p.answer",
                  "The best way at the moment is to send an email to hi@smartfunding.sg. We are implementing more features on our platform over time, so you will be able to change your basic profile there as well."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question", "I forgot my SmartFunding account password. How do I retrieve and/or change it?"),
                m("p.answer",
                  "You can change it by clicking on \"Forgot your password\" on the login page. You will receive an email to reset your password after."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question", "I want to close my SmartFunding account. How do I go about doing it?"),
                m("p.answer",
                  "You can send an email to hi@smartfunding.sg with your name and Investor ID and we will close the account for you."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question[data-wow-delay='.1s']", "Can I own multiple SmartFunding accounts?"),
                m("p.answer",
                  "No, you can currently only own one investor account and one borrower account with SmartFunding each."
                )
              ])
            ]),
            m(".col-lg-5", [
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question", "What is SmartFunding?"),
                m("p.answer",
                  "We are a fintech (finance technology) company that connect investors and fund seekers. We offer alternative short-term financing options for businesses, with 100% focus on SMEs and startups."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question", "Is SmartFunding regulated by the Monetary Authority of Singapore?"),
                m("p.answer",
                  "The invoice financing services provided and/or offered by SmartFunding is not licensed or regulated by the Monetary Authority of Singapore (MAS). It is not governed by the Securities and Futures Act (Cap. 289), Moneylenders Act (Cap. 188) or the Banking Act (Cap 19).SmartFunding has applied for a Capital Markets Services License to conduct the regulated activity of Dealing in Securities. SmartFunding has obtained in-principle approval for the license by MAS in April 2017. The full license, however, will only be awarded once we have complied with several conditions set by MAS."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question", "Is there a maximum amount I can put in my Investor Wallet?"),
                m("p.answer",
                  "There is no maximum amount Investors can top up. However, even with our growing volume of transactions, we recommend to invest prudently since we are still a new platform. Investors should also be aware that uninvested funds in their Investor Wallet will not give them any interest."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question", "How do I know that my non-invested capital is safe with SmartFunding?"),
                m("p.answer",
                  "We have layers of security that ensure the protection of our customers' funds. Escrow Account. We have partnered with Vistra and created an Escrow account for monies transferred by our Investors and Invoice Sellers. If SmartFunding must cease its operations, monies held in the Escrow account will not be liable to payments owed by the company."
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
