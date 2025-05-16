"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/app/utils/lib/utils"
import styles from "@/app/styles/Popover.module.css"
import { ScrollArea } from "./scroll-area"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, ease: "linear" }}
  >
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        styles.overlay,className
      )}
      
      {...props}
    />
  </motion.div>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <AnimatePresence>
      <DialogPrimitive.Content
        ref={ref}
        className="fixed left-1/2 top-1/2 z-50 w-screen max-w-xl translate-x-[-50%] translate-y-[-50%] focus:outline-none"
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          className={cn(styles.content, className)}
        >
            <ScrollArea className=" h-[100%] rounded-lg" >

              {children}
            </ScrollArea>
          <DialogPrimitive.Close className="absolute right-4 top-4 text-[#4a4e69] transition hover:text-[#050a30] dark:hover:text-[#050a30]">
            <X className="h-7 w-7 stroke-7" />
          </DialogPrimitive.Close>
        </motion.div>
      </DialogPrimitive.Content>
    </AnimatePresence>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
