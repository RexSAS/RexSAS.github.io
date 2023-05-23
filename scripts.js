function Calculate() {
    mAh = document.getElementById("1").value;
    V = document.getElementById("2").value;
    Wh = mAh * V / 1000;
    KWh = Wh / 1000;
    co2 = KWh * 0.4;
    out = co2 + " Kg";
    document.getElementById("res").innerHTML = out;
}
let i = 0;

function Write(){
    text = document.querySelector("#res");
    mAh = document.getElementById("1").value;
    V = document.getElementById("2").value;
    i++
    content = "Your phone stats:\nPhone: "+i+"\nmAh: "+mAh+"\nV: "+V+"\nCO2 producted: "+text.innerHTML+"\n\n\n\nCoded by Andrea Faveri 4S 2022-2023 Liceo L. Ariosto Ferrara";
    const blob = new Blob([content], {type: "text/plain"});
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "Phone-"+i+"-stats.txt";
    link.href = fileUrl;
    link.click();
}