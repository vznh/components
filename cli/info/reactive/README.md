# Reactive

A dramatic blur effect over harsh changing values.

## Preview
[![Reactive: Preview](https://i.imgur.com/zdDFAiY.gif)](https://imgur.com/a/HcOKQrK)

## Documentation
Reactive is available as a React component.

Install in your project from npm:
```
npx @vznh/components add reactive
```

Import the component in your React project:
```typescript
import * as React from "react";
import { Reactive } from '@vznh/components';

function MyComponent() {
  // Any value that variably changes should work here.
  // We'll use an useState for example.
  const [variable, setVariable] = React.useState<number>(0);

  return (
    <div>
      <Reactive value={variable} />
    </div>
  )
}
```

## Contributing
Thank you for your interest to contributing to Reactive.

 We recommend that you check for open issues, if any, and pull requests to see if someone else is working on something similar.

## Authors
Jason Son ([@vznh](https://github.com/vznh))

## License
Licensed under the MIT License, see [LICENSE](https://github.com/vznh/led/blob/master/LICENSE).
