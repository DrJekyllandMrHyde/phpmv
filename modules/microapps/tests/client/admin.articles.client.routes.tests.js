﻿(function () {
  'use strict';

  describe('Articles Route Tests', function () {
    // Initialize global variables
    var $scope,
      MicroAppsService;

    // We can start by loading the main application module
    beforeEach(module(RootApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ArticlesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MicroAppsService = _ArticlesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.microapps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/articles');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('admin.microapps.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/microapps/client/views/admin/list-microapps.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MicroAppsAdminController,
          mockArticle;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.microapps.create');
          $templateCache.put('/modules/microapps/client/views/admin/form-microapp.client.view.html', '');

          // Create mock article
          mockArticle = new MicroAppsService();

          // Initialize Controller
          MicroAppsAdminController = $controller('MicroAppsAdminController as vm', {
            $scope: $scope,
            articleResolve: mockArticle
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.articleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/articles/create');
        }));

        it('should attach an article to the controller scope', function () {
          expect($scope.vm.article._id).toBe(mockArticle._id);
          expect($scope.vm.article._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/microapps/client/views/admin/form-microapp.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MicroAppsAdminController,
          mockArticle;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.microapps.edit');
          $templateCache.put('/modules/microapps/client/views/admin/form-microapp.client.view.html', '');

          // Create mock article
          mockArticle = new MicroAppsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Article about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          MicroAppsAdminController = $controller('MicroAppsAdminController as vm', {
            $scope: $scope,
            articleResolve: mockArticle
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:articleId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.articleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            articleId: 1
          })).toEqual('/admin/articles/1/edit');
        }));

        it('should attach an article to the controller scope', function () {
          expect($scope.vm.article._id).toBe(mockArticle._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/microapps/client/views/admin/form-microapp.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
