import React from 'react'

export const Card = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}