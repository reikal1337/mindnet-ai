type Post =  {
    id: string
    content: string
    _count: {
        likes: number
    }
    createdAt: string
    user: {
        username: string
    }
}