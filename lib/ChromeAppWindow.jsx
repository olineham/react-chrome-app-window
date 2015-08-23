import React from 'react'

export default class ChromeAppWindow extends React.Component {

  componentDidMount() {
    chrome.app.window.create(
      this.props.url, this.props.options,
      (createdWindow) => {
        this._chromeWindow = createdWindow
        createdWindow.contentWindow.onload = () => {
          if(this.props.containerId) {
            this._container = this._chromeWindow.contentWindow.document.getElementById(this.props.containerId)
          } else {
            this._container = this._chromeWindow.contentWindow.document.body
          }
          React.render(this.props.children, this._container)
        }
        if(this.props.onClosed)
          this._chromeWindow.onClosed.addListener(this.props.onClosed.bind(this))
      }
    )
  }

  componentDidUpdate() {
    React.render(this.props.children, this._container)
  }

  componentWillUnmount() {
    this.closeWindow()
  }

  closeWindow() {
    if(this._chromeWindow) { this._chromeWindow.close() }
  }

  render() {
    return <noscript />
  }
}

ChromeAppWindow.defaultProps = {
  options: {}
}

ChromeAppWindow.propTypes = {
  // chrome.app.window.create() parameters
  url: React.PropTypes.string.isRequired,
  options: React.PropTypes.object,
  // element ID to render to, otherwise body is used.
  containerId: React.PropTypes.string,
  // // callback to get a handle on the real chrome AppWindow
  // onCreate: React.PropTypes.func,
  // // AppWindow events
  // onBoundsChanged: React.PropTypes.func,
  onClosed: React.PropTypes.func,
  // onFullscreened: React.PropTypes.func,
  // onMaximized: React.PropTypes.func,
  // onMinimized: React.PropTypes.func,
  // onRestored: React.PropTypes.func
  // // TODO: Declarative or other interface to methods like focus?

  // As this the root of a new React DOM, only a single child allowed
  children: React.PropTypes.element
}
