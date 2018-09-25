import { AppSettings } from "configs";
import moment from "moment";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

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
        return m(".sf-root", [
            m(header),
            m(".wrapper",
                m(".container-fluid", [
                    m(".row",
                        m(".col-sm-12",
                            m(".page-title-box", [
                                m(".btn-group.pull-right",
                                    m("ol.breadcrumb.hide-phone.p-0.m-0", [
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                                        ),
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "Control Panel")
                                        ),
                                        m("li.breadcrumb-item.active", "Wallet Configurations")
                                    ])
                                ),
                                m("h4.page-title", "Wallet Configurations")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("div.form-group", [
                                    m("label", "Ethereum Address"),
                                    m("input.form-control[type='text'][value='0x90155f691b50da9b3ac32dd4f43b80c22aad7999'][disabled]")
                                ]),
                                m("div.form-group", [
                                    m("label", "Bitcoin Address"),
                                    m("input.form-control[type='text'][value='1NRR2pmfPqiSAb2cz6oXRqrCDXwoyQEVWt'][disabled]")
                                ])
                            ]),
                        )
                    )
                ])
            ),
            m(footer),
        ]);
    }
}
