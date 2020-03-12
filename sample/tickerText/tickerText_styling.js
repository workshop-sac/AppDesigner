(function()  {
let tmpl = document.createElement('template');
tmpl.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Ticker Text Properties</legend>
				<table>
					<tr>
						<td>Text </td>
						<td><input id="aps_textVal" type="text" name="textVal" size="30" maxlength="40" /></td>
					</tr>
					<tr>
						<td> Text Color </td>
						<td><input id="aps_textColor" type="text" name="textColor" size="30" maxlength="20" /></td>
					</tr>
					<tr>
						<td> Background Color </td>
						<td><input id="aps_bckgrndColor" type="text" name="bckgrndColor" size="30" maxlength="20" /></td>
					</tr>

				</table>
			</fieldset>
			<br></br>
			<button type="submit">Submit</button>
		</form>
`;

class TickerTextStyling extends HTMLElement {
		  constructor() {
		    super();
		    this._shadowRoot = this.attachShadow({mode: 'open'});
		    this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		  }

		  _submit(e) {
		    	e.preventDefault();
					this.dispatchEvent(new CustomEvent('propertiesChanged', { detail: { properties: {
							text: this.text,
							textColor: this.textColor,
							backgroundColor: this.backgroundColor
					}}}));
				return false;
		  }

		  get text() {
			return this._shadowRoot.querySelector("input[id='aps_textVal']").value;
	      }

		  set text(value) {
			this._shadowRoot.querySelector("input[id='aps_textVal']").value = value;
		  }

		  get textColor() {
			return this._shadowRoot.querySelector("input[id='aps_textColor']").value;
	      }

		  set textColor(value) {
			this._shadowRoot.querySelector("input[id='aps_textColor']").value = value;
		  }

		  get backgroundColor() {
			return this._shadowRoot.querySelector("input[id='aps_bckgrndColor']").value;
	      }

		  set backgroundColor(value) {
			this._shadowRoot.querySelector("input[id='aps_bckgrndColor']").value = value;
		  }

		  static get observedAttributes() {
			  return ['text', 'textColor', 'backgroundColor'];
	      }

		  attributeChangedCallback(name, oldValue, newValue) {
			 if (oldValue !== newValue) {
				  this[name] = newValue;
			 }
		  }
}

customElements.define('ticker-text-styling', TickerTextStyling);
})();