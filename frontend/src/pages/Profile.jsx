import useUserStore from "../store/UserStore";

const Profile = () => {
  const { user, userPosts } = useUserStore();

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Profile</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src={user.profilePic || "data:image/svg+xml,%3csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='150' height='150' fill='%23dee2e6'/%3e%3ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%236c757d'%3eProfile%3c/text%3e%3c/svg%3e"}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Name:</label>
                    <p className="form-control-plaintext">{user.name}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email:</label>
                    <p className="form-control-plaintext">{user.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Posts Created:</label>
                    <p className="form-control-plaintext">
                      {userPosts ? userPosts.length : user.postsCreated ? user.postsCreated.length : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;