import {
    useTheme
} from "../hooks/useTheme";

import ActionButton from "./ActionButton";

function ThemeToggle() {

    const {
        isDarkMode,
        toggleTheme
    } = useTheme();

    return (
        <ActionButton
            variant="secondary"
            onClick={toggleTheme}
            title={
                isDarkMode
                    ? "Cambiar a modo claro"
                    : "Cambiar a modo oscuro"
            }
        >
            {
                isDarkMode
                    ? "Modo claro"
                    : "Modo oscuro"
            }
        </ActionButton>
    );
}

export default ThemeToggle;