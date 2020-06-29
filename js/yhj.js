let process_num;
let source_type_num;
var allocation=[];
let max=[];
let aviliable=[];
let need=[];
let request=[];
let safe_sequence=[]; //安全序列
let safelist=[]; //安全序列列表
let flag = false;
let cnt=1;

const get = (e)=>{return document.querySelector(e)};

const openFile = ()=>{
    $.get("../yhjdata.json",(data)=>{
        flag = true;
        document.querySelector("#pro-num").value = data.process_num;
        process_num = data.process_num;
        document.querySelector("#src-num").value = data.source_type_num;
        source_type_num = data.source_type_num;
        get("#allocation").value=data.allocation.map((x)=>{return x.join(' ')}).join(';');
        allocation = data.allocation;
        get("#max").value=data.max.map((x)=>{return x.join(' ')}).join(';');
        max = data.max;
        get("#aviliable").value=data.aviliable.join(' ');
        aviliable = data.aviliable;
    })
}

const submit = ()=>{
    if(!flag){
        process_num = document.querySelector("#pro-num").value;
        source_type_num = get("#src-num").value;
        allocation = get("#allocation").value.split(';').map((x)=>{return x.split(" ")});
        console.log(allocation)
        max = get("#max").value.split(';').map((x)=>{return x.split(" ")});
        aviliable = get("#aviliable").value.split(' ')
    }

    
    let p = get("#pro-id").value;
    let request = get("#request").value;
    console.log(p,request)

    let proList = new Array(process_num);

    for(let i = 0; i< process_num ;i++){
        console.log(p,i,p===i)
        proList[i] = new process(i,allocation[i],max[i],p===i?request:0);    
        console.log(proList[i])
    }
    cnt=1;
    findsafelist(proList,aviliable);

    // for(let i = 0;i<safe_sequence.length;i++){
    //     console.log(safe_sequence[i])
    // }
}

class process{

    constructor(id,allocation,max,request){
        this.id=id; //进程id
        this.allocation=allocation;
        this.max=max;
        if(request===0){
            this.request = new Array(allocation.length).fill(0);
        }else{
            this.request=request;
        }
        this.need=[]
        this.finish=false
        for(let i in max){
            this.need.push(max[i]-allocation[i])
        }
    }
    
    /**
     * 判断request是否大于need
     * @param {*} aviliable 
     */
    islegale=()=>{
        for(let i in this.need){
            if(this.need[i]<this.request[i])
                return false
        }
        return true
    }
    /**
     * 判断avilable能否满足该进程的request
     */
    isrequested=(aviliable)=>{
        for(let i in this.request){
            if(this.request[i]>aviliable[i])
                return false
        }
        return true
    }
    /**
     * 判断aviliable能否满足进程的need
     */
    issafe=(aviliable)=>{
        for(let i in this.need){
            if(this.need[i]>aviliable[i])
                return false
        }
        return true
    }
}


/**
 * 寻找安全序列
 * @param {*} prolist //进程列表 
 * @param {*} aviliable //可用资源数列表
 */
function findsafelist(prolist,aviliable){
    //console.log(aviliable)
    let length=prolist.length
    
    for(let i in prolist){
        if(prolist[i].finish){
            console.log("进程："+i+"已完成")
            continue
        }
        for(let i in prolist){
            if(!prolist[i].islegale()){
                alert("进程："+i+"存在错误，request大于need")
                break
            }
            if(!prolist[i].isrequested(aviliable)){
                console.log("进程："+i+"无法满足request")
                continue
            }
            for(let j in aviliable){ //把进程的request加上
                aviliable[j]-=prolist[i].request[j]
                prolist[i].need[j]-=prolist[i].request[j]
                prolist[i].allocation[j]+=prolist[i].request[j]
            }
        }
        //进程无法执行，跳过
        if(!prolist[i].issafe(aviliable)){
            console.log("进程："+i+"无法满足need")
            continue;
        }
        //进程可以执行，将进程加入安全序列，并释放进程占用的资源
        console.log("进程："+i+"进入安全序列")
        prolist[i].finish=true;
        safe_sequence.push(prolist[i].id); 
        for(let j in aviliable){
            aviliable[j]+=prolist[i].allocation[j]
        }
        findsafelist(prolist,aviliable);
        console.log("进程："+i+"退出安全序列")
        safe_sequence.splice(safe_sequence.length-1,1)
        //console.log(safe_sequence)
        prolist[i].finish=false;
        for(let j in aviliable){
            aviliable[j]-=prolist[i].allocation[j]
        }
    }
    if(safe_sequence.length==length){
        console.log("安全序列"+cnt+": "+safe_sequence)
        cnt++;
        //safelist.push(safe_sequence)
        //console.log(safelist)
    }
    return
}