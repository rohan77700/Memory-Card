import Card from "./Card";

export default function CardGrid({ cards, flipped, matched, onCardClick }) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.uniqueId}
          card={card}
          flipped={flipped}
          matched={matched}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}