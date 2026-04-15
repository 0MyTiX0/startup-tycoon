export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          padding: 20px;
          text-align: center;
          border-top: 1px solid #ccc;
          margin-top: 40px;
        }
      `}</style>
      <footer className="footer">
        <p>© {new Date().getFullYear()} startup-tycoon.</p>
      </footer>
    </>
  );
}
