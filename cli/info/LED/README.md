# LED

A modular LED-inspired icon inspired by [Xander on X.](https://x.com/xanderburgess/status/1963520399662276724)

Visit their page to learn more about their work and what they do.

## Preview
[![LED Preview](https://i.imgur.com/eAmRTJU.gif)](https://imgur.com/a/XbaxUnW)


## Documentation
LED is available as a React component.

Install in your project from npm:
```
npx @vznh/components add led-icon
```

Import the icon in your React project:
```typescript
import { LEDIcon } from '@vznh/components';

const pattern = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]
];

function MyComponent() {
  return (
    <div>
      <LEDIcon matrix={pattern} />
    </div>
  )
}
```

## Contributing
Thank you for your interest to contributing to LED.

 We recommend that you check for open issues, if any, and pull requests to see if someone else is working on something similar.

## Authors
Jason Son ([@vznh](https://github.com/vznh))

## License
Licensed under the MIT License, see [LICENSE](https://github.com/vznh/components/blob/master/LICENSE).
