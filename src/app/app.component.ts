declare let chrome: any;
import { Component, Input, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { WebCommunicationService } from 'chat-codes-web/src/app/web-communication.service';
import { Location } from '@angular/common';
import { EditorDisplay } from 'chat-codes-web/src/app/editor/editor.component';
import { ChatInput } from 'chat-codes-web/src/app/chat-input/chat-input.component';
import { AceEditorModule } from 'ng2-ace-editor';
import {EditorStateTracker} from 'chat-codes-services/src/editor-state-tracker';
import * as _ from 'underscore';
import * as $ from 'jquery';
import * as showdown from 'showdown';
declare let ace: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.css', '../../node_modules/xterm/dist/xterm.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    ngOnInit() {}
    private message: String;
    @ViewChild('chatinput') private chatinput;
    editorCursorSelectionChanged(data) {
        this.chatinput.onEditorCursorSelectionChanged(data);
    }
    constructor() {
        setTimeout(function() {
            document.getElementById('width-controller').style.width = '400px';
        }, 50); 
    };
    public editorStateTracker;
    public commLayer: WebCommunicationService;
    private at_bottom: boolean = false;
    public getChatURL(): string {
        return 'chat.codes/' + this.channelName;
    };
    sendTextMessage(message: string): void {
        this.commLayer.sendTextMessage(message);
    };
    updateTypingStatus(status: string): void {
        this.commLayer.sendTypingStatus(status);
    };
    getActiveEditors() {
        return this.commLayer.getActiveEditors();
    };
    navBarChooseFile(data) {
        // console.log(data);
    }

    public createNewFile() {
        this.commLayer.ready().then(() => {
            const id: string = guid();
            const title: string = 'file-' + editorTitle;
            editorTitle++;
            this.commLayer.channelService.emitEditorOpened({
                id: id
            });
            const openDelta = {
                type: 'open',
                id: id,
                contents: '',
                grammarName: 'None',
                title: title,
                modified: false
            };
            this.commLayer.channelService.emitEditorChanged(openDelta);
        });
    };

    private userName: string = '';
    public hasName: boolean = false;
    public connected: boolean = false;
    private channelName: string = 'example_channel';
    @ViewChild('codeEditor') codeEditor;
    detail = {
        hasEditor: false,
        editorNumber: -1,
        hasFocus: false,
        focusedEditorNumber: -1,
        content: ''
    }
    channelGeneratedFlag = false;
    focusedEditorNumber;
    test() {
        this.channelGeneratedFlag = true;
        this.setName("userName", "emirates");
        this.setNewWebCommunicationService();
    }
    ngAfterContentInit() {}
    channelClick(data) {
        this.setDetail(data.detail);
        if (data.type == "GoToCreatedChannel") {
            this.channelGeneratedFlag = true;
            this.setName(data.userName, data.channelName);
            this.setNewWebCommunicationService();
        } else if (data.type == "CreatNewChannel") {
            var newURL = "http://localhost:4200/" + data.channelName;
            chrome.tabs.create({url: newURL,active: false}, function(tab1) {
                setTimeout(function(){
                	console.log("send message");
                	chrome.tabs.sendMessage(tab1.id, {
                      	name: "SetWebInfo",
                      	userName:data.userName,
                      	channelName: data.channelName,
                      	content: data.content
                    },(response)=>{
                      console.log(response);
                    });
                    chrome.tabs.update(tab1.id,{"active":true,"highlighted":true},function (tab){
                    });
            	},1000);
            });
            
        }
    }
    setName(userName, channelName): void {
        this.userName = userName;
        this.channelName = channelName;
    };
    setNewWebCommunicationService() {
        this.commLayer = new WebCommunicationService(this.userName, this.channelName);
        this.editorStateTracker = this.commLayer.getEditorStateTracker();
        this.commLayer.ready().then((channel) => {
            this.connected = true;
            // this.createNewEditorState();
        });
    }

    @ViewChild(EditorDisplay) editorDisplay: EditorDisplay;
    lastShownContent: String;
    showCode() {
        var codeContent = this.editorDisplay.getEditorInstance().getValue();
        this.chromeQueryGetOldCodeAndShowCode(codeContent);
    }
    undoShow() {
        if (this.lastShownContent) {
            var codeContent = this.lastShownContent;
            this.chromeQueryGetOldCodeAndShowCode(codeContent);
        }
    }
    chromeQueryGetOldCodeAndShowCode(codeContent: String) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                name: "GetOldCodeAndShowNewCode",
                content: codeContent
            }, (response) => {
                this.lastShownContent = response.oldCodeMirrorText;
            });
        });
    }
    searchUp() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                name: "SearchUp"
            }, (response) => {
                if (response.name == "SearchUp") {
                    console.log(response);
                    this.setDetail(response.detail);
                }
            });
        });
    }
    searchDown() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                name: "SearchDown"
            }, (response) => {
                if (response.name == "SearchDown") {
                    console.log(response);
                    this.setDetail(response.detail);
                }
            });
        });
    }
    setDetail(detail) {
        this.detail = detail;
        this.focusedEditorNumber = this.detail.focusedEditorNumber + 1;
    }
}
let editorTitle: number = 1;

function guid(): string {
    function s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
// import { ViewChild, Component, OnInit, AfterContentInit } from '@angular/core';
// import { WebCommunicationService } from 'chat-codes-web/src/app/web-communication.service';
// import { NameEntry } from 'chat-codes-web/src/app/name-entry/name-entry.component';
// import { EditorDisplay } from 'chat-codes-web/src/app/editor/editor.component';
// import { Location } from '@angular/common';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit{
//   ngOnInit() { }
//   @ViewChild('editor') editor;
//   private getDOMFlag: boolean = false;
//   private hasCodeMirrorFlag: boolean = false;
//   private codeMirrorText;

//   private hasName: boolean = false;
//   private connected: boolean = false;
//   private name;
//   channelName = 'example_channel';
//   @ViewChild(EditorDisplay) editorDisplay: EditorDisplay;
//   constructor(){

//     //For later
//     const channelName = Location.stripTrailingSlash(location.pathname.substring(1));
//     if (channelName) {
//       this.channelName = channelName;
//     }
//     //For testing
//     this.setName("Chrome");
//   }
// ngAfterContentInit() {
//   this.requestForCodeMirrorElement();
//   this.setAceEditorValue();
// }
//   private commLayer: WebCommunicationService;
//   setName(name: string): void {
//     this.hasName = true;
//     this.name = name;
//     this.commLayer = new WebCommunicationService(this.name, this.channelName);
//     this.commLayer.ready().then((channel) => {
//       this.connected = true;
//     });
//   };
// //for test
// requestForCodeMirrorElement(){
//   var response = {chosenCodeMirrorText: "<!-- Create a simple CodeMirror instance -->"};
//   this.getDOMFlag = true;
//   if(response !== undefined){
//     this.hasCodeMirrorFlag = true;
//     this.codeMirrorText = response.chosenCodeMirrorText;
//   }
// }
//   setAceEditorValue(){
//     var editor = this.editorDisplay.editor.getEditor();
//     editor.setValue(this.codeMirrorText);
//   }
//   // //for chrome
//   // requestForCodeMirrorElement(){
//   //   chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//   //     this.getDOMFlag = true;
//   //     chrome.tabs.sendMessage(tabs[0].id, {name: "GetChosenCodeMirrorText"}, (response) => {
//   //       if(response !== undefined){
//   //         this.hasCodeMirrorFlag = true;
//   //         this.codeMirrorText = response.chosenCodeMirrorText;
//   //         console.log(this.codeMirrorText);
//   //       }
//   //     });
//   //   });
//   // }
// }