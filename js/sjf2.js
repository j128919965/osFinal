let f = null;
let gante;
let logger;

function submit(){
    let runs = $("#arr").val().trim();
    let arrives = $("#arrive").val().trim();
    console.log(runs.length,arrives.length)
    if(!!f){
        let data = f.trim().split(" ").map((x)=>{return parseInt(x)});
        runs = data.slice(0,data.length/2);
        arrives = data.slice(data.length/2,data.length);
    }else if(runs!=""&&arrives!=""){
        runs = runs.split(" ").map((x)=>{return parseInt(x)});
        arrives = arrives.split(" ").map((x)=>{return parseInt(x)});
        if(runs.length!=arrives.length){
            alert("输入数据有误！")
            return
        }
    }else{
        alert("输入数据有误！")
        return
    }

    gante = $(".gante");
    logger = $(".logout");
    console.log(runs,arrives);
    let plist=[]  
    for(i in runs){
        pi=new pcb(i,arrives[i],runs[i])
        plist.push(pi)
    }
    sjfCalc(plist)
}
function openFile(){
    $("#file").click().on("change",function(){
        f = $(this)[0].files[0];
        let reader = new FileReader();
        reader.readAsText(f);
        reader.onload = ()=>{
            f = reader.result;
            submit()
        }
    });
}


function sjfCalc(plist){
    let len = plist.length;
    let time = 0;
    let arriveque=new priority_queue()
    let lastpcb=null,nowpcb=null
    let fainalpcb=[]
    let wtime=0
    while(1){
        if(plist.length==0 && arriveque.isempty())
            break
        for(i in plist){
            if(plist[i].arrivetime<=time){
                arriveque.add(plist[i])
                plist.splice(i,1)
            }
        }
        if(arriveque.isempty()){
            time++
            continue
        }
        nowpcb=arriveque.dequeue()[0]
        if(lastpcb==null){
            nowpcb.start(time)
            logInfo(time,lastpcb,nowpcb)
            lastpcb=nowpcb
        }
        else if(lastpcb.id!=nowpcb.id){
            lastpcb.end(time)
            fainalpcb.push(lastpcb)
            nowpcb.start(time)
            wtime=wtime+time-nowpcb.arrivetime
            logInfo(time,lastpcb,nowpcb)
            lastpcb=nowpcb
        }
        time++
        if(nowpcb.needtime-1!=0){
            let nexpcb=new pcb(nowpcb.id,time,nowpcb.needtime-1)
            arriveque.add(nexpcb)
        }
    }
    lastpcb.end(time)
    fainalpcb.push(lastpcb)
    logInfo(time,lastpcb,null)
    logger.append("平均等待时间：",(wtime/len).toFixed(2));
    for(i in fainalpcb){
        appendGante(fainalpcb[i].starttime,fainalpcb[i].endtime,"P"+fainalpcb[i].id)
        //console.log(fainalpcb[i].starttime,fainalpcb[i].endtime,"P"+fainalpcb[i].id)
    }
}

