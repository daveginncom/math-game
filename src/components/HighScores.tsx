import { getHighScores, formatScoreKey } from "../utils/highScores";
import "./HighScores.css";

interface HighScoresProps {
  onClose: () => void;
}

export default function HighScores({ onClose }: HighScoresProps) {
  const scores = getHighScores();
  const scoreEntries = Object.entries(scores).sort(
    (a, b) => b[1].score - a[1].score
  );

  return (
    <div className="high-scores-modal">
      <div className="high-scores-content">
        <h2>🏆 High Scores 🏆</h2>
        {scoreEntries.length === 0 ? (
          <p className="no-scores">
            No high scores yet. Play a game to set one!
          </p>
        ) : (
          <div className="scores-list">
            {scoreEntries.map(([key, data]) => (
              <div key={key} className="score-entry">
                <div className="score-category">{formatScoreKey(key)}</div>
                <div className="score-details">
                  <span className="score-value">{data.score} pts</span>
                  <span className="score-date">
                    {new Date(data.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
