import React from 'react'

type Props = {
    children:string 
    size?:string
}

export const Typoghraphy:React.FC<Props> = ({
    children,
    size = 'text-xl'
}) => {
  return (
    <p className={`${size}`}>{children}</p>
  )
}

