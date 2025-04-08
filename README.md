# Система учёта материалов (NX Monorepo)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Обзор

Это демонстрационный проект системы учета материалов, построенный на базе NX монорепозитория. Проект демонстрирует работу с GraphQL (Relay), Next.js и Flask API в рамках единой архитектуры.

### Структура проекта

```
materials-accounting/
├── apps/
│   ├── api/            # Flask GraphQL API (бэкенд)
│   └── web/            # Next.js приложение (фронтенд)
├── libs/
│   ├── graphql/        # GraphQL схемы и Relay
│   ├── types/          # TypeScript типы
│   └── ui/             # UI компоненты (shadcn)
```

## Требования

- Node.js (version 18+)
- Python 3.9+
- NX CLI
- Poetry (для Python-зависимостей)

## Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/your-username/materials-accounting.git
cd materials-accounting
```

### 2. Установка зависимостей

#### Установка глобальных NX зависимостей

```bash
pnpm install -g nx
```

#### Установка зависимостей проекта

```bash
# Установка Node.js зависимостей
pnpm install

# Установка Python зависимостей
cd apps/api
poetry install
cd ../..
```

### 3. Настройка базы данных

```bash
# Создание и инициализация базы данных
cd apps/api
poetry run python scripts/init_db.py

# Генерация тестовых данных (опционально)
poetry run python scripts/generate_demo_data.py
cd ../..
```

### 4. Запуск приложения

#### Запуск API (бэкенд)

```bash
# В одном терминале
nx serve api
# или
cd apps/api
poetry run flask run
```

#### Запуск веб-приложения (фронтенд)

```bash
# В другом терминале
nx serve web
```

Теперь приложение доступно по адресу [http://localhost:4200](http://localhost:4200)

## Команды NX

### Работа с веб-приложением

```bash
# Запуск Next.js приложения в режиме разработки
nx serve web

# Сборка приложения
nx build web

# Линтинг кода
nx lint web

# Запуск тестов
nx test web
```

### Работа с API

```bash
# Запуск API сервера
nx serve api

# Запуск тестов API
nx test api

# Запуск тестов с покрытием
nx test:cov api
```

### Работа с библиотеками

```bash
# Сборка библиотеки UI компонентов
nx build ui

# Сборка библиотеки GraphQL/Relay
nx build graphql

# Линтинг библиотеки
nx lint ui
```

### Relay и GraphQL

```bash
# Генерация Relay компонентов
nx run graphql:relay

# Запуск Relay в режиме отслеживания изменений
pnpm relay:watch

# Генерация GraphQL типов
pnpm generate:graphql
```

### Запуск всего проекта

```bash
# Запуск всего приложения
nx run-many --target=serve --projects=api,web --parallel
```

## Дополнительные команды

```bash
# Добавление компонента shadcn UI
pnpm ui:add [component-name]

# Подготовка зависимостей веб-приложения
pnpm prepare:web

# Сборка всех проектов
pnpm build
```

## База данных

По умолчанию проект использует SQLite для разработки. Настройки подключения:

```
# .env файл в apps/api
DEV_MODE=true
DATABASE_URL=sqlite:///./dev_database.db
```

Для использования PostgreSQL (в продакшене):

```
DEV_MODE=false
DATABASE_URL=postgresql://username:password@host:port/database
```

## Структура данных

Система включает в себя следующие основные сущности:
- Клиенты (Clients)
- Поставщики (Suppliers)
- Договоры (Contracts)
- Материалы (Materials)
- Накладные (Invoices)
- Позиции накладных (Invoice Items)
- Транзакции (Transactions)
- Регистр движения долгов (Debt Movements)

## Разработка

### Добавление новых UI компонентов

```bash
pnpm ui:add [component]
```

Пример:
```bash
pnpm ui:add button
pnpm ui:add card
pnpm ui:add avatar
```

### Изменение GraphQL схемы

1. Отредактируйте файл `libs/graphql/src/schemas/schema.graphql`
2. Запустите генерацию типов: `pnpm generate:graphql`
3. Обновите Relay: `nx run graphql:relay`

## Деплой

### Деплой на Vercel

```bash
# Деплой в продакшн
nx deploy

# Деплой в режиме предпросмотра
nx deploy:preview
```

### Деплой API на Render

1. Создайте сервис на Render
2. Свяжите с GitHub репозиторием
3. Укажите путь к директории `apps/api`
4. Настройте переменные окружения (DATABASE_URL и т.д.)

## Лицензия

MIT