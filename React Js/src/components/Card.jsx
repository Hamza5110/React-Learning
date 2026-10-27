import React from 'react'

export default function Card({ title, body }) {
  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-200'>
        <h2 className='text-xl font-semibold text-gray-800 mb-3'>{title}</h2>
        <p className='text-gray-600 mb-5'>{body}</p>
        <button className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition'>Read More &rarr;</button>
    </div>
  )
}
