import MainPageComponent from 'components/MainPage.svelte';

function MainPage(stateRouter) {
  stateRouter.addState({
    name: 'app',
    route: '/app',
    template: {
      component: MainPageComponent,
      options: { },
    },
    resolve(data, parameters, cb) {
      cb(null, Object.assign(parameters, {}));
    },
  });
}

export default MainPage;
