window.onload=function(){
	let li = document.getElementsByClassName('xtitle')[0].getElementsByTagName('li');
	li[0].classList.add('xtitle-active');

	for(let i=0;i<li.length;i++){
		//addEvent;
		li[i].addEventListener('click',function(e){
			for(let j=0;j<li.length;j++){

				if(li[j].className.indexOf('xtitle-active')==0){
					li[j].classList.remove('xtitle-active');
					break;
				}
			}
			e.srcElement.classList.add('xtitle-active');
		});	
	}
}