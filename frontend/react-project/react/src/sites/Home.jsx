export default function Home() {
  return (
  <article>
    <section    >
        <div className="relative min-h-screen flex items-center justify-center
       bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
       bg-gray-800 bg-no-repeat bg-cover bg-center bg-fixed text-white grayscale-25">



      {/* Centered Content */}
      <div className="relative z-20 bg-black/40 backdrop-blur-sm p-6 rounded-lg mx-auto max-w-screen-xl text-center">
        <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          The Best Book Store
        </h1>
        <p className="mb-10 text-lg lg:text-xl text-gray-300 sm:px-8 lg:px-48">
          We at BookStore believe that the world of books is too good to be forgotten.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="login/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition duration-300"
          >
            Log In
            <svg
              aria-hidden="true"
              className="ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="about/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-white text-white hover:text-gray-900 hover:bg-white focus:ring-4 focus:ring-gray-400 transition duration-300"
          >
            About Us
          </a>
        </div>
      </div>
      </div>
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-20 bg-black/40 backdrop-blur-sm p-6 rounded-lg mx-auto max-w-screen-xl text-center" >this is also a test</div>
      </div>
    </section>
    </article>
  );
}