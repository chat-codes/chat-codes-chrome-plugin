import {Component,Injectable,EventEmitter,Output, ViewChild} from '@angular/core';
import * as _ from 'underscore';
import * as $ from 'jquery'; 

declare let chrome: any;
declare let require: any;

// import {wordList} from './google-10000-english-usa-no-swears-medium.js';
import {wordList} from './google-10000-english-usa-no-swears-medium';



@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})


export class WelcomePage {
	@ViewChild('editor') editor;
	

	userName: string;
	channelNameInput: string = '';
	channelQueue;
	focusedEditorNumber;
	public detail = {
    	hasEditor: false,
    	editorNumber: -1,
	    hasFocus: false,
	    focusedEditorNumber: -1,
	    content: ''
	}
	feedback ='';
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
		if(this.checkInputRegulation(true)){
			this.addChannel(channelName);
			console.log("go to channel "+ channelName);
			this.channelClick.emit({
			type: "GoToCreatedChannel",
			channelName: channelName,
			detail: this.detail,
			userName: this.userName
			});
		}
	}

	createNewChannel(){
		if(this.checkInputRegulation(false)){
			console.log("create New Channel");
			var channelName = wordList[Math.floor(Math.random()*wordList.length)];
			this.addChannel(channelName);
			this.channelClick.emit({
			type: "CreatNewChannel",
			channelName: channelName,
			detail: this.detail,
			userName: this.userName,
			content: this.editor.getEditor().getValue()
			});
		}
	}

	checkInputRegulation(checkChannelNameFlag): boolean{
		var userName = this.userName;
		var channelName = this.channelNameInput;
		console.log(channelName);
		console.log(userName.length);
		if(userName.length === 0) {
            this.feedback = 'User name must be more than 0 characters';
            return false;
        } else if(userName.length > this.MAX_LENGTH) {
            this.feedback = 'User name must be ' + this.MAX_LENGTH + ' characters or fewer';
            return false;
        } 
        if(checkChannelNameFlag){
        	if(channelName == ''){
        		this.feedback = 'Channel name must be more than 0 characters';
            	return false;
        	}
        }else{
        	if(this.editor.getEditor().getValue()==''){
        		this.feedback = 'No code in editor to upload';
        		return false;
        	}
        }
        return true;
	}
	private MAX_LENGTH = 20;
}