const searchInput = document.getElementById('search-input');
const orderedList = document.getElementById('ordered-list');
const buttons = document.querySelectorAll('.profession-btn');

// Modal overlay ve kutu
const modalOverlay = document.createElement('div');
modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(10px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
`;
document.body.appendChild(modalOverlay);

const modalContent = document.createElement('div');
modalContent.style.cssText = `
    background: linear-gradient(145deg, rgba(0,68,146,0.95), rgba(139,92,246,0.8));
    backdrop-filter: blur(20px);
    border: 2px solid #00d4ff;
    border-radius: 20px;
    padding: 40px;
    max-width: 80vw;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,212,255,0.5);
    transform: scale(0.8);
    transition: all 0.3s ease;
    text-align: center;
`;
modalOverlay.appendChild(modalContent);

const modalClose = document.createElement('button');
modalClose.innerHTML = '✕';
modalClose.style.cssText = `
    position: absolute;
    top: 15px;
    right: 20px;
    background: rgba(255,0,0,0.8);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s;
`;
modalContent.appendChild(modalClose);

// Modal içerikleri (10 farklı kutu içeriği)
const modalContents = [
    '🚀 1. Astronot Detayları<br><br>Astronotlar uzayda görev yapar. NASA/ESA uzay ajanslarında çalışır. Fiziksel dayanıklılık ve bilim bilgisi gerekir.',
    '🔧 2. Uzay Mühendisi Detayları<br><br>Roket, uydu tasarımı yapar. Malzeme bilimi ve aerodinamik uzmanlığı şart.',
    '✈️ 3. Pilot Detayları<br><br>Uzay mekiği pilotu. Uçuş simülatörü eğitimi zorunlu. Hızlı karar verme yeteneği.',
    '⚛️ 4. Fizikçi Detayları<br><br>Uzay fiziği, kuantum mekaniği uzmanı. Matematik ve deneysel fizik bilgisi.',
    '🧬 5. Biyolog Detayları<br><br>Uzay biyolojisi, mikrogravite deneyleri. Genetik ve mikrobiyoloji bilgisi.',
    '📊 6. Veri Bilimci Detayları<br><br>Uzay teleskop verilerini analiz eder. Python, Machine Learning uzmanı.',
    '🎨 7. Tasarımcı Detayları<br><br>Uzay aracı UI/UX tasarımcısı. 3D modelleme ve grafik tasarım.',
    '👨‍💼 8. Yönetici Detayları<br><br>Uzay projesi yöneticisi. Risk analizi ve ekip koordinasyonu.',
    '🔭 9. Astrofizikçi Detayları<br><br>Evrenin kökeni, kara delikler. Teleskop verileri analizi.',
    '🛰️ 10. Uydu Operatörü Detayları<br><br>Uydu yörünge kontrolü. Radar ve iletişim sistemleri.'
];

// Orta liste div'lerine tıkla modal aç
const listItems = orderedList.querySelectorAll('li');
listItems.forEach((li, index) => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')) return;
        if (index < 10) {
            modalContent.innerHTML = modalClose.outerHTML + modalContents[index];
            modalOverlay.style.opacity = '1';
            modalOverlay.style.visibility = 'visible';
            modalContent.style.transform = 'scale(1)';
        }
    });
});

// Modal kapatma
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.opacity = '0';
        modalOverlay.style.visibility = 'hidden';
        modalContent.style.transform = 'scale(0.8)';
    }
});
modalClose.addEventListener('click', () => {
    modalOverlay.style.opacity = '0';
    modalOverlay.style.visibility = 'hidden';
    modalContent.style.transform = 'scale(0.8)';
});

// ESC tuşu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalOverlay.style.opacity = '0';
        modalOverlay.style.visibility = 'hidden';
        modalContent.style.transform = 'scale(0.8)';
    }
});

// Arama fonksiyonu
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    buttons.forEach(btn => {
        const prof = btn.dataset.prof.toLowerCase();
        btn.classList.toggle('hidden', !prof.includes(query));
    });
});

// Meslek butonları sadece hover ve filtre, tıklama yok
buttons.forEach(button => {
    button.style.pointerEvents = 'none';
});