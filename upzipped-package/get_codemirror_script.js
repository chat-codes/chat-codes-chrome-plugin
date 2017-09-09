//console.log(document.documentElement.getAttribute("xmlns") == "http://www.w3.org/1999/xhtml");

// if (document.documentElement.getAttribute("xmlns") == "http://www.w3.org/1999/xhtml") {
    var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");
    var detail = {
        hasEditor: codeMirrorElementArray.length == 0 ? false : true,
        editorNumber: codeMirrorElementArray.length,
        hasFocus: false,
        focusedEditorNumber: -1,
        content: ''
    };
    var currentCodeMirrorNumber = -1;

    Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement) {
        currentCodeMirrorNumber++;
        codeMirrorEditor = codeMirrorElement.CodeMirror;
        //Wipe out one empty editor on target website
        if (codeMirrorEditor.getValue() == "\n\n      ") {
            detail.editorNumber--;
            if (detail.editorNumber == 0) {
                detail.hasEditor = false;
            }
        } else {
            //if has focus
            if (codeMirrorEditor.hasFocus()) {
                detail.hasFocus = true;
                detail.focusedEditorNumber = currentCodeMirrorNumber;
                detail.content = codeMirrorEditor.getValue();
            }
        }
    });

    var event = new CustomEvent("GetContent", {
        detail: detail
    });
    document.dispatchEvent(event);
// }