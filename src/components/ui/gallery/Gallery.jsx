import React, { useState } from "react";

export const Gallery = ({ listOfImages, numOfImages, sizeOfImages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Open modal function
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {/* Image Gallery */}
      <div className="flex gap-2 flex-wrap justify-center">
        {listOfImages?.slice(0, numOfImages).map((image, index) => {
          if (index === numOfImages - 1 && listOfImages[index + 1]) {
            return (
              <div
                key={image._id}
                className={`relative rounded-lg overflow-hidden cursor-pointer`}
                onClick={openModal}
                style={{
                  width: sizeOfImages,
                  height: sizeOfImages,
                }}
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center text-white font-bold">
                  +{listOfImages.length - index - 1}
                </div>
              </div>
            );
          }
          return (
            <div
              key={image._id}
              className={`relative rounded-lg overflow-hidden`}
              style={{
                width: sizeOfImages,
                height: sizeOfImages,
              }}
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking on the backdrop
        >
          <div
            className="bg-white rounded-lg p-5 w-4/5 max-h-[80%] overflow-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the backdrop
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="grid gap-4 place-items-center" style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(${sizeOfImages}, auto))`
                  }}>
              {listOfImages?.slice(numOfImages).map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt=""
                  className={`object-cover rounded-lg`}
                  style={{
                  width: sizeOfImages,
                  height: sizeOfImages,
                }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
