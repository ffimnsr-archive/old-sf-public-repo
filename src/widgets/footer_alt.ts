import m, { Vnode } from "mithril";

export default {
  view(vnode: Vnode) {
    return m(".m-t-40.text-center",
      m("p.account-copyright", [
        "2018 © Smartfunding | ",
        m("a[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
      ])
    );
  }
} as m.Component;
