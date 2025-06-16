import { type Theme } from "../features/theme/themeSlice";

export function applyTheme (theme: Theme) {
    const root = window.document.documentElement;

    root.classList.remove('light','dark')

    if (theme === 'system') {
        const systemtheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        root.classList.add(systemtheme);
        return;
    }
    root.classList.add(theme);
}