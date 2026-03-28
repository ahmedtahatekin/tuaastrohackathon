import express from "express";
import { getSolarFlares, getAlerts, getKpIndex, getGeomagneticForecast } from "../controllers/getNasa.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({status: 200, message: "yönlendirme başarılı"});
});

router.get("/nasa-donki-api-test", async (req, res) => {
    const data = await getSolarFlares();
    let status;
    if (!data || data.length === 0) {
        status = "veri yok ammk";
    } else {
        status = "nereye yok var ammk";
    }

    res.json({
        Status: status,
        Data: data  
    });

});

router.get("/get-alerts", async (req, res) => {
    const data = await getAlerts();
    let status;
    if (!data || data.length === 0) {
        status = "veri yok ammk";
    } else {
        status = "nereye yok var ammk";
    }

    res.json({
        Status: status,
        Data: data  
    });

});

router.get("/get-kp-index", async (req, res) => {
    const data = await getKpIndex();
    let status;
    if (!data || data.length === 0) {
        status = "veri yok ammk";
    } else {
        status = "nereye yok var ammk";
    }

    res.json({
        Status: status,
        Data: data  
    });

});

router.get("/get-geomagnetic-forecast", async (req, res) => {
    const data = await getGeomagneticForecast();
    let status;
    if (!data || data.length === 0) {
        status = "veri yok ammk";
    } else {
        status = "nereye yok var ammk";
    }

    res.json({
        Status: status,
        Data: data  
    });

});

export default router;