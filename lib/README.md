# use

### ⚡️ Under heavy development. Pin your NPM version!!!! before consumption. ⚡️

Useful methodes we use daily in our projects.
Most methodes you probably find in your favorite framework, but we needed something you can use everywhere.

-   [vueUse](https://vueuse.org/) for Vue projects.
-   [reactuses](https://www.reactuse.com/) for React projects.

Most functions lack proper checking as we require you to still think about what you are doing.

It's all typed so you should be good to go.

## Installation

```bash
pnpm install @nefty/use
```

```bash
yarn add @nefty/use
```

## Usage

```js
import { ... } from '@nefty/use';
```

# Methodes

### Analytics

-   [usePosthog](#usePosthog) Posthog analytics

# Assets

-   [useAssetData](#useAssetData) Get data from a template (WAX api only)
-   [useImageUrl](#useImageUrl) Create resized image url from a CID or url (works only for allowed domains)

### Network

-   [useFetch](#useFetch) Some extra ease of use functions on top of `fetch`, like instant headers, response timing and body and query parsing.
-   [useSWR](#useSWR) `stale-while-revalidate` always return data while updating once the time out is over.
-   [useRetry](#useRetry) Retry useFetch a certain amount of times with a delay between each try.

### DOM

-   [useAvatar](#useAvatar) A colorful profile photo based on the account name.
-   [useMarkdown](#useMarkdown) A fast and compact markdown parser. (no support for HTML)

# Search

-   [useSearch](#useSearch) A fast search engine with support for typos.

### Style

-   [useColor](#useColor) Convert a string to a hsla color.

### Time

-   [useCountDown](#useCountDown) Countdown displayer, in `1D2H3M4S` format.

### Format

-   [useTokenDisplay](#useTokenDisplay) format a number to a string display, with a max of 8 decimals.

### Wallet

-   [WalletUAL](#WalletUAL) Wallet management for UAL.

## usePosthog

Posthog analytics

```ts
import { usePosthog } from '@nefty/use';

// init with extra options
const analytics = usePosthog({
    version: 'v2',
});

// track an event
analytics.track('event-name', {
    // data
});

// identify a user
analytics.identify('user-id');
```

## useAssetData

Get data from a template (WAX api only)

```ts
import { useAssetData } from '@nefty/use';

const template = {...};

const asset = useAssetData(template);

if(asset) {
    const { name, img } = asset;
}

```

## useImageUrl

Create resized image url from a CID or url (works only for allowed domains)

```ts
import { useImageUrl } from '@nefty/use';

// resize to 100x100 and make it static
useImageUrl('https://example.com/image.png', 100, true);
```

## useFetch

Small wrapper around native fetch to stringify body and parse parms as an object (not doing polyfilling)

No need for a `try catch`, this is done iternaly.

```ts
// GET request
import { useFetch } from '@nefty/use';

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
import { useFetch } from '@nefty/use';

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
import { useFetch } from '@nefty/use';

const { data, error, header, time } = await useFetch<DataType>('/api/data', {
    baseUrl: 'https://example.com',
});

console.log(header['content-type']); // returns the content-type header
console.log(time); // returns the time it took to fetch the data
```

## useSWR

SWR is a clientside caching (Stall While Revalidate) just to save some bytes

```ts
import { useSWR } from '@nefty/use';

// default timeout is 10 minutes
await useSWR(`unique-name`, () => getData(), 600_000);
```

## useRetry

Retry useFetch a certain amount of times with a delay between each try.

```ts
import { useRetry } from '@mvdschee/use';

const { data, error, header, time } = await useRetry({
    retries: 3, // default 3
    delay: 1000, // default 1000
    retryOn: ({ error }) => error !== null,
    call: () =>
        useFetch<DataType>('/api/data', {
            baseUrl: 'https://example.com',
        }),
});
```

## useAvatar

Fast and beautiful dynamic avatar based on account name

```ts
import { useAvatar } from '@nefty/use';

useAvatar('example'); // returns a svg as a string
```

## useMarkdown

Fast and compact markdown parser
see [nefty/drawdown](https://github.com/nefty/drawdown) for more info

```ts
import { useMarkdown } from '@nefty/use';

useMarkdown('example'); // returns a string: <p>example</p>

// with options (source, render as html, class)
useMarkdown('example', true, 'class-name'); // returns a DOM element: <div class="class-name"><p>example</p></div>
```

## useSearch

Fast search engine with support for typos

```ts
import { useSearch } from '@nefty/use';

const search = useSearch({
    // simple list of strings
    items: ['example', 'example 2'],
    // OPTIONAL: sorted list of strings per first character (good for many items)
    //  will fallback to items if no results are found to prevent empty results
    sorted_items: {
        a: ['account', 'account 2'],
        e: ['example', 'example 2'],
    },
    // OPTIONAL
    options: {
        distance: 3, // default 3: max distance between characters in a typo
        results_count: 8, // default 8: how many matches to return
        results_count_alt: 32, // default 32: how many alternative results with typos to look up (caped to results_count)
    },
});

const result = search('exa'); // returns [example', 'example 2'],
```

## useColor

String to hsla color

```ts
import { useColor } from '@nefty/use';

useColor('example'); // returns a hsla color string
```

## useCountDown

Countdown displayer, in DHMS format

```ts
import { useCountDown } from '@nefty/use';

// (start time, current time)
useCountDown(new Date().valueOf() - 1000, new Date().valueOf()); // returns 1S
```

## useTokenDisplay

Format a number to a string display, with a max of 8 decimals (default)
and optional fixed decimals (default false)

```ts
import { useTokenDisplay } from '@nefty/use';

useTokenDisplay(100, 2); // returns 100

useTokenDisplay(100, 2, true); // returns 100.00
```

## WalletUAL

Wallet management for UAL. not going to go in to much details here, but you can find more info on the [UAL](https://github.com/EOSIO/universal-authenticator-library)

```ts
import { WalletUAL, WalletUser } from '@nefty/use/wallet';

const callback = (users: WalletUser[]): void => {};

const wallet_anchor = new Anchor([network], { appName });
const wallet_wax = new Wax([network]);
const wallet_wombat = new Wombat([network], { appName });

const provider = new WalletUAL(callback, [network], appName, [wallet_anchor, wallet_wax, wallet_wombat]);

provider.init();
```
