/**
 * 
 * @param {Number} start 开始时间
 * @param {Number} end 结束时间
 * @param {string} name 进程名字
 */
function appendGante(start,end,name){
    let nb = 
    `<div class="gante-block" style="width:${(end-start)*50}px">
        <span>${start}</span>
        <span style="font-size:16px">${name}</span>
        <span></span>
    </div>`
    gante.append(nb)
}

/**
 * 输出信息
 * @param {Number} start 开始时间
 * @param {string} n1 停止运行的进程
 * @param {string} n2 开始运行的进程
 */
function logInfo(start,n1,n2){
    let str = `在 ${start} 时刻，${n1===null?"":(n1.id+" 停止运行，")}${n2.id}开始运行。<br/>`
    logger.append(str);
}

/** 
 * 教程控制块
*/
function pcb(id,arrivetime,needtime){
    this.id=id
    this.arrivetime=arrivetime
    this.needtime=needtime
    this.starttime=null
    this.endtime=null
    pcb.prototype.start=function(time){
        this.starttime=time
    }
    pcb.prototype.end=function(time){
        this.endtime=time
    }
}

//优先队列
function priority_queue(){
    this.data = [];
    /*入队*/
    priority_queue.prototype.add = function(element){
        this.data.push(element);
    };
    /*出队：删除队列中更拥有最高优先级的元素，needtime最小的元素优先级最高。*/
    priority_queue.prototype.dequeue = function(){
        var priority = 0;
        //使用顺序查找方法寻找优先级最高的元素，needtime越小优先级越高
        for(var i=0; i<this.data.length; ++i){
            if(this.data[i].needtime < this.data[priority].needtime){
                priority = i;
            }
        }
        return this.data.splice(priority,1);
    };
    priority_queue.prototype.isempty=function(){
        return this.data.length===0;
    }
}