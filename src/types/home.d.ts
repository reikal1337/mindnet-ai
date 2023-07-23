type Post =  {
    id: string,
    content: string,
    createdAt: string,
    username: string,
    likeCount: string,
    dislikeCount: string,
    likedByUser: string,
    dislikedByUser: string,
}

type PostAuth = Post & {
    loggedIn: boolean
}
