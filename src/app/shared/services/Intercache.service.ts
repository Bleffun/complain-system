export class Intercache {
data = [];
public static Get(key:any){
  localStorage.getItem(key);
}
public static Set(key:any,value:any){
  localStorage.setItem(key,value);
}
public setData(data:any){
  this.data = data;
}
public getData(data:any){
  return this.data;
}

}
