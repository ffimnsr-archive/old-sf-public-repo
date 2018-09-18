import m, { Vnode } from "mithril";
import { AppSettings } from "configs";
import QRCode from "qrcode";
import jwtDecode from "jwt-decode";
import Chartist, { IChartistLineChart } from "chartist";
import "chartist/dist/chartist.css";
import Swal from "sweetalert2";

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
                    labelInterpolationFnc: function(value) {
                        return value;
                    }
                }
            }
        );

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
                { data: "invoice", width: "20%" },
                { data: "terms" },
                { data: "amount" },
                { data: "appreciation" },
                { data: "funded" },
                { data: "available" },
                { data: "timeLeft" },
                { data: "button" },
            ]
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
                                m("a.btn.btn-block.btn-custom.btn-primary[href='/sell-invoice']", {
                                    oncreate: m.route.link
                                }, ["Add Sell Invoice"]),
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
                                            m("th", "Appreciation"),
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
                                            m("th", "Appreciation"),
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
