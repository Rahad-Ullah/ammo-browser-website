interface KeyFeatures {
  bullet_type?: string;
  muzzle_velocity?: string;
  muzzle_energy?: string;
  use_case?: string;
  compatibility?: string;
}

interface DescriptionProps {
  item?: KeyFeatures;
  openDescription: boolean;
}

const Description = ({ item, openDescription }: DescriptionProps) => {
  const data = [
    {
      label: "Bullet Type",
      value: item?.bullet_type || "N/A",
    },
    {
      label: "Velocity",
      value: item?.muzzle_velocity || "N/A",
    },
    {
      label: "Energy",
      value: item?.muzzle_energy || "N/A",
    },
    {
      label: "Applications",
      value: item?.use_case || "N/A",
    },
    {
      label: "Compatibility",
      value: item?.compatibility || "N/A",
    },
  ];

  return (
    <div
      className={`bg-secondaryBg p-6 xl:p-14 ${
        openDescription
          ? "opacity-100 translate-x-0 pointer-events-auto duration-500 transform transition-all"
          : "opacity-0 -translate-x-5 pointer-events-none absolute"
      }`}
    >
      <h5 className="font-medium text-lg xl:text-2xl text-primaryWhite pb-5 capitalize">
        Caliber Overview
      </h5>
      <table>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 pr-0 xl:pr-7 font-normal text-sm xl:text-xl text-primaryWhite">
                {item.label}
              </td>
              <td className="py-2 pl-3 xl:px-4 flex items-center text-sm xl:text-xl text-secondaryColor font-normal">
                <span className="hidden md:block md:pr-5">:</span>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Description;
