// IVYAR Military Procurement - Accordion
document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = body.style.display === 'block';
    body.style.display = isOpen ? 'none' : 'block';
    btn.classList.toggle('open', !isOpen);
  });
});
