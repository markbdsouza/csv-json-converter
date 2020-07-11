const CSVDataEl = document.getElementById('CSVTextArea');
const JSONDataEl = document.getElementById('JSONTextArea');
const covertToJSONBtn = document.getElementById('CSVtoJSONBtn');
const covertToCSVBtn = document.getElementById('JSONtoCSVBtn');
const CSVErrorEl = document.querySelector('.input__error--csv');
const JSONErrorEl = document.querySelector('.input__error--json');

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
    errorMsg:
      isValidArray.length === 0 ? '' : 'There is an error in the CSV Format',
  };
}

function JSONRowCheck(JSONDataObj) {
  const keys = Object.keys(JSONDataObj[0]);
  let errorMsg = '';
  JSONDataObj.forEach((row) => {
    Object.values(row).forEach((el) => {
      if (typeof el == 'object') {
        errorMsg =
          'Complex datatypes cannot be converted to CSV Format. Please use a flat structure';
      } else if (el.includes(',')) {
        errorMsg = 'Please remove any commas (,) in the JSON data';
      }
    });
    if (
      // checks if the sets of keys (array) are equal are equal
      !(
        keys.length === Object.keys(row).length &&
        keys.every((value, index) => value === Object.keys(row)[index])
      )
    ) {
      errorMsg =
        'The JSON Keys do not seem to be consistent. Kindly use a consistent format';
    }
  });
  return errorMsg;
}

function validateJSON(inputJSONText) {
  let errorMsg = '';
  let JSONDataObj;
  try {
    JSONDataObj = JSON.parse(inputJSONText);
    errorMsg = JSONRowCheck(JSONDataObj);
  } catch (err) {
    errorMsg = err.message;
  } finally {
    return {
      isValidJSON: errorMsg.length === 0 ? true : false,
      JSONDataObj,
      errorMsg,
    };
  }
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
  CSVDataEl.value = CSVData;
  toggleCSVToJSONBtn();
}

function clearErrorMsg() {
  CSVErrorEl.textContent = '';
  JSONErrorEl.textContent = '';
}

function printCSVError(errorMsg) {
  errorMsg = errorMsg || 'Error in CSV';
  CSVErrorEl.textContent = errorMsg;
  return;
}
function printJSONError(errorMsg) {
  errorMsg = errorMsg || 'Error in JSON';
  JSONErrorEl.textContent = errorMsg;
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
  clearErrorMsg();
  let CSVData = CSVDataEl.value;
  let { isValidCSV, CSVDataArray, errorMsg } = validateCSV(CSVData);

  isValidCSV ? CSVtoJSON(CSVDataArray) : printCSVError(errorMsg);
}

function convertToCSVBtnClick() {
  clearErrorMsg();
  let JSONData = JSONDataEl.value;
  let { isValidJSON, JSONDataObj, errorMsg } = validateJSON(JSONData);
  isValidJSON ? JSONtoCSV(JSONDataObj) : printJSONError(errorMsg);
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

JSONDataEl.innerHTML = `[
    {
        "A": "Mrs. ,Diana Clark",
        "B": "71-0248690",
        "C": "Smith",
        "D": "Troy Benson",
        "E": "Benjamin",
        "F": "ex59W7qM%h",
        "G": "silver",
        "H": "3568305293725728",
        "I": "line",
        "J": "05",
        "K": "/performance/parent.png"
    },
    {
        "A": "Ricky Hall",
        "B": "26-7773288",
        "C": "Peterson",
        "D": "Calvin Vega",
        "E": "Nicholas",
        "F": "Z+7#Ev#&vb",
        "G": "green",
        "H": "503889756782",
        "I": "where",
        "J": "07",
        "K": "/free/address.wav"
    }
]`;
