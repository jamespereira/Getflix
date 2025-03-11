type Props = {
  icon: string;
  rating: string;
};

function MovieRating({ icon, rating }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={icon} className="h-full w-full" alt="rotten tomatoes logo" />
      <p className="font-bold">{rating}</p>
    </div>
  );
}

export default MovieRating;
