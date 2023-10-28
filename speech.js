window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
var fileName = location.href.split("/").slice(-1); 
recognition.addEventListener('result', (e)=> {
	const text = Array.from(e.results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join('');
	console.log(text);
	selectPage(fileName,text);
});
recognition.start();

function selectPage(fileName,text){
	if((fileName == 'index.html' || fileName == '' ) && text.includes("taco")){
		location.href='selected.html';
	}

	if(fileName == 'selected.html'){
		location.href='more.html';
	}

	if(fileName == 'more.html' && 
		(
			text.includes("complete") ||
			text.includes("done")
		)){
			location.href='complete.html';
	}

	if(fileName == 'more.html' && 
		(
			text.includes("add") ||
			text.includes("not") ||
			text.includes("need")
		)){
			location.href='selected.html';
	}

}