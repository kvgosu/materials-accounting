// apps/web/src/app/api/graphql/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Обработчик POST запросов для GraphQL API
export async function POST(request: NextRequest) {
  try {
    // Получаем тело запроса
    const { query, variables } = await request.json();

    // В реальном приложении здесь был бы код для выполнения GraphQL запроса
    // Например, с использованием Apollo Server или другой библиотеки
    
    // Для примера возвращаем заглушку с успешным ответом
    return NextResponse.json({
      data: {
        success: true,
        message: "GraphQL API готов к использованию"
      }
    });
  } catch (error) {
    console.error('Ошибка при обработке GraphQL запроса:', error);
    
    return NextResponse.json(
      {
        errors: [{ message: 'Ошибка при обработке запроса' }]
      },
      { status: 500 }
    );
  }
}

// Обработчик GET запросов для проверки работоспособности API
export async function GET() {
  return NextResponse.json({
    status: 'GraphQL API работает',
    timestamp: new Date().toISOString()
  });
}