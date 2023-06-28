// document.addEventListener("contextmenu", function(e) {
//     e.preventDefault();
// })

// change nav style on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('window-scrolled', window.scrollY > 0);
})

document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
    }
};
function calculateAirflow() {
    var cfm = parseFloat(document.getElementById("CFM").value);
    var lps = parseFloat(document.getElementById("LPS").value);
    var m3s = parseFloat(document.getElementById("m3s").value);

    if (!isNaN(cfm)) {
        lps = (cfm / 2.1188).toFixed(4);
        m3s = (cfm / 2118.8).toFixed(4);
    } else if (!isNaN(lps)) {
        cfm = (lps * 2.1188).toFixed(4);
        m3s = (cfm / 2118.8).toFixed(4);
    } else if (!isNaN(m3s)) {
        cfm = (m3s * 2118.8).toFixed(4);
        lps = (cfm / 2.1188).toFixed(4);
    } else {
        cfm = '';
        lps = '';
        m3s = '';
    }

    document.getElementById("CFM").value = cfm;
    document.getElementById("LPS").value = lps;
    document.getElementById("m3s").value = m3s;
}

function resetFields() {
    document.getElementById("CFM").value = '';
    document.getElementById("LPS").value = '';
    document.getElementById("m3s").value = '';

}
function resetFields1() {
    document.getElementsById("airflow").value = '';
    document.getElementById("width").value = '';
    document.getElementById("height").value = ''; 
}
function calculate() {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var airflow = document.getElementById("airflow").value;
    var neckArea = width * height;
    var airflowLps = (airflow * 2.118);

    var areaFactorConst = '';
    if (neckArea > 60000 && neckArea < 67500) {
        areaFactorConst = 0.55;
    } else if (neckArea >= 67500 && neckArea < 75000) {
        areaFactorConst = 0.57;
    } else if (neckArea >= 75000 && neckArea < 90000) {
        areaFactorConst = 0.58;
    } else if (neckArea >= 90000 && neckArea < 105000) {
        areaFactorConst = 0.6;
    } else if (neckArea >= 105000 && neckArea > 127500) {
        areaFactorConst = 0.65;
    } else {
        areaFactorConst = 0.52;
    }
    
    console.log (areaFactorConst);

    var neckAreaSqft = ((width * height * 10.764) / 1000000).toFixed(2);
    var areaFactor = areaFactorConst !== '' ? (areaFactorConst * neckAreaSqft).toFixed(4) : '';

    var neckSize = width + " x " + height;
    var coreArea = (((width - 10) * (height - 10)) / 92903.04).toFixed(4);
    var coreVelocity = ((airflow * 1000 * 200) / ((width - 10) * (height - 10))).toFixed(0);
    var freeAreaVelocity = (airflow/areaFactor).toFixed(0);
    var totalPressure = ((1.9976 * ((airflow * 1000)/((width-10)*(height-10))) ** 1.9524)/250).toFixed(3);

    var throwCons;
    if (width === 300 && height === 150) {
      throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.26)));
    } else if (width === 450 && height === 150) {
      throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.379)));
    } else if (width === 600 && height === 150) {
      throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.474)));
    } else {
      throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt((0.65 * width * height / (25 * 25 * 144)))));
    }

    var throw1 = (throwCons * 12 * 0.025).toFixed(0);

    var throwCons1;
    if (width === 300 && height === 150) {
      throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.26)));
    } else if (width === 450 && height === 150) {
      throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.379)));
    } else if (width === 600 && height === 150) {
      throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.474)));
    } else {
      throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt((0.65 * width * height / (25 * 25 * 144)))));
    }

    var throw2 = (throwCons1 * 12 * 0.025).toFixed(0);

    var ncCal;

if (neckArea === 45000) {
  ncCal = Math.max(
    -31.6 + 1.28 * ((12.817 * Math.log(airflowLps) - 34.473) - 10),
    -18.9 + 1.18 * ((20.022 * Math.log(airflowLps) - 79.372) - 10),
    -8.5 + 1.09 * ((25.345 * Math.log(airflowLps) - 111.13) - 10),
    -2.2 + 1.02 * ((33.402 * Math.log(airflowLps) - 162.09) - 10),
    1 + 1 * ((37.61 * Math.log(airflowLps) - 191.66) - 10),
    3.1 + 0.98 * ((45.646 * Math.log(airflowLps) - 250.16) - 10)
  );
} else {
  ncCal = Math.max(
    -31.6 + 1.28 * ((12.817 * Math.log((airflowLps * 300 * 150) / (width * height)) - 34.473) - 10),
    -18.9 + 1.18 * ((20.022 * Math.log((airflowLps * 300 * 150) / (width * height)) - 79.372) - 10),
    -8.5 + 1.09 * ((25.345 * Math.log((airflowLps * 300 * 150) / (width * height)) - 111.13) - 10),
    -2.2 + 1.02 * ((33.402 * Math.log((airflowLps * 300 * 150) / (width * height)) - 162.09) - 10),
    1 + 1 * ((37.61 * Math.log((airflowLps * 300 * 150) / (width * height)) - 191.66) - 10),
    3.1 + 0.98 * ((45.646 * Math.log((airflowLps * 300 * 150) / (width * height)) - 250.16) - 10)
  );
}

ncCal += (10 * Math.log10(width * height / 45000));

if (ncCal<15) {
    var nc = "<15";
} else if (ncCal > 50) {
    var nc = ">50";
} else {
    var nc = ncCal.toFixed(0);
}

console.log(ncCal);

    document.getElementById("neckSize").textContent = neckSize;
    document.getElementById("coreArea").textContent = coreArea;
    document.getElementById("coreVelocity").textContent = coreVelocity;
    document.getElementById("freeArea").textContent = areaFactor;
    document.getElementById("freeAreaVelocity").textContent = freeAreaVelocity; 
    document.getElementById("totalPressure").textContent = totalPressure;
    document.getElementById("throw1").textContent = throw1;
    document.getElementById("throw2").textContent = throw2;
    document.getElementById("nc").textContent = nc;
}
function calculateSAG() {
  var width = document.getElementById("width").value;
  var height = document.getElementById("height").value;
  var airflow = document.getElementById("airflow").value;
  var neckArea = width * height;
  var airflowLps = (airflow * 2.118);

  var areaFactorConst = '';
  if (neckArea > 60000 && neckArea < 67500) {
      areaFactorConst = 0.55;
  } else if (neckArea >= 67500 && neckArea < 75000) {
      areaFactorConst = 0.57;
  } else if (neckArea >= 75000 && neckArea < 90000) {
      areaFactorConst = 0.58;
  } else if (neckArea >= 90000 && neckArea < 105000) {
      areaFactorConst = 0.6;
  } else if (neckArea >= 105000 && neckArea > 127500) {
      areaFactorConst = 0.65;
  } else {
      areaFactorConst = 0.52;
  }
  
  console.log (areaFactorConst);

  var neckAreaSqft = ((width * height * 10.764) / 1000000).toFixed(2);
  var areaFactor = areaFactorConst !== '' ? (areaFactorConst * neckAreaSqft).toFixed(4) : '';

  var neckSize = width + " x " + height;
  var coreArea = (((width - 10) * (height - 10)) / 92903.04).toFixed(4);
  var coreVelocity = ((airflow * 1000 * 200) / ((width - 10) * (height - 10))).toFixed(0);
  var freeAreaVelocity = (airflow/areaFactor).toFixed(0);
  var totalPressure = (((1.9976 * ((airflow * 1000)/((width-10)*(height-10))) ** 1.9524)/250)*1.2).toFixed(3);

  var throwCons;
  if (width === 300 && height === 150) {
    throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.26)));
  } else if (width === 450 && height === 150) {
    throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.379)));
  } else if (width === 600 && height === 150) {
    throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.474)));
  } else {
    throwCons = ((0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt((0.65 * width * height / (25 * 25 * 144)))));
  }

  var throw1 = (throwCons * 12 * 0.025).toFixed(0);

  var throwCons1;
  if (width === 300 && height === 150) {
    throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.26)));
  } else if (width === 450 && height === 150) {
    throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.379)));
  } else if (width === 600 && height === 150) {
    throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt(0.474)));
  } else {
    throwCons1 = ((1.25 * 0.8 * 3.28 * 3.27 * 2.1188 * airflow) / (100 * Math.sqrt((0.65 * width * height / (25 * 25 * 144)))));
  }

  var throw2 = (throwCons1 * 12 * 0.025).toFixed(0);

  var ncCal;

if (neckArea === 45000) {
ncCal = Math.max(
  -31.6 + 1.28 * ((12.817 * Math.log(airflowLps) - 34.473) - 10),
  -18.9 + 1.18 * ((20.022 * Math.log(airflowLps) - 79.372) - 10),
  -8.5 + 1.09 * ((25.345 * Math.log(airflowLps) - 111.13) - 10),
  -2.2 + 1.02 * ((33.402 * Math.log(airflowLps) - 162.09) - 10),
  1 + 1 * ((37.61 * Math.log(airflowLps) - 191.66) - 10),
  3.1 + 0.98 * ((45.646 * Math.log(airflowLps) - 250.16) - 10)
);
} else {
ncCal = Math.max(
  -31.6 + 1.28 * ((12.817 * Math.log((airflowLps * 300 * 150) / (width * height)) - 34.473) - 10),
  -18.9 + 1.18 * ((20.022 * Math.log((airflowLps * 300 * 150) / (width * height)) - 79.372) - 10),
  -8.5 + 1.09 * ((25.345 * Math.log((airflowLps * 300 * 150) / (width * height)) - 111.13) - 10),
  -2.2 + 1.02 * ((33.402 * Math.log((airflowLps * 300 * 150) / (width * height)) - 162.09) - 10),
  1 + 1 * ((37.61 * Math.log((airflowLps * 300 * 150) / (width * height)) - 191.66) - 10),
  3.1 + 0.98 * ((45.646 * Math.log((airflowLps * 300 * 150) / (width * height)) - 250.16) - 10)
);
}

ncCal += ((10 * Math.log10(width * height / 45000))+2);

if (ncCal<15) {
  var nc = "<15";
} else if (ncCal > 50) {
  var nc = ">50";
} else {
  var nc = ncCal.toFixed(0);
}

console.log(ncCal);

  document.getElementById("neckSize").textContent = neckSize;
  document.getElementById("coreArea").textContent = coreArea;
  document.getElementById("coreVelocity").textContent = coreVelocity;
  // document.getElementById("freeArea").textContent = areaFactor;
  // document.getElementById("freeAreaVelocity").textContent = freeAreaVelocity; 
  document.getElementById("totalPressure").textContent = totalPressure;
  // document.getElementById("throw1").textContent = throw1;
  // document.getElementById("throw2").textContent = throw2;
  document.getElementById("nc").textContent = nc;
}
function calculatelbg() {
  var width = document.getElementById("width").value;
  var height = document.getElementById("height").value;
  var airflow = document.getElementById("airflow").value;
  var cfmPerFeet = airflow*304.8/width;

  var slbr152w16areaFactor;
  if (height<=150) {
    slbr152w16areaFactor = ((0.585/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else if (height>150 && height<=200) {
    slbr152w16areaFactor = ((0.752/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else {
    slbr152w16areaFactor = (((0.873/2.67447917))*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3)
  }

  var slbr151w16areaFactor;
  if (height<=150) {
    slbr151w16areaFactor = ((0.585*1.1/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else if (height>150 && height<=200) {
    slbr151w16areaFactor = ((0.752*1.1/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else {
    slbr151w16areaFactor = ((0.873*1.1/2.67447917)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  }

  var slbr02w16areaFactor;
  if (height<=150) {
    slbr02w16areaFactor = ((0.585*1.18/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else if (height>150 && height<=200) {
    slbr02w16areaFactor = ((0.752*1.18/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else {
    slbr02w16areaFactor = ((0.873*1.18/2.67447917)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  }

  var slbr301w16areaFactor;
  if (height<=150) {
  slbr301w16areaFactor = ((0.585*0.9/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else if (height>150 && height<=200) {
  slbr301w16areaFactor = ((0.752*0.9/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  } else {
  slbr301w16areaFactor = ((0.873*0.9/2.67447917)*(height-2)*(width-2)*10.764/(1000*1000)).toFixed(3);
  }

  var slbr152w12areaFactor;
  if (height<=150) {
  slbr152w12areaFactor = (12/16*0.9*((0.585/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else if (height>150 && height<=200) {
  slbr152w12areaFactor = (12/16*0.9*((0.752/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else {
  slbr152w12areaFactor = (12/16*0.9*((0.873/2.67447917)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  }

  var slbr151w12areaFactor;
  if (height<=150) {
  slbr151w12areaFactor = (1.1*12/16*0.9*((0.585/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else if (height>150 && height<=200) {
  slbr151w12areaFactor = (1.1*12/16*0.9*((0.752/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else {
  slbr151w12areaFactor = (1.1*12/16*0.9*((0.873/2.67447917)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  }

  var slbr02w12areaFactor;
  if (height<=150) {
  slbr02w12areaFactor = (1.18*12/16*0.9*((0.585/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else if (height>150 && height<=200) {
  slbr02w12areaFactor = (1.18*12/16*0.9*((0.752/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else {
  slbr02w12areaFactor = (1.18*12/16*0.9*((0.873/2.67447917)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  }

  var slbr301w12areaFactor;
  if (height<=150) {
  slbr301w12areaFactor = (0.9*12/16*0.9*((0.585/1.57725694)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else if (height>150 && height<=200) {
  slbr301w12areaFactor = (0.9*12/16*0.9*((0.752/2.12586806)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  } else {
  slbr301w12areaFactor = (0.9*12/16*0.9*((0.873/2.67447917)*(height-2)*(width-2)*10.764/(1000*1000))).toFixed(3);
  }

  console.log(slbr152w16areaFactor);

  var slbr152w16pressure;
  if (height<150) {
    slbr152w16pressure = (((1.2*1.208*(((680*(cfmPerFeet*1000*150/(width*height))/400)/200)*((680*(cfmPerFeet*1000*150/(width*height))/400)/200))/(9.81*2))/250)+(8* Math.pow((cfmPerFeet*1000*150/(width*height)),2.1226)/(1000000)/250)).toFixed(3);
  } else if (height>150 && height<200) {
    slbr152w16pressure = (((1.2*(1.208*(((770*(cfmPerFeet*1000*200/(width*height))/580)/200)*((770*(cfmPerFeet*1000*200/(width*height))/580)/200))/(9.81*2))/250)+(4 * Math.pow((cfmPerFeet*1000*200/(width*height)),2.0949)/(1000000)/250))).toFixed(3);
  } else {
    slbr152w16pressure = ((7 * Math.pow((cfmPerFeet*1000*250/(width*height)),2.5532)/(100000000)/250)+(1.2*(1.208*(((690*(cfmPerFeet*1000*250/(width*height))/600)/200)*((690*(cfmPerFeet*1000*250/(width*height))/600)/200))/(9.81*2))/250)).toFixed(3);
  }

  var slbr151w16pressure;
  if (height<150) {
    slbr151w16pressure = (0.9*((1.2*(1.208*(((680*(cfmPerFeet*1000*150/(width*height))/400)/200)*((680*(cfmPerFeet*1000*150/(width*height))/400)/200))/(9.81*2))/250)+(8* Math.pow((cfmPerFeet*1000*150/(width*height)),2.1266)/(1000000)/250))).toFixed(3);
  } else if (height>150 && height<200) {
    slbr151w16pressure = (0.9*((1.2*(1.208*(((770*(cfmPerFeet*1000*200/(width*height))/580)/200)*((770*(cfmPerFeet*1000*200/(width*height))/580)/200))/(9.81*2))/250)+(4*Math.pow((cfmPerFeet*1000*200/(width*height)),2.0949)/(1000000)/250))).toFixed(3);
  } else {
    slbr151w16pressure = (0.9*(7* Math.pow((cfmPerFeet*1000*250/(width*height)),2.5532)/(100000000)/250)+(1.2*(1.208*(((690*(cfmPerFeet*1000*250/(width*height))/600)/200)*((690*(cfmPerFeet*1000*250/(width*height))/600)/200))/(9.81*2))/250)).toFixed(3);
  }

  var slbr02w16pressure;
  if (height<150) {
    slbr02w16pressure = (0.82*((1.2*(1.208*(((680*(cfmPerFeet*1000*150/(width*height))/400)/200)*((680*(cfmPerFeet*1000*150/(width*height))/400)/200))/(9.81*2))/250)+(8*Math.pow((cfmPerFeet*1000*150/(width*height)),2.1266)/(1000000)/250))).toFixed(3);
  } else if (height>150 && height<200) {
    slbr02w16pressure = (0.82*((1.2*(1.208*(((770*(cfmPerFeet*1000*200/(width*height))/580)/200)*((770*(cfmPerFeet*1000*200/(width*height))/580)/200))/(9.81*2))/250)+(4*Math.pow((cfmPerFeet*1000*200/(width*height)),2.0949)/(1000000)/250))).toFixed(3);
  } else {
    slbr02w16pressure = (0.82*(7*Math.pow((cfmPerFeet*1000*250/(width*height)),2.5532)/(100000000)/250)+(1.2*(1.208*(((690*(cfmPerFeet*1000*250/(width*height))/600)/200)*((690*(cfmPerFeet*1000*250/(width*height))/600)/200))/(9.81*2))/250)).toFixed(3);
  }

  var slbr301w16pressure;
  if (height<150) {
    slbr301w16pressure = (1.2*((1.2*(1.208*(((680*(cfmPerFeet*1000*150/(width*height))/400)/200)*((680*(cfmPerFeet*1000*150/(width*height))/400)/200))/(9.81*2))/250)+(8*Math.pow((cfmPerFeet*1000*150/(width*height)),2.1266)/(1000000)/250))).toFixed(3);
  } else if (height>150 && height<200) {
    slbr301w16pressure = (1.2*((1.2*(1.208*(((770*(cfmPerFeet*1000*200/(width*height))/580)/200)*((770*(cfmPerFeet*1000*200/(width*height))/580)/200))/(9.81*2))/250)+(4*Math.pow((cfmPerFeet*1000*200/(width*height)),2.0949)/(1000000)/250))).toFixed(3);
  } else {
    slbr301w16pressure = (1.2*(7*Math.pow((cfmPerFeet*1000*250/(width*height)),2.5532)/(100000000)/250)+(1.2*(1.208*(((690*(cfmPerFeet*1000*250/(width*height))/600)/200)*((690*(cfmPerFeet*1000*250/(width*height))/600)/200))/(9.81*2))/250)).toFixed(3);
  }

  var slbr152w12pressure;
  if (height<150) {
    slbr152w12pressure = ((1.2*((1.208*(((cfmPerFeet/slbr152w12areaFactor)/200)*((cfmPerFeet/slbr152w12areaFactor)/200))/(9.81*2)))/250)+(2*Math.pow((cfmPerFeet/slbr152w12areaFactor),2.1266)/(1000000)/250)).toFixed(3);
  } else if (height>150 && height<200) {
    slbr152w12pressure = (2* Math.pow((cfmPerFeet/slbr152w12areaFactor),2.0949)/(1000000)/250)+(1.2*(1.208*(((cfmPerFeet/slbr152w12areaFactor))/200)*(((cfmPerFeet/slbr152w12areaFactor))/200))/(9.81*2)/250)
  } else {
    slbr152w12areaFactor = (1.2*(1.208*((((cfmPerFeet/slbr152w12areaFactor))/200)*(((cfmPerFeet/slbr152w12areaFactor))/200))/(9.81*2))/250)+(5*Math.pow((cfmPerFeet/slbr152w12areaFactor),2.5532)/(100000000)/250)
  }

  var slbr151w12pressure;
  if (height<150) {
    slbr151w12pressure = (1.1*(1.2*((1.208*(((cfmPerFeet/slbr151w12areaFactor)/200)*((cfmPerFeet/slbr151w12areaFactor)/200))/(9.81*2)))/250)+(2*Math.pow((cfmPerFeet/slbr151w12areaFactor),2.1266)/(1000000)/250)).toFixed(3);
  } else if (height>150 && height<200) {
    slbr151w12pressure = (1.1*(2*Math.pow((cfmPerFeet/slbr151w12areaFactor),2.0949)/(1000000)/250)+(1.2*(1.208*(((cfmPerFeet/slbr151w12areaFactor))/200)*(((cfmPerFeet/slbr151w12areaFactor))/200))/(9.81*2)/250)).toFixed(3);
  } else {
    slbr151w12pressure = (1.1*(1.2*(1.208*((((cfmPerFeet/slbr151w12areaFactor))/200)*(((cfmPerFeet/slbr151w12areaFactor))/200))/(9.81*2))/250)+(5*Math.pow((cfmPerFeet/slbr151w12areaFactor),2.5532)/(100000000)/250)).toFixed(3);
  }

  var slbr02w12pressure;
  if (height<150) {
    slbr02w12pressure = (1.15*(1.2*((1.208*(((cfmPerFeet/slbr02w12areaFactor)/200)*((cfmPerFeet/slbr02w12areaFactor)/200))/(9.81*2)))/250)+(2*Math.pow((cfmPerFeet/slbr02w12areaFactor),2.1266)/(1000000)/250)).toFixed(3);
  } else if (height>150 && height<200) {
    slbr02w12pressure = (1.15*(2*Math.pow((cfmPerFeet/slbr02w12areaFactor),2.0949)/(1000000)/250)+(1.2*(1.208*(((cfmPerFeet/slbr02w12areaFactor))/200)*(((cfmPerFeet/slbr02w12areaFactor))/200))/(9.81*2)/250)).toFixed(3);
  } else {
    slbr02w12pressure = (1.2*(1.208*((((cfmPerFeet/slbr02w12areaFactor))/200)*(((cfmPerFeet/slbr02w12areaFactor))/200))/(9.81*2))/250)+(5*Math.pow((cfmPerFeet/slbr02w12areaFactor),2.5532)/(100000000)/250)
  }

  var slbr301w12pressure;
  if (height<150) {
    slbr301w12pressure = (1*(1.2*((1.208*(((cfmPerFeet/slbr301w12areaFactor)/200)*((cfmPerFeet/slbr301w12areaFactor)/200))/(9.81*2)))/250)+(2*Math.pow((cfmPerFeet/slbr301w12areaFactor),2.1266)/(1000000)/250)).toFixed(3);
  } else if (height>150 && height<200) {
    slbr301w12pressure = (1*(2*Math.pow((cfmPerFeet/slbr301w12areaFactor),2.0949)/(1000000)/250)+(1.2*(1.208*(((cfmPerFeet/slbr301w12areaFactor))/200)*(((cfmPerFeet/slbr301w12areaFactor))/200))/(9.81*2)/250)).toFixed(3);
  } else {
    slbr301w12pressure = (1*(1.2*(1.208*((((cfmPerFeet/slbr301w12areaFactor))/200)*(((cfmPerFeet/slbr301w12areaFactor))/200))/(9.81*2))/250)+(5*Math.pow((cfmPerFeet/slbr301w12areaFactor),2.5532)/(100000000)/250)).toFixed(3);
  }
  
  var rlbr152w16pressure = ((2.4*Math.pow((cfmPerFeet*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);
  var rlbr151w16pressure = (0.9*(2.4*Math.pow((cfmPerFeet*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);
  var rlbr02w16pressure = (0.82*(2.4*Math.pow((cfmPerFeet*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);
  var rlbr301w16pressure = (1.2*(2.4*Math.pow((cfmPerFeet*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);
  var rlbr152w12pressure = ((2.4*Math.pow(((cfmPerFeet*16*1.1/12)*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);
  var rlbr151w12pressure  = (0.9*(2.4*Math.pow(((cfmPerFeet*16*1.1/12)*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);
  var rlbr02w12pressure = (0.82*(2.4*Math.pow(((cfmPerFeet*16*1.1/12)*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);
  var rlbr301w12pressure = (1.2*(2.4*Math.pow(((cfmPerFeet*16*1.1/12)*1000*250/(width*height)),2.3668)/10000000)/250).toFixed(3);

  var slbr152w16throw1;
  if (height<150) {
    slbr152w16throw1 = (((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr152w16throw1 = (((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr152w16throw1 = ((cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr152w16throw2;
  if (height<150) {
    slbr152w16throw2 = (1.5*((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr152w16throw2 = (1.5*((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr152w16throw2 = (1.5*(cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr151w16throw1;
  if (height<150) {
    slbr151w16throw1 = (0.95*((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr151w16throw1 = (0.95*((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr151w16throw1 = (0.95*(cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr151w16throw2;
  if (height<150) {
    slbr151w16throw2 = (1.45*((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr151w16throw2 = (1.45*((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr151w16throw2 = (1.45*(cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr02w16throw1;
  if (height<150) {
    slbr02w16throw1 = (0.86*((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr02w16throw1 = (0.86*((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr02w16throw1 = (0.86*(cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr02w16throw2;
  if (height<150) {
    slbr02w16throw2 = (1.39*((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr02w16throw2 = (1.39*((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr02w16throw2 = (1.39*(cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr301w16throw1;
  if (height<150) {
    slbr301w16throw1 = (1.15*((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr301w16throw1 = (1.15*((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr301w16throw1 = (1.15*(cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr301w16throw2;
  if (height<150) {
    slbr301w16throw2 = (1.65*((cfmPerFeet*1000*150/(width*height))*0.0322510822510823*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr301w16throw2 = (1.65*((cfmPerFeet*1000*200/(width*height))*0.0273587805027967*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr301w16throw2 = (1.65*(cfmPerFeet*1000*250/(width*height))*0.0244444444444444*Math.sqrt(width*height)/Math.sqrt(1000*250)).toFixed(0);
  }

  var slbr152w12throw1;
  if (height<150) {
    slbr152w12throw1 = (((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr152w12throw1 = (((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr152w12throw1 = (((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr152w12throw2;
  if (height<150) {
    slbr152w12throw2 = (1.5*((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr152w12throw2 = (1.5*((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr152w12throw2 = (1.5*((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr151w12throw1;
  if (height<150) {
    slbr151w12throw1 = (0.95*((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr151w12throw1 = (0.95*((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr151w12throw1 = (0.95*((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr151w12throw2;
  if (height<150) {
    slbr151w12throw2 = (1.4*((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr151w12throw2 = (1.4*((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr151w12throw2 = (1.4*((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr02w12throw1;
  if (height<150) {
    slbr02w12throw1 = (0.86*((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr02w12throw1 = (0.86*((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr02w12throw1 = (0.86*((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr02w12throw2;
  if (height<150) {
    slbr02w12throw2 = (1.32*((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr02w12throw2 = (1.32*((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr02w12throw2 = (1.32*((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr301w12throw1;
  if (height<150) {
    slbr301w12throw1 = (1.15*((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr301w12throw1 = (1.15*((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr301w12throw1 = (1.15*((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr301w12throw2;
  if (height<150) {
    slbr301w12throw2 = (1.65*((cfmPerFeet*1000*150/(width*height))*(0.0322510822510823/Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*150))).toFixed(0);
  } else if (height>150 && height<=200) {
    slbr301w12throw2 = (1.65*((cfmPerFeet*1000*200/(width*height))*(0.0273587805027967*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*200))).toFixed(0);
  } else {
    slbr301w12throw2 = (1.65*((cfmPerFeet*1000*250/(width*height))*(0.0244444444444444*Math.sqrt(12/16))*Math.sqrt(width*height)/Math.sqrt(1000*250))).toFixed(0);
  }

  var slbr152w16ncCal;
  if (height<150) {
    slbr152w16ncCal = Math.max (
      (-31.6+1.28*((19.464*Math.log((cfmPerFeet*1000*150/(width*height)))-84.706)-10)),
      (-18.9+1.18*((20.27*Math.log((cfmPerFeet*1000*150/(width*height)))-91.33)-10)),
      (-8.5+1.09*((25.355*Math.log((cfmPerFeet*1000*150/(width*height)))-128.07)-10)),
      (-2.2+1.02*((30.754*Math.log((cfmPerFeet*1000*150/(width*height)))-167.26)-10)),
      (1+1*((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65)-10)),
      (3.1+0.98*(((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65))-10))
    )
  } else if (height>150 && height<=200) {
    slbr152w16ncCal = Math.max (
      (-31.6+1.28*((20.718*Math.log((cfmPerFeet*1000*200/(width*height)))-96.333)-10)),
      (-18.9+1.18*((23.132*Math.log((cfmPerFeet*1000*200/(width*height)))-114.91)-10)),
      (-8.5+1.09*((28.04*Math.log((cfmPerFeet*1000*200/(width*height)))-150.65)-10)),
      (-2.2+1.02*((33.74*Math.log((cfmPerFeet*1000*200/(width*height)))-192.93)-10)),
      (1+1*((40.405*Math.log((cfmPerFeet*1000*200/(width*height)))-244.55)-10)),
      (3.1+0.98*(((26.518*Math.log((cfmPerFeet*1000*200/(width*height)))-153.09))-10))
    )
  } else {
    slbr152w16ncCal = Math.max (
      (-31.6+1.28*((20.264*Math.log((cfmPerFeet*1000*250/(width*height)))-94.428)-10)),
      (-18.9+1.18*((22.454*Math.log((cfmPerFeet*1000*250/(width*height)))-111.45)-10)),
      (-8.5+1.09*((29.127*Math.log((cfmPerFeet*1000*250/(width*height)))-160.25)-10)),
      (-2.2+1.02*((34.65*Math.log((cfmPerFeet*1000*250/(width*height)))-201.97)-10)),
      (1+1*((40.817*Math.log((cfmPerFeet*1000*250/(width*height)))-250.87)-10)),
      (3.1+0.98*(((42.721*Math.log((cfmPerFeet*1000*250/(width*height)))-272.67))-10))
    )

    }
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }

    var slbr152w16nc = (slbr152w16ncCal+logValue).toFixed(0);

    var slbr151w16ncCal;
    if (height<150) {
      slbr151w16ncCal = Math.max (
        (-31.6+1.28*((19.464*Math.log((cfmPerFeet*1000*150/(width*height)))-84.706)-10)),
        (-18.9+1.18*((20.27*Math.log((cfmPerFeet*1000*150/(width*height)))-91.33)-10)),
        (-8.5+1.09*((25.355*Math.log((cfmPerFeet*1000*150/(width*height)))-128.07)-10)),
        (-2.2+1.02*((30.754*Math.log((cfmPerFeet*1000*150/(width*height)))-167.26)-10)),
        (1+1*((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65)-10)),
        (3.1+0.98*(((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65))-10))
      )
    } else if (height>150 && height<=200) {
      slbr151w16ncCal = Math.max (
        (-31.6+1.28*((20.718*Math.log((cfmPerFeet*1000*200/(width*height)))-96.333)-10)),
        (-18.9+1.18*((23.132*Math.log((cfmPerFeet*1000*200/(width*height)))-114.91)-10)),
        (-8.5+1.09*((28.04*Math.log((cfmPerFeet*1000*200/(width*height)))-150.65)-10)),
        (-2.2+1.02*((33.74*Math.log((cfmPerFeet*1000*200/(width*height)))-192.93)-10)),
        (1+1*((40.405*Math.log((cfmPerFeet*1000*200/(width*height)))-244.55)-10)),
        (3.1+0.98*(((26.518*Math.log((cfmPerFeet*1000*200/(width*height)))-153.09))-10))
      )
    } else {
      slbr151w16ncCal = Math.max (
        (-31.6+1.28*((20.264*Math.log((cfmPerFeet*1000*250/(width*height)))-94.428)-10)),
        (-18.9+1.18*((22.454*Math.log((cfmPerFeet*1000*250/(width*height)))-111.45)-10)),
        (-8.5+1.09*((29.127*Math.log((cfmPerFeet*1000*250/(width*height)))-160.25)-10)),
        (-2.2+1.02*((34.65*Math.log((cfmPerFeet*1000*250/(width*height)))-201.97)-10)),
        (1+1*((40.817*Math.log((cfmPerFeet*1000*250/(width*height)))-250.87)-10)),
        (3.1+0.98*(((42.721*Math.log((cfmPerFeet*1000*250/(width*height)))-272.67))-10))
      )
  
      }
      var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
      if (logValue<0) {
        logValue = 0;
      } else {
        logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
      }

  var slbr151w16nc = ((slbr151w16ncCal+logValue).toFixed(0))-1;

  var slbr02w16ncCal;
  if (height<150) {
    slbr02w16ncCal = Math.max (
      (-31.6+1.28*((19.464*Math.log((cfmPerFeet*1000*150/(width*height)))-84.706)-10)),
      (-18.9+1.18*((20.27*Math.log((cfmPerFeet*1000*150/(width*height)))-91.33)-10)),
      (-8.5+1.09*((25.355*Math.log((cfmPerFeet*1000*150/(width*height)))-128.07)-10)),
      (-2.2+1.02*((30.754*Math.log((cfmPerFeet*1000*150/(width*height)))-167.26)-10)),
      (1+1*((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65)-10)),
      (3.1+0.98*(((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65))-10))
    )
  } else if (height>150 && height<=200) {
    slbr02w16ncCal = Math.max (
      (-31.6+1.28*((20.718*Math.log((cfmPerFeet*1000*200/(width*height)))-96.333)-10)),
      (-18.9+1.18*((23.132*Math.log((cfmPerFeet*1000*200/(width*height)))-114.91)-10)),
      (-8.5+1.09*((28.04*Math.log((cfmPerFeet*1000*200/(width*height)))-150.65)-10)),
      (-2.2+1.02*((33.74*Math.log((cfmPerFeet*1000*200/(width*height)))-192.93)-10)),
      (1+1*((40.405*Math.log((cfmPerFeet*1000*200/(width*height)))-244.55)-10)),
      (3.1+0.98*(((26.518*Math.log((cfmPerFeet*1000*200/(width*height)))-153.09))-10))
    )
  } else {
    slbr02w16ncCal = Math.max (
      (-31.6+1.28*((20.264*Math.log((cfmPerFeet*1000*250/(width*height)))-94.428)-10)),
      (-18.9+1.18*((22.454*Math.log((cfmPerFeet*1000*250/(width*height)))-111.45)-10)),
      (-8.5+1.09*((29.127*Math.log((cfmPerFeet*1000*250/(width*height)))-160.25)-10)),
      (-2.2+1.02*((34.65*Math.log((cfmPerFeet*1000*250/(width*height)))-201.97)-10)),
      (1+1*((40.817*Math.log((cfmPerFeet*1000*250/(width*height)))-250.87)-10)),
      (3.1+0.98*(((42.721*Math.log((cfmPerFeet*1000*250/(width*height)))-272.67))-10))
    )

    }
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }

var slbr02w16nc = ((slbr02w16ncCal+logValue).toFixed(0))-3;

var slbr301w16ncCal;
if (height<150) {
  slbr301w16ncCal = Math.max (
    (-31.6+1.28*((19.464*Math.log((cfmPerFeet*1000*150/(width*height)))-84.706)-10)),
    (-18.9+1.18*((20.27*Math.log((cfmPerFeet*1000*150/(width*height)))-91.33)-10)),
    (-8.5+1.09*((25.355*Math.log((cfmPerFeet*1000*150/(width*height)))-128.07)-10)),
    (-2.2+1.02*((30.754*Math.log((cfmPerFeet*1000*150/(width*height)))-167.26)-10)),
    (1+1*((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65)-10)),
    (3.1+0.98*(((37.555*Math.log((cfmPerFeet*1000*150/(width*height)))-218.65))-10))
  )
} else if (height>150 && height<=200) {
  slbr301w16ncCal = Math.max (
    (-31.6+1.28*((20.718*Math.log((cfmPerFeet*1000*200/(width*height)))-96.333)-10)),
    (-18.9+1.18*((23.132*Math.log((cfmPerFeet*1000*200/(width*height)))-114.91)-10)),
    (-8.5+1.09*((28.04*Math.log((cfmPerFeet*1000*200/(width*height)))-150.65)-10)),
    (-2.2+1.02*((33.74*Math.log((cfmPerFeet*1000*200/(width*height)))-192.93)-10)),
    (1+1*((40.405*Math.log((cfmPerFeet*1000*200/(width*height)))-244.55)-10)),
    (3.1+0.98*(((26.518*Math.log((cfmPerFeet*1000*200/(width*height)))-153.09))-10))
  )
} else {
  slbr301w16ncCal = Math.max (
    (-31.6+1.28*((20.264*Math.log((cfmPerFeet*1000*250/(width*height)))-94.428)-10)),
    (-18.9+1.18*((22.454*Math.log((cfmPerFeet*1000*250/(width*height)))-111.45)-10)),
    (-8.5+1.09*((29.127*Math.log((cfmPerFeet*1000*250/(width*height)))-160.25)-10)),
    (-2.2+1.02*((34.65*Math.log((cfmPerFeet*1000*250/(width*height)))-201.97)-10)),
    (1+1*((40.817*Math.log((cfmPerFeet*1000*250/(width*height)))-250.87)-10)),
    (3.1+0.98*(((42.721*Math.log((cfmPerFeet*1000*250/(width*height)))-272.67))-10))
  )

  }
  var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
  if (logValue<0) {
    logValue = 0;
  } else {
    logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
  }
console.log(slbr301w16ncCal);
var slbr301w16nc = ((slbr301w16ncCal+logValue)+3).toFixed(0);

var slbr152w12ncCal;
if (height<150) {
  slbr152w12ncCal = Math.max (
    (-31.6+1.28*((19.464*Math.log((cfmPerFeet/slbr152w12areaFactor))-95.155)-10)),
    (-18.9+1.18*((20.27*Math.log((cfmPerFeet/slbr152w12areaFactor))-102.21)-10)),
    (-8.5+1.09*((25.355*Math.log((cfmPerFeet/slbr152w12areaFactor))-141.69)-10)),
    (-2.2+1.02*((30.754*Math.log((cfmPerFeet/slbr152w12areaFactor))-183.77)-10)),
    (1+1*((37.555*Math.log((cfmPerFeet/slbr152w12areaFactor))-238.82)-10)),
    (3.1+0.98*(((42.164*Math.log((cfmPerFeet/slbr152w12areaFactor))-281.78))-10))
  )
} else if (height>150 && height<=200) {
  slbr152w12ncCal = Math.max (
  (-31.6+1.28*((20.718*Math.log((cfmPerFeet/slbr152w12areaFactor))-102.25)-10)),
  (-18.9+1.18*((23.132*Math.log((cfmPerFeet/slbr152w12areaFactor))-121.52)-10)),
  (-8.5+1.09*((28.04*Math.log((cfmPerFeet/slbr152w12areaFactor))-158.66)-10)),
  (-2.2+1.02*((33.74*Math.log((cfmPerFeet/slbr152w12areaFactor))-202.57)-10)),
  (1+1*((40.405*Math.log((cfmPerFeet/slbr152w12areaFactor))-256.09)-10)),
  (3.1+0.98*(((26.518*Math.log((cfmPerFeet/slbr152w12areaFactor))-160.67))-10)))
} else {
  slbr152w12ncCal = Math.max (
  (-31.6+1.28*((20.264*Math.log((cfmPerFeet/slbr152w12areaFactor))-97.193)-10)),
  (-18.9+1.18*((22.454*Math.log((cfmPerFeet/slbr152w12areaFactor))-114.51)-10)),
  (-8.5+1.09*((29.127*Math.log((cfmPerFeet/slbr152w12areaFactor))-164.22)-10)),
  (-2.2+1.02*((34.65*Math.log((cfmPerFeet/slbr152w12areaFactor))-206.69)-10)),
  (1+1*((40.817*Math.log((cfmPerFeet/slbr152w12areaFactor))-256.43)-10)),
  (3.1+0.98*(((42.721*Math.log((cfmPerFeet/slbr152w12areaFactor))-278.5))-10)))
}

  var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
  if (logValue<0) {
    logValue = 0;
  } else {
    logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
  }

  var slbr152w12nc = (slbr152w12ncCal+logValue).toFixed(0);

  var slbr151w12ncCal;
if (height<150) {
  slbr151w12ncCal = Math.ceil(Math.max (
    (-31.6+1.28*((19.464*Math.log((cfmPerFeet/slbr151w12areaFactor))-95.155)-10)),
    (-18.9+1.18*((20.27*Math.log((cfmPerFeet/slbr151w12areaFactor))-102.21)-10)),
    (-8.5+1.09*((25.355*Math.log((cfmPerFeet/slbr151w12areaFactor))-141.69)-10)),
    (-2.2+1.02*((30.754*Math.log((cfmPerFeet/slbr151w12areaFactor))-183.77)-10)),
    (1+1*((37.555*Math.log((cfmPerFeet/slbr151w12areaFactor))-238.82)-10)),
    (3.1+0.98*(((42.164*Math.log((cfmPerFeet/slbr151w12areaFactor))-281.78))-10))
  ));
} else if (height>150 && height<=200) {
  slbr151w12ncCal = Math.ceil(Math.max (
  (-31.6+1.28*((20.718*Math.log((cfmPerFeet/slbr151w12areaFactor))-102.25)-10)),
  (-18.9+1.18*((23.132*Math.log((cfmPerFeet/slbr151w12areaFactor))-121.52)-10)),
  (-8.5+1.09*((28.04*Math.log((cfmPerFeet/slbr151w12areaFactor))-158.66)-10)),
  (-2.2+1.02*((33.74*Math.log((cfmPerFeet/slbr151w12areaFactor))-202.57)-10)),
  (1+1*((40.405*Math.log((cfmPerFeet/slbr151w12areaFactor))-256.09)-10)),
  (3.1+0.98*(((26.518*Math.log((cfmPerFeet/slbr151w12areaFactor))-160.67))-10))));
} else {
  slbr151w12ncCal = Math.ceil(Math.max (
  (-31.6+1.28*((20.264*Math.log((cfmPerFeet/slbr151w12areaFactor))-97.193)-10)),
  (-18.9+1.18*((22.454*Math.log((cfmPerFeet/slbr151w12areaFactor))-114.51)-10)),
  (-8.5+1.09*((29.127*Math.log((cfmPerFeet/slbr151w12areaFactor))-164.22)-10)),
  (-2.2+1.02*((34.65*Math.log((cfmPerFeet/slbr151w12areaFactor))-206.69)-10)),
  (1+1*((40.817*Math.log((cfmPerFeet/slbr151w12areaFactor))-256.43)-10)),
  (3.1+0.98*(((42.721*Math.log((cfmPerFeet/slbr151w12areaFactor))-278.5))-10))));
}


  var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
  if (logValue<0) {
    logValue = 0;
  } else {
    logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
  }
  console.log(slbr151w12ncCal);
  var slbr151w12nc = (parseInt(slbr151w12ncCal) + parseInt(logValue) + 1).toFixed(0);

  var slbr02w12ncCal;
  if (height<150) {
    slbr02w12ncCal = Math.ceil(Math.max (
      (-31.6+1.28*((19.464*Math.log((cfmPerFeet/slbr02w12areaFactor))-95.155)-10)),
      (-18.9+1.18*((20.27*Math.log((cfmPerFeet/slbr02w12areaFactor))-102.21)-10)),
      (-8.5+1.09*((25.355*Math.log((cfmPerFeet/slbr02w12areaFactor))-141.69)-10)),
      (-2.2+1.02*((30.754*Math.log((cfmPerFeet/slbr02w12areaFactor))-183.77)-10)),
      (1+1*((37.555*Math.log((cfmPerFeet/slbr02w12areaFactor))-238.82)-10)),
      (3.1+0.98*(((42.164*Math.log((cfmPerFeet/slbr02w12areaFactor))-281.78))-10))
    ));
  } else if (height>150 && height<=200) {
    slbr02w12ncCal = Math.ceil(Math.max (
    (-31.6+1.28*((20.718*Math.log((cfmPerFeet/slbr02w12areaFactor))-102.25)-10)),
    (-18.9+1.18*((23.132*Math.log((cfmPerFeet/slbr02w12areaFactor))-121.52)-10)),
    (-8.5+1.09*((28.04*Math.log((cfmPerFeet/slbr02w12areaFactor))-158.66)-10)),
    (-2.2+1.02*((33.74*Math.log((cfmPerFeet/slbr02w12areaFactor))-202.57)-10)),
    (1+1*((40.405*Math.log((cfmPerFeet/slbr02w12areaFactor))-256.09)-10)),
    (3.1+0.98*(((26.518*Math.log((cfmPerFeet/slbr02w12areaFactor))-160.67))-10))));
  } else {
    slbr02w12ncCal = Math.ceil(Math.max (
    (-31.6+1.28*((20.264*Math.log((cfmPerFeet/slbr02w12areaFactor))-97.193)-10)),
    (-18.9+1.18*((22.454*Math.log((cfmPerFeet/slbr02w12areaFactor))-114.51)-10)),
    (-8.5+1.09*((29.127*Math.log((cfmPerFeet/slbr02w12areaFactor))-164.22)-10)),
    (-2.2+1.02*((34.65*Math.log((cfmPerFeet/slbr02w12areaFactor))-206.69)-10)),
    (1+1*((40.817*Math.log((cfmPerFeet/slbr02w12areaFactor))-256.43)-10)),
    (3.1+0.98*(((42.721*Math.log((cfmPerFeet/slbr02w12areaFactor))-278.5))-10))));
  }
  
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
  
    var slbr02w12nc = ((slbr02w12ncCal+logValue)+2).toFixed(0);

    var slbr301w12ncCal;
  if (height<150) {
    slbr301w12ncCal = Math.ceil(Math.max (
      (-31.6+1.28*((19.464*Math.log((cfmPerFeet/slbr301w12areaFactor))-95.155)-10)),
      (-18.9+1.18*((20.27*Math.log((cfmPerFeet/slbr301w12areaFactor))-102.21)-10)),
      (-8.5+1.09*((25.355*Math.log((cfmPerFeet/slbr301w12areaFactor))-141.69)-10)),
      (-2.2+1.02*((30.754*Math.log((cfmPerFeet/slbr301w12areaFactor))-183.77)-10)),
      (1+1*((37.555*Math.log((cfmPerFeet/slbr301w12areaFactor))-238.82)-10)),
      (3.1+0.98*(((42.164*Math.log((cfmPerFeet/slbr301w12areaFactor))-281.78))-10))
    ));
  } else if (height>150 && height<=200) {
    slbr301w12ncCal = Math.ceil(Math.max (
    (-31.6+1.28*((20.718*Math.log((cfmPerFeet/slbr301w12areaFactor))-102.25)-10)),
    (-18.9+1.18*((23.132*Math.log((cfmPerFeet/slbr301w12areaFactor))-121.52)-10)),
    (-8.5+1.09*((28.04*Math.log((cfmPerFeet/slbr301w12areaFactor))-158.66)-10)),
    (-2.2+1.02*((33.74*Math.log((cfmPerFeet/slbr301w12areaFactor))-202.57)-10)),
    (1+1*((40.405*Math.log((cfmPerFeet/slbr301w12areaFactor))-256.09)-10)),
    (3.1+0.98*(((26.518*Math.log((cfmPerFeet/slbr02w12areaFactor))-160.67))-10))));
  } else {
    slbr301w12ncCal = Math.ceil(Math.max (
    (-31.6+1.28*((20.264*Math.log((cfmPerFeet/slbr301w12areaFactor))-97.193)-10)),
    (-18.9+1.18*((22.454*Math.log((cfmPerFeet/slbr301w12areaFactor))-114.51)-10)),
    (-8.5+1.09*((29.127*Math.log((cfmPerFeet/slbr301w12areaFactor))-164.22)-10)),
    (-2.2+1.02*((34.65*Math.log((cfmPerFeet/slbr301w12areaFactor))-206.69)-10)),
    (1+1*((40.817*Math.log((cfmPerFeet/slbr301w12areaFactor))-256.43)-10)),
    (3.1+0.98*(((42.721*Math.log((cfmPerFeet/slbr301w12areaFactor))-278.5))-10))));
  }
  
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
    console.log(slbr301w12areaFactor);
    var slbr301w12nc = ((slbr301w12ncCal+logValue)-2).toFixed(0);

    var rlbr152w16ncCal;
    if (height<150) {
      rlbr152w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((4.4418*Math.log((cfmPerFeet*1000*150/(width*height)))+16.722)-10)),
        (-18.9+1.18*((48.217*Math.log((cfmPerFeet*1000*150/(width*height)))-275.52)-10)),
        (-8.5+1.09*((35.512*Math.log((cfmPerFeet*1000*150/(width*height)))-197.24)-10)),
        (-2.2+1.02*((37.846*Math.log((cfmPerFeet*1000*150/(width*height)))-219.09)-10)),
        (1+1*((39.047*Math.log((cfmPerFeet*1000*150/(width*height)))-232.57)-10)),
        (3.1+0.98*((23.929*Math.log((cfmPerFeet*2.1188*0.3048*1000*150/(width*height)))-139.53)-10))));
    } else if (height>150 && height<=200) {
      rlbr152w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log(cfmPerFeet*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log(cfmPerFeet*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log(cfmPerFeet*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log(cfmPerFeet*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log(cfmPerFeet*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log(cfmPerFeet*1000*200/(width*height))-161.94)-10))));
    } else {
      rlbr152w16ncCal = Math.ceil (Math.max (
        (-31.6+1.28*((12.24*Math.log(cfmPerFeet*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log(cfmPerFeet*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log(cfmPerFeet*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log(cfmPerFeet*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log(cfmPerFeet*2.1188*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log(cfmPerFeet*1000*250/(width*height))-132.05)-10))
      ));
    }

    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }

    var rlbr152w16nc = (slbr301w12ncCal+logValue).toFixed(0);

    var rlbr151w16ncCal;
    if (height<150) {
      rlbr151w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((4.4418*Math.log((cfmPerFeet*1000*150/(width*height)))+16.722)-10)),
        (-18.9+1.18*((48.217*Math.log((cfmPerFeet*1000*150/(width*height)))-275.52)-10)),
        (-8.5+1.09*((35.512*Math.log((cfmPerFeet*1000*150/(width*height)))-197.24)-10)),
        (-2.2+1.02*((37.846*Math.log((cfmPerFeet*1000*150/(width*height)))-219.09)-10)),
        (1+1*((39.047*Math.log((cfmPerFeet*1000*150/(width*height)))-232.57)-10)),
        (3.1+0.98*((23.929*Math.log((cfmPerFeet*1000*150/(width*height)))-139.53)-10))));
    } else if (height>150 && height<=200) {
      rlbr151w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log(cfmPerFeet*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log(cfmPerFeet*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log(cfmPerFeet*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log(cfmPerFeet*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log(cfmPerFeet*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log(cfmPerFeet*1000*200/(width*height))-161.94)-10))));
    } else {
      rlbr151w16ncCal = Math.ceil (Math.max (
        (-31.6+1.28*((12.24*Math.log(cfmPerFeet*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log(cfmPerFeet*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log(cfmPerFeet*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log(cfmPerFeet*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log(cfmPerFeet*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log(cfmPerFeet*1000*250/(width*height))-132.05)-10))
      ));
    }

    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
    console.log(rlbr151w16ncCal);
    var rlbr151w16nc = ((rlbr151w16ncCal+logValue)-1).toFixed(0);

    var rlbr02w16ncCal;
    if (height<150) {
      rlbr02w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((4.4418*Math.log((cfmPerFeet*1000*150/(width*height)))+16.722)-10)),
        (-18.9+1.18*((48.217*Math.log((cfmPerFeet*1000*150/(width*height)))-275.52)-10)),
        (-8.5+1.09*((35.512*Math.log((cfmPerFeet*1000*150/(width*height)))-197.24)-10)),
        (-2.2+1.02*((37.846*Math.log((cfmPerFeet*1000*150/(width*height)))-219.09)-10)),
        (1+1*((39.047*Math.log((cfmPerFeet*1000*150/(width*height)))-232.57)-10)),
        (3.1+0.98*((23.929*Math.log((cfmPerFeet*1000*150/(width*height)))-139.53)-10))));
    } else if (height>150 && height<=200) {
      rlbr02w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log(cfmPerFeet*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log(cfmPerFeet*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log(cfmPerFeet*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log(cfmPerFeet*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log(cfmPerFeet*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log(cfmPerFeet*1000*200/(width*height))-161.94)-10))));
    } else {
      rlbr02w16ncCal = Math.ceil (Math.max (
        (-31.6+1.28*((12.24*Math.log(cfmPerFeet*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log(cfmPerFeet*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log(cfmPerFeet*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log(cfmPerFeet*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log(cfmPerFeet*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log(cfmPerFeet*1000*250/(width*height))-132.05)-10))
      ));
    }

    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
 
    var rlbr02w16nc = ((rlbr02w16ncCal+logValue)-3).toFixed(0);

    var rlbr301w16ncCal;
    if (height<150) {
      rlbr301w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((4.4418*Math.log((cfmPerFeet*1000*150/(width*height)))+16.722)-10)),
        (-18.9+1.18*((48.217*Math.log((cfmPerFeet*1000*150/(width*height)))-275.52)-10)),
        (-8.5+1.09*((35.512*Math.log((cfmPerFeet*1000*150/(width*height)))-197.24)-10)),
        (-2.2+1.02*((37.846*Math.log((cfmPerFeet*1000*150/(width*height)))-219.09)-10)),
        (1+1*((39.047*Math.log((cfmPerFeet*1000*150/(width*height)))-232.57)-10)),
        (3.1+0.98*((23.929*Math.log((cfmPerFeet*1000*150/(width*height)))-139.53)-10))));
    } else if (height>150 && height<=200) {
      rlbr301w16ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log(cfmPerFeet*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log(cfmPerFeet*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log(cfmPerFeet*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log(cfmPerFeet*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log(cfmPerFeet*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log(cfmPerFeet*1000*200/(width*height))-161.94)-10))));
    } else {
      rlbr301w16ncCal = Math.ceil (Math.max (
        (-31.6+1.28*((12.24*Math.log(cfmPerFeet*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log(cfmPerFeet*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log(cfmPerFeet*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log(cfmPerFeet*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log(cfmPerFeet*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log(cfmPerFeet*1000*250/(width*height))-132.05)-10))
      ));
    }

    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
 
    var rlbr301w16nc = ((rlbr301w16ncCal+logValue)+3).toFixed(0);

    var rlbr152w12ncCal;
    if (height<150) {
      rlbr152w12ncCal = Math.ceil(Math.max (
          (-31.6+1.28*((4.4418*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))+16.722)-10)),
          (-18.9+1.18*((48.217*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-275.52)-10)),
          (-8.5+1.09*((35.512*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-197.24)-10)),
          (-2.2+1.02*((37.846*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-219.09)-10)),
          (1+1*((39.047*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-232.57)-10)),
          (3.1+0.98*((23.929*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-139.53)-10))
        ));
    } else if (height>150 && height<=200) {
      rlbr152w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.94)-10)),
      ));
    } else {
      rlbr152w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((12.24*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-132.05)-10)),
      ));
    }
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
 
    var rlbr152w12nc = ((rlbr152w12ncCal+logValue)).toFixed(0);

    var rlbr151w12ncCal;
    if (height<150) {
      rlbr151w12ncCal = Math.ceil(Math.max (
          (-31.6+1.28*((4.4418*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))+16.722)-10)),
          (-18.9+1.18*((48.217*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-275.52)-10)),
          (-8.5+1.09*((35.512*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-197.24)-10)),
          (-2.2+1.02*((37.846*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-219.09)-10)),
          (1+1*((39.047*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-232.57)-10)),
          (3.1+0.98*((23.929*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-139.53)-10))
        ));
    } else if (height>150 && height<=200) {
      rlbr151w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.94)-10)),
      ));
    } else {
      rlbr151w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((12.24*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-132.05)-10)),
      ));
    }
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
 
    var rlbr151w12nc = ((rlbr151w12ncCal+logValue)-1).toFixed(0);

    var rlbr02w12ncCal;
    if (height<150) {
      rlbr02w12ncCal = Math.ceil(Math.max (
          (-31.6+1.28*((4.4418*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))+16.722)-10)),
          (-18.9+1.18*((48.217*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-275.52)-10)),
          (-8.5+1.09*((35.512*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-197.24)-10)),
          (-2.2+1.02*((37.846*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-219.09)-10)),
          (1+1*((39.047*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-232.57)-10)),
          (3.1+0.98*((23.929*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-139.53)-10))
        ));
    } else if (height>150 && height<=200) {
      rlbr02w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.94)-10)),
      ));
    } else {
      rlbr02w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((12.24*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-132.05)-10)),
      ));
    }
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
 
    var rlbr02w12nc = ((rlbr02w12ncCal+logValue)-3).toFixed(0);

    var rlbr301w12ncCal;
    if (height<150) {
      rlbr301w12ncCal = Math.ceil(Math.max (
          (-31.6+1.28*((4.4418*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))+16.722)-10)),
          (-18.9+1.18*((48.217*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-275.52)-10)),
          (-8.5+1.09*((35.512*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-197.24)-10)),
          (-2.2+1.02*((37.846*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-219.09)-10)),
          (1+1*((39.047*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-232.57)-10)),
          (3.1+0.98*((23.929*Math.log(((cfmPerFeet*16*1.1/12)*1000*150/(width*height)))-139.53)-10))
        ));
    } else if (height>150 && height<=200) {
      rlbr301w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((7.657*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-2.8687)-10)),
        (-18.9+1.18*((30.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.3)-10)),
        (-8.5+1.09*((30.376*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-168.4)-10)),
        (-2.2+1.02*((34.205*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-200.43)-10)),
        (1+1*(((36.391*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-222.16))-10)),
        (3.1+0.98*((26.798*Math.log((cfmPerFeet*16*1.1/12)*1000*200/(width*height))-161.94)-10)),
      ));
    } else {
      rlbr301w12ncCal = Math.ceil(Math.max (
        (-31.6+1.28*((12.24*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-37.439)-10)),
        (-18.9+1.18*((29.104*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-155.61)-10)),
        (-8.5+1.09*((39.213*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-234.56)-10)),
        (-2.2+1.02*((38.9*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-238.36)-10)),
        (1+1*((36.673*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-227.63)-10)),
        (3.1+0.98*((22.323*Math.log((cfmPerFeet*16*1.1/12)*1000*250/(width*height))-132.05)-10)),
      ));
    }
    var logValue = (10*Math.log10(width*height/(1000*150))).toFixed(0);
    if (logValue<0) {
      logValue = 0;
    } else {
      logValue = ((10*Math.log10(width*height/(1000*150)))).toFixed(0);
    }
 
    var rlbr301w12nc = ((rlbr301w12ncCal+logValue)+3).toFixed(0);

  document.getElementById("slbr152w16pressure").textContent = slbr152w16pressure;
  document.getElementById("slbr151w16pressure").textContent = slbr151w16pressure;
  document.getElementById("slbr02w16pressure").textContent = slbr02w16pressure;
  document.getElementById("slbr301w16pressure").textContent = slbr301w16pressure;
  document.getElementById("slbr152w12pressure").textContent = slbr152w12pressure;
  document.getElementById("slbr151w12pressure").textContent = slbr151w12pressure;
  document.getElementById("slbr02w12pressure").textContent = slbr02w12pressure;
  document.getElementById("slbr301w12pressure").textContent = slbr301w12pressure;
  document.getElementById("slbr152w16areaFactor").textContent = slbr152w16areaFactor;
  document.getElementById("slbr151w16areaFactor").textContent = slbr151w16areaFactor;
  document.getElementById("slbr02w16areaFactor").textContent = slbr02w16areaFactor;
  document.getElementById("slbr301w16areaFactor").textContent = slbr301w16areaFactor;
  document.getElementById("slbr152w12areaFactor").textContent = slbr152w12areaFactor;
  document.getElementById("slbr151w12areaFactor").textContent = slbr151w12areaFactor;
  document.getElementById("slbr02w12areaFactor").textContent = slbr02w12areaFactor;
  document.getElementById("slbr301w12areaFactor").textContent = slbr301w12areaFactor;
  document.getElementById("rlbr152w16pressure").textContent = rlbr152w16pressure;
  document.getElementById("rlbr151w16pressure").textContent = rlbr151w16pressure;
  document.getElementById("rlbr02w16pressure").textContent = rlbr02w16pressure;
  document.getElementById("rlbr301w16pressure").textContent = rlbr301w16pressure;
  document.getElementById("rlbr152w12pressure").textContent = rlbr152w12pressure;
  document.getElementById("rlbr151w12pressure").textContent = rlbr151w12pressure;
  document.getElementById("rlbr02w12pressure").textContent = rlbr02w12pressure;
  document.getElementById("rlbr301w12pressure").textContent = rlbr301w12pressure;
  document.getElementById("slbr152w16throw1").textContent = slbr152w16throw1;
  document.getElementById("slbr152w16throw2").textContent = slbr152w16throw2;
  document.getElementById("slbr151w16throw1").textContent = slbr151w16throw1;
  document.getElementById("slbr151w16throw2").textContent = slbr151w16throw2;
  document.getElementById("slbr02w16throw1").textContent = slbr02w16throw1;
  document.getElementById("slbr02w16throw2").textContent = slbr02w16throw2;
  document.getElementById("slbr301w16throw1").textContent = slbr301w16throw1;
  document.getElementById("slbr301w16throw2").textContent = slbr301w16throw2;
  document.getElementById("slbr152w12throw1").textContent = slbr152w12throw1;
  document.getElementById("slbr152w12throw2").textContent = slbr152w12throw2;
  document.getElementById("slbr151w12throw1").textContent = slbr151w12throw1;
  document.getElementById("slbr151w12throw2").textContent = slbr151w12throw2;
  document.getElementById("slbr02w12throw1").textContent = slbr02w12throw1;
  document.getElementById("slbr02w12throw2").textContent = slbr02w12throw2;
  document.getElementById("slbr301w12throw1").textContent = slbr301w12throw1;
  document.getElementById("slbr301w12throw2").textContent = slbr301w12throw2;
  document.getElementById("slbr152w16nc").textContent = slbr152w16nc;
  document.getElementById("slbr151w16nc").textContent = slbr151w16nc;
  document.getElementById("slbr02w16nc").textContent = slbr02w16nc;
  document.getElementById("slbr301w16nc").textContent = slbr301w16nc;
  document.getElementById("slbr152w12nc").textContent = slbr152w12nc;
  document.getElementById("slbr151w12nc").textContent = slbr151w12nc;
  document.getElementById("slbr02w12nc").textContent = slbr02w12nc;
  document.getElementById("slbr301w12nc").textContent = slbr301w12nc;
  document.getElementById("rlbr152w16nc").textContent = rlbr152w16nc;
  document.getElementById("rlbr151w16nc").textContent = rlbr151w16nc;
  document.getElementById("rlbr02w16nc").textContent = rlbr02w16nc;
  document.getElementById("rlbr301w16nc").textContent = rlbr301w16nc;
  document.getElementById("rlbr152w12nc").textContent = rlbr152w12nc;
  document.getElementById("rlbr151w12nc").textContent = rlbr151w12nc;
  document.getElementById("rlbr02w12nc").textContent = rlbr02w12nc;
  document.getElementById("rlbr301w12nc").textContent = rlbr301w12nc;
}