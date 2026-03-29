export const mergeSpaceWeatherData = (nasaFlares, noaaAlerts, kpIndexData, noaaScales) => {
    
    // 1. NASA FLR: Direkt dizi olarak işle
    const flares = (Array.isArray(nasaFlares) ? nasaFlares : []).map(f => ({
        type: 'SOLAR_FLARE',
        id: f.flrID || 'no-id',
        time: f.beginTime, 
        peakTime: f.peakTime,
        intensity: f.classType, 
        location: f.sourceLocation,
        source: 'NASA DONKI'
    }));

    // 2. NOAA ALERTS: Direkt dizi olarak işle
    const alerts = (Array.isArray(noaaAlerts) ? noaaAlerts : []).map(a => ({
        type: 'NOAA_ALERT',
        id: a.product_id,
        time: a.issue_datetime,
        message: a.message,
        source: 'NOAA SWPC'
    }));

    // 3. KP INDEX: kpIndexData direkt bir dizi!
    const rawKpList = Array.isArray(kpIndexData) ? kpIndexData : [];
    const latestKp = rawKpList.length > 0 ? rawKpList[rawKpList.length - 1] : null;

    const kpStatus = latestKp ? {
        type: 'KP_INDEX',
        time: latestKp.time_tag ? latestKp.time_tag + "Z" : new Date().toISOString(),
        value: latestKp.kp_index,
        estimated: latestKp.estimated_kp,
        source: 'NOAA Kp-Index'
    } : null;

    // 4. NOAA SCALES: noaaScales direkt bir dizi!
    const rawScales = Array.isArray(noaaScales) ? noaaScales : [];
    const forecasts = rawScales.map((item, index) => {
        const forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + index);
        
        return {
            type: 'FORECAST',
            date: forecastDate.toISOString().split('T')[0],
            geomagnetic: item.G?.Scale || "0",
            solarRadiation: item.S?.Scale || "0",
            radioBlackout: item.R?.Scale || "0",
            description: item.G?.Text || "Normal",
            source: 'NOAA Scales'
        };
    });

    // 5. BİRLEŞTİRME
    const timeline = [...flares, ...alerts];
    if (kpStatus) timeline.push(kpStatus);

    // Tarih sıralaması (issue_datetime ve beginTime formatları farklı olabilir, güvenli sıralama yapıyoruz)
    const sortedTimeline = timeline.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateB - dateA;
    });

    // 6. SONUÇ
    // Eğer hiçbir olay yoksa boş dönmesin, INFO eklesin
    const finalEvents = sortedTimeline.length > 0 ? sortedTimeline : [{
        type: 'INFO',
        message: 'Şu an aktif bir güneş fırtınası veya uyarı bulunmuyor.',
        time: new Date().toISOString()
    }];

    return {
        currentStatus: kpStatus,
        recentEvents: finalEvents,
        threeDayForecast: forecasts
    };
};