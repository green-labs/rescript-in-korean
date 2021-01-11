const config = {
  gatsby: {
    pathPrefix: '/gitbook',
    siteUrl: 'https://green-labs.github.io/gitbook',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: "",
    logoLink: 'https://green-labs.github.io/gitbook',
    title:
      "그린랩스 Gitbook",
    githubUrl: 'https://github.com/green-labs',
    helpUrl: '',
    tweetText: '',
    social: `<li>
		    <a href="https://twitter.com/hasurahq" target="_blank" rel="noopener">
		      <div class="twitterBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Twitter'}/>
		      </div>
		    </a>
		  </li>
			<li>
		    <a href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener">
		      <div class="discordBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'Discord'}/>
		      </div>
		    </a>
		  </li>`,
    links: [{ text: '', link: '' }],
    search: {
      enabled: true,
      indexName: 'prod_gitbook',
      // algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaAppId: "AWJNYMZ5J7",
      // algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaSearchKey: "f09ab4cb7e4940cfafa619c094341740",
      // algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
      algoliaAdminKey: "8e26469b632427e1af1552dccf2deed8",
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
      '/codeblock',
    ],
    collapsedNav: [
      '/codeblock', // add trailing slash if enabled above
    ],
    links: [{ text: '기술 블로그', link: 'https://green-labs.github.io' }],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='https://hasura.io/learn/'>graphql </a><div class='greenCircle'></div><a href='https://hasura.io/learn/graphql/react/introduction/'>react</a>",
  },
  siteMetadata: {
    title: 'Greenlabs Gitbook',
    description: 'Documentation built with mdx. Powering hasura.io/learn ',
    ogImage: null,
    docsLocation: 'https://github.com/green-labs/gitbook/tree/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Greenlabs Gitbook',
      short_name: 'GreenlabsGitbook',
      start_url: '/gitbook',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
