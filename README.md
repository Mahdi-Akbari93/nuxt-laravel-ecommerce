# 🛒 Full-Stack E-Commerce & Admin Management System

A comprehensive modern e-commerce solution built with a decoupled architecture utilizing **Nuxt 3** for the frontend interfaces and **Laravel** for the backend RESTful API.

---

## 🚀 Tech Stack

### Backend

- **Framework:** Laravel
- **API Architecture:** RESTful API
- **Database:** MySQL / PostgreSQL

### Frontend & Admin Panel

- **Framework:** Nuxt 3 (Vue 3)
- **State Management:** Pinia
- **Styling:** Bootstrap / SCSS
- **HTTP Client:** Ofetch / Axios

---

## 📁 Repository Structure

```text
├── LARAVEL-API/          # Laravel Backend API
└── nuxtjs-ecommerce/     # Frontend Client & Admin Applications
    ├── nuxt-app/         # Public E-Commerce Storefront
    └── nuxt-admin-panel/ # Administrative Dashboard

```

---

## ✨ Key Features

- **Storefront (`nuxt-app`):**
- Dynamic product listing and detailed views
- State-managed shopping cart using Pinia
- Responsive UI built with Bootstrap
- Fast SSR (Server-Side Rendering) with Nuxt 3

- **Admin Panel (`nuxt-admin-panel`):**
- Complete CRUD management for products, categories, and orders
- Secure authentication flow with token-based authorization

- **Backend (`LARAVEL-API`):**
- Scalable database modeling and relationships
- Secure API endpoints with input validation and middleware protection

---

## 🛠️ Local Setup Instructions

### 1. Backend Setup (Laravel)

```bash
cd LARAVEL-API
composer install
cp .env.example .env
php artisan key:generate
# Configure your database in .env
php artisan migrate --seed
php artisan serve

```

### 2. Frontend Setup (Nuxt Storefront)

```bash
cd nuxtjs-ecommerce/nuxt-app
npm install
npm run dev

```

### 3. Admin Panel Setup (Nuxt Admin)

```bash
cd nuxtjs-ecommerce/nuxt-admin-panel
npm install
npm run dev

```

---

## 📝 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

---

```
