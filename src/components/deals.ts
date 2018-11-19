import m, { Vnode } from "mithril";
import { AppSettings } from "../configs";
// import QRCode from "qrcode";
// import jwtDecode from "jwt-decode";
// import Chartist from "chartist";
import "chartist/dist/chartist.css";
// import Swal from "sweetalert2";
import moment from "moment";

import header from "../widgets/header";
import footer from "../widgets/footer";
// import panelExchangePrices from "widgets/panel_exchange_prices";
// import panelShowWalletAddresses from "widgets/panel_show_wallet_addresses";
// import modalBitcoin from "widgets/modal_user_get_bitcoin_address";
// import modalEthereum from "widgets/modal_user_get_ethereum_address";
// import modalStellar from "widgets/modal_user_get_stellar_address";


const Store = {
    image: "",
    loans: [],

    load() {
        const token = localStorage.getItem("token")!;
    },
    loadCards() {
        if (this.loans !== undefined) {
            return this.loans.map(function(el, index) {
                if (index < 3) {
                    return createCardBox(el);
                }
            });
        }
    }
};

function createCardBox(loan: any) {
    return m(".col-xl-4",
        m(".card-box.project-box",
            [
                m(".dropdown.pull-right",
                    [
                        m("a.dropdown-toggle.card-drop.arrow-none[aria-expanded='false'][data-toggle='dropdown'][href='#']",
                            m("h3.m-0.text-muted",
                                m("i.mdi.mdi-dots-horizontal")
                            )
                        ),
                        m(".dropdown-menu.dropdown-menu-right[aria-labelledby='btnGroupDrop1']",
                            [
                                m(`a.dropdown-item[href='/#!/loan-details/${loan._id}']`,
                                    "Details"
                                ),
                                m(`a.dropdown-item[href='/#!/loan-details/${loan._id}']`,
                                    "Invest"
                                ),
                            ]
                        )
                    ]
                ),
                m("p.text-muted.text-uppercase.mb-0.font-13",
                    `LOAN#${loan.uid}`,
                ),
                m("h4.mt-0.mb-3",
                    m("a.text-dark[href='']",
                        loan.loanPurpose || "Others",
                    )
                ),
                m("ul.list-inline",
                    [
                        m("li.list-inline-item",
                            [
                                m("h3.mb-0",
                                    loan.period
                                ),
                                m("p.text-muted",
                                    "Term"
                                )
                            ]
                        ),
                        m("li.list-inline-item",
                            [
                                m("h3.mb-0",
                                    loan.aprPercent
                                ),
                                m("p.text-muted",
                                    "Appreciation"
                                )
                            ]
                        ),
                        m("li.list-inline-item",
                            [
                                m("h3.mb-0",
                                    loan.available
                                ),
                                m("p.text-muted",
                                    "Available"
                                )
                            ]
                        )
                    ]
                ),
                m(".project-members.mb-4",
                    [
                        m("label.mr-3",
                            "Time Limit :",
                            m.trust(loan.timeLeft),
                        ),
                    ]
                ),
                m("label[class='']",
                    [
                        "Funding completed: ",
                        m("span.text-custom",
                            "0" + "/" + loan.amount
                        )
                    ]
                ),
                m(".progress.mb-1", { style: { "height": "7px" } },
                    m(".progress-bar[aria-valuemax='100'][aria-valuemin='0'][aria-valuenow='0'][role='progressbar']", { style: { "width": "0%" } },
                    )
                )
            ]
        )
    );
}

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
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
<a href="/#!/loan-details/${v._id}" class="dropdown-item"><i class="fa fa-file-pdf-o mr-2 font-18 vertical-middle"></i></a>`;

                        v.button = `
<div class="btn-group dropdown">
<a href="javascript:;" class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></a>
<div class="dropdown-menu dropdown-menu-right">
<a href="/#!/loan-details/${v._id}" class="dropdown-item"><i class="fa fa-eye mr-2 font-18 vertical-middle"></i>Details</a>
<a href="/#!/loan-invest/${v._id}" class="dropdown-item"><i class="fa fa-edit mr-2 font-18 vertical-middle"></i>Status</a>
</div>
</div>`;
                        v.funded = `
<div class="progress">
<div class="progress-bar progress-bar-striped progress-bar-animated align-middle" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
</div>`;
                        v.available = v.availableBidAmount ? v.availableBidAmount : v.amount;

                        let date = moment(v.closingDate).format("YYYY/MM/DD");
                        v.timeLeft = `
<div data-countdown="${date}" class="label label-sm label-success"></div>
`;
                    });
                    Store.loans = json.data;
                    m.redraw();
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
                { data: "uid" },
                { data: "period" },
                { data: "amount" },
                { data: "aprPercent" },
                { data: "funded" },
                { data: "available" },
                { data: "timeLeft" },
                { data: "button" },
            ],
            initComplete: (_settings, _json) => {
                $('[data-countdown]').each(function() {
                    var $this = $(this), finalDate = $(this).data('countdown');
                    $this.countdown(finalDate, function(event) {
                        $this.html(event.strftime('%D days %H:%M:%S'));
                    });
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
                                        m("li.breadcrumb-item.active", "Deals")
                                    ])
                                ),
                                m("h4.page-title", "Deals")
                            ])
                        )
                    ),

                    m(".row", [
                        Store.loadCards(),
                    ]),
                    m("div.row",
                        m(".col-lg-12",
                            m(".card-box", [
                                m("h4.header-title.mb-3", "Loan Deals"),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead", [
                                        m("tr", [
                                            m("th", "ID"),
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
                                            m("th", "ID"),
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
                    )
                ),
            ),
            m(footer),
        ]);
    }
} as m.Component;
