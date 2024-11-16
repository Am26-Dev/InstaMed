const ArticleBanner = () => {
  return (
    <div className="flex justify-center items-center py-8 mt-8">
      <div className="w-full lg:w-8/12 lg:mx-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-2">
            <span className="block text-lg text-gray-500">
              Read Professional Articles
            </span>
            Latest <em className="text-blue-600">Articles</em>
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto">
            Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete
            eiusmod tempor incididunt ut labore etnalom dolore magna aliqua
            udiminimate veniam quis norud.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* First Article */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <figure className="relative">
              <img
                className="w-full h-56 object-cover"
                src="https://amentotech.com/projects/doctreat/wp-content/uploads/2019/09/012-545x389.jpg"
                alt="Alcohol may be less harmful for people over 50"
              />
              <figcaption className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://amentotech.com/projects/doctreat/wp-content/uploads/2019/11/11-30x30.jpg"
                  alt="Ralph Davis"
                />
                <span>Ralph Davis</span>
              </figcaption>
            </figure>
            <div className="p-4">
              <div className="mb-2">
                <a
                  href="https://amentotech.com/projects/doctreat/category/diagnostic-radiology/"
                  className="text-sm text-blue-600"
                >
                  Diagnostic radiology
                </a>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <a
                  href="https://amentotech.com/projects/doctreat/alcohol-may-be-less-harmful-for-people-over-50/"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Alcohol may be less harmful for people over 50
                </a>
              </h3>
              <span className="text-gray-500 text-sm flex items-center mb-4">
                <i className="lnr lnr-clock mr-2"></i>September 13, 2019
              </span>
            </div>
          </div>

          {/* Second Article */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <figure className="relative">
              <img
                className="w-full h-56 object-cover"
                src="https://amentotech.com/projects/doctreat/wp-content/uploads/2019/09/Untitled-1_0007_Layer-1-545x389.jpg"
                alt="Study reveals fiber we should eat to prevent disease"
              />
              <figcaption className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://amentotech.com/projects/doctreat/wp-content/uploads/2019/11/04-30x30.jpg"
                  alt="Harriso Robinson"
                />
                <span>Harriso Robinson</span>
              </figcaption>
            </figure>
            <div className="p-4">
              <div className="mb-2">
                <a
                  href="https://amentotech.com/projects/doctreat/category/dermatology/"
                  className="text-sm text-blue-600"
                >
                  Dermatology
                </a>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <a
                  href="https://amentotech.com/projects/doctreat/study-reveals-how-much-fiber-we-should-eat-to-prevent-disease/"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Study reveals fiber we should eat to prevent disease
                </a>
              </h3>
              <span className="text-gray-500 text-sm flex items-center mb-4">
                <i className="lnr lnr-clock mr-2"></i>September 13, 2019
              </span>
            </div>
          </div>
          {/* third article */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <figure className="relative">
              <img
                className="w-full h-56 object-cover"
                src="https://amentotech.com/projects/doctreat/wp-content/uploads/2019/09/Untitled-1_0007_Layer-1-545x389.jpg"
                alt="Study reveals fiber we should eat to prevent disease"
              />
              <figcaption className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://amentotech.com/projects/doctreat/wp-content/uploads/2019/11/04-30x30.jpg"
                  alt="Harriso Robinson"
                />
                <span>Harriso Robinson</span>
              </figcaption>
            </figure>
            <div className="p-4">
              <div className="mb-2">
                <a
                  href="https://amentotech.com/projects/doctreat/category/dermatology/"
                  className="text-sm text-blue-600"
                >
                  Dermatology
                </a>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <a
                  href="https://amentotech.com/projects/doctreat/study-reveals-how-much-fiber-we-should-eat-to-prevent-disease/"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Study reveals fiber we should eat to prevent disease
                </a>
              </h3>
              <span className="text-gray-500 text-sm flex items-center mb-4">
                <i className="lnr lnr-clock mr-2"></i>September 13, 2019
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleBanner;
