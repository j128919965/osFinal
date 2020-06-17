let f = null;
let gante
let logger
function submit(){
    let data = $("#arr").val();
    let space = parseInt($("#size").val());
    if(!space){
        alert("请输入时间片大小！");
        return;
    }
    if(!!f){
        data = f.trim().split(" ").map((x)=>{return parseInt(x)});
    }else if(data!=""){
        data = data.trim().split(" ").map((x)=>{return parseInt(x)});
    }else{
        alert("没有输入数据！")
        return;
    }
    //TODO
    console.log(data);
    let plist=[]
    for(i in data){
        let np=new pcb(i,0,data[i])
        plist.push(np)
    }

    gante = $(".gante");
    logger = $(".logout");

    rrCalc(space,plist)
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

function rrCalc(space,plist){
    let len=plist.length
    let fainalpcb=[]
    let time=0
    let wtime=0
    let lastpcb=null,pcbi=null
    while(plist.length>0){
        pcbi=plist.splice(0,1)[0]
        pcbi.start(time)
        logInfo(time,lastpcb,pcbi)
        wtime=time-pcbi.arrivetime
        cost=space<pcbi.needtime?space:pcbi.needtime
        time+=cost
        pcbi.end(time)
        fainalpcb.push(pcbi)
        lastpcb=pcbi
        if(pcbi.needtime-cost!=0){
            let npcb=new pcb(pcbi.id,time,pcbi.needtime-cost)
            plist.push(npcb)
        }
    }
    logger.append("平均等待时间：",(wtime/len).toFixed(2));
    for(i in fainalpcb){
        appendGante(fainalpcb[i].starttime,fainalpcb[i].endtime,"P"+fainalpcb[i].id)
        //console.log(fainalpcb[i].starttime,fainalpcb[i].endtime,"P"+fainalpcb[i].id)
    }
}