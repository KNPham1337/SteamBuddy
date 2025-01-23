import SteamIcon from "../assets/Steam_icon_logo.svg";
import { Button } from "./ui/button";

function SteamLoginButton() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button
        variant={"outline"}
        className="text-foreground hover:bg-blue-500 dark:text-foreground"
      >
        <img className="h-5 w-5" src={SteamIcon} /> Sign in through Steam
      </Button>
    </div>
  );
}

export default SteamLoginButton;
