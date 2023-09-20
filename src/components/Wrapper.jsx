import React from 'react'

export default function Wrapper({ className, children }) {
    return (
        <div className={`w-full px-[20px] md:px-[30px] max-w-[800px] mx-auto ${className || ""}`}>{children}</div>
    )
}
