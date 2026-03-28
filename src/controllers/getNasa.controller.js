
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