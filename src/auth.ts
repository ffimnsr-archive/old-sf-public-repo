import jwtDecode from "jwt-decode";

export class Auth {
  public static checkTokenNone() {
    let token = localStorage.getItem("token");
    return token == null;
  }

  public static checkIsRoleAdmin() {
    let token = localStorage.getItem("token")!;
    let data = jwtDecode<any>(token);
    return (<boolean>data.isMailVerified);
  }

  public static checkIsMailVerified() {
    let token = localStorage.getItem("token")!;
    let data = jwtDecode<any>(token);
    return (<boolean>data.isMailVerified);
  }

  public static checkIsDocumentsSubmitted() {
    let token = localStorage.getItem("token")!;
    let data = jwtDecode<any>(token);
    return (<boolean>data.isDocumentsSubmitted);
  }
}
