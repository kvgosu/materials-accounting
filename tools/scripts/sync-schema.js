const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Путь к директориям схем
const schemaDir = path.resolve(__dirname, '../../libs/graphql/src/schemas');
const pythonSchemaDir = path.resolve(__dirname, '../../apps/api/app/graphql/schemas');

// Создаем директории, если не существуют
if (!fs.existsSync(schemaDir)) {
  fs.mkdirSync(schemaDir, { recursive: true });
}
if (!fs.existsSync(pythonSchemaDir)) {
  fs.mkdirSync(pythonSchemaDir, { recursive: true });
}

// Проверяем наличие файлов .graphql
const graphqlFiles = fs.readdirSync(schemaDir).filter(file => file.endsWith('.graphql'));

if (graphqlFiles.length === 0) {
  console.log('No .graphql files found. Creating a sample schema...');
  
  // Создаем пример схемы, если нет файлов
  const sampleSchema = `
type Query {
  clients: [Client!]!
  suppliers: [Supplier!]!
  materials: [Material!]!
}

type Client {
  id: ID!
  name: String!
  contactPerson: String
  phone: String
  email: String
  address: String
}

type Supplier {
  id: ID!
  name: String!
  contactPerson: String
  phone: String
  email: String
  address: String
}

type Material {
  id: ID!
  name: String!
  unit: String!
  description: String
}
`;
  
  fs.writeFileSync(path.join(schemaDir, 'schema.graphql'), sampleSchema);
  console.log('Sample schema created at: ' + path.join(schemaDir, 'schema.graphql'));
}

// Копируем все .graphql файлы
fs.readdirSync(schemaDir).forEach(file => {
  if (file.endsWith('.graphql')) {
    const sourceFile = path.join(schemaDir, file);
    const destFile = path.join(pythonSchemaDir, file);
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Copied: ${file}`);
  }
});

console.log('Schema synchronization completed');