import "./App.css";
import MainMenu from "./components/MainMenu";
import GameCanvas from "./components/GameCanvas";
import { useGameEngine } from "./hooks/useGameEngine";

function App() {
  const { state, startGame, movePlayer, shoot, returnToMenu, constants } =
    useGameEngine();

  return (
    <div className="app">
      {state.status === "menu" ? (
        <MainMenu onStartGame={startGame} />
      ) : (
        <GameCanvas
          state={state}
          onPlayerMove={movePlayer}
          onShoot={shoot}
          onReturnToMenu={returnToMenu}
          constants={constants}
        />
      )}
    </div>
  );
}

export default App;
