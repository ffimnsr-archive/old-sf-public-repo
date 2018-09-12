import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import jwtDecode from "jwt-decode";
import Chartist from "chartist";
import "chartist/dist/chartist.css";

import header from "widgets/header";
import footer from "widgets/footer";
import panelExchangePrices from "widgets/panel_exchange_prices";
import modalBitcoin from "widgets/modal_user_get_bitcoin_address";
import modalEthereum from "widgets/modal_user_get_ethereum_address";
import modalStellar from "widgets/modal_user_get_stellar_address";


const Store = {
    image: "",

    load: function() {
        const token = localStorage.getItem("token")!;
        const data = jwtDecode<any>(token);

        const vm = this;
        QRCode.toDataURL(data.id, {
            errorCorrectionLevel: "H",
            version: 12,
        }, function(_err: any, url: string) {
            vm.image = url;
            m.redraw();
        });
    }
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        let data: Chartist.IChartistData = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            series: [
                [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
                [4, 5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
                [5, 3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
            ]
        };

        let options: Chartist.ILineChartOptions = {
            axisX: {
                labelInterpolationFnc: function(value) {
                    return '09 ' + value;
                }
            }
        };

        new Chartist.Line('.ct-chart', data, options);
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
                        m(".col-lg-4",
                            m(".card-box", [
                                m("h4.m-t-0.header-title", "Fund Your Account"),
                                m("a.btn.btn-block.btn-custom.btn-primary[href='/']", [
                                    m("i.mdi.mdi-currency-eth"),
                                    "  Ethereum"
                                ]),
                                m("a.btn.btn-block.btn-custom.btn-warning[href='/']", [
                                    m("i.mdi.mdi-currency-btc"),
                                    "  Bitcoin"
                                ]),
                                m("a.btn.btn-block.btn-custom[href='/top-up'][disabled='true']", { oncreate: m.route.link }, [
                                    m("i.mdi.mdi-currency-usd"),
                                    "  Bank Transfer"
                                ]),
                                m("a.btn.btn-block.btn-custom[href='/top-up'][disabled='true']", { oncreate: m.route.link }, "Paypal"),
                            ])
                        )
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
            m(modalBitcoin),
            m(modalEthereum),
            m(modalStellar),
        ]);
    }
} as m.Component;
