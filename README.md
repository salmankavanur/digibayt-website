# DigiBayt Website

A modern, full-stack web application for DigiBayt, built with Next.js, TypeScript, Tailwind CSS, MongoDB, and Supabase. This project serves as the official website for DigiBayt, providing information about services, portfolio, blog, and contact options.

## Project Overview
- **Purpose:** Showcase DigiBayt's services, portfolio, and blog, and provide a contact platform for potential clients.
- **Audience:** Businesses and individuals seeking digital solutions and services.
- **Architecture:** Next.js app directory structure with modular components and API routes.

## Features
- Responsive, modern UI with Tailwind CSS
- Blog section with categories, tags, and comments
- Portfolio showcase with categories
- Contact form with backend integration
- Admin panel (under `/app/admin`)
- User authentication (NextAuth.js)
- MongoDB and Supabase integration
- Dark/light theme toggle

## Initial Setup
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd digibayt-website
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` (if available) or use the following template:
     ```env
     NEXT_PUBLIC_SITE_URL=http://localhost:3000/
     MONGODB_URI=<your-mongodb-uri>
     NEXTAUTH_SECRET=<your-nextauth-secret>
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
     ```
   - Fill in your credentials as needed.
4. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Demo Environment
- **Local:** [http://localhost:3000](http://localhost:3000)
- **Production (example):** [https://v0-digi-bayt-website-build.vercel.app/](https://v0-digi-bayt-website-build.vercel.app/)

## Technologies Used
- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Supabase](https://supabase.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Vercel](https://vercel.com/) (deployment)

## Folder Structure
- `/app` — Main app pages and routes
- `/components` — Reusable UI components
- `/lib` — Utility libraries (DB, API, etc.)
- `/models` — Mongoose models
- `/public` — Static assets
- `/hooks` — Custom React hooks

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
