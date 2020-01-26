import TextTab from 'js/TextTab';
import ChartTab from 'js/ChartTab';
import MainPageComponent from 'components/MainPage.svelte';

function MainPage(stateRouter) {
  stateRouter.addState({
    name: 'app',
    route: '/app',
    template: {
      component: () => MainPageComponent,
      options: { },
    },
    resolve(data, parameters, cb) {
      cb(null, Object.assign(parameters, {}));
    },
  });

  TextTab(stateRouter);
  ChartTab(stateRouter);
}

export default MainPage;
