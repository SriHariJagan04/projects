export const scrollToSection = (id) => {
  const yOffset = 75; // adjust based on your header height
  const element = document.getElementById(id);
  if (element) {
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
