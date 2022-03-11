export default {
  path: '/movie',
  component: () => import('../../views/movie/index.vue'),

  // 电影界面的子界面
  children: [
    // 正在热映界面
    {
      path: 'nowPlaying',
      component: () => import('../../views/movie/nowPlaying.vue')
    },

    // 即将上映界面
    {
      path: 'comingSoon',
      component: () => import('../../views/movie/comingSoon.vue')
    },

    // 正在热映电影详情页面
    // 采用命名视图的方式
    {
      path: 'detail/1/:movieId',
      // 这里和一般的加载不一样，这里使用components
      components: {
        // 避免在详情页动画运行过程中，这个组件变空白
        default: () => import('../../views/movie/nowPlaying.vue'),
        // 这的detail(自己定义的)与<router-view>标签中的name时对应关系
        detail: () => import('../../views/movie/detail.vue')
      },
      // 允许其他组件通过prop的方式获取到movieId，
      props: {
        detail: true
      }
    },

    // 即将上映电影详情页面
    // 采用命名视图的方式
    {
      path: 'detail/2/:movieId',
      // 这里和一般的加载不一样，这里使用components
      components: {
        // 避免在详情页动画运行过程中，这个组件变空白
        default: () => import('../../views/movie/comingSoon.vue'),
        // 这的detail(自己定义的)与<router-view>标签中的name时对应关系
        detail: () => import('../../views/movie/detail.vue')
      },
      // 允许其他组件通过prop的方式获取到movieId，
      props: {
        detail: true
      }
    },

    // 在初始界面时movie界面内的电影列表时正在热映的电影
    {
      path: '/movie',
      redirect: '/movie/nowPlaying'
    }
  ]
}
