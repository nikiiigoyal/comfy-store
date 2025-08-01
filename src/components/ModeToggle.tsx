import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useAppDispatch } from "../hooks";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { setTheme } from "../features/theme/themeSlice";

function ModeToggle () {
    const dispatch = useAppDispatch () ;
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"></Sun>
<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => dispatch(setTheme('light'))}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setTheme('dark'))}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setTheme('system'))}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}
export default ModeToggle