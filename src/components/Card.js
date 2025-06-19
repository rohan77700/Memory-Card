export default function Card({ card, flipped, matched, onClick }) {
  const isFlipped = flipped.some(c => c.uniqueId === card.uniqueId) || matched.includes(card.id);

  return (
    <div className="card" onClick={() => onClick(card)}>
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <img src={card.image} alt={card.name} />
        </div>
        <div className="card-back" />
      </div>
    </div>
  );
}