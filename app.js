var sdcard = navigator.getDeviceStorage('sdcard');

var kdbxSelected = function (e) {
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		console.log(data);
		data = new jDataView(data, 0, data.length, true)
		var passes = [readPassword('password')]
		try {
			var entries = readKeePassFile(data, passes);
			console.log(entries);
		} catch (e) {
			console.log(e);
		}
	};
	reader.onerror = function(e) {
		bp_alert("Cannot load local file " + file.name);
	};
	
	var request = sdcard.get(e.target.parentElement.dataset.name);
	
	request.onsuccess = function () {
		var name = this.result.name;
		reader.readAsArrayBuffer(this.result);
	}
	
	request.onerror = function () {
		console.warn('Unable to get the file: ' + this.error);
	}
	
}

var files = sdcard.enumerate();

// Loop through the kdbx files and create a list entry for each.
files.onsuccess = function(e) {
	var file = this.result;
	if (file != null && file.name.split('.').pop() === 'kdbx') {
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.href = '#';
		a.dataset.name = file.name.replace(/^.*[\\\/]/, '');
		var p = document.createElement('p');
		p.appendChild(document.createTextNode(a.dataset.name));
		a.appendChild(p);
		li.appendChild(a);

		// We'll list the kdbx files inside this element
		var container = document.getElementById('kdbx-files');
		container.appendChild(li);
		// Each entry has this event handler.
		a.addEventListener ('click', kdbxSelected);
	}
	this.done = false;

	if (!this.done) {
		this.continue();
	}
};

files.onerror = function() {
	console.log(this.error);
};

//file select
document.querySelector('#btn-open-file').addEventListener ('click', function () {
	document.querySelector('#select-file').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-select-file-back').addEventListener ('click', function () {
	document.querySelector('#select-file').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
});

//help
document.querySelector('#btn-help').addEventListener ('click', function () {
	document.querySelector('#help').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-help-back').addEventListener ('click', function () {
	document.querySelector('#help').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
});

//about
document.querySelector('#btn-about').addEventListener ('click', function () {
	document.querySelector('#about').className = 'current';
	document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-about-back').addEventListener ('click', function () {
	document.querySelector('#about').className = 'right';
	document.querySelector('[data-position="current"]').className = 'current';
});