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
