export default function (store) {
	return class GeneratorComponent extends window.HTMLElement {
		constructor () {
			super();
			this.store = store;

			// TODO: render generator initial view
			this.textContent =  this.store.state.example;

			// TODO: subscribe to store on change event
			store.subscribe(function(){
				//listen to click
				var temp = parseInt(document.getElementById('score').innerHTML);

				//increment the main counter
				window.incrementalGame.state.counter ++;
				temp = window.incrementalGame.state.counter;

				//set the DOM(inner html) to become same as main counter
				document.getElementById('score').innerHTML = temp;

				//printing for testing
				console.log(window.incrementalGame.state.counter);
			});				


			// TODO: add click event
			this.addEventListener('click', () => {
				this.store.dispatch({
					type: 'EXAMPLE_MUTATION',
					payload: 'You clicked this element'
				});
			});
		}
	};
}
