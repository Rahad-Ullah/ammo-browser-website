import avatar from "~/assets/avatar.png";
import CustomRating from "~/components/atoms/CustomRating";

interface User {
  name?: string;
  image?: string;
  updated_at?: string;
}

interface ReviewItem {
  user?: User;
  rating?: number;
  review?: string;
}

interface ReviewCustomerProps {
  item: ReviewItem;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}

const ReviewCustomer = ({ item }: ReviewCustomerProps) => {
  return (
    <div className="pb-4 border-b-[1.5px] border-borderColor">
      <div className="flex justify-between items-start pb-4 xl:pb-7">
        <div className="flex gap-2">
          <div className="xl:w-[76px] lg:w-14 lg:h-14 w-10 h-10 xl:h-[76px] rounded-full overflow-hidden">
            <img
              src={item?.user?.image ? item?.user?.image : avatar}
              alt="customer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 xl:gap-2">
            <h5 className="font-medium text-base xl:text-3xl font-Urbanist text-primaryWhite">
              {item?.user?.name ? item?.user?.name : "Unknown"}
            </h5>
            {item?.rating ? (
              <CustomRating
                value={item?.rating}
                readonly
                className="reviewCustomerStar"
              />
            ) : (
              <p className="text-secondaryColor text-xs font-normal">
                not rating yet
              </p>
            )}
          </div>
        </div>
        <div>
          <span className="font-Urbanist text-xs xl:text-lg font-normal text-primaryWhite opacity-65">
            {item?.user?.updated_at ? timeAgo(item?.user?.updated_at) : "N/A"}
          </span>
        </div>
      </div>
      <p className="font-Poppins text-sm xl:text-xl font-normal text-gravelFint">
        {item?.review}
      </p>
    </div>
  );
};

export default ReviewCustomer;
