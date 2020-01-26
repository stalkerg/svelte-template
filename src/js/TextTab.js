import TextTabComponent from 'components/TextTab.svelte';

function TextTab(stateRouter) {
  stateRouter.addState({
    name: 'app.text',
    route: '/text',
    template: {
      component: () => TextTabComponent,
      options: { },
    },
    resolve(data, parameters, cb) {
      cb(null, Object.assign(parameters, {}));
    },
  });
}

export default TextTab;
