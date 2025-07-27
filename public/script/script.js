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
1. วันนี้ตรงกับวันพิเศษ (เช่น วันหยุด, วันสำคัญ, วันประหลาด ฯลฯ) หรือไม่? 
    - ถ้าใช่ ให้ระบุชื่อวันนั้น และคำอธิบายสั้น ๆ
2. ถ้าไม่ใช่วันพิเศษ ให้บอกว่า "ใกล้ที่สุดคือวันอะไร" และจะถึงในอีกกี่วัน
3. ให้คำคมแบบสั้น ๆ ที่ "เกี่ยวข้องกับวันพิเศษที่จะมาถึง ดูโง่แต่สร้างสรรค์" เพื่อลงท้าย เช่น "ถ้าไม่มีอะไรทำ ก็ลองหายใจดู" และอยากให้มีความเชื่อมโยงถึงเหตุผล ทำไมถึงมีลูกในวันนี้

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
  "quoteOfTheDay": "..."
}

ตอบกลับเป็น JSON เท่านั้น ไม่ต้องมี markdown หรือ backticks`;

  return text
}

function get_str_nine_month(birth) {
  const nine_month_past = new Date(birth);
  nine_month_past.setMonth(nine_month_past.getMonth() - 9);

  const day = nine_month_past.getDay().toString().padStart(2, "0");
  const month = nine_month_past.getMonth().toString().padStart(2, "0");
  const year = nine_month_past.getFullYear().toString().padStart(4, "0");

  return day + '/' + month + '/' + year;
}

function get_birth() {
  const dob = document.getElementById('birthday').value;

  return (dob) ? dob : alert('ลองใหม่นะจ้ะคนดี');
}

async function show_calculated_date() {
  const dob = get_birth();
  if (!dob) return;

  // Reset result div each function call
  document.getElementById('result').innerHTML = '';

  try {
    const importantEvent = await ask_AI(dob);

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
  } catch (error) {
    document.getElementById('result').innerHTML += `<p>เกิดข้อผิดพลาด: ${error.message}</p>`;
  }
}
