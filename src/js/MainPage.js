import MainPageComponent from 'components/MainPage.html';

function MainPage(stateRouter, store) {
  stateRouter.addState({
    name: 'app',
    route: '/app',
    template: {
      component: MainPageComponent,
      options: {
        store,
        data: { },
        methods: {
        },
      },
    },
    resolve(data, parameters, cb) {
      cb(null, Object.assign(parameters, {}));
    },
  });
}

export default MainPage;
