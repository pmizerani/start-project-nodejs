angular.module('ovulo', ['ngAnimate', 'ngRoute', 'ngResource', 'ui.router', 'satellizer', 'toastr'])
    .config(function ($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, urls, $authProvider) {

        //Create routes
        $stateProvider
            .state('dashboard', {
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'views/layout/layout.html'
                    },
                    'header@dashboard': {
                        templateUrl: 'views/layout/header.html'
                    },
                    'sidebar@dashboard': {
                        templateUrl: 'views/layout/menu.html'
                    },
                    'footer@dashboard': {
                        templateUrl: 'views/layout/footer.html'
                    }
                }
            })
            .state('dashboard.main', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController',
                resolve: {
                    loginRequired
                }
            })
            .state('dashboard.profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller: 'ProfileController',
                resolve: {
                    loginRequired
                }
            })
            .state('dashboard.notification', {
                url: '/notification',
                templateUrl: 'views/notification.html',
                controller: 'NotificationController',
                resolve: {
                    loginRequired
                }
            })
            .state('dashboard.faq', {
                url: '/faq',
                // templateUrl: 'views/faq.html',
                // controller: 'FaqController',
                views: {
                    "": {
                        templateUrl: 'views/faq.html',
                        controller: 'FaqController',
                        resolve: {
                            loginRequired
                        }
                    },
                    "new@dashboard.faq": {
                        templateUrl: 'views/faq_new.html'
                    }
                }
            })
            // .state('dashboard.faq.new', {
            //     url: '/new',
            //     templateUrl: 'views/faq_new.html',
            //     // controller: 'FaqController',
            //     resolve: {
            //         loginRequired
            //     }
            // })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            });

        //Fallback
        $urlRouterProvider.otherwise('/dashboard');

        $httpProvider.interceptors.push('TokenInterceptor');

        // Satellizer settings
        $authProvider.httpInterceptor = function () {
            return true;
        };
        //
        $authProvider.withCredentials = false;
        $authProvider.tokenRoot = null;
        $authProvider.cordova = false;
        $authProvider.baseUrl = '/';
        $authProvider.loginUrl = urls.BASE_API + '/api/auth/admin';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = 'Bearer';
        $authProvider.storageType = 'localStorage';


        function loginRequired($q, $state, AuthService, $auth) {
            AuthService.loginRequired($q, $state, $auth);
        }

    }).config(function (toastrConfig) {

        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });

    }).constant('urls', {
        BASE_API: "http://localhost:7100"
    }).constant('listProfile',[
        {
            id: 'O',
            name: 'Operador'
        },
        {
            id: 'P',
            name: 'Parceiro'
        }
    ]);