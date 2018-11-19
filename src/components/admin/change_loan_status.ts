import m, { Vnode } from "mithril";
import Swal from "sweetalert2";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import { AppSettings } from "../../configs";
import footer from "../../widgets/footer";
import header from "../../widgets/header";

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
            loan: {
                status: statusConvert(this.status),
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + `/api/loan/change-status/${this.uid}`, {
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
                    text: "Successfully updated loan status!"
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
    "Pending",
    "Active",
    "Disabled",
];

function statusConvert(v: string) {
    switch (v) {
        case "Pending": return "pending";
        case "Active": return "active";
        case "Disabled": return "disabled";
        default: return "active";
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
                                        m("li.breadcrumb-item.active", "Loan Status")
                                    ])
                                ),
                                m("h4.page-title", "Loan Status")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Loan Status"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "Change loan status."
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
                                                `Changing status for loan ID `,
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
                                                status.unshift(m("option[disabled][selected]", "Choose loan status..."));
                                                return status;
                                            }()),
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
