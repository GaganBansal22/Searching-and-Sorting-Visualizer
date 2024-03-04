export const generateRandomElements=(toBeSorted=false)=>{
    let n=50;
    let arr=[]
    for(let i=0;i<n;i++){
        let x=Math.floor((Math.random() * 100) + 1)
        // arr.push({num:x,selected:false});
        arr.push({num:x,selected:false,sectionSelected:false,display:true});
    }
    if(toBeSorted)
        arr.sort((a,b)=>{return (a.num-b.num)})
    return arr;
}

export const timeout = (time) => new Promise(resolve => setTimeout(resolve, time));