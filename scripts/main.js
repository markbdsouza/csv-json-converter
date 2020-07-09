const CSVDataEl = document.getElementById('CSVTextArea');
const JSONDataEl = document.getElementById('JSONTextArea');
const covertToJSONBtn = document.getElementById('CSVtoJSONBtn');
const covertToCSVBtn = document.getElementById('JSONtoCSVBtn');

let CSVData;
let JSONData;

function validateCSV(inputCSVText) {
  let CSVDataArray = [];
  inputCSVText.split('\n').forEach((row, rowIndex) => {
    if (row !== '') {
      CSVDataArray.push(row.split(','));
    }
  });
  //length check
  let length = CSVDataArray[0].length;
  const isValidArray = CSVDataArray.filter((row) => row.length !== length);
  return {
    isValidCSV: isValidArray.length === 0 ? true : false,
    CSVDataArray,
  };
}

function validateJSON(inputJSONText) {
  let JSONDataObj = JSON.parse(inputJSONText);
  isValidArray = [];
  return {
    isValidJSON: isValidArray.length === 0 ? true : false,
    JSONDataObj,
  };
}

function CSVtoJSON(CSVDataArray) {
  let keys = CSVDataArray[0];
  let jsonData = [];
  let result;
  for (let i = 1; i < CSVDataArray.length; i++) {
    result = {};
    let values = CSVDataArray[i];
    keys.forEach((key, i) => (result[key] = values[i]));
    jsonData.push(result);
  }
  updateDOMForJSON(jsonData);
}

function updateDOMForJSON(jsonData) {
  JSONDataEl.value = JSON.stringify(jsonData);
  toggleJSONToCSVBtn();
}
function updateDOMForCSV(CSVData) {
  console.log(CSVData);

  CSVDataEl.value = CSVData;
  toggleCSVToJSONBtn();
}
function printCSVError() {
  console.log('Error in CSV Format');
  return;
}
function printJSONError() {
  console.log('Error in JSON');
  return;
}

function JSONtoCSV(JSONObj) {
  let CSVDataArray = [];
  CSVDataArray.push(Object.keys(JSONObj[0]).join(','));

  JSONObj.forEach((el) => {
    CSVDataArray.push(Object.values(el).join(','));
  });

  updateDOMForCSV(CSVDataArray.join('\r\n'));
}

function convertToJSONBtnClick() {
  let CSVData = CSVDataEl.value;
  // let? isValidCSV,CSVDataArray;
  let { isValidCSV, CSVDataArray } = validateCSV(CSVData);
  isValidCSV ? CSVtoJSON(CSVDataArray) : printCSVError();
}

function convertToCSVBtnClick() {
  let JSONData = JSONDataEl.value;
  let { isValidJSON, JSONDataObj } = validateJSON(JSONData);
  JSONtoCSV(JSONDataObj);
}

function toggleCSVToJSONBtn() {
  if (CSVDataEl.value.trim() === '') {
    covertToJSONBtn.disabled = true;
  } else {
    covertToJSONBtn.disabled = false;
  }
}
function toggleJSONToCSVBtn() {
  if (JSONDataEl.value.trim() === '') {
    covertToCSVBtn.disabled = true;
  } else {
    covertToCSVBtn.disabled = false;
  }
}

covertToJSONBtn.addEventListener('click', convertToJSONBtnClick);
covertToCSVBtn.addEventListener('click', convertToCSVBtnClick);

CSVDataEl.addEventListener('keyup', toggleCSVToJSONBtn);
JSONDataEl.addEventListener('keyup', toggleJSONToCSVBtn);

CSVDataEl.innerHTML = `PHONE,COUNTRY_CODE 
(601) 291-7292 x737,0ad705f8-c0cd-49ab-a3d1-5a35a594218d 
(714) 845-8952 x6918,f9e64435-feab-497e-b992-e6e94e272863`;

/* 
[
    {
        "TestA": [
            "michellemathews@gmail.com",
            "hwalker@gmail.com",
            "justin32@deleon.org",
            "xmorales@hotmail.com"
        ],
        "TestB": {
            "try1": "087",
            "try2": "ii8Y"
        },
        "TestC": "PSC 1031, Box 0939\nAPO AE 48108"
    },
    {
        "TestA": [
            "willie84@hotmail.com",
            "courtneysimpson@hotmail.com",
            "zperez@rodriguez.com",
            "anthonypearson@gmail.com",
            "mlopez@yahoo.com",
            "lisa04@coffey-myers.com"
        ],
        "TestB": {
            "try1": "31",
            "try2": "V2i"
        },
        "TestC": "Unit 6958 Box 5139\nDPO AE 89806"
    }] */
