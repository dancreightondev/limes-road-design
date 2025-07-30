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
      <div className="text-center p-8 text-sm text-neutral-500 flex flex-col items-center">
        <span id="notice">No data is collected on this site</span>
        <span id="source-code">
          Source code available on{' '}
          <a
            href="https://github.com/dancreightondev/limes-road-design"
            className="text-neutral-400 hover:text-primary-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </span>
        <span id="copyright" className="mt-2">
          Copyright &copy; {new Date().getFullYear()} Limes Road Design and its licensors. All
          rights reserved.
        </span>
      </div>
    </div>
  )
}
