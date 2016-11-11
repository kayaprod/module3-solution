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
            var  menu_items ;    
           // var foundItems = [];           
             
            menu.searchItems = function () {           
           menu_items =  MenuSearchService.getMatchedMenuItems(menu.search);
                console.log("In function  " + menu.search);              
                console.log("OK RESPONSE POSITIVE!");
                console.log('menu_items',menu_items);
             };

                    
      }
       

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
                var result = $http.get(ApiBasePath + "/menu_items.json")
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
                           //console.log("i: "+ i +" , "+myString.match(searchTerm));
                           if (myString.match(searchTerm) != null)
                           {                              
                              foundItems.push(processItems[i]);
                              console.log("Elements trouves :  ",foundItems[count] );
                              count++;
                              //console.log("longueur de foundItems.length: ", foundItems.length);
                             console.log("count : "  + count);
                           }                          

                        }

                          return response.data;  
                    },
                    function (response)
                    {
                         // this callback will be called asynchronously if an error occurs or server returns response with an error status.
                         console.log("FAIL");
                    });        
                //return foundItems;
                //return result;                 
            };

        }

})();



            


        