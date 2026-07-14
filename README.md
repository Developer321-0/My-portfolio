# Premium Software Developer Portfolio

A world-class, premium, modern, and minimal personal portfolio website built for **Muhammad Arslan** (Software Developer / AI & Automation Engineer). 

It features a dark-mode-first aesthetic with a light mode toggle, glassmorphic layout components, custom scroll reveals, a typewriter effect, and a fully **data-driven project architecture**.

## 🚀 Live Demo & Structure

- **No Build Complexity**: Built using vanilla HTML5, modern CSS3 transitions, and modern ES6 modules. It runs directly in the browser.
- **Easy Updating**: Project lists, skills, education milestones, and bio information are entirely decoupled into a configuration file (`data.js`).

---

## 🛠️ Local Development & Quick Start

Since this project uses ES6 Modules (`import`/`export`), standard security policies in modern browsers prevent loading them directly from local `file://` protocols. You need a simple local server to run the site.

### Option 1: Live Server (VS Code Extension)
1. Open the project folder in VS Code.
2. Click **Go Live** at the bottom-right corner of the window.

### Option 2: Node.js (npx)
If you have Node.js installed, open your terminal in the project directory and run:
```bash
npx serve .
```
or:
```bash
npx http-server .
```
Then open the provided local URL (usually `http://localhost:3000` or `http://localhost:8080`).

---

## 📂 Updating Portfolio Content

To update details (such as adding a project, editing skills, changing your bio, or modifying email/socials), open `data.js` and modify the respective objects.

### Adding a New Project
Simply append a new project object to the `projects` array in [data.js](file:///d:/BSCS/Portfolio/data.js):

```javascript
{
  title: "My New Awesome System",
  description: "A description of what your application does and the problems it solves.",
  techStack: ["Node.js", "AI APIs", "CSS Grid"],
  image: "https://images.unsplash.com/photo-...", // Image URL or local asset path
  githubLink: "https://github.com/yourusername/repo-name",
  liveLink: "https://project-demo.com",
  featured: true // Set to true to show 'Featured' badge
}
```

The site will automatically load, format, animate, and display the new project without you needing to touch any HTML or CSS code!

---

## 🌐 Deployment Instructions

### 1. GitHub Pages (Free)
1. Create a public repository on GitHub and push this codebase.
2. Go to **Settings** > **Pages** in your repository.
3. Under *Build and deployment*, set Source to **Deploy from a branch**.
4. Select the `main` or `master` branch and folder `/` (root), then click **Save**.
5. Your site will be live at `https://yourusername.github.io/repository-name/` within a few minutes.

### 2. Vercel (Free)
1. Sign up/log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project** and import your GitHub repository.
3. Since this is a static project, Vercel will automatically detect the settings. Keep the build command empty, and click **Deploy**.

### 3. Netlify (Free)
1. Drag and drop the folder containing these files directly onto the [Netlify Drop](https://app.netlify.com/drop) dashboard.
2. Alternatively, connect Netlify to your GitHub repository for continuous deployment.
