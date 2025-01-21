import SteamIcon from "../assets/Steam_icon_logo.svg";
import { Button } from "./ui/button";

function SteamLoginButton() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button className="flex items-center space-x-2 bg-blue-950 hover:bg-blue-500 dark:bg-gray-500 dark:hover:bg-blue-500">
        <img className="h-6 w-6" src={SteamIcon} />
        <span className="text-primary-foreground dark:text-primary-foreground">
          Sign in through Steam
        </span>
      </Button>
    </div>
  );
}

export default SteamLoginButton;
