from ariadne import QueryType, MutationType

# Инициализируем базовые объекты для резолверов
query = QueryType()
mutation = MutationType()

# Импортируем резолверы из отдельных модулей
from .clients import *
from .suppliers import *
from .materials import *
# и так далее...