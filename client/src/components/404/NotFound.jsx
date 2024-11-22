import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#000000] flex flex-col items-center text-gray-300"
      style={{
        // backgroundImage: 'url("/404/404.pn")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <main className="flex flex-col items-center text-center mt-16">
        <h1 className="text-gray-600 text-[25rem] poppins-regular">404</h1>
      </main>

      {/* Promo Section */}
      <section className="-mt-[30vh] bg-black/30 backdrop-blur-md p-8 rounded-lg text-center max-w-lg w-full shadow-lg shadow-white">
        <p className="text-2xl text-white">
          Discover reliable plumbing solutions with Mugo Plumbing.
        </p>
        <p className="text-gray-500 mt-2">
          Our expert team is here to handle all your plumbing needs, ensuring
          quality service and customer satisfaction.
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#526070] to-[#111316] text-white px-8 py-3 rounded-full"
          >
            Back to homepage
            <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
