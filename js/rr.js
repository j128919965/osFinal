let f = null;
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

