import m, { Vnode } from "mithril";
import { AppSettings } from "configs";
import QRCode from "qrcode";
import jwtDecode from "jwt-decode";
import Chartist, { IChartistLineChart } from "chartist";
import "chartist/dist/chartist.css";
import Swal from "sweetalert2";
import { Auth } from "../auth";
import moment from "moment";
import "jquery-countdown";

import header from "widgets/header";
import footer from "widgets/footer";
import panelExchangePrices from "widgets/panel_exchange_prices";
import panelShowWalletAddresses from "widgets/panel_show_wallet_addresses";
import modalBitcoin from "widgets/modal_user_get_bitcoin_address";
import modalEthereum from "widgets/modal_user_get_ethereum_address";
import modalStellar from "widgets/modal_user_get_stellar_address";


const Store = {
    chartist: {},
    interval: {},

    load() {
        const token = localStorage.getItem("token")!;
    }
};

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {

        Store.chartist = new Chartist.Line('.ct-chart', {
            labels: [],
            series: [
                [],
                [],
            ]
        }, {
                axisX: {
                    type: Chartist.FixedScaleAxis,
                    divisor: 4,
                }
            });

        Store.interval = setInterval(() => {
            const time: Date = new Date();
            const formattedTime: string = [
                time.getMinutes(),
                time.getSeconds(),
            ].join(":");

            const btcRandom: number = getRandomInt(6300, 6600);
            const ethRandom: number = getRandomInt(200, 250);
            const xrpRandom: number = getRandomInt(0, 2);

            (<any>Store.chartist).data.labels.push(formattedTime);
            (<any>Store.chartist).data.series[0].push(btcRandom);
            (<any>Store.chartist).data.series[1].push(ethRandom);

            (<IChartistLineChart>Store.chartist).update((<any>Store.chartist).data);

            console.log("updating chart");
        }, 2500);

        const token = localStorage.getItem("token")!;

        $("#datatable").DataTable({
            ajax: {
                url: AppSettings.API_BASE_URL + "/api/invoice/list",
                type: "GET",
                beforeSend: function(request: any) {
                    request.setRequestHeader("Authorization", `Token ${token}`);
                },
                dataSrc: function(json: any) {
                    m.redraw();
                    json.data.map(function(v: any) {
                        v.invoice = `
<a href="/#!/view-invoice-document/${v._id}" class="dropdown-item"><i class="fa fa-file-pdf-o mr-2 font-18 vertical-middle"></i></a>`;

                        v.button = `
<div class="btn-group dropdown">
<a href="javascript:;" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
<div class="dropdown-menu dropdown-menu-right">
<a href="/#!/view-invoice-details/${v._id}" class="dropdown-item"><i class="fa fa-eye mr-2 font-18 vertical-middle"></i>Details</a>
<a href="/#!/view-invoice-invest/${v._id}" class="dropdown-item"><i class="fa fa-edit mr-2 font-18 vertical-middle"></i>Invest</a>
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
                { data: "invoice", width: "8%" },
                { data: "period" },
                { data: "amount" },
                { data: "funded" },
                { data: "available" },
                { data: "timeLeft" },
                { data: "button" },
            ],
            initComplete: (settings, json) => {
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
                                m("h4.header-title.mb-3", "Crypto Price Chart"),
                                m("div.ct-chart.ct-major-eleventh"),
                            ])
                        ),
                        m(".col-lg-4", [
                            m(".card-box", [
                                Auth.checkIsTypesetBorrower() ? m("a.btn.btn-block.btn-custom.btn-primary[href='/sell-invoice']", {
                                    oncreate: m.route.link
                                }, ["Create Sell Invoice"]) : null,
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
                                m("h4.header-title.mb-3", "Investment Options"),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead", [
                                        m("tr", [
                                            m("th", "Invoice"),
                                            m("th", "Terms"),
                                            m("th", "Amount"),
                                            m("th", "Funded"),
                                            m("th", "Available"),
                                            m("th", "Time Left"),
                                            m("th", "Actions"),
                                        ])
                                    ]),

                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Invoice"),
                                            m("th", "Terms"),
                                            m("th", "Amount"),
                                            m("th", "Funded"),
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
