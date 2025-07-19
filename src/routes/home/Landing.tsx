import { FC, useEffect, useState } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Textfit } from '@ataverascrespo/react18-ts-textfit'
import { motion, AnimatePresence } from 'motion/react'
import { HiOutlineChevronDoubleDown } from 'react-icons/hi'

interface LandingProps extends React.HTMLAttributes<HTMLDivElement> {
  onDone?: () => void
}

export const Landing: FC<LandingProps> = ({ className, onDone, ...props }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [rerenderKey, setRerenderKey] = useState(0)
  const [hasRerendered, setHasRerendered] = useState(false)
  const [showScrollTip, setShowScrollTip] = useState(false)
  const [isSticky, setIsSticky] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true)
        setTimeout(() => {
          setRerenderKey((k) => k + 1)
          setHasRerendered(true)
        }, 50)
      })
    } else {
      setFontsLoaded(true)
      setTimeout(() => {
        setRerenderKey((k) => k + 1)
        setHasRerendered(true)
      }, 50)
    }
    // Show scroll tip after 2 seconds
    const tipTimeout = setTimeout(() => setShowScrollTip(true), 2000)

    // Prevent scroll/touch from scrolling content while landing is sticky
    let hasFaded = false
    const triggerFade = (e?: Event) => {
      if (e) e.preventDefault()
      if (!hasFaded) {
        hasFaded = true
        setIsFadingOut(true)
        setShowScrollTip(false)
        setTimeout(() => {
          setIsSticky(false)
          document.body.classList.remove('overflow-hidden')
          if (onDone) onDone()
        }, 700)
      }
    }
    if (isSticky) {
      document.body.classList.add('overflow-hidden')
      window.addEventListener('wheel', triggerFade, { passive: false })
      window.addEventListener('touchstart', triggerFade, { passive: false })
      window.addEventListener('touchmove', triggerFade, { passive: false })
    }

    return () => {
      clearTimeout(tipTimeout)
      window.removeEventListener('wheel', triggerFade)
      window.removeEventListener('touchstart', triggerFade)
      window.removeEventListener('touchmove', triggerFade)
      // Only remove overflow-hidden if landing is not sticky (e.g. on unmount)
      if (!isSticky) document.body.classList.remove('overflow-hidden')
    }
  }, [onDone, isSticky])

  if (!fontsLoaded) return null

  return (
    <div
      id="landing"
      className={twClassMerge(
        className,
        isSticky ? 'fixed inset-0 z-50 overflow-hidden h-[100dvh]' : 'relative h-0',
        'transition-opacity duration-700',
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
      {...props}
    >
      <span className="sr-only">Limes Road Design</span>
      <div
        className={twClassMerge(
          'flex h-full w-full flex-col items-center justify-center gap-4 text-center',
          hasRerendered ? 'opacity-100' : 'opacity-0'
        )}
      >
        <motion.div
          key={`limes-${rerenderKey}`}
          initial={{ opacity: 0, x: -500, y: 150 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ease: 'anticipate', duration: 0.5, delay: 0.5 }}
        >
          <Textfit
            id="logo-limes"
            mode="single"
            max={1000}
            className="font-pirata w-[min(66vw,66vh)] mx-auto leading-none uppercase text-primary-500"
            style={{ height: '1em' }}
          >
            Limes
          </Textfit>
        </motion.div>
        <motion.div
          key={`road-${rerenderKey}`}
          initial={{ opacity: 0, x: 500, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ease: 'anticipate', duration: 0.5, delay: 0.75 }}
        >
          <Textfit
            id="logo-road"
            mode="single"
            max={1000}
            className="font-pirata w-[min(66dvw,66dvh)] mx-auto leading-none -translate-y-[0.2em] uppercase text-black dark:text-white"
            style={{ height: '1em' }}
          >
            Road
          </Textfit>
        </motion.div>
        <motion.div key={`design-${rerenderKey}`}>
          <Textfit
            id="logo-design"
            mode="single"
            max={1000}
            className="font-kumar w-[min(60dvw,60dvh)] mx-auto leading-none -translate-y-[1.25em] mb-4 uppercase text-neutral-500"
            style={{ height: '1em' }}
          >
            {'Design'.split('').map((char, i, arr) => (
              <motion.span
                key={i}
                className={i !== arr.length - 1 ? 'tracking-[0.66em]' : ''}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.05, type: 'spring', stiffness: 150, damping: 10 }}
              >
                {char}
              </motion.span>
            ))}
          </Textfit>
        </motion.div>
        <AnimatePresence>
          {showScrollTip && (
            <motion.div
              id="scroll-tip"
              className={twClassMerge(
                'absolute left-1/2 transform -translate-x-1/2',
                'bottom-8 sm:bottom-4',
                'pb-[env(safe-area-inset-bottom)]'
              )}
              style={{
                // fallback for browsers that don't support env()
                paddingBottom: 'env(safe-area-inset-bottom, 0px)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-2 flex-col sm:flex-row">
                <span className="text-white mx-auto lowercase">Scroll</span>
                <div className="flex flex-col items-center sm:translate-y-[0.3em]">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', damping: 20 }}
                  >
                    <HiOutlineChevronDoubleDown />
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
