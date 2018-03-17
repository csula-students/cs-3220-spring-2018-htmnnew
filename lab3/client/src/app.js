import '@webcomponents/webcomponentsjs';

import {loop} from './game';
import Store from './store';
import reducer from './reducer';

import ButtonComponent from './views/button';
import CounterComponent from './views/counter';
import ExampleComponent from './views/example';
import GeneratorComponent from './views/generator';
import StoryBookComponent from './views/story-book';

/**
 * Data flow diagram
 +----------------------------------------------------+
 | +------------------+          +------------------+ |
 | |                  |          |                  | |
++-|       Loop       |<---------|    Generator     | |
|| |                  |          |                  | |
|| +------------------+          +------------------+ |
||G          ^                                        |
||a          +-----------------------------+          |
||m                                        |          |
||e                                        |          |
||                               +------------------+ |
||                               |                  | |
||                               |     Stories      | |
||                               |                  | |
||                               +------------------+ |
|+----------------------------------------------------+
+------------------------------------------------------------+
|                                                            |
|                                                            |
|                                                            |
|                                                            |
|                                                            |
|                                                            |
|                                                            |
|                                                            |
|       +----------------------------------------------------+----------+
|       | +------------------+                     +------------------+ |
|       | |                  |        Mutates      |                  | |
|       | |     Reducer      |-------------------->|      State       | |
|       | |                  |                     |                  | |
|       | +------------------+                     +------------------+ |
|       |S          ^                                        |          |
|       |t          |                                        |          |
|       |o          |                                        |          |
|       |r          | Triggers                     Notifies  |          |
|       |e          |                                        |          |
|       |           |                                        v          |
|       | +------------------+                     +------------------+ |
|       | |                  |                     |                  | |
+-------+>|      Action      |                     |    Listeners     | |
        | |                  |                     |                  | |
        | +------------------+                     +------------------+ |
        +-----------^----------------------------------------+----------+
                    |                                        |
                    |                                        |
                    |                                        |
                    |                                        |
                    | Dispatches                             |
                    |                                        |
                    |                                        |
          +------------------+                               |
          |                  |                               |
          |      Views       |              Notifies changes |
          |    Components    |<------------------------------+
          |                  |
          +------------------+
 */
main();

// main function wraps everything at top level
function main () {
	// TODO: fill the blank based on the theme you have choosen
	const initialState = {
		example: 'Sushi Fantasy',
		counter: 0,
		generators: [        
			{
	            name: 'Chef',
	            description: 'Creates 10 Sushies',
	            rate: 10,
	            baseCost: 10,
	            quantity: 0,
	            unlockValue: 10
	        },
	        {
	            name: 'FastFood',
	            description: 'Creates 50 Sushies',
	            rate: 50,
	            baseCost: 100,
	            quantity: 0,
	            unlockValue: 100
	        },
	        {
	            name: 'Restaurant',
	            description: 'Creates 500 Sushies',
	            rate: 500,
	            baseCost: 10000,
	            quantity: 0,
	            unlockValue: 1000
	        }	        
        ],
		story: [       
			{
	            name: 'Welcome',
	            description: 'Hey! Let us Start Making sushies!!!!',
	            triggeredAt: 0,
	            state: 'hidden'
	        },			

			 {
	            name: 'Shef Comes',
	            description: 'Hey Look! Chef is here to help you!',
	            triggeredAt: 10,
	            state: 'hidden'
	        },
			 {
	            name: 'Fast Food',
	            description: 'Hey you can now buy a sushi fast food place!',
	            triggeredAt: 100,
	            state: 'hidden'
	        }, 
			 {
	            name: 'Restaurant',
	            description: 'You can now buy a Restaurant!!!',
	            triggeredAt: 10000,
	            state: 'hidden'
	        } 	        	   	
	        ]
	};

	// initialize store
	const store = new Store(reducer, initialState);
	//console.log(ExampleComponent(store));

	// define web components
	window.customElements.define('component-example', ExampleComponent(store));
	// no longer used
	window.customElements.define('game-button', ButtonComponent(store));
	window.customElements.define('game-counter', CounterComponent(store));
	// lab 3
	window.customElements.define('game-generator', GeneratorComponent(store));
	// homework 1
	window.customElements.define('game-story-book', StoryBookComponent(store));

	// For ease of debugging purpose, we will expose the critical store under window
	// ps: window is global
	window.store = store;

	// start game loop
	loop(store);
}
