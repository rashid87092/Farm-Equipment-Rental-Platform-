import { theme } from "./theme";

export function GlobalStyles() {
  return (
    <style>{`
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        color: ${theme.text};
        background: ${theme.bg};
        font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      }
      button, input, select, textarea { font: inherit; }
      button { cursor: pointer; }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .nav-link { display: none; }
      @media (min-width: 640px) { .nav-link { display: inline-flex !important; } }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; }
      ::-webkit-scrollbar-thumb { background: ${theme.primaryLight}; border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: ${theme.primary}; }
    `}</style>
  );
}

export default GlobalStyles;
