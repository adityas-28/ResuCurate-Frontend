# ResuCurate - Frontend

A modern, responsive React application for creating, managing, and optimizing resumes with ATS (Applicant Tracking System) scanning capabilities.

## 🚀 Features

- **Resume Builder**: Create professional resumes with multiple templates
- **ATS Scanner**: Upload PDF resumes and get instant ATS score analysis
- **Resume Management**: View and manage all your resumes in one place
- **Arsenal View**: Organize your professional information (experience, education, projects, etc.)
- **Dashboard**: Overview of your resume statistics and ATS scores
- **Modern UI**: Beautiful, responsive design with dark mode support

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Three.js** - 3D graphics (for visual effects)
- **Lucide React** - Icon library
- **Supabase** - Backend as a Service (authentication & database)

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Backend Server** - The ML Services backend should be running (see `ResuCurate-mlServices/README_SETUP.md`)

## 🔧 Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   cd ResuCurate-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## ⚙️ Environment Setup

1. **Create a `.env` file** in the root directory (if it doesn't exist):
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables** in `.env`:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Backend API URL
   VITE_API_URL=http://localhost:8000
   ```

   **Note**: The `.env` file is already configured with default values. Update them if needed.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will start on `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
ResuCurate-Frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Arsenal/         # Resume data form components
│   │   └── home/           # Homepage components
│   ├── pages/              # Main page components
│   │   ├── AtsScan.jsx     # ATS scanning page
│   │   ├── Dashboard.jsx    # User dashboard
│   │   ├── ResuBuilder.jsx  # Resume builder
│   │   └── ...
│   ├── assets/             # Static assets (images, templates)
│   ├── App.jsx             # Main app component with routes
│   ├── main.jsx            # Application entry point
│   └── supabase-client.js  # Supabase client configuration
├── public/                 # Public static files
├── .env                    # Environment variables
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🔌 API Integration

### Backend Connection

The frontend connects to the ML Services backend for ATS scanning:

- **Default API URL**: `http://localhost:8000`
- **ATS Score Endpoint**: `POST /api/ats-score`
- **Configuration**: Set `VITE_API_URL` in `.env` file

### ATS Scanning Flow

1. User uploads a PDF resume on the ATS Scan page
2. Frontend sends the file to `/api/ats-score` endpoint
3. Backend processes the PDF and returns ATS analysis
4. Frontend displays the results (score, strengths, improvements)

### Making API Calls

Example from `AtsScan.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const response = await fetch(`${API_URL}/api/ats-score`, {
  method: "POST",
  body: formData, // FormData with PDF file
});
```

## 🎨 Key Pages

### `/` - Home
Landing page with features, pricing, and navigation.

### `/app/dashboard` - Dashboard
Overview of user's resume statistics and recent activity.

### `/app/ats-scan` - ATS Scanner
Upload PDF resumes and get instant ATS score analysis with detailed feedback.

### `/app/builder/:resumeId` - Resume Builder
Create and edit resumes with multiple templates and customization options.

### `/app/my-resumes` - My Resumes
View and manage all your saved resumes.

### `/app/generate` - Generate Resume
AI-powered resume generation from user's arsenal data.

### `/app/view-arsenal` - View Arsenal
Manage your professional information (experience, education, projects, etc.).

## 🐛 Troubleshooting

### Backend Connection Issues

**Error**: "Unable to connect to the server"

**Solution**:
1. Make sure the backend server is running (see `ResuCurate-mlServices/README_SETUP.md`)
2. Verify `VITE_API_URL` in `.env` matches your backend URL
3. Check that the backend is accessible at the configured URL
4. Ensure CORS is properly configured on the backend

### Port Already in Use

**Error**: Port 5173 is already in use

**Solution**:
- Vite will automatically use the next available port
- Or specify a different port: `npm run dev -- --port 3000`

### Module Not Found Errors

**Error**: Cannot find module 'X'

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

**Solution**:
- Make sure `.env` file is in the root directory
- Restart the dev server after changing `.env`
- Variables must be prefixed with `VITE_` to be accessible in the app

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Supabase Integration

The application uses Supabase for:
- User authentication
- Database storage
- File storage (optional)

Make sure your Supabase project is configured and the credentials are set in `.env`.

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Other Platforms

1. Build the project: `npm run build`
2. Deploy the `dist` directory to your hosting service
3. Make sure to set environment variables on your hosting platform

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request


Made with ❤️ by [Aditya](https://github.com/adityas-28)

