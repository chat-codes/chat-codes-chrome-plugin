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
	
	userName = '';
	channelNameInput: string = '';

	focusedEditorNumber;
	
	feedback ='';
	feedback_success ='';
	@Output() public channelClick:EventEmitter<any> = new EventEmitter();
	channelCreated = false;	

	//detail has all the information of the current page
	public detail = {
    	hasEditor: false,
    	editorNumber: -1,
	    hasFocus: false,
	    focusedEditorNumber: -1,
	    content: '',
	    pageTitle: ''
	}
	setDetail(detail){
		// console.log(detail);
		this.detail = detail;
		this.focusedEditorNumber = this.detail.focusedEditorNumber+1;
		this.checkEditorURL();
		if(!this.detail.hasEditor){
			console.log("none");
			this.feedback = "This extension only works ";
		}
	}

	//constructor
	constructor(){
		this.getLastUsedUserName();
		// this.getLastUsedChannalQueue();
		setTimeout(function() {
            document.getElementById('width-controller').style.width = '400px';
        }, 1); 
	}

	ngAfterViewInit(){
		this.editor.setTheme("chrome");
		this.getCodeMirrorEditorInfo();
	}

	//Get initial info. Make the first editor focused if no editor is chosen
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

	//Everytime when one editor is focused, check if user has created the channel for this code block
	checkEditorURL(){
		var editorURL = this.detail.pageTitle + this.detail.focusedEditorNumber;
		if(localStorage.getItem(editorURL)==null){
			this.channelCreated = false;
		}else{
			this.channelNameInput = localStorage.getItem(editorURL);
			this.channelCreated = true;
		}
	}

	//userName Function
	getLastUsedUserName(){
		if(localStorage.getItem("userName")){
			this.userName = localStorage.getItem("userName");
		}else{
			this.userName = '';
		}
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
	    			// console.log(response);
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
	    			// console.log(response);
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

	getEditorValue(){
		return this.editor.getEditor().getValue();
	}

	
	// channelQueue;

	// //channel Queue
	// getLastUsedChannalQueue(){
	// 	//console.log(localStorage.channelQueue);
	// 	if(localStorage.channelQueue != undefined){
	// 		this.channelQueue = localStorage.channelQueue.split(',');	
	// 	}
	// }

	// addChannel(channelName : string){
	// 	var channelQueueTemp = [channelName];
	// 	if(this.channelQueue!==undefined){
	// 		if(this.channelQueue.length !== 0){
	// 			while(this.channelQueue.length>0 && channelQueueTemp.length<5){
	// 				var channelNameTemp = this.channelQueue.shift();
	// 				if(channelNameTemp!=channelName){
	// 					channelQueueTemp.push(channelNameTemp);
	// 				}
	// 			}
	// 		}
	// 	}
	// 	this.channelQueue = channelQueueTemp;
	// 	localStorage.channelQueue = this.channelQueue;
	// }

	//channelNameInput
	goToCreatedChannel(data){
		if(this.checkInputRegulation(true)){
			this.goToChannel(this.channelNameInput);
			this.channelNameInput = '';
		}
	}

	goToChannel(channelName){
		// this.addChannel(channelName);
		// console.log("go to channel "+ channelName);
		this.channelClick.emit({
			type: "GoToCreatedChannel",
			channelName: channelName,
			detail: this.detail,
			userName: this.userName
		});
	}

	createNewChannel(){
		if(this.checkInputRegulation(false)){
			this.feedback_success = "Setting up... Please wait...";
			var channelName = wordList[Math.floor(Math.random()*wordList.length)];
			var newURL = "http://localhost:4200/" + channelName;
			var editorURL = this.detail.pageTitle + this.detail.focusedEditorNumber;
			var content = this.getEditorValue();
			var userName = this.userName;
			localStorage.setItem(editorURL, channelName);
			// console.log(editorURL);
			// console.log(localStorage.getItem(editorURL));
            chrome.tabs.create({url: newURL,active: false}, function(tab1) {
                setTimeout(function(){
                	// console.log("send message");
                	chrome.tabs.sendMessage(tab1.id, {
                      	name: "SetWebInfo",
                      	userName: userName,
                      	channelName: channelName,
                      	content: content
                    },(response)=>{
                      // console.log(response);
                    });
                    chrome.tabs.update(tab1.id,{"active":true,"highlighted":true},function (tab){
                    });
            	},2000);
            });
		}
	}

	private MAX_LENGTH = 20;
	checkInputRegulation(checkChannelNameFlag): boolean{
		var userName = this.userName;
		var channelName = this.channelNameInput;
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
        this.feedback = '';
        return true;
	}
}