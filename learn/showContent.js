
/*
 下面的js是为了自动显示div的样式,无需修改
 */
function getInnerText(element) {
    return (typeof element.textContent == "string") ? element.textContent : element.innerText;
}
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

var ele = document.getElementsByClassName("demo");
if(ele){
    for(var i=0;i<ele.length;i++){
        setInnerText(ele[i],ele[i].getAttribute("style")+getInnerText(ele[i]));
    }
}