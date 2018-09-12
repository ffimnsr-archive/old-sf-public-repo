import { AppSettings } from "configs";
import moment from "moment";
import m, { Vnode } from "mithril";

const Store = {
    companyName: "None",
    registrationNo: "None",
    paidUpCapital: "None",
    revenue: "None",
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
        return m(".tab-pane[id='company-b2']",
            [
                m("dl.row", [
                    m("dt.col-sm-3", "Company Name"),
                    m("dd.col-sm-9", "None"),
                    m("dt.col-sm-3", "Registration No."),
                    m("dd.col-sm-9", Store.registrationNo),
                    m("dt.col-sm-3", "Paid Up Capital"),
                    m("dd.col-sm-9", Store.paidUpCapital),
                    m("dt.col-sm-3", "Revenue (Last Audited Financial Year)"),
                    m("dd.col-sm-9", Store.revenue),
                ])
            ]
        );
    }
}
