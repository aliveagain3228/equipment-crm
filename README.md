<div align="center">

# 💻 Equipment CRM

  <p>
    <a href="ТВОЯ_ССЫЛКА_НА_VERCEL_ТУТ" target="_blank">
      <img src="https://img.shields.io/badge/Live_Demo-Link-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </p>

</div>

## 📝 About the Project
A full-stack CRM application for managing company equipment and inventory. This project was built to practice server-side rendering, database management, and end-to-end type safety using the modern Next.js ecosystem.

### 📸 App preview

<img src="./public/preview.png" alt="Equipment CRM Interface" width="800"/>

## ✨ Features

- 🏗 Fullstack Architecture: Built with Next.js App Router and Server Actions.
- 🗃 Database Integration: Seamless data management with PostgreSQL and Prisma ORM.
- ✅ Strict Validation: Robust form and data validation using Zod.
- 🔄 CRUD Operations: Easily create, read, update, and delete equipment records (Laptops, Monitors, Keyboards, etc.).
- 🎨 Modern UI: Responsive and clean layout utilizing the Tailwind design system.

## 🚀 Installation
```bash
# Clone the project
git clone [https://github.com/aliveagain3228/equipment-crm.git](https://github.com/aliveagain3228/equipment-crm.git)

# Navigate to the project directory
cd equipment-crm

# Install dependencies
npm install

# Create a .env file in the root directory and add your database URL:
# DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Push the database schema and generate Prisma client
npx prisma db push
npx prisma generate

# Run locally
npm run dev
