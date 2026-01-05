import React from 'react'

const Video = () => {
  return (
      <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Watch Our Restaurant Video</h2>
          <div className="relative w-full h-64">
              <iframe
                  className="rounded-lg shadow-lg w-full h-full"
                  src="https://www.youtube.com/embed/bgfdqVmVjfk"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
              ></iframe>
          </div>
      </div>

  )
}

export default Video
