export interface Video {
    caption: string;
    _id: string;
    userId: string;
    video: {
        asset: {
            _id: string;
            url: string;
        };
    };
    postedBy: {
        _id: string;
        userName: string;
        image: string;
    };
    likes: {
        postedBy: {
            _id: string;
            userName: string;
            image: string;
        };
    }[];
    comments: {
        comment: string;
        _key: string;
        postedBy: {
            _ref: string;
        }
    }[];
}

export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
}