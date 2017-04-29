var app = new Vue({
	el: '#app',
	data: {
		newEvent: { name: '', description: '', date: '' },
		events: []
	},
	mounted: function() {
		// load events from localforage db
		localforage.getItem('events', function (err, value) {
			if (err) {
				console.log(err);
				return;
			}

			app.events = value;
		});
	},
	computed: {
		// returns an array of events sorted by date
		orderedEvents: function() {
			return this.events.sort((a, b) => a.date.localeCompare(b.date));
		},
		hasEvents: function() {
			return this.events.length > 0 ? true : false;
		}
	},
	methods: {
		// adds newEvent to the events array and 
		// saves the current events array
		addEvent: function() {
			app.events.push(Object.assign({}, app.newEvent));
			app.newEvent = { name: '', description: '', date: '' };
			app.saveEvents();
		},
		// deletes the provided event from the events array
		// and saves the current events array
		deleteEvent: function(event) {
			app.events.splice(
				app.events.indexOf(event), 1
			);
			app.saveEvents();
		},
		// saves the current events array in localforage
		saveEvents: function() {
			localforage.setItem('events', app.events, function (err) {
				if (err) {
					console.log(err);
				}
			});
		}
	}
});