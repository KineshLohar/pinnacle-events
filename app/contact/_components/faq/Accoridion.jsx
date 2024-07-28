'use client'

import { useState } from "react"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"

export default function Accordion({data}) {

    const [isAccordionOpen, setIsAccordionOpen] = useState(false)
    const [animationParent] = useAutoAnimate()

    const toggleAccordion = () => {
        setIsAccordionOpen(prev => !prev)
    }

    return (
        <div
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration="500"
        ref={animationParent} className="w-11/12 lg:w-10/12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col p-8 rounded-lg transition-all duration-300">
            <p className="flex justify-between items-center cursor-pointer font-bold" onClick={toggleAccordion}>
                <span>{data.question}</span>
                {
                    isAccordionOpen ? 
                    <FontAwesomeIcon icon={faCaretUp} size='xl' />
                    :
                    <FontAwesomeIcon icon={faCaretDown} size='xl' />
                }
                
            </p>
            {
                isAccordionOpen && 
                <p className='mt-2 text-base text-gray-500'>
                    {data.answer}
                </p>
            }
        </div>
    )
}