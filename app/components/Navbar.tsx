import { Button } from "@/components/ui/button";
import Link from "next/link";
import { githubIcon } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown";
import SearchDialog from "./SearchDialog";

const Navbar = () => {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left" />
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
          <Link href={"https://github.com"} target="_blanc">
            <Button className="source-code-btn flex items-center gap-2">
              {githubIcon} Source Code
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
