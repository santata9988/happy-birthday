const container = document.getElementById('cardContainer');
const card = document.getElementById('birthdayCard');
const sparkleBg = document.getElementById('sparkleBg');
let isCardOpened = false;
let rainInterval = null;

// 1. เอฟเฟกต์ 3D Parallax หมุนตามเมาส์ (คำนวณจากกึ่งกลางตัว Container โดยตรง)
container.addEventListener('mousemove', (e) => {
    if (isCardOpened) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);
    
    const rotateX = -y / 10;
    const rotateY = x / 10;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener('mouseleave', () => {
    if (isCardOpened) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// ค้นหาหัวข้อที่ 2. ฟังก์ชันเปิด/ปิดการ์ด แล้ววางทับด้วยโค้ดชุดนี้ครับ

// 2. ฟังก์ชันเปิด/ปิดการ์ด (แก้บักล็อกกึ่งกลางจอเมื่อกดรีเซ็ตหรือปิด)
function toggleCard() {
    card.classList.toggle('open');
    
    if (card.classList.contains('open')) {
        card.style.transform = ''; 
        isCardOpened = true;
        
        // จุดระเบิดพลุ
        setTimeout(() => explodeParticles(100), 0);
        setTimeout(() => explodeParticles(60), 300);
        setTimeout(() => explodeParticles(40), 600);
        
        // สตาร์ทฝนตก
        startBirthdayRain();
    } else {
        isCardOpened = false;
        // ล้างระบบฝนตกทันที
        if (rainInterval) {
            clearInterval(rainInterval);
            rainInterval = null;
        }
        // ล็อกการ์ดให้กลับมาตั้งตรงกึ่งกลางหน้าจอ 100% ไม่เบี้ยวตามเมาส์ค้าง
        card.style.transform = 'rotateX(0deg) rotateY(0deg)'; 
    }
}

container.addEventListener('click', toggleCard);

// 3. ฟังก์ชันสร้างพายุฝนเค้กและรูปภาพตกลงมาจากบนสุดนาน 3 วินาที
function startBirthdayRain() {
    if (rainInterval) clearInterval(rainInterval);
    
    rainInterval = setInterval(() => {
        if (!isCardOpened) return;
        
        const isCake = Math.random() > 0.5;
        
        if (isCake) {
            const cake = document.createElement('div');
            cake.classList.add('cake-rain');
            cake.innerText = Math.random() > 0.5 ? '🎂' : '🍰';
            cake.style.left = Math.random() * 100 + 'vw';
            cake.style.top = '0px'; // ล็อกจุดปล่อยตัวจากขอบบนสุดเหมือนกัน
            cake.style.animationDuration = Math.random() * 1.2 + 1.8 + 's'; // สุ่มความเร็วให้เหลื่อมล้ำดูเป็นธรรมชาติ
            document.body.appendChild(cake);
            cake.addEventListener('animationend', () => cake.remove());
        } else {
            const photo = document.createElement('img');
            photo.classList.add('photo-rain');
            photo.src = 'E29B0159-0832-4D57-BA63-C21100DA1716_1_201_a.jpeg';
            photo.style.left = Math.random() * 100 + 'vw';
            photo.style.top = '0px'; // ล็อกจุดปล่อยตัวจากขอบบนสุดเหมือนกัน
            photo.style.animationDuration = Math.random() * 1.2 + 1.8 + 's';
            document.body.appendChild(photo);
            photo.addEventListener('animationend', () => photo.remove());
        }
    }, 80);

    setTimeout(() => {
        if (rainInterval) {
            clearInterval(rainInterval);
            rainInterval = null;
        }
    }, 3000);
}

// 4. พลุกระดาษระเบิดรอบทิศทาง
function explodeParticles(count) {
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#eccc68', '#ff6b81', '#ff007f', '#00ffff'];
    const emojis = ['✨', '💖', '⭐', '🎉', '🌸', '🎈'];
    
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        
        if (Math.random() > 0.3) {
            p.style.width = Math.random() * 12 + 6 + 'px';
            p.style.height = p.style.width;
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            if (Math.random() > 0.5) p.style.borderRadius = '50%';
        } else {
            p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            p.style.fontSize = Math.random() * 18 + 15 + 'px';
        }
        
        p.style.left = '50vw';
        p.style.top = '50vh';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 320 + 120;
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 120 + 'px'; 
        const rot = Math.random() * 720 - 360 + 'deg';
        
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);
        p.style.setProperty('--rot', rot);
        
        p.style.animationDuration = Math.random() * 1.5 + 1 + 's';
        
        document.body.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
    }
}

// 5. ละอองดาวบนพื้นหลังเว็บ
function createAmbientSparkles() {
    for (let i = 0; i < 35; i++) {
        const star = document.createElement('div');
        star.innerText = Math.random() > 0.5 ? '✨' : '⭐';
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.fontSize = Math.random() * 10 + 10 + 'px';
        star.style.opacity = Math.random() * 0.4 + 0.1;
        star.style.pointerEvents = 'none';
        
        star.style.animation = `floating ${Math.random() * 4 + 3}s infinite ease-in-out`;
        star.style.animationDelay = Math.random() * 2 + 's';
        
        sparkleBg.appendChild(star);
    }
}
createAmbientSparkles();

// 6. ละอองหัวใจลอยหลังการ์ด
function spawnAmbientWishParticles() {
    if (!isCardOpened) return;
    
    const cardBack = document.querySelector('.card-back');
    const items = ['💖', '✨', '🌸', '⭐', '🎈'];
    
    const p = document.createElement('div');
    p.classList.add('ambient-particle');
    p.innerText = items[Math.floor(Math.random() * items.length)];
    p.style.fontSize = Math.random() * 10 + 12 + 'px';
    
    p.style.left = Math.random() * 80 + 10 + '%';
    p.style.bottom = '-20px';
    p.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    cardBack.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
}
setInterval(spawnAmbientWishParticles, 400);