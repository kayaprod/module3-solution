(function () {

    'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItemsDirective)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com/");


//Support DI
        NarrowItDownController.$inject=['MenuSearchService'];

        function NarrowItDownController(MenuSearchService)
        {
            var menu = this;           
            var found = [];           
            var promise;           
           menu.NothingFound = true; 

           console.log("boolean", menu.NothingFound); 
           menu.searchItems = function () { 
               // modification
               menu.NothingFound = true;             
                promise = MenuSearchService.getMatchedMenuItems(menu.search);
                console.log("promise",promise);
                promise.then(function(response){
                console.log("response",response);
                found = response;
                menu.found = found;
                console.log("OK RESPONSE POSITIVE!");
                console.log("found : ",found);   

                })               
                .catch(function(error)
                {
                     console.log("Something went terribly wrong.");   
                }                             
            )};

            // Remove item
           menu.remove = function(itemIndex){
                menu.NothingFound = false;                
                console.log("'this' is: ", this);           
                found.splice(itemIndex,1);
                menu.found = found;
                console.log("Invoke remove");
                console.log("valeur NothingFound :", menu.NothingFound);
            }
         };
         // directive
         function foundItemsDirective(){             
             var ddo = {
                 restrict:'E',
                 templateUrl:'foundListMenu.html',

                 scope :{
                     foundItems: '<',
                 onRemove:'&'

                 },
                 
             //},
             controller: foundItemsDirectiveCtrl,
             controllerAs: 'list',
             bindToController: true

         };

         return ddo;
         }

         function foundItemsDirectiveCtrl(){
             var list = this;
         };

    // service
        MenuSearchService.$inject = ['$http','ApiBasePath'];

        function MenuSearchService($http,ApiBasePath)
        {
            var service = this; 
             
            var i;           
            var myString = ""; 
            var foundItems =[];
            var processItems = [];

            service.getMatchedMenuItems = function(searchTerm)     
            {   
                 var count = 0 ;                  
                 console.log("Search Term : " + searchTerm);       
                
                   return $http.get(ApiBasePath + "/menu_items.json")
                   //return $http.get(ApiBasePath + "/maison.json")  //test
                    .then(function (response)
                    {
                       
                        // this callback will be called asynchronously when the response is available
                        console.log("SUCCESS");                 
                        console.log("Status of the request: " + response.status); 
                        console.log("Text of response " + response.statusText); 
                        console.log("result: ", response.data.menu_items);                        
                        processItems =response.data.menu_items;                       
                        for(i=0; i < processItems.length; i++)
                        {                           
                           myString = processItems[i].description;                                        
                           //console.log("Length of myString : ", myString);                        
                           if (searchTerm == null)
                           {
                              
                              console.log("Valeur de myString : ", myString);                                
                              console.log("Nothing Found, length of foundItems : " + foundItems.length);
                           } 
                           else
                           {    
                                if(myString.match(searchTerm) != null)
                                {
                                    foundItems.push(processItems[i]);
                                    console.log("Elements trouves :  ",foundItems[count] );
                                    count++;               
                                   
                                } 
                                console.log("count : "  + count);
                           }                  

                        } // END Processing                  
                         
                         return foundItems; 
                         
                    });                                                  
            }; // End service

       } 
        
})();



            


        