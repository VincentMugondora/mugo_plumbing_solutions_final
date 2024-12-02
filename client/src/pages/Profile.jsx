import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-2xl font-bold">User Profile</h2>
      {userInfo && (
        <div className="mt-4">
          <p>
            <strong>First Name:</strong> {userInfo.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userInfo.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {userInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {userInfo.address}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
