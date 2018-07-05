export class Utils {
  public static showSnackbar(message: string) {
    let x = document.getElementById("snackbar");
    if (x != null) {
      let y: HTMLElement = x!;
      y.className = "show";
      y.innerText = message;
      setTimeout(function(){
         y.className = y.className.replace("show", "");
      }, 3000);
    }
  }
}
