import m, { Vnode } from "mithril";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import "jquery-slimscroll";
import "dropzone";

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
    $(".navbar-toggle").on("click", function (e: Event) {
      $(this).toggleClass("open");
      $("#navigation").slideToggle(400);
    });

    $(".navigation-menu>li").slice(-2).addClass("last-elements");

    $(".navigation-menu li.has-submenu a[href='#']").on("click", function (e: Event) {
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
        m(".container-fluid", [
          m(".row",
            m(".col-sm-12",
              m(".page-title-box", [
                m(".btn-group.pull-right",
                  m("ol.breadcrumb.hide-phone.p-0.m-0", [
                    m("li.breadcrumb-item",
                      m("a[href='/#!/']", "SmartFunding")
                    ),
                    m("li.breadcrumb-item.active", "Upload Verification Documents")
                  ])
                ),
                m("h4.page-title", "Upload Verification Documents")
              ])
            )
          ),
          m(".row",
            m(".col-12",
              m(".card-box", [
                m("h4.header-title.m-t-0", "Dropzone File Upload"),
                m("p.text-muted.font-14.m-b-10", "Your awesome text goes here."),
                m("form.dropzone[action='#'][id='dropzone']",
                  m(".fallback",
                    m("input[multiple=''][name='file'][type='file']")
                  )
                ),
                m(".clearfix.text-right.mt-3",
                  m("button.btn.btn-custom.waves-effect.waves-light[type='button']", "Submit")
                )
              ])
            )
          )
        ])
      ),
      m(footer)
    ]);
  }
} as m.Component;
