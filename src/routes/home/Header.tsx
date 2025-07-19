/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { RiInstagramLine, RiFacebookFill, RiTiktokFill, RiMailLine } from 'react-icons/ri'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <div
      id="header"
      className={twClassMerge(
        className,
        'w-full max-w-lg mx-auto p-4 pt-8 flex flex-row items-center justify-between'
      )}
      {...props}
    >
      <a
        className="h-8 w-auto text-neutral-500 hover:text-primary-500 transition-colors"
        href="https://instagram.com/limesroad.design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiInstagramLine className="size-full" />
      </a>
      <a
        className="h-8 w-auto text-neutral-500 hover:text-primary-500 transition-colors"
        href="https://facebook.com/limesroad.design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiFacebookFill className="size-full" />
      </a>
      <img src="/lrd-logo-placeholder.png" alt="Logo" id="site-logo" className="h-16 w-auto" />
      <a
        className="h-8 w-auto text-neutral-500 hover:text-primary-500 transition-colors"
        href="https://tiktok.com/@limesroad.design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiTiktokFill className="size-full" />
      </a>
      <a
        className="h-8 w-auto text-neutral-500 hover:text-primary-500 transition-colors"
        href="mailto:dan@limesroad.design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiMailLine className="size-full" />
      </a>
    </div>
  )
}
