# 🛍️ E-Commerce React Frontend

A modern, responsive, and feature-rich frontend application for a full-stack E-Commerce platform. Built with **React.js**, **Redux** for state management, and seamless integrations with payment gateways like **Stripe** and **PayPal**. This frontend provides distinct interfaces for Customers, Sellers, and Administrators.

## ✨ Key Features

* **🔐 Authentication & Authorization:** Secure login and registration with role-based routing (`User`, `Seller`, `Admin`) using JWT tokens.
* **🛒 Shopping Experience:** Browse products, dynamic filtering, pagination, and a fully functional shopping cart (add/remove items, update quantities).
* **💳 Seamless Checkout:** Complete checkout flow including address management, order summary, and secure payment processing via **Stripe** and **PayPal**.
* **👨‍💼 Admin & Seller Dashboards:** Dedicated layouts and features for administrators to manage categories, products, sellers, and orders.
* **⚡ State Management:** Robust global state management using **Redux** (reducers for Cart, Auth, Products, Orders, Admin, etc.).
* **📱 Responsive Design:** Built to work perfectly across desktop, tablet, and mobile devices with custom reusable components.

## 🛠️ Tech Stack & Libraries

* **Library:** React.js (Bootstrapped likely with Vite/Create React App)
* **State Management:** Redux & React-Redux
* **Routing:** React Router DOM (Private Routes, Admin Layouts)
* **Styling:** CSS (`index.css`) & Reusable UI Components
* **Payments:** Stripe Elements / PayPal Integrations
* **API Communication:** Axios / Fetch API (`src/api/api.js`)

## 📂 Project Structure

```text
src/
├── api/              # API instances and network call configurations
├── assets/           # Static assets like images, sliders, and SVG icons
├── components/       # UI Components
│   ├── admin/        # Admin dashboard, category, product, and seller management
│   ├── auth/         # Login and Register components
│   ├── cart/         # Shopping cart interfaces
│   ├── checkout/     # Address forms, payment methods, order summaries
│   ├── home/         # Landing page and Hero banners
│   ├── products/     # Product grids, cards, and dynamic filters
│   └── shared/       # Reusable UI elements (Navbar, Sidebar, Modals, Loaders)
├── hooks/            # Custom React hooks (useProductFilter, useCategoryFilter, etc.)
├── store/            # Redux setup
│   ├── actions/      # Redux actions
│   └── reducers/     # Redux reducers (auth, cart, products, admin, error)
└── utils/            # Helper functions (formatPrice, truncateText, constants) in your project.
