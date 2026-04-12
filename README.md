# Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Vite. Features smooth animations, interactive components, and a clean design powered by TailwindCSS and Framer Motion.

**Live Site**: [https://www.congchuongtruong.net/](https://www.congchuongtruong.net/)

## Features

- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Interactive Navigation**: 
  - Advanced search functionality across skills, projects, and experience
  - Scroll spy for active section highlighting
  - Smooth scrolling navigation
- **Contact Form**: Secure form submission via Web3Forms with spam protection
- **Performance Optimized**: WebP images and optimized build configuration

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.10
- **Styling**: TailwindCSS 3.4.14 with PostCSS
- **Animations**: Framer Motion 11.11.10
- **Icons**: React Icons 5.3.0
- **Form Handling**: Web3Forms API
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ctru0009/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

Get your access key from [Web3Forms](https://web3forms.com/)

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment. To deploy:

```bash
npm run deploy
```

This will:
1. Build the project
2. Deploy to the `gh-pages` branch
3. Be available at your GitHub Pages URL

## Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── common/        # Shared components (NavBar, Footer)
│   │   ├── about/         # About section
│   │   ├── contact/       # Contact section and form
│   │   ├── hero/          # Hero/Landing section
│   │   ├── projects/      # Projects showcase
│   │   ├── skills/        # Skills display
│   │   └── work/          # Work experience
│   ├── data/              # Centralized data management
│   ├── assets/            # Images and static assets
│   ├── utils/             # Utility functions
│   └── App.tsx            # Main app component
├── .env.example           # Environment variables template
├── CLAUDE.md              # Project documentation for AI
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## Customization

### Updating Content

All portfolio content is managed in `src/data/data.ts`. Edit this file to update:

- Personal information
- Work experience
- Projects
- Skills
- Education
- Contact information

### Styling

The project uses TailwindCSS for styling. Customize the design by:

1. Editing component classes directly
2. Modifying `tailwind.config.js` for theme customization
3. Adding custom CSS in `src/index.css`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to GitHub Pages |

## License

This project is open source and available under the MIT License.

## Author

**Cong Chuong Truong**

- GitHub: [@ctru0009](https://github.com/ctru0009)
- Website: [https://www.congchuongtruong.net](https://www.congchuongtruong.net)
