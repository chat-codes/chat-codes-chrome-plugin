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
	focusedEditorNumber;
	public detail = {
    	hasEditor: false,
    	editorNumber: -1,
	    hasFocus: false,
	    focusedEditorNumber: -1,
	    content: ''
	}
	@Output() public channelClick:EventEmitter<any> = new EventEmitter();

	setDetail(detail){
		this.detail = detail;
		this.focusedEditorNumber = this.detail.focusedEditorNumber+1;
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
	    		if(response.name == "initialPageInfo"){
	    			console.log(response);
	    			this.setDetail(response.detail);
	           		this.setEditorValue(this.detail.content);
	    		}
	    	});
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
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	    	chrome.tabs.sendMessage(tabs[0].id, {name: "SearchUp"}, (response) => {
	    		if(response.name == "SearchUp"){
	    			console.log(response);
	    			this.setDetail(response.detail);
	           		this.setEditorValue(this.detail.content);
	    		}
	    	});
	   	});
	}

	searchDown(){
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	    	chrome.tabs.sendMessage(tabs[0].id, {name: "SearchDown"}, (response) => {
	    		if(response.name == "SearchDown"){
	    			console.log(response);
	    			this.setDetail(response.detail);
	           		this.setEditorValue(this.detail.content);
	    		}
	    	});
	    });
	}

	//editor
	setEditorValue(value){
		this.editor.getEditor().setValue(value);
		this.editor.getEditor().navigateFileEnd();
	}

	//channelNameInput
	goButtonClick(data){
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
		this.channelClick.emit({
			type: "GoToCreatedChannel",
			channelName: channelName,
			detail: this.detail,
			userName: this.userName
		});
	}

	createNewChannel(){
		// this.addChannel(channelName);
		console.log("create New Channel");
		
		this.addChannel(this.channelNameInput);
		this.channelClick.emit({
			type: "CreatNewChannel",
			channelName: this.channelNameInput,
			detail: this.detail,
			userName: this.userName,
			content: this.editor.getEditor().getValue()
		});
	}
}