import { AppSettings } from "../configs";
import moment from "moment";
import m, { Vnode } from "mithril";

const Store = {
    uid: "",
    name: "",
    email: "",
    country: "",
    type: "",
    role: "",
    status: "",
    registeredDate: "",
    lastLoginDate: "None",

    load(id: string) {
        this.uid = id;

        const vm = this;
        const token = localStorage.getItem("token")!;
        m.request(AppSettings.API_BASE_URL + `/api/user/get-user/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                vm.name = res.user.forename ? `${res.user.forename} ${res.user.surname}` : "None";
                vm.email = res.user.email;
                vm.type = res.user.typeset ? (<string>res.user.typeset).charAt(0).toUpperCase() + res.user.typeset.slice(1) : "None";
                vm.role = res.user.role ? (<string>res.user.role).charAt(0).toUpperCase() + res.user.role.slice(1) : "None";
                vm.status = res.user.status;
                vm.registeredDate = moment(res.user.createdAt).format("MMMM Do YYYY, h:mm:ss a");
                vm.country = res.address && res.address.country ? res.address.country : "None";
            } else {

            }
        }).catch(function(err) {
            console.error("error", err);
        });
    },
};

export default {
    oninit(_vnode: Vnode) {
        let uid = m.route.param("id");
        Store.load(uid);
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;
    },
    view(_vnode: Vnode) {
        return m(".tab-pane[id='financial-b2']",
            [
                m("dl.row", [
                    m("dt.col-sm-3", "Bank Name"),
                    m("dd.col-sm-9", "None"),
                    m("dt.col-sm-3", "Bank Account No."),
                    m("dd.col-sm-9", "None"),
                    m("dt.col-sm-3", "Account Holder Name"),
                    m("dd.col-sm-9", "None"),
                ]),
                m("hr"),
                m("dl.row", [
                    m("dt.col-sm-3", "Ethereum Wallet"),
                    m("dd.col-sm-9", "None"),
                    m("dt.col-sm-3", "Bitcoin Wallet"),
                    m("dd.col-sm-9", "None"),
                    m("dt.col-sm-3", "Stellar Wallet"),
                    m("dd.col-sm-9", "None"),
                ]),
                m("hr"),
                m("dl.row", [
                    m("dt.col-sm-3", "Paypal Account"),
                    m("dd.col-sm-9", "None"),
                ]),
            ]
        );
    }
}
