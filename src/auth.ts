import m from "mithril";

export default class Auth {

  // login(email: string, password: string) {
  //   return m.request({
  //     method: "POST",
  //     url: "https://localhost",
  //   });
  // }

  // setSession(result: any) {
  //   let expiresAt = JSON.stringify((result.expiresIn * 1000) + new Date().getTime());
  //   localStorage.setItem("access_token", result.accessToken);
  //   localStorage.setItem("id_token", result.idToken);
  //   localStorage.setItem("expires_at", expiresAt);

  //   m.route.set("/");
  // }

  // logout() {
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("id_token");
  //   localStorage.removeItem("expires_at");

  //   m.route.set("/login");
  // }

  // isAuthenticated() {
  //   let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  //   return new Date().getTime() < expiresAt;
  // }
}
