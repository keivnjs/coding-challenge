export function Piece({
  id,
  className,
  image,
}: {
  id: string;
  className?: string;
  image?: string;
}) {
  if (!image) return null;

  return (
    <img
      src={image}
      alt=""
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
