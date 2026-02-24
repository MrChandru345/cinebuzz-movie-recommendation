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

