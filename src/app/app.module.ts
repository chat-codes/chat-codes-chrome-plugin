import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserDisplay } from 'chat-codes-web/src/app/user/user-display.component';
import { EditorDisplay } from 'chat-codes-web/src/app/editor/editor.component';
import { ChatMessagesDisplay } from 'chat-codes-web/src/app/chat-messages/chat-messages.component';
import { ChatMessageDisplay } from 'chat-codes-web/src/app/chat-messages/single-message.component';
import { EditMessageDisplay } from 'chat-codes-web/src/app/chat-messages/edit-message.component';
import { ChatInput } from 'chat-codes-web/src/app/chat-input/chat-input.component';
import { TimestampDisplay } from 'chat-codes-web/src/app/timestamp/timestamp.component';
import { NameChannelEntry } from './name-channel-entry/name-channel-entry.component';

import { AceEditorModule } from 'ng2-ace-editor';
import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    AppComponent,
    UserDisplay,
    EditorDisplay,
    ChatMessagesDisplay,
    EditMessageDisplay,
    ChatMessageDisplay,
    ChatInput,
    TimestampDisplay,
    NameChannelEntry
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MomentModule,
    AceEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
