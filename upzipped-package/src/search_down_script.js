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
    codeMirrorEditor = codeMirrorElementArray[i].CodeMirror;
    if (codeMirrorEditor.hasFocus()) {
        detail.hasFocus = true;
        //search down
        // console.log(i);
        if(i<detail.editorNumber-1){
            detail.focusedEditorNumber = i+1;
        }else{
            detail.focusedEditorNumber = i;
        }
        // console.log(i<detail.editorNumber-1);
        // console.log(detail.focusedEditorNumber);
    }
}

//get content
codeMirrorEditor = codeMirrorElementArray[detail.focusedEditorNumber].CodeMirror;
codeMirrorEditor.focus();
detail.content = codeMirrorEditor.getValue();

// console.log(detail.content);

//move the page
var rec = codeMirrorElementArray[detail.focusedEditorNumber].getBoundingClientRect();
window.scrollTo( rec.left + window.scrollX, rec.top + window.scrollY-123);



// console.log(detail);
var event = new CustomEvent("SearchDown", {
    detail: detail
});
document.dispatchEvent(event);
