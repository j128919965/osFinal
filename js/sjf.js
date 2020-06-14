
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
    console.log(data);
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


function sjfCalc(data){
    let len = data.length;
    let time = 0;
}

$(()=>{
    logger = $(".logout");
    gante = $(".gante");
})