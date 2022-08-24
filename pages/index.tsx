import axios from "axios";
import VideoCard from "../components/VideoCard";
import NoResult from "../components/NoResult";
import { Video } from "../type";
import { BASE_URL } from "../utils";
import Head from "next/head";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <>
      <Head>
        <title>Tiktok</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResult text={"No Videos"} />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
