import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    ThemeContext
} from "./ThemeContextBase";

function getInitialTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (
        savedTheme === "light"
        || savedTheme === "dark"
    ) {
        return savedTheme;
    }

    const prefersDark =
        window.matchMedia
        && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark
        ? "dark"
        : "light";
}

export function ThemeProvider({
    children
}) {

    const [theme, setTheme] =
        useState(getInitialTheme);

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);

    const value =
        useMemo(
            () => ({
                theme,
                isDarkMode: theme === "dark",
                toggleTheme: () =>
                    setTheme(currentTheme =>
                        currentTheme === "dark"
                            ? "light"
                            : "dark"
                    )
            }),
            [theme]
        );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}