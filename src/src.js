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

function modelList(slct1, htmlElement){
    
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
    let modelObj = model(s1.value);

    modelObj.forEach((model) => {
        let modelOption = document.createElement('option');
        modelOption.value = model['value'];
        modelOption.innerHTML = model['innerHtml'];
        element.options.add(modelOption);
    });
    divModel.appendChild(header);
    divModel.appendChild(element);
    divModel.appendChild(horizontalLine);
    mainDiv.appendChild(divModel);
}

function seriesList(selectId, htmlElement){
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
    let seriesObj = getSeries(selectedManufacturer, s1.value);

    seriesObj.forEach((series) => {
        let modelOption = document.createElement('option');
        modelOption.value = series['value'];
        modelOption.innerHTML = series['innerHtml'];
        element.options.add(modelOption);
    });
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

function model(manuObj){
    let model = {
        "Ford": [
            {
                value: "",
                innerHtml: "--- Select a model ---"
            },
            {
                value: "F-150",
                innerHtml: "F-150"
            },
            {
                value: "Mustang",
                innerHtml: "Mustang"
            },
            {
                value: "Bronco",
                innerHtml: "Bronco"
            },

        ],
        "Toyota": [
            {
                value: "",
                innerHtml: "--- Select a model ---"
            },
            {
                value: "Tundra",
                innerHtml: "Tundra"
            },
            {
                value: "Camry",
                innerHtml: "Camry"
            },
            {
                value: "Corolla",
                innerHtml: "Corolla"
            },

        ],
        "Honda": [
            {
                value: "",
                innerHtml: "--- Select a model ---"
            },
            {
                value: "Accord",
                innerHtml: "Accord"
            },
            {
                value: "Civic",
                innerHtml: "Civic"
            },
            {
                value: "Cr-z",
                innerHtml: "Cr-z"
            },
        ]
    }
    return model[manuObj];
}

function getSeries(manufacturer, model){
		
	let series = {
        "Ford":{
            "Bronco": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "Sport",
                    innerHtml: "Sport"
                },{
                    value: "Regular",
                    innerHtml: "Regular"
                }
            ],
            "Mustang": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "V6",
                    innerHtml: "V6"
                },{
                    value: "GT Fastback",
                    innerHtml: "GT Fastback"
                },{
                    value: "Shelby GT500",
                    innerHtml: "Shelby GT500"
                }
            ],
            "F-150": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "XL",
                    innerHtml: "XL"
                },{
                    value: "XLT",
                    innerHtml: "XLT"
                },{
                    value: "Lariat",
                    innerHtml: "Lariat"
                }
            ]
        },
        "Hyundai":{
            "Elantra": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "GT",
                    innerHtml: "GT"
                },{
                    value: "SE",
                    innerHtml: "SE"
                },{
                    value: "Limited",
                    innerHtml: "Limited"
                },{
                    value: "SEL",
                    innerHtml: "SEL"
                }
            ]
        },
        "Toyota":{
            "Tundra": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "Platinum CrewMax",
                    innerHtml: "Platinum CrewMax"
                },{
                    value: "SR5 CrewMax",
                    innerHtml: "SR5 CrewMax"
                },{
                    value: "TRD CrewMax",
                    innerHtml: "TRD CrewMax"
                }
            ],
            "Corolla": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "LE",
                    innerHtml: "LE"
                },{
                    value: "SE",
                    innerHtml: "SE"
                },{
                    value: "Nightshade Edition",
                    innerHtml: "Nightshade Edition"
                }
            ],
            "Camry": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "LE",
                    innerHtml: "LE"
                },{
                    value: "SE",
                    innerHtml: "SE"
                },{
                    value: "XLE",
                    innerHtml: "XLE"
                }
            ],
        },
        "Honda":{
            "Accord": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "EX",
                    innerHtml: "EX"
                },{
                    value: "EX-L",
                    innerHtml: "EX-L"
                },{
                    value: "LX",
                    innerHtml: "LX"
                },{
                    value: "Touring",
                    innerHtml: "Touring"
                }
            ],
            "Civic": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "EX",
                    innerHtml: "EX"
                },{
                    value: "EX-L",
                    innerHtml: "EX-L"
                },{
                    value: "LX",
                    innerHtml: "LX"
                },{
                    value: "Touring",
                    innerHtml: "Touring"
                }
            ],
            "Cr-z": [
                {
                    value: "",
                    innerHtml: "--- Select a series ---"
                },{
                    value: "Base",
                    innerHtml: "Base"
                },{
                    value: "EX",
                    innerHtml: "EX"
                }
            ]
        }
    }
	return series[manufacturer][model];
}