const percentageEstimator = (percent, estimate) => (percent / 100) * estimate;

const powerEstimate = (totalNumberOfDays) => {
  const div = Math.floor((totalNumberOfDays / 3));
  return 2 ** div;
};

const currentlyInfectedCalc = (num, casesN) => num * casesN;

const numberOfDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return 7 * timeToElapse;
    case 'months':
      return 30 * timeToElapse;
    default:
      return timeToElapse;
  }
};

const covid19ImpactEstimator = (data) => {
  const input = data;

  //  Challenge 1
  const impactCurentlyInfected = currentlyInfectedCalc(10, input.reportedCases);
  const severeImpactCurentlyInfected = currentlyInfectedCalc(50, input.reportedCases);
  const days = numberOfDays(input.periodType, input.timeToElapse);
  const impactEstimate = impactCurentlyInfected * powerEstimate(days);
  const severeImpactEstimate = severeImpactCurentlyInfected * powerEstimate(days);

  //  Challenge 2
  const impactSevereCasesByRequestedTime = percentageEstimator(15, impactEstimate);
  const severeImpactSevereCasesByRequestedTime = percentageEstimator(15, severeImpactEstimate);
  const bedAvailabitlity = percentageEstimator(35, input.totalHospitalBeds);
  let impactHospitalBeds = bedAvailabitlity - impactSevereCasesByRequestedTime;
  if (!(Number.isInteger(impactHospitalBeds))) {
    impactHospitalBeds = Math.floor(impactHospitalBeds) + 1;
  }
  let severeImpactHospitalBeds = bedAvailabitlity - severeImpactSevereCasesByRequestedTime;
  if (!(Number.isInteger(severeImpactHospitalBeds))) {
    severeImpactHospitalBeds = Math.floor(severeImpactHospitalBeds) + 1;
  }

  //  Challenge 3
  const impactCasesForICUByRequestedTime = Math.floor(percentageEstimator(5, impactEstimate));
  const severeImpactCasesForICUByRequestedTime = Math.floor(percentageEstimator(5,
    severeImpactEstimate));
  const impactCasesForVentilators = Math.floor(percentageEstimator(2, impactEstimate));
  const severeImpactCasesForVentilators = Math.floor(percentageEstimator(2, severeImpactEstimate));
  const impactDollarsInFlight = Math.floor((impactEstimate * input.region.avgDailyIncomePopulation
                                * input.region.avgDailyIncomeInUSD) / days);
  const severeImpactDollarsInFlight = Math.floor((severeImpactEstimate
                                * input.region.avgDailyIncomePopulation
                                  * input.region.avgDailyIncomeInUSD) / days);

  return ({
    data: input,
    impact: {
      currentlyInfected: impactCurentlyInfected,
      infectionsByRequestedTime: impactEstimate,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBeds,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilators,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurentlyInfected,
      infectionsByRequestedTime: severeImpactEstimate,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBeds,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactCasesForVentilators,
      dollarsInFlight: severeImpactDollarsInFlight
    }
  });
};

export default covid19ImpactEstimator;
