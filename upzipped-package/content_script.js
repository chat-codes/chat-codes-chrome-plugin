chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.name == "GetChosenCodeMirrorText"){

        var codeMirrorContent='empty';

        document.addEventListener('GetContent', function (e){
            codeMirrorContent =e.detail.content;
            sendResponse({chosenCodeMirrorText: codeMirrorContent});
        });

        var actualCode = [
        'var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");',
        'var codeMirrorContent;',

        'Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement){',
            'codeMirrorEditor = codeMirrorElement.CodeMirror;',
            //if has focus
            'if(codeMirrorEditor.hasFocus()){',
             'codeMirrorContent = codeMirrorEditor.getValue();',
             //send content by Event
             'var event = new CustomEvent("GetContent", {detail: {content: codeMirrorContent}});',
             'document.dispatchEvent(event);',
            '}',
        '});'
        ].join('\n');

        var script = document.createElement('script');
        script.textContent = actualCode;
        (document.head||document.documentElement).appendChild(script);
        script.remove();
    }

    if(request.name == "ShowCode"){
        var content = request.content;
        //var setContentCode = 'var content = ' + JSON.stringify(content) + ';';
        //console.log(setContentCode);

        var actualCode = [
        'var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");',
        'var content = ' + JSON.stringify(content) + ';',

        'Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement){',
            'codeMirrorEditor = codeMirrorElement.CodeMirror;',
            'console.log("lol");',
            //if has focus
            'if(codeMirrorEditor.hasFocus()){',
             'codeMirrorContent = codeMirrorEditor.setValue(content);',
            '}',
        '});'
        ].join('\n');

        var script = document.createElement('script');
        script.textContent = actualCode;
        (document.head||document.documentElement).appendChild(script);
        sendResponse("Show Code Runs");
    }
});

 // var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");

 //        Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement){
 //            console.log(codeMirrorElement);
 //            codeMirrorEditor = codeMirrorElement.CodeMirror;
 //            var line = codeMirrorEditor.getValue();
 //            console.log(line);
 //        });
