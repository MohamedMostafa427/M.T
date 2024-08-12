import React from 'react'

export const Loading = () => (
    <div className="absolute top-[46%]">
        <svg
            class="spinner"
            width="50px"
            height="50px"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="5"
            />
        </svg>
    </div>
)
