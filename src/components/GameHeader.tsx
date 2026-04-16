export default function GameHeader() {
  return (
    <>
      <style>{`
        .game-header {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          padding: 22px 24px;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #334155 100%);
          color: white;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
        }

        .game-header::after {
          content: "";
          position: absolute;
          inset: auto -40px -50px auto;
          width: 180px;
          height: 180px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.18);
          filter: blur(6px);
        }

        .game-header-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 760px;
        }

        .game-header h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.03em;
        }

        .game-header p {
          margin: 0;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.5;
        }

        .game-header-badge {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.92);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `}</style>
      <div className="game-header">
        <div className="game-header-content">
          <div className="game-header-badge">Store global actif</div>
          <h1>Startup Tycoon</h1>
          <p>
            Développez votre startup, achetez des upgrades et faites grandir
            votre empire, clic après clic.
          </p>
        </div>
      </div>
    </>
  );
}
