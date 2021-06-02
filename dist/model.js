//=============================================================
// CLIENT
// For your client you’ll need to have a dist folder with a your files separated correctly. You must keep this fully MVC compliant.
// YOUR MODEL : 

// Here’s what should go inside your model class:
// An array of cityData - This will hold all the cities we want to display on the client side
// A getDataFromDB method, which sends a GET request to the /cities route on your server and update the cityData array
// A getCityData method , which sends a GET request to the /city route on your server
// Hint: async
// When the data comes back, you need to make sure that it is added to your models data (cityData).
// A saveCity method, sends a city’s data as POST request to the /city post route on your server and update the cityData array
// Make sure this is MVC compliant
// A removeCity method, which sends a DELETE request to the /city delete route on your server and update the cityData array
// Also should be MVC compliant

//==============================================================================

class Model{
    //==========================================================================
    constructur(){
        this.cityData=[]
    }
    //==========================================================================
    getDataFromDB = async function(){ 
        //which sends a GET request to the /cities route 
        //on your server and update the cityData array
        const data = await  $.get('/cities')
        this.cityData  = data
    }
    //===========================================================================
    getCityData = async function(cityName){ 
        //which sends a GET request to the /city route on your server
        // added to your models data (cityData).
       const data = await $.get(`city/${cityName}`)
       console.log("in model , data = ",data)
                this.cityData.push(data)
    }
    //============================================================================
    saveCity= function (cityName){
        //sends a city’s data as POST request to the /city post route 
        //on your server and update the cityData array

        let arrCity = this.cityData.filter(p=> p.name === cityName)
        let myCityData = arrCity[0]
        console.log("in model - saveCity - the city data is = ",myCityData)
        $.post('/city',myCityData,function(req,res){
      // goes to the same post in the server - api - and return it's object
      // we got the success in the res
      // we got the result in the req
            console.log("model - post - save city - req= ",req)
            // console.log("model - post - save city - res= ",res)
        })

    }
    //===========================================================================
    removeCity= function (cityName){
    //which sends a DELETE request to the /city delete route 
    //on your server and update the cityData array
    $.delete(`city/:${cityName}`,function(req,res){
        console.log("in model - remove city - req= ",req)
    })
    loadPage()
    }
    //============================================================================
}