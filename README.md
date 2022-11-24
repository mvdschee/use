# use

### ⚡️ Under heavy development. Not ready for public consumption. ⚡️

Useful methodes I use daily in projects.
Most methodes you probably find in your favorite framework, but I needed something I can use everywhere.

-   [vueUse](https://vueuse.org/) for Vue projects.
-   [reactuses](https://www.reactuse.com/) for React projects.

Most functions lack proper checking as this would just add more code and I don't want to bloat my code with checks.

It's all typed so you should be good to go.

## Installation

```bash
yarn add @mvdschee/use
```

## Usage

```js
import { useFetch } from '@mvdschee/use';
```

# Methodes

### Network

-   [useFetch](#useFetch)
-   [useSWR](#useSWR)

### DOM

-   [useAvatar](#useAvatar)
-   [useMarkdown](#useMarkdown)

### Style

-   [useColor](#useColor)

### Time

-   [useCountDown](#useCountDown)

## useFetch

Small wrapper around native fetch to stringify body and parse parms as an object (not doing polyfilling)

```ts
// GET request
import { useFetch } from '@mvdschee/use';

const { data, error } = await useFetch<DataType>('/api/data', {
    baseUrl: 'https://example.com',
    headers: {
        'Content-Type': 'application/json',
    },
    // params values needs to be of type String
    params: {
        account: 'example',
        filter: 'all',
        limit: '100',
        sort: 'desc',
    },
});

if (error) // do something with the error
else {
    // do something with the data
}
```

```ts
// POST request
import { useFetch } from '@mvdschee/use';

const { data, error } = await useFetch<DataType>('/api/data', {
    baseUrl: 'https://example.com',
    methode: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: {
        account: 'example',
        filter: 'all',
        limit: 100,
        sort: 'desc',
    },
});

if (error) // do something with the error
else {
    // do something with the data
}
```

## useSWR

SWR is a clientside caching (Stall While Revalidate) just to save some bytes

```ts
import { useSWR } from '@mvdschee/use';

// default timeout is 10 minutes
await useSWR(`unique-name`, () => getData(), 600_000);
```

## useAvatar

Fast and beautiful dynamic avatar based on account name

```ts
import { useAvatar } from '@mvdschee/use';

useAvatar('example'); // returns a svg as a string
```

## useMarkdown

Fast and compact markdown parser
see [mvdschee/drawdown](https://github.com/mvdschee/drawdown) for more info

```ts
import { useMarkdown } from '@mvdschee/use';

useMarkdown('example'); // returns a string: <p>example</p>

// with options (source, render as html, class)
useMarkdown('example', true, 'class-name'); // returns a DOM element: <div class="class-name"><p>example</p></div>
```

## useColor

String to hsla color

```ts
import { useColor } from '@mvdschee/use';

useColor('example'); // returns a hsla color string
```

## useCountDown

Countdown displayer, in DHMS format

```ts
import { useCountDown } from '@mvdschee/use';

// (start time, current time)
useCountDown(new Date().valueOf() - 1000, new Date().valueOf()); // returns 1S
```
