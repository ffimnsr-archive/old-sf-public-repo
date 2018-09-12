import { AppSettings } from "configs";
import moment from "moment";
import m, { Vnode } from "mithril";

const Store = {
    load() {

    },
};

let questions = [
    "Are you a Politically Exposed Person ('PEP') or a close associate of a PEP?",
    "Investor is aware of Singapore’s commitment to safeguarding its financial system from being used to harbor or launder tax evasion monies or proceeds from serious tax offences.",
    "Investor shall be responsible for his/her/its own tax affairs and hereby declare that you have never been convicted of any serious tax crimes, whether in Singapore or elsewhere.",
    "Monies which Investor shall use in investing on our Platform are from legitimate sources and will not be considered as proceeds of serious tax crimes in Singapore or elsewhere.",
    "Investor shall be solely responsible for any tax reporting obligation imposed by the any relevant tax authority.",
    "Investor is not a U.S. person and does not intend to be one",
    "Primary Tax Residency",
    "Other Tax Residency",
    "Has the Investor at any time pleaded guilty or have been found guilty of a criminal offence, or is currently a subject of any criminal investigation or inquiry in Singapore or elsewhere, in connection with financial transactions or investments of any kind?",
    "Has the Investor ever been subject to any inquiry or investigation by any relevant authority in Singapore or elsewhere? (Excluding routine regulatory inquiry or audit)",
    "Has the Investor been made subject of a court order in Singapore or elsewhere?",
    "Has the Investor been subject to any bankruptcy order or has been served with a bankruptcy petition in Singapore or elsewhere?",
    "Is the Investor currently involved in any legal proceedings in Singapore or elsewhere which would affect the investment?",
    "Has the Investor been refused banking or any other financial services by other institutions in Singapore or elsewhere?",
    "Source of Wealth",
    "Details",
];

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;
    },
    view(_vnode: Vnode) {
        return m(".tab-pane[id='kyc-details-b2']",
            [
                m("dl.row", questions.map(function(v: string) {
                    return [
                        m("dt.col-sm-10", v),
                        m("dd.col-sm-2", "None"),
                    ];
                }))
            ]
        );
    }
}
