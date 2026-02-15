import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "30px 20px" }}>
        {children}
      </div>
    </>
  );
}
