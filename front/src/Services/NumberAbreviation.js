export default function m(n,d){
    let p=Math.pow
    let dd=p(10,d)
    let s, nn = n;
    let i=7
    while(i)(s=p(10,i--*3))<=nn&&(nn=Math.round(nn*dd/s)/dd+' '+['k','mi','B', 'T'][i])
    return nn
};