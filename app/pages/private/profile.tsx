import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "~/hooks/providers/AuthProvider";
import Button from "~/components/atoms/Button";
import avatar from "~/assets/user.png";
import { PriceAlertList, ProfileDetails } from "~/components/organisms/profile";

export default function Profile() {
  const { profileData, user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await profileData();
      return response?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container pb-10 text-center pt-32 lg:pt-56 pb-20 lg:pb-32 relative">
        <p className="text-secondaryColor">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <ProfileDetails />
      <PriceAlertList />
    </>
  );
}
