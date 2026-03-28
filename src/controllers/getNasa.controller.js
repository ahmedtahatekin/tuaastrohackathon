
const API_KEY = "Bvi0EPVQqCsdyuoWcGh9rFK20n0qFrPFP6UJ04Al";

// NASA DONKI API: Belirtilen tarih aralığındaki Güneş Patlaması (Solar Flare) olaylarını ve şiddetlerini (X, M, C sınıfı) getirir.
export const getSolarFlares = async () => {
    const url = `https://api.nasa.gov/DONKI/FLR?startDate=2026-03-20&endDate=2026-03-28&api_key=${API_KEY}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("NASA DONKI API have been unsuccessful");
        }

        const data = await res.json();
        return data;
    }  catch (err) {
        console.error("Nasa Fetch Error: ", err);
    }
}

// NOAA Alerts: Mevcut uzay havası olayları (Fırtına, Radyasyon, Radyo Kesintisi) hakkında resmi uyarı mesajlarını ve potansiyel etkilerini çeker
export const getAlerts = async () => {
  const url = "https://services.swpc.noaa.gov/products/alerts.json";

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("NOAA alerts error:", err);
  }
}

// Planetary K-Index: Dünyanın manyetik alanındaki aktivite seviyesini ölçen (0-9 ölçekli) en güncel veriyi çeker
export const getKpIndex = async () => {
  const url = "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json";

  const res = await fetch(url);
  const data = await res.json();

  const latest = data[data.length - 1];

  console.log(data, "\n\n");
  console.log(latest, "\n\n");
  console.log(latest.kp_index, "\n\n");
  return latest.kp_index;
}

// 3-Day Forecast: Önümüzdeki 72 saat için öngörülen jeomanyetik aktivite ve fırtına olasılığı tahminlerini çeker
export const getGeomagneticForecast = async () => {
  try {
    const url = "https://services.swpc.noaa.gov/json/3-day-geomag-forecast.json";

    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("NOAA forecast error:", err);
  }
}