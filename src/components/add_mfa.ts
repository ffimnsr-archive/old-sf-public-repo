import { AppSettings } from "../configs";
import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import Swal from "sweetalert2";
import footer from "../widgets/footer";
import header from "../widgets/header";
import { Utils } from "../utils";
// import qrph from "images/click_button_below.png";

const Store = {
    secretKey: "hello",
    otpUrl: "",
    otpImage: "",

    tokenInput: "",

    reload() {
        const token = localStorage.getItem("token")!;
        const vm = this;
        m.request(AppSettings.API_BASE_URL + "/api/user/generate-mfa", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                vm.secretKey = res.secretKey;
                vm.otpUrl = res.otpUrl;

                QRCode.toDataURL(vm.otpUrl, {
                    errorCorrectionLevel: "H",
                    version: 12,
                }, function(_err: any, url: string) {
                    vm.otpImage = url;

                    let steps = [
                        {
                            title: "Scan Multi-factor QRcode",
                            html: `Scan the QRcode using your phone to enable 2FA.<br/><img src='${vm.otpImage}' alt="otp" /><br/>Secret Key: ${vm.secretKey}`,
                        },
                        {
                            title: "Input Generated 2FA Key",
                            html: `Enter the 2FA generated key that can be found in your phone.<br/>` +
                                `<input id="swal-input1" type="text" class="swal2-input">`,
                            preConfirm: function() {
                                return new Promise(function(resolve) {
                                    resolve([
                                        (<HTMLInputElement>document!.getElementById("swal-input1")).value,
                                    ]);
                                });
                            }
                        }
                    ];

                    Swal.mixin({
                        confirmButtonText: "Next",
                        showCancelButton: true,
                        progressSteps: ["1", "2"]
                    }).queue(steps).then(function(result) {
                        if (result.value) {
                            Store.tokenInput = result.value[1][0];
                            Swal({
                                type: "success",
                                title: "All done!",
                                html: "Now all you need is to click <b>SUBMIT</b> to enable 2FA in your account.",
                                confirmButtonText: "Lovely!",
                                showCancelButton: false
                            });
                        }
                    }).catch(Swal.noop);
                });
            } else {
                Utils.showSnackbar("Error on generating key code.");
            }
        }).catch(function(err) {
            Utils.showSnackbar("Error on generating key code.");
        });
    },
    canSave() {
        return this.secretKey !== "";
    },
    cold() {

    },
    skip() {
        const data = {
            user: {
                status: "step6",
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/set-status", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                localStorage.setItem("status", "pending");
                m.route.set("/");
            } else {
                Swal({
                    title: "Error Occurred!",
                    type: "error",
                    text: res.message,
                });
            }
        }).catch(function(err) {
            Swal({
                title: "Error Occurred!",
                type: "error",
                text: err,
            });
        });

    },
    save() {
        const data = {
            user: {
                status: "step6",
                secretKey: Store.secretKey,
                tokenInput: Store.tokenInput,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/validate-mfa", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                localStorage.setItem("status", "pending");
                m.route.set("/");
            } else {
                Swal({
                    title: "Error Occurred!",
                    type: "error",
                    text: "You've entered an invalid key code.",
                });
            }
        }).catch(function(err) {
            Swal({
                title: "Error Occurred!",
                type: "error",
                text: err,
            });
        });
    }
};

export default {
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
                                        m("li.breadcrumb-item.active", "Additional Security Settings")
                                    ])
                                ),
                                m("h4.page-title", "Additional Security Settings")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Multi-factor Authentication"),
                                m("div.row", [
                                    m("div.col-12", [
                                        m("p", [
                                            m("b", "Additional Security : "),
                                            "To enable a multi-factor authentication:"
                                        ]),
                                        m("ol", [
                                            m("li", "Download and install a multi-factor authentication app (e.g. Google Authenticator, Microsoft Authenticator, YaKey, Auth0, etc.)."),
                                            m("li", "Open and scan the qrcode that you see on the right side."),
                                            m("li", "Then, enter the 6 digit code generated on the input box."),
                                        ]),
                                        m("p", "Click below to generate 2FA keys."),
                                    ]),
                                    m("div.col-12", [
                                        m(".clearfix.mt-3", [
                                            m("button.btn.btn-custom[type='button']", {
                                                onclick: (e: Event) => {
                                                    Store.reload();
                                                    e.preventDefault();
                                                },
                                            }, "Generate Two-Factor Authentication Key")
                                        ]),
                                    ]),
                                ]),
                                m(".col-md-12.clearfix.text-right.mt-3", [
                                    m("button.btn.mr-2[type='button']", {
                                        onclick: Store.skip,
                                    }, "Skip"),
                                    m("button.btn.btn-custom[type='button']", {
                                        onclick: Store.save,
                                    }, "Submit")
                                ])
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
