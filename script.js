// ฟังก์ชันเปิด/ปิดการ์ด
function toggleCard() {
    const card = document.getElementById('birthdayCard');
    card.classList.toggle('open');
    
    // ถ้าเป็นการเปิดการ์ด ให้จุดพลุกระดาษ (Confetti)
    if (card.classList.contains('open')) {
        createConfetti();
    }
}

// ฟังก์ชันสร้างเอฟเฟกต์พลุกระดาษโปรยลงมา
function createConfetti() {
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#eccc68', '#ff6b81'];
    
    // สร้างเศษกระดาษ 100 ชิ้น
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // สุ่มตำแหน่ง X, สี, ขนาด และความเร็วในการตก
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // ตกในเวลา 2-5 วินาที
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        document.body.appendChild(confetti);
        
        // ลบ Element ทิ้งเมื่อแอนิเมชันจบ เพื่อป้องกันเครื่องกระตุก
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}