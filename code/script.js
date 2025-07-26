function calculate() {
    const input = document.getElementById('birthDate').value;
    if (!input) return alert("กรุณาใส่วันเกิดก่อนนะ!");
    console.log(input);

    // แปลงวันเกิด

    // birthDate เอาไว้เก็บวันเกิด ยาวๆๆๆ
    const birthDate = new Date(input);

    // beforeBirth คือย้อนหลังไป 9 เดือน
    const beforeBirth = new Date(birthDate.setMonth(birthDate.getMonth() - 9));

    // กำลงกำหนด รูปแบบวันเกิด
    const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    };

    // ThaiBirthDay คือวันเกิดไทย แปลงเป็นไทยเเล้ว
    const ThaiBirthDay = beforeBirth.toLocaleDateString("th-TH",options);
    console.log(day)

    // ทดสอบ ตัวอย่างวันสำคัญบางวัน
    const specialDays = {
    '1 มกราคม': 'วันขึ้นปีใหม่',
    '14 กุมภาพันธ์': 'วันวาเลนไทน์',
    '1 เมษายน': 'วันโกหก',
    '13 เมษายน': 'วันสงกรานต์',
    '31 ตุลาคม': 'ฮาโลวีน',
    '5 ธันวาคม': 'วันพ่อแห่งชาติ'
    };

    const monthDay = `${beforeBirth.getDate()} ${beforeBirth.toLocaleString('th-TH', { month: 'long' })}`;
    // console.log(monthDay);
    const special = specialDays[monthDay] ? `ตรงกับ "${specialDays[monthDay]}"` : "ไม่ได้ตรงกับวันสำคัญอะไรนะ";




}

