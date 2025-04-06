const { execSync } = require('child_process');
const { join } = require('path');

module.exports = async function(tree, options) {
  const workspaceRoot = tree.root;
  const relayConfig = join(workspaceRoot, 'apps/web/relay.config.js');
  
  execSync(`relay-compiler --config ${relayConfig}`, { stdio: 'inherit' });
  
  return () => {
    console.log('Relay compilation complete!');
  };
};