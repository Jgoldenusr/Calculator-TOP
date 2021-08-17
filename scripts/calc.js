//Nodelist creation separated by use
let actionNodelist=document.querySelectorAll('*[data-button-type="action"]');
let numberNodelist=document.querySelectorAll('*[data-button-type="number"]');
let operatorNodelist=document.querySelectorAll('*[data-button-type="operator"]');
let historyLog=document.querySelector('.history-log');
let resultLog=document.querySelector('.result-log');
//some important variables
let firstOperand=0, secondOperand=0, operator, clear;
//main functions
function actionHandler(){
    let myAction=this.textContent;
    switch(myAction){
        case '<-':  if(firstOperand!==0&&resultLog.textContent!==""){
                        if(resultLog.textContent.length===1){
                            resultLog.textContent="";
                            firstOperand=0;
                        }
                        else{
                            resultLog.textContent=resultLog.textContent.substr(0, resultLog.textContent.length-1);
                            firstOperand=resultLog.textContent;
                        }
                    }
                    break;
        case 'CE':  resultLog.textContent="";
                    firstOperand=0;
                    break;
        case 'C':   resultLog.textContent="";
                    historyLog.textContent="";
                    firstOperand=0;
                    secondOperand=0;
                    operator=undefined;
                    break;
        case '+/-': if(firstOperand!==0&&resultLog.textContent!==""){
                        if(resultLog.textContent[0]==='-'){
                            resultLog.textContent=resultLog.textContent.substr(1);
                            firstOperand=resultLog.textContent;
                        }
                        else{
                            resultLog.textContent=`-${resultLog.textContent}`;
                            firstOperand=resultLog.textContent;
                        }
                    break;
        }
        case '(.)': if(firstOperand!==0&&resultLog.textContent!==""){
                        if(resultLog.textContent.includes('.')===false){
                            resultLog.textContent=`${resultLog.textContent}.`
                        }
                    }
                    break;              
    }
}
function numberHandler(){
    if(clear===true){
        resultLog.textContent="";
        clear=false;
    }
    if(resultLog.textContent.length<15){
        resultLog.textContent+=this.textContent;
        firstOperand=resultLog.textContent;
    }
}
function operatorHandler(){
    //cuando se aprieta =
    if(this.textContent==='='&&typeof operator!=='undefined'){
        if(firstOperand.length>10||firstOperand.toString.length>10){
            historyLog.textContent+=Number(firstOperand).toPrecision(5)+"=";
        }
        else{
            historyLog.textContent+=firstOperand+"=";
        }
        resultLog.textContent=doMath(secondOperand, operator, firstOperand).toString();
        firstOperand=resultLog.textContent;//??
        secondOperand=0;//??
        operator=undefined;
        clear=true;
        return; //firstOperand!=='undefined'&&secondOperand===0&&typeof operator==='undefined'
    }
    //cuando se presiona sin un segundo operando
    if(secondOperand===0&&firstOperand!==0&&this.textContent!=='='){
        operator=this.textContent;
        if(firstOperand.length>10||firstOperand.toString.length>10){
            historyLog.textContent=`${Number(firstOperand).toPrecision(5)}${operator}`;
        }
        else{
            historyLog.textContent=`${firstOperand}${operator}`;
        }
        secondOperand=firstOperand;
        firstOperand=0;
        clear=true;   
        return; //firstOperand===0&&typeof secondOperand!=='undefined'&&typeof operator!=='undefined'
    }
    //cuando hay ya un segundo operando
    if(firstOperand!==0&&this.textContent!=='='&&this.textContent!=='='){
        resultLog.textContent=doMath(secondOperand, operator, firstOperand).toString();
        secondOperand=resultLog.textContent;
        operator=this.textContent;
        firstOperand=0
        if(secondOperand.length>10||secondOperand.toString.length>10){
            historyLog.textContent=`${Number(secondOperand).toPrecision(5)}${operator}`;
        }
        else{
            historyLog.textContent=`${secondOperand}${operator}`;
        }
        clear=true;
        return; //firstOperand===0&&typeof secondOperand!=='undefined'&&typeof operator!=='undefined'    
    }
}    
function doMath(aFirstOperand, anOperator, aSecondOperator){
    let numericalFirstOperand=Number(aFirstOperand);
    let numericalSecondOperand=Number(aSecondOperator);
    let myResult;
    switch(anOperator){
        case '/':   if(numericalSecondOperand===0){
                        resultLog.textContent='ERROR'
                        historyLog.textContent="";
                        firstOperand=0;
                        secondOperand=0;
                        operator=undefined;
                        clear=true;
                        return;
                    }
                    myResult=numericalFirstOperand/numericalSecondOperand;
                    if(myResult.toString().length>10){
                        return myResult.toPrecision(5);
                    }
                    return myResult;
                    break;
        case '*':   myResult=numericalFirstOperand*numericalSecondOperand;
                    if(myResult.toString().length>10){
                        return myResult.toPrecision(5);
                    }
                    return myResult;
                    break;   
        case '-':   myResult=numericalFirstOperand-numericalSecondOperand;
                    if(myResult.toString().length>10){
                        return myResult.toPrecision(5);
                    }
                    return myResult;
                    break;      
        case '+':   myResult=numericalFirstOperand+numericalSecondOperand;
                    if(myResult.toString().length>10){
                        return myResult.toPrecision(5);
                    }
                    return myResult;   
                    break;            
    }
}
//event listeners
actionNodelist.forEach(aNode=>{aNode.addEventListener('click', actionHandler)});
numberNodelist.forEach(aNode=>{aNode.addEventListener('click', numberHandler)});
operatorNodelist.forEach(aNode=>{aNode.addEventListener('click', operatorHandler)});