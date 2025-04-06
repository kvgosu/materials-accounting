# Руководство по тестированию API с использованием Poetry

## Требования

Все зависимости управляются через Poetry и автоматически устанавливаются при запуске команд тестирования.

## Структура тестов

Тесты организованы следующим образом:

```
tests/
├── conftest.py              # Общие фикстуры и настройки
├── test_app.py              # Базовые тесты приложения
├── unit/                    # Модульные тесты
│   ├── repositories/        # Тесты репозиториев
│   ├── services/            # Тесты сервисов
│   └── models/              # Тесты моделей
├── integration/             # Интеграционные тесты
│   ├── graphql/             # Тесты GraphQL API
│   └── database/            # Тесты БД и миграций
└── functional/              # Функциональные тесты
    └── test_invoice_workflow.py  # Тест жизненного цикла накладной
    └── test_performance.py       # Тесты производительности
```

## Запуск тестов через NX и Poetry

Все команды тестирования настроены для использования Poetry через NX. При первом запуске любой тестовой команды будут автоматически установлены все необходимые зависимости.

### Доступные команды

```bash
# Установка всех зависимостей (включая разработческие)
nx run api:install-all

# Запуск всех тестов
nx test api

# Запуск только модульных тестов
nx test:unit api

# Запуск только интеграционных тестов
nx test:integration api

# Запуск только функциональных тестов
nx test:functional api

# Запуск тестов производительности
nx test:performance api

# Запуск тестов с формированием отчета о покрытии
nx test:cov api
```

## Отчеты о тестировании

При запуске тестов автоматически генерируются следующие отчеты:

- HTML-отчет о результатах тестов: `reports/apps/api/unittests/html/index.html`
- JUnit XML-отчет: `reports/apps/api/unittests/junit.xml`
- Отчет о покрытии кода в HTML: `coverage/apps/api/html/index.html`
- Отчет о покрытии кода в XML: `coverage/apps/api/coverage.xml`

## Маркеры тестов

Для организации тестов используются следующие маркеры:

- `@pytest.mark.unit` - модульные тесты
- `@pytest.mark.integration` - интеграционные тесты
- `@pytest.mark.functional` - функциональные тесты
- `@pytest.mark.performance` - тесты производительности

Пример запуска тестов с определенным маркером:

```bash
cd apps/api
poetry run pytest -m unit
```

## Параллельное выполнение тестов

Для ускорения выполнения тестов можно использовать параллельное выполнение с помощью pytest-xdist:

```bash
cd apps/api
poetry run pytest -n auto
```

## Создание новых тестов

### Создание модульного теста

```python
# tests/unit/repositories/test_new_repository.py
import pytest
from app.database.repositories import NewRepository
from app.database.models import NewModel

@pytest.mark.unit
def test_create_new_entity(db_session):
    """Тест создания новой сущности."""
    # Arrange
    repo = NewRepository(db_session)
    entity_data = {
        "name": "Test Entity",
        "description": "Test Description"
    }
    
    # Act
    entity = repo.create(entity_data)
    
    # Assert
    assert entity is not None
    assert entity.id is not None
    assert entity.name == "Test Entity"
    assert entity.description == "Test Description"
```

### Создание интеграционного теста для GraphQL

```python
# tests/integration/graphql/test_new_entity_queries.py
@pytest.mark.integration
def test_new_entity_query(graphql_client, sample_entity):
    """Тест запроса новой сущности."""
    # Arrange
    query = """
    {
        newEntities {
            id
            name
            description
        }
    }
    """
    
    # Act
    response = graphql_client(query)
    
    # Assert
    assert response.status_code == 200
    data = response.json()
    assert 'data' in data
    assert 'newEntities' in data['data']
    entities = data['data']['newEntities']
    assert len(entities) >= 1
```

## Интеграция с CI/CD

Настроена интеграция с GitHub Actions для автоматического запуска тестов при каждом push и pull request. Файл конфигурации: `.github/workflows/test.yml`.

GitHub Actions выполняет следующие шаги:
1. Установка Python и Poetry
2. Установка всех зависимостей
3. Запуск линтера
4. Запуск всех категорий тестов
5. Генерация и загрузка отчетов о покрытии
6. Архивирование результатов тестов