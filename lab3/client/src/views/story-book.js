import constants from '../constants.js';
import Story from '../models/story.js'
export default function (store) {
	return class StoryBookComponent extends window.HTMLElement {
		constructor () {
			super();
			this.store = store;
			// TODO: initial DOM rendering of story itself
			this.num = this.dataset.message;

			this.name = this.store.state.story[this.num].name;
			this.description = this.store.state.story[this.num].description;
			this.triggeredAt = this.store.state.story[this.num].triggeredAt;
			this.state = this.store.state.story[this.num].state;


			this.onStateChange = this.handleStateChange.bind(this);
		}

		handleStateChange (newState) {
			const temp = new Story(newState.story[this.num])
			this.description = temp.description;
			this.state = temp.state;
			if(this.state == 'visible'){
				this.innerHTML = `
					<p id=story>${this.description}</p>`
			}

		}

		connectedCallback () {
			this.store.subscribe(this.onStateChange);
		}

		disconnectedCallback () {
			this.store.unsubscribe(this.onStateChange);
		}
	};
}

