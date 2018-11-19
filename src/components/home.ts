import m, { Vnode } from "mithril";

import { AppSettings } from "../configs";
// import QRCode from "qrcode";
// import jwtDecode from "jwt-decode";
import Chartist, { IChartistLineChart } from "chartist";
import "chartist/dist/chartist.css";
// import Swal from "sweetalert2";
import { Auth } from "../auth";
import moment from "moment";
import "jquery-countdown";

import header from "../widgets/header";
import footer from "../widgets/footer";
import panelExchangePrices from "../widgets/panel_exchange_prices";
import panelShowWalletAddresses from "../widgets/panel_show_wallet_addresses";

const Store = {
    chartist: {},
    interval: {},
    ws: {},
};

export default {
    oninit(_vnode: Vnode) {

    },
    oncreate(_vnode: Vnode) {

        Store.chartist = new Chartist.Line('.ct-chart', {
            labels: ["11:05", "11:06", "11:07", "11:25"],
            series: [
                [6268.3, 6268.2, 6268.12, 6268.5],
            ]
        }, {});

        Store.ws = new WebSocket("wss://wss.eurekapro.com/WSGateway/");
        (<WebSocket>Store.ws).onopen = function() {
            console.log("opened websocket");

            let frame = { "m": 0, "i": 0, "n": "SubscribeLevel1", "o": "" };
            let payload = { "OMSId": 1, "Symbol": "BTCUSD" };
            frame.o = JSON.stringify(payload);
            (<WebSocket>Store.ws).send(JSON.stringify(frame));
        };

        (<WebSocket>Store.ws).onmessage = function(msg) {
            let frame = JSON.parse(msg.data);
            if (frame.m === 3) {
                if (frame.n === "Level1UpdateEvent") {
                    let reply = JSON.parse(frame.o);

                    const time: Date = new Date();
                    const formattedTime: string = [
                        time.getMinutes(),
                        time.getSeconds(),
                    ].join(":");

                    let chart = (<any>Store.chartist);

                    if (chart.data.labels.length > 9) {
                        chart.data.labels.shift();
                    }

                    if (chart.data.series[0].length > 9) {
                        chart.data.series[0].shift();
                    }

                    chart.data.labels.push(formattedTime);
                    chart.data.series[0].push(reply.LastTradedPx);

                    chart.update(chart.data);
                }
            }
        };

        const token = localStorage.getItem("token")!;

        $("#datatable").DataTable({
            ajax: {
                url: AppSettings.API_BASE_URL + "/api/loan/list",
                type: "GET",
                beforeSend: function(request: any) {
                    request.setRequestHeader("Authorization", `Token ${token}`);
                },
                dataSrc: function(json: any) {
                    m.redraw();
                    json.data.map(function(v: any) {
                        v._id = v._id.toUpperCase();
                        v.uid = v._id.slice(-6);
                        v.loan = `
<a href="/#!/view-loan-document/${v._id}" class="dropdown-item"><i class="fa fa-file-pdf-o mr-2 font-18 vertical-middle"></i></a>`;

                        v.button = `
<div class="btn-group dropdown">
<a href="javascript:;" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
<div class="dropdown-menu dropdown-menu-right">
<a href="/#!/loan-details/${v._id}" class="dropdown-item"><i class="fa fa-eye mr-2 font-18 vertical-middle"></i>Details</a>
<a href="/#!/loan-invest/${v._id}" class="dropdown-item"><i class="fa fa-edit mr-2 font-18 vertical-middle"></i>Invest</a>
</div>
</div>`;
                        v.funded = `
<div class="progress">
<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
</div>`;
                        v.available = v.availableBidAmount ? v.availableBidAmount : v.amount;

                        let date = moment(v.closingDate).format("YYYY/MM/DD");
                        v.timeLeft = `
<div data-countdown="${date}" class="label label-sm label-success"></div>
`;
                    });
                    return json.data;
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
                { data: "uid", width: "8%" },
                { data: "period" },
                { data: "amount" },
                { data: "available" },
                { data: "timeLeft" },
                { data: "button" },
            ],
            initComplete: (_settings, _json) => {
                $("[data-countdown]").each(function() {
                    var $this = $(this), finalDate = $(this).data("countdown");
                    $this.countdown(finalDate, function(event) {
                        $this.html(event.strftime('%D days %H:%M:%S'))
                    })
                });
            }
        });
    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(header),
            m(".wrapper",
                m(".container-fluid",
                    m(".row",
                        m(".col-sm-12",
                            m(".page-title-box", [
                                m(".btn-group.pull-right",
                                    m("ol.breadcrumb.hide-phone.p-0.m-0", [
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                                        ),
                                        m("li.breadcrumb-item.active", "Dashboard")
                                    ])
                                ),
                                m("h4.page-title", "Dashboard")
                            ])
                        )
                    ),

                    m(".row", [
                        m(".col-lg-8",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Crypto Price Trade Chart (BTC-USD)"),
                                m("div.ct-chart.ct-major-eleventh"),
                            ])
                        ),
                        m(".col-lg-4", [
                            m(".card-box", [
                                Auth.checkIsTypesetBorrower() ? m("a.btn.btn-block.btn-custom.btn-primary[href='/apply-for-loan']", {
                                    oncreate: m.route.link
                                }, ["Apply for Loan"]) : null,
                                m("a.btn.btn-block.btn-custom.btn-primary[href='/create-inquiry']", {
                                    oncreate: m.route.link
                                }, ["Create Inquiry"]),
                            ]),
                            m(panelShowWalletAddresses),
                        ]),
                    ]),
                    m(".row", [
                        m(".col-lg-8",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Loan Deals"),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Terms"),
                                            m("th", "Amount"),
                                            m("th", "Available"),
                                            m("th", "Time Left"),
                                            m("th", "Actions"),
                                        ])
                                    ]),

                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Terms"),
                                            m("th", "Amount"),
                                            m("th", "Available"),
                                            m("th", "Time Left"),
                                            m("th", "Actions"),
                                        ]),
                                    ])

                                ])
                            ])
                        ),
                        m(panelExchangePrices),
                    ])
                )
            ),
            m(footer),
        ]);
    }
} as m.Component;
