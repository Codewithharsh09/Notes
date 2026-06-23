// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  dsaSidebar: [
    {
      type: "category",
      label: "DSA",
      link: {
        type: "doc",
        id: "index",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "time-complexity",
          label: "Time Complexity",
        },
      ],
    },
  ],
};

export default sidebars;
