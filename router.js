import { createRouter, createWebHistory } from 'vue-router'
import Article from '~/pages/article.vue'
import Home from '~/pages/home.vue'
import Index from '~/pages/index.vue'
import News from '~/pages/news.vue'
import News_content from '~/pages/news_content.vue'
import Podcast from '~/pages/podcast.vue'
import Video from '~/pages/video.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/news',
            name: 'News',
            component: News
        },
        {
            path: '/article',
            name: 'Article',
            component: Article
        },
        {
            path: '/podcast',
            name: 'Podcast',
            component: Podcast
        },
        {
            path: '/video',
            name: 'Video',
            component: Video
        },
        {
            path: '/news/:id',
            name: "News",
            component: News_content,
            // children: [
            //     {
            //       path: "/user/:username/info",
            //       name: "Info",
            //       component: UserInfo
            //     }
            // ]
        }],
})
