import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";
import Swal from "sweetalert2";

const Store = {
    todo: "",
    description: "",

    load() {
        const token = localStorage.getItem("token")!;
        const vm = this;
    },
    canSave() {
        return this.todo !== "" && this.description !== "";
    },
    save() {
        const data = {
            user: {
                todo: this.todo,
                description: this.description,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/new-inquiry", {
            method: "POST",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                Utils.showSnackbar(res.success);
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    }
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {

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
                                        m("li.breadcrumb-item.active", "Inquiry")
                                    ])
                                ),
                                m("h4.page-title", "Inquiry")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Inquiry"),
                                m("p.text-muted", "Sell your invoice to get loans."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "To Do:"),
                                            m("input.form-control[type='text'][placeholder='']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.todo = v }),
                                                value: Store.todo
                                            })
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Description"),
                                            m("textarea.form-control[placeholder='']", {
                                                oninput: m.withAttr("value", (v: string) => { Store.description = v }),
                                                value: Store.description
                                            })
                                        ]),
                                        m(".clearfix.text-right.mt-3",
                                            m("button.btn.btn-custom.waves-effect.waves-light[type='submit']", {
                                                disabled: !Store.canSave()
                                            }, "Submit")
                                        )
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
