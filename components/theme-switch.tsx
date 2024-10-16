import { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/switch";

import { SunIcon, MoonIcon } from "@/components/icons";

export const ThemeSwitch: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
