import m, { Vnode } from "mithril";

const Store = {
  load(id: string) {
    const vm = this;
    m.request("https://api.quoine.com/products", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    }).then(function(res: any) {
      if (res.success) {
        console.log("success");
      } else {
        // TODO: add feedback so user would know he's been denied
        console.error("error", res);
        m.route.set("/server-error");
      }
    }).catch(function(err) {
      console.error("error", err);
      m.route.set("/server-error");
    });
  },
};

export default {
  view(vnode: Vnode) {
    return m(".col-lg-4", [
      m(".card-box", [
        m("h4.m-t-0.header-title", "Exchange Prices"),
        m("a.btn.btn-block.btn-info[href='/']", "BTC"),
        m("a.btn.btn-block.btn-info[href='/']", "ETH"),
        m("a.btn.btn-block.btn-info[href='/']", "XRP")
      ])
    ]);
  }
} as m.Component;
