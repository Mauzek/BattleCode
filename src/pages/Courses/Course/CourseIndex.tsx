// import { useAppSelector } from "@/hooks/storeHooks";
// import styles from "./course.module.scss";
// import { Skeleton } from "@/components";

// const CourseIndex = () => {
//   const { currentCourse, error, status } = useAppSelector(app => app.course)



//   if (status === "loading") {
//     return (
//       <div className={styles.course}>
//           <Skeleton width="100%" height="500px" borderRadius={16}/>
//       </div>
//     );
//   }

//   if (error || !currentCourse) {
//     return (
//       <div className={styles.course}>
//         <div className={styles.error}>
//           <h2>Ошибка загрузки курса</h2>
//           <p>{error || "Курс не найден"}</p>
//         </div>
//       </div>
//     );
//   }


//   const uiCourse = {
//     title: currentCourse.title,
//     author: currentCourse.authorId || "—", 
//     description: currentCourse.description,
//     difficulty: currentCourse.level || "Не указано",
//     duration: "8 недель", 
//     rating: 4.8, 
//     skills: currentCourse.tasks?.map(t => t.title) || [], 
//     tags: [currentCourse.level],
//   };

//   console.log(uiCourse)

//   return (
//     <div className={styles.course}>
//       <h1 className={styles.course__title}>{uiCourse.title}</h1>
//       <p className={styles.course__author}>Автор: {uiCourse.author}</p>

//       <div className={styles.course__meta}>
//         <span className={styles.course__badge}>
//           Сложность: {uiCourse.difficulty}
//         </span>
//         <span className={styles.course__badge}>
//           Длительность: {uiCourse.duration}
//         </span>
//         <span className={styles.course__badge}>Рейтинг: ★ {uiCourse.rating}</span>
//       </div>

//       <section className={styles.course__section}>
//         <h2 className={styles.course__sectionTitle}>Описание</h2>
//         <p className={styles.course__description}>{uiCourse.description}</p>
//       </section>

//       {uiCourse.skills.length > 0 && (
//         <section className={styles.course__section}>
//           <h2 className={styles.course__sectionTitle}>Чему вы научитесь</h2>
//           <ul className={styles.course__skills}>
//             {uiCourse.skills.map((skill, idx) => (
//               <li key={idx} className={styles.course__skillItem}>
//                 {skill}
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {uiCourse.tags.length > 0 && (
//         <section className={styles.course__section}>
//           <h2 className={styles.course__sectionTitle}>Теги</h2>
//           <div className={styles.course__tags}>
//             {uiCourse.tags.map((tag, idx) => (
//               <span key={idx} className={styles.course__tag}>
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default CourseIndex;

import React, { useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { myCourses } from '../CoursesIndex';

// --- ДАННЫЕ ---
export const allCourses = [
  {
    id: "course-013",
    slug: "nodejs-backend",
    title: "Node.js для фронтенд-разработчиков",
    description:
      "Курс помогает фронтенд-разработчикам уверенно перейти в бэкенд-сферу, начав с нуля и дойдя до готового REST API. Вы научитесь работать с Express.js, управлять middleware, организовывать маршрутизацию, подключать базы данных (SQLite/MongoDB), а также реализовывать JWT-аутентификацию и авторизацию. В финале — деплой на Render/Vercel.",
    status: "not started" as const,
    progress: 0,
    tags: ["Node.js", "Backend", "API", "Express", "JWT"],
    goals: [
      "Понимание event loop и асинхронной модели Node.js",
      "Создание RESTful API с валидацией входных данных (Zod)",
      "Работа с middleware (обработка ошибок, CORS, rate limiting)",
      "Аутентификация через JWT и refresh tokens",
      "Тестирование API (Jest + Supertest)",
    ],
    assignments: [
      "Блог API: создание, редактирование, удаление постов с авторизацией",
      "Фильтрация и пагинация записей",
      "Логирование запросов и ошибок в файл",
      "Swagger-документация API",
    ],
  },
  {
    id: "course-014",
    slug: "docker-for-devs",
    title: "Docker для разработчиков",
    description:
      "Курс учит использовать Docker не как «магию», а как инструмент для стабильной и воспроизводимой разработки. Вы научитесь писать эффективные Dockerfile, использовать multi-stage сборки, настраивать docker-compose для локального запуска БД, Redis, фронт- и бэкендов вместе. Особое внимание — security best practices и оптимизации образов.",
    status: "not started" as const,
    progress: 0,
    tags: ["Docker", "DevOps", "Инструменты", "CI/CD", "Контейнеризация"],
    goals: [
      "Понимание слоёв образа и кэширования",
      "Эффективная работа с volumes и bind mounts",
      "Изоляция сервисов через docker-compose",
      "Отладка контейнеров (logs, exec, health checks)",
      "Подготовка образа к продакшену (non-root user, .dockerignore)",
    ],
    assignments: [
      "Контейнеризация фронтенда (React) + бэкенда (Node.js) + PostgreSQL",
      "Настройка hot-reload в контейнере без пересборки",
      "Создание CI-пайплайна в GitHub Actions: build → test → push to Docker Hub",
      "Использование Docker в качестве локального окружения для legacy-приложения",
    ],
  },
  {
    id: "course-015",
    slug: "cypress-e2e",
    title: "E2E-тестирование с Cypress",
    description:
      "Курс посвящён сквозному тестированию веб-приложений: от установки Cypress до написания устойчивых, читаемых и поддерживаемых тестов. Вы освоите моки сетевых запросов (intercept), работу с fixtures, кастомные команды, плагины, а также интеграцию в CI. Особое внимание — борьбе с flaky-тестами и архитектуре тестового кода.",
    status: "not started" as const,
    progress: 0,
    tags: ["Cypress", "Testing", "E2E", "QA", "CI"],
    goals: [
      "Понимание жизненного цикла теста в Cypress",
      "Мокирование API для изоляции UI-логики",
      "Использование Page Object Model (или его адаптаций)",
      "Тестирование аутентификации без UI (через cy.request + куки)",
      "Генерация отчётов и видео артефактов",
    ],
    assignments: [
      "Написание E2E-сценариев для интернет-магазина: поиск → корзина → оплата",
      "Тестирование SPA с динамически подгружаемыми данными",
      "Интеграция с GitHub Actions: запуск тестов при PR",
      "Создание кастомной команды `cy.login()` с кэшированием сессии",
    ],
  },
  {
    id: "course-016",
    slug: "web-performance",
    title: "Производительность веб-приложений",
    description:
      "Курс учит не просто «ускорять сайт», а системно подходить к производительности: от метрик (LCP, FID, CLS) до глубоких оптимизаций. Вы научитесь анализировать бутleneck’и через DevTools, WebPageTest, Lighthouse CI, применять code-splitting, lazy hydration, memoization, оптимизировать изображения и шрифты, а также внедрять performance budgets в CI/CD.",
    status: "not started" as const,
    progress: 0,
    tags: ["Performance", "Optimization", "Lighthouse", "Core Web Vitals", "DevTools"],
    goals: [
      "Интерпретация Lighthouse-отчётов и приоритизация улучшений",
      "Оптимизация времени до интерактивности (TTI)",
      "Ленивая загрузка компонентов, изображений, маршрутов",
      "Превентивная оптимизация: prefetch, preload, early hints",
      "Мониторинг RUM (Real User Metrics) через Sentry/Web Vitals API",
    ],
    assignments: [
      "Аудит существующего проекта: найти и устранить 3 главных узких места",
      "Реализация streaming SSR + progressive hydration",
      "Настройка автоматических проверок Lighthouse в PR (lighthouse-ci)",
      "Оптимизация bundle size: анализ через Webpack Bundle Analyzer, tree-shaking, code splitting",
    ],
  },
  {
    id: "course-017",
    slug: "tailwind-css",
    title: "Tailwind CSS: утилитарный подход к стилям",
    description:
      "Курс раскрывает мощь Tailwind CSS: от базового использования до продвинутой кастомизации. Вы научитесь писать адаптивный, доступный и поддерживаемый UI без классов-мусора, используя JIT-режим, @apply, кастомные плагины, dark mode и интеграцию с Headless UI. Акцент — на скорости разработки *и* качестве кода.",
    status: "not started" as const,
    progress: 0,
    tags: ["Tailwind", "CSS", "UI", "Design Systems", "Responsive"],
    goals: [
      "Глубокое понимание конфигурации (theme, variants, plugins)",
      "Создание семантических компонентов через @layer и композицию",
      "Реализация dark mode с сохранением в localStorage",
      "Интеграция с CSS-in-JS или CSS Modules (гибридный подход)",
      "Оптимизация продакшен-бандла через PurgeCSS (уже встроен)",
    ],
    assignments: [
      "Создание дизайн-системы: цвета, spacing, typography, компоненты (кнопки, карточки, формы)",
      "Адаптивная сетка с поддержкой печати (print media)",
      "Кастомный плагин для анимаций (например, fade-in-on-scroll)",
      "Миграция legacy-проекта с Bootstrap на Tailwind",
    ],
  },
  {
    id: "course-018",
    slug: "nextjs-ssr",
    title: "Next.js и серверный рендеринг",
    description:
      "Курс посвящён глубокому погружению в Next.js: SSR, SSG, ISR, App Router, streaming, server actions, data fetching strategies. Вы поймёте, *когда* и *почему* использовать тот или иной режим рендеринга, как избежать гидратационных ошибок, управлять состоянием на сервере, оптимизировать SEO и ускорить TTFB. В финале — полноценное приложение с динамическими маршрутами, кэшированием и метаданными.",
    status: "not started" as const,
    progress: 0,
    tags: ["Next.js", "SSR", "React", "SEO", "App Router", "Streaming"],
    goals: [
      "Различие между page router и app router",
      "Использование React Server Components (RSC) без «waterfalls»",
      "Оптимизация SEO: dynamic metadata, Open Graph, structured data",
      "Обработка ошибок на сервере (error boundaries в app dir)",
      "Кэширование данных (fetch options, revalidate, tags)",
    ],
    assignments: [
      "Новостной портал с SSG для статики + SSR для личного кабинета",
      "Динамические маршруты: /[category]/[slug] с fallback",
      "Реализация поиска с debounced server actions",
      "Интеграция с CMS (Contentful/Strapi) через ISR",
    ],
  },
  {
    id: "course-013",
    slug: "nodejs-backend",
    title: "Node.js для фронтенд-разработчиков",
    description:
      "Курс помогает фронтенд-разработчикам уверенно перейти в бэкенд-сферу, начав с нуля и дойдя до готового REST API. Вы научитесь работать с Express.js, управлять middleware, организовывать маршрутизацию, подключать базы данных (SQLite/MongoDB), а также реализовывать JWT-аутентификацию и авторизацию. В финале — деплой на Render/Vercel.",
    status: "not started" as const,
    progress: 0,
    tags: ["Node.js", "Backend", "API", "Express", "JWT"],
    goals: [
      "Понимание event loop и асинхронной модели Node.js",
      "Создание RESTful API с валидацией входных данных (Zod)",
      "Работа с middleware (обработка ошибок, CORS, rate limiting)",
      "Аутентификация через JWT и refresh tokens",
      "Тестирование API (Jest + Supertest)",
    ],
    assignments: [
      "Блог API: создание, редактирование, удаление постов с авторизацией",
      "Фильтрация и пагинация записей",
      "Логирование запросов и ошибок в файл",
      "Swagger-документация API",
    ],
  },
  {
    id: "course-014",
    slug: "docker-for-devs",
    title: "Docker для разработчиков",
    description:
      "Курс учит использовать Docker не как «магию», а как инструмент для стабильной и воспроизводимой разработки. Вы научитесь писать эффективные Dockerfile, использовать multi-stage сборки, настраивать docker-compose для локального запуска БД, Redis, фронт- и бэкендов вместе. Особое внимание — security best practices и оптимизации образов.",
    status: "not started" as const,
    progress: 0,
    tags: ["Docker", "DevOps", "Инструменты", "CI/CD", "Контейнеризация"],
    goals: [
      "Понимание слоёв образа и кэширования",
      "Эффективная работа с volumes и bind mounts",
      "Изоляция сервисов через docker-compose",
      "Отладка контейнеров (logs, exec, health checks)",
      "Подготовка образа к продакшену (non-root user, .dockerignore)",
    ],
    assignments: [
      "Контейнеризация фронтенда (React) + бэкенда (Node.js) + PostgreSQL",
      "Настройка hot-reload в контейнере без пересборки",
      "Создание CI-пайплайна в GitHub Actions: build → test → push to Docker Hub",
      "Использование Docker в качестве локального окружения для legacy-приложения",
    ],
  },
  {
    id: "course-015",
    slug: "cypress-e2e",
    title: "E2E-тестирование с Cypress",
    description:
      "Курс посвящён сквозному тестированию веб-приложений: от установки Cypress до написания устойчивых, читаемых и поддерживаемых тестов. Вы освоите моки сетевых запросов (intercept), работу с fixtures, кастомные команды, плагины, а также интеграцию в CI. Особое внимание — борьбе с flaky-тестами и архитектуре тестового кода.",
    status: "not started" as const,
    progress: 0,
    tags: ["Cypress", "Testing", "E2E", "QA", "CI"],
    goals: [
      "Понимание жизненного цикла теста в Cypress",
      "Мокирование API для изоляции UI-логики",
      "Использование Page Object Model (или его адаптаций)",
      "Тестирование аутентификации без UI (через cy.request + куки)",
      "Генерация отчётов и видео артефактов",
    ],
    assignments: [
      "Написание E2E-сценариев для интернет-магазина: поиск → корзина → оплата",
      "Тестирование SPA с динамически подгружаемыми данными",
      "Интеграция с GitHub Actions: запуск тестов при PR",
      "Создание кастомной команды `cy.login()` с кэшированием сессии",
    ],
  },
  {
    id: "course-016",
    slug: "web-performance",
    title: "Производительность веб-приложений",
    description:
      "Курс учит не просто «ускорять сайт», а системно подходить к производительности: от метрик (LCP, FID, CLS) до глубоких оптимизаций. Вы научитесь анализировать бутleneck’и через DevTools, WebPageTest, Lighthouse CI, применять code-splitting, lazy hydration, memoization, оптимизировать изображения и шрифты, а также внедрять performance budgets в CI/CD.",
    status: "not started" as const,
    progress: 0,
    tags: ["Performance", "Optimization", "Lighthouse", "Core Web Vitals", "DevTools"],
    goals: [
      "Интерпретация Lighthouse-отчётов и приоритизация улучшений",
      "Оптимизация времени до интерактивности (TTI)",
      "Ленивая загрузка компонентов, изображений, маршрутов",
      "Превентивная оптимизация: prefetch, preload, early hints",
      "Мониторинг RUM (Real User Metrics) через Sentry/Web Vitals API",
    ],
    assignments: [
      "Аудит существующего проекта: найти и устранить 3 главных узких места",
      "Реализация streaming SSR + progressive hydration",
      "Настройка автоматических проверок Lighthouse в PR (lighthouse-ci)",
      "Оптимизация bundle size: анализ через Webpack Bundle Analyzer, tree-shaking, code splitting",
    ],
  },
  {
    id: "course-017",
    slug: "tailwind-css",
    title: "Tailwind CSS: утилитарный подход к стилям",
    description:
      "Курс раскрывает мощь Tailwind CSS: от базового использования до продвинутой кастомизации. Вы научитесь писать адаптивный, доступный и поддерживаемый UI без классов-мусора, используя JIT-режим, @apply, кастомные плагины, dark mode и интеграцию с Headless UI. Акцент — на скорости разработки *и* качестве кода.",
    status: "not started" as const,
    progress: 0,
    tags: ["Tailwind", "CSS", "UI", "Design Systems", "Responsive"],
    goals: [
      "Глубокое понимание конфигурации (theme, variants, plugins)",
      "Создание семантических компонентов через @layer и композицию",
      "Реализация dark mode с сохранением в localStorage",
      "Интеграция с CSS-in-JS или CSS Modules (гибридный подход)",
      "Оптимизация продакшен-бандла через PurgeCSS (уже встроен)",
    ],
    assignments: [
      "Создание дизайн-системы: цвета, spacing, typography, компоненты (кнопки, карточки, формы)",
      "Адаптивная сетка с поддержкой печати (print media)",
      "Кастомный плагин для анимаций (например, fade-in-on-scroll)",
      "Миграция legacy-проекта с Bootstrap на Tailwind",
    ],
  },
  {
    id: "course-007",
    slug: "nextjs-ssr",
    title: "Next.js и серверный рендеринг",
    description:
      "Курс посвящён глубокому погружению в Next.js: SSR, SSG, ISR, App Router, streaming, server actions, data fetching strategies. Вы поймёте, *когда* и *почему* использовать тот или иной режим рендеринга, как избежать гидратационных ошибок, управлять состоянием на сервере, оптимизировать SEO и ускорить TTFB. В финале — полноценное приложение с динамическими маршрутами, кэшированием и метаданными.",
    status: "not started" as const,
    progress: 0,
    tags: ["Next.js", "SSR", "React", "SEO", "App Router", "Streaming"],
    goals: [
      "Различие между page router и app router",
      "Использование React Server Components (RSC) без «waterfalls»",
      "Оптимизация SEO: dynamic metadata, Open Graph, structured data",
      "Обработка ошибок на сервере (error boundaries в app dir)",
      "Кэширование данных (fetch options, revalidate, tags)",
    ],
    assignments: [
      "Новостной портал с SSG для статики + SSR для личного кабинета",
      "Динамические маршруты: /[category]/[slug] с fallback",
      "Реализация поиска с debounced server actions",
      "Интеграция с CMS (Contentful/Strapi) через ISR",
    ],
  },
] as const;

// --- КОМПОНЕНТ ---

const CoursePage = () => {
  const params = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const slug = params.slug || location.pathname.replace(/\/$/, '').split('/').pop();

  const course = useMemo(() => {
    let     result = allCourses.find((c) => c.id === slug);
    if (!result)  result = myCourses.find((c)=>c.id === slug);
    return result
  }, [slug]);

  // Стили вынесены в объект (JS Object Styles)
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: '900px', // Ограничение ширины
      margin: '0 auto',
      padding: '40px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      lineHeight: '1.6',
    },
    notFoundContainer: {
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px',
    },
    nav: {
      marginBottom: '32px',
    },
    navLink: {
      color: '#6b7280',
      textDecoration: 'none',
      fontSize: '14px',
      cursor: 'pointer',
    },
    badges: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px',
    },
    badgeStatus: {
      padding: '4px 8px',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      fontSize: '12px',
      fontWeight: '600',
      borderRadius: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
    },
    badgeTag: {
      padding: '4px 8px',
      backgroundColor: '#eef2ff',
      color: '#4338ca',
      fontSize: '12px',
      fontWeight: '500',
      borderRadius: '4px',
    },
    title: {
      fontSize: '36px',
      fontWeight: '800',
      marginBottom: '16px',
      lineHeight: '1.2',
    },
    description: {
      fontSize: '18px',
      // color: '#4b5563',
      marginBottom: '40px',
      textAlign: 'justify', // Текст по ширине
    },
    card: {
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '40px',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      flexWrap: 'wrap',
    },
    progressSection: {
      flex: '1',
      minWidth: '240px',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      marginBottom: '8px',
      color: '#374151',
      fontWeight: '500',
    },
    progressBarBg: {
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '9999px',
      overflow: 'hidden',
    },
    button: {
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      whiteSpace: 'nowrap',
      transition: 'background-color 0.2s',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '48px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '16px',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '12px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      textAlign: 'justify', // Текст списков по ширине
    },
    bullet: {
      marginTop: '8px',
      width: '6px',
      height: '6px',
      backgroundColor: '#10b981', // Зеленый для целей
      borderRadius: '50%',
      flexShrink: 0,
    },
    number: {
      marginTop: '2px',
      fontFamily: 'monospace',
      fontWeight: '700',
      color: '#9ca3af',
      fontSize: '14px',
      flexShrink: 0,
      width: '24px',
    },
  };

  if (!course) {
    return (
      <div style={styles.notFoundContainer}>
        <h1 style={{...styles.title, fontSize: '24px'}}>Курс не найден</h1>
        <p style={{marginBottom: '24px', color: '#6b7280'}}>
          Мы искали slug: <code style={{backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px'}}>{slug || 'не определен'}</code>
        </p>
        <button
          onClick={() => navigate('/')}
          style={{...styles.button, backgroundColor: 'transparent', color: '#4f46e5', padding: 0}}
        >
          &larr; Вернуться ко всем курсам
        </button>
      </div>
    );
  }

  // Динамические стили
  const progressBarStyle = {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: '9999px',
    width: `${course.progress}%`,
    transition: 'width 0.5s ease-in-out',
  };

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <header>
        <div style={styles.badges}>
          <span style={styles.badgeStatus }>
            {course.status}
          </span>
          {course.tags.map(tag => (
            <span key={tag} style={styles.badgeTag}>
              {tag}
            </span>
          ))}
        </div>
        
        <h1 style={styles.title}>
          {course.title}
        </h1>
        
        <p style={styles.description}>
          {course.description}
        </p>
      </header>

      {/* Progress & Action */}
      <div style={styles.card}>
        <div style={styles.cardContent}>
          <div style={styles.progressSection}>
            <div style={styles.progressHeader}>
              <span>Прогресс обучения</span>
              <span style={{color: '#4f46e5', fontWeight: 'bold'}}>{course.progress}%</span>
            </div>
            <div style={styles.progressBarBg}>
              <div style={progressBarStyle} />
            </div>
          </div>
          <button style={styles.button}>
            {course.progress > 0 ? 'Продолжить' : 'Начать обучение'}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div style={styles.grid}>
        
        {/* Goals */}
        <section>
          <h2 style={styles.sectionTitle}>
            Чему вы научитесь
          </h2>
          <ul style={styles.list}>
            {course.goals.map((goal, i) => (
              <li key={i} style={styles.listItem}>
                <span style={styles.bullet} />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Assignments */}
        <section>
          <h2 style={styles.sectionTitle}>
            Практика
          </h2>
          <ul style={styles.list}>
            {course.assignments.map((task, i) => (
              <li key={i} style={styles.listItem}>
                <span style={styles.number}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </section>
        
      </div>
    </div>
  );
};

export default CoursePage;