import m, { Vnode } from "mithril";

export default {
  view(vnode: Vnode) {
    return m("div.modal#status[tabindex='-1'][role='dialog']",
      m("div.modal-dialog.modal-dialog-centered[role='document']",
        m("div.modal-content", [
          m("div.modal-header", [
            m("h5.modal-title", "Update Status"),
            m("button.close[type='button'][data-dismiss='modal'][aria-label='Close']",
              m("span[aria-hidden='true']", '×')
            )
          ]),
          m("div.modal-body", [
            m("form", [
              m("div.form-group", [
                m("label", "What Status?"),
                m("select.form-control", [
                  m("option", "okay"),
                  m("option", "pending"),
                  m("option", "rejected")
                ])
              ])
            ])
          ]),
          m("div.modal-footer", [
            m("button.btn.btn-primary", "Save changes"),
            m("button.btn.btn-secondary[data-dismiss='modal']", "Close")
          ])
        ])
      )
    );
  }
} as m.Component;
