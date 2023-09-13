interface CardProps {
  children: React.ReactElement;
}

function Card({ children }: CardProps) {
  return (
    <div className="rounded-lg bg-stone-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      {children}
    </div>
  );
}

export default Card;
