# Тестовое задание

### Стэк: React + TypeScript + RTK Query + react-virtuoso + Vite

- для установки проекта нужно клонировать репозиторий:

```shell
git clone https://github.com/viacheslavorlov/picasso-test.git
```

- установить зависимости:

```shell
npm i
```

- запустить проект:

```shell
npm run dev
```

## ESLint

в дополнение к стандартному линтеру добавлен самодельный плагин для проверки и контроля за FSD
архитектурой (https://github.com/viacheslavorlov/eslint-plugin-fsd-architecture-checker)

## RTK Query

### Создание экземпляра API

```javascript
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
	endpoints: () => ({}),
});
```

### Получение одного поста

```javascript
const getSinglePostEndpoint = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getSinglePost: builder.query({
			query: (id) => `/posts/${id}`,
		}),
	}),
});

export const {useGetSinglePostQuery} = getSinglePostEndpoint;
```

### Получение списка постов

```javascript
export const fetchPostsEndpoint = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: (pageNumber) => {
				return `/posts?_limit=20&_page=${pageNumber}`;
			},
			merge(currentCache, responseData) {
				currentCache.push(...responseData);
			},
			serializeQueryArgs: ({endpointName}) => {
				return endpointName;
			},
			forceRefetch({currentArg, previousArg}) {
				return currentArg !== previousArg;
			},
		}),
	}),
	overrideExisting: true,
});

export const {useGetPostsQuery} = fetchPostsEndpoint;
```

В этой документации мы использовали библиотеку Redux Toolkit Query для создания API и определения эндпоинтов.

`baseApi` - это экземпляр API, который использует `fetchBaseQuery` для выполнения базовых запросов с заданным базовым
URL.

`getSinglePostEndpoint` - инжектирует эндпоинт `getSinglePost`, который выполняет запрос для получения одного поста по
его идентификатору.

`fetchPostsEndpoint` - инжектирует эндпоинт `getPosts`, который выполняет запрос для получения списка постов с
пагинацией. В этом эндпоинте также определены методы `merge`, `serializeQueryArgs` и `forceRefetch` для настройки
поведения запроса и кэширования полученных данных.

`useGetSinglePostQuery` и `useGetPostsQuery` - это хуки, которые предоставляют доступ к выполнению запросов для
получения одного поста и списка постов соответственно.

## Документация компонента PostList

### Описание

Компонент PostList отображает список постов. Он использует библиотеку React-Virtuoso для эффективного отображения
больших списков данных.

### Импорт зависимостей

import { memo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { IPost, Post } from '@/entities/Post';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { useGetPostsQuery } from '../model/fetchPostsEndpoint';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { VStack } from '@/shared/ui/Stack';
import { ErrorPage } from '@/shared/ui/ErrorPage';
import cls from './PostList.module.css';

### Props

- `className`  (опционально): Строка, класс CSS для компонента.

### Компоненты

#### Header

```typescript jsx
const Header = () => <h1 className={cls.title}>Список постов</h1>;
```

Отображает заголовок списка постов.

#### Footer

```typescript jsx
const Footer = () => isFetching ? <Loader/> : <div/>;
```

Отображает индикатор загрузки, если данные постов загружаются, иначе отображает пустой div.

### Hooks

- `useGetPostsQuery(page)` : Хук, который выполняет запрос для получения списка постов. Принимает номер страницы в
  качестве аргумента.

### Функции

- `onLoadMore()` : Функция, вызываемая при достижении конца списка. Увеличивает номер страницы для загрузки следующей
  порции данных.

### Рендеринг

```typescript jsx
return (
    <VStack max gap={'8'} className={classNames(cls.PostList, className)}>
        <Header/>
        <ErrorBoundary>
            <Virtuoso
                style={{height: 'calc(100vh - 150px)', width: '100%'}}
                data={data}
                components={{
                    Footer
                }}
                overscan={100}
                endReached={onLoadMore}
                itemContent={(_, post) => <Post
                    key={post.id}
                    className={
                        classNames(post.id % 2 === 0 ? cls.even : cls.odd, cls.post)
                    }
                    post={post as IPost}/>}
            />
        </ErrorBoundary>
    </VStack>
);
```

- Отображает компонент VStack, который содержит заголовок и список постов.
- Используется ErrorBoundary для обработки ошибок.
- Используется компонент Virtuoso для отображения списка постов с виртуализацией.
- Каждый элемент списка представлен компонентом Post.
- При достижении конца списка вызывается функция onLoadMore.

### CSS-классы

- `title` : Стили для заголовка.
- `PostList` : Стили для контейнера компонента.
- `even` : Стили для четных постов.
- `odd` : Стили для нечетных постов.
- `post` : Стили для каждого поста.

## Инструкция по использованию хука useWindowSize

### Описание

Хук useWindowSize предоставляет возможность отслеживать изменения размеров окна браузера с использованием throttle для
оптимизации производительности.

### Импорт зависимостей

```typescript jsx
import {throttle} from '@/shared/lib/throttle/throttle';
import {useEffect, useState} from 'react';
```

### Параметры

- `delay`  (число): Задержка в миллисекундах для throttle функции.

### Возвращаемые значения

Хук возвращает объект с двумя свойствами:

- `width`  (число): Текущая ширина окна браузера.
- `height`  (число): Текущая высота окна браузера.

### Использование

```typescript jsx
export function useWindowSize(delay) {
    const [width, setWidth] = useState(window.innerWidth || 0);
    const [height, setHeight] = useState(window.innerHeight || 0);

    const setWindowSize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        setWindowSize();
        const throttledSetWindowSize = throttle(setWindowSize, delay);
        window.addEventListener('resize', throttledSetWindowSize);
        window.addEventListener('orientationchange', setWindowSize);
        return () => {
            window.removeEventListener('resize', throttledSetWindowSize);
            window.removeEventListener('orientationchange', setWindowSize);
        };
    }, [delay]);

    return {width, height};
}
```

### throttle

```typescript
export const throttle = (callback, delay) => {
    let timerId;
    return function (...args) {
        if (!timerId) {
            timerId = setTimeout(() => {
                callback.apply(this, args);
                timerId = null;
            }, delay);
        }
    };
};
```

#### Описание

Функция throttle используется для ограничения частоты вызова функции. Она принимает функцию обратного вызова и задержку
в миллисекундах и возвращает функцию-обертку, которая вызывает переданную функцию не чаще, чем раз в указанную задержку.

#### Использование

```typescript
const throttledFunction = throttle(callback, delay);

```

где  `callback`  - функция обратного вызова,  `delay`  - задержка в миллисекундах.

#### Пример использования

```typescript
const setWindowSize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
};

const throttledSetWindowSize = throttle(setWindowSize, delay);
```
В этом примере мы используем функцию throttle для создания throttledSetWindowSize, которая будет вызываться не чаще, чем
раз в указанную задержку при изменении размеров окна.

### Примечания

- Хук useWindowSize отслеживает изменения размеров окна браузера и обновляет значения ширины и высоты.
- Используется throttle для оптимизации производительности и снижения количества вызовов функции при быстром изменении
  размеров окна.
- Обработчик изменения размеров окна добавляется при монтировании компонента и удаляется при размонтировании.
