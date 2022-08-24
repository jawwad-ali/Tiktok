import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResults from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../type";
import Head from "next/head";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers } = useAuthStore();

  const router = useRouter();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  //   fetching it from URL
  const { searchTerm }: any = router.query;

  //   Search Accounts from the Search bar
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {/* Accounts related to search value */}
      {isAccounts ? (
        <>
          <Head>
            <title>Accounts</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div className="md:mt-16">
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser) => (
                <Link key={user._id} href={`/profile/${user._id}`}>
                  <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                    <div>
                      <Image
                        className="rounded-full"
                        src={user.image}
                        alt={user.userName}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p className="flex capitalize items-center gap-3 font-bold text-lg">
                        {user.userName} <GoVerified className="text-blue-400" />{" "}
                      </p>
                      <p className="text-xs text-gray-400 capitalize font-bold">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResults text={`No Results related to ${searchTerm}`} />
            )}
          </div>
        </>
      ) : (
        // Videos related to search bar
        <>
          <Head>
            <title>Videos</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {videos.length ? (
              videos.map((video: Video, idx) => (
                <VideoCard post={video} key={idx} />
              ))
            ) : (
              <NoResults text={`No Results for ${searchTerm}`} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
