

/*存放最终选择的影响因素的name的数组,已排序*/
var sortFactorsArray=[];
addEvent(document.getElementById('sortFactors'),'click',function(event){
	var sortFactorsInput=document.getElementById('sortFactors').getElementsByTagName('input');
	var tar=event.target||event.srcElement;

	//解决label标签 触发两次点击事件的bug
	if(tar.nodeName.toLowerCase()=='label'){
		return;
	}
	this.style.borderWidth='0px';
	for(var i=0;i<sortFactorsInput.length;i++){
		sortFactorsInput[i].value="-2";
		sortFactorsInput[i].removeAttribute('disabled');
	}
	if(tar.nodeName.toLowerCase()=='input'){
		//同时满足已选择项为三个并且此次点击的为之前未选择项条件时再把为选的多选项设置为禁用
		if(sortFactorsArray.length>=3&&tar.checked==true){
			alert('您已经选择了3项！')
			tar.checked=false;//设置此次选择无效
			for(var i=0;i<sortFactorsInput.length;i++){
				if(sortFactorsInput[i].checked==false){
					sortFactorsInput[i].setAttribute('disabled','');
				}
			}
		}else{
			if(tar.checked==true){
				sortFactorsArray.push(tar.name);//已选择项push进数组
			}else if(tar.checked==false){
				sortFactorsArray.removeByValue(tar.name);//选择后又删除的项也从数组中移除
				getSibling(tar).innerHTML='';
			}else{
			}
		}
	}else{
	}
	//计数
	document.getElementById('totalFactor1').innerHTML=sortFactorsArray.length;
	//实时添加序号
	for(var i=0;i<sortFactorsInput.length;i++){
		var loca=sortFactorsArray.indexOf(sortFactorsInput[i].name);

		if(loca!=-1){
			var orderSpan=getSibling(sortFactorsInput[i]);
			var nowNum=loca+1;
			orderSpan.innerHTML=nowNum;
			sortFactorsInput[i].value=nowNum;
		}
	}


});

//character计数器
var count=0;
addEvent(document.getElementById('character'),'click',function(event){
	var tar=event.target||event.srcElement;
	if(tar.nodeName.toLowerCase()=='label'){
		return;
	}
	document.getElementById('characters').style.borderWidth='0px';
	var characterInput=this.getElementsByTagName('input');
	for(var i=0;i<characterInput.length;i++){
		characterInput[i].removeAttribute('disabled');
	}
	if(count>=4&&tar.checked==true){
		alert('您已经选择了4项！');
		tar.checked=false;
		for(var i=0;i<characterInput.length;i++){
			if(characterInput[i].checked==false){
				characterInput[i].setAttribute('disabled','');
			}
		}
	}else{
		if(tar.checked==true){
			count++;
		}else if(tar.checked==false){
			count--;
		}else{
		}
	}

	document.getElementById('totalFactor2').innerHTML=count;
});



//验证表单提交
addEvent(document.getElementById('btn1'),'click',function(event){
	if(sortFactorsArray.length==0){
		document.getElementById('locate1').click();
		document.getElementById('sortFactors').style.borderWidth='1px';
		document.getElementById('sortFactors').style.borderStyle='solid';
		document.getElementById('sortFactors').style.borderColor='#DC3522';
		event.preventDefault();
		return false;
	}
	if(count==0){
		document.getElementById('locate2').click();
		document.getElementById('characters').style.borderWidth='1px';
		document.getElementById('characters').style.borderStyle='solid';
		document.getElementById('characters').style.borderColor='#DC3522';
		event.preventDefault();
		return false;
	}
});

//进度条以及处理题目之间的关联关系

addEvent(document.body,'click',function(event){
	var compeleCount=0;
	var checkBoxMark1=true;
	var checkBoxMark2=true;
	var tar=event.target||event.srcElement;
	if(tar.nodeName.toLowerCase()=='label'){
		return;
	}
	//处理题目之间的关联关系
	if(document.getElementById('four2').checked==true||document.getElementById('four3').checked==true||document.getElementById('four4').checked==true){
		document.getElementById('beWork').style.display='list-item';
		var inputWork=document.getElementById('beWork').getElementsByTagName('input');
		for(var i=0;i<inputWork.length;i++){
			inputWork[i].required='required';
		}
	}else{
		document.getElementById('beWork').style.display='none';
		var inputWork=document.getElementById('beWork').getElementsByTagName('input');
		for(var i=0;i<inputWork.length;i++){
			inputWork[i].required=false;
		}
	}
	var radioElements=getElementsByClassName('radio');
	//判断复选框是否选中
	if(sortFactorsArray.length!=0&&checkBoxMark1){
		checkBoxMark1=false;
		compeleCount++;
	}
	if(sortFactorsArray.length==0&&!checkBoxMark1){
		checkBoxMark1=true;
		compeleCount--;
	}
	if(count!=0&&checkBoxMark2){
		checkBoxMark2=false;
		compeleCount++;
	}
	if(count==0&&!checkBoxMark2){
		checkBoxMark2=true;
		compeleCount--;
	}
	for(var i=0;i<radioElements.length;i++){
		var radioInputs=radioElements[i].getElementsByTagName('input');
		for(var j=0;j<radioInputs.length;j++){
			if(radioInputs[j].checked==true){
				compeleCount++;
			}
		}
	}
	if(getStyle(document.getElementById('beWork'),'display')=='list-item'){
		var percent=compeleCount/18*100;
		var percentFixed=percent.toFixed(2);
	}else{
		var percent=compeleCount/17*100;
		var percentFixed=percent.toFixed(2);
	}

	document.getElementById('completeNumber').innerHTML=percentFixed+'%';
	document.getElementById('inner').style.height=percentFixed/100*200+'px';
});


//从数组删除指定值元素
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}

//事件监听
function addEvent(obj,event,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+event,fn);
	}else{
		obj.addEventListener(event,fn,false);
	}
}

//获取兄弟节点
function getSibling(node){
	var n=node.nextSibling;
	while(n&&n.nodeType!=1){//
		n=n.nextSibling;
	}
	return n;
}
//通过class获取元素
function getElementsByClassName(className){
	var wholeObj=document.getElementsByTagName('*');
	var resultObj=[];
	var temp=[];
	for(var i=0;i<wholeObj.length;i++){
		temp=wholeObj[i].className.split(' ');
		for(var j=0;j<temp.length;j++){
			if(temp[j]==className){
				resultObj.push(wholeObj[i]);
			}
		}
	}
	return resultObj;
}

//获取样式
function getStyle(obj,sty){
	if(obj.currentStyle){
		return obj.currentStyle[sty];
	}else{
		return getComputedStyle(obj,null)[sty];
	}
}
