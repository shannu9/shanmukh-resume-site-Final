# 📄 Shanmukh’s Interactive Resume & Portfolio Site

An interactive, modern resume website built to showcase **Shanmukh Sri Surya Gopi’s** professional journey — including skills, projects, certifications, and education — through a dynamic and elegant UI. The platform supports live content updates via a custom-built admin dashboard and provides recruiters a seamless browsing experience.

---

## 🌟 Project Overview

**Shanmukh’s Interactive Resume & Portfolio** is a public-facing web application designed to impress hiring professionals with:

- Dynamic, filterable project views
- Real-time content updates via Firebase
- ATS-style skill navigation with clickable keywords
- Responsive, visually rich layout inspired by modern design principles

---

## 🧰 Tech Stack

### Frontend
- **React**
- **TailwindCSS**
- **Framer Motion** (smooth animations)
- **React Helmet** (for SEO metadata)

### Backend & Hosting
- **Firebase Firestore** (real-time database)
- **Firebase Hosting**
- **Firebase Auth** (admin login)
- **Firebase Storage** (image uploads)

### Admin & CMS
- **Custom-built Admin Dashboard**
  - Manage: Resume, Projects, Certifications, Skills, Subjects
  - Live Firestore sync
  - SEO-friendly structure
  - Secure Firebase Auth login

### CI/CD
- **GitHub Actions + Firebase CI/CD**

---

## 🧭 How It Works

1. 🔥 Visitors land on a modern resume homepage (Resume is the landing page)
2. 🧠 Content is dynamically fetched from Firestore (resume, skills, projects, etc.)
3. 🏷️ Clicking on skills/subjects filters relevant projects in real-time
4. 🔐 Admin Panel:
   - Access via Firebase Auth
   - Add/edit/delete content like resume sections, projects, tags, certifications, and more
   - Drag-to-reorder (for resume sections/skills)
   - Upload certification/project images via Firebase Storage

---

## 🎨 Features

- Elegant scroll-based UI with smooth animations
- SEO-optimized pages via React Helmet
- Dynamic data handling (no hardcoded content)
- Responsive layout (mobile and desktop)
- Smart navigation linking between Skills, Projects, and Subjects
- Project filtering by tag or subject (`?tag=` and `?subject=` in URL)
- PDF export option (optional)

---



---


