import React, { ForwardedRef } from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

function LogoIcon(props: SvgIconProps, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <svg
      width="188"
      height="217"
      viewBox="0 0 188 217"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_3017_1529)">
        <path
          d="M94.053 0L0 54.25V162.75L94.053 217L188 162.75V54.25L94.053 0ZM33.9312 108.5V80.4214L106.035 38.5684V66.647L33.9312 108.5L62.8787 96.9507L106.035 121.639L81.859 135.943L33.9312 108.5ZM154.599 135.943L82.4952 177.796V149.611L154.599 107.864L125.651 119.414L82.4952 94.7256L106.671 80.4214L154.599 107.864V135.943Z"
          fill="#1C1B22"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_3017_1529"
          x="0"
          y="0"
          width="189"
          height="218"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_3017_1529" />
        </filter>
      </defs>
    </svg>
  )
}

export default React.forwardRef(LogoIcon)
