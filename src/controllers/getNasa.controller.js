import { mergeSpaceWeatherData } from "../utils/dataParser.utils.js";
const API_KEY = "Bvi0EPVQqCsdyuoWcGh9rFK20n0qFrPFP6UJ04Al";

// A) Güneş Patlamaları (Solar Flares): Belirtilen tarih aralığındaki güneş patlaması olaylarını ve şiddetlerini getirir.
// - İŞLEV: Güneş yüzeyindeki ani radyasyon patlamalarını ve bunların X, M, C sınıfı şiddetlerini çeker.
// - VERİ YAPISI (KEYLER):
//   * flrID: Patlamanın sistemdeki benzersiz kimlik kodu.
//   * beginTime / peakTime: Patlamanın başlangıç ve enerji bakımından zirve yaptığı anlar.
//   * classType: Patlama şiddeti (X: Yüksek Risk, M: Orta Risk, C: Normal).
//   * sourceLocation: Patlamanın Güneş üzerindeki aktif bölge koordinatı.
export const getSolarFlares = async () => {
    const url = `https://api.nasa.gov/DONKI/FLR?startDate=2026-03-20&endDate=2026-03-28&api_key=${API_KEY}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("NASA DONKI API have been unsuccessful");
        }

        let data = await res.json();
        data = data.map((item) => {
          return {
            flrID: item.flrID,
            beginTime: item.beginTime,
            peakTime: item.peakTime,
            classType: item.classType,
            sourceLocation: item.sourceLocation
          };
        });
        return data;

    }  catch (err) {
        console.error("Nasa Fetch Error: ", err);
    }
}

// B) Uzay Hava Durumu Uyarıları (Alerts): Mevcut hava olayları hakkında resmi uyarı mesajlarını ve etkilerini çeker.
// - İŞLEV: NOAA tarafından yayınlanan aktif fırtına, radyasyon ve radyo kesintisi bildirimlerini getirir.
// - VERİ YAPISI (KEYLER):
//   * product_id: Uyarının türünü belirten mesaj kodu (Örn: EF3A).
//   * issue_datetime: Uyarının yayınlandığı resmi tarih ve saat.
//   * message: Uyarının tam metni (Hangi sistemlerin, ne kadar etkileneceği burada yazar).
//   * Potential Impacts: Mesaj içeriğinde yer alan, olası teknolojik risk açıklamaları.
export const getAlerts = async () => {
  const url = "https://services.swpc.noaa.gov/products/alerts.json";

  try {
    const res = await fetch(url);
    let data = await res.json();
    data = data.map((item) => {
      return {
        product_id: item.product_id,
        issue_datetime: item.issue_datetime,
        message: item.message,
        potential_impacts: item.message.split("\n").filter(line => line.includes("Potential Impacts:"))[0]?.replace("Potential Impacts:", "").trim() || "Belirtilmemiş"
      };
    });

    return data;
  } catch (err) {
    console.error("NOAA alerts error:", err);
  }
}

// C) Manyetik Aktivite Seviyesi (Kp-Index): Dünyanın manyetik alanındaki aktivite seviyesini (0-9 ölçekli) çeker.
// - İŞLEV: Manyetik alanın ne kadar "çalkantılı" olduğunu gösteren en güncel (son 1 dakikalık) veriyi getirir.
// - VERİ YAPISI (KEYLER):
//   * time_tag: Verinin kaydedildiği güncel zaman damgası.
//   * kp_index: 0 (Sakin) ile 9 (Ekstrem Fırtına) arası manyetik aktivite değeri.
//   * estimated_kp: Ölçülen değerin daha hassas, ondalıklı tahmini.
export const getKpIndex = async () => {
  const url = "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json";

  const res = await fetch(url);
  const data = await res.json();
  
  return data;
}

// D) 3-Day Forecast: Önümüzdeki 72 saat için öngörülen jeomanyetik aktivite ve fırtına olasılığı tahminlerini çeker.
// - İŞLEV: Gelecek 3 gün için G (Jeomanyetik), S (Solar Radyasyon) ve R (Radyo Kesintisi) ölçekli fırtına tahminlerini getirir.
// - VERİ YAPISI (KEYLER):
//   date: Tahminin yapıldığı gün.
//   G / S / R: Fırtına şiddet seviyeleri (Örn: "G1", "0" vb.).
//   text: Tahminle ilgili kısa açıklama notu.
export const getGeomagneticForecast = async () => {
  try {
    const url = "https://services.swpc.noaa.gov/products/noaa-scales.json";

    const res = await fetch(url);
    if (!res.ok) throw new Error("Veri çekilemedi");

    const rawData = await res.json();

    const data = Object.values(rawData).map((item) => {
      return {
        date: item.date,
        G: item.G,
        S: item.S,
        R: item.R,
        text: item.text
      };
    });

    return data;
  } catch (err) {
    console.error("NOAA forecast error:", err);
  }
}