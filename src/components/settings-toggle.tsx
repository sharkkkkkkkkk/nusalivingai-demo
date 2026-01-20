"use client"

import * as React from "react"
import { Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/context/language-context"

export function SettingsToggle() {
    const { setTheme } = useTheme()
    const { setLanguage, language } = useLanguage()

    return (
        <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Terang (Light)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Gelap (Dark)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1 px-2 h-8 font-medium">
                        <Globe className="h-4 w-4" />
                        <span>{language.toUpperCase()}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("id")}>
                        🇮🇩 Indonesia
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("en")}>
                        🇺🇸 English
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
