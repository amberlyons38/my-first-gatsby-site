module.exports = {
  siteMetadata: {
    title: "My First Gatsby Site",
  },
  pathPrefix: "/my-first-gatsby-site",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "DrupalGraqhQL",
        // This is field under which it's accessible
        fieldName: "Drupal",
        url: "https://csc496f22demo.tldr.dev/graphql"
      }
    },
  ],
};
