# API Integration Guide

## 🔗 การเชื่อมต่อ Frontend กับ Backend API

### **1. Environment Variables**

สร้างไฟล์ `.env.local` ใน root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### **2. Backend API Endpoints ที่คาดหวัง**

#### **Menu Endpoints:**
- `GET /api/menu/categories` - ดึงข้อมูลหมวดหมู่ทั้งหมด
- `GET /api/menu/items` - ดึงข้อมูล menu items พร้อม filters
- `GET /api/menu/items/:id` - ดึงข้อมูล menu item ตาม ID

#### **Cart Endpoints:**
- `GET /api/cart` - ดึงข้อมูลตะกร้าสินค้า
- `POST /api/cart/add` - เพิ่มสินค้าเข้าตะกร้า
- `PUT /api/cart/update` - อัปเดตจำนวนสินค้าในตะกร้า
- `DELETE /api/cart/remove/:id` - ลบสินค้าออกจากตะกร้า
- `DELETE /api/cart/clear` - ล้างตะกร้าทั้งหมด

#### **Order Endpoints:**
- `POST /api/orders` - สร้างคำสั่งซื้อ
- `GET /api/orders` - ดึงรายการคำสั่งซื้อ
- `GET /api/orders/:id` - ดึงข้อมูลคำสั่งซื้อตาม ID

### **3. Data Models ที่คาดหวัง**

#### **MenuItem (Prisma Model):**
```prisma
model MenuItem {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  description String
  emoji       String?
  image       String?
  category    String
  isVegetarian Boolean @default(false)
  isVegan     Boolean  @default(false)
  isGlutenFree Boolean @default(false)
  isDairyFree Boolean  @default(false)
  rating      Float?
  reviews     Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### **MenuCategory (Prisma Model):**
```prisma
model MenuCategory {
  id        Int        @id @default(autoincrement())
  name      String
  emoji     String
  items     MenuItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

#### **Cart (Prisma Model):**
```prisma
model Cart {
  id        Int        @id @default(autoincrement())
  userId    Int?
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id        Int      @id @default(autoincrement())
  cartId    Int
  productId Int
  quantity  Int
  product   MenuItem @relation(fields: [productId], references: [id])
  cart      Cart     @relation(fields: [cartId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### **4. การใช้งานใน Frontend**

#### **ใช้ Menu Hook:**
```typescript
import { useMenu } from '@/hooks/useMenu';

const MyComponent = () => {
  const { categories, isLoading, error } = useMenu();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {category.items.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
```

#### **ใช้ Cart Context:**
```typescript
import { useCart } from '@/contexts/CartContext';

const MyComponent = () => {
  const { state, addToCart, removeFromCart } = useCart();
  
  const handleAddToCart = async (item) => {
    await addToCart(item);
  };
  
  return (
    <div>
      <p>Items in cart: {state.itemCount}</p>
      <p>Total: ${state.total}</p>
    </div>
  );
};
```

### **5. การรัน Backend และ Frontend**

#### **Backend (Elysia + Prisma):**
```bash
cd backend
npm run dev
# รันที่ port 3001
```

#### **Frontend (Next.js):**
```bash
cd frontend
npm run dev
# รันที่ port 3000
```

### **6. Error Handling**

- API Client จะจัดการ error handling อัตโนมัติ
- Context จะแสดง loading states และ error messages
- ใช้ try-catch สำหรับการจัดการ error ใน components

### **7. Testing API Connection**

ทดสอบการเชื่อมต่อ API:

```typescript
// ใน browser console
fetch('http://localhost:3001/api/menu/categories')
  .then(res => res.json())
  .then(data => console.log(data));
```

### **8. CORS Configuration**

ใน Elysia backend ต้องตั้งค่า CORS:

```typescript
import { cors } from '@elysiajs/cors';

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
```

## 🎯 **Next Steps**

1. ตั้งค่า environment variables
2. รัน backend API server
3. ทดสอบการเชื่อมต่อ API
4. อัปเดต Prisma models ให้ตรงกับที่คาดหวัง
5. ทดสอบการทำงานของ frontend
