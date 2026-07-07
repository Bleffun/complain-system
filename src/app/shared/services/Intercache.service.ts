export class Intercache {
data = [];
public static Get(key:any){
  localStorage.getItem(key);
}
public static Set(key:any,value:any){
  localStorage.setItem(key,value);
}
}
