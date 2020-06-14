let f = null;
let gante;
let logger;

function submit(){
    let runs = $("#arr").val().trim();
    let arrives = $("#arrive").val().trim();
    if(!!f){
        let data = f.trim().split(" ").map((x)=>{return parseInt(x)});
        runs = data.slice(0,data.length/2);
        arrives = data.slice(data.length/2,data.length);
    }else if(runs!=""&&arrives!=""&&runs.length === arrives.length){
        runs = runs.split(" ").map((x)=>{return parseInt(x)});
        arrives = arrives.split(" ").map((x)=>{return parseInt(x)});
    }else{
        alert("输入数据有误！")
    }

    gante = $(".gante");
    logger = $(".logout");
    console.log(runs,arrives);  
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


function sjfCalc(runs,arrives){
    let len = runs.length;
    let time = 0;
}

