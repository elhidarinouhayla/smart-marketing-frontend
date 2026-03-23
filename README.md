#  Smart Marketing - Dashboard Frontend

Welcome to the **Smart Marketing Assistant** frontend! A modern, data-driven dashboard built with **Next.js 15+** and **TypeScript**, designed to visualize marketing analytics, predictions, and recommendations.

---

##  Features

- **Marketing Dashboard**: Real-time stats on campaigns and customers.
- **AI Predictions**: Success probability visualization for marketing campaigns.
- **Smart Recommendations**: Actionable insights generated from campaign data.
- **Dynamic Charts**: Interactive segment and performance visualizations.
- **Responsive UI**: Sleek, modern design with custom CSS-in-JS components.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)
- **Styling**: [Vanilla CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- **Deployment**: [Vercel](https://vercel.com/) (Recommended)

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or newer).
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

### Installation & Launch

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/elhidarinouhayla/smart-marketing-frontend.git
    cd smart-marketing-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

👉 Open **[http://localhost:3000](http://localhost:3000)** with your browser to see the dashboard.

---

## ⚙ Configuration (`.env.local`)

Create a `.env.local` file in the root directory to specify the backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8001/api/
```

- **Production Mode**: Replace `localhost` with your production API URL.

---

##  Project Structure

- `app/`: Next.js App Router (Pages: `/dashboard`, `/campaigns`, `/login`, etc.)
- `components/`: Reusable UI components (Charts, StatCards, Layouts).
- `lib/`: Utility functions and API clients (Axios instance).
- `public/`: Static assets (Logos, Icons).
- `styles/`: Global styles and CSS variables.

---

##  Authentication Flow

The frontend uses **JWT** stored in `localStorage` for session management.
- Tokens are automatically included in Axios headers via a request interceptor.
- Unauthenticated requests are handled by individual page guards.

---

