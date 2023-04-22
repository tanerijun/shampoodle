import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Sun from "~/components/icons/Sun";
import Moon from "~/components/icons/Moon";

export default function Navbar() {
  return (
    <div className="navbar justify-between bg-base-100">
      <Logo />
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <UserInfo />
      </div>
    </div>
  );
}

function Logo() {
  return <div className="text-4xl text-primary">Shampoodle</div>;
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

  if (!mounted) {
    return <div></div>;
  }

  return (
    <button className="btn-ghost btn-circle btn" onClick={toggleTheme}>
      {theme === "dark" ? <Moon className="h-6 w-6" /> : <Sun />}
    </button>
  );
}

function UserInfo() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return (
      <div className="placeholder avatar">
        <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
          <span className="text-xs">?</span>
        </div>
      </div>
    );
  }

  return (
    <div className="avatar">
      <div className="h-12 w-12 rounded-full">
        <img src={user.profileImageUrl} alt={user.username || "profile"} />
      </div>
    </div>
  );
}
