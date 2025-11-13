// 1. Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    gorevleriYukle(); // Sayfa açılınca kayıtlı görevleri yükle
});

// 2. Global görevler dizisi - Tüm görevleri burada tutacağız
let gorevler = [];

// 3. GÖREV EKLEME FONKSİYONU (Güncellendi)
function gorevEkle() {
    const input = document.getElementById('gorevInput');
    const gorevMetni = input.value.trim();

    if (gorevMetni === '') return;

    // Yeni görev objesi oluştur
    const yeniGorev = {
        id: Date.now(), // Benzersiz ID (şu anki zamanın milisaniyesi)
        metin: gorevMetni,
        tamamlandi: false
    };

    gorevler.push(yeniGorev); // Diziye ekle
    kaydetVeYenile(); // localStorage'e kaydet ve ekranı güncelle
    input.value = ''; // Input'u temizle
}

// 4. GÖREV SİLME FONKSİYONU
function gorevSil(id) {
    gorevler = gorevler.filter(gorev => gorev.id !== id);
    kaydetVeYenile();
}

// 5. LOCALSTORAGE İŞLEMLERİ
function kaydetVeYenile() {
    // Diziyi JSON string'ine çevirip kaydet
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
    // Ekranı güncelle
    gorevleriGoster();
}

function gorevleriYukle() {
    // localStorage'den veriyi oku
    const kayitliGorevler = localStorage.getItem('gorevler');
    
    if (kayitliGorevler) {
        // JSON string'ini tekrar diziye çevir
        gorevler = JSON.parse(kayitliGorevler);
        gorevleriGoster();
    }
}

// 6. EKRANI GÜNCELLEME
function gorevleriGoster() {
    const liste = document.getElementById('gorevListesi');
    liste.innerHTML = ''; // Listeyi temizle

    gorevler.forEach(gorev => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${gorev.metin}</span>
            <button onclick="gorevSil(${gorev.id})">Sil</button>
        `;
        liste.appendChild(li);
    });
}

// 7. GÜNÜ SIFIRLAMA FONKSİYONU
function gunuSifirla() {
    if (confirm('Tüm görevler silinecek ve gün sıfırlanacak. Emin misin?')) {
        gorevler = []; // Diziyi boşalt
        kaydetVeYenile(); // localStorage'ı temizle ve ekranı güncelle
    }
}