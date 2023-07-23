export default function getTimeAgo(createdAt: string): string{
    const currentDate = new Date()
    const inputDate = new Date(createdAt)

    const diffInSecs = Math.floor((currentDate.getTime() - inputDate.getTime()) /  1000)

    if(diffInSecs < 60){
        return `${diffInSecs}s ago`
    }else if(diffInSecs < 3600){
        const min =  Math.floor(diffInSecs / 60)
        return `${min}min ago`
    }else if(diffInSecs < 86400){
        const h = Math.floor(diffInSecs / 3600)
        return `${h}h ago`
    }else if(diffInSecs < 31556926){
        const d = Math.floor(diffInSecs / 86400)
        return `${d}d ago`
    }else{
        const y = Math.floor(diffInSecs / 31556926)
        return `${y}y ago`
    }
}