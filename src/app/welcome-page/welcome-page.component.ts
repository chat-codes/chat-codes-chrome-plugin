import {Component,Injectable,EventEmitter,Output, ViewChild} from '@angular/core';
import * as _ from 'underscore';
import * as $ from 'jquery'; 

declare let chrome: any;



@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})


export class WelcomePage {
	@ViewChild('editor') editor;

	userName: string;
	channelNameInput: string;
	channelQueue;
	public detail = {
    	hasEditor: false,
    	editorNumber: -1,
	    hasFocus: false,
	    focusedEditorNumber: -1,
	    content: ''
	}

	constructor(){
		this.getLastUsedUserName();
		this.getLastUsedChannalQueue();
		
	}

	ngAfterViewInit(){
		this.editor.setTheme("chrome");
		this.getCodeMirrorEditorInfo();
	}

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
    getCodeMirrorEditorInfo(){ 
	    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	    	chrome.tabs.sendMessage(tabs[0].id, {name: "GetChosenCodeMirrorText"}, (response) => {
	    	});
	    });
	    chrome.runtime.onMessage.addListener( (message, sender)=>{
	        if(message.name == "initialPageInfo"){
	            this.detail = message.detail;
	            this.setEditorValue(this.detail.content);
	            console.log(this.detail);
	        }
	    });
	}

	//userName Function
	getLastUsedUserName(){
		this.userName = localStorage.getItem("userName");
	}
	saveLastUsedUserName(){
		localStorage.setItem("userName", this.userName);
	}
	userNameChange(userName){
		this.saveLastUsedUserName();
	}

	//nav button
	searchUp(){

	}

	searchDown(){

	}

	//editor
	setEditorValue(value){
		this.editor.getEditor().setValue(value);
	}

	//channelNameInput
	goButtonClick(data){
		this.addChannel(this.channelNameInput);
		this.goToChannel(this.channelNameInput);
		this.channelNameInput = '';
	}

	//channel Queue
	getLastUsedChannalQueue(){
		//console.log(localStorage.channelQueue);
		if(localStorage.channelQueue != undefined){
			this.channelQueue = localStorage.channelQueue.split(',');	
		}
	}

	addChannel(channelName : string){
		var channelQueueTemp = [channelName];
		console.log(this.channelQueue);
		if(this.channelQueue!==undefined){
			if(this.channelQueue.length !== 0){
				while(this.channelQueue.length>0 && channelQueueTemp.length<5){
					var channelNameTemp = this.channelQueue.shift();
					if(channelNameTemp!=channelName){
						channelQueueTemp.push(channelNameTemp);
					}
				}
			}
		}
		this.channelQueue = channelQueueTemp;
		localStorage.channelQueue = this.channelQueue;
	}

	goToChannel(channelName){
		this.addChannel(channelName);
		console.log("go to channel "+ channelName);
	}

	createNewChannel(){
		console.log("create New Channel");
	}


}