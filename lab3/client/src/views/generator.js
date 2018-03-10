export default function (store) {
	return class GeneratorComponent extends window.HTMLElement {
		constructor () {
			super();
			this.store = store;

			// TODO: render generator initial view
			this.textContent = this.store.state.example;

			this.onStateChange = this.handleStateChange.bind(this);


			// TODO: add click event
			this.addEventListener('click', () => {
				this.store.dispatch({
					type: 'BUY_GENERATOR',
					payload: 'Bought Generator'
				});
			});
		}

		handleStateChange (newState) {
			console.log('StateChange', this);
			this.textContent = newState.example;
		}


		// TODO: subscribe to store on change event
		connectedCallback () {
			console.log('ConnectedCallback');
			this.innerHTML = `
				<div id=a>
	            	<label id=Desc>Name</label>
	            	<p> Description </p>
	            	<label>0/0</label>
	            	<button id=cost > {cost} Resources</button>
	       		 </div>`;

			this.store.subscribe(this.onStateChange);
		}



		disconnectedCallback () {
			console.log('DisconnectedCallback');
			this.store.unsubscribe(this.onStateChange);
		}
	};
}