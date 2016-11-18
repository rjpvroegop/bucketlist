export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'resources/pages/welcome/index',      nav: true, title: 'Welcome' },
      { route: ['upload'], name: 'upload',      moduleId: 'resources/pages/upload/upload',      nav: true, title: 'Upload' },
      { route: ['edit/:id'], name: 'edit',      moduleId: 'resources/pages/edit/edit',      nav: false, title: 'Edit', href: "" }

    ]);

    this.router = router;
  }
}
