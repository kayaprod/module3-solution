(function () {

    'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com/");

//Support DI
        NarrowItDownController.$inject=['MenuSearchService'];

        function NarrowItDownController(MenuSearchService)
        {
            var menu = this;
            var  menu_items = [] ;    
           // var foundItems = [];           
           var promise;
           
           
           menu.searchItems = function () { 
           // modification
                promise = MenuSearchService.getMatchedMenuItems(menu.search);
                promise.then(function(response){
                menu_items = response.data;
                console.log("OK RESPONSE POSITIVE!");
                console.log('menu_items',menu_items);   

                })               
                .catch(function(error)
                {
                     console.log("Something went terribly wrong.");   
                }                             
            )}
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
                           //console.log("Valeur de myString : ", myString);                        
                           if (searchTerm == null)
                           {
                              console.log("Valeur de myString : ", myString);                                
                              console.log("Nothing Found, longueur de foundItems : " + foundItems.length);
                           } 
                           else
                           {    
                                if(myString.match(searchTerm) != null)
                                {
                                    foundItems.push(processItems[i]);
                                    console.log("Elements trouves :  ",foundItems[count] );
                                    count++;                              
                                   // console.log("count : "  + count);
                                } 
                                console.log("count : "  + count);
                           }                  

                        } // END Processing                  
                         
                         return foundItems; 
                         
                    });                                                  
            }; // End service

        } 

})();



            


        