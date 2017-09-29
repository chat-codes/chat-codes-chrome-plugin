var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");

var detail = {
    hasEditor: (codeMirrorElementArray.length - 1) == 0 ? false : true,
    editorNumber: codeMirrorElementArray.length - 1,
    hasFocus: false,
    focusedEditorNumber: -1,
    content: '',
    pageTitle: document.title
};


console.log(codeMirrorElementArray);

//check which one is focused
for (var i = 0; i < detail.editorNumber; i++) {
    codeMirrorEditor = codeMirrorElementArray[i].CodeMirror;
    if (codeMirrorEditor.hasFocus()) {
        detail.hasFocus = true;
        detail.focusedEditorNumber = i;
        detail.content = codeMirrorEditor.getValue();
    }
}

//Set the first editor focus if User chose none
if (detail.hasEditor == true && detail.hasFocus == false) {
    codeMirrorEditor = codeMirrorElementArray[0].CodeMirror;
    codeMirrorEditor.focus();
    detail.hasFocus = true;
    detail.focusedEditorNumber = 0;
    detail.content = codeMirrorEditor.getValue();
}

//move the page
var rec = codeMirrorElementArray[detail.focusedEditorNumber].getBoundingClientRect();
window.scrollTo( rec.left + window.scrollX, rec.top + window.scrollY-123);

//highlight the window
codeMirrorElementArray[detail.focusedEditorNumber].style.backgroundColor = "rgb(234,236,239)";
setTimeout(function(){
    codeMirrorElementArray[detail.focusedEditorNumber].style.backgroundColor = 'white';
},1500)


var event = new CustomEvent("GetContent", {
    detail: detail
});
document.dispatchEvent(event);



// Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement) {
//     currentCodeMirrorNumber++;
//     var codeMirrorEditor = codeMirrorElement.CodeMirror;
//     //Wipe out one empty editor on target website
//     if (codeMirrorEditor.getValue() == "\n\n      ") {
//         detail.editorNumber--;
//         if (detail.editorNumber == 0) {
//             detail.hasEditor = false;
//         }
//     } else {
//         //if has focus
//         if (codeMirrorEditor.hasFocus()) {
//             detail.hasFocus = true;
//             detail.focusedEditorNumber = currentCodeMirrorNumber;
//             detail.content = codeMirrorEditor.getValue();
//         }
//     }
// });

// //default choosing the first codeMirrorEditor if no editor is focused
// if(detail.hasEditor==true && detail.hasFocus==false){
//     for(var i=0; i<codeMirrorElementArray.length; i++){
//         codeMirrorEditor = codeMirrorElementArray[i].CodeMirror;
//         if (codeMirrorEditor.getValue() != "\n\n      ") {
//             codeMirrorEditor.focus();
//             detail.hasFocus = true;
//             detail.focusedEditorNumber = currentCodeMirrorNumber;
//             detail.content = codeMirrorEditor.getValue();
//             break;
//         }
//     }
// }

// //scroll to the focused element