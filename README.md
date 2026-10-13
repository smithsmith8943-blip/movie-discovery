# Reelfind - Movie Discovery Platform

## Live Demo
[Add your deployed link here, e.g. https://your-site.netlify.app]

## Description
Reelfind is a responsive React app for discovering movies. Browse trending, popular and top rated films, search by title, filter by genre, watch trailers, rate movies and keep a personal watchlist. Built as the FSD 74 frontend mini project.

## Features
- Trending, Popular and Top rated sections (TMDB API)
- Debounced search by title
- Genre filtering with "Load more" pagination
- Movie detail page: synopsis, runtime, director, cast, YouTube trailer
- Similar movies section on every detail page
- Watchlist saved in localStorage
- Personal star rating (1-5) saved in localStorage
- Loading and error states, keyboard accessible, responsive for mobile, tablet and desktop

## Project Goals
Practice React hooks, routing, API integration, state sharing with Context, responsive CSS and deployment, as groundwork for the Capstone MERN upgrade.

## Technologies Used
- **Frontend:** React 18 (Hooks, Context)
- **Build tool:** Vite
- **Styling:** CSS3 (custom properties, grid, flexbox)
- **Routing:** React Router DOM
- **APIs:** TMDB API
- **Deployment:** Netlify

## Setup Instructions
### Prerequisites
- Node.js 18 or higher
- npm

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/smithsmith8943-blip/movie-discovery.git
   cd movie-discovery
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.example`)
   ```
   VITE_TMDB_KEY=your_api_key_here
   ```
4. Start the dev server
   ```bash
   npm run dev
   ```

## Responsive Design
Tested at 375px (mobile), 768px (tablet) and 1920px (desktop).

## Design Choices
A dark plum background with an amber accent so movie posters stand out. All TMDB requests are in `src/services/tmdb.js`, so the data layer can be swapped for our own Express/MongoDB backend in the Capstone.

## Known Issues
- The TMDB key is visible in the browser network tab (normal for frontend-only apps).

## Future Enhancements
- User accounts and a MongoDB-backed watchlist (Capstone)
- Review sentiment analysis and a mood-based movie matcher

## Author
Smith Suresh - GitHub: [@smithsmith8943-blip](https://github.com/smithsmith8943-blip)

## Acknowledgments
Movie data from [TMDB](https://www.themoviedb.org). This product uses the TMDB API but is not endorsed or certified by TMDB.
