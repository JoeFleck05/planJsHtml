function container(manuObj){
    
    var cont = document.getElementById('container');
    // create ul element and set the attributes.
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 10; margin: 0;');
    ul.setAttribute('id', 'theList');

    for(let obj in manuObj){
        var li = document.createElement('li');  
        li.innerHTML = manuObj[obj]['name'];
        li.setAttribute('id', manuObj[obj]['id']);
        li.setAttribute('name', manuObj[obj]['name']);
        ul.appendChild(li);
        console.log(`Manufacture: ${manuObj[obj]['manufacture']}`);
        console.log(`Id: ${manuObj[obj]['id']}`);
        console.log(`Name: ${manuObj[obj]['name']}`);
    }

    cont.appendChild(ul); z
}

function listManufacture(manuObj, field){
    var cont = document.getElementById('container');
    let s1 = document.createElement('select');
    s1.setAttribute('id','manufacture');
    s1.setAttribute('name','manufacture');
    s1.setAttribute.onchange = modelList();
    for(let obj in manuObj){
        let newOption = document.createElement("option");
        newOption.name = manuObj[obj]['manufacture'];
        newOption.id = manuObj[obj]['id'];
        newOption.innerHTML = manuObj[obj]['name'];
        s1.options.add(newOption);
    }
    cont.appendChild(s1);
}

async function modelList(slct1, htmlElement){
    
    let mainDiv = document.getElementById('main');
    let modelHtmlElement = document.getElementById('Model');
    let seriesHtmlElement = document.getElementById('Series');
    let imageHtmlElement = document.getElementById('rightDiv');

    // resetting model list drop down
    if (modelHtmlElement !== null){
        modelHtmlElement.remove();
    }

    // resetting series list drop down
    if (seriesHtmlElement !== null){
        seriesHtmlElement.remove();
    }

    // resetting image when new manufacture selected
    if(imageHtmlElement !== null){
        imageHtmlElement.remove();
    }

    let element = document.createElement(htmlElement);
    element.setAttribute('class','modelSelect');
    element.setAttribute('id', 'selectModel');
    element.setAttribute('name', 'selectModel');
    element.setAttribute('onchange', "seriesList(this.id, 'select')");
    let divModel = document.createElement('div');
    divModel.setAttribute('id','Model');
    let header = document.createElement('h2');
    let horizontalLine = document.createElement('hr');
    header.innerHTML = "Model:";
    let s1 = document.getElementById(slct1);
    let modelObj = await model(s1.value);
    await getOptionElemnet(modelObj,element);
    divModel.appendChild(header);
    divModel.appendChild(element);
    divModel.appendChild(horizontalLine);
    mainDiv.appendChild(divModel);
}

async function seriesList(selectId, htmlElement){
    console.log(`${selectId} <==> ${htmlElement}`);
    let mainDiv = document.getElementById('main');
    let seriesHtmlElement = document.getElementById('Series');

    if(seriesHtmlElement !== null){
        seriesHtmlElement.remove();
    }

    let selectModel = document.getElementById('selectModel');
    let modelSel = selectModel.value;

    let manufacturer = document.getElementById('manufacturer');
    let selectedManufacturer = manufacturer.value;

    let element = document.createElement(htmlElement);
    element.setAttribute('class','seriesSelect');
    element.setAttribute('id', 'selectSeries');
    element.setAttribute('name', 'selectSeries');
    element.setAttribute('onchange', `selectedImage(this.id, "${modelSel}", "${selectedManufacturer}")`);

    let divModel = document.createElement('div');
    divModel.setAttribute('id','Series');
    let header = document.createElement('h2');
    let horizontalLine = document.createElement('hr');
    header.innerHTML = "Series:";
    let s1 = document.getElementById(selectId);
    let seriesObj = await getSeries(selectedManufacturer, s1.value);

    await getOptionElemnet(seriesObj,element);
    divModel.appendChild(header);
    divModel.appendChild(element);
    divModel.appendChild(horizontalLine);
    mainDiv.appendChild(divModel);
}

function selectedImage(seriesObj, model, manufacturer){
    let valueObj = document.getElementById(seriesObj);
    console.log(`MANUFACTURER: ${manufacturer}`);
    console.log(`MODEL: ${model}`);
    console.log(`SERIES: ${valueObj.value}`);

    let rightDivElement = document.getElementById('rightDiv');
    console.log(`<><> ${rightDivElement} <><>`);
    if (rightDivElement !== null) {
        console.log(`REMOVE IMG DIV!`)
        rightDivElement.remove();
    }

    let divElement = document.createElement('div');
    divElement.setAttribute('class','rightDiv');
    divElement.setAttribute('id','rightDiv');
    divElement.setAttribute('name','rightDiv');
    // divElement.setAttribute('style','width: auto; height: auto;');

    document.body.appendChild(divElement);
    let imgElement = document.createElement('img');
    imgElement.setAttribute('class','vehicle-img');
    imgElement.setAttribute('src',`/images/${manufacturer}/${model}/${valueObj.value}.png`);
    divElement.appendChild(imgElement);
}

function manufactureTypes(){
    let manufactureData = [
        {
            manufacture:"",
            id: 0,
            name: ""
        },
        {
            manufacture:"Ford",
            id: 1,
            name: "Ford"
        },
        {
            manufacture:"Dodge",
            id: 2,
            name: "Dodge"
        },
        {
            manufacture:"Honda",
            id: 2,
            name: "Honda"
        },
        {
            manufacture:"Hyundai",
            id: 2,
            name: "Hyundai"
        },
        {
            manufacture:"Nissan",
            id: 2,
            name: "Nissan"
        },
        {
            manufacture:"Toyota Motor Company",
            id: 2,
            name: "Toyota"
        }
    ];
    return manufactureData;
}

async function model(manuObj){
    let modelObj = await fetch('../data/model.json')
    .then(response => response.json())
    .catch(error => console.log(error));    
    return modelObj[manuObj];
}

async function getSeries(manufacturer, model){
    let seriesObj = await fetch('../data/series.json')
    .then(response => response.json())
    .catch(error => console.log(error));

    return seriesObj[manufacturer][model];
}

async function getOptionElemnet(obj,element){
    Object.entries(obj).forEach(exactObj =>{
        const [key, value] = exactObj;
        let optionElement = document.createElement('option');
        optionElement.value = value.value;
        optionElement.innerHTML = value.innerHtml;
        element.options.add(optionElement);
    });
}