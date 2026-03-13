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

const SECTION_ORDER: ScrollPhase[] = ["hero", "about", "projects", "contact"]
const SECTION_COUNT = SECTION_ORDER.length

// Each section occupies 1/4 of the timeline (0, 0.25, 0.5, 0.75)
const sectionProgress = (index: number) => index / SECTION_COUNT

// Minimum delta to trigger a section change
const WHEEL_THRESHOLD = 30
const TOUCH_THRESHOLD = 50

export const ScrollAnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const sectionsWrapper = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const snapAnimRef = useRef<gsap.core.Tween | null>(null)

  const currentSectionIndexRef = useRef(0)
  const currentPhaseRef = useRef<ScrollPhase>("hero")
  const isSnappingRef = useRef(false)
  const wheelAccumRef = useRef(0)
  const touchStartYRef = useRef(0)

  const sectionEnterCallbacksRef = useRef<Set<(section: ScrollPhase) => void>>(new Set())
  const sectionAnimationTriggersRef = useRef<Record<ScrollPhase, (() => void) | null>>({
    hero: null,
    about: null,
    projects: null,
    contact: null,
  })

  const timelineProgressRef = useRef(0)

  const initializeTimeline = useCallback(() => {
    if (!sectionsWrapper.current) return

    const tl = gsap.timeline({ paused: true })
    const wrapper = sectionsWrapper.current

    // Hero (0) → About (0.25): slide right
    tl.to(wrapper, { x: "-100vw", duration: 1, ease: "none" }, 0)

    // About (0.25) → Projects (0.5): slide down
    tl.to(wrapper, { y: "-100vh", duration: 1, ease: "none" }, 1)

    // Projects (0.5) → Contact (0.75): slide left
    tl.to(wrapper, { x: "0vw", duration: 1, ease: "none" }, 2)

    // Contact (0.75) → Hero (1.0): slide up
    tl.to(wrapper, { y: "0vh", duration: 1, ease: "none" }, 3)

    timelineRef.current = tl
  }, [])

  // ── Section Enter Notifications ──
  // Notifies nav/phase listeners immediately (for navbar highlight)
  const notifySectionPhase = useCallback((phase: ScrollPhase) => {
    if (phase === currentPhaseRef.current) return
    currentPhaseRef.current = phase
    sectionEnterCallbacksRef.current.forEach((cb) => cb(phase))
  }, [])

  // ── Snap to Section ──
  const snapToSection = useCallback((rawIndex: number) => {
    if (!timelineRef.current) return

    const index = ((rawIndex % SECTION_COUNT) + SECTION_COUNT) % SECTION_COUNT
    const phase = SECTION_ORDER[index]
    const target = sectionProgress(index)

    currentSectionIndexRef.current = index
    isSnappingRef.current = true
    wheelAccumRef.current = 0

    // Update phase immediately so navbar highlights the destination
    notifySectionPhase(phase)

    // Kill any in-progress snap
    snapAnimRef.current?.kill()

    snapAnimRef.current = gsap.to(timelineRef.current, {
      progress: target,
      duration: 1,
      ease: "power3.inOut",
      onUpdate: () => {
        timelineProgressRef.current = timelineRef.current?.progress() ?? 0
      },
      onComplete: () => {
        isSnappingRef.current = false
        // Fire card entrance animations once section has fully arrived
        sectionAnimationTriggersRef.current[phase]?.()
      },
    })
  }, [notifySectionPhase])

  // ── Navigate by direction ──
  const navigate = useCallback((direction: 1 | -1) => {
    if (isSnappingRef.current) return
    snapToSection(currentSectionIndexRef.current + direction)
  }, [snapToSection])

  // ── Wheel ──
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    if (isSnappingRef.current) return

    wheelAccumRef.current += e.deltaY

    if (Math.abs(wheelAccumRef.current) >= WHEEL_THRESHOLD) {
      navigate(wheelAccumRef.current > 0 ? 1 : -1)
    }
  }, [navigate])

  // ── Touch ──
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? 0
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const endY = e.changedTouches[0]?.clientY ?? 0
    const delta = touchStartYRef.current - endY

    if (Math.abs(delta) >= TOUCH_THRESHOLD) {
      navigate(delta > 0 ? 1 : -1)
    }
  }, [navigate])

  // ── Keyboard ──
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      navigate(1)
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      navigate(-1)
    }
  }, [navigate])

  // ── Callback Management ──
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

  // ── Mount ──
  useEffect(() => {
    const wrapper = document.querySelector("[data-sections-wrapper]") as HTMLDivElement | null
    if (wrapper) sectionsWrapper.current = wrapper

    initializeTimeline()

    document.addEventListener("wheel", handleWheel as EventListener, { passive: false })
    document.addEventListener("touchstart", handleTouchStart as EventListener, { passive: true })
    document.addEventListener("touchend", handleTouchEnd as EventListener, { passive: true })
    document.addEventListener("keydown", handleKeyDown as EventListener)

    return () => {
      document.removeEventListener("wheel", handleWheel as EventListener)
      document.removeEventListener("touchstart", handleTouchStart as EventListener)
      document.removeEventListener("touchend", handleTouchEnd as EventListener)
      document.removeEventListener("keydown", handleKeyDown as EventListener)
      snapAnimRef.current?.kill()
      timelineRef.current?.kill()
    }
  }, [initializeTimeline, handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown])

  const contextValue: ScrollAnimationContextType = {
    currentPhase: currentPhaseRef.current,
    timelineProgress: timelineProgressRef.current,
    isAnimating: isSnappingRef.current,
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
