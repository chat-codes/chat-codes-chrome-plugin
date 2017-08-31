import { ChatCodeChromePluginPage } from './app.po';

describe('chat-code-chrome-plugin App', () => {
  let page: ChatCodeChromePluginPage;

  beforeEach(() => {
    page = new ChatCodeChromePluginPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
