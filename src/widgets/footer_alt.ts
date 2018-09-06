import m, { Vnode } from "mithril";

export default {
    view(_vnode: Vnode) {
        return m(".m-t-40.text-center",
            m("p.account-copyright.text-muted", [
                "2018 © Smartfunding | ",
                m("a.text-muted[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
            ])
        );
    }
} as m.Component;
