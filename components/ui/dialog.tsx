"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { gsap } from "gsap"
import { cn } from "@/app/utils/lib/utils"
import styles from "@/app/styles/Popover.module.css"
import { ScrollArea } from "./scroll-area"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const overlayWrapRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (overlayWrapRef.current) {
      gsap.fromTo(overlayWrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" })
    }
  }, [])

  return (
    <div ref={overlayWrapRef} style={{ opacity: 0 }}>
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(styles.overlay, className)}
        {...props}
      />
    </div>
  )
})
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: -20, scale: 0 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.inOut", delay: 0.3 }
      )
    }
  }, [])

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className="fixed left-1/2 top-1/2 z-50 w-screen max-w-xl translate-x-[-50%] translate-y-[-50%] focus:outline-none"
        {...props}
      >
        <div
          ref={contentRef}
          className={cn(styles.content, className)}
          style={{ opacity: 0, transform: "scale(0)" }}
        >
            <ScrollArea className=" h-[100%] rounded-lg" >
              {children}
            </ScrollArea>
          <DialogPrimitive.Close className="absolute right-4 top-4 text-[#4a4e69] transition hover:text-[#050a30] dark:hover:text-[#050a30]">
            <X className="h-7 w-7 stroke-7" />
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
