import { NodeivrPage } from './app.po';

describe('nodeivr App', function() {
  let page: NodeivrPage;

  beforeEach(() => {
    page = new NodeivrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
