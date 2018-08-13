export class BitcoinUtils {
  public static getBtcBalanceSingle(address: string) {
    return "https://blockchain.info/q/addressbalance/wallet?confirmations=6";
  }
}
