import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();

  const logout = async () => {
    try {
      const obj = await fetch(
        "https://db-password-reset.herokuapp.com/logout",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      history.push("/", { replace: true });

      if (obj.status !== 200) {
        const error = new Error(obj.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="dashboard c-align">
      <h1>DASHBOARD</h1>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
