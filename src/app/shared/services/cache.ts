
export class Cache {
  public static Set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  public static Get(key: string): any {
    const cache = localStorage.getItem(key);
    if (!cache) {
      return undefined;
    }
    let parse = cache;
    try {
      parse = JSON.parse(cache);
    } catch (error) { }
    return parse;
  }
  public static ClearCache():void{
    localStorage.clear()
  }

}
