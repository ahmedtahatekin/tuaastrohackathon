import express from "express";
import { 
    getSolarFlares, 
    getAlerts, 
    getKpIndex, 
    getGeomagneticForecast 
} from '../controllers/getNasa.controller.js';
import { mergeSpaceWeatherData } from '../utils/dataParser.utils.js';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        // 1. ADIM: Tüm verileri paralel olarak çek (Hız için kritik)
        const [nasaFlares, noaaAlerts, kpIndexData, noaaScales] = await Promise.all([
            getSolarFlares(),
            getAlerts(),
            getKpIndex(),
            getGeomagneticForecast()
        ]);

        // 2. ADIM: Kendi yazdığın util ile verileri formatla ve birleştir
        const processedData = mergeSpaceWeatherData(
            nasaFlares, 
            noaaAlerts, 
            kpIndexData, 
            noaaScales
        );

        /* 3. ADIM: EJS'e gönder
           processedData içinden gelen 3 ana yapıyı (currentStatus, recentEvents, threeDayForecast)
           doğrudan objenin içine dağıtıyoruz.
        */
        res.render('index', { 
            currentStatus: processedData.currentStatus, // Anlık Kp
            recentEvents: processedData.recentEvents,   // Olay akışı (Timeline)
            threeDayForecast: processedData.threeDayForecast // 3 günlük kartlar
        });

    } catch (error) {
        console.error("Ana sayfa yükleme hatası:", error);
        // Hata durumunda boş veri göndererek sayfanın çökmesini engelle
        res.render('index', { 
            currentStatus: null, 
            recentEvents: [], 
            threeDayForecast: [] 
        });
    }
});

router.get('/gsfgsgfas', async (req, res) => {
    try {
        // Tüm istekleri paralel başlat
        const [nasaRes, noaaAlertRes, kpRes, scalesRes] = await Promise.all([
            fetch(`https://api.nasa.gov/DONKI/FLR?startDate=2026-03-20&endDate=2026-03-28&api_key=Bvi0EPVQqCsdyuoWcGh9rFK20n0qFrPFP6UJ04Al`),
            fetch("https://services.swpc.noaa.gov/products/alerts.json"),
            fetch("https://services.swpc.noaa.gov/json/planetary_k_index_1m.json"),
            fetch("https://services.swpc.noaa.gov/products/noaa-scales.json")
        ]);

        // Verileri JSON'a çevir (AWAIT ŞART!)
        const nasaData = await nasaRes.json();
        const noaaAlerts = await noaaAlertRes.json();
        const kpData = await kpRes.json();
        const noaaScales = await scalesRes.json();

        // LOG AT VE KONTROL ET (Burada veri var mı?)
        // console.log("RAW NASA:", nasaData); 

        // ŞİMDİ BİRLEŞTİR
        const finalData = mergeSpaceWeatherData(nasaData, noaaAlerts, kpData, noaaScales);

        res.json(finalData);
   } catch (error) {
        // Hatanın ne olduğunu terminale kırmızı kırmızı yazdır
        console.error("GERÇEK HATA BURADA:", error);
        
        // Ekrana da hatanın detayını yolla ki görelim
        res.status(500).json({ 
            mesaj: "Veriler alınamadı", 
            hata_detayi: error.message,
            hata_turu: error.name
        });
    }
});

export default router;