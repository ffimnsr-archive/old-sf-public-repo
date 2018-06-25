import m, { Vnode } from "mithril";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import "jquery-slimscroll";
import "dropzone";
import "../../node_modules/dropzone/dist/dropzone.css";

import avatar from "images/users/avatar-2.jpg";

const bucketName = "bucket.smartfunding.io";
const bucket = new AWS.S3({
  apiVersion: "2006-03-01",
  params: {
    Bucket: bucketName
  },
  signatureVersion: "v4",
});

function updateForPending() {

}

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
                      m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
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
                m("h4.header-title.m-t-0", "KYC Documents"),
                m("p.text-muted.font-14.m-b-10", "Upload your KYC Documents (e.g. Government ID Cards, Proof of Billing)."),
                m("form.dropzone[method='post'][id='dropzone'][enctype='multipart/form-data']", {
                  action: `https://${bucketName}.s3.amazonaws.com`
                },
                  m("input[type='hidden'][name='AWSAccessKeyId'][value='AKIAI4UWK5X7H6GWTC7A']"),
                  m("input[type='hidden'][name='acl'][value='private']"),
                  m("input[type='hidden'][name='key'][value='hello']"),
                  m("input[type='hidden'][name='policy'][value='policy']"),
                  m("input[type='hidden'][name='signature'][value='signature']"),
                  m(".fallback",
                    m("input[multiple][name='file'][type='file']")
                  )
                ),
                m(".clearfix.text-right.mt-3",
                  m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                    onclick: updateForPending,
                  }, "Submit")
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
