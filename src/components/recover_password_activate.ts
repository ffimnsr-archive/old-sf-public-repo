import m, { Vnode } from "mithril";
import { AppSettings } from "configs";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";

const Store = {
    load(id: string) {
        m.request(AppSettings.API_BASE_URL + `/api/session/recover/${id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
            }
        }).then(function(res: any) {
            if (res.success) {
                console.log("success");
            } else {
                // TODO: add feedback so user would know he's been denied
                console.error("error", res);
                m.route.set("/server-error");
            }
        }).catch(function(err) {
            console.error("error", err);
            m.route.set("/server-error");
        });
    },
};

export default {
    oninit(_vnode: Vnode) {
        const id = m.route.param("token");
        Store.load(id);
    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(".accountbg", {
                style: {
                    "background": `url(${bg})`,
                    "background-size": "cover"
                }
            }),
            m(".wrapper-page.account-page-full", [
                m(".card",
                    m(".card-block",
                        m(".account-box",
                            m(".card-box.p-5", [
                                m("h2.text-uppercase.text-center.pb-4",
                                    m("a.text-success[href='/']", { oncreate: m.route.link },
                                        m("span",
                                            m("img[alt='logo'][height='26']", { src: logo })
                                        )
                                    )
                                ),
                                m(".account-content.text-center", [
                                    m("svg[version='1.1'][viewBox='0 0 98 98'][x='0px'][xml:space='preserve'][xmlns='http://www.w3.org/2000/svg'][xmlns:graph='&ns_graphs;'][xmlns:i='&ns_ai;'][xmlns:x='&ns_extend;'][xmlns:xlink='http://www.w3.org/1999/xlink'][y='0px']", { style: { "height": "120px" } }, [
                                        m("style[type='text/css']",
                                            ".st0{fill:#FFFFFF;}\
                       .st1{fill:#02a8b5;}\
                       .st2{fill:#FFFFFF;stroke:#02a8b5;stroke-width:2;stroke-miterlimit:10;}\
                       .st3{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}"
                                        ),
                                        m("g[i:extraneous='self']", [
                                            m("circle.st0[cx='49'][cy='49'][id='XMLID_50_'][r='49']"),
                                            m("g[id='XMLID_4_']", [
                                                m("path.st1[d='M77.3,42.7V77c0,0.6-0.4,1-1,1H21.7c-0.5,0-1-0.5-1-1V42.7c0-0.3,0.1-0.6,0.4-0.8l27.3-21.7 c0.3-0.3,0.8-0.3,1.2,0l27.3,21.7C77.1,42.1,77.3,42.4,77.3,42.7z'][id='XMLID_49_']"),
                                                m("path.st2[d='M66.5,69.5h-35c-1.1,0-2-0.9-2-2V26.8c0-1.1,0.9-2,2-2h35c1.1,0,2,0.9,2,2v40.7 C68.5,68.6,67.6,69.5,66.5,69.5z'][id='XMLID_48_']"),
                                                m("path.st1[d='M62.9,33.4H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,33,63.4,33.4,62.9,33.4z'][id='XMLID_47_']"),
                                                m("path.st1[d='M62.9,40.3H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,39.9,63.4,40.3,62.9,40.3z'][id='XMLID_46_']"),
                                                m("path.st1[d='M62.9,47.2H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,46.8,63.4,47.2,62.9,47.2z'][id='XMLID_45_']"),
                                                m("path.st1[d='M62.9,54.1H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7 c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,53.7,63.4,54.1,62.9,54.1z'][id='XMLID_44_']"),
                                                m("path.st2[d='M41.6,40.1h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7 C42.6,39.7,42.2,40.1,41.6,40.1z'][id='XMLID_43_']"),
                                                m("path.st2[d='M41.6,54.2h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7 C42.6,53.8,42.2,54.2,41.6,54.2z'][id='XMLID_42_']"),
                                                m("path.st1[d='M23.4,46.2l25,17.8c0.3,0.2,0.7,0.2,1.1,0l26.8-19.8l-3.3,30.9H27.7L23.4,46.2z'][id='XMLID_41_']"),
                                                m("path.st3[d='M74.9,45.2L49.5,63.5c-0.3,0.2-0.7,0.2-1.1,0L23.2,45.2'][id='XMLID_40_']")
                                            ])
                                        ])
                                    ]),
                                    m("p.text-muted.font-14.mt-2", [
                                        "Your new temporary password has been sent to your email.",
                                    ]),
                                    m("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='/']",
                                        { oncreate: m.route.link }, "Back to Home")
                                ])
                            ])
                        )
                    )
                ),
                m(".m-t-40.text-center",
                    m("p.account-copyright", [
                        "2018 © SmartFunding | ",
                        m("a[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
                    ])
                )
            ])
        ]);
    }
} as m.Component;
