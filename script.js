const IPfetch=document.querySelector("#IP-Des");
const navg=document.querySelector("#getnext");
const location_l=document.querySelector(".lat-long");
const URL="https://ipinfo.io/";
const pin_url="https://api.postalpincode.in/pincode/700006";
// https://ipinfo.io/${49.37.35.18}/geo




async function Coordinates(res)
{
    const response = await fetch(URL+`${res}?token=6779e2162241e8`);
    const response_pin = await fetch(pin_url);
    var data_p=await response.json();
    var data_pin=await response_pin.json();
    console.log(data_pin);
    const locate=createMap(data_p,data_pin);
    return locate;
}





function createMap(data_p,data_pin)
{
    const dt=new Date().toLocaleString("en-US", { timeZone: `${data_p.timezone}` });
    const z=document.createElement("div");
    z.classList.add("geog-details");
    z.innerHTML=
    `<div>
    <div>Lat:${data_p.loc.split(",")[0]}</div>
    <div>City:${data_p.city}</div>
    </div>
    <div>
    <div>Long:${data_p.loc.split(",")[1]}</div>
    <div>City:${data_p.region}</div>
    </div>
    <div>
    <div>Organisation:${data_p.asn.name}</div>
    <div>HostName:${data_p.abuse.name}</div>
    </div>
    <div class="map-l">
    <iframe src="https://maps.google.com/maps?q=${data_p.loc.split(",")[0]}, ${data_p.loc.split(",")[1]}&z=15&output=embed" 
    width="1200" height="300" frameborder="0" style="border:0"></iframe>
    </div>
    <div class="more-info">
          <header>More Information About You</header>
          <div>
          <ul>
          <li>Time Zone : ${data_p.timezone}</li>
          <li>Date & Time:${dt}</li>
          <li>Pincode:${data_p.postal}</li>
          <li>Message:Number of Pincodes found:</li>
          </ul>
          </div>
    </div>
    <div class="postadd">
        <div>Name: ${data_pin[0].PostOffice[0].Name}</div>
        <div>Branch: ${data_pin[0].PostOffice[0].BranchType}</div>
        <div>Delivery: ${data_pin[0].PostOffice[0].DeliveryStatus}</div>
        <div>Dsitrict: ${data_pin[0].PostOffice[0].District}</div>
        <div>Division: ${data_pin[0].PostOffice[0].Division}</div>
        </div>`
location_l.appendChild(z);
return location_l;
}



$.getJSON("https://api.ipify.org?format=json", function(data) {
         
        // Setting text of element P with id gfg
        $("#IP-Display").html(data.ip);
        $("#IP-content-display").html(data.ip);
        Coordinates(data.ip);
    });

//On clicking "Get Started" button redirect to content page



navg.addEventListener("click", async ()=>{
    window.location.href="content.html";
});


// ipinfo.io/49.37.35.18?token=6779e2162241e8
// 6779e2162241e8