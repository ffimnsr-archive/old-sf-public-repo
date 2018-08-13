import m, { Vnode } from "mithril";

export default {
  view(vnode: Vnode) {
    return m(".col-lg-4", [
      m(".card-box", [
        m("h4.m-t-0.header-title", "Fund Your Account"),
        m("a.btn.btn-block.btn-info[href='/']", "Ethereum"),
        m("a.btn.btn-block.btn-info[href='/']", "Bitcoin"),
        m("a.btn.btn-block.btn-info[href='/']", "Paypal")
      ])
    ]);
  }
} as m.Component;
