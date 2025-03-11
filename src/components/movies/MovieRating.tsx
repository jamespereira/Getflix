type Props = {
  icon: string;
  rating: string;
};

function MovieRating({ icon, rating }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <img
        src={icon}
        className="min-h-8 h-8 min-w-8 w-8"
        alt="rotten tomatoes logo"
      />
      <p className="font-bold">{rating}</p>
    </div>
  );
}

export default MovieRating;
