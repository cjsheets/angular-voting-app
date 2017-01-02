import { FCCVotingAppPage } from './app.po';

describe('fcc-voting-app App', function() {
  let page: FCCVotingAppPage;

  beforeEach(() => {
    page = new FCCVotingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
