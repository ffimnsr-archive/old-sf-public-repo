import m, { Vnode } from "mithril";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";

export default {
    oninit() {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("status");
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
                                        m("span", m("img[alt=''][height='26']", { src: logo }))
                                    )
                                ),
                                m(".text-center.m-b-20", [
                                    m(".m-b-20",
                                        m(".checkmark",
                                            m("svg[enable-background='new 0 0 161.2 161.2'][id='Layer_1'][version='1.1'][viewBox='0 0 161.2 161.2'][x='0px'][xml:space='preserve'][xmlns='http://www.w3.org/2000/svg'][xmlns:xlink='http://www.w3.org/1999/xlink'][y='0px']", [
                                                m("path.path[d='M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4 c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5 c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z'][fill='none'][stroke='#32c861'][stroke-miterlimit='10']"),
                                                m("circle.path[cx='80.6'][cy='80.6'][fill='none'][r='62.1'][stroke='#32c861'][stroke-miterlimit='10'][stroke-width='4']"),
                                                m("polyline.path[fill='none'][points='113,52.8 74.1,108.4 48.2,86.4 '][stroke='#32c861'][stroke-linecap='round'][stroke-miterlimit='10'][stroke-width='6']"),
                                                m("circle.spin[cx='80.6'][cy='80.6'][fill='none'][r='73.9'][stroke='#32c861'][stroke-dasharray='12.2175,12.2175'][stroke-miterlimit='10'][stroke-width='4']")
                                            ])
                                        )
                                    ),
                                    m("h4", "See You Again !"),
                                    m("p.text-muted.font-14.m-t-10", [
                                        "You are now successfully sign out. Back to ",
                                        m("a.text-dark.m-r-5[href='/']", { oncreate: m.route.link }, m("b", "Sign In"))
                                    ])
                                ])
                            ])
                        )
                    )
                ),
                m(".m-t-40.text-center",
                    m("p.account-copyright.text-muted", [
                        "2018 © SmartFunding | ",
                        m("a.text-muted[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
                    ])
                )
            ])
        ]);
    }
} as m.Component;
