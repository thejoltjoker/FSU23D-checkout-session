const HomeHeroSection = () => {
  return (
    <section>
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            Explore Exotic Greenery: Welcome to Cactify
          </h1>
          <p className="mb-6 max-w-2xl font-light text-dawn-500 dark:text-dawn-400 md:text-lg lg:mb-8 lg:text-xl">
            Step into a world of rare cacti and exotic plants. Find your perfect
            green companion today.
          </p>
          <a
            href="#"
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4"
          >
            Get started
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-dawn-300 px-5 py-3 text-center text-base font-medium text-dawn-900 hover:bg-dawn-100 focus:ring-4 focus:ring-dawn-100 dark:border-dawn-700 dark:text-white dark:hover:bg-dawn-700 dark:focus:ring-dawn-800"
          >
            Speak to Sales
          </a>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img src="/img/hero-cactus.png" alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
