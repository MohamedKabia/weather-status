$(document).ready(function(){
   $("#submitWeather").click(function(){
	   event.preventDefault();
       var city =$("#city").val();
	  
   if(city !="")
       {
		   $("#error").text("");//empty the error field
		   $.ajax({
			 url:'http://api.openweathermap.org/data/2.5/weather?q='+ city +"&units=metric"+
				 "&APPID=93d51ddf48946cbef8913c190a78ca8a",
			 type:"GET",        
			 dataType:"jsonp",
			 success: function(data)
		         { 
					let lat=data.coord.lat;
					let lon=data.coord.lon;
					coords=lat+','+lon;
					
				    $("#googlemap").attr('src','https://maps.google.co.uk/?q='+coords+'&z=10&output=embed');
					$("iframe").show();
					$("#display").show();		//show the display div element
					
					var widgit=data_list(data);   //calling the name function by value data
					$("ul").html(widgit);   		//UI displaying data in class name
		   
		           }
	               });//end ajax request
	   }
   else{
     $("#error").text("field cannon be blankes");
       }
   
   function data_list(data){
	      return'<img height=100 width=100 src="http://openweathermap.org/img/w/'+ data.weather[0].icon+'.png">'+ 
	            '<li>'+data.name + ' / ' + data.sys.country +'</li>'+
				'<li><strong>Temperature</strong>: '+data.main.temp +'&deg;C</li>'+
				'<li><strong>Humidity: </strong>:'+ data.main.humidity+ '%</li>'+
				'<li><strong>Pressure: </strong>:'+data.main.pressure + 'hpa</li>'+
				'<li><strong>Min emperature: </strong>:'+data.main.temp_min+ '&deg;C</li>'+
				'<li><strong>Wind speed: </strong>:'+ data.wind.speed+ 'm/s</li>'+
				'<li>'+data.coord.lat +'</li>'+
				'<li><strong>Wind direction: </strong>:'+ data.wind.deg+' &deg</li>';
   }//end function
   });//end submit request(event)
  
	
  
});