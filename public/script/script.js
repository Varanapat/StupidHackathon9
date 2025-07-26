// async function askModel(prompt) {
//     const res = await fetch("http://localhost:11434/api/generate", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model: "llama3",
//             prompt: prompt,
//             stream: false
//         })
//     });

//     const data = await res.json();
//     return data.response;
// }

// async function sendPrompt() {
//     const birth = document.getElementById('birthday').value;

//     if (!birth) return alert('Try again');

//     const p_birth = new Date(birth);
//     p_birth.setMonth(p_birth.getMonth() - 9);

//     const prompt_birth_message =
//         `ตอบกลับเป็นภาษาไทย โดยใช้ประโยคไม่เกิน 3 บรรทัด:

// 1. วันที่ ${p_birth} ตรงกับวันในปฏิทินจันทรคติว่าอย่างไร
// 2. วันนั้นตรงกับวันหยุดไทยหรือวันพิเศษใดหรือไม่
// 3. แต่งคำคม 1 บรรทัดเกี่ยวกับวันนี้
// `
//     ;

//     try {
//         document.getElementById('result').innerText = "กำลังถาม...";
//         const p_result = await askModel(prompt_birth_message);
//         document.getElementById('result').innerText += `<p><strong>วันสำคัญที่ใกล้เคียง:</strong> ${p_result} </p>`;
//     } catch (e) {
//         document.getElementById('result').innerText = 'เกิดข้อผิดพลาด: ' + e.message;
//         console.log('Failed', e);
//     }
// }

async function askAI() {
    const birth = document.getElementById('birthday').value;
    if (!birth) return alert('Try again');

    const p_birth = new Date(birth);
    p_birth.setMonth(p_birth.getMonth() - 9);

    const prompt =
        `ตอบกลับเป็นภาษาไทย โดยใช้ประโยคไม่เกิน 3 บรรทัด:

1. วันที่ ${p_birth} ตรงกับวันในปฏิทินจันทรคติว่าอย่างไร
2. วันนั้นตรงกับวันหยุดไทยหรือวันพิเศษใดหรือไม่
3. แต่งคำคม 1 บรรทัดเกี่ยวกับวันนี้
`;

    const res = await fetch('http://localhost:3000/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    document.getElementById('result').innerText = data.reply || data.error;
}