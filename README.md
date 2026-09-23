# 🤖 AI-Powered Code Reviewer

An AI-powered code reviewer that analyzes your code in real time and returns structured feedback — **errors, warnings, and improvement suggestions** — through a clean, dark-themed, two-panel interface.

Write code in a live syntax-highlighted editor on the left, click **Review**, and get an instant AI-generated report on the right.

---

## ✨ Features

- 🖊️ **Live code editor** with Python syntax highlighting (PrismJS) and synced line numbers
- ⚡ **One-click review** — sends your code to an AI backend and displays results instantly
- ✅ **Structured feedback** — errors, warnings, suggestions, and an AI prediction, each clearly categorized
- 🎨 **Clean dark UI** with a responsive two-panel layout
- 🛡️ **Graceful error handling** — shows a friendly message if the backend is unreachable
- 🌗 **System-aware theming** via CSS custom properties

---

## 🧰 Tech Stack

**Frontend**
- [React 19](https://react.dev/) — component-based UI
- [Vite](https://vite.dev/) — dev server & build tool
- [Axios](https://axios-http.com/) — HTTP requests to the backend API
- [PrismJS](https://prismjs.com/) — code syntax highlighting
- [react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor) — lightweight code input component

**Backend**
- API endpoint (`/review`) that accepts source code and returns an AI-generated review
- *(Update this section with your backend's actual stack — e.g. Python / FastAPI / Flask / Node.js / OpenAI API, etc.)*

---

## 📂 Project Structure

```
frontend/
├── index.html            # HTML entry point
├── src/
│   ├── main.jsx           # Mounts the React app
│   ├── App.jsx             # Main UI + logic (state, API calls)
│   ├── App.css              # Editor / review panel styling
│   └── index.css              # Global styles & CSS variables
├── eslint.config.js       # Lint rules
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- The backend API running (see [Backend Setup](#backend-setup))

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the frontend's root directory:

```env
VITE_API_URL=http://localhost:8000
```

> Replace the URL with wherever your backend server is running.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Build for production

```bash
npm run build
```

---

## <a name="backend-setup"></a>🔗 Backend Setup

This frontend expects a backend endpoint at:

```
POST {VITE_API_URL}/review
```

**Request body:**
```json
{
  "code": "def sum_numbers():\n    return 1 + 1"
}
```

**Expected response:**
```json
{
  "status": "success",
  "errors": [{ "line": 4, "message": "..." }],
  "warnings": [{ "line": 9, "message": "..." }],
  "suggestions": [{ "line": 2, "message": "..." }],
  "ai_prediction": "..."
}
```

> See the backend repository/folder for setup instructions.

---

## 🖥️ Usage

1. Type or paste your Python code into the left-hand editor.
2. Click the **Review** button.
3. View the AI-generated report on the right — status, errors, warnings, and suggestions.

---

## 🗺️ Roadmap

- [ ] Support for additional languages beyond Python
- [ ] Downloadable / shareable review reports
- [ ] Review history
- [ ] Inline error highlighting in the editor

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
