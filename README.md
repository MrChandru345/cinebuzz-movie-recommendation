# 🎬 CineVerse

CineVerse is a modern, feature-rich movie discovery web application built with React, Vite, and Tailwind CSS. It leverages the TMDB (The Movie Database) API to provide users with an immersive browsing experience for trending, Hollywood, and Kollywood movies.

---

## ✨ Key Features

- **Hero Slider**: A Netflix-style cinematic hero banner showcasing trending movies. It features a stunning glassmorphism UI, a custom hover animation for the "View Details" button, and fully responsive typography and gradients.
- **Dynamic Movie Carousels**: Smooth, swipeable horizonal sliders for different categories like _Trending Now_, _Hollywood_, and _Kollywood_. Uses CSS scroll snapping for native-feeling touch scroll on mobile devices.
- **Live Search**: A real-time search bar built into the navigation header. It debounces user input and displays instant live results with movie posters and ratings in a dropdown menu.
- **Responsive Design**: The entire application is fully optimized for mobile, tablet, and desktop viewing. The navigation bar seamlessly transitions to a hamburger menu on smaller screens.
- **Dynamic Routing**: Built with `react-router-dom` to support seamless client-side navigation between the Home, Movies list, and Movie Detail pages.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/) - For extremely fast HMR and optimized production builds.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first framework used for the UI, including complex gradients, glassmorphism (`backdrop-blur`), customized animations, and responsive breakpoints.
- **Routing**: `react-router-dom`
- **Data Fetching**: `axios`
- **Icons**: Boxicons (via CDN)
- **API**: [TMDB API](https://developer.themoviedb.org/docs)

---

## 📂 Project Structure

```text
src/
├── assets/          # Static assets like images/logos
├── components/      # Reusable UI components
│   ├── FilterBox.jsx
│   ├── Header.jsx   # Navigation, Mobile Menu, Live Search
│   └── MovieCard.jsx
├── pages/           # Main route views
│   ├── HomePage.jsx # The primary landing page with sliders
│   ├── MoviesPage.jsx
│   ├── MovieDetailPage.jsx
│   └── SearchPage.jsx
├── services/        # API integration logic
│   └── api.js       # Centralized Axios calls to TMDB
├── App.jsx          # Main application component & routes setup
├── index.css        # Global CSS styles
├── main.jsx         # React application entry point
└── tailwind.config.js # Tailwind theme and custom animations
```

---

## 🚀 How to Run Locally

If you want to view or contribute to the project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.

### Installation & Setup

1. **Clone or Open the Repository**
   Navigate to the project root directory in your terminal:

   ```bash
   cd cinebuzz 001
   ```

2. **Install Dependencies**
   The application requires several packages including `react`, `react-router-dom`, `axios`, and Tailwind dependencies. Install them using npm:

   ```bash
   npm install
   ```

3. **Start the Development Server**
   Run the Vite development server:

   ```bash
   npm run dev
   ```

4. **View the Application**
   Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173/`). Enjoy the cinematic experience!
