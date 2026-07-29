"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcrypt"));
const generateUUID = () => {
    return require('crypto').randomUUID();
};
async function seed() {
    console.log('🌱 Starting database seeding...');
    try {
        const envPath = path.join(__dirname, '../.env');
        if (fs.existsSync(envPath)) {
            const envFile = fs.readFileSync(envPath, 'utf8');
            envFile.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#'))
                    return;
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    const k = key.trim();
                    if (!process.env[k]) {
                        process.env[k] = valueParts.join('=').trim();
                    }
                }
            });
            console.log('✅ Loaded .env configuration');
        }
        else {
            console.warn('⚠️ No .env file found, using system environment variables.');
        }
    }
    catch (e) {
        console.error('Error loading .env file:', e);
    }
    const client = new pg_1.Client({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'task_management',
    });
    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL database');
        console.log('🧹 Clearing existing data...');
        await client.query(`
            TRUNCATE TABLE 
                payments, 
                order_items, 
                orders, 
                menu_options, 
                menu_items, 
                tables, 
                categories, 
                zones, 
                currencies, 
                users 
            CASCADE;
        `);
        console.log('✅ Tables truncated successfully');
        console.log('💵 Seeding 10 Currencies...');
        const currencies = [
            { id: generateUUID(), code: 'THB', name: 'Thai Baht' },
            { id: generateUUID(), code: 'USD', name: 'US Dollar' },
            { id: generateUUID(), code: 'EUR', name: 'Euro' },
            { id: generateUUID(), code: 'JPY', name: 'Japanese Yen' },
            { id: generateUUID(), code: 'GBP', name: 'British Pound' },
            { id: generateUUID(), code: 'AUD', name: 'Australian Dollar' },
            { id: generateUUID(), code: 'CAD', name: 'Canadian Dollar' },
            { id: generateUUID(), code: 'CHF', name: 'Swiss Franc' },
            { id: generateUUID(), code: 'CNY', name: 'Chinese Yuan' },
            { id: generateUUID(), code: 'SGD', name: 'Singapore Dollar' }
        ];
        for (const c of currencies) {
            await client.query(`INSERT INTO currencies (_id, code, name, "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`, [c.id, c.code, c.name, 'active']);
        }
        console.log('✅ Currencies seeded');
        console.log('📍 Seeding 10 Zones...');
        const zones = [
            { id: generateUUID(), name: 'Main Dining Hall A' },
            { id: generateUUID(), name: 'Main Dining Hall B' },
            { id: generateUUID(), name: 'Terrace (Outdoor)' },
            { id: generateUUID(), name: 'Bar Area' },
            { id: generateUUID(), name: 'VIP Room 1' },
            { id: generateUUID(), name: 'VIP Room 2' },
            { id: generateUUID(), name: 'Rooftop Lounge' },
            { id: generateUUID(), name: 'Garden Side' },
            { id: generateUUID(), name: 'Poolside Tables' },
            { id: generateUUID(), name: 'Basement Bistro' }
        ];
        for (const z of zones) {
            await client.query(`INSERT INTO zones (_id, name, "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW())`, [z.id, z.name, 'active']);
        }
        console.log('✅ Zones seeded');
        console.log('🍽️ Seeding 10 Categories...');
        const categories = [
            { id: generateUUID(), name: 'Appetizers', desc: 'Starting bites' },
            { id: generateUUID(), name: 'Main Courses', desc: 'Filling dinner selections' },
            { id: generateUUID(), name: 'Desserts', desc: 'Sweet treats' },
            { id: generateUUID(), name: 'Beverages', desc: 'Soft drinks and juices' },
            { id: generateUUID(), name: 'Alcoholic Drinks', desc: 'Wine, beer, and cocktails' },
            { id: generateUUID(), name: 'Soups', desc: 'Warm bowls' },
            { id: generateUUID(), name: 'Salads', desc: 'Fresh greens' },
            { id: generateUUID(), name: 'Seafood Specials', desc: 'Fresh ocean catches' },
            { id: generateUUID(), name: 'Vegan & Vegetarian', desc: 'Plant-based options' },
            { id: generateUUID(), name: 'Chef Signature', desc: 'Premium delicacies' }
        ];
        for (const cat of categories) {
            await client.query(`INSERT INTO categories (_id, name, description, "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`, [cat.id, cat.name, cat.desc, 'active']);
        }
        console.log('✅ Categories seeded');
        console.log('👤 Seeding 10 Users (Staff/Managers/Admin)...');
        const defaultPasswordHash = await bcrypt.hash('admin', 10);
        const staffPasswordHash = await bcrypt.hash('staff123', 10);
        const users = [
            { id: generateUUID(), username: 'admin', role: 'admin', pw: defaultPasswordHash },
            { id: generateUUID(), username: 'manager1', role: 'manager', pw: defaultPasswordHash },
            { id: generateUUID(), username: 'manager2', role: 'manager', pw: defaultPasswordHash },
            { id: generateUUID(), username: 'staff1', role: 'staff', pw: staffPasswordHash },
            { id: generateUUID(), username: 'staff2', role: 'staff', pw: staffPasswordHash },
            { id: generateUUID(), username: 'staff3', role: 'staff', pw: staffPasswordHash },
            { id: generateUUID(), username: 'staff4', role: 'staff', pw: staffPasswordHash },
            { id: generateUUID(), username: 'staff5', role: 'staff', pw: staffPasswordHash },
            { id: generateUUID(), username: 'user1', role: 'user', pw: staffPasswordHash },
            { id: generateUUID(), username: 'user2', role: 'user', pw: staffPasswordHash }
        ];
        for (const u of users) {
            await client.query(`INSERT INTO users (_id, username, password, role, "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`, [u.id, u.username, u.pw, u.role, 'active']);
        }
        console.log('✅ Users seeded');
        console.log('🪑 Seeding 10 Tables...');
        const tables = [
            { id: generateUUID(), number: 'T01', capacity: 2, zoneId: zones[0].id },
            { id: generateUUID(), number: 'T02', capacity: 4, zoneId: zones[0].id },
            { id: generateUUID(), number: 'T03', capacity: 4, zoneId: zones[1].id },
            { id: generateUUID(), number: 'T04', capacity: 6, zoneId: zones[2].id },
            { id: generateUUID(), number: 'T05', capacity: 8, zoneId: zones[4].id },
            { id: generateUUID(), number: 'T06', capacity: 2, zoneId: zones[3].id },
            { id: generateUUID(), number: 'T07', capacity: 4, zoneId: zones[6].id },
            { id: generateUUID(), number: 'T08', capacity: 4, zoneId: zones[7].id },
            { id: generateUUID(), number: 'T09', capacity: 2, zoneId: zones[8].id },
            { id: generateUUID(), number: 'T10', capacity: 6, zoneId: zones[9].id }
        ];
        for (const t of tables) {
            await client.query(`INSERT INTO tables (_id, number, "zoneId", capacity, status, "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`, [t.id, t.number, t.zoneId, t.capacity, 'available', 'active']);
        }
        console.log('✅ Tables seeded');
        console.log('🍜 Seeding 10 Menu Items...');
        const menuItems = [
            { id: generateUUID(), name: 'Spring Rolls', price: 90.00, catId: categories[0].id, desc: 'Crispy spring rolls with sweet chili dip' },
            { id: generateUUID(), name: 'Chicken Satay', price: 120.00, catId: categories[0].id, desc: 'Skewered grilled chicken served with peanut sauce' },
            { id: generateUUID(), name: 'Pad Thai Goong', price: 150.00, catId: categories[1].id, desc: 'Traditional stir-fried rice noodles with prawns' },
            { id: generateUUID(), name: 'Green Curry Chicken', price: 180.00, catId: categories[1].id, desc: 'Spicy green curry with chicken and eggplant' },
            { id: generateUUID(), name: 'Mango Sticky Rice', price: 100.00, catId: categories[2].id, desc: 'Sweet sticky rice served with fresh mango' },
            { id: generateUUID(), name: 'Coconut Ice Cream', price: 80.00, catId: categories[2].id, desc: 'Home-style coconut milk ice cream' },
            { id: generateUUID(), name: 'Thai Iced Tea', price: 60.00, catId: categories[3].id, desc: 'Sweet and creamy traditional Thai tea' },
            { id: generateUUID(), name: 'Tom Yum Goong Soup', price: 250.00, catId: categories[5].id, desc: 'Hot and sour soup with lemongrass and prawns' },
            { id: generateUUID(), name: 'Papaya Salad (Som Tum)', price: 85.00, catId: categories[6].id, desc: 'Spicy shredded green papaya salad' },
            { id: generateUUID(), name: 'Premium Grilled Salmon', price: 390.00, catId: categories[7].id, desc: 'Perfectly grilled salmon fillet with herbs' }
        ];
        for (const mi of menuItems) {
            await client.query(`INSERT INTO menu_items (_id, name, description, price, "categoryId", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`, [mi.id, mi.name, mi.desc, mi.price, mi.catId, 'active']);
        }
        console.log('✅ Menu Items seeded');
        console.log('➕ Seeding 10 Menu Options...');
        const menuOptions = [
            { id: generateUUID(), name: 'Extra Spicy', extra: 0.00, miId: menuItems[2].id },
            { id: generateUUID(), name: 'Add Shrimp (+2)', extra: 40.00, miId: menuItems[2].id },
            { id: generateUUID(), name: 'No MSG', extra: 0.00, miId: menuItems[2].id },
            { id: generateUUID(), name: 'Less Sweet', extra: 0.00, miId: menuItems[6].id },
            { id: generateUUID(), name: 'No Ice', extra: 0.00, miId: menuItems[6].id },
            { id: generateUUID(), name: 'Add Boba', extra: 15.00, miId: menuItems[6].id },
            { id: generateUUID(), name: 'Extra Shrimp', extra: 50.00, miId: menuItems[7].id },
            { id: generateUUID(), name: 'Add Salted Egg', extra: 20.00, miId: menuItems[8].id },
            { id: generateUUID(), name: 'Whip Cream', extra: 10.00, miId: menuItems[5].id },
            { id: generateUUID(), name: 'Lemon Herb Butter Sauce', extra: 30.00, miId: menuItems[9].id }
        ];
        for (const opt of menuOptions) {
            await client.query(`INSERT INTO menu_options (_id, "menuItemId", name, "extraPrice", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`, [opt.id, opt.miId, opt.name, opt.extra, 'active']);
        }
        console.log('✅ Menu Options seeded');
        console.log('📦 Seeding 10 Orders & Order Items...');
        const orders = [];
        const orderItems = [];
        for (let i = 0; i < 10; i++) {
            const orderId = generateUUID();
            const orderNumber = `ORD-20260708-${String(i + 1).padStart(4, '0')}`;
            const tableId = tables[i % tables.length].id;
            const staffId = users[3 + (i % 5)].id;
            let status = 'pending';
            if (i < 5)
                status = 'paid';
            else if (i < 8)
                status = 'served';
            else if (i < 9)
                status = 'confirmed';
            const item1 = menuItems[(i * 2) % menuItems.length];
            const item2 = menuItems[(i * 2 + 1) % menuItems.length];
            const qty1 = (i % 2) + 1;
            const qty2 = (i % 3) + 1;
            const price1 = Number(item1.price);
            const price2 = Number(item2.price);
            const tot1 = price1 * qty1;
            const tot2 = price2 * qty2;
            const subTotal = tot1 + tot2;
            const discount = i % 4 === 0 ? 20.00 : 0.00;
            const total = subTotal - discount;
            orders.push({
                id: orderId,
                orderNumber,
                tableId,
                staffId,
                status,
                subTotal,
                discount,
                total
            });
            orderItems.push({
                id: generateUUID(),
                orderId,
                menuItemId: item1.id,
                menuItemName: item1.name,
                quantity: qty1,
                unitPrice: price1,
                totalPrice: tot1
            });
            orderItems.push({
                id: generateUUID(),
                orderId,
                menuItemId: item2.id,
                menuItemName: item2.name,
                quantity: qty2,
                unitPrice: price2,
                totalPrice: tot2
            });
        }
        for (const o of orders) {
            await client.query(`INSERT INTO orders (_id, "orderNumber", "tableId", "staffId", status, "subTotal", discount, total, "createdAt", "updatedAt") 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`, [o.id, o.orderNumber, o.tableId, o.staffId, o.status, o.subTotal, o.discount, o.total]);
        }
        for (const oi of orderItems) {
            await client.query(`INSERT INTO order_items (_id, "orderId", "menuItemId", "menuItemName", quantity, "unitPrice", "totalPrice", "createdAt", "updatedAt") 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`, [oi.id, oi.orderId, oi.menuItemId, oi.menuItemName, oi.quantity, oi.unitPrice, oi.totalPrice]);
        }
        console.log('✅ Orders & Order Items seeded');
        console.log('💳 Seeding 10 Payments...');
        const payments = [];
        const paidOrders = orders.filter(o => o.status === 'paid');
        for (let i = 0; i < 10; i++) {
            const order = i < paidOrders.length ? paidOrders[i] : orders[i % orders.length];
            const amountPaid = Math.ceil(order.total / 100) * 100;
            const change = amountPaid - order.total;
            const currencyId = currencies[0].id;
            const method = i % 2 === 0 ? 'cash' : 'card';
            payments.push({
                id: generateUUID(),
                orderId: order.id,
                currencyId,
                method,
                amount: amountPaid,
                change,
                paidAt: new Date()
            });
        }
        for (const p of payments) {
            await client.query(`INSERT INTO payments (_id, "orderId", "currencyId", method, amount, change, "paidAt", "createdAt") 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`, [p.id, p.orderId, p.currencyId, p.method, p.amount, p.change, p.paidAt]);
        }
        console.log('✅ Payments seeded');
        console.log('\n🎉 Seeding completed successfully!');
        console.log('📊 Seeding Summary:');
        console.log(`  - Users: ${users.length}`);
        console.log(`  - Currencies: ${currencies.length}`);
        console.log(`  - Zones: ${zones.length}`);
        console.log(`  - Categories: ${categories.length}`);
        console.log(`  - Tables: ${tables.length}`);
        console.log(`  - Menu Items: ${menuItems.length}`);
        console.log(`  - Menu Options: ${menuOptions.length}`);
        console.log(`  - Orders: ${orders.length}`);
        console.log(`  - Order Items: ${orderItems.length}`);
        console.log(`  - Payments: ${payments.length}`);
        console.log('\n🔑 Helper IDs for your Postman Configuration:');
        console.log(`  - baseUrl: http://localhost:3000`);
        console.log(`  - admin login credentials: username "admin", password "admin"`);
        console.log(`  - staff login credentials: username "staff1", password "staff123"`);
        console.log(`  - zoneId: "${zones[0].id}" (${zones[0].name})`);
        console.log(`  - categoryId: "${categories[1].id}" (${categories[1].name})`);
        console.log(`  - currencyId: "${currencies[0].id}" (${currencies[0].code})`);
        console.log(`  - tableId: "${tables[0].id}" (${tables[0].number})`);
        console.log(`  - menuItemId: "${menuItems[2].id}" (${menuItems[2].name})`);
    }
    catch (err) {
        console.error('❌ Seeding failed with error:', err);
    }
    finally {
        await client.end();
        console.log('🔌 Disconnected from database');
    }
}
seed();
//# sourceMappingURL=seed.js.map