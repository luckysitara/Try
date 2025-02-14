import { createContext, useContext, type ReactNode, useState } from "react"

interface ThemeContextProps {
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
}

const ThemeContext = createContext<ThemeContextProps | null>(null)

export const ThemeProvider: React.FC<{
  children: ReactNode
  attribute?: string
  defaultTheme?: "light" | "dark"
  enableSystem?: boolean
}> = ({ children, attribute = "class", defaultTheme = "dark", enableSystem = false }) => {
  const [theme, setTheme] = useState(defaultTheme)

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
  }

  const systemTheme = enableSystem
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : null

  const effectiveTheme = systemTheme || theme

  return (
    <ThemeContext.Provider value={{ theme: effectiveTheme, setTheme: handleThemeChange }}>
      <div className={`${attribute} ${effectiveTheme}`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

