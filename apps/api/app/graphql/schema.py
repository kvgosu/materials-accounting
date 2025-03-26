from ariadne import load_schema_from_path, make_executable_schema
from .schema_loader import load_all_schemas
from .resolvers import query, mutation  # Эти модули мы создадим позже

# Загружаем схему из общей библиотеки
type_defs = load_all_schemas()

# Создаем исполняемую схему с резолверами
schema = make_executable_schema(
    type_defs,
    query,
    mutation,
    # Здесь можно добавить другие резолверы
)