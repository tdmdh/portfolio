"use client"

import { useEffect, useRef, useCallback, createContext, useContext } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════════════════════════════════
// TYPES & CONTEXT
// ═══════════════════════════════════════════════════════════════════

type ScrollPhase = "hero" | "about" | "projects" | "contact"

interface ScrollAnimationContextType {
  currentPhase: ScrollPhase
  timelineProgress: number
  isAnimating: boolean
  sectionsWrapper: React.RefObject<HTMLDivElement | null>
  onSectionEnter: (callback: (section: ScrollPhase) => void) => void
  offSectionEnter: (callback: (section: ScrollPhase) => void) => void
  registerSectionAnimation: (phase: ScrollPhase, trigger: () => void) => void
  unregisterSectionAnimation: (phase: ScrollPhase) => void
}

const ScrollAnimationContext = createContext<ScrollAnimationContextType | null>(null)

export { ScrollAnimationContext }

export const useScrollAnimation = () => {
  const context = useContext(ScrollAnimationContext)
  if (!context) throw new Error("useScrollAnimation must be used within ScrollAnimationProvider")
  return context
}

// ═══════════════════════════════════════════════════════════════════
// SCROLL ANIMATION CONTROLLER
// ═══════════════════════════════════════════════════════════════════

export const ScrollAnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsWrapper = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTrackerRef = useRef({ wheel: 0, touch: 0, timer: 0 })
  const currentPhaseRef = useRef<ScrollPhase>("hero")
  const sectionEnterCallbacksRef = useRef<Set<(section: ScrollPhase) => void>>(new Set())
  const sectionAnimationTriggersRef = useRef<Record<ScrollPhase, (() => void) | null>>({
    hero: null,
    about: null,
    projects: null,
    contact: null,
  })
  const isAnimatingRef = useRef(false)
  const timelineProgressRef = useRef(0)

  // ── Scroll Distance Configuration ──
  const SCROLL_CONFIG = {
    about: { start: 25, end: 50 },     // 25vh to scroll right to About
    projects: { start: 50, end: 75 },  // 50vh to scroll down to Projects
    contact: { start: 75, end: 100 },  // 75vh to scroll left to Contact
    hero: { start: 100, end: 125 },    // 100vh to return to Hero
  }

  const TOTAL_SCROLL_HEIGHT = 100 // Total scrollable height in viewport units (now 1/5 of before)

  // ── Initialize Master Timeline ──
  const initializeTimeline = useCallback(() => {
    if (!sectionsWrapper.current) return

    const tl = gsap.timeline({ paused: true })
    const wrapper = sectionsWrapper.current

    tl.to(
      wrapper,
      {
        x: "-100vw",
        duration: 1,
        ease: "power2.inOut",
      },
      0
    )

    tl.to(
      wrapper,
      {
        y: "-100vh",
        duration: 1,
        ease: "power2.inOut",
      },
      1
    )

    tl.to(
      wrapper,
      {
        x: "0vw",
        duration: 1,
        ease: "power2.inOut",
      },
      2
    )

    tl.to(
      wrapper,
      {
        y: "0vh",
        duration: 1,
        ease: "power2.inOut",
      },
      3
    )

    timelineRef.current = tl
  }, [])

  const detectPhase = useCallback((progress: number): ScrollPhase => {
    const percent = (progress / TOTAL_SCROLL_HEIGHT) * 100

    if (percent < 33) return "hero"
    if (percent < 50) return "about"
    if (percent < 75) return "projects"
    return "contact"
  }, [])

  const notifySectionEnter = useCallback((phase: ScrollPhase) => {
    if (phase !== currentPhaseRef.current) {
      currentPhaseRef.current = phase
      sectionEnterCallbacksRef.current.forEach((cb) => cb(phase))
      const trigger = sectionAnimationTriggersRef.current[phase]
      if (trigger) {
        trigger()
      }
    }
  }, [])

  const updateTimelineProgress = useCallback((scrollPosition: number) => {
    if (!timelineRef.current) return

    const loopedPosition = scrollPosition % (TOTAL_SCROLL_HEIGHT * 100)

    const progress = loopedPosition / (TOTAL_SCROLL_HEIGHT * 100)
    timelineProgressRef.current = progress

    timelineRef.current.progress(progress)

    const newPhase = detectPhase(loopedPosition)
    notifySectionEnter(newPhase)
  }, [detectPhase, notifySectionEnter])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!timelineRef.current) return

      e.preventDefault()

      const delta = e.deltaY > 0 ? 50 : -50
      scrollTrackerRef.current.wheel += delta

      updateTimelineProgress(scrollTrackerRef.current.wheel)

      clearTimeout(scrollTrackerRef.current.timer)

      isAnimatingRef.current = true
      scrollTrackerRef.current.timer = window.setTimeout(() => {
        isAnimatingRef.current = false
      }, 100)
    },
    [updateTimelineProgress]
  )

  const handleTouchStart = useCallback((e: TouchEvent) => {
    scrollTrackerRef.current.touch = e.touches[0]?.clientY || 0
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!timelineRef.current) return

      e.preventDefault()

      const touchY = e.touches[0]?.clientY || 0
      const delta = (scrollTrackerRef.current.touch - touchY) * 1 // Increased from 0.5 to 2 for sensitivity

      scrollTrackerRef.current.touch = touchY
      scrollTrackerRef.current.wheel += delta

      updateTimelineProgress(scrollTrackerRef.current.wheel)
    },
    [updateTimelineProgress]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!timelineRef.current) return

      const step = 200

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        scrollTrackerRef.current.wheel += step
        e.preventDefault()
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        scrollTrackerRef.current.wheel -= step
        e.preventDefault()
      }

      updateTimelineProgress(scrollTrackerRef.current.wheel)
    },
    [updateTimelineProgress]
  )

  const onSectionEnter = useCallback((callback: (section: ScrollPhase) => void) => {
    sectionEnterCallbacksRef.current.add(callback)
  }, [])

  const offSectionEnter = useCallback((callback: (section: ScrollPhase) => void) => {
    sectionEnterCallbacksRef.current.delete(callback)
  }, [])

  const registerSectionAnimation = useCallback((phase: ScrollPhase, trigger: () => void) => {
    sectionAnimationTriggersRef.current[phase] = trigger
  }, [])

  const unregisterSectionAnimation = useCallback((phase: ScrollPhase) => {
    sectionAnimationTriggersRef.current[phase] = null
  }, [])

  useEffect(() => {
    // Find the sections wrapper by query selector
    const wrapper = document.querySelector('[data-sections-wrapper]') as HTMLDivElement | null
    if (wrapper) {
      sectionsWrapper.current = wrapper
    }

    initializeTimeline()

    const preventDefault = (e: Event) => {
      if (isAnimatingRef.current || e.target === document) {
        e.preventDefault()
      }
    }

    document.addEventListener("wheel", handleWheel as EventListener, { passive: false })
    document.addEventListener("touchstart", handleTouchStart as EventListener, { passive: false })
    document.addEventListener("touchmove", handleTouchMove as EventListener, { passive: false })
    document.addEventListener("keydown", handleKeyDown as EventListener)

    return () => {
      document.removeEventListener("wheel", handleWheel as EventListener)
      document.removeEventListener("touchstart", handleTouchStart as EventListener)
      document.removeEventListener("touchmove", handleTouchMove as EventListener)
      document.removeEventListener("keydown", handleKeyDown as EventListener)

      timelineRef.current?.kill()
    }
  }, [initializeTimeline, handleWheel, handleTouchStart, handleTouchMove, handleKeyDown])

  const contextValue: ScrollAnimationContextType = {
    currentPhase: currentPhaseRef.current,
    timelineProgress: timelineProgressRef.current,
    isAnimating: isAnimatingRef.current,
    sectionsWrapper,
    onSectionEnter,
    offSectionEnter,
    registerSectionAnimation,
    unregisterSectionAnimation,
  }

  return (
    <ScrollAnimationContext.Provider value={contextValue}>
      {children}
    </ScrollAnimationContext.Provider>
  )
}
