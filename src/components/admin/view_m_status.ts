import { AppSettings } from "configs";
import moment from "moment";
import Swal from "sweetalert2";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    uid: "",
    status: "",
    remarks: "",

    canSave() {
        return true;
    },
    load() {

    },
    save() {
        const data = {
            user: {
                status: statusConvert(this.status),
                remarks: this.remarks,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + `/api/user/change-status/${this.uid}`, {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                Swal({
                    type: "success",
                    title: "Success!",
                    text: "Successfully updated account status!"
                });
            } else {
                Swal({
                    type: "success",
                    title: "Error Occurred!",
                    text: res.message
                });
            }
        }).catch(function(err) {
            Swal({
                type: "success",
                title: "Error Occurred!",
                text: err
            });
        });
    }
};

let options = [
    "Newly Submitted",
    "Pending",
    "Active",
    "Locked",
    "Rejected",
];

function statusConvert(v: string) {
    switch (v) {
        case "Newly Submitted": return "step1";
        case "Pending": return "pending";
        case "Active": return "okay";
        case "Locked": return "locked";
        case "Rejected": return "locked";
        default: return "okay";
    }
}

export default {
    oninit(_vnode: Vnode) {
        let uid = m.route.param("id");
        Store.uid = uid;
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;
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
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "Control Panel")
                                        ),
                                        m("li.breadcrumb-item.active", "Member Status")
                                    ])
                                ),
                                m("h4.page-title", "Member Status")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Member Status"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "Change members account status."
                                ]),

                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("div.form-group", [
                                            m("label.col-form-label", "Status"),
                                            m("p.text-muted", [
                                                `Changing status for account ID `,
                                                m("a", {
                                                    href: `/admin/view-m-account/${Store.uid}`,
                                                    oncreate: m.route.link
                                                }, m("b", `${Store.uid.slice(-6)}.`)),
                                            ]),
                                            m("select.form-control", {
                                                onchange: m.withAttr("value", (v: string) => { Store.status = v }),
                                            }, function() {
                                                let status = options.map(function(v: string) {
                                                    return m("option", v);
                                                });
                                                status.unshift(m("option[disabled][selected]", "Choose account status..."));
                                                return status;
                                            }()),
                                        ]),
                                        m("div.form-group", [
                                            m("label.col-form-label", "Remarks"),
                                            m("textarea.form-control[rows='3']", {
                                                onchange: m.withAttr("value", (v: string) => { Store.remarks = v })
                                            }),
                                        ]),
                                        m(".clearfix.text-right.mt-3",
                                            m("button.btn.btn-custom[type='submit']", {
                                                disabled: !Store.canSave()
                                            }, "Submit")
                                        )
                                    ]
                                )
                            ])
                        )
                    )
                ])
            ),
            m(footer),
        ]);
    }
}
