import _ from 'lodash';
const resources = require('../resources.json');

/**
 * Adds list methods to the resource based on
 * the passed array. Lists are resources associated
 * with the called resource, e.g. campaigns.listFaqs(#)
 *
 * @param {array} lists A list of list methods to add
 */
export default function _addCreateMethods(lists) {
  const _this = this;

  _.each(lists, (method) => {
    const uppercaseMethod = _.upperFirst(_.camelCase(method));
    const methodName = uppercaseMethod.substr(0, uppercaseMethod.length - 1);
    const resourceDefintion = resources[uppercaseMethod];

    _this['create' + methodName] = _this.createMethod({
      method: 'POST',
      path: '/{id}/' + method,
      basePath: _.get(resourceDefintion, 'basePath')
    });
  });
}
