const dataURL = "https://api.myjson.com/bins/jcmhn";

const fields = ["var1","var2","var3","var4",
                "var5","var6","speach"]
let loadJSONStatus;

function showForm() {
	if(loadJSONStatus==true)
	{
		$("form").show();
		$("#result").text('');
		$("div.btnbox").hide();
	}
}

function handleButton(event) {
	loadJSONStatus = false;
	$("#result").text('');
	$.getJSON(dataURL, handleData);
	$("form").hide();
	event.preventDefault();
	setTimeout(function(){
		if(loadJSONStatus==false)
		{
			$("form").show();
			$("#result").text('Функция getJSON не получила данные JSON');
		}
		else
			$("div.btnbox").show();
	},2000);
}

function handleData(data, textStatus) {
	let message = '';
	let values = {};
	fields.forEach(function(field)
	{
		values[field]=$("input[name="+field+"]")[0].value
	});

	data.text.forEach(function(line, index)
	{
		for(key in values) {
			line=line.replace("{"+key+"}",values[key]);
		}
		if(index==data.text.length-1)
			line='"'+line+'".';
		else if((index!=data.text.length-2)&&
			(index!=data.text.length-3))
			line+='.';
		message+=line+"<br>";
	});
	$("#result").html(message);
	loadJSONStatus=true;
}

function init() {
	$("#button-fetch").click(handleButton);
	$("#button-reset").click(showForm);
}

$(document).ready(init);