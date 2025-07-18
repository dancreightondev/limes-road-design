/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { Textfit } from '@ataverascrespo/react18-ts-textfit'

interface LandingProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const Landing: FC<LandingProps> = ({ className, ...props }) => {
  return (
    <div id="landing" className={twClassMerge(className, 'size-full')} {...props}>
      <span className="sr-only">Limes Road Design</span>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
        <Textfit
          id="logo-limes"
          mode="single"
          max={1000}
          className="font-pirata w-[66vh] mx-auto leading-none uppercase text-primary-500"
          style={{ height: '1em' }}
        >
          Limes
        </Textfit>
        <Textfit
          id="logo-road"
          mode="single"
          max={1000}
          className="font-pirata w-[66vh] mx-auto leading-none -translate-y-[0.2em] uppercase text-black dark:text-white"
          style={{ height: '1em' }}
        >
          Road
        </Textfit>
        <Textfit
          id="logo-design"
          mode="single"
          max={1000}
          className="font-kumar w-[60vh] mx-auto leading-none uppercase text-neutral-500"
          style={{ height: '1em' }}
        >
          {'Design'.split('').map((char, i, arr) => (
            <span key={i} className={i !== arr.length - 1 ? 'tracking-[0.66em]' : ''}>
              {char}
            </span>
          ))}
        </Textfit>
      </div>
    </div>
  )
}
