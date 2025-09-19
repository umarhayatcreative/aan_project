   const root = document.documentElement;

    // ✅ Agar localStorage me theme nahi hai to attribute ka value le aur save kar do
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      savedTheme = root.getAttribute('data-theme') || 'light';
      localStorage.setItem('theme', savedTheme);
    }

    // ✅ Hamesha jo theme saved hai usko lagao
    root.setAttribute('data-theme', savedTheme);

    // ✅ Change theme function
    function setTheme(t) {
      root.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
      document.body.classList.add('theme-transition');
      setTimeout(() => document.body.classList.remove('theme-transition'), 300);
    }

    // Buttons
    document.getElementById('lightModeBtn').addEventListener('click', () => setTheme('light'));
    document.getElementById('darkModeBtn').addEventListener('click', () => setTheme('dark'));