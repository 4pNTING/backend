const { Client } = require('pg');
const crypto = require('crypto');

const firstNames = [
  'Souk', 'Somchai', 'Phonesavanh', 'Anousone', 'Bounmy', 'Vilay', 'Noy', 'Seng', 'Kham', 'Souvanny',
  'Thip', 'Keo', 'Daovone', 'Chanthala', 'Xai', 'Phet', 'Malay', 'Sy', 'Oudone', 'Somphone',
  'Vanida', 'Monely', 'Aloun', 'Sackda', 'Nita', 'Phetsamone', 'Lamphone', 'Thongsy', 'Bounhome', 'Somsack',
  'Nitavanh', 'Manisouk', 'Ketkeo', 'Vongpheth', 'Thanousone', 'Kanya', 'Bouavone', 'Somvang', 'Viengsamone', 'Vilavan',
  'Phavady', 'Amphone', 'Ratsamy', 'Khamla', 'Phonesack', 'Bounlay', 'Chansamone', 'Sengdeuan', 'Oudomxay', 'Khammanh'
];

const lastNames = [
  'Vongphachanh', 'Phommasone', 'Keomany', 'Sengchanh', 'Xaiyavong', 'Souvannavong', 'Chanthavong', 'Vilaysack',
  'Phanthavong', 'Oudomxay', 'Sayasone', 'Inthavong', 'Phonesavath', 'Keobounphanh', 'Luangrath', 'Bouppha',
  'Rajvong', 'Sitthiphone', 'Bounyasith', 'Vongxay'
];

const provinces = [
  'Vientiane Capital', 'Luang Prabang', 'Champasak', 'Savannakhet', 'Xieng Khouang',
  'Khammouane', 'Oudomxay', 'Luang Namtha', 'Vientiane Province', 'Bolikhamxay'
];

const districts = [
  'Chanthabuly', 'Sikhottabong', 'Xaysetha', 'Sisattanak', 'Hadxayfong',
  'Luang Prabang City', 'Pakse', 'Kaysone Phomvihane'
];

const villages = [
  'Phonsinuan', 'Nongbone', 'That Luang', 'Hayeok', 'Dongdok', 'Sisangvone',
  'Thongkang', 'Sithane Neua', 'Saphanthong', 'Phonxay'
];

const genders = ['Male', 'Female'];

async function seedCustomers(host, port) {
  console.log(`🌱 Connecting to PostgreSQL on ${host}:${port}...`);
  const client = new Client({
    host,
    port,
    user: 'postgres',
    password: '21019954pn!@',
    database: 'task_management'
  });

  try {
    await client.connect();

    // 1. Ensure uuid-ossp extension and tables exist
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        "phoneNumber" VARCHAR(255),
        "province" VARCHAR(255),
        "district" VARCHAR(255),
        "village" VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "uniqueId" INT DEFAULT 0,
        "uid" VARCHAR(255),
        "buId" VARCHAR(255),
        "isActive" VARCHAR(50) DEFAULT 'active',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW(),
        "deletedAt" TIMESTAMP,
        "createdBy" VARCHAR(255),
        "updatedBy" VARCHAR(255),
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        "phoneNumber" VARCHAR(255),
        "gender" VARCHAR(50),
        "nationality" VARCHAR(100),
        "province" VARCHAR(255),
        "district" VARCHAR(255),
        "village" VARCHAR(255),
        "fileUrl" VARCHAR(500),
        "contactId" UUID REFERENCES contacts(_id) ON DELETE SET NULL
      );
    `);

    // Ensure columns in case table existed earlier
    await client.query(`ALTER TABLE customers ADD COLUMN IF NOT EXISTS "uniqueId" INT DEFAULT 0;`);
    await client.query(`ALTER TABLE customers ADD COLUMN IF NOT EXISTS "uid" VARCHAR(255);`);
    await client.query(`ALTER TABLE customers ADD COLUMN IF NOT EXISTS "contactId" UUID REFERENCES contacts(_id) ON DELETE SET NULL;`);

    // 2. Truncate customers and contacts
    await client.query(`TRUNCATE TABLE customers, contacts RESTART IDENTITY CASCADE;`);

    console.log(`🧹 Creating 50 Customer records for ${host}...`);

    for (let i = 0; i < 50; i++) {
      const customerId = crypto.randomUUID();
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[i % lastNames.length];
      const phone = `020${50000000 + Math.floor(Math.random() * 49999999)}`;
      const gender = genders[i % 2];
      const nationality = 'Lao';
      const prov = provinces[i % provinces.length];
      const dist = districts[i % districts.length];
      const vill = villages[i % villages.length];
      const uid = `CUST-${String(i + 1).padStart(4, '0')}`;
      const uniqueId = i + 1;

      let contactId = null;

      // Every 2nd customer has a emergency/secondary contact
      if (i % 2 === 0) {
        contactId = crypto.randomUUID();
        const cFn = firstNames[(i + 15) % firstNames.length];
        const cLn = lastNames[(i + 7) % lastNames.length];
        const cPhone = `020${20000000 + Math.floor(Math.random() * 49999999)}`;

        await client.query(
          `INSERT INTO contacts (_id, "firstName", "lastName", "phoneNumber", "province", "district", "village", "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
          [contactId, cFn, cLn, cPhone, prov, dist, vill]
        );
      }

      await client.query(
        `INSERT INTO customers (
          _id, "uniqueId", "uid", "isActive", "firstName", "lastName", "phoneNumber",
          "gender", "nationality", "province", "district", "village", "contactId",
          "createdAt", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW()
        )`,
        [customerId, uniqueId, uid, 'active', fn, ln, phone, gender, nationality, prov, dist, vill, contactId]
      );
    }

    const countRes = await client.query('SELECT COUNT(*) FROM customers');
    console.log(`✅ Successfully seeded ${countRes.rows[0].count} customers on ${host}:${port}!`);

  } catch (err) {
    console.error(`❌ Error seeding ${host}:${port}:`, err);
  } finally {
    await client.end();
  }
}

async function main() {
  await seedCustomers('192.168.64.17', 5435);
  await seedCustomers('localhost', 5435);
}

main();
