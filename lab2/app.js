

// PubSub is single object for publish data to multiple subscribers
class PubSub {
    constructor () {
        this.subscribers = [];
    }

    // subscribe allows a new subscriber to listen for changes by providing
    // callback function in the parameter
    subscribe (fn) {
        this.subscribers.push(fn);
    }

    // one can publish any data to subscribers
    publish (data) {
        this.subscribers.forEach(subscriber => {
            subscriber(data);
        });
    }
}

	//new PUBSUB
	const pubSub = new PubSub();

	//get the main create button
	var testB = document.getElementById('incrementButton');
	//assign button to listen to changes from pubsub
	testB.addEventListener('click', function(){
		pubSub.publish(window.incrementalGame.state.counter);
	});

	pubSub.subscribe(function(){
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

///function that increments the counter goes inside subscribers