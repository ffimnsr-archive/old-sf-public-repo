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
        return m(".tab-pane[id='summary-b2']",
            [
                m("dl.row", [
                    m("dt.col-sm-3", "Wallet Amount"),
                    m("dd.col-sm-9", "USD 0.00"),
                    m("dt.col-sm-3", "Last Transfer Date"),
                    m("dd.col-sm-9", "None"),
                    m("dt.col-sm-3", "Last Invest Date"),
                    m("dd.col-sm-9", "None"),
                    m("dt.col-sm-3", "Current Deals"),
                    m("dd.col-sm-9", "USD 0.00"),
                    m("dt.col-sm-3", "Previous Deals"),
                    m("dd.col-sm-9", "USD 0.00"),
                    m("dt.col-sm-3", "Current Approved Deals"),
                    m("dd.col-sm-9", "USD 0.00"),
                ])
            ]
        );
    }
}
