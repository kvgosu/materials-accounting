const { execSync } = require('child_process');
const { join } = require('path');

module.exports = async function(tree, options) {
  const workspaceRoot = tree.root;
  const codegenConfig = join(workspaceRoot, 'apps/web/codegen.yml');
  
  execSync(`graphql-codegen --config ${codegenConfig}`, { stdio: 'inherit' });
  
  return () => {
    console.log('GraphQL code generation complete!');
  };
};