/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC, useEffect, useState } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Textfit } from '@ataverascrespo/react18-ts-textfit'
import { motion } from 'motion/react'

interface LandingProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const Landing: FC<LandingProps> = ({ className, ...props }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [rerenderKey, setRerenderKey] = useState(0)
  const [hasRerendered, setHasRerendered] = useState(false)

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
        <motion.div key={`limes-${rerenderKey}`}>
          <Textfit
            id="logo-limes"
            mode="single"
            max={1000}
            className="font-pirata w-[66vh] mx-auto leading-none uppercase text-primary-500"
            style={{ height: '1em' }}
          >
            Limes
          </Textfit>
        </motion.div>
        <motion.div key={`road-${rerenderKey}`}>
          <Textfit
            id="logo-road"
            mode="single"
            max={1000}
            className="font-pirata w-[66vh] mx-auto leading-none -translate-y-[0.2em] uppercase text-black dark:text-white"
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
            className="font-kumar w-[60vh] mx-auto leading-none uppercase text-neutral-500"
            style={{ height: '1em' }}
          >
            {'Design'.split('').map((char, i, arr) => (
              <motion.span key={i} className={i !== arr.length - 1 ? 'tracking-[0.66em]' : ''}>
                {char}
              </motion.span>
            ))}
          </Textfit>
        </motion.div>
      </div>
    </div>
  )
}
