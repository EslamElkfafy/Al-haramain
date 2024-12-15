import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

export const VideoPlayer = ({videoUrl}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  // Handle Play/Pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Update progress on video playback
  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  // Handle change in the progress bar
  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    const seekTo = (newProgress / 100) * duration; // Calculate time to seek
    playerRef.current.seekTo(seekTo); // Seek to the new time
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  // Set the video's duration
  const handleDuration = (duration) => {
    setDuration(duration);
  };

  return (
    <div className="relative max-w-3xl mx-auto bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        volume={volume}
        controls={false} // Disable default controls
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100%"
        height="36.875rem"
      />
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-black bg-opacity-50 rounded-b-lg">
        {/* Play/Pause Button */}
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none"
          onClick={handlePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 mx-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
