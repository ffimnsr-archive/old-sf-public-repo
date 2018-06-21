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
                    m("li.breadcrumb-item",
                      m("a[href='#']", "SmartFunding")
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
                  "Nisi praesentium similique totam odio obcaecati, reprehenderit,\
                                    dignissimos rem temporibus ea inventore alias!",
                  m("br"),
                  "Beatae animi nemo ea\
                                    tempora, temporibus laborum facilis ut!"
                ]),
                m("button.btn.btn-success.waves-effect.waves-light.m-t-10[type='button']",
                  "Email us your question"
                ),
                m("button.btn.btn-primary.waves-effect.waves-light.m-t-10[type='button']",
                  "Send us a tweet"
                )
              ])
            )
          ),
          m(".row.m-t-50.pt-3", [
            m(".col-lg-5.offset-lg-1", [
              m("div", [
                m(".question-q-box",
                  "Q."
                ),
                m("h4.question[data-wow-delay='.1s']",
                  "What is Lorem Ipsum?"
                ),
                m("p.answer",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                )
              ]),
              m("div", [
                m(".question-q-box",
                  "Q."
                ),
                m("h4.question",
                  "Why use Lorem Ipsum?"
                ),
                m("p.answer",
                  "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
                )
              ]),
              m("div", [
                m(".question-q-box",
                  "Q."
                ),
                m("h4.question",
                  "How many variations exist?"
                ),
                m("p.answer",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                )
              ]),
              m("div", [
                m(".question-q-box",
                  "Q."
                ),
                m("h4.question[data-wow-delay='.1s']",
                  "What is Lorem Ipsum?"
                ),
                m("p.answer",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                )
              ])
            ]),
            m(".col-lg-5", [
              m("div", [
                m(".question-q-box",
                  "Q."
                ),
                m("h4.question",
                  "Is safe use Lorem Ipsum?"
                ),
                m("p.answer",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question",
                  "When can be used?"
                ),
                m("p.answer",
                  "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
                )
              ]),
              m("div", [
                m(".question-q-box", "Q."),
                m("h4.question", [
                  "License ",
                  m.trust("&amp;"),
                  " Copyright"
                ]),
                m("p.answer",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                )
              ]),
              m("div", [
                m(".question-q-box",
                  "Q."
                ),
                m("h4.question",
                  "Is safe use Lorem Ipsum?"
                ),
                m("p.answer",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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
