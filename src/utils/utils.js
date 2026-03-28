const Rscore = function (Gval, Sval, Rval) {
    
      const Rscore =((Gval/5) * (Sval/5) * 0.3 + (Rval/5) * 0.2) * 100
        return Rscore
    }

    export const careerData = {
    pilot: {
        low: "Uçuş güvenli.",
        high: "KRİTİK: Radyasyon riski! Kutup rotalarını kullanmayın."
    },
    engineer: {
        low: "Şebeke stabil.",
        high: "DİKKAT: Voltaj dalgalanması bekleniyor, trafoları izleyin."
    }
};


/*
    async function firtinaVerisiniGetir() {
    const cevap = await fetch('https://services.swpc.noaa.gov/json/advisory-display.json');
    
    const hamVeri = await cevap.json();

    const gVal = parseInt(hamVeri[0].status.replace(/\D/g, '')) || 0;
    const sVal = 0; 
    const rVal = 0;

    const sonuc = Rscore(gVal, sVal, rVal)
    console.log("Hesaplanan Risk Puanı:", sonuc.Rscore);

    return
}

firtinaVerisiniGetir();

console.log ("fırtına yüzdeliği" + firtinaVerisiniGetir() + "durumunda")
export { Rscore, firtinaVerisiniGetir };
*/