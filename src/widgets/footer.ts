import m, { Vnode } from "mithril";

export default {
  view(vnode: Vnode) {
    return m("footer.footer",
      m(".container",
        m(".row", [
          m(".col-12.text-center", [
            "2018 © SmartFunding | ",
            m("a[href='/#!/privacy']", "Privacy Policy")
          ])
        ])
      )
    );
  }
} as m.Component;
