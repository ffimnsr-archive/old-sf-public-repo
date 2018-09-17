import { AppSettings } from "configs";
import moment from "moment";
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
        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + "/api/log/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        return [];
                    }
                },
                dom: "Bfrtip",
                buttons: [
                    {
                        text: "Export to Excel",
                        action: function(e: any, dt: any, node: any, config: any) {

                        }
                    },
                ],
                columns: [
                    { data: "investment", width: "20%" },
                    { data: "application" },
                    { data: "amount" },
                    { data: "status" },
                    { data: "remarks" },
                    { data: "confirmedBy" },
                    { data: "confirmedDate" },
                    { data: "createdAt" },
                    { data: "button" },
                ]
            });
        });
    },
    view(_vnode: Vnode) {
        return m(".tab-pane[id='investment-b2']",
            [
                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                    m("thead",
                        m("tr", [
                            m("th", "Investment ID"),
                            m("th", "Application ID"),
                            m("th", "Amount"),
                            m("th", "Status"),
                            m("th", "Remarks"),
                            m("th", "Confirmed By"),
                            m("th", "Confirmed Date"),
                            m("th", "Created Date"),
                            m("th", "Action"),
                        ])
                    ),
                    m("tfoot", [
                        m("tr", [
                            m("th", "Investment ID"),
                            m("th", "Application ID"),
                            m("th", "Amount"),
                            m("th", "Status"),
                            m("th", "Remarks"),
                            m("th", "Confirmed By"),
                            m("th", "Confirmed Date"),
                            m("th", "Created Date"),
                            m("th", "Action"),
                        ]),
                    ])
                ])
            ]
        );
    }
}
