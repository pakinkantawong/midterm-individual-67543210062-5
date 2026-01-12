# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** นายภาคิน กันทะวงค์
- **Student ID:** 67543210062-5
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)

## 📂 Project Structure

```
layers/
├── public/                           # 🖥️ Frontend files
│   ├── index.html                   # Web interface
│   ├── css/
│   │   └── style.css                # Styling
│   └── js/
│       ├── app.js                   # Frontend logic
│       └── api.js                   # API client
├── src/                              # 📦 Backend source code
│   ├── presentation/                # 🎨 PRESENTATION LAYER
│   │   ├── controllers/             # Handle HTTP requests/responses
│   │   │   └── bookController.js
│   │   ├── routes/                  # Define API endpoints
│   │   │   └── bookRoutes.js
│   │   ├── middlewares/             # Request/response processing
│   │   │   └── errorHandler.js      # Global error handling
│   │   └── errors/                  # Custom error classes
│   │       └── customErrors.js
│   │
│   ├── business/                    # 💼 BUSINESS LAYER
│   │   ├── services/                # Business logic & rules
│   │   │   └── bookService.js
│   │   └── validators/              # Data validation
│   │       └── bookValidator.js
│   │
│   └── data/                        # 💾 DATA LAYER
│       ├── database/                # Database connection
│       │   └── connection.js
│       └── repositories/            # Data access (CRUD operations)
│           └── bookRepository.js
│
├── server.js                         # Application entry point
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🎯 Refactoring Summary

### ❌ ปัญหาของ Monolithic (เดิม):
1. **Code ยุ่งเหยิง** - โค้ดทั้งหมดอยู่ในไฟล์เดียว (server.js) 400+ บรรทัด ผสมกัน ยากต่อการอ่านและทำความเข้าใจ
2. **ยากต่อการบำรุงรักษา** - แก้โค้ดส่วนหนึ่ง ต้องระวังไม่ให้กระทบส่วนอื่น ความเสี่ยงสูง
3. **ทำงานร่วมกันยาก** - Developer หลายคนแก้ไฟล์เดียวกัน เกิด conflict บ่อย อาจสูญหายของการแก้ไข
4. **ไม่มี Separation of Concerns** - Business logic ปนกับ Data access ปนกับ HTTP handling
5. **ยากต่อการทดสอบ** - ไม่สามารถ test component เดียวได้ ต้อง test ทั้งระบบ
6. **ยากต่อการขยายระบบ** - เพิ่มฟีเจอร์ใหม่ต้องแก้ไฟล์เดียว ความยุ่งยากเพิ่มขึ้น

### ✅ วิธีแก้ไขด้วย Layered Architecture:

| ปัญหา | วิธีแก้ |
|------|--------|
| **Code ยุ่งเหยิง** | ✨ แยก code เป็น 3 layer ชัดเจน แต่ละ layer มีไฟล์ชัดเจน ง่ายค้นหา |
| **ยากต่อการบำรุงรักษา** | 🔧 แก้ไข layer เดียว ไม่กระทบ layer อื่น ลดความเสี่ยง |
| **ทำงานร่วมกันยาก** | 👥 Developer แต่ละคนทำงาน layer คนละตัว ลด conflict แบบ 90% |
| **ไม่มี Separation of Concerns** | 📋 แต่ละ layer มีความรับผิดชอบชัดเจน (Presentation, Business, Data) |
| **ยากต่อการทดสอบ** | ✔️ Test แต่ละ layer เฉพาะส่วนได้ (Unit Test) ง่ายขึ้น |
| **ยากต่อการขยายระบบ** | 🚀 เพิ่มฟีเจอร์ใหม่ได้แบบ modular ตามโครงสร้างที่มี |

### 🎁 ประโยชน์ที่ได้รับ:
1. **📊 ความชัดเจน** - โค้ดแบ่งอย่างชัดเจนตามความรับผิดชอบ ง่ายต่อการค้นหาและทำความเข้าใจ
2. **🛠️ ความยืดหยุ่น** - เปลี่ยนแปลงการจัดเก็บข้อมูล (DB) โดยไม่กระทบ Business Logic
3. **👥 ทำงานร่วมกันได้ดีขึ้น** - Team แต่ละคนทำงานเฉพาะ layer ตัวเอง ลด conflict
4. **✔️ ง่ายต่อการทดสอบ** - สามารถ Mock dependencies และ test เฉพาะส่วน (Unit Testing)
5. **📈 ง่ายต่อการขยายระบบ** - ถ้าต้องเพิ่มฟีเจอร์ใหม่ ทำได้โดยไม่ต้องเปลี่ยนโค้ดที่มี (Open/Closed Principle)
6. **🎯 สอดคล้องกับ SOLID Principles** - โดยเฉพาะ Single Responsibility Principle

## 🚀 How to Run

### Prerequisites
- Node.js (v14 หรือสูงกว่า)
- npm

### Installation & Running

\`\`\`bash
# 1. ไปที่ไดเรกทอรี่ layers
cd layers

# 2. ติดตั้ง dependencies
npm install

# 3. รัน server
npm start

# 4. เข้าถึง application
# - Web UI: http://localhost:3000
# - API: http://localhost:3000/api/books

# 5. ทดสอบด้วย curl หรือ Postman
curl http://localhost:3000/api/books
\`\`\`

### Development Mode (with auto-reload)
\`\`\`bash
npm run dev
# หรือ ถ้าติดตั้ง nodemon
npx nodemon server.js
\`\`\`

## 📝 API Endpoints

### Base URL: `http://localhost:3000/api/books`

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| **GET** | `/` | ดึงรายการหนังสือทั้งหมด (สามารถ filter ด้วย query param `?status=available`)| 200 |
| **GET** | `/:id` | ดึงข้อมูลหนังสือตามรหัส (ID) | 200 |
| **POST** | `/` | สร้างหนังสือใหม่ | 201 |
| **PUT** | `/:id` | อัปเดตข้อมูลหนังสือ | 200 |
| **PATCH** | `/:id/borrow` | ยืมหนังสือ | 200 |
| **PATCH** | `/:id/return` | คืนหนังสือ | 200 |
| **DELETE** | `/:id` | ลบหนังสือ | 200/204 |

### 📋 Request/Response Examples

#### GET /api/books (ดึงรายการหนังสือทั้งหมด)
```bash
GET http://localhost:3000/api/books?status=available
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "status": "available"
    }
  ],
  "statistics": {
    "total": 10,
    "available": 7,
    "borrowed": 3
  }
}
```

#### POST /api/books (สร้างหนังสือใหม่)
```bash
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "isbn": "978-0-13-468599-1"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": "12",
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt",
    "status": "available"
  }
}
```

## 🏗️ Layered Architecture Explanation

### 📊 Data Flow Diagram
```
┌─────────────────────────────────────────────────────┐
│          CLIENT (Browser/Postman)                    │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  PRESENTATION LAYER (Routes & Controllers)          │
│  - Routes: ตรวจจับ HTTP request                      │
│  - Controllers: ประมวลผล request เรียก Service      │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│   BUSINESS LAYER (Services & Validators)            │
│  - Services: Business logic ของระบบ                 │
│  - Validators: ตรวจสอบความถูกต้องของข้อมูล         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│    DATA LAYER (Repository & Database)               │
│  - Repository: CRUD operations                      │
│  - Database: Fetch/Save data                        │
└─────────────────────────────────────────────────────┘
```

### 🔄 Request Flow Example (ยืมหนังสือ)
```
1. Client: PATCH /api/books/1/borrow
2. Controller: ส่วนสีเขียว รับ request เรียก bookService.borrowBook(1)
3. Service: ตรวจสอบ business logic (หนังสือมีอยู่ไหม? ยังมีสำเนา?)
4. Validator: ตรวจสอบ input data
5. Repository: Query database เพื่อ update status หนังสือ
6. Service: Return result
7. Controller: ส่ง response กลับ Client
```

## 📚 Each Layer Responsibility

### 🎨 Presentation Layer (`presentation/`)
**ความรับผิดชอบ:**
- ✅ Receive HTTP requests
- ✅ Validate input format (middleware)
- ✅ Call Business Layer
- ✅ Return HTTP responses
- ✅ Handle errors globally

**ไฟล์หลัก:**
- `controllers/bookController.js` - ประมวลผล business requests
- `routes/bookRoutes.js` - นิยาม API endpoints
- `middlewares/errorHandler.js` - จัดการ errors ทั่วระบบ
- `errors/customErrors.js` - Error classes

### 💼 Business Layer (`business/`)
**ความรับผิดชอบ:**
- ✅ Implement business rules
- ✅ Business logic validation
- ✅ Orchestrate data access
- ✅ Implement domain logic

**ไฟล์หลัก:**
- `services/bookService.js` - ตรรมชาติ logic ของระบบ (ยืม, คืน, สร้าง)
- `validators/bookValidator.js` - ตรวจสอบ business rules (ชื่อ, author ต้องไม่ว่าง)

### 💾 Data Layer (`data/`)
**ความรับผิดชอบ:**
- ✅ Connect to database
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Query/persist data
- ✅ Abstract database details

**ไฟล์หลัก:**
- `repositories/bookRepository.js` - ดำเนิน CRUD operations
- `database/connection.js` - ตั้งค่า database connection

## 💡 Key Design Patterns

### 1. **Separation of Concerns**
```
❌ Before (Monolithic):
  - 1 ไฟล์ server.js ทำหมด (routes, logic, database)

✅ After (Layered):
  - Controller เฉพาะ HTTP handling
  - Service เฉพาะ business logic
  - Repository เฉพาะ database operations
```

### 2. **Dependency Injection**
```javascript
// Controllers depend on Services
// Services depend on Repositories
// This allows easy testing by mocking
```

### 3. **Error Handling**
```javascript
// Custom errors บอก type ของ error
// Global error handler ใน middleware ทำการ handle
// Consistent error response format
```

## 🧪 Testing Strategy

### Unit Test (ต่างๆ layer โดยอิสระ):
```bash
# Test Service โดยไม่ต้อง query database (Mock Repository)
npm test -- bookService.test.js

# Test Controller โดยไม่ต้อง call Service (Mock Service)
npm test -- bookController.test.js
```

### Integration Test (Layer ทำงานด้วยกัน):
```bash
# ทดสอบ API endpoint ทั้งหมด
npm test -- api.integration.test.js
```

## 🔐 Dependencies

```json
{
  "dependencies": {
    "express": "4.18.2",      // Web framework
    "body-parser": "1.20.2"   // Parse JSON request body
  }
}
```

## 📖 Architecture Reference

- **Pattern**: Layered (N-tier) Architecture
- **Principles**: SOLID, Separation of Concerns
- **Design Pattern**: Repository Pattern, Dependency Injection
- **Code Organization**: Layer-based + Feature-based
