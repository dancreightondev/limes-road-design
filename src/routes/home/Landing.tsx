/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC, useEffect, useState } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Textfit } from '@ataverascrespo/react18-ts-textfit'
import { motion, AnimatePresence } from 'motion/react'
import { RiArrowDownWideFill } from 'react-icons/ri'

interface LandingProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const Landing: FC<LandingProps> = ({ className, ...props }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [rerenderKey, setRerenderKey] = useState(0)
  const [hasRerendered, setHasRerendered] = useState(false)
  const [showScrollTip, setShowScrollTip] = useState(false)

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
    return () => clearTimeout(tipTimeout)
  }, [])

  if (!fontsLoaded) return null

  return (
    <div id="landing" className={twClassMerge(className, 'size-full')} {...props}>
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
            className="font-pirata w-[min(66vw,66vh)] mx-auto leading-none -translate-y-[0.2em] uppercase text-black dark:text-white"
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
            className="font-kumar w-[min(60vw,60vh)] mx-auto leading-none -translate-y-[1.25em] uppercase text-neutral-500"
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
                // Responsive bottom offset: 8vh on all, 4vw on landscape (md and up)
                'absolute left-1/2 transform -translate-x-1/2',
                'bottom-[8vh] md:bottom-[2vw]'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-2 flex-col md:flex-row">
                <span className="text-white mx-auto lowercase">Scroll</span>
                <div className="flex flex-col items-center md:translate-y-[0.55em]">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', damping: 20 }}
                  >
                    <RiArrowDownWideFill />
                  </motion.span>
                  <motion.span
                    animate={{ y: [-22, -27, -22] }}
                    transition={{
                      delay: 0.05,
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                      damping: 20
                    }}
                  >
                    <RiArrowDownWideFill />
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
