/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from 'react'
import { twClassMerge } from '~/utils/tailwind'

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
}

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <div id="footer" className={twClassMerge(className)} {...props}>
      {/* Component content goes here */}
      <div className="text-center p-8 text-sm text-neutral-500 flex flex-col items-center space-y-2">
        <span id="copyright">
          &copy; {new Date().getFullYear()} Limes Road Design. All rights reserved.
        </span>
        <span id="privacy-notice">No data is collected on this site.</span>
      </div>
    </div>
  )
}
