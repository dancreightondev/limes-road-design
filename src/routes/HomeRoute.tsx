/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC, useState } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Landing } from './home/Landing'

interface HomeRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const HomeRoute: FC<HomeRouteProps> = ({ className, ...props }) => {
  const [showNext, setShowNext] = useState(false)
  return (
    <div className={twClassMerge(className, 'min-h-screen relative')} {...props}>
      <Landing onDone={() => setShowNext(true)} />
      {/* scroll trap */}
      {!showNext && <div aria-hidden className="w-full" style={{ height: 8 }} />}
      <section
        id="after-landing"
        className={twClassMerge(
          'min-h-screen transition-opacity duration-700',
          showNext ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!showNext}
      >
        <div className="flex flex-col items-center justify-center p-20">
          <h2 className="text-4xl">Site content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </section>
    </div>
  )
}
