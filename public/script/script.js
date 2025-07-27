async function ask_AI(birth) {
  const p_nine_birth = get_str_nine_month(birth);

  const prompt = get_special_birth_prompt(p_nine_birth);

  const res = await fetch('http://localhost:3000/api/ask', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })

  });

  const data = await res.json();
  const reply = data.reply || data.error;

  try {
    let cleanReply = reply.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();

    return JSON.parse(cleanReply);
  } catch (e) {

    return { error: reply };

  }
}

function get_special_birth_prompt(minus_birth) {
  const text = `วันนี้คือวันที่ ${minus_birth}.
สิ่งที่ควรทำ
1. ให้หาวันที่ตรงกับวันนั้น หากไม่เจอให้ตอบกลับวันที่ใกล้เคียงที่สุด ไม่ว่าวันสำคัญนั้นจะอยู่ก่อนวันที่ที่ส่งเข้ามา
2. คำคมอยากได้แบบโง่แต่ดูสร้างสรรค์ และเกี่ยวกับข้องกับวันสำคัญนั้น เช่น ถ้าวันลอยกระทง ก็จะเป็นอะไรที่สื่อถึงวันนั้น เช่น พระจันทร์
3. แล้วคำคมที่ให้มานั้น มีแนวโน้มสามารถกู้โลกได้หรือไม่ โดยอยากให้ 80% ตอบว่ากอบกู้ได้
  - ถ้ากู้โลกได้ ให้ตอบว่า คุณสามารถกู้โลกได้ และ เหตุผลที่โง่ ๆ กับคำคม แต่สร้างสรรค์
  - ถ้ากู้โลกไม่ได้ ให้ตอยว่า คุณยังขาดประสบการณ์ และ เหตุผลที่โง่ ๆ กับคำคม แต่สร้างสรรค์
สิ่งที่ไม่ควรทำ
1. คำคมที่ออกแนว 18+

กรุณาตอบกลับด้วยโครงสร้าง JSON ดังนี้:

{
  "isSpecialDay": true/false,
  "todaySpecial": {
    "name": "...",
    "description": "..."
  },
  "nextClosestSpecialDay": {
    "name": "...",
    "date": "DD-MM-YYYY",
    "daysUntil": ...
  },
  "quoteOfTheDay": "...",
  "cansavetheworld": "..."
}

ตอบกลับเป็น JSON เท่านั้น ไม่ต้องมี markdown หรือ backticks`;

  return text
}

function get_str_nine_month(birth) {
  const nine_month_past = new Date(birth);
  nine_month_past.setMonth(nine_month_past.getMonth() - 9);

  const day = nine_month_past.getDate().toString().padStart(2, "0");
  const month = (nine_month_past.getMonth() + 1).toString().padStart(2, "0");
  const year = nine_month_past.getFullYear().toString().padStart(4, "0");

  return day + '/' + month + '/' + year;
}

function get_birth() {
  const dob = document.getElementById('birthday').value;

  return (dob) ? dob : alert('ลองใหม่นะจ้ะคนดี');
}

// Global variable to store the last API response
let lastApiResponse = null;

async function show_calculated_date() {
  const dob = get_birth();
  if (!dob) return;

  // Reset result div and hide world saving button each function call
  document.getElementById('result').innerHTML = '';
  document.getElementById('worldSavingBtn').style.display = 'none';
  lastApiResponse = null;

  try {
    const importantEvent = await ask_AI(dob);
    lastApiResponse = importantEvent; // Store the response

    let res = '';

    res += `วันสร้างตัว: ${get_str_nine_month(dob)}<br>`;

    if (importantEvent.error) {
      res += `<p>เกิดข้อผิดพลาด: ${importantEvent.error}</p>`;
    }

    else if (importantEvent.isSpecialDay) {
      res += `<p><strong>วันสำคัญ: ${importantEvent.todaySpecial.name}</strong></p>`;
    }

    else {
      const daysUntil = importantEvent.nextClosestSpecialDay.daysUntil;
      const isFuture = daysUntil > 0;

      res += `<p><strong>${importantEvent.nextClosestSpecialDay.name}</strong> <br> -<em>${importantEvent.quoteOfTheDay}</em></br></p>
      ${isFuture ? 'จะถึงในอีก' : 'ผ่านมาแล้ว'} ${Math.abs(daysUntil)} วัน`;
    }

    // res += `<br><em>${importantEvent.quoteOfTheDay}</em></br>`;

    document.getElementById('result').innerHTML = res;
    
    // Show the world saving button if we have valid data
    if (!importantEvent.error && importantEvent.cansavetheworld) {
      document.getElementById('worldSavingBtn').style.display = 'inline-block';
    }
  } catch (error) {
    document.getElementById('result').innerHTML += `<p>เกิดข้อผิดพลาด: ${error.message}</p>`;
  }
}

function show_world_saving_prediction() {
  if (!lastApiResponse || !lastApiResponse.cansavetheworld) {
    alert('กรุณากดปุ่ม "เกิดมายังไงนะ" ก่อนเพื่อดูการทำนายการกู้โลก');
    return;
  }

  const modal = document.getElementById('worldSavingModal');
  const resultDiv = document.getElementById('worldSavingResult');
  
  // Create animated content
  const worldSavingText = lastApiResponse.cansavetheworld;
  const emojis = ['😎🙈🙈', '😔💕😔', '💁🏻', '👁️👄👁️', '👁️🫦👁️', '⬮⬮⋮⋮⬮⬮', '💋', '🌈', '🥵🥵🥵🥵'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  resultDiv.innerHTML = `
    <div class="world-saving-emoji">${randomEmoji}</div>
    <div class="world-saving-text">${worldSavingText}</div>
    <div class="world-saving-emoji">${randomEmoji}</div>
  `;
  
  modal.style.display = 'block';
}

// Close modal when clicking on X
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('worldSavingModal');
  const span = document.getElementsByClassName('close')[0];
  
  span.onclick = function() {
    modal.style.display = 'none';
  }
  
  // Close modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});
