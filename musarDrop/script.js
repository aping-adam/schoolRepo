const audio = document.getElementById("musarAudio");
const ageSubmit = document.getElementById("ageSubmit");
ageSubmit.onclick = ageVerification;

let age = 0;

function ageVerification (){
    age = document.getElementById("ageInput").value;
    console.log("tvuj vek je: " + age);
    
    if(age > 99){
        window.alert("tak ty jsi uz po smrti");
    }
    else if(age < 0){
        window.alert("tobe je mene nez 0? crazy");
    }
    else{
        document.getElementById("blur").classList.add("hidden");
        document.getElementById("popUp").classList.add("hidden");
        window.alert("pokud jsi agent fbi, my overujeme vek, nebojte, tenhle popup neni jen tak pro prdel :]")
        audio.play()
    }
}

audio.volume = 0.4;