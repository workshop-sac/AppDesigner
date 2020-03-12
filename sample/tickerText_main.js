(function () {

  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
      <link rel="stylesheet" type="text/css" href="https://github.wdf.sap.corp/pages/d023588/orca_customWidget_samples/tickerText/style.css"/>
      <div class="ticker">
        <p id="tickerHeader" > Add Ticker Text </p>
      </div>
    `;
  class TickerText extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this.addEventListener("click", event => {
        if (event.shiftKey) { // at runtime, if Shift is pressed during the click, set a random color for text and background
          this._backgroundColor = this.getRandomColor();
          this._textColor = this.getRandomColor();
          this.dispatchEvent(new CustomEvent("propertiesChanged", {
            detail: {
              properties: {
                backgroundColor: this._backgroundColor,
                textColor: this._textColor
              }
            }
          }));
          this.updateValues();
        } else {
          this.dispatchEvent(new Event("onClick"));
        }
      });
      this._text = "Add Ticker Text";
      this._textColor = "#000000";
      this._backgroundColor = "#FFFFFF";
      this._props = {};
    }

    onCustomWidgetBeforeUpdate (changedProps) {
      this._props = { ...this._props, ...changedProps };
      console.log(`main[${this._props["widgetName"]}]: onCustomWidgetBeforeUpdate(${JSON.stringify(changedProps)})`);
    }

    onCustomWidgetAfterUpdate (changedProps) {
      if ("text" in changedProps && changedProps["text"] !== undefined) {
        this._text = changedProps["text"];
      }
      if ("textColor" in changedProps && changedProps["textColor"] !== undefined) {
        this._textColor = changedProps["textColor"];
      }
      if ("backgroundColor" in changedProps && changedProps["backgroundColor"] !== undefined) {
        this._backgroundColor = changedProps["backgroundColor"];
      }
      if (changedProps["onClick"] === true && changedProps["designMode"] === false) {
        // at runtime only, show a hand cursor on hover if an "onClick" event handler exists
        this.style["cursor"] = "pointer";
      }
      this.updateValues();
    }

    updateValues () {
      this._shadowRoot.querySelector("#tickerHeader").innerHTML = this._text;
      this._shadowRoot.querySelector("#tickerHeader").style.color = this._textColor;
      this._shadowRoot.querySelector("#tickerHeader").style.background = this._backgroundColor;
    }

    getRandomColor () {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
  customElements.define('ticker-text', TickerText);
})();
