var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");
var detail = {
    hasEditor: codeMirrorElementArray.length==0 ? false : true,
    editorNumber: codeMirrorElementArray.length,
    hasFocus: false,
    focusedEditorNumber: -1,
    content: ''
};
var currentCodeMirrorNumber = -1;

Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement) {
    currentCodeMirrorNumber++;
    codeMirrorEditor = codeMirrorElement.CodeMirror;
    //if has focus
    if (codeMirrorEditor.hasFocus()) {
        detail.hasFocus = true;
        detail.focusedEditorNumber = currentCodeMirrorNumber;
        detail.content = codeMirrorEditor.getValue();
    }
});

var event = new CustomEvent("GetContent", {
    detail: detail
});
document.dispatchEvent(event);