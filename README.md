# react-json-view

A customizable json view component for react, included features:

1. Visualize any JSON object to a tree style.
2. Expand or collapse object or array properties.
3. Custom rendering of any value.
4. Built-in render functions like copy property value.
5. CSS theme support.

We don't plan to support editing feature recently.

## Install

```shell
npm install @otakustay/react-json-view
```

## Usage

### Basic

To render an obejct containing JSON values, simply pass `source` prop to `JsonView` component.

```tsx
import {JsonView} from '@otakustay/react-json-view';
import '@otakustay/react-json-view/style';

function App() {
    return (
        <JsonView source={mySourceObject} />
    );
}
```
