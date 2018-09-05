import { AppSettings } from "configs";
import Dropzone from "dropzone";
import $ from "jquery";
import "jquery-slimscroll";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import "../../node_modules/dropzone/dist/dropzone.css";

const Store = {
    continue: function() {
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
        $(".navbar-toggle").on("click", function(_e: Event) {
            $(this).toggleClass("open");
            $("#navigation").slideToggle(400);
        });

        $(".navigation-menu>li").slice(-2).addClass("last-elements");

        $(".navigation-menu li.has-submenu a[href='#']").on("click", function(e: Event) {
            if ($(window).width()! < 992) {
                e.preventDefault();
                $(this).parent("li").toggleClass("open").find(".submenu:first").toggleClass("open");
            }
        });

        $(".slimscroll").slimScroll({
            height: "auto",
            position: "right",
            size: "8px",
            color: "#9ea5ab"
        });

        Dropzone.autoDiscover = false;
    },
    oncreate(_vnode: Vnode) {
        const dropzone = new Dropzone("form#dropzone", {
            url: "#",
            dictDefaultMessage: "Drag n drop or tap here",
            method: "PUT",
            parallelUploads: 3,
            uploadMultiple: false,
            paramName: "file",
            maxFiles: 5,
            autoProcessQueue: true,

            sending(file: Dropzone.DropzoneFile, xhr: XMLHttpRequest) {
                let _send = xhr.send;
                xhr.send = function() {
                    _send.call(xhr, file);
                };
            },
            accept(file: Dropzone.DropzoneFile, done: (error?: string) => void) {
                const params = {
                    filename: file.name,
                    filetype: file.type,
                };

                $.getJSON(AppSettings.API_BASE_URL + "/api/uploader", params)
                    .done(function(data: any) {
                        if (!data.signedRequest) {
                            return done("failed to receive an upload url");
                        }

                        (<any>file).signedRequest = data.signedRequest,
                            (<any>file).finalURL = data.downloadURL;
                        done();
                    }).fail(function() {
                        return done("failed to receive an upload url");
                    });
            },
        });

        dropzone.on("processing", function(file: Dropzone.DropzoneFile) {
            (<any>dropzone).options.url = (<any>file!).signedRequest;
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
                                m("form.dropzone.mb-3[id='dropzone']",
                                    m(".fallback",
                                        m("input[multiple][name='file'][type='file']")
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
