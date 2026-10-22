// Applies a saved theme before first paint so the page never flashes the wrong colors.
// Shared by the public layout and the admin layout.
export const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
