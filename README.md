# react-chrome-app-window
A React component wrapping chrome.app.window.create allowing your React-based Chrome App to span windows

Import:
``` js
ChromeAppWindow = require('react-chrome-app-window')
```

JSX:
``` js
<ChromeAppWindow url="index.html"
  onClosed={this.myCloseHandler}
  options={{id: "my-window", resizable: true, frame: {color: "#00ff00"}}}
  componentId="optional-mount-point">
  <p>Children and {variables} will update just like they would on a single page.</p>
</ChromeAppWindow>
```
