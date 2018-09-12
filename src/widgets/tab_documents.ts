import { AppSettings } from "configs";
import moment from "moment";
import m, { Vnode } from "mithril";

const Store = {
    load() {

    },
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;
    },
    view(_vnode: Vnode) {
        return m(".tab-pane[id='documents-b2']",
            [
                m("span.border")
            ]
        );
    }
}
