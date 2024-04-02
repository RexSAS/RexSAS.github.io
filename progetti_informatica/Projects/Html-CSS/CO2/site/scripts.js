function Calculate() {
    mAh = document.getElementById("1").value;
    V = document.getElementById("2").value;
    Wh = mAh * V / 1000;
    KWh = Wh / 1000;
    co2 = KWh * 0.4;
    out = co2 + " Kg";
    document.getElementById("res").innerHTML = out;
}

function Write(){
    text = document.querySelector("#res")
    const blob = new Blob([text.innerHTML], {type: "text/plain"});
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "output.txt";
    link.href = fileUrl;
    link.click();
}