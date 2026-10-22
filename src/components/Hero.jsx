import React from 'react'

export default function Hero() {
  return (
    <section className='py-16 bg-gray-100'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold mx-auto'>
                Welcome to <span className='text-blue-500'>BlogVerse</span>
            </h1>
            <br />
            <p className='text-gray-700 mb-6'>
                Explore blogs on technology, programming, lifestyle, business and many more topics, learn something new every day.
            </p>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 roounded-md transition'>
                Explore Blogs
            </button>
        </div>
    </section>
  )
}
