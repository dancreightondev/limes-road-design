/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC, useState } from 'react'
import { motion } from 'motion/react'
import { twClassMerge } from '~/utils/tailwind'
import { Landing } from './home/Landing'
import { Header } from './home/Header'
import { Footer } from './home/Footer'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  const [showContent, setShowContent] = useState(false)

  // Called after fade is fully complete
  const handleLandingDone = () => {
    setTimeout(() => setShowContent(true), 10) // next tick, after fade
  }

  return (
    <div
      className={twClassMerge(
        className,
        'h-[100dvh] relative',
        showContent ? 'overflow-y-auto' : 'overflow-hidden'
      )}
      {...props}
    >
      {!showContent && <Landing onDone={handleLandingDone} />}
      {showContent && (
        <motion.section
          id="after-landing"
          className={twClassMerge('min-h-screen pointer-events-auto flex flex-col')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Header />
          <div
            id="site-content"
            className="flex flex-col items-center justify-center p-20 space-y-8 max-w-4xl mx-auto flex-1"
          >
            <div className="flex flex-col text-neutral-400 text-center">
              <span>want your site here?</span>
              <span>
                email{' '}
                <a
                  className="text-neutral-300 hover:text-primary-500"
                  href="mailto:dan@limesroad.design"
                >
                  dan@limesroad.design
                </a>
              </span>
            </div>
          </div>
          <Footer className="mt-auto" />
        </motion.section>
      )}
    </div>
  )
}
