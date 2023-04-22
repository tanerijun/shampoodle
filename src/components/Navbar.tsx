import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Sun from "~/components/icons/Sun";
import Moon from "~/components/icons/Moon";

export default function Navbar() {
  return (
    <div className="flex justify-between bg-gray-200 p-4">
      <Logo />
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <UserInfo />
      </div>
    </div>
  );
}

function Logo() {
  return <div className="text-4xl">Shampoodle</div>;
}

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button className="border border-gray-600 p-2" onClick={toggleTheme}>
      {!mounted ? (
        <Sun className="h-4 w-4" />
      ) : theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}

function UserInfo() {
  const { user } = useUser();

  return (
    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full object-cover">
      {user ? (
        <img src={user.profileImageUrl} alt={user.username || "profile"} />
      ) : (
        <span>?</span> // TODO: replace with default avatar
      )}
    </div>
  );
}
