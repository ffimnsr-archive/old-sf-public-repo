import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import Swal from "sweetalert2";

const Store = {
    ethImage: "",
    btcImage: "",

    load() {
        const vm = this;
        QRCode.toDataURL("0x90155f691b50da9b3ac32dd4f43b80c22aad7999", {
            errorCorrectionLevel: "H",
            version: 12,
        }, function(_err: any, url: string) {
            vm.ethImage = url;
        });

        QRCode.toDataURL("1NRR2pmfPqiSAb2cz6oXRqrCDXwoyQEVWt", {
            errorCorrectionLevel: "H",
            version: 12,
        }, function(_err: any, url: string) {
            vm.btcImage = url;
        });
    }
};


export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    view(_vnode: Vnode) {
        return m(".card-box", [
            m("h4.m-t-0.header-title", "Fund Your Account"),
            m("a.btn.btn-block.btn-custom.btn-primary[href='javascript:;']", {
                onclick: () => {
                    Swal({
                        title: "Ethereum",
                        html: `Scan the QRcode using your crypto wallet on your phone to fund your account.<br/><img src='${Store.ethImage}' alt="otp" /><br/>Wallet Address: 0x90155f691b50da9b3ac32dd4f43b80c22aad7999`,
                    });
                }
            }, [
                    m("i.mdi.mdi-currency-eth"),
                    "  Ethereum"
                ]),
            m("a.btn.btn-block.btn-custom.btn-warning[href='javascript:;']", {
                onclick: () => {
                    Swal({
                        title: "Bitcoin",
                        html: `Scan the QRcode using your crypto wallet on your phone to fund your account.<br/><img src='${Store.btcImage}' alt="otp" /><br/>Wallet Address: 1NRR2pmfPqiSAb2cz6oXRqrCDXwoyQEVWt`,
                    });
                }
            }, [
                    m("i.mdi.mdi-currency-btc"),
                    "  Bitcoin"
                ]),
            m("a.btn.btn-block.btn-custom[href='/top-up']", {
                oncreate: m.route.link
            }, [
                    m("i.mdi.mdi-currency-usd"),
                    "  Bank Transfer"
                ]),
        ]);
    }
} as m.Component;
