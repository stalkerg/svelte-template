import deepmerge from 'deepmerge';

export default function SvelteStateRendererFactory(defaultOptions = {}) {
  return function makeRenderer(stateRouter) {
    const asr = {
      makePath: stateRouter.makePath,
      stateIsActive: stateRouter.stateIsActive,
    };

    function render(context, cb) {
      const { element: target, template, content } = context;

      const rendererSuppliedOptions = deepmerge(defaultOptions, {
        props: Object.assign(content, defaultOptions.props, { asr }),
      });

      function internalRender(Component) {
        let svelte;

        try {
          const options = deepmerge(rendererSuppliedOptions, template.options);
          options.target = target;
          svelte = new Component(options);
        } catch (e) {
          cb(e);
          return;
        }

        function onRouteChange() {
          svelte.$set({
            asr,
          });
        }

        stateRouter.on('stateChangeEnd', onRouteChange);

        svelte.asrOnDestroy = () => stateRouter.removeListener('stateChangeEnd', onRouteChange);
        svelte.mountedToTarget = target;

        cb(null, svelte);
      }

      Promise.resolve(template.component()).then((value) => {
        if (value.default != null) {
          internalRender(value.default);
        } else {
          internalRender(value);
        }
      });
    }

    return {
      render,
      reset: function reset(context, cb) {
        const svelte = context.domApi;
        const element = svelte.mountedToTarget;

        svelte.asrOnDestroy();
        svelte.$destroy();

        const renderContext = { element, ...context };

        render(renderContext, cb);
      },
      destroy: function destroy(svelte, cb) {
        svelte.asrOnDestroy();
        svelte.$destroy();
        cb();
      },
      getChildElement: function getChildElement(svelte, cb) {
        try {
          const element = svelte.mountedToTarget;
          const child = element.querySelector('uiView');
          cb(null, child);
        } catch (e) {
          cb(e);
        }
      },
    };
  };
}