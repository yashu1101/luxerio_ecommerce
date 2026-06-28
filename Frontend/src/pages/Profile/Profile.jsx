import { useEffect } from "react";
import "./Profile.css";
import { useUser } from "../../hooks/useUser";
import { DateFormator } from "../../utility/DateFormator";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export const Profile = () => {
  const { data: user, isLoading } = useUser();

  const navigate = useNavigate();
  // Redirect to login page if user not logged In.

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const name = user?.username || "N/A";
  const email = user?.email || "N/A";
  const createdAt = DateFormator(user?.createdAt);
  const avtar = user?.username.split("")[0].toUpperCase();

  if (isLoading) return <Loader height={"100vh"}></Loader>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">{avtar}</div>

        <h2 className="profile-name">{name}</h2>

        <p className="profile-email">{email}</p>

        <div className="profile-info">
          <div className="profile-info-row">
            <span className="profile-label">Member Since</span>

            <span className="profile-value">{createdAt}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-btn change-password-btn">
            Change Password
          </button>

          <button className="profile-btn delete-account-btn">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
