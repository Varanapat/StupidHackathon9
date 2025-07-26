// async function calculateImportantDate() {
//     const birthdayInput = document.getElementById('birthday').value;
//     if (!birthdayInput) {
//         alert('กรุณากรอกวันเกิด');
//         return;
//     }

//     const birthday = new Date(birthdayInput);
//     const conceptionDate = new Date(birthday);
//     conceptionDate.setMonth(birthday.getMonth() - 9);

//     document.getElementById('result').innerHTML = `
//     <p>ว้นสร้างตัว: ${conceptionDate.toLocaleDateString('th-TH')}</p>
//     `;

//     // หาวันสำคัญใกล้เคียง
//     const importantEvent = await findImportantEvent(conceptionDate);

//     // สร้างแคปชันตลก ๆ ตามวันสำคัญ
//     const caption = generateFunnyCaption(importantEvent.name, conceptionDate);

//     document.getElementById('result').innerHTML += `
//     <p><strong>วันสำคัญที่ใกล้เคียง:</strong> ${importantEvent.name} - <em>${caption}</em></p>
//     `;
// }

async function askModel(prompt) {
    // End point post api
    const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek-r1",
            prompt: prompt,
            stream: false
        })
    });

    const data = await res.json();
    return data.res;
}

async function sendPrompt() {
    const birth = document.getElementById('birthday').value;

    // breakcase
    if (!birth) return alert('Try again');

    const p_birth = new Date(birth);
    p_birth.setMonth(p_birth.getMonth() - 9);

    const prompt_birth_message =
        `
    อยากรู้ว่า ${p_birth.toLocaleDateString(`th-TH`)} ตรงกับวันอะไรในปฏิทินจันทรคติและมีวันพิเศษหรือวันหยุดไทยตรงกับวันนั้นไหม พร้อมแต่ง quote สำหรับวันนี้
    `

    try {
        const p_result = await askModel(prompt_birth_message);
        document.getElementById('result').innerText += p_result;
    } catch (e) {
        console.log('Failed');
    }
}


// ข้อมูลวันสำคัญ
// const importantDates = [
//     { date: '01-01', name: 'วันขึ้นปีใหม่' },
//     { date: '14-02', name: 'วันวาเลนไทน์' },
//     { date: '13-04', name: 'วันสงกรานต์' },
//     { date: '14-04', name: 'วันสงกรานต์' },
//     { date: '15-04', name: 'วันสงกรานต์' },
//     { date: '05-05', name: 'วันฉัตรมงคล' },
//     { date: '12-08', name: 'วันแม่' },
//     { date: '05-12', name: 'วันพ่อ' },
//     { date: '31-12', name: 'วันสิ้นปี' },
//     // วันหยุดราชการ
//     { date: '06-04', name: 'วันจักรี' },
//     { date: '01-05', name: 'วันแรงงานแห่งชาติ' },
//     { date: '28-07', name: 'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว' },
//     { date: '23-10', name: 'วันปิยมหาราช' },
//     { date: '10-12', name: 'วันรัฐธรรมนูญ' },

//     // วันสำคัญทางศาสนา (พุทธ)
//     { date: 'วันขึ้น15ค่ำเดือน3', name: 'วันมาฆบูชา' }, // วันที่เปลี่ยนแปลงตามปี
//     { date: 'วันขึ้น15ค่ำเดือน6', name: 'วันวิสาขบูชา' },
//     { date: 'วันขึ้น15ค่ำเดือน8', name: 'วันอาสาฬหบูชา' },
//     { date: 'วันแรม1ค่ำเดือน8', name: 'วันเข้าพรรษา' },

//     // วันสำคัญอื่นๆ
//     { date: '14-01', name: 'วันเด็กแห่งชาติ' },
//     { date: '13-03', name: 'วันช้างไทย' },
//     { date: '26-06', name: 'วันสุนทรภู่' },
//     { date: '29-07', name: 'วันภาษาไทยแห่งชาติ' },
//     { date: '18-01', name: 'วันกองทัพไทย' },
//     { date: '09-02', name: 'วันนักประดิษฐ์' },
//     { date: '24-06', name: 'วันเปลี่ยนแปลงการปกครอง' },
//     { date: '28-07', name: 'วันเฉลิมพระชนมพรรษาสมเด็จพระเจ้าอยู่หัว' },
//     { date: '20-09', name: 'วันเยาวชนแห่งชาติ' },
//     { date: '21-10', name: 'วันทหารผ่านศึก' },
//     { date: '27-11', name: 'วันสาธารณสุขแห่งชาติ' },

//     // วันสำคัญทางวัฒนธรรม
//     { date: 'วันขึ้น15ค่ำเดือน12', name: 'วันลอยกระทง' }, // วันที่เปลี่ยนแปลงตามปี
//     { date: '14-04', name: 'วันมวยไทย' },
//     { date: '02-02', name: 'วันนักข่าว' },

//     // วันสำคัญทางการศึกษา
//     { date: '16-01', name: 'วันครู' },
//     { date: '02-04', name: 'วันหนังสือเด็กแห่งชาติ' },

//     // วันสำคัญทางการแพทย์
//     { date: '27-11', name: 'วันหมอแห่งชาติ' }
// ]

// async function findImportantEvent(date) {
//     // แปลงวันที่เป็น MM-DD
//     const targetDateStr = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

//     // หา event ที่ตรงกับวันที่
//     let exactMatch = importantDates.find(event => event.date === targetDateStr);
//     if (exactMatch) {
//         return exactMatch;
//     }

//     // ถ้าไม่เจอ exact match ให้หาความใกล้เคียงที่สุด
//     let closestEvent = importantDates[0];
//     let minDiff = Infinity;
//     const targetDayOfYear = getDayOfYear(date);

//     for (const event of importantDates) {
//         const [month, day] = event.date.split('-').map(Number);
//         const eventDate = new Date(date.getFullYear(), month - 1, day);
//         const eventDayOfYear = getDayOfYear(eventDate);

//         let diff = Math.abs(targetDayOfYear - eventDayOfYear);
//         if (diff > 183) diff = 365 - diff; // ถ้าความต่างเกินครึ่งปี

//         if (diff < minDiff) {
//             minDiff = diff;
//             closestEvent = event;
//         }
//     }
//     return closestEvent;
// }

// function getDayOfYear(date) {
//     const start = new Date(date.getFullYear(), 0, 0);
//     const diff = date - start;
//     const oneDay = 1000 * 60 * 60 * 24;
//     return Math.floor(diff / oneDay);
// }

// function generateFunnyCaption(eventName, date) {
//     switch (eventName) {
//         case 'วันขึ้นปีใหม่':
//             return `! `;
//         // เรายังไม่ได้ใส่เเคปชั้นอ่ะช่วยเพิ่มได้นะ
//     }
// }
