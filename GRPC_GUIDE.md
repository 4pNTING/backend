# วิธีการใช้ Postman ทดสอบ gRPC (How to test gRPC with Postman)

โปรเจกต์ของคุณรัน gRPC อยู่ที่ `localhost:5000` และมีไฟล์ Proto อยู่ที่ `src/proto/category.proto`

## ขั้นตอนการตั้งค่า (Setup)

1. **เปิด Postman**
2. คลิกปุ่ม **New** (มุมซ้ายบน) -> เลือก **gRPC Request**
3. ในช่อง **Server URL** ให้ใส่: `localhost:5000`
4. ไปที่แท็บ **Service Definition**
   - เลือก **Import .proto file**
   - คลิก **Choose File** แล้วเลือกไฟล์จากโปรเจกต์ของคุณ:
     `D:\MY Project\backend\src\proto\category.proto`
   - คลิก **Next** -> **Import as API** (หรือ Import เฉยๆ)

## การทดสอบ (Testing)

เมื่อ Import เสร็จแล้ว:

1. ตรงช่อง Method (ข้างๆ URL) ให้คลิกเลือก **CategoryService**
2. เลือก Method ที่ต้องการทดสอบ เช่น **FindAll**
3. คลิกปุ่ม **Invoke**
   - ถ้าสำเร็จ คุณควรจะเห็น Response แบบ JSON กลับมา (เช่น `items: [], total: 0`)

### ตัวอย่างการส่งข้อมูล (Create)

1. เลือก Method **Create**
2. ในส่วน **Message** ให้ใส่ JSON:
   ```json
   {
     "name": "Electronics",
     "description": "Electronic devices",
     "photo": "http://example.com/photo.jpg"
   }
   ```
3. คลิก **Invoke**

---

## "Alloop" คืออะไร?

ถ้าคุณหมายถึงเครื่องมืออื่นที่คล้าย Postman สำหรับ gRPC:

- **BloomRPC**: เป็นโปรแกรมยอดนิยมสำหรับทดสอบ gRPC (หน้าตาคล้ายๆ Postman รุ่นเก่า)
- **Apollo Studio**: ใช้สำหรับ GraphQL (ไม่ค่อยใช้กับ gRPC)
- **Insomnia**: รองรับ gRPC เหมือน Postman

แนะนำให้ใช้ **Postman** เพราะคุณน่าจะมีอยู่แล้ว และมันรองรับ gRPC ได้ดีครับ
