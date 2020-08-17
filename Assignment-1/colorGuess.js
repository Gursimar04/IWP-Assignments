var squares= document.querySelectorAll(".option")
var textDisplay=document.getElementById("rgbCol")
var message= document.querySelector("#result")
var h= document.querySelector("h1")
var replay=document.querySelector("#reset") 
var modeButton=document.querySelectorAll(".selectionMode")
var pr= document.querySelector("#score")
var sc= document.querySelector("#sc")
var liv= document.querySelector("#liv")
var game=document.querySelector("#plays")

var ans=0;

var practice=0
var score=0
var life=6
var numSq=6
var colorList= []
var picked
var randomRed, randomGreen, randomBlue

init();

function init(){
	setUpSquares()
	setUpModes()	
	redo()
}

pr.addEventListener("click",function(){
	if(practice===0 || life!==0){
		sc.style.color="steelblue"
		liv.style.color="steelblue"
		this.classList.toggle("levelSelect")
		score=0,life=6
		if(!this.classList.contains("levelSelect")){
			practice=1
			sc.textContent="Score: "+ score
			liv.textContent="Lives: "+life
		}
		else{
			practice=0
			sc.textContent=""
			liv.textContent=""
		}
		if(modeButton[2].classList.contains("levelSelect"))
				extremelevel()
			else	
				redo()
	}	
})

function setUpSquares(){

		for(var i=0; i< squares.length;i++)
		{
			squares[i].addEventListener("click",function(){
				if(practice===0 || life!==0)
				{
					var clickedCol= this.style.backgroundColor;
					if(clickedCol===picked)
					{
						if(!pr.classList.contains("levelSelect")&&ans==0){
							ans=1;
							score++;
							sc.textContent="Score: "+ score
						}
						message.textContent="Correct!";
						answerFound(clickedCol)
						h.style.backgroundColor=clickedCol
						replay.textContent="Play Again"
					}

					else
					{
						if(!pr.classList.contains("levelSelect")){
							life--;
							liv.textContent="Lives: "+life
							if(life==0&&practice==1){
								liv.style.color="red"
								sc.style.color="green"
								replay.classList.add("re")
								replay.textContent="Reset"

							}
						}
						this.style.backgroundColor= "#232323";
						message.textContent="Try again";
					}
				}	
			})
		}
	
}

function setUpModes(){

		for(var i=0; i< modeButton.length; i++){
			modeButton[i].addEventListener("click",function(){

				if(practice===0 || life!=0)
				{
					if(practice==1){
						life=6;score=0;
					liv.textContent="Lives:"+life
					sc.textContent="Score:"+score
					}
					modeButton[0].classList.remove("levelSelect");
					modeButton[1].classList.remove("levelSelect");
					modeButton[2].classList.remove("levelSelect");
					
					this.classList.add("levelSelect");
					numSq=(this.textContent === "Easy")? 3 : 6
					
					if(this.textContent === "Extreme")
						extremelevel()
					else{
						 	redo()
					}
				}
			})
		}

}

function redo()
{
	if(practice===0 || life!=0)
	{
		ans=0;
		h.style.backgroundColor="steelblue"
		message.textContent=""
		colorList=generateColors(numSq)
		picked=randomSelector();
		textDisplay.textContent = picked;

		replay.textContent="New Colors"

		for(var i=0;i<squares.length;i++)
		{
			if(colorList[i]){
				squares[i].style.display="block"
				squares[i].style.backgroundColor=colorList[i]
			}
			else{
				squares[i].style.display="none"
			}
		}
	}

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

replay.addEventListener("click",async function(){

	if(practice===1 && life===0)
	{

		this.classList.remove("re")
		score=0,life=6
		sc.textContent="Score: "+ score
		liv.textContent="Lives: "+life
		liv.style.color="steelblue"
		sc.style.color="steelblue"
	}

	animatingSq()
	await sleep(550)
	animatingSq()
	await sleep(550)
	animatingSq()
	await sleep(550)

	if(modeButton[2].classList.contains("levelSelect"))
		extremelevel()
	else{	
			redo()
	}
})
function animatingSq(){
	colorList=generateColors(numSq)
	for(var i=0;i<squares.length;i++)
		{
			if(colorList[i]){
				squares[i].style.display="block"
				squares[i].style.backgroundColor=colorList[i]
			}
			else{
				squares[i].style.display="none"
			}
		}

}

function answerFound(color){
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.backgroundColor=color
	}
}

function randomSelector()
{
	let random=Math.floor(Math.random()* colorList.length)
	return colorList[random]
}

function generateColors(len){
	let arr=[]
	for(var i=0;i<len;i++){
		arr.push(randomColors())
	}
	return arr;
}

function randomColors() {
	randomRed=Math.floor(Math.random()* 256)
	randomGreen=Math.floor(Math.random()* 256)
	randomBlue=Math.floor(Math.random()* 256)

	let target= "rgb("+ randomRed + ", " + randomGreen + ", " + randomBlue + ")"
	return target
}


function extremelevel(){
	ans=0;
	if(practice===0 || life!=0)
	{
		h.style.backgroundColor="steelblue"
		message.textContent=""
		picked=randomColors()
		colorList=generateExtreme()
		textDisplay.textContent = picked;

		replay.textContent="New Colors"

		for(var i=0;i<squares.length;i++)
		{
			squares[i].style.display="block"
			squares[i].style.backgroundColor=colorList[i]
		}
	}
}

function generateExtreme()
{
		let arr= [0,0,0,0,0,0]
		let selected= Math.floor(Math.random()*6)
		arr[selected]= picked

		let Lvals= [randomRed-40,randomGreen-40,randomBlue-40]
		let Hvals= [randomRed-10,randomGreen-10,randomBlue-10]

		let Hvals1= [randomRed+40,randomGreen+40,randomBlue+40]
		let Lvals1= [randomRed+10,randomGreen+10,randomBlue+10]
		for(let i=0;i<3;i++)
		{
			if(Lvals[i]<0)
				Lvals[i]=0
			if(Hvals[i]<20)
				Hvals[i]=20

			if(Lvals1[i]>234)
				Lvals[i]=234
			if(Hvals[i]>255)
				Hvals[i]=255
		}

		for(let i=0;i<6;i++)
		{
			if(i===selected)
				continue

			let extremeRed= (Math.floor(Math.random()*2)===0)? Math.floor(Math.random() * (Hvals[0] - Lvals[0]) + Lvals[0]) : Math.floor(Math.random() * (Hvals1[0] - Lvals1[0]) + Lvals1[0])
			let extremeGreen= (Math.floor(Math.random()*2)===0)?  Math.floor(Math.random() * (Hvals[1] - Lvals[1]) + Lvals[1]) : Math.floor(Math.random() * (Hvals1[0] - Lvals1[0]) + Lvals1[0])
			let extremeblue= (Math.floor(Math.random()*2)===0)?  Math.floor(Math.random() * (Hvals[2] - Lvals[2]) + Lvals[2]) : Math.floor(Math.random() * (Hvals1[0] - Lvals1[0]) + Lvals1[0])
			let target= "rgb("+ extremeRed + ", " + extremeGreen + ", " + extremeblue + ")"

			arr[i]=target
		}
		return arr


}