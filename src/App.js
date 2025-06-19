import { useEffect, useState, useCallback } from "react";
import Card from "./components/Card";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=9";

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchCards = useCallback(async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    const pokemon = data.results;

    const cardData = await Promise.all(
      pokemon.map(async (poke) => {
        const res = await fetch(poke.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
        };
      })
    );

    const duplicated = [...cardData, ...cardData].map((card, index) => ({
      ...card,
      uniqueId: index + "-" + card.id,
    }));

    const shuffled = duplicated.sort(() => 0.5 - Math.random());
    setCards(shuffled);
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  function handleCardClick(card) {
    if (
      flipped.length === 2 ||
      flipped.some((c) => c.uniqueId === card.uniqueId) ||
      matched.includes(card.id)
    )
      return;

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (first.id === second.id) {
        setMatched([...matched, first.id]);
        setScore(score + 1);
        setBestScore((prev) => Math.max(prev, score + 1));
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }

  function restartGame() {
    setScore(0);
    setMatched([]);
    setFlipped([]);
    fetchCards();
  }

  const allMatched = matched.length === cards.length / 2;

  return (
    <div className="App">
      <div className="scoreboard">
        <h1>Pokémon Memory Card</h1>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
        <button onClick={restartGame}>Restart</button>
      </div>
      {allMatched && <h2 className="game-message">🎉 You Win!</h2>}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.uniqueId}
            card={card}
            flipped={flipped}
            matched={matched}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;