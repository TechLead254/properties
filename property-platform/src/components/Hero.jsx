import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMHByb3BlcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60')] bg-center bg-cover opacity-30"></div>
      <div className="relative pt-20 pb-32 sm:pt-28 sm:pb-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Find Your Perfect Home in Kenya
          </h1>
          <p className="mt-6 text-xl text-gray-500 sm:text-2xl">
            Browse thousands of verified properties across Kenya's top neighborhoods
          </p>
          <div className="mt-10 flex items-center space-x-6 sm:space-x-8">
            <Link to="/listings" className="flex-1 flex justify-center py-4 px-6 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Browse Properties
            </Link>
            <Link to="/about" className="flex-1 flex justify-center py-4 px-6 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;