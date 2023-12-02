
function AddToOrder(obj,key,item){
	var objectLength = Object.keys(obj).length+1;
	//obj = Object.assign({key:item}, obj);
	obj[key] = item;
	return obj;
}
/*
var order = {
        "restaurant" : 'mcdonalds',
        "1" : 'Big Mac',
        "2" : 'Apple Pie',
        "3" : 'Mc double'
       }
*/
function Serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

//usage example: var tech = GetURLParameter('menuitem');
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}


function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');                        
            vars[hash[0]] = hash[1];
    }
    return vars;
}


//create order object for each page when loaded.
var url_vars = getUrlVars();
var order = {};
for(var i in url_vars){
	order = {...order, i:url_vars[i]};
	console.log('{order} '+i+':'+url_vars[i]);
	var pageMore = location.href.split("/").slice(-1);
	pageMore = String(pageMore).slice(0,9);
	if(pageMore == "more.html"){
		var iDiv = document.createElement('div');
		iDiv.id = 'block';
		iDiv.className = 'block';
		iDiv.innerHTML = url_vars[i];
		//document.getElementById('orderlist').appendChild(iDiv);		
	}
}



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
	if(fileName == '' || String(fileName).slice(0,10) == 'index.html'){
		if(text.includes("McDonald's")){
			serializeOrder = voiceEvent('mcdonalds',"restaurant");
		}
		if(text.includes("wendy's")){
			serializeOrder = voiceEvent('mcdonalds',"restaurant");
		}
		if(text.includes("king")){
			serializeOrder = voiceEvent('mcdonalds',"restaurant");
		}
		if(text.includes("taco")){
			serializeOrder = voiceEvent('mcdonalds',"restaurant");
		}
		location.href='selected.html?'+serializeOrder;
	}

	if(String(fileName).slice(0,13) == 'selected.html'){
		var restaurant = order.restaurant;
		var orderLength = Object.keys(order).length;

		if(text.includes("crunchy")){
			serializeOrder = voiceEvent("item"+orderLength,"Crunchy #1");
		}
		if(text.includes("soft")){
			serializeOrder = voiceEvent("item"+orderLength,"Crunchy #1");
		}
		if(text.includes("creamy")){
			serializeOrder = voiceEvent("item"+orderLength,"Crunchy #1");
		}
		if(text.includes("popular")){
			serializeOrder = voiceEvent("item"+orderLength,"Crunchy #1");
		}
		console.log(serializeOrder);
		location.href='more.html?'+serializeOrder;

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
			text.includes("need")||
			text.includes("change")||
			text.includes("modify")
		)){
			location.href='selected.html';
	}
	return false;

}


function selectPageClick(fileName,serializeOrder){
	if((fileName == 'index.html' || fileName == '' || String(fileName).slice(0,10) == 'index.html')){
		location.href='selected.html?'+serializeOrder;
	}

	if(String(fileName).slice(0,13) == 'selected.html'){
		location.href='more.html?'+serializeOrder;
	}

	if(fileName == 'more.html'){
		location.href='complete.html?'+serializeOrder;
	}

}

function voiceEvent(key,id){
	var eventStr = id;
	console.log("voice added to order "+eventStr+" with key "+key);
	order = AddToOrder(order,key,eventStr);
	var serializeOrder = Serialize(order);
	return serializeOrder;
}


function clickEvent(){
	var eventStr = this.id;
	var key = this.getAttribute("key");
	console.log("added to order "+eventStr+" with key "+key);
	order = AddToOrder(order,key,eventStr);
	var serializeOrder = Serialize(order);
	selectPageClick(fileName,serializeOrder);
	return false;
}

//https://aaronx819.github.io/aaronproject/index.html project link