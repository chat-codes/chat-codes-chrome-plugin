chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name == "GetChosenCodeMirrorText"){
        var codeMirrorContent='empty';

        document.addEventListener('GetContent', function (e){
            chrome.runtime.sendMessage({name: "initialPageInfo", detail: e.detail});
        });

        var s = document.createElement('script');
        s.src = chrome.extension.getURL('get_codemirror_script.js');
        (document.head||document.documentElement).appendChild(s);
        s.onload = function() {
            s.parentNode.removeChild(s);
        };       
    }


    if(request.name == "GetOldCodeAndShowNewCode"){
        var newContent = request.content;
        var oldContent='empty';

        document.addEventListener('GetContent', function (e){
            oldContent =e.detail.content;
            sendResponse({type: true, oldCodeMirrorText: oldContent});
        });

        var actualCode = [
        'var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");',
        'var oldContent;',
        'var newContent = ' + JSON.stringify(newContent) + ';',

        'Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement){',
            'codeMirrorEditor = codeMirrorElement.CodeMirror;',
            //if has focus
            'if(codeMirrorEditor.hasFocus()){',
             'oldContent = codeMirrorEditor.getValue();',
             //send content by Event
             'var event = new CustomEvent("GetContent", {detail: {content: oldContent}});',
             'codeMirrorEditor.setValue(newContent)',
             'document.dispatchEvent(event);',
            '}',
        '});'
        ].join('\n');

        var script = document.createElement('script');
        script.textContent = actualCode;
        (document.head||document.documentElement).appendChild(script);
        script.remove();
    }
});

 // var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");
 //        Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement){
 //            console.log(codeMirrorElement);
 //            codeMirrorEditor = codeMirrorElement.CodeMirror;
 //            var line = codeMirrorEditor.getValue();
 //            console.log(line);
 //        });



  // var actualCode = [
        // 'var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");',
        // 'var codeMirrorContent;',

        // 'Array.prototype.forEach.call(codeMirrorElementArray, function(codeMirrorElement){',
        //     'codeMirrorEditor = codeMirrorElement.CodeMirror;',
        //     //if has focus
        //     'if(codeMirrorEditor.hasFocus()){',
        //      'codeMirrorContent = codeMirrorEditor.getValue();',
        //      //send content by Event
        //      'var event = new CustomEvent("GetContent", {detail: {content: codeMirrorContent}});',
        //      'document.dispatchEvent(event);',
        //     '}',
        // '});'
        // ].join('\n');

        // var script = document.createElement('script');
        // script.textContent = actualCode;
        // (document.head||document.documentElement).appendChild(script);
        // script.remove();
