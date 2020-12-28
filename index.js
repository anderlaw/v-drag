/*
 * @author Andrew
 * Date: 20/12/28
 */
import VDrag from "./drag";

const components = [VDrag];

const install = function(Vue) {
  if (install.installed) return;
  components.forEach(component => Vue.component(component.name, component));
};

export default {
  install
};
