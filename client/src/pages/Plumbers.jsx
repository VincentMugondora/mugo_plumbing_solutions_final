import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const plumbers = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const { plumbers } = useContext(AppContext);
  const [filteredplumbers, setFilteredplumbers] = useState([]);

  useEffect(() => {
    if (city) {
      setFilteredplumbers(
        plumbers.filter(
          (plumber) => plumber.city.toLowerCase() === city.toLowerCase()
        )
      );
    } else {
      setFilteredplumbers(plumbers);
    }
  }, [city, plumbers]);

  return (
    <div className="container mx-auto px-4 mb-12">
      <p className="text-gray-600 text-center mt-4">
        Browse Through the plumbers available in your city.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-8">
        {/* City List */}
        <div className="flex flex-col gap-2 text-sm text-gray-600 self-start">
          {[
            "Harare",
            "Bulawayo",
            "Gweru",
            "Mutare",
            "Masvingo",
            "Chinhoyi",
          ].map((location) => (
            <p
              key={location}
              onClick={() =>
                city === location
                  ? navigate("/plumbers")
                  : navigate(`/plumbers/${location}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                city === location ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {location}
            </p>
          ))}
        </div>

        {/* plumber Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredplumbers.map((item) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500"
              key={item._id}
            >
              <img
                className="bg-blue-50 w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default plumbers;
