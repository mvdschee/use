# use

Useful methodes I use daily in projects.
Most methodes you probably find in your favorite framework, but I needed something I can use everywhere.

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

## Methodes

### Network

| Method                | Description                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| [useFetch](#usefetch) | Small wrapper around native fetch to stringify body and parse parms as an object (not doing polyfilling) |
| [useSWR](#useSWR)     | SWR is a clientside caching (Stall While Refresh) just to save some bytes                                |

### DOM

| Method                  | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| [useAvatar](#useAvatar) | Fast and beautiful dynamic avatar based on account name |

### Style

| Method                | Description          |
| --------------------- | -------------------- |
| [useColor](#useColor) | String to hsla color |

### Time

| Method                        | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| [useCountDown](#useCountDown) | Countdown displayer, in DHMS format (Max is days) |
