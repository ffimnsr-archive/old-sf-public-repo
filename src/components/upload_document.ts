import m, { Vnode } from "mithril";
import $ from "jquery";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import "jquery-slimscroll";
import Dropzone, { DropzoneFile } from "dropzone";
import "../../node_modules/dropzone/dist/dropzone.css";

import { AppSettings } from "configs";
import avatar from "images/users/avatar-2.jpg";

const UploadDocumentData = {
  continue: function () {
    localStorage.setItem("status", "okay");
    m.route.set("/");
  }
};

export default {
  oninit(vnode: Vnode) {
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

    Dropzone.autoDiscover = false;
  },
  oncreate(vnode: Vnode) {
    const dropzone = new Dropzone("form#dropzone", {
      url: "#",
      dictDefaultMessage: "Drag n drop or tap here",
      method: "PUT",
      parallelUploads: 20,
      uploadMultiple: false,
      paramName: "file",
      maxFiles: 10,
      autoProcessQueue: true,

      sending(file: Dropzone.DropzoneFile, xhr: XMLHttpRequest) {
        let _send = xhr.send;
        xhr.setRequestHeader("x-amz-acl", "public-read");
        xhr.send = function() {
          _send.call(xhr, file);
        };
      },
      accept(file: Dropzone.DropzoneFile, done: (error?: string) => void) {
        const params = {
          filename: file.name,
          filetype: file.type,
        };

        $.getJSON(AppSettings.API_BASE_URL + "/api/uploader", params)
          .done(function(data: any) {
            if (!data.signedRequest) {
              return done("failed to receive an upload url");
            }

            (<any>file).signedRequest = data.signedRequest,
            (<any>file).finalURL = data.downloadURL;
            done();
          }).fail(function() {
            return done("failed to receive an upload url");
          });
      },
    });

    dropzone.on("processing", function(file: Dropzone.DropzoneFile) {
      (<any>dropzone).options.url = (<any>file!).signedRequest;
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
                m("form.dropzone[id='dropzone']",
                  m(".fallback",
                    m("input[multiple][name='file'][type='file']")
                  )
                ),
                m(".clearfix.text-right.mt-3",
                  m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                    onclick: UploadDocumentData.continue,
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
