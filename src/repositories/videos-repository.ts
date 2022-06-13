import { videos } from './db'

export const videosRepository = {
   getVideos() {
      return videos
   },
   getVideoById(id: number) {
      const video = videos.find((video) => video.id === id)
      if (!video) throw new Error('Video not found')
      return video
   },
   deleteVideoById(id: number) {
      const video = videos.find((video) => video.id === id)
      if (!video) throw new Error('Video not found')
      videos.splice(videos.indexOf(video), 1)
      return video
   },
   updateVideoById(id: number, title: string) {
      const video = videos.find((video) => video.id === id)
      if (!video) throw new Error('Video not found')
      video.title = title
      return video
   },
   createVideo(ititle: string) {
      const newVideo = {
         id: new Date().getTime(),
         title: ititle,
         author: 'it-incubator.eu',
      }
      videos.push(newVideo)
      return newVideo
   },
}
