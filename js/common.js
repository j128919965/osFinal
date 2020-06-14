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
    let str = `在 ${start} 时刻，${n1===null?"":(n1+" 停止运行，")}${n2}开始运行。<br/>`
    logger.append(str);
}