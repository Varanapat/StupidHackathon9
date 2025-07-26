# 🎂 วันสร้างตัว - Birth Conception Calculator

เว็บแอปพลิเคชันที่คำนวณวัน "สร้างตัว" (วันปฏิสนธิ) จากวันเกิด และบอกวันสำคัญที่ใกล้เคียง พร้อมคำคมสร้างสรรค์

## ✨ Features

- 🧮 คำนวณวันปฏิสนธิ (9 เดือนก่อนวันเกิด)
- 📅 เชื่อมต่อกับ Google Gemini AI เพื่อหาวันสำคัญ
- 🎯 แสดงวันพิเศษที่ใกล้เคียงที่สุด
- 💭 สร้างคำคมสร้างสรรค์สำหรับวันนั้น
- 🌐 รองรับการใช้งานผ่าน API

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 หรือสูงกว่า)
- Google Gemini API Key

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd StupidHackathon9
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # สร้างไฟล์ .env ใน root directory
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

4. **Start the server**
   ```bash
   node index.js
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

### Frontend
- **JavaScript** - Client-side logic
- **HTML5** - Markup
- **CSS3** - Styling

### AI Integration
- **Google Gemini Pro** - AI model for date analysis and quote generation

## 📁 Project Structure

```
StupidHackathon9/
├── index.js                 # Express server & API endpoints
├── package.json             # Dependencies & scripts
├── .env                     # Environment variables (create this)
├── .gitignore              # Git ignore rules
├── README.md               # This file
└── public/                 # Static files
    ├── index.html          # Main HTML page
    ├── styles/
    │   └── style.css       # CSS styles
    └── script/
        └── script.js       # Frontend JavaScript
```

## 🔧 API Endpoints

### POST `/api/ask`
ส่ง prompt ไปยัง Gemini AI และรับผลลัพธ์กลับมา

**Request Body:**
```json
{
  "prompt": "ข้อความที่ต้องการส่งไปยัง AI"
}
```

**Response:**
```json
{
  "reply": "ข้อความตอบกลับจาก AI"
}
```

## 🎯 How It Works

1. **Input**: ผู้ใช้กรอกวันเกิด
2. **Calculation**: ระบบคำนวณวันปฏิสนธิ (ลบ 9 เดือน)
3. **AI Analysis**: ส่งข้อมูลไปยัง Gemini AI เพื่อ:
   - ตรวจสอบว่าเป็นวันพิเศษหรือไม่
   - หาวันสำคัญที่ใกล้เคียงที่สุด
   - สร้างคำคมสร้างสรรค์
4. **Display**: แสดงผลลัพธ์ในรูปแบบที่อ่านง่าย

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API Key | ✅ |

## 🚀 Deployment

### Local Development
```bash
npm start
# หรือ
node index.js
```

### Production Deployment
1. Deploy to your preferred platform (Heroku, Vercel, Railway, etc.)
2. Set environment variables
3. Update frontend API endpoint URL if needed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Made with วันสร้างตัว group's for StupidHackathon9**
