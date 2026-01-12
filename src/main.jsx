import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Встроенные стили, чтобы избежать 404 ошибок
const style = document.createElement('style')
style.textContent = `
  /* Основные стили приложения */
  .main {
    min-height: calc(100vh - 140px);
    padding: 2rem 0;
  }

  .footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1.5rem 0;
  }

  .grid {
    display: grid;
    gap: 1.5rem;
  }

  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  /* Формы */
  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-control {
    width: 100%;
    padding: 10px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  .form-control:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  /* Адаптивность */
  @media (max-width: 768px) {
    .nav {
      display: none;
    }
    
    .grid-3,
    .grid-4 {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .header .container {
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (max-width: 480px) {
    .grid-2,
    .grid-3,
    .grid-4 {
      grid-template-columns: 1fr;
    }
    
    .container {
      padding: 0 10px;
    }
  }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }

  .p-1 { padding: 0.5rem; }
  .p-2 { padding: 1rem; }
  .p-3 { padding: 1.5rem; }
  .p-4 { padding: 2rem; }

  .d-flex {
    display: flex;
  }

  .justify-between {
    justify-content: space-between;
  }

  .align-center {
    align-items: center;
  }

  .gap-1 { gap: 0.5rem; }
  .gap-2 { gap: 1rem; }
  .gap-3 { gap: 1.5rem; }
  .gap-4 { gap: 2rem; }

  .text-center {
    text-align: center;
  }

  /* Таймер */
  .timer {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    color: var(--primary-color);
    margin: 2rem 0;
  }

  /* Прогресс бар */
  .progress-bar {
    height: 20px;
    background: var(--border-color);
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 10px;
    transition: width 0.5s ease-in-out;
  }
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
