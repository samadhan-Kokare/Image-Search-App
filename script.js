 //Create AccessKey variable to store our API key.
const accessKey="HxmOAJVncMcdajIu1l33LS6Y-lbMYEkI50jfz1h3PM4";

//Create formElement variable to store whole form section.
const formElement= document.querySelector("form");

//Store search input
const inputElement= document.getElementById("search-input");

//Store search images/boxes below the search input
const searchResult= document.querySelector(".search-results");

//Created show more button to shows images related to search results.
const showMore= document.getElementById("show-more-btn");

//To store user data whatever user putting in search input
let inputData="";

//Bydefault page
let page= 1;

//We created "async function" because we want response and fetching APIs
async function searchImgs(){

    inputData= inputElement.value;//Hold the information from the input section.

    //Created dynamic "url" based on the input data, page & AccessKey
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response= await fetch(url);//Fetching url and strore the response in "response" variable.

    const data= await response.json();//Converted respose(getting in arrays form) into json format and store in "data" variable.
    console.log(data);

    const results= data.results;//Inside results we are getting "alt_description" and "links".
    console.log(results)
    
    //If page===1 means shows only depault three images.
    if(page===1){
        searchResult.innerHTML= "";
    }

    results.map((result)=>{
        const imageWrapper= document.createElement('div');//we created container similarly like in html page.
        imageWrapper.classList.add('search-result');//added classlist to the container.
        const image= document.createElement('img');

        image.src= result.urls.small;// For better understanding see the "result image" and "index.html" file
        image.alt= result.alt_description;
        const imageLink=document.createElement('a');
        imageLink.href= result.links.html;
        imageLink.target= "_blank";//When we click on href result will open in new tag thats why we use "_blank".
        imageLink.textContent= result.alt_description;

        //"Append".. all the child element to imageWrapper container(imageWrapper>img>a)
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    })

    page++;

    if(page > 1){
        showMore.style.display= "block";
    }
}

formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;

    searchImgs();
})

showMore.addEventListener("click",()=>{
    searchImgs();
})
