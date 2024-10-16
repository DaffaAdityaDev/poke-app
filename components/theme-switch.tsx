import { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/switch";

import { SunIcon, MoonIcon } from "@/components/icons";

// ThemeSwitch component for toggling between light and dark themes
export const ThemeSwitch: FC = () => {
  // State to ensure component is mounted before rendering
  const [isMounted, setIsMounted] = useState(false);
  // Hook to access and modify the current theme
  const { theme, setTheme } = useTheme();

  // Set isMounted to true after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering until component is mounted to avoid hydration mismatch
  if (!isMounted) return null;

  return (
    <Switch
      color="secondary"
      defaultSelected={theme === "light"}
      endContent={<MoonIcon size={20} />}
      size="lg"
      startContent={<SunIcon size={20} />}
      onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
    />
  );
};
