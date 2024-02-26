import Link from "next/link";
import { Button } from "@mui/material";

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to our website</h1>
      <div>
        <Link href="/login" passHref>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Login
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
