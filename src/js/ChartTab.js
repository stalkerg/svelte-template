function ChartTab(stateRouter) {
  stateRouter.addState({
    name: 'app.chart',
    route: '/chart',
    template: {
      component: async () => import('components/ChartTab.svelte'),
      options: { },
    },
    resolve(data, parameters, cb) {
      cb(null, Object.assign(parameters, {}));
    },
  });
}

export default ChartTab;
