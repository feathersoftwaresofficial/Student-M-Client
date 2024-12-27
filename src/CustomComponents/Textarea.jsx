import React from 'react'

const Textarea = ({name,placeholder,value,onChange}) => {
  return (
      <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-2  rounded-[8px] bg-[#EEEEEE]  m-0 focus:outline-none  "
      />
  )
}

export default Textarea
