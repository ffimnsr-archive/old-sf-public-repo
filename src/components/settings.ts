
import { AppSettings } from "configs";
import m, { Vnode } from "mithril";
import Swal from "sweetalert2";
import footer from "widgets/footer";
import header from "widgets/header";
import { Utils } from "../utils";

const Store = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",

    canSave: function() {
        return this.oldPassword !== "" &&
            this.newPassword !== "" &&
            this.confirmNewPassword !== "";
    },
    save: function() {
        const data = {
            user: {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmNewPassword: this.confirmNewPassword,
            }
        };

        const token = localStorage.getItem("token")!;
        const vm = this;

        if (this.newPassword !== this.confirmNewPassword) {
            Utils.showSnackbar("New password and confirm password not equal.");
        } else {
            m.request(AppSettings.API_BASE_URL + "/api/user/change-password", {
                method: "PUT",
                data: data,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Token ${token}`,
                }
            }).then(function(res: any) {
                if (res.success) {
                    vm.oldPassword = "";
                    vm.newPassword = "";
                    vm.confirmNewPassword = "";

                    Swal({
                        title: "Success!",
                        text: "You have successfully changed your password!",
                        type: "success",
                        confirmButtonClass: "btn btn-confirm mt-2"
                    });
                } else {
                    vm.oldPassword = "";
                    Utils.showSnackbar(res.message);
                }
            }).catch(function(err) {
                vm.oldPassword = "";
                Utils.showSnackbar(err);
            });
        }
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
                                        m("li.breadcrumb-item.active", "Change Password")
                                    ])
                                ),
                                m("h4.page-title", "Change Password"),
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Change Password"),
                                m("p.text-muted.font-14.m-b-10", "Edit your security info."),
                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-row", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Old Password"),
                                                m("input.form-control[type='password'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.oldPassword = v }),
                                                    value: Store.oldPassword
                                                })
                                            ]),
                                        ]),
                                        m("div.form-row", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "New Password"),
                                                m("input.form-control[type='password'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.newPassword = v }),
                                                    value: Store.newPassword
                                                })
                                            ]),
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Confirm New Password"),
                                                m("input.form-control[type='password'][placeholder='']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.confirmNewPassword = v }),
                                                    value: Store.confirmNewPassword
                                                })
                                            ]),
                                        ]),
                                        m(".clearfix.text-right.mt-3", [
                                            m("a.btn.btn-light.waves-effect.waves-light.mr-2[href='/']", {
                                                oncreate: m.route.link,
                                            }, "Go Back"),

                                            m("button.btn.btn-custom.waves-effect.waves-light[type='submit']", {
                                                disabled: !Store.canSave()
                                            }, "Change Password")
                                        ])
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
