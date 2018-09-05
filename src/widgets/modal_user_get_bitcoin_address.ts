import m, { Vnode } from "mithril";

export default {
    view(_vnode: Vnode) {
        return m("div.modal#get-bitcoin-address[tabindex='-1'][role='dialog']",
            m("div.modal-dialog.modal-dialog-centered[role='document']",
                m("div.modal-content", [
                    m("div.modal-header", [
                        m("h5.modal-title", "Bitcoin Address"),
                        m("button.close[type='button'][data-dismiss='modal'][aria-label='Close']",
                            m("span[aria-hidden='true']", '×')
                        )
                    ]),
                    m("div.modal-body", [
                        m("form", [
                            m("div.form-group", [
                                m("label", "What's the account KYC (Know Your Customer) status?"),
                                m("select.form-control", [
                                    m("option", "Pending"),
                                    m("option", "Okay"),
                                    m("option", "Rejected")
                                ])
                            ]),
                        ])
                    ]),
                    m("div.modal-footer", [
                        m("button.btn.btn-primary", "Okay"),
                    ])
                ])
            )
        );
    }
} as m.Component;
