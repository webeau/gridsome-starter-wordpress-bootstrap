const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/style/*.scss'),
      ],
    })
}

module.exports = {
  siteName: 'webeau web design',
  siteDescription: 'web design for the modern, fluid internet',
  siteUrl: 'https//www.example.com',
  plugins: [
    {
      use: '~/src/plugins/wp-source/',
      options: {
        baseUrl: 'https://f02f63d7-fdbc-444f-873e-d8ded3d7cff7.s14.conves.io', // required - Replace me with your Wordpress URL 
        typeName: 'WordPress', // GraphQL schema name (Optional)
        perPage: 100, // How many posts to load from server per request (Optional)
        concurrent: 10, // How many requests to run simultaneously (Optional)
        routes: {
          post: '/:year/:month/:day/:slug', //adds route for "post" post type (Optional)
          post_tag: '/tag/:slug' // adds route for "post_tag" post type (Optional)
        },
        createPages: {
          approach: 'include', // include or exclude, default is include
          list: [] //an array of page slugs to include or exclude, ex. ['about', 'our-team'], default is an empty array
        },
        splitPostsIntoFragments: true, // default false
        downloadRemoteImagesFromPosts: true, // default false
        downloadRemoteFeaturedImages: true, // default false
        downloadACFImages: true, // default false
      }
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
          // Service Worker Options
          disableServiceWorker: false,
          serviceWorkerPath: 'service-worker.js',
          cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
          disableTemplatedUrls: false,       // Optional

          // Manifest Options (https://developer.mozilla.org/en-US/docs/Web/Manifest)
          manifestPath: 'manifest.json',
          title: 'Webeau Web Design',
          startUrl: '/',
          display: 'standalone',
          statusBarStyle: 'default',
          themeColor: '#666600',
          backgroundColor: '#ffffff',
          icon: 'favicon.png',
          shortName: 'webeau',              // Optional
          description: 'web design for the modern, fluid internet',// Optional
          categories: ['education'],          // Optional
          lang: 'en-US',                      // Optional
          dir: 'auto',                        // Optional
          maskableIcon: true,                 // Optional
          screenshots: [                      // Optional
              {
                  src: 'src/screenshot1.png',
                  sizes: '1280x720',
                  type: 'image/png',
              },
          ],
          gcmSenderId: undefined,             // Optional

          // Standard Meta Tags
          svgFavicon: 'favicon.svg',          // Optional. Requires favicon.ico fallback

          // Microsoft Windows Meta Tags
          msTileColor: '#666600',             // Optional

          // Apple MacOS Meta Tags
          appleMaskIcon: 'favicon.svg',       // Optional
          appleMaskIconColor: '#666600',      // Optional
      }
    },
    {
      use: '@gridsome/plugin-critical',
      options: {
        paths: ['/'],
        width: 1300,
        height: 900
      }
    },
    {
      use: 'gridsome-plugin-svg',
      options: {
      // default options below
      goesBothWays: false,
      svgo: [
        {
          removeTitle: false
        },
        {
          prefixIds: {
            prefix: (_, {path}) => basename(path, '.svg'),
            delim: '-',
          },
        },
        {
          removeDesc: false
        },
        {
          removeViewBox: false,
        },
        {
          sortAttrs: true,
        }
        ],
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-18077270-1'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/exclude-me'],
        config: {
          '/articles/*': {
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: '2020-02-19',
          },
          '/about': {
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: '2020-05-12',
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-bundle-analyzer',
      options: {
        onlyProduction: true, // only production bundle will be analyzed by default
        analyzerOptions: {}, // see https://github.com/webpack-contrib/webpack-bundle-analyzer
      },
    },
    {
      use: 'gridsome-plugin-robots-txt',
      options: {
        host: 'https://my-awesome-fast-site.com',
        sitemap: 'https://my-awesome-fast-site.com/configs/sitemap.xml',
        policy: [
          {
            userAgent: "Googlebot",
            allow: "/",
            disallow: "/search",
            crawlDelay: 2
          },
          {
            userAgent: "*",
            allow: "/",
            disallow: "/search",
            crawlDelay: 10,
            cleanParam: "ref /articles/"
          }
        ]
      }
    }    
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}
