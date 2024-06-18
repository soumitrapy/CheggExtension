// var targetPath = "https://expert.chegg.com/qna/authoring/answer";
// var exitClassName = "sc-1eq90u-7 sc-1eq90u-11 ewQEum ggqCcO"; // to hide btn when exit is clicked
// var skipClassName="sc-1eq90u-7";
// var reasonSelect="q4pgtx-0 doeCPa";
// var desktopSubmit="sc-1eq90u-7 sc-1eq90u-8 DGwJN cJxbhG";

// skipbutton class=  "sc-1eq90u-7 sc-1eq90u-9 gFKTDR fvGdee"
// answerbutton class="sc-1eq90u-7 sc-1eq90u-8 gFKTDR fzOiQW"
// exitbutton class=  "sc-1eq90u-7 sc-1eq90u-11 AFSF hZXJHV"
// submitbutton class="sc-1eq90u-7 sc-1eq90u-11 DGwJN dYKOtu sc-kImNAt juIrVM"





//const skipclass = "sc-1eq90u-7 sc-1eq90u-9 gFKTDR fvGdee";
//const ansclass =  "sc-1eq90u-7 sc-1eq90u-8 gFKTDR fzOiQW";
//const exitclass = "sc-1eq90u-7 sc-1eq90u-11 AFSF hZXJHV";

const skipclass = "sc-1eq90u-9";
const ansclass = "sc-1eq90u-8";
const submitclass = "juIrVM";
let submitButton;
const waitingSeconds = 10;

// I can solve,but div      id = "skip-radio-box_A_015"  id="skip-radio-box_D_040"
// I cannot div     id = "skip-radio-box_A_016"
// the question violates div       id = "skip-radio-box_A_017"
// after that id = "skip_radio_label_0", "skip_radio_label_1" ...
// submit button id="modal-submit-button"

const sReason = "skip-radio-box_D_04";
const choice = "skip_radio_label_";
const map = {'j':0,'k':1, 'l':2,';':3,'f':4};
const rsnSubmit = "modal-submit-button";


function check(classname = skipclass){
    let bt = document.getElementsByClassName(classname);
    if(bt.length>0){
        console.log(`Yes! the buttoon class=\"${classname}\" is there`);
        return true;
        }
    else{
        console.log(`No! the buttoon class=\"${classname}\" is not there`);
        return false;
    } 
}

function notify(){
    console.log("Inside load eventListener");
    message = {type: 'notification',
               sound: true,
               options: {title: 'Question available',
                         message: 'v2',
                         type: 'basic',
                         iconUrl: 'data/chrome.png'}
                   };

    setTimeout(() => {
        if(check(skipclass))
        {
            console.log("message send");
            chrome.runtime.sendMessage('',message);
        }
    }, waitingSeconds*1000);
}
window.addEventListener("load", notify);



function select(e)
{
    console.log(e,e.key);
    if (document.getElementsByClassName(submitclass).length > 0){
        document.removeEventListener("keyup",select);
        console.log("keyup EventListener removed.");
        return;
    }
    if(!check()){
        return;
    }
    let k = e.key;
    console.log(`${k} pressed`);

    if(k === 'Enter'){
        let rsnSubmitBtn = document.getElementById(rsnSubmit);
        if(rsnSubmitBtn){
            rsnSubmitBtn.click();
            }
        return;
    }
    let ch = choice+String(map[k]);
    let rsn = sReason+String(String(map[k]));

    //for ease of use
    if(ch==="skip_radio_label_0"){
        ch = "skip_radio_label_4";}
    else if(ch==="skip_radio_label_4"){
        ch = "skip_radio_label_0";}


    let choiceBtn = document.getElementById(ch);
    let rsnBtn = document.getElementById(rsn);
    if(choiceBtn){
        choiceBtn.click();
        }
    else if(rsnBtn){
        rsnBtn.click();
        }
    else if(k==='j'){
        let skipBtn = document.getElementsByClassName(skipclass)[0];
        skipBtn.click();
        }
    else if(k==='k'){
        let ansButton = document.getElementsByClassName(ansclass)[0];
        ansButton.click();
        document.removeEventListener("keyup", select);
        setTimeout(() => {
            submitButton = document.getElementsByClassName(submitclass)[0];
            console.log(`submit button is ${submitButton}`);
        }, waitingSeconds*1000);
        submitButton.addEventListener("click", () => {console.log("keyup eventllistener added");document.addEventListener("keyup", select)});

    }
    else{
        console.log("No such case.");
    }

}
document.addEventListener("keyup", select);

// function cases(k){
//     if(k === 'Enter'){
//         let submitBtn = document.getElementById(rsnSubmit);
//         submitBtn.click();
//         return;
//     }
//     let ch = choice+String(map[k]);
//     let rsn = sReason+String(String(map[k]));

//     let choiceBtn = document.getElementById(ch);
//     let rsnBtn = document.getElementById(rsn);
//     if(choiceBtn){
//         choiceBtn.click();
//         }
//     else if(rsnBtn){
//         rsnBtn.click();
//         }
//     else if(k==='j'){
//         let skipBtn = document.getElementsByClassName(skipclass)[0];
//         skipBtn.click();
//         }
//     else if(k==='k'){
//         let ansButton = document.getElementsByClassName(ansclass)[0];
//         ansButton.click();
//         document.removeEventListener("keyup", select);
//         setTimeout(() => {
//             submitButton = document.getElementsByClassName(submitclass)[0];
//         }, waitingSeconds*1000);
//         submitButton.addEventListener("click", () => {document.addEventListener("keyup", select)});

//     }
// }



// window.addEventListener("click", function(event){
//     if(event.target.parentElement.parentElement.className == exitClassName){
//         document.getElementById("skip_extension_btn").style.visibility = "hidden";
//         return;
//     }
//     let currentPath = window.location.href;
//     // check for existence of skip btn using skip_extension_btn id
//     if(document.getElementById("skip_extension_btn") != null){
//         if(currentPath == targetPath){
//             document.getElementById("skip_extension_btn").style.visibility = "visible";
//         }else{
//             document.getElementById("skip_extension_btn").style.visibility = "hidden";
//         }
//     }else{
//         //never reach
//     }
// })

// window.addEventListener("keyup", function(event) {
//     if (event.key === "n" || event.key === " ") {
//         skip();
//     }
// });
// var i=1;
// //skip function
// function skip(){
// 		if(document.getElementsByClassName(skipClassName)[0]==null)///////////Skip Button
// 		{
// 			window.open("https://expert.chegg.com/expertqna","_self");
// 		}
// 		else
// 		{
// 			i=0;
// 		    document.getElementsByClassName(skipClassName)[0].click() // skip button
// 		    let skipOptions = document.getElementsByClassName(reasonSelect);
//             setTimeout(function(){
//                 skipOptions[skipOptions.length - 1].click() ;
//             },100);
//             setTimeout(function(){
//                 if (document.getElementsByClassName(desktopSubmit)[0])
//                     document.getElementsByClassName(desktopSubmit)[0].click()
//                 //else
//                 //    document.getElementsByClassName("sc-1eq90u-5 sc-1eq90u-6 jfgqtc ibrWOj")[0].click()///For Mobile
//             },350);
// 		}
// }
// setTimeout(function(){
// 	if(document.getElementsByClassName(skipClassName)[0]==null)
// 	{
// 		if(window.location.href==targetPath)
// 			window.open("https://expert.chegg.com/expertqna","_self");
// 	}
// 	else if(i==1)
// 	{
// 		i=0;
// 		var sound = new Audio();
// 		sound.src = "https://assets.mixkit.co/sfx/download/mixkit-arcade-retro-game-over-213.wav";
// 		sound.play();
// 	}
// },45000);