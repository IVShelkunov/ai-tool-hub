# ⚡ AI Tool Hub

> Современная полнофункциональная Fullstack-платформа каталога нейросетей с личным кабинетом, системой закладок (Optimistic UI), загрузкой файлов в облако и приватным Real-time мессенджером на WebSockets.

[![Next.js](https://img.shields.io/badge/Next.js-16_(App_Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL_(Neon)-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![Pusher](https://img.shields.io/badge/Pusher_(WebSockets)-300D4F?style=for-the-badge&logo=pusher&logoColor=white)](https://pusher.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 🌐 Демонстрация
- **Live Demo:** [ai-tool-hub-kappa-roan.vercel.app](https://ai-tool-hub-kappa-roan.vercel.app)

---

## 🎯 Ключевые возможности

### 🔐 Аутентификация и безопасность
- **Database-backed Sessions:** Хранение токенов активных сессий в базе данных PostgreSQL с возможностью мгновенного отзыва доступа (Server-side revocation).
- **HttpOnly Cookies:** Изоляция токенов авторизации от клиентского JavaScript (защита от XSS-атак).
- **Password Security:** Безопасное хэширование паролей через `bcryptjs`.
- **Email Verification Flow:** Подтверждение регистрации через транзакционные письма с помощью **Resend API**. Одноразовые криптографические токены с ограниченным сроком жизни и защитой от повторного использования.
- **Route Guard (Edge Middleware / Proxy):** Защита приватных маршрутов (`/dashboard`, `/chat`, `/profile`) до начала рендеринга страницы.

### 💬 Real-Time мессенджер (WebSockets)
- **Pub/Sub архитектура на базе Pusher:** Прямой обмен сообщениями между авторизованными пользователями без задержек и перезагрузок.
- **Deterministic Room IDs:** Алгоритм генерации уникальных комнат на основе сортировки идентификаторов участников.
- **Устранение Echo/Loopback:** Защита от дублирования сообщений у отправителя при получении обратного события из сокета.
- **Optimistic UI:** Мгновенное отображение отправленного сообщения с индикатором статуса (`pending` / `sent` / `error`).
- **Автоскролл:** Умный скролл контейнера сообщений к последнему элементу через `useRef` и чтение DOM-свойств контейнера.

### 👤 Личный кабинет и загрузка файлов
- **Object Storage (UploadThing):** Асинхронная загрузка аватаров пользователей прямо в облачное хранилище минуя перегрузку основного сервера.
- **Оптимизация медиа (`next/image`):** Конвертация в WebP/AVIF на лету, предварительное резервирование размеров и защита от сдвигов макета (CLS).
- **Интерактивный UI профиля:** Загрузка аватара по наведению (`group-hover` оверлей) и inline-редактирование имени профиля.

### ⭐ Каталог и Dashboard закладок
- **Серверный рендеринг (RSC):** Первичная отдача каталога нейросетей прямо из базы данных для идеального SEO и мгновенного First Contentful Paint.
- **Избранное через Server Actions:** Асинхронное переключение закладок с мгновенным откликом через хук `useOptimistic`.

### 📱 Адаптивный Master-Detail интерфейс
- Полноэкранный адаптивный чат на мобильных устройствах с переключением экранов через `usePathname` (список диалогов ⇄ активная переписка с кнопкой возврата назад).

---

## 🛠 Технологический стек

| Область | Технологии |
|---|---|
| **Фреймворк** | [Next.js (App Router)](https://nextjs.org/) |
| **Язык** | [TypeScript](https://www.typescriptlang.org/) |
| **Стилизация** | [Tailwind CSS](https://tailwindcss.com/), Radix UI / Shadcn primitives |
| **База данных** | [PostgreSQL (Neon Serverless)](https://neon.tech/) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/), Drizzle Kit |
| **Real-time** | [Pusher Channels (WebSockets)](https://pusher.com/) |
| **Файлы / Медиа** | [UploadThing](https://uploadthing.com/), `next/image` |
| **Почтовый сервис** | [Resend](https://resend.com/) |
| **Валидация** | [Zod](https://zod.dev/) |
| **Деплой** | [Vercel](https://vercel.com/) |

---

## 🏛 Архитектура базы данных

Схема разработана с акцентом на ссылочную целостность (`Foreign Keys`) и каскадное удаление (`ON DELETE CASCADE`):

```
+------------------+       +-------------------------+
|      users       | <---- |        sessions         |
+------------------+       +-------------------------+
| id (UUID, PK)    |
| email (UNIQUE)   |       +-------------------------+
| password (HASH)  | <---- |   verification_tokens   |
| name             |       +-------------------------+
| avatar_url       |
| is_verified      |       +-------------------------+
+------------------+ <---- |        favorites        |
        |                  +-------------------------+
        |                          |
        |                          v
        |                  +-------------------------+
        +----------------> |        ai_tools         |
        |                  +-------------------------+
        |
        |                  +-------------------------+
        +----------------> |        messages         |
                           +-------------------------+
```

- **`users`** — аккаунты, хэши паролей и профили.
- **`sessions`** — активные сессии с привязкой к кукам (`session_token`).
- **`verification_tokens`** — одноразовые токены верификации почты с TTL (`expires_at`).
- **`ai_tools`** — каталог нейросетей (название, описание, категория, внешняя ссылка).
- **`favorites`** — таблица-связка (Many-to-Many) с уникальным составным индексом `(tool_id, user_id)`.
- **`messages`** — история диалогов с индексами на `sender_id` и `receiver_id` для быстрого поиска по комнатам.

---

## 🚀 Локальный запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/ВАШ_НИК/ai-tool-hub.git
cd ai-tool-hub
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Переменные окружения
Создайте файл `.env.local` в корне проекта:

```env
# Neon PostgreSQL
DATABASE_URL=postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require

# App URL
APP_URL=http://localhost:3000

# Resend (Email)
RESEND_API_KEY=re_123456789

# UploadThing (File Storage)
UPLOADTHING_TOKEN=eyJ...

# Pusher (WebSockets)
PUSHER_APP_ID=your_app_id
NEXT_PUBLIC_PUSHER_KEY=your_client_key
PUSHER_SECRET=your_secret
NEXT_PUBLIC_PUSHER_CLUSTER=eu
```

### 4. Накат схемы базы данных
Примените схему к базе данных Neon:
```bash
npm run db:push
```

*(Опционально)* Наполните базу начальными данными:
```bash
npm run db:seed
```

### 5. Запуск сервера разработки
```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

---

## 📐 Инженерные задачи, решенные в проекте

1. **Идемпотентность и синхронизация при Optimistic Updates:**
   Устранена проблема расхождения локального стейта и событий веб-сокетов (Pusher echo/loopback) благодаря фильтрации сообщений собственного авторства и контролируемому слиянию данных.
2. **Безопасная обработка форм через React 19 Action State:**
   Использован хук `useActionState` в связке с серверной валидацией Zod через метод `.safeParse()`, исключающий падение серверов и возвращающий гранулярные ошибки по каждому полю.
3. **Бессерверные WebSocket-соединения:**
   Обойдено ограничение stateless-природы бессерверных функций Vercel за счет выноса realtime-транспорта в Pusher Channels при сохранении бизнес-логики внутри Server Actions.
4. **Адаптивный Layout без дублирования верстки:**
   Реализована плавная трансформация двухколоночного десктопного чата в мобильный экран с поддержкой браузерной истории переходов через динамические сегменты маршрута `[userId]`.

---

## 👨‍💻 Автор
- **GitHub:** [@IVShelkunov](https://github.com/IVShelkunov)
