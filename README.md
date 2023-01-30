# use

### ⚡️ Under heavy development. Pin your NPM version!!!! before consumption. ⚡️

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

-   [useFetch](#useFetch) Some extra ease of use functions on top of `fetch`, like instant headers, response timing and body and query parsing.
-   [useSWR](#useSWR) `stale-while-revalidate` always return data while updating once the time out is over.

### DOM

-   [useAvatar](#useAvatar) A colorful profile photo based on the account name.
-   [useMarkdown](#useMarkdown) A fast and compact markdown parser. (no support for HTML)

### Style

-   [useColor](#useColor) Convert a string to a hsla color.

### Time

-   [useCountDown](#useCountDown) Countdown displayer, in `1D2H3M4S` format.

### Format

-   [useTokenDisplay](#useTokenDisplay) format a number to a string display, with a max of 8 decimals.

## useFetch

Small wrapper around native fetch to stringify body and parse parms as an object (not doing polyfilling)

No need for a `try catch`, this is done iternaly.

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

```ts
// All options
import { useFetch } from '@mvdschee/use';

const { data, error, header, time } = await useFetch<DataType>('/api/data', {
    baseUrl: 'https://example.com',
});

console.log(header['content-type']); // returns the content-type header
console.log(time); // returns the time it took to fetch the data
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

## useTokenDisplay

Format a number to a string display, with a max of 8 decimals (default)
and optional fixed decimals (default false)

```ts
import { useTokenDisplay } from '@mvdschee/use';

useTokenDisplay(100, 2); // returns 100

useTokenDisplay(100, 2, true); // returns 100.00
```

# 💻 Development

-   Clone this repository
-   Run `yarn` to install dependencies
-   Run `yarn build` to build the library and rebuild after a change, I don't have a nice setup for this yet
-   Run `yarn dev` to start the development server
