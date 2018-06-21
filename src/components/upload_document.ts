import m, { Vnode } from "mithril";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import "jquery-slimscroll";

import avatar from "images/users/avatar-2.jpg";

AWS.config.region = 'ap-southeast-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-southeast-1:4c1e349b-13b9-49ce-9b27-2d0b1fac48cd',
});

const bucketName = "bucket.smartfunding.io";
const bucket = new AWS.S3({
  params: {
    Bucket: bucketName
  }
});

export default {
  oninit() {
    $(".navbar-toggle").on("click", function(e: Event) {
      $(this).toggleClass("open");
      $("#navigation").slideToggle(400);
    });

    $(".navigation-menu>li").slice(-2).addClass("last-elements");

    $(".navigation-menu li.has-submenu a[href='#']").on("click", function(e: Event) {
      if ($(window).width()! < 992) {
        e.preventDefault();
        $(this).parent("li").toggleClass("open").find(".submenu:first").toggleClass("open");
      }
    });

    $(".slimscroll").slimScroll({
      height: "auto",
      position: "right",
      size: "8px",
      color: "#9ea5ab"
    });
  },
  view(vnode: Vnode) {
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
                      m("a[href='/#!/']", "SmartFunding")
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
                m("h4.header-title.mb-3", "Wallet Balances"),
                m(".table-responsive",
                  m("table.table.table-hover.table-centered.m-0", [
                    m("thead",
                      m("tr", [
                        m("th", "Profile"),
                        m("th", "Name"),
                        m("th", "Currency"),
                        m("th", "Balance"),
                        m("th", "Reserved in orders"),
                        m("th", "Action")
                      ])
                    ),
                    m("tbody", [
                      m("tr", [
                        m("td",
                          m("img.rounded-circle.thumb-sm[alt='img'][title='contact-img']", {
                            src: avatar
                          })
                        ),
                        m("td", [
                          m("h5.m-0.font-weight-normal", "#000000"),
                          m("p.mb-0.text-muted", m("small", "January 01, 1970"))
                        ]),
                        m("td", [
                          m("i.mdi.mdi-currency-btc.text-primary"),
                          "BTC"
                        ]),
                        m("td", "0.00000000 BTC"),
                        m("td", "0.00000000 BTC"),
                        m("td", [
                          m("a.btn.btn-sm.btn-custom[href='#']",
                            m("i.mdi.mdi-plus")
                          ),
                          m("a.btn.btn-sm.btn-danger[href='#']",
                            m("i.mdi.mdi-minus")
                          )
                        ])
                      ]),
                    ])
                  ])
                )
              ])
            ),
            m(".col-lg-4",
              m(".card-box", [
                m("h4.m-t-0.header-title", "Total Wallet Balance"),
                m("[id='donut-chart']",
                  m(".flot-chart.mt-5[id='donut-chart-container']", { style: { "height": "340px" } },
                  )
                )
              ])
            )
          ])
        )
      ),
      m(footer)
    ]);
  }
} as m.Component;
