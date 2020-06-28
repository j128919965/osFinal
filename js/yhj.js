let process_num;
let source_type_num;
let allocation=[];
let max=[];
let aviliable=[];
let need=[];
let request=[];
let safe_sequence=[]; //安全序列
let safelist=[]; //安全序列列表
let flag = false;

const get = (e)=>{return document.querySelector(e)};

const openFile = ()=>{
    $.get("../yhjdata.json",(data)=>{
        console.log(data);
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
    process_num = document.querySelector("#pro-num").value;
    source_type_num = get("#src-num").value;
    allocation = get("#allocation").value.split(';').map((x)=>{return x.split(" ")});
    console.log(allocation)
    max = get("#max").value.split(';').map((x)=>{return x.split(" ")});
    aviliable = get("#aviliable").value.split(' ')
    let p = get("#pro-id").value;
    let request = get("#request").value;

    var proList = new Array(process_num);

    for(let i = 0; i< process_num ;i++){
        proList[i] = new process(i,allocation[i],max[i],p===i?request:0);
    }

    findsafelist(proList,aviliable);
}


function process(id,allocation,max,request){
    this.id=id; //进程id
    this.allocation=allocation;
    this.max=max;
    this.request=request;
    this.need=[]
    this.finish=false
    for(i in max){
        this.need.push(max[i]-allocation[i])
    }
/**
 * 判断request是否大于need
 * @param {*} aviliable 
 */
    process.prototype.islegale=function(){
        for(i in need){
            if(need[i]<request[i])
                return false
        }
        return true
    }
    /**
     * 判断avilable能否满足该进程的request
     */
    process.prototype.isrequested=function(aviliable){
        for(i in request){
            if(request[i]>aviliable[i])
                return false
        }
        return true
    }
    /**
     * 判断aviliable能否满足进程的need
     */
    process.prototype.issafe=function(aviliable){
        for(i in need){
            if(need[i]>aviliable[i])
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
    console.log(prolist)
    let length=prolist.length
    for(i in prolist){
        if(prolist[i].finish)
            continue
        if(!prolist[i].islegale()){
            alert("存在错误，request大于need")
            break
        }
        if(!prolist[i].isrequested(aviliable)){
            continue
        }
        for(j in aviliable){ //把进程的request加上
            aviliable[j]-=prolist[i].request[j]
            prolist[i].need[j]-=prolist[i].request[j]
            prolist[i].allocation[j]+=prolist[i].request[j]
        }
        //进程无法执行，跳过
        if(!prolist[i].issafe(aviliable)){
            continue;
        }
        //进程可以执行，将进程加入安全序列，并释放进程占用的资源
        prolist[i].finish=true;
        safe_sequence.push(prolist[i].id); 
        for(j in aviliable){
            aviliable[j]+=prolist[i].allocation[j]
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        findsafelist();
        safe_sequence.splice(safe_sequence.length-1,1)
        prolist[i].finish=false;
        for(j in aviliable){
            aviliable[j]-=prolist[i].allocation[j]
        }
    }
    if(safe_sequence.length==length){
        safelist.push(safe_sequence)
    }
    return
}