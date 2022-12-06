var bacanjeBr = 0
var poeniIgracJedan = 0
var poeniIgracDva = 0
var rezultatJedan = 0
var rezultatDva = 0
var kockaJedan = document.querySelector('.prva')
var kockaDva = document.querySelector('.druga')
var bacanje = document.querySelector('.bacanje');
var dugmeBacaj = document.querySelector('.btn-primary');
var dugmeNovaRunda = document.querySelector('.btn-warning');
var dugmeNovaIgra = document.querySelector('.btn-success');
var igracJedanPrompt = prompt('Crveni igrač')
var igracDvaPrompt = prompt('Crni igrač')
var igracJedanDiv = document.querySelector('.igracJedan')
var igracDvaDiv = document.querySelector('.igracDva')
var kruzic = document.querySelector('.krug');
var kontejner = document.querySelector('.container')
var zvukKocke = new Audio("audio/dice.mp3")
var zvukPobede = new Audio("audio/victory.mp3")
var zvukRunde = new Audio("audio/beep.wav")
var zvukKlik = new Audio("audio/click.mp3")
var info = document.querySelector('.krug-info')
var openInfo = document.querySelector('.info-open')
var sirinaEkrana = screen.width
var naslov = document.querySelector('h1')
var rand1;
var rand2;



info.addEventListener('click', () => {
    zvukKlik.play()
    info.style.display = 'none'
    openInfo.style.display = 'block'
    if(sirinaEkrana < 420) {
        naslov.style.display = 'none'
    }
    if(openInfo.style.display == 'block') {
        dugmeBacaj.setAttribute('disabled', 'disabled')
        dugmeNovaIgra.setAttribute('disabled', 'disabled')
        dugmeNovaRunda.setAttribute('disabled', 'disabled')
    }  
})

openInfo.addEventListener('click', ()=>{
    zvukKlik.play()
    info.style.display = 'block'
    openInfo.style.display = 'none'
    if(info.style.display == 'block') {
        dugmeBacaj.removeAttribute('disabled')
        dugmeNovaIgra.removeAttribute('disabled')
        dugmeNovaRunda.removeAttribute('disabled')
    }
})

if(openInfo.style.display == 'block') {
    dugmeBacaj.setAttribute('disabled', 'disabled')
    dugmeNovaIgra.setAttribute('disabled', 'disabled')
    dugmeNovaRunda.setAttribute('disabled', 'disabled')
}

function rezultat() {
    bacanje.innerHTML = `<h2>Ukupan rezultat: <span class="crveni">${rezultatJedan}</span> : <span class="crni">${rezultatDva}</span></h2>`
}

kruzic.innerHTML = '0'
rezultat()

if (igracJedanPrompt != null && igracDvaPrompt != null ) {
    var igracJedan = document.querySelector('.igracJedan h3').innerHTML = `${igracJedanPrompt}`
    var igracDva = document.querySelector('.igracDva h3').innerHTML = `${igracDvaPrompt}`
}

dugmeBacaj.addEventListener('click', bacanjeKocke)

function bacanjeKocke() {
    zvukKocke.play()
    dugmeBacaj.style.display = 'none'
    bacanjeBr ++
    kruzic.innerHTML = bacanjeBr
    rezultat()
    rand1 = Math.ceil(Math.random()*6)
    poeniIgracJedan += rand1
    randRot(rand1, kockaJedan, 'rolling', 'Jedan', igracJedanPrompt, poeniIgracJedan)
    rand2 = Math.ceil(Math.random()*6)
    poeniIgracDva += rand2
    randRot(rand2, kockaDva, 'rollingDva', 'Dva', igracDvaPrompt, poeniIgracDva)
    if(bacanjeBr == 6) {
        setTimeout(() => {
            zvukRunde.play()
            dugmeBacaj.style.display = 'none'
            dugmeBacaj.style.display = 'none'
            dugmeNovaRunda.style.display = 'inline-block'
            if(poeniIgracJedan > poeniIgracDva) {
                rezultatJedan ++
                rezultat()
            }else if (poeniIgracJedan < poeniIgracDva) {
                rezultatDva ++
                rezultat()
            }
            if(rezultatJedan == 3 || rezultatDva == 3) {
                zvukPobede.play()
                dugmeNovaRunda.style.display = 'none'
                dugmeBacaj.style.display = 'none'
                dugmeNovaIgra.style.display = 'inline-block'
                if (rezultatJedan > rezultatDva) {
                    bacanje.classList.add('pobednik')
                    bacanje.style.background = 'red'
                    kontejner.classList.add('levi')
                    bacanje.innerHTML = `Pobednik je ${igracJedanPrompt}!`
                } else if (rezultatJedan < rezultatDva) {
                    bacanje.classList.add('pobednik')
                    bacanje.style.background = 'black'
                    kontejner.classList.add('desni')
                    bacanje.innerHTML = `Pobednik je ${igracDvaPrompt}!`  
                }
            }
        }, 2050); 
    }
}

function randRot(rand, kocka, rolling, igrac, igracPrompt, poeniIgrac) {
    switch(rand) {
        case 1: 
            kocka.style.transform = 'rotateX(0deg) rotateY(0deg)'
            break;
        case 2:
            kocka.style.transform = 'rotateX(-90deg) rotateY(0deg)'
            break;
        case 3:
            kocka.style.transform = 'rotateX(0deg) rotateY(90deg)'
            break;
        case 4:
            kocka.style.transform = 'rotateX(0deg) rotateY(-90deg)'
            break;
        case 5:
            kocka.style.transform = 'rotateX(90deg) rotateY(0deg)'
            break;
        case 6:
            kocka.style.transform = 'rotateX(180deg) rotateY(0deg)'
            break;
        default:
            break;
    }
    kocka.style.animation = `${rolling} 2s`;

    setTimeout(() => {
        poeni = document.querySelector(`.igrac${igrac} h3`).innerHTML = `${igracPrompt}<br> <span class="poeni">${poeniIgrac}</span>`
        kocka.style.animation = 'none'
        if(dugmeNovaRunda.style.display == 'inline-block') {dugmeBacaj.style.display = 'none'}
        else if(dugmeNovaIgra.style.display == 'inline-block') {dugmeBacaj.style.display = 'none'}
        else {dugmeBacaj.style.display = 'inline-block'}
    }, 2050)
}

function bacanjeBrNula(){ 
    poeniIgracJedan = 0    
    poeniIgracDva = 0
    poeniJedan = document.querySelector('.igracJedan h3').innerHTML = `${igracJedanPrompt}<br><span class="poeni">${poeniIgracJedan}</span>`
    poeniDva = document.querySelector('.igracDva h3').innerHTML = `${igracDvaPrompt}<br><span class="poeni">${poeniIgracDva}</span>`
}

function clearClass() {
    kontejner.classList.remove('levi')
    kontejner.classList.remove('desni')
    bacanje.classList.remove('pobednik')
}

dugmeNovaRunda.addEventListener('click', novaRunda)

function novaRunda() {
    zvukRunde.pause()
    dugmeNovaRunda.style.display = 'none'
    dugmeBacaj.style.display = 'inline-block'
    bacanjeBr = 0
    rezultat()
    if (bacanjeBr == 0) { 
        kruzic.innerHTML = bacanjeBr
        bacanjeBrNula()
        clearClass()
        rezultat()
    }
}

dugmeNovaIgra.addEventListener('click', novaIgra)

function novaIgra() {
    zvukPobede.pause()
    dugmeNovaIgra.style.display = 'none'
    dugmeBacaj.style.display = 'inline-block'
    bacanjeBr = 0
    rezultat()    
    bacanje.style.background = 'transparent'
    if (bacanjeBr == 0) {  
        kruzic.innerHTML = bacanjeBr
        rezultatJedan = 0
        rezultatDva = 0
        rezultat()
        bacanjeBrNula()
        clearClass()
    }
}


