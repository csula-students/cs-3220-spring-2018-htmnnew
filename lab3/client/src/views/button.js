import constants from '../constants';
export default function (store) {
	return class ButtonComponent extends window.HTMLElement {
		constructor () {
			super();
			this.store = store;
		}

		connectedCallback () {
			//console.log('ExampleComponent#onConnectedCallback');
			this.innerHTML = '<button>Make Sushi!</button>';
			this.addEventListener('click', () => {
				console.log("CLICK");
				this.store.dispatch({
					type: constants.actions.BUTTON_CLICK
				});
			});
		}

		disconnectedCallback () {
			//console.log('ExampleComponent#onDisconnectedCallback');
			this.store.unsubscribe(this.onStateChange);
		}
	};
}
