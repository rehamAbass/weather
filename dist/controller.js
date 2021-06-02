//===================================================================================================================
// main : 
// YOUR CONTROLLER
//================================================================================================================
const renderer = new Renderer()
const myModel = new Model()
//================================================================================================================
  //which should render any saved data
   // This function should run when the page loads
loadPage= async function(){
    await myModel.getDataFromDB()
    await renderer.renderData( myModel.cityData)
}
//================================================================================================================
   //which should call to the server and render new weather data 
   //for the specific city the user searched for.
   // Hint: This function needs to be async to work
 handleSearch= async function (cityName){
    await myModel.getCityData(cityName)
    await renderer.renderData(myModel.cityData)  
}
//================================================================================================================
   // An on click for your search button, 
   //which calls your handleSearch function as it’s callback function
$('#search').on('click',async function(){
   let cityName =  $('#cityInput').val()
   handleSearch(cityName)
})
//================================================================================================================
// An on click for each of the save buttons that:
// Saves that city in your DB
$('.cities').on('click',`.add`, async function(){
   console.log("in controller - save button clicked + ")
   let cityName = $(this).closest('.city').find('p').first().text()
   console.log("in controller - saveButton - got the city name =",cityName)
   await myModel.saveCity(cityName)  
})

//=================================================================================================================
// An on click for each of the remove buttons that:
// Deletes that city from your DB
$('.cities').on('click',`.remove`, async function(){
   let cityName = $(this).closest('.city').find('p').first().text()
   await myModel.removeCity(cityName)
   await renderer.renderData(myModel.cityData)
})

loadPage()

//=================================================================================================================