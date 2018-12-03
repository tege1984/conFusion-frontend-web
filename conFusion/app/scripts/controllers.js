'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes = menuFactory.getDishes().query();
            menuFactory.getDishes().query(
               function(response) {
                   $scope.dishes = response;
                   $scope.showMenu = true;
               },
               function(response) {
                   $scope.message = "Error: "+response.status + " " + response.statusText;
               });

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"",comments:"" };
            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.saveFeedbacks().save($scope.feedback);
                    $scope.feedbackForm.$setPristine();
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"",comments:"" };
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {


            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
               .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                                console.log($scope.dish);
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );

        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope, menuFactory) {

          $scope.userComment = {rating:"5", comment:"", author:"", date: ""};
          var radioStars = [ {value:"1", label:"1",checked:"false"},
                              {value:"2", label:"2",checked:"false"},
                              {value:"3", label:"3",checked:"false"},
                              {value:"4", label:"4",checked:"false"},
                              {value:"5", label:"5",checked:"true"}];
           $scope.radioStars = radioStars;

            $scope.submitComment = function () {

                $scope.userComment.date = new Date().toISOString();
                console.log($scope.userComment);
                $scope.dish.comments.push($scope.userComment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.userComment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {


                $scope.showDish = false;
                $scope.message="Loading ...";
                $scope.dish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                                console.log($scope.dish);
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );


              $scope.showPromotion = false;
              $scope.promotions = menuFactory.getPromotions().get({id:0})
              .$promise.then(
                            function(response){
                                $scope.promotions= response;
                                $scope.showPromotion = true;
                                console.log($scope.promotions);
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );


              $scope.showExeChef = false;
              $scope.exeChef= corporateFactory.getLeaders().get({id:3})
              .$promise.then(
                              function(response){
                                  $scope.exeChef= response;
                                  $scope.showExeChef = true;
                                  console.log($scope.showExeChef);
                              },
                              function(response) {
                                  $scope.message = "Error: "+response.status + " " + response.statusText;
                              }
                          );

        }])


        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

            $scope.showLeadership = false;
            $scope.leaderships = corporateFactory.getLeaders().query();
            corporateFactory.getLeaders().query(
               function(response) {
                   $scope.leaderships = response;
                   $scope.showLeadership = true;
               },
               function(response) {
                   $scope.message = "Error: "+response.status + " " + response.statusText;
               });



        }])



;
