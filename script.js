function gorevEkle() {
    const input = document.getElementById('gorevInput');
    const gorevMetni = input.value.trim();

    if (gorevMetni === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${gorevMetni}</span>
        <button onclick="this.parentElement.remove()">Sil</button>
    `;

    document.getElementById('gorevListesi').appendChild(li);
    input.value = '';
}