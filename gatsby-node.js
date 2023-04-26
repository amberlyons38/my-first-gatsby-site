const path = require('path');
// Create a slug for each recipe and set it as a field on the node.
exports.onCreateNode = ({ node, getNode, actions }) => {
  //console.log(node);
  const { createNodeField } = actions
  const slug = (node.path && node.path.alias) ? node.path.alias : '/node/' + node.drupal_id; 
  createNodeField({
    node,
    name: `slug`,
    value: slug,
  })
}
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/components/recipe.js`)
    resolve(
      graphql(
        `
query MyQuery {
  Drupal {
            nodeRecipes(first: 100) {
              edges {
                node {
                  changed
                  id
                  cookingTime
                  created
                  path
                  status
                  title
                  preparationTime
                  difficulty
                  numberOfServings
                  recipeCategory {
                    name
                  }
                  tags {
                    name
                  }
                  recipeInstruction {
                    value
                  }
                  mediaImage {
                    mediaImage {
                      url
                      height
                      width
                    }
                  }
                }
              }
            }
          }
  }
`
      ).then(result => {
        // shows during build/dev
        //console.log("RESULT");
        //console.log(result);
        if (result.errors) {
          reject(result.errors)
        }
        const pages = result.data.Drupal.nodeRecipes.edges; 
        
        //result.data.allNodeHorse.edges.forEach(({ node }, index) => {
        pages.forEach(({ node }, index) => {
          //console.log(node);
          //const page_path = (node.path && node.path.alias) ? node.path.alias : '/node/' + node.drupal_id; 
          const page_path = node.path
          createPage({
            path: `${page_path}`,
            component: pageTemplate,
            context: {
              nid: node.id,  
              data: node, 
            },
          })
        })
      })
    )
  });
}