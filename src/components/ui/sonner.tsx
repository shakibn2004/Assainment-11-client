"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/80 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-[.toaster]:dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)] font-sans",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-primary/50 group-[.toaster]:bg-primary/10 dark:group-[.toaster]:bg-primary/10 group-[.toaster]:text-primary",
          error: "group-[.toaster]:border-destructive/50 group-[.toaster]:bg-destructive/10 dark:group-[.toaster]:bg-destructive/10 group-[.toaster]:text-destructive",
          warning: "group-[.toaster]:border-amber-500/50 group-[.toaster]:bg-amber-500/10 dark:group-[.toaster]:bg-amber-500/10 group-[.toaster]:text-amber-500",
          info: "group-[.toaster]:border-blue-500/50 group-[.toaster]:bg-blue-500/10 dark:group-[.toaster]:bg-blue-500/10 group-[.toaster]:text-blue-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
