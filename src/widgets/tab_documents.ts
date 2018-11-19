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
        return m(".tab-pane[id='documents-b2']",
            [
                m("div.form-group",
                    m("div.border.bg-light", { style: { height: "100em" } }, [
                        m("div.row", [
                            m(".col-lg-3.col-xl-2",
                                m(".file-man-box.bg-white",
                                    [
                                        m("a.file-close[href='']",
                                            m("i.mdi.mdi-close-circle")
                                        ),
                                        m(".file-img-box",
                                            m("img[alt='icon'][src='/images/avatar-1.png']")
                                        ),
                                        m("a.file-download[href='/images/avatar-1.png']",
                                            m("i.mdi.mdi-download")
                                        ),
                                        m(".file-man-title",
                                            [
                                                m("h5.mb-0.text-overflow", "investor.png"),
                                                m("p.mb-0",
                                                    m("small", "568.8 kb")
                                                )
                                            ]
                                        )
                                    ]
                                )
                            )
                        ]),
                    ]),
                ),
                m("div.form-group",
                    m("label.form-label", "File Request"),
                    m("select.form-control", [
                        m("option", "Identity Card"),
                        m("option", "Proof of Address"),
                        m("option", "NRIC"),
                        m("option", "Audited Accounts"),
                        m("option", "ACRA"),
                        m("option", "Notice of Assessment"),
                        m("option", "Bank Statement"),
                        m("option", "Ageing List Of The Company Signed By The Directors"),
                        m("option", "Invoice"),
                    ]),
                ),
                m("div.form-group", [
                    m("button.btn.btn-info", "Request Upload"),
                ]),
                m("div.form-group",
                    m("label.form-label", "Custom Message"),
                    m("textarea.form-control[rows=5]"),
                ),
                m("div.form-group", [
                    m("button.btn.btn-info", "Send Email"),
                ]),
            ]
        );
    }
}
