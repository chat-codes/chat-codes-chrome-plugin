console.log("injected");
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        
        if(request.name == "SetWebInfo"){
            console.log("I get something!")
            var userName = request.userName;
            var channelName = request.channelName;
            var content = request.content;
            console.log(content);
            console.log(channelName);
            console.log(userName);
            var actualCode = [
                'var content = ' + JSON.stringify(content) + ';',
                'var channelName = ' + JSON.stringify(channelName) + ';',
                'var userName = ' + JSON.stringify(userName) + ';',

                'var event = new CustomEvent("SetWebInfo", {detail: {content: content, channelName:channelName, userName: userName}});',
                'document.dispatchEvent(event);',
                '}',
                '});',
                '}'
            ].join('\n');


            var script = document.createElement('script');
            script.textContent = actualCode;
            (document.head || document.documentElement).appendChild(script);
            script.remove();

            sendResponse({test: "get it"});
        }

        if (document.documentElement.getAttribute("xmlns") == "http://www.w3.org/1999/xhtml") {

            //Everytime pop up will run this
            if (request.name == "GetChosenCodeMirrorText") {
                var codeMirrorContent = 'empty';
                document.addEventListener('GetContent', function(e) {
                    sendResponse({
                        name: "initialPageInfo",
                        detail: e.detail
                    });
                });

                var s = document.createElement('script');
                s.src = chrome.extension.getURL('get_codemirror_script.js');
                (document.head || document.documentElement).appendChild(s);
                s.onload = function() {
                    s.parentNode.removeChild(s);
                };
            }

            //SearchUpButton do this
            if ( request.name == "SearchUp"){
                document.addEventListener('SearchUp', function(e) {
                    sendResponse({
                        name: "SearchUp",
                        detail: e.detail
                    });
                });

                var s = document.createElement('script');
                s.src = chrome.extension.getURL('search_up_script.js');
                (document.head || document.documentElement).appendChild(s);
                s.onload = function() {
                    s.parentNode.removeChild(s);
                };
            }

            //SearchDownButton do this
            if ( request.name == "SearchDown"){
                document.addEventListener('SearchDown', function(e) {
                    sendResponse({
                        name: "SearchDown",
                        detail: e.detail
                    });
                });

                var s = document.createElement('script');
                s.src = chrome.extension.getURL('search_down_script.js');
                (document.head || document.documentElement).appendChild(s);
                s.onload = function() {
                    s.parentNode.removeChild(s);
                };
            }


            if (request.name == "GetOldCodeAndShowNewCode") {
                var newContent = request.content;
                var oldContent = 'empty';

                document.addEventListener('GetContent', function(e) {
                    oldContent = e.detail.content;
                    sendResponse({
                        type: true,
                        oldCodeMirrorText: oldContent
                    });
                });

                var actualCode = [
                    'var codeMirrorElementArray = document.getElementsByClassName("cm-s-default");',
                    'var oldContent;',
                    'var newContent = ' + JSON.stringify(newContent) + ';',

                    'if (document.documentElement.getAttribute("xmlns") == "http://www.w3.org/1999/xhtml") {',
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
                    '});',
                    '}'
                ].join('\n');

                var script = document.createElement('script');
                script.textContent = actualCode;
                (document.head || document.documentElement).appendChild(script);
                script.remove();
            }

        }
        return true;
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