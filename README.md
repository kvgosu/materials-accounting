# Модуль учета материалов

## Описание проекта

Система представляет собой модуль учета материалов, включающий функционал для работы с накладными на материалы, клиентами, поставщиками и договорами. Система отслеживает долги клиентов и поставщиков, а также автоматически создает транзакции с наценкой согласно договору клиента.

Проект построен на основе монорепозитория NX со следующей структурой:
- **Backend**: Flask, SQLAlchemy, GraphQL API (Ariadne)
- **Frontend**: Next.js, Relay, Tailwind CSS

## Содержание

- [Требования](#требования)
- [Установка](#установка)
  - [Клонирование репозитория](#клонирование-репозитория)
  - [Установка зависимостей](#установка-зависимостей)
  - [Настройка окружения](#настройка-окружения)
- [Запуск приложения](#запуск-приложения)
  - [Режим разработки](#режим-разработки)
  - [Производственный режим](#производственный-режим)
- [Работа с базой данных](#работа-с-базой-данных)
  - [Инициализация базы данных](#инициализация-базы-данных)
  - [Очистка базы данных](#очистка-базы-данных)
  - [Генерация демо-данных](#генерация-демо-данных)
  - [Миграции](#миграции)
- [Тестирование](#тестирование)
  - [Запуск тестов](#запуск-тестов)
  - [Анализ покрытия кода](#анализ-покрытия-кода)
- [GraphQL API](#graphql-api)
  - [Основные запросы](#основные-запросы)
  - [Playground](#playground)
- [Структура проекта](#структура-проекта)
- [Разработка](#разработка)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Развертывание](#развертывание)

## Требования

- Python 3.9 или 3.10
- Node.js 18+
- pnpm
- Poetry
- NX CLI

## Установка

### Клонирование репозитория

```bash
git clone https://github.com/your-repo/materials-accounting.git
cd materials-accounting
```

### Установка зависимостей

Установка глобальных инструментов:

```bash
# Установка Poetry (если не установлен)
curl -sSL https://install.python-poetry.org | python3 -

# Установка pnpm (если не установлен)
npm install -g pnpm

# Установка NX CLI (если не установлен)
npm install -g nx
```

Установка зависимостей проекта:

```bash
# Установка JavaScript/TypeScript зависимостей
pnpm install

# Установка Python зависимостей (API)
cd apps/api
poetry install
cd ../..
```

### Настройка окружения

Создайте файл `.env` в директории `apps/api/` со следующим содержимым для разработки:

```dotenv
# Режим разработки (true = используем SQLite)
DEV_MODE=true

PYTHONPATH=${PYTHONPATH}:${PWD}

# Путь к файлу SQLite (относительно корня приложения)
SQLITE_PATH=./dev_database.db

# Для совместимости с Alembic (используется только если DATABASE_URL не задан или DEV_MODE=true)
DATABASE_URL=sqlite:///./dev_database.db
```

Для производственного режима используйте PostgreSQL:

```dotenv
# Режим разработки отключен
DEV_MODE=false

PYTHONPATH=${PYTHONPATH}:${PWD}

# URL для подключения к PostgreSQL
DATABASE_URL=postgresql://username:password@host:port/database

# Секретный ключ для сессий Flask
SECRET_KEY=your-secret-key-here
```

## Запуск приложения

### Режим разработки

Запуск API сервера:

```bash
# Через NX
nx run api:serve

# Альтернативно, напрямую через Flask
cd apps/api
python -m flask run --debug
```

Запуск frontend-приложения:

```bash
# Через NX
nx run web:dev

# Альтернативно
cd apps/web
pnpm dev
```

### Производственный режим

Сборка проекта:

```bash
# Сборка API
nx run api:build

# Сборка веб-приложения
nx run web:build
```

Запуск API в производственном режиме с Gunicorn:

```bash
cd apps/api
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Запуск веб-приложения в производственном режиме:

```bash
cd apps/web
pnpm start
```

Для развертывания на Vercel используйте:

```bash
nx run deploy
```

## Работа с базой данных

### Инициализация базы данных

Инициализация схемы базы данных с тестовыми данными:

```bash
# Через NX
nx run api:init-db

# Альтернативно
cd apps/api
python scripts/direct_init_db.py
```

### Очистка базы данных

Полная очистка базы данных:

```bash
# Через NX
nx run api:clean-db

# Альтернативно, с запросом подтверждения
cd apps/api
python scripts/clear_db.py
```

### Генерация демо-данных

Генерация дополнительных демонстрационных данных (накладные, транзакции и т.д.):

```bash
cd apps/api
python scripts/generate_demo_data.py
```

### Миграции

Создание новой миграции:

```bash
cd apps/api
alembic revision --autogenerate -m "Описание миграции"
```

Применение миграций:

```bash
cd apps/api
alembic upgrade head
```

Откат миграции на один шаг назад:

```bash
cd apps/api
alembic downgrade -1
```

## Тестирование

### Запуск тестов

Запуск всех тестов:

```bash
# Через NX
nx run api:test

# Альтернативно
cd apps/api
python -m pytest
```

Запуск отдельной группы тестов:

```bash
# Тесты для репозиториев
nx run api:test -- tests/test_repositories

# Тесты для GraphQL API
nx run api:test -- tests/test_graphql

# Тесты для бизнес-процессов
nx run api:test -- tests/test_business_processes
```

Запуск тестов в режиме отслеживания изменений (автоматический перезапуск при изменении файлов):

```bash
nx run api:test:watch
```

### Анализ покрытия кода

Генерация отчета о покрытии кода тестами:

```bash
nx run api:test:coverage
```

Отчет будет создан в директории `coverage/` и будет доступен как в терминале, так и в виде HTML.

## GraphQL API

### Основные запросы

Примеры базовых запросов:

```graphql
# Получение списка клиентов
query {
  clients {
    id
    name
    contact_person
    phone
    email
  }
}

# Получение списка накладных
query {
  invoices {
    id
    number
    date
    totalAmount
    totalWithMarkup
    status
    client {
      name
    }
    supplier {
      name
    }
  }
}

# Создание клиента
mutation {
  createClient(input: {
    name: "ООО Тестовая компания",
    contact_person: "Иванов Иван",
    phone: "+7 (999) 123-45-67",
    email: "test@example.com",
    address: "г. Москва, ул. Тестовая, 1"
  }) {
    client {
      id
      name
    }
  }
}
```

### Playground

GraphQL Playground доступен по адресу: http://localhost:5000/graphql при запущенном API сервере.

## Структура проекта

```
materials-accounting/
├── apps/
│   ├── api/                    # Backend API (Flask + GraphQL)
│   │   ├── app/                # Исходный код API
│   │   │   ├── database/       # Слой доступа к данным
│   │   │   │   ├── models.py   # Модели SQLAlchemy
│   │   │   │   └── repositories.py # Репозитории для работы с данными
│   │   │   ├── graphql/        # GraphQL схемы и резолверы
│   │   │   └── __init__.py     # Инициализация Flask-приложения
│   │   ├── migrations/         # Миграции Alembic
│   │   ├── scripts/            # Скрипты для работы с БД
│   │   └── tests/              # Тесты
│   └── web/                    # Frontend (Next.js)
│       ├── app/                # Исходный код Next.js
│       └── public/             # Статические файлы
├── libs/                       # Общие библиотеки
│   ├── graphql/                # Библиотека GraphQL схем
│   ├── types/                  # Типы TypeScript
│   └── ui/                     # UI компоненты
├── tools/                      # Инструменты разработки
│   └── scripts/                # Вспомогательные скрипты
├── nx.json                     # Конфигурация NX
├── package.json                # Зависимости JavaScript
└── pnpm-workspace.yaml         # Настройки pnpm для монорепозитория
```

## Разработка

### Backend

Backend построен на основе Flask с использованием SQLAlchemy для работы с базой данных и Ariadne для GraphQL API. Структура кода следует паттерну Repository.

Основные компоненты:
- `models.py` - Определения моделей данных
- `repositories.py` - Методы для работы с данными
- `graphql/resolvers/` - Резолверы для GraphQL запросов и мутаций
- `graphql/schema.py` - Сборка GraphQL схемы

### Frontend

Frontend построен на Next.js с использованием:
- Relay для работы с GraphQL
- Tailwind CSS для стилизации
- React Hook Form для работы с формами

## Развертывание

Проект настроен для развертывания на Vercel:

```bash
# Развертывание на Vercel (production)
nx run deploy

# Развертывание для предпросмотра
nx run deploy:preview
```

Для развертывания API можно использовать:
- Render.com (настройте сервис Python)
- Heroku
- VPS с Nginx + Gunicorn

При развертывании на производственный сервер:
1. Создайте PostgreSQL базу данных
2. Настройте переменные окружения для подключения к БД
3. Примените миграции: `alembic upgrade head`
4. Запустите API через Gunicorn или uWSGI
5. Настройте Nginx для проксирования запросов к API
