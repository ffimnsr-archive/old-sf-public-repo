import m, { Vnode } from "mithril";

export default {
  view(_vnode: Vnode) {
    return m("footer.footer",
      m(".container",
        m(".row", [
          m(".col-12.text-center", [
            "2018 © SmartFunding | ",
            m("a[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
          ])
        ])
      )
    );
  }
} as m.Component;
