import constants from '../constants.js';
import Generator from '../models/generator.js'
export default function (store) {
	return class GeneratorComponent extends window.HTMLElement {
		constructor () {
			super();
			this.store = store;


			this.num = this.dataset.message;

			this.name =        this.store.state.generators[this.num].name;
			this.description = this.store.state.generators[this.num].description;
			this.rate =        this.store.state.generators[this.num].rate;
			this.quantity =    this.store.state.generators[this.num].quantity;
			this.baseCost =    this.store.state.generators[this.num].baseCost;
			this.unlockValue = this.store.state.generators[this.num].unlockValue;



			// TODO: add click event
			this.addEventListener('click', () => {
				console.log("Buying " + this.name);
				this.store.dispatch({
					type: constants.actions.BUY_GENERATOR,
					payload: {
						name: this.name
					}
				});
				console.log(this.store.state.generators[this.num].quantity);
			});


			this.onStateChange = this.handleStateChange.bind(this);
		}

		handleStateChange (newState) {
			const temp = new Generator(newState.generators[this.num]);
			this.quantity = temp.quantity;
			this.baseCost = temp.getCost();
			this.rate = temp.generate();

			this.innerHTML = `
				<div id=a>
	            	<label id=genname>${this.name}</label>
	            	<label id=genquan>${this.quantity}</label>
	            	<p id=gendesc>${this.description}</p>
	            	<label id=genrate>${this.rate + ' per second'} </label>
	            	<button id=getbutt>${Math.round(this.baseCost) + ' Sushies'}</button>
	       		</div>`;
		}
		


		// TODO: subscribe to store on change event
		connectedCallback () {

			this.render();
			//console.log('ConnectedCallback');
			this.store.subscribe(this.onStateChange);
		}

		render(){
			this.innerHTML = `
				<div id=a>
	            	<label>${this.name}</label>
	            	<label >${this.quantity}</label>
	            	<p>${this.description}</p>
	            	<label>${this.rate + ' per second'} </label>
	            	<button>${Math.round(this.baseCost) + ' Sushies'}</button>
	       		</div>`;
		}



		disconnectedCallback () {
			console.log('DisconnectedCallback');
			this.store.unsubscribe(this.onStateChange);
		}
	};
}