(function () {
  'use strict';

  angular
    .module('root.articles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('microapps', {
        abstract: true,
        url: '/microapps',
        template: '<ui-view/>'
      })
      .state('microapps.list', {
        url: '',
        templateUrl: '/modules/microapps/client/views/list-microapps.client.view.html',
        controller: 'MicroAppsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Micro Apps List'
        }
      })
      .state('microapps.view', {
        url: '/:articleId',
        templateUrl: '/modules/microapps/client/views/view-microapps.client.view.html',
        controller: 'MicroAppsController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: 'Micro Apps {{ articleResolve.title }}'
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'MicroAppsService'];

  function getArticle($stateParams, MicroAppsService) {
    return MicroAppsService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }
}());
