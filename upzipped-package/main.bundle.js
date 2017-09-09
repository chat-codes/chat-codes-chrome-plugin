webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html{\n  width: 410px;\n}\n\n.jumbotron-fluid {\n  padding-top: 5px;\n  padding-bottom: 5px;\n  background: rgb(234,236,239);\n  \n}\n\n#width-controller{\n\twidth: 400px;\n  /*box-shadow: 0px 0px 10px #888888;*/\n}\n\n#showcode-button-container{\n\ttext-align:right;\n\tmargin-bottom: 1px;\n}\n\n#undoshow-button-container{\n\ttext-align:right;\n}\n\n#channel-name-container{\n\tmargin-top: 3px;\n}\n\n#channel-name-text{\n\t\n}\n\n#list_row {\n\n}\n\n#code-editor-row{\n\theight: 300px;\n\t-webkit-box-flex: 1;\n\t    -ms-flex-positive: 1;\n\t        flex-grow: 1;\n}\n\n#chat-messages-row{\n\t-webkit-box-flex: 1;\n\t    -ms-flex-positive: 1;\n\t        flex-grow: 1;\n}\n\n#chat-input-row{\n\theight: 48px;\n\tmargin-bottom: 5px;\n}\n\n\n.remoteCursor {\n    position: absolute;\n    z-index: 5;\n    opacity: 0.3;\n}\n\n.remoteCursor.user-1 { background-color: #007bff; }\n.remoteCursor.user-2 { background-color: #dc3545; }\n.remoteCursor.user-3 { background-color: #fd7e14; }\n.remoteCursor.user-4 { background-color: #ffc107; }\n.remoteCursor.user-5 { background-color: #28a745; }\n\n.remoteCursor.carret.user-1 { border-left-color: #007bff; }\n.remoteCursor.carret.user-2 { border-left-color: #dc3545; }\n.remoteCursor.carret.user-3 { border-left-color: #fd7e14; }\n.remoteCursor.carret.user-4 { border-left-color: #ffc107; }\n.remoteCursor.carret.user-5 { border-left-color: #28a745; }\n\n.remoteCursor.carret {\n    position: absolute;\n    border-left-width: 2px;\n    border-left-style: solid;\n    z-index: 6;\n    opacity: 0.9;\n}\n\n\n.d2h-diff-table {\n    position: relative;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<!-- <div>\n    <name-channel-entry *ngIf=\"!hasName\" (channelOnEnter)=\"setName($event)\"></name-channel-entry>\n</div> -->\n<!-- <div>\n    <channel-entry *ngIf=\"!hasName && !hasChannelName\" (onEnter)=\"setChannelName($event)\"></channel-entry>\n</div> -->\n<!-- <div *ngIf=\"!detail.hasEditor && hasName\">\n    <h1>Has No CodeMirror Editor In This Page...</h1>\n</div>\n<div *ngIf=\"detail.hasEditor && !detail.hasFocus && hasName\">\n    <h1>Selected No CodeMirror Editor...</h1>\n</div> -->\n\n<div class=\"jumbotron-fluid\" *ngIf=\" hasName \">\n    <div *ngIf='!channelGeneratedFlag' class=\"container-fluid\" id=\"width-controller\" >\n        <welcome-page></welcome-page>\n    </div>\n    \n    <div *ngIf='channelGeneratedFlag' class=\"container-fluid\" id=\"width-controller\">\n        <div class=\"row\" id=\"first-Row\">\n            <div class=\"col-8\" id = \"channel-name-container\">\n                <div id=\"content channel-name-text\">Channel: {{channelName}}</div>\n            </div>\n            <div class=\"col-4\" id = \"showcode-button-container\">\n                <button class='btn btn-secondary btn-sm'(click)=\"showCode()\">ShowCode</button>\n            </div>\n        </div>\n        <div class=\"row\" id=\"second-Row\">\n            <div class=\"col-8\">\n                Members:<i class='member' *ngFor=\"let user of commLayer.userList.activeUsers\">\n                <user-display [user]='user'></user-display>\n                </i>\n            </div>\n            <div class=\"col-4\" id = \"undoshow-button-container\">\n                <button class='btn btn-secondary btn-sm' (click)=\"undoShow()\">UndoShow</button>\n            </div>\n        </div>\n        <div class=\"row\" id=\"third-Row\">\n            <div class=\"col-12\">\n                <p *ngIf=\"!detail.hasEditor\">This page has no CodeMirror Editor</p>\n                <p *ngIf=\"detail.hasEditor\">This page has {{detail.editorNumber}} CodeMirror Editors</p>\n                <p *ngIf=\"detail.hasEditor && !detail.hasFocus\">You are choosing no editor</p>\n                <p *ngIf=\"detail.hasEditor && detail.hasFocus\">You are choosing editor No.{{detail.focusedEditorNumber+1}}</p>\n            </div>\n        </div>\n        <div class=\"row\" id=\"list-row\">\n            <div class=\"col-12\">\n                <ul class='files nav nav-tabs'>\n                    <li class='nav-item' *ngFor=\"let editorState of getActiveEditors()\">\n                        <a [ngClass]=\"{'active': editorState.selected}\" class='nav-link' href='javascript:void(0);'\n                            (click)=\"codeEditor.selectFile(editorState)\">\n                            {{editorState.getTitle()}}\n                            <span class='modifiedFlag' [ngClass]=\"{'modified':editorState.getIsModified()}\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"row\" id=\"code-editor-row\">\n            <div class=\"col-12\" >\n                <code-editor [commLayer]='commLayer'\n                (cursorSelectionChanged)='editorCursorSelectionChanged($event)' #codeEditor></code-editor>\n            </div>\n        </div>\n        <div class=\"row\" id=\"chat-messages-row\">\n            <div class=\"col-12\">\n                <chat-messages [commLayer]='commLayer' [editor]='codeEditor'></chat-messages>\n            </div>\n        </div>\n        <div class=\"row\" id='chat-input-row'>\n            <div class=\"col-12\">\n                <chat-input  [message]=\"message\" (send)='sendTextMessage($event)'\n                (typing)='updateTypingStatus($event)'  #chatinput></chat-input>\n            </div>\n        </div>\n        \n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chat_codes_web_src_app_web_communication_service__ = __webpack_require__("../../../../chat-codes-web/src/app/web-communication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chat_codes_web_src_app_editor_editor_component__ = __webpack_require__("../../../../chat-codes-web/src/app/editor/editor.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent() {
        this.detail = {
            hasEditor: false,
            editorNumber: -1,
            hasFocus: false,
            focusedEditorNumber: -1,
            content: ''
        };
        this.channelGeneratedFlag = false;
        this.at_bottom = false;
        this.hasName = false;
        this.connected = false;
        this.members = false;
        this.channelName = 'example_channel';
        this.setName({ userValue: "remote", channelValue: 123 });
    }
    // chatinputMessageChanged(message):void{
    //   this.message = message;
    // }
    AppComponent.prototype.editorCursorSelectionChanged = function (data) {
        this.chatinput.onEditorCursorSelectionChanged(data);
        // var startRow = data.newRange.start[0]; var startCol = data.newRange.start[1];
        // var endRow = data.newRange.end[0]; var endCol = data.newRange.end[1];
        // if( startRow==endRow && startCol==endCol ){
        //   var message = this.getTypeMessage(this.message);
        //   if(message == "This is a link!"){
        //     this.message = undefined
        //   }else{
        //     this.message = message;
        //   }
        // }else{
        //   this.message = this.getTypeMessage(this.message);
        // //   console.log(this.getActiveEditors());
        //   var messageTemp = "["+this.message+"]("+this.getOpenFileTitle()+":L"+startRow+","+startCol+"-L"+endRow+","+endCol+")";
        //   this.message = messageTemp;
        // }
    };
    // getTypeMessage(message):String{
    //   if(message != undefined){
    //     var start = message.indexOf("[");
    //     var end = message.indexOf("]");
    //     if(start!=-1 && end!=-1 && start<end){
    //       return message.substring(start+1, end);
    //     }else{
    //       return message;
    //     }
    //   }else{
    //     return("This is a link!")
    //   }
    // }
    // getOpenFileTitle():String{
    //   var editorStates = this.getActiveEditors();
    //   var title;
    //   _.each(editorStates, (editorstate)=>{
    //     if(editorstate.selected == true){
    //       title = editorstate.title;
    //     }
    //   })
    //   return title;
    // }
    AppComponent.prototype.ngOnInit = function () { };
    ;
    AppComponent.prototype.ngAfterContentInit = function () {
        this.requestForCodeMirrorElement();
    };
    //   //for chrome
    // requestForCodeMirrorElement(){ 
    //   chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    //     chrome.tabs.sendMessage(tabs[0].id, {name: "GetChosenCodeMirrorText"}, (response) => {
    //     });
    //   });
    //   chrome.runtime.onMessage.addListener( (message, sender)=>{
    //     if(message.name == "initialPageInfo"){
    //       this.detail = message.detail;
    //       console.log(this.detail);
    //     }
    //   });
    // }
    //for test
    AppComponent.prototype.requestForCodeMirrorElement = function () {
        this.detail = {
            hasEditor: true,
            editorNumber: 3,
            hasFocus: true,
            focusedEditorNumber: 2,
            content: 'For test'
        };
    };
    AppComponent.prototype.showCode = function () {
        var codeContent = this.editorDisplay.getEditorValue();
        this.chromeQueryGetOldCodeAndShowCode(codeContent);
    };
    AppComponent.prototype.undoShow = function () {
        if (this.lastShownContent) {
            var codeContent = this.lastShownContent;
            this.chromeQueryGetOldCodeAndShowCode(codeContent);
        }
    };
    AppComponent.prototype.chromeQueryGetOldCodeAndShowCode = function (codeContent) {
        var _this = this;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { name: "GetOldCodeAndShowNewCode", content: codeContent }, function (response) {
                _this.lastShownContent = response.oldCodeMirrorText;
            });
        });
    };
    AppComponent.prototype.navBarChooseFile = function (data) {
        console.log(data);
    };
    AppComponent.prototype.setName = function (event) {
        console.log(event);
        this.hasName = true;
        this.name = event.userValue;
        this.channelName = event.channelValue;
        this.setNewWebCommunicationService();
    };
    ;
    AppComponent.prototype.setNewWebCommunicationService = function () {
        var _this = this;
        this.commLayer = new __WEBPACK_IMPORTED_MODULE_1_chat_codes_web_src_app_web_communication_service__["a" /* WebCommunicationService */](this.name, this.channelName, false);
        this.commLayer.ready().then(function (channel) {
            _this.connected = true;
            _this.createNewEditorState();
        });
    };
    AppComponent.prototype.createNewEditorState = function () {
        var openDelta = {
            type: 'open',
            id: 12,
            contents: this.detail.content,
            //contents:'   asdf',
            grammarName: "Null Grammar",
            title: 'WebsiteCode',
            modified: false
        };
        this.commLayer.channelService.emitEditorOpened({
            id: 12
        });
        this.commLayer.channelService.editorStateTracker.onEditorOpened({
            id: 12
        }, false);
        this.commLayer.channelService.emitEditorChanged(openDelta, false);
    };
    AppComponent.prototype.getChatURL = function () {
        return 'chat.codes/' + this.channelName;
    };
    ;
    AppComponent.prototype.sendTextMessage = function (message) {
        this.commLayer.sendTextMessage(message);
    };
    ;
    AppComponent.prototype.updateTypingStatus = function (status) {
        this.commLayer.sendTypingStatus(status);
    };
    ;
    AppComponent.prototype.getActiveEditors = function () {
        return this.commLayer.getActiveEditors();
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_chat_codes_web_src_app_editor_editor_component__["a" /* EditorDisplay */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_chat_codes_web_src_app_editor_editor_component__["a" /* EditorDisplay */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_chat_codes_web_src_app_editor_editor_component__["a" /* EditorDisplay */]) === "function" && _a || Object)
], AppComponent.prototype, "editorDisplay", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chatinput'),
    __metadata("design:type", Object)
], AppComponent.prototype, "chatinput", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css"), __webpack_require__("../../../../bootstrap/dist/css/bootstrap.css"), __webpack_require__("../../../../xterm/dist/xterm.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

var _a;
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
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chat_codes_web_src_app_user_user_display_component__ = __webpack_require__("../../../../chat-codes-web/src/app/user/user-display.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chat_codes_web_src_app_editor_editor_component__ = __webpack_require__("../../../../chat-codes-web/src/app/editor/editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chat_codes_web_src_app_chat_messages_chat_messages_component__ = __webpack_require__("../../../../chat-codes-web/src/app/chat-messages/chat-messages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_chat_codes_web_src_app_chat_messages_single_message_component__ = __webpack_require__("../../../../chat-codes-web/src/app/chat-messages/single-message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_chat_codes_web_src_app_chat_messages_edit_message_component__ = __webpack_require__("../../../../chat-codes-web/src/app/chat-messages/edit-message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_chat_codes_web_src_app_chat_input_chat_input_component__ = __webpack_require__("../../../../chat-codes-web/src/app/chat-input/chat-input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chat_codes_web_src_app_timestamp_timestamp_component__ = __webpack_require__("../../../../chat-codes-web/src/app/timestamp/timestamp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__name_channel_entry_name_channel_entry_component__ = __webpack_require__("../../../../../src/app/name-channel-entry/name-channel-entry.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__welcome_page_welcome_page_component__ = __webpack_require__("../../../../../src/app/welcome-page/welcome-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_ace_editor__ = __webpack_require__("../../../../ng2-ace-editor/ng2-ace-editor.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_ace_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ng2_ace_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_angular2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4_chat_codes_web_src_app_user_user_display_component__["a" /* UserDisplay */],
            __WEBPACK_IMPORTED_MODULE_5_chat_codes_web_src_app_editor_editor_component__["a" /* EditorDisplay */],
            __WEBPACK_IMPORTED_MODULE_6_chat_codes_web_src_app_chat_messages_chat_messages_component__["a" /* ChatMessagesDisplay */],
            __WEBPACK_IMPORTED_MODULE_8_chat_codes_web_src_app_chat_messages_edit_message_component__["a" /* EditMessageDisplay */],
            __WEBPACK_IMPORTED_MODULE_7_chat_codes_web_src_app_chat_messages_single_message_component__["a" /* ChatMessageDisplay */],
            __WEBPACK_IMPORTED_MODULE_9_chat_codes_web_src_app_chat_input_chat_input_component__["a" /* ChatInput */],
            __WEBPACK_IMPORTED_MODULE_10_chat_codes_web_src_app_timestamp_timestamp_component__["a" /* TimestampDisplay */],
            __WEBPACK_IMPORTED_MODULE_11__name_channel_entry_name_channel_entry_component__["a" /* NameChannelEntry */],
            __WEBPACK_IMPORTED_MODULE_12__welcome_page_welcome_page_component__["a" /* WelcomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_14_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_13_ng2_ace_editor__["AceEditorModule"]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/name-channel-entry/name-channel-entry.component.html":
/***/ (function(module, exports) {

module.exports = "\n<input [class]=\"feedbackClass\" placeholder=\"Channel Name\" type='text' \n(ngModelChange)=\"channelValueChange($event)\" [(ngModel)]=\"channelValue\" \n(keydown)=\"onKeydown($event)\"/> \n\n<br />\n\n\n<input [class]=\"feedbackClass\" placeholder=\"User Name\" type='text' \n(ngModelChange)=\"userValueChange($event)\" [(ngModel)]=\"userValue\" (keydown)=\"onKeydown($event)\"/> \n\n{{feedback}}\n"

/***/ }),

/***/ "../../../../../src/app/name-channel-entry/name-channel-entry.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NameChannelEntry; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NameChannelEntry = (function () {
    function NameChannelEntry() {
        this.channelOnEnter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.feedback = '';
        this.feedbackClass = '';
        this.MAX_LENGTH = 20;
    }
    NameChannelEntry.prototype.channelValueChange = function (name) {
        var value = name.trim();
        if (value.length === 0) {
            this.feedback = 'Must be more than 0 characters';
            this.feedbackClass = 'error';
        }
        else if (value.length > this.MAX_LENGTH) {
            this.feedback = 'Must be ' + this.MAX_LENGTH + ' characters or fewer';
            this.feedbackClass = 'error';
        }
        else {
            this.feedback = '';
            this.feedbackClass = '';
        }
    };
    NameChannelEntry.prototype.userValueChange = function (name) {
        var value = name.trim();
        if (value.length === 0) {
            this.feedback = 'Must be more than 0 characters';
            this.feedbackClass = 'error';
        }
        else if (value.length > this.MAX_LENGTH) {
            this.feedback = 'Must be ' + this.MAX_LENGTH + ' characters or fewer';
            this.feedbackClass = 'error';
        }
        else {
            this.feedback = '';
            this.feedbackClass = '';
        }
    };
    NameChannelEntry.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            var userValue = this.userValue.trim();
            var channelValue = this.channelValue.trim();
            if (userValue.length > 0 && userValue.length < this.MAX_LENGTH
                && channelValue.length > 0 && channelValue.length < this.MAX_LENGTH) {
                this.channelOnEnter.emit({ userValue: userValue, channelValue: channelValue });
            }
        }
    };
    return NameChannelEntry;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], NameChannelEntry.prototype, "channelOnEnter", void 0);
NameChannelEntry = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'name-channel-entry',
        template: __webpack_require__("../../../../../src/app/name-channel-entry/name-channel-entry.component.html"),
        styleUrls: [],
    })
], NameChannelEntry);

var _a;
//# sourceMappingURL=name-channel-entry.component.js.map

/***/ }),

/***/ "../../../../../src/app/welcome-page/welcome-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ace-editor{\n\theight: 400px;\n\tbox-shadow: 0px 0px 3px #888888;\n}\n\nspan{\n\theight: 50px;\n\twidth: 50px;\n}\n\n\n#first-row{\n\tpadding-top: 0px;\n\tmargin-bottom: 4px;\n}\n\n#user-name-input-container{\n\t/*padding: 6px default;*/\n}\n\n#user-name-input{\n\tborder: 0px;\n\tpadding: 0px 1px;\n\tbackground: rgb(234,236,239);\n}\n\n#page-editor-info-container{\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-webkit-box-pack: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n\n.nav-button{\n\tborder: 0px;\n\t/*margin-top: 6px;*/\n\tpadding: 2px 6px ;\n\tcolor: rgb(134,142,150);\n\tbackground: rgb(234,236,239);\n}\n\n#nav-button-container{\n\ttext-align: right;\n\t/*padding-right: 0px;*/\n}\n\n#input-channel-row{\n\tmargin-top: 8px;\n}\n\n#channel-name-input{\n\tpadding: 8px 8px 8px;\n\twidth: 150px;\n\theight: 31px;\n}\n\n#go-button-container{\n\twidth: 33px;\n\theight: 31px;\n}\n\n#new-channel-container{\n\t/*padding-left: 0px;*/\n}\n\n#create-new-channel-button{\n\twidth: 170px;\n\t/*padding: 4px 7px 4px;*/\n}\n\n#recent-channel-row{\n\tpadding-top: 3px;\n}\n\n#recent-channel-button{\n\tborder: 0px;\n\tpadding:1px 1px 1px 1px;\n\tmargin-right: 20px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/welcome-page/welcome-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" id=\"first-row\">\n\t<div class=\"input-group col-4\" id=\"user-name-input-container\">\n\t\t<input type=\"text\" class=\"form-control\" id= \"user-name-input\"\n\t\tplaceholder=\"Your name\" [(ngModel)]=\"userName\" (ngModelChange)=\"userNameChange($event)\">\n\t</div>\n\n\t<div class=\"col-4\" id=\"page-editor-info-container\">\n\t\t<button type=\"button\" *ngIf=\"detail.hasEditor\" class=\"btn btn-secondary nav-button\">{{detail.focusedEditorNumber}}+1/{{detail.editorNumber}}</button>\n\n\t\t<button type=\"button\" *ngIf=\"!detail.hasEditor\" class=\"btn btn-secondary nav-button\">None</button>\n\n\t</div>\n\t\n\t<div class=\"col-4\" id=\"nav-button-container\">\n\t\t<div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\n\t\t\t<button type=\"button\" class=\"btn btn-secondary nav-button\" (click)=\"searchUp($event)\">⬆︎</button>\n\t\t\t<button type=\"button\" class=\"btn btn-secondary nav-button\" (click)=\"searchDown($event)\">⬇︎</button>\n\t\t</div>\n\t</div>\n</div>\n<div class=\"row\" id=\"editor-Row\">\n\t<div class=\"col-12\">\n\t<ace-editor #editor></ace-editor>\n</div>\n</div>\n<div class=\"row\" id=\"input-channel-row\">\n<div class=\"col-6\">\n\t<div class=\"input-group\">\n\t\t<input type=\"text\" class=\"form-control\" id= \"channel-name-input\"\n\t\tplaceholder=\"Created Channel\"  [(ngModel)]=\"channelNameInput\">\n\t\t<span class=\"input-group-btn\" id=\"go-button-container\">\n\t\t\t<button class=\"btn btn-sm btn-secondary\" type=\"button\" id = \"go-button\"\n\t\t\t(click)=\"goButtonClick($event)\">Go!</button>\n\t\t</span>\n\t</div>\n</div>\n<div class=\"col-6\" id=\"new-channel-container\">\n\t<button type=\"button\" class=\"btn btn-secondary btn-sm\" id=\"create-new-channel-button\" (click)=\"createNewChannel()\">Create New Channel</button>\n</div>\n</div>\n<div class=\"row\" id=\"recent-channel-row\">\n<!-- <span id=\"recent-channels\">Recent Channels</span>\n-->\n<div class=\"col-12\">\n\t<span *ngFor=\"let channel of channelQueue\">\n\t\t<button type=\"button\" class=\"btn btn-sm btn-outline-dark\" id=\"recent-channel-button\"\n\t\t(click)=goToChannel(channel)>#{{channel}}</button>\n\t\t<!-- <a class=\"btn btn-link\" href=\"#\" role=\"button\">#{{channel}}</a> -->\n\t\t<!-- <button type=\"button\" class=\"btn btn-link\">#{{channel}}</button> -->\n\t</span>\n</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/welcome-page/welcome-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WelcomePage = (function () {
    function WelcomePage() {
        this.detail = {
            hasEditor: false,
            editorNumber: -1,
            hasFocus: false,
            focusedEditorNumber: -1,
            content: ''
        };
        this.getLastUsedUserName();
        this.getLastUsedChannalQueue();
    }
    WelcomePage.prototype.ngAfterViewInit = function () {
        this.editor.setTheme("chrome");
        this.getCodeMirrorEditorInfo();
    };
    //  //for test
    // getCodeMirrorEditorInfo(){ 
    //     this.detail = {
    // 	    hasEditor: true,
    // 	    editorNumber: 3,
    // 	    hasFocus: true,
    // 	    focusedEditorNumber: 2,
    // 	    content: 'For test'
    //     };
    // }
    //for chrome
    WelcomePage.prototype.getCodeMirrorEditorInfo = function () {
        var _this = this;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { name: "GetChosenCodeMirrorText" }, function (response) {
            });
        });
        chrome.runtime.onMessage.addListener(function (message, sender) {
            if (message.name == "initialPageInfo") {
                _this.detail = message.detail;
                _this.setEditorValue(_this.detail.content);
                console.log(_this.detail);
            }
        });
    };
    //userName Function
    WelcomePage.prototype.getLastUsedUserName = function () {
        this.userName = localStorage.getItem("userName");
    };
    WelcomePage.prototype.saveLastUsedUserName = function () {
        localStorage.setItem("userName", this.userName);
    };
    WelcomePage.prototype.userNameChange = function (userName) {
        this.saveLastUsedUserName();
    };
    //nav button
    WelcomePage.prototype.searchUp = function () {
    };
    WelcomePage.prototype.searchDown = function () {
    };
    //editor
    WelcomePage.prototype.setEditorValue = function (value) {
        this.editor.getEditor().setValue(value);
    };
    //channelNameInput
    WelcomePage.prototype.goButtonClick = function (data) {
        this.addChannel(this.channelNameInput);
        this.goToChannel(this.channelNameInput);
        this.channelNameInput = '';
    };
    //channel Queue
    WelcomePage.prototype.getLastUsedChannalQueue = function () {
        //console.log(localStorage.channelQueue);
        if (localStorage.channelQueue != undefined) {
            this.channelQueue = localStorage.channelQueue.split(',');
        }
    };
    WelcomePage.prototype.addChannel = function (channelName) {
        var channelQueueTemp = [channelName];
        console.log(this.channelQueue);
        if (this.channelQueue !== undefined) {
            if (this.channelQueue.length !== 0) {
                while (this.channelQueue.length > 0 && channelQueueTemp.length < 5) {
                    var channelNameTemp = this.channelQueue.shift();
                    if (channelNameTemp != channelName) {
                        channelQueueTemp.push(channelNameTemp);
                    }
                }
            }
        }
        this.channelQueue = channelQueueTemp;
        localStorage.channelQueue = this.channelQueue;
    };
    WelcomePage.prototype.goToChannel = function (channelName) {
        this.addChannel(channelName);
        console.log("go to channel " + channelName);
    };
    WelcomePage.prototype.createNewChannel = function () {
        console.log("create New Channel");
    };
    return WelcomePage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editor'),
    __metadata("design:type", Object)
], WelcomePage.prototype, "editor", void 0);
WelcomePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'welcome-page',
        template: __webpack_require__("../../../../../src/app/welcome-page/welcome-page.component.html"),
        styles: [__webpack_require__("../../../../../src/app/welcome-page/welcome-page.component.css")],
    }),
    __metadata("design:paramtypes", [])
], WelcomePage);

//# sourceMappingURL=welcome-page.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[2]);
//# sourceMappingURL=main.bundle.js.map