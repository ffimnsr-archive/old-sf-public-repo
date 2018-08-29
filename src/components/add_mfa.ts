
import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";

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
                    m.redraw();
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
    skip() {
        localStorage.setItem("status", "pending");
        m.route.set("/");
    },
    save() {
        const data = {
            user: {
                status: "step5",
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
                Utils.showSnackbar("Invalid Key Code");
            }
        }).catch(function(err) {
            console.error("error", err);
            m.route.set("/server-error");
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
                                    m("div.col-md-6", [
                                        m("p", "To enable additional security multi-factor authentication:"),
                                        m("ol", [
                                            m("li", "Download and install a multi-factor authentication app (e.g. Google Authenticator, Microsoft Authenticator, YaKey, Auth0, etc.)."),
                                            m("li", "Open and scan the qrcode that you see on the right side."),
                                            m("li", "Then, enter the 6 digit code generated on the input box."),
                                        ]),
                                    ]),
                                    m("div.col-md-6", [
                                        Store.otpImage !== "" ? m("img.mx-auto.d-block[alt='mfa-key']", { src: Store.otpImage }) : null,
                                        m(".clearfix.text-center.mt-3", [
                                            m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                                                onclick: (e: Event) => {
                                                    Store.reload();
                                                    e.preventDefault();
                                                },
                                            }, "Click Here to Generate 2-Factor Authentication Key")
                                        ]),
                                        Store.secretKey !== "" ? m("div.form-group.col-md-12.mt-4", [
                                            m("label.col-form-label", "Enter 6 digit token"),
                                            m("input.form-control[type='text'][placeholder='Token']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.tokenInput = v }),
                                                value: Store.tokenInput
                                            })
                                        ]) : null,
                                    ]),
                                ]),
                                m(".col-md-12.clearfix.text-right.mt-3", [
                                    m("button.btn.btn-custom.waves-effect.waves-light.mr-2[type='button']", {
                                        onclick: Store.skip,
                                    }, "Skip"),
                                    m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
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
