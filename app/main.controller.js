define([], function () {
    'use strict';

    function MainController($scope, $timeout    , $state, $mdSidenav, $mdDialog) {

        // expressions
        $scope.models = {
            selected: null,
            templates: [
                {
                    type: "item",
                    id: "Write('Hello World!');",
                    content: [
                        "Write",
                        [
                            "(",
                            "Hello World",
                            ", var",
                            ")"
                        ]
                    ]
                }
            ],
            dropzones: {
                "Program Hello_World;": {},
                "Begin": [
                    {
                        "type": "item",
                        "id": "Write('Hello World!');"
                    },
                    {
                        "id": "End."
                    }
                ]
            }
        };

        // methods
        $scope.closeLeftMenu = openLeftMenu;
        $scope.closeRightMenu = openRightMenu;
        $scope.openFromRight = openFromRight;
        $scope.openLeftMenu = openLeftMenu;
        $scope.openRightMenu = openRightMenu;

        initialize();

        // watchers
        $scope.$watch('models.dropzones', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        /**
         * Initialize the app
         */
        function initialize() {
            goToState('home');
        }

        /**
         * Go to a specific state
         * @param state {string}
         */
        function goToState(state) {
            $state.go( ('main.' + state) );
        }

        /**
         * Toggle sidebar
         */
        function openLeftMenu(x) {
            $mdSidenav('left').toggle();
            $scope.$broadcast('run-output', { any: x });
        }

        /**
         * Toggle sidebar
         */
        function openRightMenu() {
            $mdSidenav('right').toggle();
        }

        /**
         * Save dialog
         */
        function openFromRight() {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Open file')
                    .textContent('(Not yet ready...)')
                    .ok('Close')
                    .openFrom('#open-icon')
                    .closeTo('#open-icon')
            );
        }

    }

    MainController.$inject = ['$scope', '$timeout', '$state', '$mdSidenav', '$mdDialog'];
    return MainController;
});
