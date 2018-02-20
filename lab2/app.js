

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

const pubSub = new PubSub();


	var testB = document.getElementById('mainB');
	testB.addEventListener('click', function(){
		pubSub.publish(window.incrementalGame.state.counter);
	});

	pubSub.subscribe(action => {
		var temp = parseInt(document.getElementById('score').innerHTML);
		console.log(temp);
		temp ++;
		document.getElementById('score').innerHTML = temp;
	});

///function that increments the counter goes inside subscribers