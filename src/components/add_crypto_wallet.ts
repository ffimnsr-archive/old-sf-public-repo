import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";
import Web3 from "web3";

const Store = {
    ethAddress: "",
    btcAddress: "",

    canSave() {
        return this.ethAddress !== "" || this.btcAddress !== "";
    },

    save() {
        const data = {
            user: {
                ethAddress: this.ethAddress,
                btcAddress: this.btcAddress,
                status: "step5",
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/details", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                localStorage.setItem("status", "step6");
                m.route.set("/");
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    }
};

export default {
    oncreate(_vnode: Vnode) {
        if (typeof window["web3"] !== "undefined") {
            let defaultAccount = window["web3"].eth.defaultAccount;
            let web3 = new Web3(window["web3"].currentProvider);
            Store.ethAddress = defaultAccount;
            m.redraw();
        } else {
            console.log("No web3? Try MetaMask!");
        }
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
                                        m("li.breadcrumb-item", m("a[href='/']", { oncreate: m.route.link }, "Account Setup")),
                                        m("li.breadcrumb-item.active", "Crypto Wallet")
                                    ])
                                ),
                                m("h4.page-title", "Crypto Wallet")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Crypto Wallet"),
                                m("p.text-muted.font-14.m-b-10", "We would like to get your wallet public address in order for us to easily process receiving and sending of payments."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "Ethereum Wallet Address"),
                                            m("input.form-control[type='text'][placeholder='e.g. 0x90155f691b50da9b3ac32dd4f43b80c22aad7999']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.ethAddress = v }),
                                                value: Store.ethAddress
                                            }),
                                            m("p.text-muted.m-t-5", [
                                                m("b", "NOTE : "),
                                                "This will auto-detect address if you have MetaMask installed and unlocked."
                                            ])
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Bitcoin Wallet Address"),
                                            m("input.form-control[type='text'][placeholder='e.g. 15a3JRVLot7dVgBqa1GcXwC7wx3yf4dw1P']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.btcAddress = v }),
                                                value: Store.btcAddress
                                            })
                                        ]),
                                        m(".clearfix.text-right.mt-3",
                                            m("button.btn.btn-custom.waves-effect.waves-light[type='submit']", "Submit")
                                        ),
                                    ]),
                            ])
                        )
                    )
                ])
            ),
            m(footer),
            m("div#snackbar"),
        ]);
    }
} as m.Component;
