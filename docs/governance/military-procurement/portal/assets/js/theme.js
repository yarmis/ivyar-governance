// IVYAR Military Procurement - Theme Toggle
function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.contains('light');
  
  body.classList.remove('light', 'dark');
  body.classList.add(isLight ? 'dark' : 'light');
  
  document.getElementById('theme-light').disabled = isLight;
  document.getElementById('theme-dark').disabled = !isLight;
  
  localStorage.setItem('ivyar-theme', isLight ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('ivyar-theme') || 'light';
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(savedTheme);
  document.getElementById('theme-light').disabled = savedTheme === 'dark';
  document.getElementById('theme-dark').disabled = savedTheme === 'light';
});
