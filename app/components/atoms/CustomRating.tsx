import { MdOutlineStarPurple500 } from "react-icons/md";

interface CustomRatingProps {
  value: number;
  readonly?: boolean;
  className?: string;
}

const CustomRating = ({ value, readonly = false, className = "" }: CustomRatingProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars.map((star) => (
        <MdOutlineStarPurple500
          key={star}
          className={`text-lg ${
            star <= value ? "text-starColor" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default CustomRating;
