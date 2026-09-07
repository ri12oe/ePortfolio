const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');

if (savedTheme == "dark") {
    document.documentElement.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode')
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
})