export default function Footer() {
  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #ccc",
        marginTop: "40px",
      }}
    >
      <p>© {new Date().getFullYear()} startup-tycoon.</p>
    </footer>
  );
}
