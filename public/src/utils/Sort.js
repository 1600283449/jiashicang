export function compare(key){
  return function(a,b){
     return a[key]-b[key]
    }
}