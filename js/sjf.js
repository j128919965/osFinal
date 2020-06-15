
let f = null;
let gante;
let logger;

function submit(){
    let data = $("#arr").val();
    if(!!f){
        data = f.trim().split(" ").map((x)=>{return parseInt(x)});
    }else if(data!=""){
        data = data.trim().split(" ").map((x)=>{return parseInt(x)});
    }else{
        alert("没有输入数据！")
        return;
    }
    gante = $(".gante");
    pqu=new priority_queue()
    for(i in data){
        console.log(i,data[i])
        pi=new pcb(i,0,data[i])
        pqu.add(pi)
    }
    sjfCalc(pqu)
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


function sjfCalc(pcbs){
    length=pcbs.data.length
    let st=0
    let pcblist=[]
    let lastpcb=null,nowpcb=null
    let wtime=0
    while(!pcbs.isempty()){
        console.log(1)
        nowpcb=pcbs.dequeue()[0]
        wtime=wtime+(st-nowpcb.arrivetime)
        logInfo(st,lastpcb,nowpcb)
        console.log(nowpcb)
        nowpcb.start(st)
        st=nowpcb.needtime+st
        nowpcb.end(st)
        lastpcb=nowpcb
        pcblist.push(nowpcb)
    }
    logger.append("平均等待时间：",(wtime/length).toFixed(2));
    for(i in pcblist){
        appendGante(pcblist[i].starttime,pcblist[i].endtime,"P"+pcblist[i].id)
    }
}

$(()=>{
    logger = $(".logout");
    gante = $(".gante");
})