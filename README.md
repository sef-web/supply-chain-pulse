# SupplyChain Pulse 📦

A modern, high-performance B2B Logistics Analytics Dashboard.
Designed to help warehouse managers track inventory, monitor revenue trends, and manage supplier relationships in real-time.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS + shadcn/ui
* **Database:** Supabase (PostgreSQL)
* **State & Validation:** React Hooks, Zod
* **Visualization:** Recharts

## ✨ Key Features

1.  **Real-Time Dashboard:**
    * Visualizes Total Revenue, Active Orders, and Inventory Health.
    * Interactive charts for revenue trends over time.

2.  **Inventory Management:**
    * Searchable data grid for product catalog.
    * **Low Stock Alerts:** Automatic highlighting of items below reorder points.
    * **Quick Restock:** One-click mutation to update stock levels in the database.

3.  **Data Analytics:**
    * **Inventory Valuation:** Breakdown of asset value by category.
    * **Order Fulfillment:** Visual breakdown of order statuses.

4.  **Developer Experience:**
    * **Seed API:** Custom secure route (`/api/seed`) to wipe and repopulate the database with mock data.
    * **Type Safety:** End-to-end TypeScript interfaces for all database entities.

## 🛠️ Getting Started

### Prerequisites

* Node.js 18+
* Supabase account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/supply-chain-pulse.git](https://github.com/your-username/supply-chain-pulse.git)
    cd supply-chain-pulse
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    SEED_SECRET_KEY=my-secret-password
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

## 📝 License

This project is MIT licensed.