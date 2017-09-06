declare let chrome: any;
import { Component, Input, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { WebCommunicationService } from 'chat-codes-web/src/app/web-communication.service';
import { Location } from '@angular/common';
import { EditorDisplay } from 'chat-codes-web/src/app/editor/editor.component';
import { ChatInput } from 'chat-codes-web/src/app/chat-input/chat-input.component';
import { AceEditorModule } from 'ng2-ace-editor';
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

export class AppComponent implements OnInit{
  // chatinputMessageChanged(message):void{
  //   this.message = message;
  // }
  editorCursorSelectionChanged(data) {
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
  }
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

  ngOnInit(){ }

  public detail = {
    hasEditor: false,
    editorNumber: -1,
    hasFocus: false,
    focusedEditorNumber: -1,
    content: ''
  }

  constructor(){
     this.setName({userValue:"remote",channelValue:123});
  };

  ngAfterContentInit(){
    this.requestForCodeMirrorElement();
  }

    //for chrome
  requestForCodeMirrorElement(){ 
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {name: "GetChosenCodeMirrorText"}, (response) => {
      });
    });
    chrome.runtime.onMessage.addListener( (message, sender)=>{
      if(message.name == "initialPageInfo"){
        this.detail = message.detail;
        console.log(this.detail);
      }
    });
  }

  @ViewChild(EditorDisplay) editorDisplay: EditorDisplay;
  lastShownContent: String;
  showCode(){
    var codeContent = this.editorDisplay.getEditorValue();
    this.chromeQueryGetOldCodeAndShowCode(codeContent);
  }
  undoShow(){
    if(this.lastShownContent){
      var codeContent = this.lastShownContent;
      this.chromeQueryGetOldCodeAndShowCode(codeContent);
    }
  }
  chromeQueryGetOldCodeAndShowCode(codeContent:String){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {name: "GetOldCodeAndShowNewCode", content: codeContent},(response)=>{
        this.lastShownContent = response.oldCodeMirrorText;
      });
    });
  }

  private message: String;
  @ViewChild('chatinput') private chatinput;

  navBarChooseFile(data){
    console.log(data);
  }

  setName(event): void {
     console.log(event);
     this.hasName = true;
     this.name = event.userValue;
     this.channelName = event.channelValue;
     this.setNewWebCommunicationService();
  };

  setNewWebCommunicationService(){
      this.commLayer = new WebCommunicationService(this.name, this.channelName, true);
      this.commLayer.ready().then((channel) => {
        this.connected = true;
        this.createNewEditorState();
      });
  }

  
  createNewEditorState(){
    const openDelta =  {
      type: 'open',
      id: 12,
      contents: this.detail.content,
      //contents:'   asdf',
      grammarName:  "Null Grammar",
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
  }

  


  //  //for test
  // requestForCodeMirrorElement(){ 
  //   var response = {chosenCodeMirrorText: "For test123"};
  //   this.getDOMFlag = true;
  //   if(response !== undefined){
  //     this.hasCodeMirrorFlag = true;
  //     this.codeMirrorText = response.chosenCodeMirrorText;
  //   }     
  // }

  private commLayer: WebCommunicationService;
  private at_bottom: boolean = false;
  
  getChatURL(): string {
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
  }
  private name: string;
  private hasName: boolean = false;
  private connected: boolean = false;
  members: any = false;
  channelName = 'example_channel';
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
