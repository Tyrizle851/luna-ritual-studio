const fs = require('fs');
const workflow = JSON.parse(fs.readFileSync('Content Engine v3 (Multi-Platform Viral Copy Generator).json', 'utf8'));

console.log('Checking all nodes for missing "options" field...\n');

let issuesFound = 0;

workflow.nodes.forEach((node, index) => {
  const needsOptions = [
    'n8n-nodes-base.code',
    'n8n-nodes-base.set',
    'n8n-nodes-base.switch',
    'n8n-nodes-base.httpRequest',
    'n8n-nodes-base.if'
  ];
  
  if (needsOptions.includes(node.type)) {
    const hasOptionsInParams = node.parameters && node.parameters.options;
    const hasOptionsAtRoot = node.options;
    
    if (!hasOptionsInParams && !hasOptionsAtRoot) {
      console.log(`❌ Node ${index}: "${node.name}" (${node.type}) - MISSING OPTIONS`);
      console.log(`   ID: ${node.id}`);
      issuesFound++;
    }
  }
});

if (issuesFound === 0) {
  console.log('\n✅ All nodes have proper "options" fields!');
  console.log(`Total nodes checked: ${workflow.nodes.length}`);
} else {
  console.log(`\n❌ Found ${issuesFound} nodes with missing "options" field`);
}


