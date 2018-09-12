import { AppSettings } from "configs";
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

function statusConvert(s: string) {
    switch (s) {
        case "pending":
            return m("span.badge.badge-purple", "Pending");
        case "okay":
            return m("span.badge.badge-success", "Active");
        case "locked":
            return m("span.badge.badge-warning", "Inactive");
        case "deleted":
            return m("span.badge.badge-danger", "Rejected");
        default:
            return m("span.badge.badge-info", "Fill-up");
    }
}

function roleConvert(s: string) {
    switch (s) {
        case "Admin":
            return m("span.badge.badge-pink.badge-pill", "Admin");
        case "Member":
            return m("span.badge.badge-purple.badge-pill", "Member");
    }
}

export default {
    oninit(_vnode: Vnode) {
        let uid = m.route.param("id");
        Store.load(uid);
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;
    },
    view(_vnode: Vnode) {
        return m(".tab-pane.active.show[id='profile-b2']",
            [
                m("dl.row", [
                    m("dt.col-sm-3", "Full Name"),
                    m("dd.col-sm-9", Store.name),
                    m("dt.col-sm-3", "Email"),
                    m("dd.col-sm-9", Store.email),
                    m("dt.col-sm-3", "Country"),
                    m("dd.col-sm-9", Store.country),
                    m("dt.col-sm-3", "Type"),
                    m("dd.col-sm-9", Store.type),
                    m("dt.col-sm-3", "Role"),
                    m("dd.col-sm-9", Store.role),
                    m("dt.col-sm-3", "Status"),
                    m("dd.col-sm-9", statusConvert(Store.status)),
                    m("dt.col-sm-3", "Registered Date"),
                    m("dd.col-sm-9", Store.registeredDate),
                    m("dt.col-sm-3", "Last Login Date"),
                    m("dd.col-sm-9", Store.lastLoginDate),
                ])
            ]
        );
    }
}
