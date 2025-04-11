import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Bijles',
  tagline: 'Noah Klomp',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://noahklomp.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'NoahKlomp', // Usually your GitHub org/user name.
  projectName: 'NoahKlomp.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
          
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  // plugins: [
  //   [
  //     '@docusaurus/plugin-content-docs',
  //     {
  //       id: 'community',
  //       path: 'community',
  //       routeBasePath: 'community',
  //       sidebarPath: './sidebarsCommunity.js',
  //       // ... other options
  //     },
  //   ],
  // ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Bijles',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Vakken',
        // },
        {
          type: 'docSidebar',
          sidebarId: 'informaticaSidebar',
          position: 'left',
          label: 'Informatica',
        },
        {
          type: 'docSidebar',
          sidebarId: 'wiskundeSidebar',
          position: 'left',
          label: 'Wiskunde',
        },
        {
          type: 'docSidebar',
          sidebarId: 'englishSidebar',
          position: 'left',
          label: 'English',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Vakken',
          items: [
            {
              label: 'English',
              to: '/docs/category/english',
            }, {
              label: 'Wiskunde',
              to: '/docs/category/wiskunde',
            }
          ],
        },
        {
          title: 'Tips en tricks',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
          ],
        },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //   ],
        // },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
