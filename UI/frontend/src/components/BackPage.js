import React from 'react'
import {BiArrowBack} from "react-icons/bi";

const BackPage = ({func}) => {
  return (
    <div className='back-page'>
        <BiArrowBack className='cursor-pointer' size={24} onClick={() => func()} />
    </div>
  )
}

export default BackPage