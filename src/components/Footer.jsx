import React from 'react'

function Footer() {
  return (
    <footer className='py-2 mt-2 bg-gray-100'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        <p className='text-sm'>&copy; {new Date().getFullYear()} BlogVerse. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer