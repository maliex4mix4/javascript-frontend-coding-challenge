import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';


// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));
new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});


document.getElementById('gh-user').addEventListener("input", function (e){
	var search_text = e.target.value;

	function autocomplete(_data){
		const _elem = document.getElementById('gh-user-result');
		_elem.style.display = 'block';
		for (var i = 0; i < _data.length; i++) {
			var node = document.createElement("div");
			node.setAttribute("id", _data[i].login);
			node.innerHTML = _data[i].login;
			node.onclick = function () {
				console.log(_data[i].login);
			};
			_elem.appendChild(node);
		}
	}

	const url = 'https://api.github.com/search/users?q='+search_text+'&per_page=60';

	fetch(url)  
	  .then(  
	    function(response) {  
	      if (response.status !== 200) {  
	        console.warn('Looks like there was a problem. Status Code: ' + 
	          response.status);  
	        return;  
	      }

	      // Examine the text in the response  
	      response.json().then(function(data) {  
	    	const total_count = data['total_count'];
	    	const auto_data = data['items'];
	    	console.log(auto_data);
	    	autocomplete(auto_data);
	      });  
	    }  
	  )  
	  .catch(function(err) {  
	    console.error('Fetch Error -', err);  
	});
});
