import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResult from "./NoResult";
import { IUser } from "../type";

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComments[];
  isPostingComment: boolean;
}

interface IComments {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _id?: string;
    _ref?: string;
  };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <>
                          <div className="flex gap-2 items-start">
                            <div className="w-8 h-8">
                              <Image
                                src={user.image}
                                width={28}
                                height={28}
                                className="rounded-full"
                                alt="User Profile"
                                layout="responsive"
                              />
                            </div>

                            <div className="hidden xl:block">
                              <p className="flex gap-1 items-center text-sm font-bold text-primary lowercase">
                                {user.userName.replaceAll(" ", "")}
                                <GoVerified className="text-blue-400" />
                              </p>
                            </div>
                          </div>
                        </>
                      </Link>
                      <p className="ml-9">{item.comment}</p>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <div>
            <NoResult text="No Comments yet" />
          </div>
        )}
      </div>

      {/* Form */}
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment"
              className="px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none 
              focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting" : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
