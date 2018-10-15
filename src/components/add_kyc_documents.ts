import { AppSettings } from "configs";
import Dropzone from "dropzone";
import $ from "jquery";
import "jquery-slimscroll";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import "../../node_modules/dropzone/dist/dropzone.css";

const Store = {
    load() {

    },
    continue() {
        const data = {
            user: {
                status: "step4",
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/kyc-documents", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                localStorage.setItem("status", "step5");
                m.route.set("/");
            } else {
                // TODO: add feedback so user would know he's been denied
                console.error("error", res);
                m.route.set("/server-error");
            }
        }).catch(function(err) {
            console.error("error", err);
            m.route.set("/server-error");
        });
    }
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
        Dropzone.autoDiscover = false;
    },
    oncreate(_vnode: Vnode) {
        const dropzone = new Dropzone("form#dropzone", {
            url: AppSettings.API_BASE_URL + "/api/uploader",
            dictDefaultMessage: "Drag n drop or tap here",
            method: "POST",
            parallelUploads: 4,
            addRemoveLinks: true,
            paramName: "documents",
            maxFiles: 16,
            autoProcessQueue: true,
        });
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
                                        m("li.breadcrumb-item.active", "Upload Verification Documents")
                                    ])
                                ),
                                m("h4.page-title", "Upload Verification Documents")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "KYC Documents"),
                                m("p.text-muted.font-14.m-b-10", [
                                    "Upload your KYC Documents (e.g. Government ID Cards, Proof of Billing).",
                                    m("br"),
                                    "Here are the complete list of documents you can submit."
                                ]),
                                m("p.text-muted.font-14", "Required Documents (Investor)"),
                                m("ul", [
                                    m("li.text-muted.font-14", "Goverment Issued ID"),
                                    m("li.text-muted.font-14", "Proof of Investment / Bank Statements"),
                                ]),
                                m("p.text-muted.font-14", "Required Documents (Borrower)"),
                                m("ul", [
                                    m("li.text-muted.font-14", "Goverment Issued ID"),
                                    m("li.text-muted.font-14", "NRIC"),
                                    m("li.text-muted.font-14", "Bank Statements"),
                                    m("li.text-muted.font-14", "Audited Accounts"),
                                    m("li.text-muted.font-14", "Invoices"),
                                ]),
                                m("p.text-muted.font-14", "Supplementary Documents"),
                                m("ul", [
                                    m("li.text-muted.font-14", "Water / Electricity Bill"),
                                    m("li.text-muted.font-14", "Secondary and Tertiary IDs (e.g. Company)"),
                                    m("li.text-muted.font-14", "Lease Contract"),
                                ]),
                                m("p.text-muted.font-14", "Kindly, drag and drop all the required and 1 to 2 supplementary documents in the dropzone below."),
                                m("form.dropzone.mb-3[id='dropzone'][method='post'][enctype='multipart/form-data']",
                                    m(".fallback",
                                        m("input[multiple][name='documents'][type='file']")
                                    )
                                ),
                                m("p.text-muted.font-14", [
                                    "By clicking ",
                                    m("b", "\"submit\""),
                                    ", you signify that all the documents you have submitted are valid."
                                ]),
                                m(".clearfix.text-right.mt-3",
                                    m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                                        onclick: Store.continue,
                                    }, "Submit")
                                )
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
