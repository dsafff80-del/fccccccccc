document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const bgAudio = document.getElementById("bg-audio");
    
    const darken = document.createElement("div");
    darken.className = "overlay-darken";
    document.body.appendChild(darken);

    const nodes = [
        { el: document.getElementById("node-1"), vid: document.getElementById("vid1"), lock: document.getElementById("lock-1"), text: document.getElementById("text-1") },
        { el: document.getElementById("node-2"), vid: document.getElementById("vid2"), lock: document.getElementById("lock-2"), text: document.getElementById("text-2") },
        { el: document.getElementById("node-3"), vid: document.getElementById("vid3"), lock: document.getElementById("lock-3"), text: document.getElementById("text-3") }
    ];

    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        bgAudio.play().catch(() => {});
        nodes[0].el.classList.add("active");
    });

    nodes.forEach((node, index) => {
        node.vid.addEventListener("click", () => {
            // Sadece aktif olan video büyütülebilir
            if (node.el.classList.contains("active")) {
                node.el.classList.add("expanded");
                darken.style.display = "block";
                node.vid.muted = false; // Sesi aç
                node.vid.play();
            }
        });

        node.vid.onended = () => {
            // Büyüme modundan çık
            node.el.classList.remove("expanded");
            darken.style.display = "none";
            
            // Veriyi çözülmüş gibi göster 
            node.lock.innerHTML = ">> DATA_EXTRACTED_SUCCESS";
            node.lock.style.color = "#00ff00";
            node.text.classList.remove("hidden");
            
            // Bir sonraki videoyu erişime aç
            if (index + 1 < nodes.length) {
                nodes[index + 1].el.classList.add("active");
                // Hafif bozulma efekti için otomatik kaydırılabilir
                nodes[index + 1].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };
    });
});