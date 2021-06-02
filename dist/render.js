//==============================================================
// YOUR VIEW
// Here’s what should go inside of your Renderer class:

// A method renderData which appends data to the HTML
// Though it’s not explicitly part of your render class, 
// you also need to add in your Handlebars template to your HTML.

//==============================================================
 class Renderer{  
    constructur(){}
    renderData(cities){
        $('.cities').empty()
        console.log("in render - cities[0] = ",cities[0])
        var source = $('#city-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({cities:cities});
        $('.cities').append(newHTML);
    }
}
//================================================================