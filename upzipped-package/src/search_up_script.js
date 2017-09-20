var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");

var detail = {
    hasEditor: (codeMirrorElementArray.length - 1) == 0 ? false : true,
    editorNumber: codeMirrorElementArray.length - 1,
    hasFocus: false,
    focusedEditorNumber: -1,
    content: ''
};


console.log(codeMirrorElementArray);

//check which one is focused
for (var i = 0; i < detail.editorNumber; i++) {
    codeMirrorElementArray[i].style.backgroundColor = 'white';
    codeMirrorEditor = codeMirrorElementArray[i].CodeMirror;
    if (codeMirrorEditor.hasFocus()) {
        detail.hasFocus = true;
        //search up
        if(i>0){
            detail.focusedEditorNumber = i-1;
        }else{
            detail.focusedEditorNumber = i;
        }
    }
}

//get content
codeMirrorEditor = codeMirrorElementArray[detail.focusedEditorNumber].CodeMirror;
codeMirrorEditor.focus();
detail.content = codeMirrorEditor.getValue();


//move the page
var rec = codeMirrorElementArray[detail.focusedEditorNumber].getBoundingClientRect();
window.scrollTo( rec.left + window.scrollX, rec.top + window.scrollY-123);

//highlight
codeMirrorElementArray[detail.focusedEditorNumber].style.backgroundColor = "rgb(234,236,239)";
setTimeout(function(){
    codeMirrorElementArray[detail.focusedEditorNumber].style.backgroundColor = 'white';
    console.log("set");
},1500)


// console.log(detail);
var event = new CustomEvent("SearchUp", {
    detail: detail
});
document.dispatchEvent(event);
