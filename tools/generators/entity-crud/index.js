const { join } = require('path');
const { readFileSync } = require('fs');
const { parse, buildSchema } = require('graphql');
const { generateFiles, formatFiles } = require('@nx/devkit');

module.exports = async function(tree, options) {
  const { entity } = options;
  
  if (!entity) {
    throw new Error('Entity name is required');
  }
  
  // Чтение схемы GraphQL
  const schemaPath = join(tree.root, 'libs/graphql/src/schemas/schema.graphql');
  const schema = readFileSync(schemaPath, 'utf8');
  const parsedSchema = buildSchema(schema);
  
  // Получение информации о сущности
  const entityType = parsedSchema.getType(entity);
  if (!entityType) {
    throw new Error(`Entity "${entity}" not found in GraphQL schema`);
  }
  
  // Генерация файлов из шаблонов
  generateFiles(
    tree,
    join(__dirname, 'files'),
    join(tree.root, `apps/web/src/app/${entity.toLowerCase()}s`),
    {
      entity,
      entityLower: entity.toLowerCase(),
      entityPlural: `${entity.toLowerCase()}s`,
      fields: getEntityFields(entityType),
      tmpl: '',
    }
  );
  
  await formatFiles(tree);
  
  return () => {
    console.log(`CRUD components for ${entity} generated successfully!`);
  };
};

function getEntityFields(type) {
  const fields = type.getFields();
  return Object.keys(fields).map(fieldName => {
    const field = fields[fieldName];
    return {
      name: fieldName,
      type: field.type.toString(),
      isRequired: field.type.toString().includes('!'),
    };
  });
}