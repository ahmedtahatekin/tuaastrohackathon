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

router.get("/gunes-firtinalari-nedir", (request, response) => {
    response.render("Info");
});

export default router;