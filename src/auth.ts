export class Auth {
  public static checkTokenNone() {
    let token = localStorage.getItem("token");
    return token == null;
  }
}
