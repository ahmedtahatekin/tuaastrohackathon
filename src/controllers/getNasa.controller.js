
const API_KEY = "Bvi0EPVQqCsdyuoWcGh9rFK20n0qFrPFP6UJ04Al";

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

export const getAlerts = async () => {
  const url = "https://services.swpc.noaa.gov/products/alerts.json";

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.error("NOAA alerts error:", err);
  }
}

export const getKpIndex = async () => {
  const url = "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json";

  const res = await fetch(url);
  const data = await res.json();

  const latest = data[data.length - 1];

  console.log("Kp Index:", latest.kp_index);
}

export const getGeomagneticForecast = async () => {
  const url = "https://services.swpc.noaa.gov/json/3-day-geomag-forecast.json";

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
}