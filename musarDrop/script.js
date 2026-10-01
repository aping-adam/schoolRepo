//if(sessionStorage.getItem("userId") == null){
//    window.alert("please login or register");
//    window.location.href="./login/";
//}

//const userId = sessionStorage.getItem("userId");

const weaponIcon = document.getElementById("weaponIcon");

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


//backend comunication

async function login(){
    const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    console.log(data.userId);
};

async function createUser() {
    const response = await fetch("http://localhost:3000/api/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    
    const data = await response.json();
    console.log("server response: ", data);
}


async function najdiNejblizsiCenu() {
    const vychoziCena = Math.random()*100;
    const limit = vychoziCena * 10;

    const response = await fetch("./free_prices.json");
    const json = await response.json();

    let nejlepsi = null;

    for (const item of json.data.items) {
        for (const zaznamCeny of item.prices ?? []) {
            const cena = Number(zaznamCeny.price);

            if (
                Number.isFinite(cena) &&
                cena <= limit &&
                (!nejlepsi || cena > nejlepsi.price)
            ) {
                nejlepsi = {
                    name: item.market_hash_name,
                    price: cena
                };
            }
        }
    }

    if (nejlepsi) {
        console.log("Limit:", limit);
        console.log("Nejbližší položka pod limitem:", nejlepsi);

        const nejlepsiSliced = nejlepsi.name;
        let nejlepsiResult = nejlepsiSliced.split("(");
        nejlepsiResult = nejlepsiResult[0];
        nejlepsiResult = nejlepsiResult.replace("Souvenir", " ");
        nejlepsiResult = nejlepsiResult.replace("StatTrak™", " ");
        nejlepsiResult = nejlepsiResult.trim();
        
        const resultForFetch = nejlepsiResult;

        console.log(resultForFetch);


        const response = await fetch("./skins.json");
        const data = await response.json();

//        console.log(data);

        const index = await data.findIndex(skin => skin.name === resultForFetch);
        console.log(index);
        weaponIcon.src = data[index].image;
    }
    else {
        console.log("Nenašla se žádná cena do limitu", limit);
    }
}

najdiNejblizsiCenu().catch(console.error);